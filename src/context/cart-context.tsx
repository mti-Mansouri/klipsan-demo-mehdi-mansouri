"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { useAuth } from "@/context/auth-context";
import { apiGet, apiPost } from "@/lib/api";

// Frontend Cart Item Type
export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  option?: string;
};

// Backend Response Type (DTO)
type ServerCartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  productOption?: string;
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
  const { token, isAuthenticated } = useAuth();
  
  // Track if this is the first load to prevent double-fetching
  const isFirstMount = useRef(true);

  // Helper: Map Server Data to Local Format
  const mapServerCartToLocal = (serverData: ServerCartItem[]): CartItem[] => {
    return serverData.map((i) => ({
      id: i.productId,
      name: i.name,
      price: i.price,
      quantity: i.quantity,
      image: i.image,
      option: i.productOption,
    }));
  };

  // 1. Load Local Storage & Handle Initial Fetch (Merge or Fetch)
  useEffect(() => {
    const initCart = async () => {
      // A. Load Local Storage first
      const savedCart = localStorage.getItem("klipsan-cart");
      let localItems: CartItem[] = [];
      
      if (savedCart) {
        try {
          localItems = JSON.parse(savedCart);
          setItems(localItems);
        } catch (err) {
          console.error("Failed to parse local cart", err);
        }
      }

      // B. If logged in, handle server sync
      if (isAuthenticated && token) {
        try {
          // Case 1: Just logged in (First mount) -> Fetch only
          // Case 2: Or merge if logic dictates (We'll fetch fresh state)
          const serverCart = await apiGet("/cart", token) as ServerCartItem[];
          const mappedCart = mapServerCartToLocal(serverCart);
          
          // Simple strategy: Server is truth. If local has items not in server (guest mode),
          // we will handle that in the separate Merge effect below.
          // For initial load, let's trust the server fetch if it returns items.
          if (mappedCart.length > 0) {
             setItems(mappedCart);
          }
        } catch (e) {
          console.error("Failed to fetch initial cart", e);
        }
      }
    };

    if (isFirstMount.current) {
      initCart();
      isFirstMount.current = false;
    }
  }, [token, isAuthenticated]);

  // 2. Handle Login Event (Merge Guest Cart)
  // This runs when token changes (e.g. user logs in) AND we have local items to push
  useEffect(() => {
    // Skip on first mount (handled above)
    if (isFirstMount.current) return;

    if (isAuthenticated && token && items.length > 0) {
      const mergeGuestCart = async () => {
        try {
          // Map local items to backend DTO
          const payload: ServerCartItem[] = items.map((i) => ({
            productId: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            image: i.image,
            productOption: i.option,
          }));

          const serverCart = await apiPost("/cart/sync", payload, token) as ServerCartItem[];
          setItems(mapServerCartToLocal(serverCart));
        } catch (e) {
          console.error("Merge failed", e);
        }
      };
      mergeGuestCart();
    }
  }, [token, isAuthenticated]); 
  // Note: We don't include 'items' in dep array to avoid loop. 
  // We only want this to run ONCE when auth state changes to true.

  // 3. Persist to Local Storage
  useEffect(() => {
    localStorage.setItem("klipsan-cart", JSON.stringify(items));
  }, [items]);

  // --- API Helper for background updates ---
  const pushUpdateToServer = async (productId: string, quantity: number, option?: string) => {
    if (!isAuthenticated || !token) return;

    try {
      await apiPost("/cart/update", {
        productId,
        productOption: option,
        quantity,
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

    // 1. Optimistic UI Update
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (i) => i.id === product.id && i.option === newoption
      );

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        return prevItems.map((i) =>
          i.id === product.id && i.option === newoption
            ? { ...i, quantity: newQuantity }
            : i
        );
      }
      return [...prevItems, { ...product, quantity, option: newoption }];
    });

    // 2. Sync with Server
    if (isAuthenticated && token) {
      try {
        // We send just this item to the sync endpoint to add it
        const payload: ServerCartItem[] = [{
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity, // Amount to ADD
          image: product.image,
          productOption: newoption,
        }];
        await apiPost("/cart/sync", payload, token);
      } catch (e) {
        console.error("Failed to sync add item", e);
      }
    } else {
      // Simulate delay for guest experience consistency
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    setIsAdding(false);
  };

  const removeItem = (id: string, option: string | undefined) => {
    setItems((prevItem) =>
      prevItem.filter((i) => !(i.id === id && i.option === option))
    );
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