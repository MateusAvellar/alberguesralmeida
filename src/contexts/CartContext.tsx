import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  room: any;
  beds: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (room: any, beds: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (room: any, beds: number) => {
    setCart([...cart, { room, beds }]);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.beds, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.room.price_per_bed * item.beds), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
