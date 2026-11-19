"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import styles from "./ExploreProductsSection.module.css";

const MAJOR_CATEGORIES = [
  {
    id: "hinged-containers",
    name: "Hinged Containers",
    slug: "hinged-containers",
    count: "45+ Products",
    description: "Vented white and black MFPP clamshells, two-color, and polystyrene containers.",
    image: "/images/white_hinged_box.jpg",
  },
  {
    id: "deli-containers",
    name: "Deli Containers",
    slug: "deli-containers",
    count: "23 Products",
    description: "Clear polypropylene deli tubs (8oz–64oz), combo sets, bulk bases, and leak-resistant matching lids.",
    image: "/images/pp-deli-container.jpg",
  },
  {
    id: "pet-cups",
    name: "PET Beverage Cups",
    slug: "pet-cups",
    count: "18+ Products",
    description: "Ultra-clear 98mm & 107mm cold drink cups with dome, flat and sip lids.",
    image: "/images/cat_cups_lids.jpg",
  },
  {
    id: "paper-products",
    name: "Paper Products & Bio Boxes",
    slug: "paper-take-out-boxes",
    count: "24+ Products",
    description: "Folded kraft takeout bio boxes, hot coffee cups, soup tubs and sleeves.",
    image: "/images/cat_soup_containers.jpg",
  },
  {
    id: "bagasse-products",
    name: "Bagasse Eco Dinnerware",
    slug: "bagasse-products",
    count: "16+ Products",
    description: "100% compostable PFAS-free sugarcane plates, bowls and matching lids.",
    image: "/images/bagasse-round-plate.jpg",
  },
  {
    id: "food-containers",
    name: "Food Containers & Bowls",
    slug: "round-containers",
    count: "20+ Products",
    description: "Microwaveable round & rectangular meal prep sets with leak-proof lids.",
    image: "/images/round_takeout_bowl.jpg",
  },
];

export const ExploreProductsSection: React.FC = () => {
  return (
    <section className={styles.exploreSection} id="products-preview-section">
      <div className="container">
        <div className={styles.headerArea}>
          <div className={styles.tagline}>
            <Sparkles size={14} />
            Wholesale Catalog
          </div>
          <h2 className={styles.heading}>Explore Our Products</h2>
          <p className={styles.subtitle}>
            Commercial-grade food service packaging, leak-proof takeout containers, and eco dinnerware
            direct from our Bakersfield depot.
          </p>
        </div>

        <div className={styles.categoryGrid}>
          {MAJOR_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className={styles.categoryCard}
            >
              <div className={styles.imageWrapper}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className={styles.categoryImage}
                  loading="lazy"
                />
              </div>

              <div className={styles.cardTop}>
                <h3 className={styles.categoryTitle}>{cat.name}</h3>
                <span className={styles.countBadge}>{cat.count}</span>
              </div>

              <p className={styles.categoryDesc}>{cat.description}</p>

              <div className={styles.cardFooter}>
                <span>Browse Category</span>
                <ArrowRight size={15} className={styles.cardArrow} />
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.ctaContainer}>
          <Link href="/products" className={styles.viewAllBtn}>
            View All Products
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
};
