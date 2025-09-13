import { useMemo, useState } from "react";
import { CartItem, CartSummary } from "../types/cart";
import { Product } from "../types/product";

// Mock cart data
const initialCartItems: CartItem[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    price: 99.99,
    image:
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300",
    quantity: 2,
    color: "Black",
    description:
      "Premium noise-cancelling headphones with 30-hour battery life",
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    price: 299.99,
    image:
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=300",
    quantity: 1,
    color: "Silver",
    size: "42mm",
    description: "Advanced fitness tracking with heart rate monitor and GPS",
  },
  {
    id: "3",
    name: "Portable Laptop Stand",
    price: 49.99,
    image:
      "https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=300",
    quantity: 1,
    description: "Adjustable aluminum laptop stand for ergonomic workspace",
  },
];

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addToCart = (
    product: Product,
    quantity: number,
    selectedColor?: string,
    selectedSize?: string
  ) => {};

  const cartSummary: CartSummary = useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = subtotal * 0.08; // 8% tax
    const shipping = subtotal >= 100 ? 0 : 9.99; // Free shipping over $100
    const total = subtotal + tax + shipping;

    return { subtotal, tax, shipping, total };
  }, [cartItems]);

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return {
    cartItems,
    cartSummary,
    itemCount,
    updateQuantity,
    removeItem,
    clearCart,
    addToCart,
  };
}
