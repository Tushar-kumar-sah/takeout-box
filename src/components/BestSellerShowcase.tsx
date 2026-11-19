"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  Package,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import styles from "./BestSellerShowcase.module.css";

interface BestSellerProductItem {
  id: string;
  name: string;
  shortTitle: string;
  category: string;
  badge: string;
  image: string;
  price: number;
  unitPrice: number;
  caseCount: number;
  rating: number;
  reviewsCount: number;
  description: string;
}

export const BestSellerShowcase: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 8 Curated top-selling commercial restaurant packaging products
  const bestSellerProducts: BestSellerProductItem[] = [
    {
      id: "dlcu16",
      name: "Clear Deli Container Cups 16 oz, Polypropylene, 500pc",
      shortTitle: "16 oz Clear Deli Container Cups",
      category: "Deli Containers",
      badge: "Top Seller",
      image: "/images/clear_deli_cup.jpg",
      price: 34.12,
      unitPrice: 0.068,
      caseCount: 500,
      rating: 4.9,
      reviewsCount: 42,
      description:
        "Commercial food service clear 16 oz deli containers with leak-proof lids for food prep, sauces, dressings, and hot/cold soups.",
    },
    {
      id: "v61bl",
      name: 'MFPP Hinged Container, Black, 6" x 6", 250pc',
      shortTitle: '6" x 6" Black MFPP Hinged Clamshell',
      category: "Hinged Containers",
      badge: "Microwave Safe",
      image: "/images/black_hinged_box.jpg",
      price: 24.55,
      unitPrice: 0.098,
      caseCount: 250,
      rating: 4.8,
      reviewsCount: 58,
      description:
        "Heavy-duty microwaveable mineral-filled polypropylene clamshell with secure snap locks. Cut and soak resistant.",
    },
    {
      id: "nbl36",
      name: "36oz Microwaveable Noodle Bowl with Lid, Black, 120 Sets",
      shortTitle: "36 oz Round Takeout Bowl with Lid",
      category: "Noodle Bowls",
      badge: "Leak Resistant",
      image: "/images/microwaveable-noodle-bowl.jpg",
      price: 45.92,
      unitPrice: 0.38,
      caseCount: 120,
      rating: 4.8,
      reviewsCount: 53,
      description:
        "Sturdy black round food bowl with crystal-clear anti-fog dome lid for ramen, noodle dishes, grain bowls, and salads.",
    },
    {
      id: "v61wh",
      name: 'MFPP Hinged Container, White, 6" x 6", 250pc',
      shortTitle: '6" x 6" White MFPP Hinged Clamshell',
      category: "Hinged Containers",
      badge: "Depot Direct",
      image: "/images/white_hinged_box.jpg",
      price: 24.55,
      unitPrice: 0.098,
      caseCount: 250,
      rating: 4.8,
      reviewsCount: 103,
      description:
        "Commercial white mineral-filled hinged container. Pristine dining presentation for sandwiches, burgers, and sides.",
    },
    {
      id: "bgrpw7",
      name: 'Bagasse Round Plate, 7", White, PFAS FREE, 1000pc',
      shortTitle: '7" Compostable Bagasse Round Plate',
      category: "Eco Dinnerware",
      badge: "100% Compostable",
      image: "/images/bagasse-round-plate.jpg",
      price: 53.43,
      unitPrice: 0.053,
      caseCount: 1000,
      rating: 4.9,
      reviewsCount: 113,
      description:
        "100% biodegradable sugarcane fiber round plate. Certified PFAS-Free, grease-resistant, and heat-tolerant commercial dinnerware.",
    },
    {
      id: "w61",
      name: 'PP Black Tray with Translucent Lid, 6" x 6", 240 Sets',
      shortTitle: '6" x 6" Rectangular Meal Prep Bento Tray',
      category: "Meal Prep",
      badge: "Stackable",
      image: "/images/rectangular_takeout_box.jpg",
      price: 55.36,
      unitPrice: 0.23,
      caseCount: 240,
      rating: 4.8,
      reviewsCount: 43,
      description:
        "Space-saving shallow bento meal prep container with tight sealing translucent lid. Freeze-safe, stackable, and microwaveable.",
    },
    {
      id: "bp01k",
      name: "Bio Box #1 - Kraft Paperboard, 450pc",
      shortTitle: "Bio Box #1 Kraft Folded Take-Out Box",
      category: "Paper Boxes",
      badge: "Grease Resistant",
      image: "/images/cat_takeout_containers.jpg",
      price: 36.8,
      unitPrice: 0.082,
      caseCount: 450,
      rating: 4.8,
      reviewsCount: 18,
      description:
        "Folded poly-lined kraft paperboard takeout box with leak-proof flaps. Ideal for hot Asian cuisine, pasta, rice, and sides.",
    },
    {
      id: "bag-5",
      name: "#5 Kraft Paper Carryout Bag - 10x7x12, 500pc",
      shortTitle: "#5 Heavy-Duty Kraft Restaurant Bag",
      category: "Bags & Sacks",
      badge: "Commercial Grade",
      image: "/images/cat_kraft_bags.jpg",
      price: 28.5,
      unitPrice: 0.057,
      caseCount: 500,
      rating: 4.7,
      reviewsCount: 22,
      description:
        "Self-opening thumb-notch heavy-duty paper grocery and restaurant bags designed for fast service takeout packing.",
    },
  ];

  // Mobile horizontal scroll controls
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className={styles.section} id="bestsellers-section" aria-label="Best Seller Products">
      <div className="container">
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.badgeWrapper}>
            <span className={styles.badge}>
              <Sparkles size={13} className={styles.badgeIcon} />
              MOST POPULAR PACKAGING
            </span>
          </div>
          <h2 className={styles.heading}>Wholesale Best Sellers</h2>
          <p className={styles.subheading}>
            Our highest-demand takeout containers, leak-proof bowls, and eco-friendly tableware
            stocked in Bakersfield for immediate commercial delivery.
          </p>
        </div>

        {/* Showcase Grid: Sticky Left Image with Logo + Right 2-Col Scrolling Products */}
        <div className={styles.showcaseGrid}>
          {/* ========================================================
              LEFT COLUMN: Pinned Sticky Image with Brand Logo
             ======================================================== */}
          <div className={styles.leftCol}>
            <div className={styles.stickyCard}>
              {/* Background Photography Banner */}
              <div className={styles.bannerImageWrapper}>
                <img
                  src="/images/bestseller_banner.jpg"
                  alt="The Takeout Box Commercial Restaurant Supply"
                  className={styles.bannerImage}
                  loading="lazy"
                />
                <div className={styles.imageOverlayGradient} />
              </div>

              {/* Prominent Official Brand Logo Card */}
              <div className={styles.logoBadgeContainer}>
                <div className={styles.logoBadge}>
                  <img
                    src="/images/takeout-logo.png"
                    alt="The Takeout Box Logo"
                    className={styles.logoImage}
                  />
                </div>
              </div>

              {/* Banner Content Card at Bottom */}
              <div className={styles.bannerContent}>
                <div className={styles.kickerTag}>
                  <ShieldCheck size={14} />
                  <span>DIRECT WHOLESALE SUPPLY</span>
                </div>
                <h3 className={styles.bannerTitle}>
                  Quality Packaging That Powers Your Kitchen
                </h3>
                <p className={styles.bannerDesc}>
                  Heavy-duty, food-safe containers engineered for high-volume prep and seamless
                  delivery.
                </p>

                <div className={styles.highlightsList}>
                  <div className={styles.highlightItem}>
                    <CheckCircle2 size={15} className={styles.checkIcon} />
                    <span>Case &amp; Pallet Volume Pricing</span>
                  </div>
                  <div className={styles.highlightItem}>
                    <CheckCircle2 size={15} className={styles.checkIcon} />
                    <span>Microwave, Freeze &amp; Leak Tested</span>
                  </div>
                  <div className={styles.highlightItem}>
                    <CheckCircle2 size={15} className={styles.checkIcon} />
                    <span>Bakersfield Warehouse Stock</span>
                  </div>
                </div>

                <Link href="/products" className={styles.bannerCta}>
                  <span>Explore All Products</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: 8 Best Seller Products (2 per row on desktop)
             ======================================================== */}
          <div className={styles.rightCol}>
            {/* Mobile Navigation Header & Swipe Hint */}
            <div className={styles.mobileNavHeader}>
              <span className={styles.mobileSwipeHint}>Swipe to view all 8 best sellers</span>
              <div className={styles.mobileArrowButtons}>
                <button
                  type="button"
                  onClick={scrollLeft}
                  className={styles.mobileArrowBtn}
                  aria-label="Scroll left"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={scrollRight}
                  className={styles.mobileArrowBtn}
                  aria-label="Scroll right"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Products Grid / Mobile Horizontal Scroll Track */}
            <div
              className={styles.productsContainer}
              ref={scrollContainerRef}
              role="region"
              aria-label="Best seller product list"
            >
              {bestSellerProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className={styles.productCard}
                  title={`View details for ${product.name}`}
                >
                  {/* Card Top / Image Area - Compact 4:3 Aspect Ratio */}
                  <div className={styles.cardImageWrapper}>
                    <span className={styles.cardBadge}>{product.badge}</span>
                    <img
                      src={product.image}
                      alt={product.shortTitle}
                      className={styles.productImage}
                      loading="lazy"
                    />
                  </div>

                  {/* Card Content - Clean & Compact like Product Page */}
                  <div className={styles.cardBody}>
                    <div className={styles.categoryAndRating}>
                      <span className={styles.cardCategory}>{product.category}</span>
                      <div className={styles.ratingBox}>
                        <Star size={11} className={styles.starIcon} fill="#f59e0b" />
                        <span className={styles.ratingVal}>{product.rating}</span>
                        <span className={styles.reviewsCount}>({product.reviewsCount})</span>
                      </div>
                    </div>

                    <h4 className={styles.cardTitle}>{product.shortTitle}</h4>
                    <p className={styles.cardDesc}>{product.description}</p>

                    {/* Card Footer: Action Button */}
                    <div className={styles.cardFooter}>
                      <div className={styles.viewBtn}>
                        <span>View Product Details</span>
                        <ArrowRight size={14} className={styles.viewBtnIcon} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Custom Scroll Bar Indicator for Mobile */}
            <div className={styles.mobileScrollTrackIndicator}>
              <div className={styles.scrollThumb} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
