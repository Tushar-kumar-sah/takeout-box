"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Star,
  CheckCircle,
  Truck,
  Tag,
  ShoppingCart,
  Flame,
  ChevronRight,
  Leaf,
  Heart,
  FileText,
} from "lucide-react";
import styles from "./ProductDetailModal.module.css";
import { Product, ProductSize, CATEGORIES } from "../data/products";
import { useCart } from "../context/CartContext";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
}) => {
  const { addToCart, setIsCartOpen, isInWishlist, toggleWishlist } = useCart();
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);

  // Reset selected size when product changes
  useEffect(() => {
    setSelectedSizeIndex(0);
  }, [product]);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [product]);

  if (!product) return null;

  const currentSize: ProductSize = product.sizes[selectedSizeIndex] || product.sizes[0];
  const originalPrice = (currentSize.price * 1.35).toFixed(2);
  const discountPercent = Math.round(
    ((parseFloat(originalPrice) - currentSize.price) / parseFloat(originalPrice)) * 100
  );

  const isWishlisted = isInWishlist(product.id);
  const categoryObj = CATEGORIES.find((c) => c.slug === product.category);

  const handleHeartClick = () => {
    setIsHeartAnimating(true);
    toggleWishlist(product);
    setTimeout(() => {
      setIsHeartAnimating(false);
    }, 500);
  };

  const handleAddToCart = () => {
    addToCart(product, currentSize, 1);
  };

  const handleBuyNow = () => {
    addToCart(product, currentSize, 1);
    setIsCartOpen(true);
    onClose();
  };

  const handleBulkQuote = () => {
    onClose();
    const bulkEl = document.getElementById("bulk-quote-section");
    if (bulkEl) {
      bulkEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close product details"
        >
          <X size={18} />
        </button>

        <div className={styles.modalContent}>
          {/* Breadcrumbs */}
          <div className={styles.breadcrumb}>
            <span className={styles.breadcrumbLink}>Home</span>
            <ChevronRight size={13} />
            <span className={styles.breadcrumbLink}>Commercial Packaging</span>
            <ChevronRight size={13} />
            <span className={styles.breadcrumbLink}>{categoryObj ? categoryObj.name : "Supplies"}</span>
            <ChevronRight size={13} />
            <span style={{ color: "var(--text-main)", fontWeight: 700 }}>
              {product.name.slice(0, 36)}...
            </span>
          </div>

          <div className={styles.grid}>
            {/* Left Column: Fixed / Sticky Image and Buttons */}
            <div className={styles.imageColumn}>
              <div className={styles.imageFrame}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.mainImage}
                />

                <div className={styles.modalBadges}>
                  {product.bestSeller && (
                    <span className={styles.bestSellerBadge}>Best Seller</span>
                  )}
                  {product.ecoFriendly && (
                    <span className={styles.ecoBadge}>
                      <Leaf size={11} />
                      100% Eco-Friendly
                    </span>
                  )}
                </div>

                {/* Love / Wishlist Heart Icon with Bubble Animation */}
                <button
                  type="button"
                  className={`${styles.modalWishlistBtn} ${
                    isWishlisted ? styles.modalWishlistBtnActive : ""
                  } ${isHeartAnimating ? styles.heartBubbleAnim : ""}`}
                  onClick={handleHeartClick}
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart
                    size={18}
                    fill={isWishlisted ? "#E5252A" : "none"}
                    stroke={isWishlisted ? "#E5252A" : "currentColor"}
                  />
                </button>
              </div>

              {/* Flipkart-style Dual Action Buttons under Image */}
              <div className={styles.actionButtonsRow}>
                <button
                  type="button"
                  className={styles.addToCartBtn}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={16} />
                  <span>ADD TO CART</span>
                </button>

                <button
                  type="button"
                  className={styles.bulkQuoteBtn}
                  onClick={handleBuyNow}
                >
                  <FileText size={16} />
                  <span>BUY NOW</span>
                </button>
              </div>

              {/* Bakersfield Local Hub Assurance */}
              <div className={styles.guaranteeBox}>
                <Truck size={18} style={{ color: "#15803D", flexShrink: 0 }} />
                <span>
                  <strong>Bakersfield Local Hub:</strong> Same-day dispatch on orders placed before 2:00 PM. Pickup available at 5880 District Blvd.
                </span>
              </div>
            </div>

            {/* Right Column: Scrollable Content with Flipkart Style Details */}
            <div className={styles.detailsColumn}>
              {/* Product Title */}
              <h2 className={styles.productTitle}>{product.name}</h2>

              {/* Ratings Row */}
              <div className={styles.ratingsRow}>
                <span className={styles.ratingBadge}>
                  {product.rating} <Star size={11} fill="#FFFFFF" />
                </span>
                <span className={styles.reviewsCount}>
                  {product.reviewsCount} Ratings &amp; 38 Reviews
                </span>
                <span className={styles.flipkartAssured}>Verified Restaurant Grade</span>
              </div>

              {/* Price Block */}
              <div className={styles.priceBlock}>
                <div className={styles.priceMainRow}>
                  <span className={styles.currentPrice}>${currentSize.price.toFixed(2)}</span>
                  <span className={styles.mrpPrice}>${originalPrice}</span>
                  <span className={styles.discountBadge}>{discountPercent}% off</span>
                </div>
                <div className={styles.caseDetailText}>
                  Case Pack: {currentSize.caseCount} pieces (${currentSize.unitPrice.toFixed(2)} per unit)
                </div>
              </div>

              {/* In-Stock Live Indicator */}
              <div className={styles.stockRow}>
                <span className={styles.greenDot} />
                <span>In Stock ({product.stockCount} cases available in Bakersfield warehouse)</span>
              </div>

              {/* Available Wholesale Offers */}
              <div className={styles.offersSection}>
                <div className={styles.offersTitle}>Available Wholesale Offers:</div>
                <div className={styles.offerItem}>
                  <Tag size={14} className={styles.offerIcon} />
                  <span>
                    <strong>Volume Discount:</strong> Instant 5% off on orders above $150.
                  </span>
                </div>
                <div className={styles.offerItem}>
                  <Tag size={14} className={styles.offerIcon} />
                  <span>
                    <strong>Pallet Tier:</strong> Extra 10% off on orders above $300 + Free Kern County Delivery.
                  </span>
                </div>
                <div className={styles.offerItem}>
                  <Truck size={14} className={styles.offerIcon} />
                  <span>
                    <strong>Local Delivery:</strong> Free door-step delivery in Bakersfield on orders above $200.
                  </span>
                </div>
              </div>

              {/* Pallet TI/HI Specification */}
              {(currentSize.palletTiHi || product.palletTiHi) && (
                <div style={{ marginTop: "0.6rem", marginBottom: "0.6rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  <strong style={{ color: "var(--text-main)" }}>Pallet TI/HI:</strong> {currentSize.palletTiHi || product.palletTiHi}
                </div>
              )}

              {/* Size / Variant Selector (Only if multiple sizes exist) */}
              {product.sizes && product.sizes.length > 1 && (
                <div className={styles.sizeVariantSection}>
                  <span className={styles.sizeLabel}>
                    Select Pack / Size Variant (SKU: {currentSize.sku}):
                  </span>
                  <div className={styles.sizeButtons}>
                    {product.sizes.map((s, idx) => (
                      <button
                        key={s.sku}
                        type="button"
                        className={`${styles.sizeBtn} ${
                          idx === selectedSizeIndex ? styles.sizeBtnActive : ""
                        }`}
                        onClick={() => setSelectedSizeIndex(idx)}
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Full Description */}
              <div className={styles.sectionTitle}>Product Description</div>
              <p className={styles.fullDescription}>{product.description}</p>

              {/* Key Highlights */}
              <div className={styles.sectionTitle}>Key Highlights &amp; Safety</div>
              <ul className={styles.highlightsList}>
                {product.features.map((feat, i) => (
                  <li key={i} className={styles.highlightItem}>
                    <CheckCircle size={14} />
                    <span>{feat}</span>
                  </li>
                ))}
                {product.temperatureRange && (
                  <li className={styles.highlightItem}>
                    <Flame size={14} />
                    <span>Operating Temperature: {product.temperatureRange}</span>
                  </li>
                )}
              </ul>

              {/* Flipkart-Style Technical Specifications Table */}
              <div className={styles.sectionTitle}>Technical Specifications</div>
              <table className={styles.specsTable}>
                <tbody>
                  <tr>
                    <td className={styles.specsLabel}>Brand</td>
                    <td className={styles.specsValue}>The Takeout Box Restaurant Supply</td>
                  </tr>
                  <tr>
                    <td className={styles.specsLabel}>Product Code (SKU)</td>
                    <td className={styles.specsValue}>{currentSize.sku}</td>
                  </tr>
                  <tr>
                    <td className={styles.specsLabel}>Material</td>
                    <td className={styles.specsValue}>{product.material}</td>
                  </tr>
                  <tr>
                    <td className={styles.specsLabel}>Selected Size</td>
                    <td className={styles.specsValue}>{currentSize.name}</td>
                  </tr>
                  <tr>
                    <td className={styles.specsLabel}>Case Quantity</td>
                    <td className={styles.specsValue}>{currentSize.caseCount} pieces per box</td>
                  </tr>
                  <tr>
                    <td className={styles.specsLabel}>Unit Cost</td>
                    <td className={styles.specsValue}>${currentSize.unitPrice.toFixed(2)} / unit</td>
                  </tr>
                  {product.temperatureRange && (
                    <tr>
                      <td className={styles.specsLabel}>Thermal Tolerance</td>
                      <td className={styles.specsValue}>{product.temperatureRange}</td>
                    </tr>
                  )}
                  <tr>
                    <td className={styles.specsLabel}>Food Safety Status</td>
                    <td className={styles.specsValue}>100% FDA Food-Contact Safe &amp; BPA-Free</td>
                  </tr>
                  <tr>
                    <td className={styles.specsLabel}>Commercial Application</td>
                    <td className={styles.specsValue}>Restaurants, Food Trucks, Cloud Kitchens, Caterers</td>
                  </tr>
                </tbody>
              </table>

              {/* Wholesale Contract Pricing Banner */}
              <div style={{ paddingBottom: 16 }}>
                <button
                  type="button"
                  onClick={handleBulkQuote}
                  style={{
                    color: "var(--brand-red)",
                    fontWeight: 500,
                    fontSize: 13,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Need 50+ cases or recurring weekly pallet delivery? Click here for Wholesale Contract Pricing &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
