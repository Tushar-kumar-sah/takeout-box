"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import styles from "./CategoryBar.module.css";
import { CATEGORIES, PRODUCTS } from "../data/products";

interface CategoryBarProps {
  selectedCategory?: string;
  onSelectCategory?: (categoryId: string) => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  selectedCategory = "all",
  onSelectCategory,
}) => {
  const getProductCount = (slug: string) => {
    if (slug === "all") return PRODUCTS.length;
    return PRODUCTS.filter((p) => p.category === slug || p.familyCategory === slug).length;
  };

  return (
    <section className={styles.categorySection} id="categories-section">
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.headerTextGroup}>
            <span className={styles.kicker}>Commercial Packaging Directory</span>
            <h2 className={styles.heading}>Shop By Category</h2>
            <p className={styles.subheading}>
              Explore food-safe takeout containers, paper goods, cups, and aluminum catering supplies by category.
            </p>
          </div>
          <Link href="/products" prefetch={true} className={styles.viewAllCatalogLink}>
            <span>View Full Wholesale Catalog</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Structured Architectural Category Grid */}
        <div className={styles.categoryGrid}>
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.slug;
            const count = getProductCount(cat.slug);
            const targetUrl =
              cat.slug === "all"
                ? "/products"
                : `/products?category=${encodeURIComponent(cat.slug)}`;

            return (
              <Link
                key={cat.id}
                href={targetUrl}
                prefetch={true}
                className={`${styles.categoryCard} ${isActive ? styles.categoryCardActive : ""}`}
                title={cat.description}
              >
                {/* Architectural Product Spec Preview Image */}
                <div className={styles.cardImageWrapper}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className={styles.cardImg}
                    loading="lazy"
                  />
                </div>

                {/* Category Name & Live Item Count */}
                <div className={styles.categoryTextCol}>
                  <div className={styles.categoryNameRow}>
                    <span className={styles.categoryName}>{cat.name}</span>
                    {cat.badge && (
                      <span className={styles.badgeMini}>{cat.badge}</span>
                    )}
                  </div>
                  <div className={styles.categorySubRow}>
                    <span className={styles.categoryCount}>{count} Case Sizes</span>
                  </div>
                </div>

                <div className={styles.cardArrow}>
                  <ChevronRight size={16} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
