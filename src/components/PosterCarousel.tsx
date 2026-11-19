"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  ChefHat,
  Package,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import styles from "./PosterCarousel.module.css";
import { POSTER_SLIDES } from "../data/products";

interface PosterCarouselProps {
  onSelectCategory?: (categoryId: string) => void;
}

export const PosterCarousel: React.FC<PosterCarouselProps> = ({ onSelectCategory }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const touchStartX = useRef<number | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % POSTER_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + POSTER_SLIDES.length) % POSTER_SLIDES.length);
  };

  const goToSlide = (idx: number) => {
    setCurrentSlide(idx);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % POSTER_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, currentSlide]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    if (Math.abs(diffX) > 40) {
      if (diffX > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  const handleExploreClick = () => {
    if (onSelectCategory) {
      onSelectCategory("all");
    } else {
      const el = document.getElementById("categories-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      className={styles.sectionWrapper}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Commercial Packaging Showcase"
      id="poster-showcase-section"
    >
      <div className="container">
        {/* =========================================================
            HEADER UPON POSTER CAROUSEL (Kept like previously)
           ========================================================= */}
        <div className={styles.header}>
          <span className={styles.badge}>SPECIAL PROMOTIONS &amp; DEALS</span>
          <h2 className={styles.title}>Featured Packaging Specials</h2>
          <p className={styles.subtitle}>
            Explore our bulk savings on heavy-duty takeout containers, eco-friendly bagasse tableware, drinkware, and catering supplies.
          </p>
        </div>

        {/* =========================================================
            3-COLUMN STAGE: [ LEFT CONTENT ] [ POSTER CAROUSEL ] [ RIGHT CONTENT ]
           ========================================================= */}
        <div className={styles.posterGrid}>
          {/* 1. LEFT COLUMN: Increased Font Sizes & Logo Removed */}
          <div className={styles.leftColumn}>
            <div className={styles.brandTagline}>
              QUALITY PACKAGING &bull; RESTAURANT SUPPLY
            </div>

            <h3 className={styles.mainHeading}>
              Everything Your <span className={styles.accentText}>Food Business</span> Needs
            </h3>

            <p className={styles.subText}>
              Reliable food-service packaging for restaurants, cafés, caterers, and growing food businesses.
            </p>

            <ul className={styles.checklist}>
              <li className={styles.checkItem}>
                <span className={styles.checkCircle}>
                  <Check size={13} strokeWidth={3} />
                </span>
                <span>Bulk &amp; case pricing</span>
              </li>
              <li className={styles.checkItem}>
                <span className={styles.checkCircle}>
                  <Check size={13} strokeWidth={3} />
                </span>
                <span>Reliable stock availability</span>
              </li>
              <li className={styles.checkItem}>
                <span className={styles.checkCircle}>
                  <Check size={13} strokeWidth={3} />
                </span>
                <span>Fast shipping &amp; delivery</span>
              </li>
            </ul>

            <button
              type="button"
              onClick={handleExploreClick}
              className={styles.exploreLink}
            >
              <span>Explore Products</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* 2. CENTER COLUMN: Decreased Height (480px) & Borderless Floating Poster */}
          <div className={styles.centerColumn}>
            <div
              className={styles.carouselStage}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Outside Prev Arrow Button */}
              <button
                type="button"
                className={`${styles.navArrow} ${styles.prevArrow}`}
                onClick={prevSlide}
                aria-label="Previous Poster"
              >
                <ChevronLeft size={22} />
              </button>

              {/* Center Poster Track: 384px x 480px, object-fit: contain */}
              <div className={styles.posterTrack}>
                {POSTER_SLIDES.map((poster, index) => {
                  const isActive = index === currentSlide;
                  return (
                    <div
                      key={poster.id}
                      onClick={() => {
                        if (onSelectCategory) {
                          onSelectCategory(poster.category);
                        }
                      }}
                      className={`${styles.slide} ${isActive ? styles.slideActive : ""}`}
                      title={`Shop ${poster.title}`}
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`${index + 1} of ${POSTER_SLIDES.length}: ${poster.title}`}
                    >
                      <div className={styles.posterCard}>
                        <img
                          src={poster.image}
                          alt={poster.title}
                          className={styles.posterImg}
                          loading="eager"
                          decoding="async"
                          draggable={false}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Outside Next Arrow Button */}
              <button
                type="button"
                className={`${styles.navArrow} ${styles.nextArrow}`}
                onClick={nextSlide}
                aria-label="Next Poster"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* Outside 4 Dots (Below poster) */}
            <div className={styles.dotsContainer} role="tablist" aria-label="Poster indicators">
              {POSTER_SLIDES.map((poster, index) => (
                <button
                  key={poster.id}
                  type="button"
                  role="tab"
                  aria-selected={index === currentSlide}
                  className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ""}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to poster ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* 3. RIGHT COLUMN: Increased Font Sizes & Spacing */}
          <div className={styles.rightColumn}>
            <div className={styles.sectionOverline}>
              <span className={styles.overlineDash}>—</span>
              <span>WHY BUSINESSES CHOOSE US</span>
            </div>

            <div className={styles.benefitsList}>
              <div className={styles.benefitBlock}>
                <div className={styles.benefitIconBox}>
                  <ChefHat size={21} />
                </div>
                <div className={styles.benefitContent}>
                  <div className={styles.benefitNumber}>01</div>
                  <div className={styles.benefitTitle}>Built for Busy Kitchens</div>
                  <div className={styles.benefitDesc}>
                    Packaging and supplies designed for everyday food-service operations.
                  </div>
                </div>
              </div>

              <div className={styles.benefitBlock}>
                <div className={styles.benefitIconBox}>
                  <Package size={21} />
                </div>
                <div className={styles.benefitContent}>
                  <div className={styles.benefitNumber}>02</div>
                  <div className={styles.benefitTitle}>Order by the Case</div>
                  <div className={styles.benefitDesc}>
                    Simple bulk ordering for restaurants, catering teams, and commercial kitchens.
                  </div>
                </div>
              </div>

              <div className={styles.benefitBlock}>
                <div className={styles.benefitIconBox}>
                  <ShieldCheck size={21} />
                </div>
                <div className={styles.benefitContent}>
                  <div className={styles.benefitNumber}>03</div>
                  <div className={styles.benefitTitle}>Quality You Can Count On</div>
                  <div className={styles.benefitDesc}>
                    Practical, food-safe products selected for professional use.
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleExploreClick}
              className={styles.shopAllBtn}
            >
              <span>Shop All Products</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
