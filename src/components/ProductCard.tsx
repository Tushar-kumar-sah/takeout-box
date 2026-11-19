"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Star,
  Plus,
  Minus,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";
import styles from "./ProductCard.module.css";
import { Product, ProductSize } from "../data/products";
import { useCart } from "../context/CartContext";
import { ReviewsModal } from "./ReviewsModal";

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
}) => {
  const { items, addToCart, updateQuantity, isInWishlist, toggleWishlist } = useCart();
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);

  // Track user-selected size index on this product card (defaults to first size)
  const [selectedSizeIdx, setSelectedSizeIdx] = useState(0);
  const currentSize: ProductSize = product.sizes?.[selectedSizeIdx] || product.sizes?.[0] || {
    name: "Standard Case",
    sku: product.sku || "",
    price: product.price || 0,
    caseCount: 1,
    unitPrice: product.price || 0,
    palletTiHi: product.palletTiHi || "",
  };

  const activeSku = currentSize.sku || product.sku || "";
  const activePrice = Number(currentSize.price ?? product.price ?? 0);
  const activeSpecialPrice = currentSize.specialPrice !== undefined ? currentSize.specialPrice : product.specialPrice;
  const activePallet = currentSize.palletTiHi || product.palletTiHi || "";
  const activeImage = currentSize.image || product.image || "/images/product-placeholder.png";

  const isWishlisted = isInWishlist(product.id);

  // Find if the currently selected size is in the cart
  const cartItem = items.find(
    (item) => item.product.id === product.id && item.size.name === currentSize.name
  );
  const inCartQty = cartItem ? cartItem.quantity : 0;

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsHeartAnimating(true);
    toggleWishlist(product);
    setTimeout(() => {
      setIsHeartAnimating(false);
    }, 450);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, currentSize, 1);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, currentSize.name, inCartQty + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, currentSize.name, inCartQty - 1);
  };

  return (
    <div className={styles.card}>
      {/* Product Image & Badges (Links to product page with selected size) */}
      <Link
        href={`/product/${product.id}?size=${encodeURIComponent(currentSize.name)}`}
        className={styles.imageContainer}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={activeImage}
          alt={product.name}
          className={styles.productImage}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/images/product-placeholder.png";
          }}
        />

        {/* Top-Left Badge */}
        <div className={styles.badgesOverlay}>
          {product.bestSeller ? (
            <span className={styles.bestSellerBadge}>Best Seller</span>
          ) : product.ecoFriendly ? (
            <span className={styles.ecoBadge}>Eco</span>
          ) : null}
        </div>

        {/* Top-Right Love / Wishlist Heart Icon with Bubble Animation */}
        <button
          type="button"
          className={`${styles.wishlistBtn} ${
            isWishlisted ? styles.wishlistBtnActive : ""
          } ${isHeartAnimating ? styles.heartBubbleAnim : ""}`}
          onClick={handleHeartClick}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={15}
            fill={isWishlisted ? "#E5252A" : "none"}
            stroke={isWishlisted ? "#E5252A" : "currentColor"}
          />
        </button>
      </Link>

      {/* Content Section */}
      <div className={styles.content}>
        {/* Rating & Material / Sets Subtitle below image */}
        <div className={styles.subRow}>
          <span className={styles.specSubtitle}>
            <span className={styles.skuTag}>{activeSku}</span> • {product.material || "Commercial Grade"}
          </span>
          <button
            type="button"
            className={styles.ratingRight}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setReviewsOpen(true);
            }}
            title="Click to view ratings & reviews"
            aria-label={`View ratings and reviews for ${product.name}`}
          >
            <span>{product.rating}</span>
            <Star size={11} fill="#F59E0B" color="#F59E0B" />
          </button>
        </div>

        {/* Product Name / Description */}
        <Link
          href={`/product/${product.id}?size=${encodeURIComponent(currentSize.name)}`}
          className={styles.productName}
          title={product.name}
        >
          {product.name}
        </Link>

        {/* Interactive Size Selector Row: User clicks to dynamically view SKU, Pallet, and Pricing */}
        {product.sizes && product.sizes.length > 1 && (
          <div className={styles.sizeSelectorRow}>
            <span className={styles.sizeSelectorLabel}>Size:</span>
            <div className={styles.sizePills}>
              {product.sizes.map((sz, idx) => {
                const isActive = idx === selectedSizeIdx;
                return (
                  <button
                    key={sz.sku || sz.name}
                    type="button"
                    className={`${styles.sizePill} ${isActive ? styles.sizePillActive : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedSizeIdx(idx);
                    }}
                    title={`Select size ${sz.name} (${sz.sku})`}
                    aria-label={`Select size ${sz.name}`}
                  >
                    {sz.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Pallet TI/HI row: Dynamically reflects the selected size */}
        {activePallet && (
          <div className={styles.palletRow}>
            <span className={styles.palletLabel}>Pallet TI/HI:</span>
            <span className={styles.palletValue}>{activePallet}</span>
          </div>
        )}

        {/* Price Row: Bold Wholesale Price + Optional Special Badge for the selected size */}
        <div className={styles.priceRow}>
          <span className={styles.priceMain}>
            ${activePrice.toFixed(2)}
          </span>
          {activeSpecialPrice ? (
            <span className={styles.specialBadge}>
              Special: ${activeSpecialPrice.toFixed(2)}
            </span>
          ) : null}
        </div>

        {/* Green In Stock Line */}
        <div className={styles.stockRow}>
          <span className={styles.greenDot} />
          <span>In Stock</span>
        </div>

        {/* Card Footer: View More on Left Side, Add / [- 1 +] on Right Side */}
        <div className={styles.cardFooter}>
          <Link
            href={`/product/${product.id}?size=${encodeURIComponent(currentSize.name)}`}
            className={styles.viewMoreBtn}
          >
            <span>View More</span>
            <ChevronRight size={13} />
          </Link>

          <div className={styles.actionArea}>
            {inCartQty > 0 ? (
              <div className={styles.qtyController}>
                <button
                  type="button"
                  className={styles.qtyBtn}
                  onClick={handleDecrement}
                  aria-label="Decrease quantity"
                >
                  <Minus size={13} />
                </button>
                <span className={styles.qtyNumber}>{inCartQty}</span>
                <button
                  type="button"
                  className={styles.qtyBtn}
                  onClick={handleIncrement}
                  aria-label="Increase quantity"
                >
                  <Plus size={13} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                className={styles.addToCartBtn}
                onClick={handleAddToCart}
                aria-label={`Add ${product.name} (${currentSize.name}) to cart`}
              >
                <ShoppingCart size={13} />
                <span>Add</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Ratings & Reviews Modal */}
      <ReviewsModal
        product={product}
        isOpen={reviewsOpen}
        onClose={() => setReviewsOpen(false)}
      />
    </div>
  );
};
