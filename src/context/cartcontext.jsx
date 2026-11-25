import { createContext, useContext, useEffect, useState } from "react";

// Put this file at: src/context/CartContext.jsx
// Wrap your app with <CartProvider> (inside <BrowserRouter>) in main.jsx.

const CART_STORAGE_KEY = "thirupathi_cart";

const loadCart = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};
console.log("CartContext loaded:", import.meta.url);
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);
  const [cartOpen, setCartOpen] = useState(false);

  // keep the cart across page changes and refresh
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable - cart still works in memory */
    }
  }, [items]);

  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  // returns "added" | "limit" | "out"
  const add = (product) => {
    if (product.qty <= 0) return "out";

    const existing = items.find((item) => item._id === product._id);
    if (existing && existing.qty >= existing.stock) return "limit";

    setItems((prev) =>
      existing
        ? prev.map((item) =>
            item._id === product._id ? { ...item, qty: item.qty + 1 } : item
          )
        : [...prev, { ...product, qty: 1, stock: product.qty }]
    );

    return "added";
  };

  const updateQty = (id, delta) =>
    setItems((prev) =>
      prev
        .map((item) =>
          item._id === id
            ? { ...item, qty: Math.min(Math.max(item.qty + delta, 0), item.stock) }
            : item
        )
        .filter((item) => item.qty > 0)
    );

  const remove = (id) => setItems((prev) => prev.filter((item) => item._id !== id));

  const clear = () => setItems([]);

  const value = {
    items,
    count,
    total,
    add,
    updateQty,
    remove,
    clear,
    cartOpen,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCartContext must be used inside <CartProvider>. Wrap your app with it.");
  }
  return ctx;
}