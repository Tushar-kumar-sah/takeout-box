"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import styles from "./SuggestedProductsCarousel.module.css";
import { Product } from "../data/products";
import { ProductCard } from "./ProductCard";

interface SuggestedProductsCarouselProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export const SuggestedProductsCarousel: React.FC<SuggestedProductsCarouselProps> = ({
  products,
  title = "Suggested Packaging for Your Kitchen",
  subtitle = "Frequently restocked together by Bakersfield commercial food businesses:",
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [products]);

  const handleScroll = (direction: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    // Calculate scroll step based on visible width
    const step = Math.max(280, Math.floor(el.clientWidth * 0.75));
    const target = direction === "left" ? el.scrollLeft - step : el.scrollLeft + step;
    el.scrollTo({
      left: target,
      behavior: "smooth",
    });
  };

  if (!products || products.length === 0) return null;

  return (
    <section className={styles.sectionWrapper} aria-label={title}>
      {/* Header with Title and Prev/Next Nav Controls */}
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <div className={styles.titleRow}>
            <Sparkles size={18} className={styles.sparkleIcon} />
            <h2 className={styles.title}>{title}</h2>
          </div>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>

        {/* Prev and Next Icons with smooth interactive feedback */}
        <div className={styles.navControls}>
          <button
            type="button"
            className={`${styles.navBtn} ${!canScrollLeft ? styles.navBtnDisabled : ""}`}
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous suggested products"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            className={`${styles.navBtn} ${!canScrollRight ? styles.navBtnDisabled : ""}`}
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            aria-label="Next suggested products"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Smooth Scroll Track Container */}
      <div className={styles.trackWrapper}>
        <div ref={trackRef} className={styles.scrollTrack}>
          {products.map((p) => (
            <div key={p.id} className={styles.cardItem}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
