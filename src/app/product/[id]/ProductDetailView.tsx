"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  Star,
  Plus,
  Minus,
  ChevronRight,
  ShoppingCart,
  FileText,
  Truck,
  Leaf,
} from "lucide-react";
import styles from "./ProductPage.module.css";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { Product, ProductSize, CATEGORIES, PRODUCTS } from "../../../data/products";
import { useCart } from "../../../context/CartContext";
import { ReviewsModal } from "../../../components/ReviewsModal";
import { SuggestedProductsCarousel } from "../../../components/SuggestedProductsCarousel";

interface ProductDetailViewProps {
  product: Product;
  initialSizeSku?: string;
  initialSizeName?: string;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  initialSizeSku,
  initialSizeName,
}) => {
  const router = useRouter();
  const { addToCart, isInWishlist, toggleWishlist, items, updateQuantity } = useCart();

  // Pre-select size based on initialSizeSku or initialSizeName
  const getInitialIndex = () => {
    if (!product.sizes || product.sizes.length === 0) return 0;
    if (initialSizeSku) {
      const idx = product.sizes.findIndex(
        (s) => s.sku?.toLowerCase() === initialSizeSku.toLowerCase()
      );
      if (idx !== -1) return idx;
    }
    if (initialSizeName) {
      const idx = product.sizes.findIndex(
        (s) => s.name.toLowerCase() === initialSizeName.toLowerCase()
      );
      if (idx !== -1) return idx;
    }
    return 0;
  };

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(getInitialIndex);

  // Sync with browser URL size parameter on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const sp = new URLSearchParams(window.location.search);
      const querySize = sp.get("size");
      if (querySize && product.sizes) {
        const idx = product.sizes.findIndex(
          (s) =>
            s.name.toLowerCase() === querySize.toLowerCase() ||
            s.sku?.toLowerCase() === querySize.toLowerCase()
        );
        if (idx !== -1) {
          setSelectedSizeIndex(idx);
        }
      }
    }
  }, [product.sizes]);

  const [isHeartAnimating, setIsHeartAnimating] = useState(false);
  const [reviewsModalOpen, setReviewsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const currentSize: ProductSize =
    product.sizes?.[selectedSizeIndex] ||
    product.sizes?.[0] || {
      name: "Standard Case",
      sku: product.sku || product.id,
      price: product.price || 41.50,
      caseCount: 120,
      unitPrice: (product.price || 41.50) / 120,
    };

  const activeSku = currentSize.sku || product.sku;
  const activePallet = currentSize.palletTiHi || product.palletTiHi;
  const activePrice = currentSize.price || product.price;
  const activeSpecialPrice = currentSize.specialPrice !== undefined ? currentSize.specialPrice : product.specialPrice;
  const effectivePrice = activeSpecialPrice || activePrice;
  const originalPrice = (currentSize.mrpPrice || product.mrpPrice || (effectivePrice * 1.25)).toFixed(2);
  const discountPercent = Math.round(
    ((parseFloat(originalPrice) - effectivePrice) / parseFloat(originalPrice)) * 100
  );
  const activeImage = currentSize.image || product.image;

  const isWishlisted = isInWishlist(product.id);
  const categoryObj = CATEGORIES.find((c) => c.slug === product.category);

  // Check current cart quantity for this selected size
  const cartItem = items.find(
    (item) => item.product.id === product.id && item.size.name === currentSize.name
  );
  const inCartQty = cartItem ? cartItem.quantity : 0;

  // Related products: explicitly linked items first (lids, inserts, combos), then same category
  const relatedProducts = useMemo(() => {
    const list: Product[] = [];
    if (product.relatedProductIds && product.relatedProductIds.length > 0) {
      for (const relId of product.relatedProductIds) {
        const found = PRODUCTS.find(
          (p) => p.id === relId.toLowerCase() || p.sku.toLowerCase() === relId.toLowerCase()
        );
        if (found && !list.some((p) => p.id === found.id) && found.id !== product.id) {
          list.push(found);
        }
      }
    }
    const sameCat = PRODUCTS.filter(
      (p) => p.category === product.category && p.id !== product.id && !list.some((item) => item.id === p.id)
    );
    list.push(...sameCat);
    if (list.length < 8) {
      const remaining = PRODUCTS.filter((p) => p.id !== product.id && !list.some((item) => item.id === p.id));
      list.push(...remaining);
    }
    return list;
  }, [product]);

  const handleHeartClick = () => {
    setIsHeartAnimating(true);
    toggleWishlist(product);
    setTimeout(() => {
      setIsHeartAnimating(false);
    }, 450);
  };

  const handleAddToCart = () => {
    addToCart(product, currentSize, 1);
  };

  const handleIncrement = () => {
    updateQuantity(product.id, currentSize.name, inCartQty + 1);
  };

  const handleDecrement = () => {
    updateQuantity(product.id, currentSize.name, inCartQty - 1);
  };

  const handleBuyNow = () => {
    if (inCartQty === 0) {
      addToCart(product, currentSize, 1);
    }
    router.push("/cart");
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectCategory={() => {}}
      />

      {/* Sticky Breadcrumb Bar */}
      <div className={styles.stickyBreadcrumbBar}>
        <div className="container">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb navigation">
            <Link href="/" className={styles.breadcrumbLink}>
              Home
            </Link>
            <ChevronRight size={13} />
            <Link href="/#catalog-section" className={styles.breadcrumbLink}>
              Commercial Packaging
            </Link>
            <ChevronRight size={13} />
            <Link href="/#categories-section" className={styles.breadcrumbLink}>
              {categoryObj ? categoryObj.name : "Supplies"}
            </Link>
            <ChevronRight size={13} />
            <span style={{ color: "var(--text-main)", fontWeight: 700 }}>
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <main className={styles.mainContent}>
        <div className="container">
          {/* Two-Column Product Layout */}
          <div className={styles.productGrid}>
            {/* Left Column: Fixed / Sticky Image and Action Buttons */}
            <div className={styles.imageColumn}>
              <div className={styles.imageFrame}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeImage}
                  alt={`${product.name} - ${currentSize.name}`}
                  className={styles.mainImg}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/product-placeholder.png";
                  }}
                />

                <div className={styles.badgesOverlay}>
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

                {/* Wishlist Love Heart Button with Bubble Animation */}
                <button
                  type="button"
                  className={`${styles.wishlistBtn} ${
                    isWishlisted ? styles.wishlistBtnActive : ""
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

              {/* Action Buttons under Image */}
              <div className={styles.actionButtonsRow}>
                {inCartQty > 0 ? (
                  <div className={styles.qtyController}>
                    <button
                      type="button"
                      className={styles.qtyBtn}
                      onClick={handleDecrement}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className={styles.qtyNumber}>{inCartQty}</span>
                    <button
                      type="button"
                      className={styles.qtyBtn}
                      onClick={handleIncrement}
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className={styles.addToCartBtn}
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart size={16} />
                    <span>ADD TO CART</span>
                  </button>
                )}

                <button
                  type="button"
                  className={styles.buyNowBtn}
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

            {/* Right Column: Clean Commercial Detail View */}
            <div className={styles.detailsColumn}>
              {/* Product SKU & Subcategory Tag */}
              <div className={styles.skuSubcategoryRow}>
                <span className={styles.skuBadge}>Product Code: {activeSku}</span>
                {product.subcategory && (
                  <span className={styles.subcategoryTag}>{product.subcategory}</span>
                )}
              </div>

              {/* Product Title / Description */}
              <h1 className={styles.productTitle}>{product.name}</h1>

              {/* Clickable Ratings & Reviews Trigger Button */}
              <button
                type="button"
                className={styles.ratingsTriggerBtn}
                onClick={() => setReviewsModalOpen(true)}
                title="Click to view verified customer ratings & reviews"
              >
                <span className={styles.ratingBadge}>
                  {product.rating} <Star size={11} fill="#FFFFFF" />
                </span>
                <span className={styles.reviewsCountText}>
                  {product.reviewsCount} Ratings &amp; 38 Reviews &rarr;
                </span>
                <span className={styles.flipkartAssured}>Verified Restaurant Grade</span>
              </button>

              {/* Interactive Size Selector Section */}
              {product.sizes && product.sizes.length > 1 && (
                <div className={styles.sizeSelectorSection}>
                  <div className={styles.sizeSectionHeader}>
                    <span className={styles.sizeSectionLabel}>Select Size:</span>
                    <span className={styles.sizeActiveLabel}>{currentSize.name}</span>
                  </div>
                  <div className={styles.sizePillsGrid}>
                    {product.sizes.map((sz, idx) => {
                      const isActive = idx === selectedSizeIndex;
                      return (
                        <button
                          key={sz.sku || sz.name}
                          type="button"
                          className={`${styles.sizePillBtn} ${isActive ? styles.sizePillBtnActive : ""}`}
                          onClick={() => setSelectedSizeIndex(idx)}
                          aria-label={`Select size ${sz.name}`}
                        >
                          <span className={styles.sizePillName}>{sz.name}</span>
                          {sz.sku && <span className={styles.sizePillSku}>SKU: {sz.sku}</span>}
                          <span className={styles.sizePillPrice}>${sz.price.toFixed(2)} / cs</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Price Block: Current Wholesale Case Price, Strikethrough MRP & % Off */}
              <div className={styles.priceBlock}>
                <div className={styles.priceMainRow}>
                  <span className={styles.currentPrice}>
                    ${effectivePrice.toFixed(2)}
                  </span>
                  <span className={styles.mrpPrice}>${originalPrice}</span>
                  <span className={styles.discountBadge}>{discountPercent}% off</span>
                </div>
                {activeSpecialPrice ? (
                  <div className={styles.specialPriceCallout}>
                    Special Tier Price: ${activeSpecialPrice.toFixed(2)} / case
                  </div>
                ) : null}
              </div>

              {/* Pallet TI/HI Specification Card from Sheet */}
              {activePallet && (
                <div className={styles.palletCard}>
                  <span className={styles.palletCardLabel}>Pallet Configuration (TI/HI):</span>
                  <span className={styles.palletCardValue}>{activePallet}</span>
                </div>
              )}

              {/* In-Stock Live Indicator */}
              <div className={styles.stockRow}>
                <span className={styles.greenDot} />
                <span>In Stock ({product.stockCount} cases available in Bakersfield warehouse)</span>
              </div>

              {/* Full Description */}
              <div className={styles.sectionTitle}>Product Description</div>
              <p className={styles.fullDescription}>{product.description}</p>
            </div>
          </div>

          {/* Divider Line */}
          <hr className={styles.divider} />

          {/* Related Products Section */}
          <SuggestedProductsCarousel
            products={relatedProducts}
            title="Related Products & Compatible Packaging"
            subtitle="Frequently ordered together for commercial restaurant operations & takeaway:"
          />
        </div>
      </main>

      {/* Ratings & Reviews Popup Modal */}
      <ReviewsModal
        product={product}
        isOpen={reviewsModalOpen}
        onClose={() => setReviewsModalOpen(false)}
      />

      {/* Footer */}
      <Footer onSelectCategory={() => {}} />
    </div>
  );
};
