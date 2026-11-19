"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Layers,
  Heart,
} from "lucide-react";
import styles from "./ProductCatalog.module.css";
import { Product, CATEGORIES, PRODUCTS } from "../data/products";
import { ProductCard } from "./ProductCard";
import { useCart } from "../context/CartContext";

interface ProductCatalogProps {
  selectedCategory: string;
  searchQuery: string;
  showWishlistOnly?: boolean;
  onResetFilter: () => void;
  onViewDetails?: (product: Product) => void;
  onClearWishlistFilter?: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  selectedCategory,
  searchQuery,
  showWishlistOnly = false,
  onResetFilter,
  onViewDetails,
  onClearWishlistFilter,
}) => {
  const { wishlist } = useCart();
  const [sortBy, setSortBy] = useState<string>("featured");
  const [showAll, setShowAll] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8; // 8 items per page = 2 clean rows of 4 cards

  // Automatically reset to page 1 whenever category, search query, or wishlist filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, showWishlistOnly]);

  // Filter products based on selected category, search query, and wishlist
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (showWishlistOnly) {
      result = result.filter((p) => wishlist.includes(p.id));
    } else {
      if (selectedCategory && selectedCategory !== "all") {
        const catTarget = selectedCategory.toLowerCase().trim();
        result = result.filter((p) => {
          const pCat = (p.category || "").toLowerCase().trim();
          return pCat === catTarget || pCat.replace(/\s+/g, "-") === catTarget;
        });
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          (p.sku && p.sku.toLowerCase().includes(q)) ||
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.sizes.some((s) => s.name.toLowerCase().includes(q) || (s.sku && s.sku.toLowerCase().includes(q)))
      );
    }

    // Apply Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => (a.sizes[0]?.price || a.price) - (b.sizes[0]?.price || b.price));
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => (b.sizes[0]?.price || b.price) - (a.sizes[0]?.price || a.price));
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "eco") {
      result.sort((a, b) => (b.ecoFriendly ? 1 : 0) - (a.ecoFriendly ? 1 : 0));
    }

    return result;
  }, [selectedCategory, searchQuery, showWishlistOnly, wishlist, sortBy]);

  // Active category metadata (resilient slug/id match)
  const currentCategoryObj = CATEGORIES.find(
    (c) =>
      c.slug.toLowerCase() === selectedCategory.toLowerCase() ||
      c.id.toLowerCase() === selectedCategory.toLowerCase()
  );
  const categoryTitle = showWishlistOnly
    ? "My Saved Wishlist"
    : searchQuery.trim().length > 0
    ? `Search: "${searchQuery}"`
    : currentCategoryObj
    ? currentCategoryObj.name
    : "All Packaging Supplies";

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);

  // Determine items to display:
  // When a specific category is selected, display ALL its items immediately so no products are missed.
  // In "all" mode, support paginated browsing or show-all toggle.
  const displayedProducts = useMemo(() => {
    if (showAll || (selectedCategory && selectedCategory !== "all")) {
      return filteredProducts;
    }
    const startIndex = (safePage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, showAll, safePage, selectedCategory]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const catalogEl = document.getElementById("catalog-section");
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleToggleShowAll = () => {
    setShowAll(!showAll);
    setCurrentPage(1);
  };

  return (
    <section className={styles.catalogSection} id="catalog-section">
      <div className="container">
        {/* Toolbar Header */}
        <div className={styles.toolbar}>
          <div className={styles.titleArea}>
            <h2 className={styles.categoryTitle}>
              {showWishlistOnly && <Heart size={20} fill="#E5252A" stroke="#E5252A" />}
              {categoryTitle}
              <span className={styles.itemCountBadge}>
                {filteredProducts.length} items
              </span>
            </h2>
            {showWishlistOnly ? (
              <button
                type="button"
                onClick={onClearWishlistFilter}
                style={{
                  fontSize: 12.5,
                  color: "#2563EB",
                  fontWeight: 700,
                  cursor: "pointer",
                  marginLeft: 8,
                }}
              >
                &larr; Back to All Categories
              </button>
            ) : currentCategoryObj && !searchQuery ? (
              <span className={styles.categoryDesc}>
                — {currentCategoryObj.description}
              </span>
            ) : null}
          </div>

          <div className={styles.controlsArea}>
            {/* Sort Dropdown */}
            <select
              className={styles.sortSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort products"
            >
              <option value="featured">Featured / Best Sellers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="eco">Eco-Friendly First</option>
            </select>

            {/* Show All / Paginated View Toggle */}
            <button
              type="button"
              className={`${styles.viewToggleBtn} ${showAll ? styles.viewToggleBtnActive : ""}`}
              onClick={handleToggleShowAll}
            >
              <Layers size={14} />
              <span>{showAll ? "View Paginated" : "Show All Products"}</span>
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className={styles.emptyState}>
            <h3 className={styles.emptyTitle}>
              {showWishlistOnly
                ? "Your Wishlist is Empty"
                : "No matching products found"}
            </h3>
            <p className={styles.emptyText}>
              {showWishlistOnly
                ? "Tap the heart icon on any packaging product to bookmark it for later."
                : "We couldn't find any packaging matching your current filter. Try adjusting your search or browse all supplies."}
            </p>
            <button
              type="button"
              className={styles.resetBtn}
              onClick={onResetFilter}
            >
              View All Products
            </button>
          </div>
        ) : (
          <div className={styles.productGrid}>
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        )}

        {/* Pagination Bar */}
        {!showAll && totalPages > 1 && (
          <div className={styles.paginationWrapper}>
            <div className={styles.paginationSummary}>
              Showing {(currentPage - 1) * itemsPerPage + 1} –{" "}
              {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of{" "}
              {filteredProducts.length} products
            </div>

            <div className={styles.paginationButtons}>
              <button
                type="button"
                className={styles.pageNavBtn}
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <ChevronLeft size={14} />
                <span>Prev</span>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  className={`${styles.pageNumber} ${
                    pageNum === currentPage ? styles.pageNumberActive : ""
                  }`}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </button>
              ))}

              <button
                type="button"
                className={styles.pageNavBtn}
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <span>Next</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
