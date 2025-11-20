"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  option?: string;
};
type CartContextType = {
  items: CartItem[];
  totalItem: number;
  totalPrice: number;
  addItem: (
    item: Omit<CartItem, "quantity">,
    quantity?: number,
    newoption?: string
  ) => Promise<void>;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  isAdding: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  // load from local storage on mount
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
  // save to local storage on change
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("klipsan-cart", JSON.stringify(items));
    }
    // TODO : trigger supabase
  }, [items]);

  // computed values
  const totalItem = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );
  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  // actions
  const addItem = async (
    product: Omit<CartItem, "quantity" | "option">,
    quantity = 1,
    newoption?: string
  ) => {
    setIsAdding(true);

    // simulate network - later supabasw comes here
    await new Promise((resolve) => setTimeout(resolve, 800));

    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === product.id && i.option === newoption);

      if (existingItem) {
        // const opt = existingItem["option"];
        // if (opt) {
        //   return prevItems.map((i) =>
        //     i.id === product.id
        //       ? { ...i, quantity: i.quantity + quantity, option: newoption }
        //       : i
        //   );
        // } else {
        //   return prevItems.map((i) =>
        //     i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        //   );
        // }
          return prevItems.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + quantity, option: newoption} : i
          );
      }
      return [...prevItems, { ...product, quantity, option: newoption}];
    });

    setIsAdding(false);
  };
  // ---------
  const removeItem = (id: string) => {
    setItems((prevItem) => prevItem.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((i) => (i.id === id ? { ...i, quantity: newQuantity } : i))
    );
  };

  // ------

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

// Custom hook
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
