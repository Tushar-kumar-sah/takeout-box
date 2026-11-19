"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  CheckCircle,
  Truck,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Package,
} from "lucide-react";
import styles from "./CartPage.module.css";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useCart } from "../../context/CartContext";
import { PRODUCTS } from "../../data/products";
import { SuggestedProductsCarousel } from "../../components/SuggestedProductsCarousel";

export default function CartPage() {
  const {
    items,
    isLoading,
    totalItems,
    subtotal,
    // discount,
    finalTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [searchQuery, setSearchQuery] = useState("");
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const freeDeliveryThreshold = 200;
  const progressPercent = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  const router = useRouter();

  // Suggested products excluding items currently in the cart
  const cartProductIds = items.map((i) => i.product.id);
  const suggestedProducts = PRODUCTS.filter((p) => !cartProductIds.includes(p.id));

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("takeout_jwt_token") : null;
    setIsLoggedIn(Boolean(token));
  }, []);

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectCategory={() => {}}
      />

      {/* Breadcrumb Navigation */}
      <div className={styles.breadcrumbBar}>
        <div className="container">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb navigation">
            <Link href="/" className={styles.breadcrumbLink}>
              Home
            </Link>
            <ChevronRight size={13} />
            <span style={{ color: "var(--text-main)", fontWeight: 700 }}>
              Shopping Cart
            </span>
          </nav>
        </div>
      </div>

      <main className={styles.mainContent}>
        <div className="container">
          {/* Page Title & Count */}
          <div className={styles.pageHeader}>
            <div className={styles.titleWithIcon}>
              <ShoppingBag size={24} className={styles.headerIcon} />
              <h1 className={styles.pageTitle}>Your Order Cart</h1>
              <span className={styles.itemCountBadge}>
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>
            </div>
            {items.length > 0 && !checkoutComplete && (
              <button
                type="button"
                className={styles.clearAllBtn}
                onClick={clearCart}
                aria-label="Clear all items from cart"
              >
                Clear Cart
              </button>
            )}
          </div>


          {isLoggedIn && items.length > 0 && !checkoutComplete && (
            <div style={{
              background: "#F0FDF4",
              border: "1px solid #BBF7D0",
              borderRadius: "8px",
              padding: "10px 16px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              color: "#166534"
            }}>
              <CheckCircle size={16} />
              <span><strong>Account Synced:</strong> Your cart items are automatically saved to your account.</span>
            </div>
          )}

          {/* Bakersfield Local Delivery Progress Bar */}
          <div className={styles.deliveryProgressCard}>
            <div className={styles.progressTextRow}>
              {remainingForFreeDelivery === 0 ? (
                <div className={styles.freeQualifiedBadge}>
                  <Sparkles size={16} />
                  <span>Qualified for Free Delivery!</span>
                </div>
              ) : (
                <div className={styles.progressHint}>
                  <Truck size={16} />
                  <span>
                    Add <strong>${remainingForFreeDelivery.toFixed(2)}</strong> more to get{" "}
                    <strong>Free Delivery</strong> (Threshold: $200)
                  </span>
                </div>
              )}
              <span className={styles.progressPercent}>{Math.round(progressPercent)}%</span>
            </div>

            <div className={styles.progressBarTrack}>
              <div
                className={styles.progressBarFill}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Contents or Empty State or Order Placed State or Loading State */}
          {isLoading ? (
            <div className={styles.cartLoadingState}>
              <div className={styles.loadingSpinner} />
              <p className={styles.loadingText}>Loading your cart items...</p>
            </div>
          ) : checkoutComplete ? (
            <div className={styles.successState}>
              <div className={styles.successIcon}>
                <CheckCircle size={44} />
              </div>
              <h2 className={styles.successTitle}>Order Request Placed Successfully!</h2>
              <p className={styles.successText}>
                Your wholesale commercial packaging order has been logged. Our Bakersfield
                dispatch team at 5880 District Blvd is preparing your invoice &amp; delivery window.
                A confirmation has been sent to your business email.
              </p>
              <Link href="/" className={styles.continueShoppingBtn}>
                <Package size={16} />
                <span>Return to Catalog</span>
              </Link>
            </div>
          ) : items.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <ShoppingBag size={40} />
              </div>
              <h2 className={styles.emptyTitle}>Your cart is empty</h2>
              <p className={styles.emptyDesc}>
                Explore our commercial packaging categories and add restaurant supplies, meal prep
                containers, cups, and paper plates to your order.
              </p>
              <Link href="/#catalog-section" className={styles.continueShoppingBtn}>
                <Package size={16} />
                <span>Start Browsing Supplies</span>
              </Link>
            </div>
          ) : (
            <div className={styles.cartGrid}>
              {/* Left Column: Cart Items List */}
              <div className={styles.itemsColumn}>
                <div className={styles.itemsCard}>
                  {items.map((item) => {
                    const lineTotal = item.size.price * item.quantity;
                    return (
                      <div
                        key={`${item.product.id}-${item.size.name}`}
                        className={styles.cartItemRow}
                      >
                        <Link
                          href={`/product/${item.product.id}`}
                          className={styles.itemImgWrapper}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className={styles.itemImg}
                          />
                        </Link>

                        <div className={styles.itemInfo}>
                          <div className={styles.itemHeader}>
                            <Link
                              href={`/product/${item.product.id}`}
                              className={styles.itemName}
                            >
                              {item.product.name}
                            </Link>
                            <button
                              type="button"
                              className={styles.deleteBtn}
                              onClick={() =>
                                removeFromCart(item.product.id, item.size.name)
                              }
                              aria-label={`Remove ${item.product.name} from cart`}
                              title="Remove item"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          <div className={styles.itemMeta}>
                            <span className={styles.metaBadge}>Size: {item.size.name}</span>
                            <span className={styles.metaCase}>Case of {item.size.caseCount} pcs</span>
        
                          </div>

                          <div className={styles.itemBottomRow}>
                            {/* Quantity Controls */}
                            <div className={styles.qtyController}>
                              <button
                                type="button"
                                className={styles.qtyBtn}
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.size.name,
                                    item.quantity - 1
                                  )
                                }
                                aria-label="Decrease quantity"
                              >
                                <Minus size={13} />
                              </button>
                              <span className={styles.qtyNumber}>{item.quantity}</span>
                              <button
                                type="button"
                                className={styles.qtyBtn}
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.size.name,
                                    item.quantity + 1
                                  )
                                }
                                aria-label="Increase quantity"
                              >
                                <Plus size={13} />
                              </button>
                            </div>

                            {/* Price */}
                            <div className={styles.itemPricing}>
                              <div className={styles.lineTotal}>
                                ${lineTotal.toFixed(2)}
                              </div>
                              <div className={styles.eachPrice}>
                                (${item.size.price.toFixed(2)} per case)
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Order Summary */}
              <div className={styles.summaryColumn}>
                <div className={styles.summaryCard}>
                  <h3 className={styles.summaryTitle}>Order Summary</h3>

                  <div className={styles.summaryRowsList}>
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>Items Subtotal ({totalItems})</span>
                      <span className={styles.summaryVal}>${subtotal.toFixed(2)}</span>
                    </div>

                    {/* {discount > 0 && (
                      <div className={`${styles.summaryRow} ${styles.discountRow}`}>
                        <span className={styles.summaryLabel}>
                          Volume Wholesale Discount (Tier Applied)
                        </span>
                        <span className={styles.discountVal}>-${discount.toFixed(2)}</span>
                      </div>
                    )} */}

                    <div className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>Delivery Fee</span>
                      <span className={remainingForFreeDelivery === 0 ? styles.freeDeliveryText : styles.summaryVal}>
                        {remainingForFreeDelivery === 0 ? "FREE" : "$15.00"}
                      </span>
                    </div>

                    <div className={styles.totalDivider} />

                    <div className={styles.totalRow}>
                      <span className={styles.totalLabel}>Estimated Total</span>
                      <span className={styles.totalVal}>
                        ${(finalTotal + (remainingForFreeDelivery === 0 ? 0 : 15)).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={styles.checkoutBtn}
                    onClick={handleCheckout}
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight size={18} />
                  </button>

                  <div className={styles.bakersfieldNote}>
                    <ShieldCheck size={16} style={{ color: "#16A34A", flexShrink: 0 }} />
                    <span>
                      <strong>Bakersfield Local Hub:</strong> Invoices generated with Net-30 available for approved Kern County restaurant accounts.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Divider Line */}
          <hr className={styles.divider} />

          {/* Suggested Products Section with Prev and Next Scroll Controls (Requirement 8 & 5) */}
          <SuggestedProductsCarousel
            products={suggestedProducts.length > 0 ? suggestedProducts : PRODUCTS}
            title="Suggested Packaging for Your Kitchen"
            subtitle="Frequently ordered together by Bakersfield restaurants, food trucks, and caterers:"
          />
        </div>
      </main>

      {/* Footer */}
      <Footer onSelectCategory={() => {}} />
    </div>
  );
}
