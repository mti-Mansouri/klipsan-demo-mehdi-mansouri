"use client";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState, useRef } from "react";
import { useAuth } from "@/context/auth-context";
import { apiGet, apiPost } from "@/lib/api";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  option?: string;
  synced?: boolean; // New flag to prevent re-syncing
};

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
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number, newoption?: string) => Promise<void>;
  removeItem: (id: string, option: string | undefined) => void;
  updateQuantity: (id: string, quantity: number, option: string | undefined) => void;
  isAdding: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const { token, isAuthenticated } = useAuth();
  const isFirstMount = useRef(true);

  const mapServerCartToLocal = (serverData: ServerCartItem[]): CartItem[] => {
    if (!Array.isArray(serverData)) return [];
    return serverData.map((i) => ({
      id: i.productId,
      name: i.name,
      price: i.price,
      quantity: i.quantity,
      image: i.image,
      option: i.productOption,
      synced: true, // Mark as already on server
    }));
  };

  // 1. Initial Load (Storage or Server)
  useEffect(() => {
    const initCart = async () => {
      // Load Local
      const savedCart = localStorage.getItem("klipsan-cart");
      if (savedCart) {
        try { setItems(JSON.parse(savedCart)); } catch (e) { console.error(e); }
      }

      // Load Server (if logged in)
      if (isAuthenticated && token) {
        try {
          const serverCart = await apiGet<ServerCartItem[]>("/cart", token);
          const mapped = mapServerCartToLocal(serverCart);
          if (mapped.length > 0) setItems(mapped);
        } catch (e) { console.error(e); }
      }
    };

    if (isFirstMount.current) {
      initCart();
      isFirstMount.current = false;
    }
  }, [token, isAuthenticated]);

  // 2. Merge Guest Items (Only runs if we have unsynced items)
  useEffect(() => {
    if (isFirstMount.current) return;

    const unsyncedItems = items.filter(i => !i.synced);

    if (isAuthenticated && token && unsyncedItems.length > 0) {
      const merge = async () => {
        try {
          const payload = unsyncedItems.map(i => ({
            productId: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            image: i.image,
            productOption: i.option
          }));
          
          const serverCart = await apiPost<ServerCartItem[], typeof payload>("/cart/sync", payload, token);
          setItems(mapServerCartToLocal(serverCart));
        } catch (e) { console.error("Merge failed", e); }
      };
      merge();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, isAuthenticated, items]); // Add items to correctly trigger merge

  // 3. Save to Storage
  useEffect(() => {
    // Only save to storage if the user is a guest.
    if (!isAuthenticated) {
      localStorage.setItem("klipsan-cart", JSON.stringify(items));
    }
  }, [items, isAuthenticated]);

  const pushUpdate = async (id: string, qty: number, opt?: string) => {
    if (!isAuthenticated || !token) return;
    try { await apiPost("/cart/update", { productId: id, productOption: opt, quantity: qty }, token); } 
    catch (e) { console.error(e); }
  };

  const addItem = async (product: Omit<CartItem, "quantity" | "option">, quantity = 1, newoption?: string) => {
    setIsAdding(true);
    setItems(prev => {
        const exists = prev.find(i => i.id === product.id && i.option === newoption);
        if (exists) {
            return prev.map(i => i.id === product.id && i.option === newoption 
                ? { ...i, quantity: i.quantity + quantity, synced: false } 
                : i
            );
        }
        return [...prev, { ...product, quantity, option: newoption, synced: false }];
    });

    // If logged in, sync immediately to ensure data safety
    if (isAuthenticated && token) {
      const payload = {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image,
        productOption: newoption,
      };
      try {
        // The server should return the updated cart state.
        const serverCart = await apiPost<ServerCartItem[], typeof payload[]>("/cart/sync", [payload], token);
        setItems(mapServerCartToLocal(serverCart));
      } catch (e) { console.error("Failed to sync item:", e); }
    } else {
       // For guests, just rely on the optimistic update and local storage.
       await new Promise(r => setTimeout(r, 500));
    }
    setIsAdding(false);
  };

  const removeItem = (id: string, option: string | undefined) => {
    setItems(prev => prev.filter(i => !(i.id === id && i.option === option)));
    pushUpdate(id, 0, option);
  };

  const updateQuantity = (id: string, qty: number, option: string | undefined) => {
    if (qty < 1) { removeItem(id, option); return; }
    setItems(prev => prev.map(i => i.id === id && i.option === option ? { ...i, quantity: qty } : i));
    pushUpdate(id, qty, option);
  };

  const totalItem = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const totalPrice = useMemo(() => items.reduce((sum, i) => sum + (i.price * i.quantity), 0), [items]);

  return (
    <CartContext.Provider value={{ items, totalItem, totalPrice, addItem, removeItem, updateQuantity, isAdding }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}