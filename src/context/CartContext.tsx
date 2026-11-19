"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { Product, ProductSize } from "../data/products";
import { ApiClient } from "../services/apiClient";

export interface CartItem {
  product: Product;
  size: ProductSize;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isLoading: boolean;
  addToCart: (product: Product, size: ProductSize, quantity?: number) => void;
  removeFromCart: (productId: string, sizeName: string) => void;
  updateQuantity: (productId: string, sizeName: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  finalTotal: number;

  // Wishlist feature
  wishlist: string[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;

  toast: { message: string; visible: boolean } | null;
  hideToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; visible: boolean } | null>(null);

  // Tracks if client has hydrated saved items from localStorage to prevent overwriting with []
  const isHydratedRef = useRef<boolean>(false);

  // Load cart & wishlist from localStorage on client mount, and sync with database if logged in
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("takeout_box_cart");
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
        }
      }
      const savedWishlist = localStorage.getItem("takeout_box_wishlist");
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch {
      // ignore
    } finally {
      isHydratedRef.current = true;
    }

    const syncWithDb = async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("takeout_jwt_token") : null;
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        // ONLY sync guest items if user actually added items as a guest before logging in.
        // This stops normal page refresh from repeatedly adding items on top of DB cart!
        const hasGuestCart = localStorage.getItem("takeout_guest_has_items") === "true";
        if (hasGuestCart) {
          const localRaw = localStorage.getItem("takeout_box_cart");
          if (localRaw) {
            const localItems = JSON.parse(localRaw);
            if (Array.isArray(localItems) && localItems.length > 0) {
              await ApiClient.cart.sync(localItems);
            }
          }
          localStorage.removeItem("takeout_guest_has_items");
        }

        const res = await ApiClient.cart.get();
        if (res.success && Array.isArray(res.items)) {
          setItems(res.items);
          localStorage.setItem("takeout_box_cart", JSON.stringify(res.items));
        }
      } catch {
        // Transparent fallback to localStorage
      } finally {
        setIsLoading(false);
      }
    };

    syncWithDb();

    // Listen for auth changes to sync cart
    const handleAuthChange = () => {
      setIsLoading(true);
      syncWithDb();
    };
    window.addEventListener("takeout_auth_changed", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("takeout_auth_changed", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  // Save cart to localStorage safely after client hydration
  useEffect(() => {
    if (!isHydratedRef.current) return;
    try {
      localStorage.setItem("takeout_box_cart", JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  // Save wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("takeout_box_wishlist", JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const hideToast = () => {
    setToast(null);
  };

  const addToCart = (product: Product, size: ProductSize, quantity: number = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size.name === size.name
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [...prev, { product, size, quantity }];
      }
    });

    // If user is shopping as guest, flag that there are unmerged guest items
    const token = typeof window !== "undefined" ? localStorage.getItem("takeout_jwt_token") : null;
    if (token) {
      ApiClient.cart
        .addItem({
          productId: product.id,
          sku: size.sku || product.sku,
          sizeName: size.name,
          caseCount: size.caseCount,
          quantity,
          unitPrice: size.price,
        })
        .catch(() => {});
    } else {
      try {
        localStorage.setItem("takeout_guest_has_items", "true");
      } catch {}
    }

    showToast(`Added ${quantity}x "${product.name.slice(0, 28)}... (${size.name})" to cart!`);
  };

  const removeFromCart = (productId: string, sizeName: string) => {
    setItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.size.name === sizeName))
    );

    // Synchronize removal to MySQL database if authenticated
    const token = typeof window !== "undefined" ? localStorage.getItem("takeout_jwt_token") : null;
    if (token) {
      ApiClient.cart.removeItem(productId, sizeName).catch(() => {});
    }
  };

  const updateQuantity = (productId: string, sizeName: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, sizeName);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.size.name === sizeName
          ? { ...item, quantity }
          : item
      )
    );

    // Synchronize updated quantity to MySQL database if authenticated
    const token = typeof window !== "undefined" ? localStorage.getItem("takeout_jwt_token") : null;
    if (token) {
      ApiClient.cart.updateQuantity(productId, sizeName, quantity).catch(() => {});
    }
  };

  const clearCart = () => {
    setItems([]);
    try {
      localStorage.removeItem("takeout_guest_has_items");
    } catch {}

    // Clear cart in MySQL database if authenticated
    const token = typeof window !== "undefined" ? localStorage.getItem("takeout_jwt_token") : null;
    if (token) {
      ApiClient.cart.clear().catch(() => {});
    }
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removed from your wishlist.`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`❤️ Added "${product.name.slice(0, 26)}..." to your wishlist!`);
        return [...prev, product.id];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  // Cart count reflects unique items/products added: stays 1 when increasing quantity, increases when new product is added
  const totalItems = items.length;
  const wishlistCount = wishlist.length;

  const subtotal = items.reduce((sum, item) => sum + item.size.price * item.quantity, 0);

  // Bulk discount rule: >$150 = 5% off, >$300 = 10% off
  const discount = subtotal >= 300 ? subtotal * 0.1 : subtotal >= 150 ? subtotal * 0.05 : 0;
  const finalTotal = Math.max(0, subtotal - discount);

  return (
    <CartContext.Provider
      value={{
        items,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
        discount,
        finalTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount,
        toast,
        hideToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
