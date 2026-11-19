"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Trash2,
  ShoppingCart,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Package,
  Plus,
  Minus,
} from "lucide-react";
import styles from "./Wishlist.module.css";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { PRODUCTS, Product } from "../../data/products";
import { useCart } from "../../context/CartContext";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart, items, updateQuantity } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectCategory={() => {}}
      />

      <main className={styles.contentWrapper}>
        <div className="container">
          {/* Breadcrumb Navigation */}
          <div className={styles.breadcrumb}>
            <Link href="/" className={styles.breadcrumbLink}>
              Home
            </Link>
            <ChevronRight size={13} />
            <span style={{ color: "var(--text-main)", fontWeight: 700 }}>
              My Saved Wishlist
            </span>
          </div>

          {/* Header Row */}
          <div className={styles.headerRow}>
            <div className={styles.titleArea}>
              <h1 className={styles.pageTitle}>
                <Heart size={24} fill="#E5252A" stroke="#E5252A" />
                <span>My Saved Packaging Wishlist</span>
              </h1>
              <span className={styles.countBadge}>
                {wishlistedProducts.length} saved
              </span>
            </div>

            <Link href="/" style={{ fontSize: 13, fontWeight: 700, color: "#2563EB" }}>
              &larr; Continue Browsing Catalog
            </Link>
          </div>

          {/* Wishlist Items or Empty State */}
          {wishlistedProducts.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <Heart size={36} />
              </div>
              <h2 className={styles.emptyTitle}>Your Wishlist is Empty</h2>
              <p className={styles.emptyDesc}>
                You haven&apos;t saved any restaurant supplies to your wishlist yet.
                Click the heart icon on any paper plate, container, cup, or cutlery item to bookmark it.
              </p>
              <Link href="/" className={styles.browseBtn}>
                <Package size={16} />
                <span>Explore Restaurant Supplies</span>
              </Link>
            </div>
          ) : (
            <div className={styles.grid}>
              {wishlistedProducts.map((product) => {
                const defaultSize = product.sizes[0];
                const cartItem = items.find(
                  (item) => item.product.id === product.id && item.size.name === defaultSize.name
                );
                const inCartQty = cartItem ? cartItem.quantity : 0;

                return (
                  <div key={product.id} className={styles.wishlistCard}>
                    {/* Image & Remove Button */}
                    <div className={styles.imageFrame}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className={styles.cardImg}
                      />
                      <button
                        type="button"
                        className={styles.removeBtn}
                        onClick={() => toggleWishlist(product)}
                        title="Remove from wishlist"
                        aria-label="Remove item from wishlist"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Card Content */}
                    <div className={styles.cardBody}>
                      <Link
                        href={`/product/${product.id}`}
                        className={styles.cardTitle}
                        title={product.name}
                      >
                        {product.name}
                      </Link>

                      <div className={styles.priceRow}>
                        <span className={styles.priceMain}>
                          ${defaultSize.price.toFixed(2)}
                        </span>
                        <span className={styles.priceUnit}>
                          (${defaultSize.unitPrice.toFixed(2)}/unit)
                        </span>
                      </div>

                      <div className={styles.stockRow}>
                        <span className={styles.greenDot} />
                        <span>In Stock ({product.stockCount} cases)</span>
                      </div>

                      <div className={styles.cardActions}>
                        {inCartQty > 0 ? (
                          <div className={styles.qtyController}>
                            <button
                              type="button"
                              className={styles.qtyBtn}
                              onClick={() => updateQuantity(product.id, defaultSize.name, inCartQty - 1)}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className={styles.qtyNumber}>{inCartQty}</span>
                            <button
                              type="button"
                              className={styles.qtyBtn}
                              onClick={() => updateQuantity(product.id, defaultSize.name, inCartQty + 1)}
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className={styles.addBtn}
                            onClick={() => addToCart(product, defaultSize, 1)}
                          >
                            <ShoppingCart size={14} />
                            <span>Add to Cart</span>
                          </button>
                        )}

                        <Link
                          href={`/product/${product.id}`}
                          className={styles.viewDetailsLink}
                        >
                          View Full Details &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer onSelectCategory={() => {}} />
    </div>
  );
}
