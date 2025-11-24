"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth } from "@/context/auth-context";
import { apiGet, apiPost } from "@/lib/api";

export type CartItem = {
  id: string; // maps to productId in backend
  name: string;
  price: number;
  quantity: number;
  image?: string;
  option?: string; // maps to productOption in backend
};

type CartContextType = {
  items: CartItem[];
  totalItem: number;
  totalPrice: number;
  addItem: (
    item: Omit<CartItem, "quantity">,
    quantity?: number,
    newoption?: string | undefined
  ) => Promise<void>;
  removeItem: (id: string, option: string | undefined) => void;
  updateQuantity: (id: string, quantity: number, option: string | undefined) => void;
  isAdding: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  
  // Get Auth State to check if we should sync
  const { token, isAuthenticated } = useAuth();

  // 1. Load from Local Storage on Mount (Initial Load)
  useEffect(() => {
    const savedCart = localStorage.getItem("klipsan-cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  // 2. Sync with Server when Token changes (Login)
  useEffect(() => {
    const syncCart = async () => {
      if (isAuthenticated && token) {
        try {
          // Send local items to server to merge
          // The Backend expects: { productId, productOption, quantity, ... }
          // We need to map our frontend items to backend DTO format if names differ, 
          // but our CartItem matches closely enough except 'id' vs 'productId'.
          
          const payload = items.map(i => ({
            productId: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            image: i.image,
            productOption: i.option
          }));

          // Call the Sync Endpoint
          const serverCart = await apiPost("/cart/sync", payload, token);
          
          // Map response back to frontend structure
          const mappedCart: CartItem[] = serverCart.map((i: any) => ({
            id: i.productId,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            image: i.image,
            option: i.productOption
          }));

          setItems(mappedCart);
        } catch (error) {
          console.error("Failed to sync cart:", error);
        }
      }
    };

    // Only sync if we actually have a token (logged in)
    if (isAuthenticated) {
      syncCart();
    }
  }, [isAuthenticated, token]); // Depend on Auth state

  // 3. Save to Local Storage on Change (Always keep a local copy)
  useEffect(() => {
    localStorage.setItem("klipsan-cart", JSON.stringify(items));
  }, [items]);

  // --- Helper to push updates to server ---
  const pushUpdateToServer = async (productId: string, quantity: number, option?: string) => {
    if (!isAuthenticated || !token) return;
    
    try {
      await apiPost("/cart/update", {
        productId,
        productOption: option,
        quantity
      }, token);
    } catch (error) {
      console.error("Failed to update server cart:", error);
    }
  };

  // --- Actions ---

  const addItem = async (
    product: Omit<CartItem, "quantity" | "option">,
    quantity = 1,
    newoption?: string | undefined
  ) => {
    setIsAdding(true);

    // Optimistic UI Update (Update local state immediately)
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (i) => i.id === product.id && i.option === newoption
      );

      let newQuantity = quantity;
      if (existingItem) {
        newQuantity = existingItem.quantity + quantity;
        return prevItems.map((i) =>
          i.id === product.id && i.option === newoption
            ? { ...i, quantity: newQuantity }
            : i
        );
      }
      return [...prevItems, { ...product, quantity, option: newoption }];
    });

    // Sync with Server
    // Note: We calculate the *total* new quantity to send to server
    // But for "Add", the server sync logic or specific update logic might vary.
    // For simplicity, let's just wait a moment for the state to settle or calculate manually.
    
    // Actually, 'addItem' adds to existing. We need to know the FINAL quantity to update.
    // Let's calculate it from the *current* items before state update finishes? 
    // No, let's just rely on the Sync endpoint for the bulk add, OR call update.
    // Since 'addItem' might be complex, let's just Trigger the Sync payload again for safety 
    // or just fire-and-forget the update if we know the math.
    
    // Let's try fetching the updated list logic in background:
    if (isAuthenticated && token) {
       // Small delay to simulate network visual
       await new Promise((resolve) => setTimeout(resolve, 500));
       
       // We actually need to send this specific update.
       // Since we don't easily know the 'previous' quantity inside this async function accurately 
       // without refs, let's just sync the whole cart again in background? 
       // Or use the `pushUpdateToServer` with the calculated value.
       
       // Simple approach: Sync takes care of "Merging", so calling sync with just this new item works too!
       await apiPost("/cart/sync", [{
         productId: product.id,
         name: product.name,
         price: product.price,
         quantity: quantity, // The amount TO ADD
         image: product.image,
         productOption: newoption
       }], token);
    } else {
       // Guest user delay
       await new Promise((resolve) => setTimeout(resolve, 800));
    }

    setIsAdding(false);
  };

  const removeItem = (id: string, option: string | undefined) => {
    setItems((prevItem) =>
      prevItem.filter((i) => !(i.id === id && i.option === option))
    );
    // Send 0 quantity to server to delete
    pushUpdateToServer(id, 0, option);
  };

  const updateQuantity = (id: string, newQuantity: number, option: string | undefined) => {
    if (newQuantity < 1) {
      removeItem(id, option);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((i) =>
        i.id === id && i.option === option ? { ...i, quantity: newQuantity } : i
      )
    );
    pushUpdateToServer(id, newQuantity, option);
  };

  // --- Computed Values ---
  const totalItem = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );
  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        totalItem,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        isAdding,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}