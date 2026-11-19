"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import styles from "./CartDrawer.module.css";
import { useCart } from "../context/CartContext";

export const CartDrawer: React.FC = () => {
  const { toast } = useCart();

  // Overlay removed per Requirement 8: Cart is now a dedicated /cart page
  return (
    <>
      {/* Toast Notification with quick link to /cart */}
      {toast && (
        <div className={styles.toastContainer} role="status" aria-live="polite">
          <CheckCircle size={18} className={styles.toastCheck} />
          <span className={styles.toastText}>{toast.message}</span>
          <Link href="/cart" className={styles.toastCartLink}>
            <span>View Cart</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      )}
    </>
  );
};
