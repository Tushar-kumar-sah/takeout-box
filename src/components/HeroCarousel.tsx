"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Leaf,
  Users,
  Award,
} from "lucide-react";
import styles from "./HeroCarousel.module.css";
import { HERO_SLIDES, HeroSlide } from "../data/products";

interface HeroCarouselProps {
  onSelectCategory?: (categoryId: string) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onSelectCategory }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isDragging = useRef<boolean>(false);
  const dragStartX = useRef<number | null>(null);
  const hasMoved = useRef<boolean>(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(nextSlide, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    if (touchStartX.current !== null) {
      const touchEndX = e.changedTouches[0].clientX;
      const diffX = touchStartX.current - touchEndX;

      if (Math.abs(diffX) > 40) {
        if (diffX > 0) nextSlide();
        else prevSlide();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    hasMoved.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current && dragStartX.current !== null) {
      if (Math.abs(e.clientX - dragStartX.current) > 8) {
        hasMoved.current = true;
      }
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isDragging.current && dragStartX.current !== null) {
      const diffX = dragStartX.current - e.clientX;
      if (Math.abs(diffX) > 40) {
        if (diffX > 0) nextSlide();
        else prevSlide();
      }
    }
    isDragging.current = false;
    dragStartX.current = null;
  };

  const handleBannerClick = (category: string) => {
    if (hasMoved.current) {
      hasMoved.current = false;
      return;
    }
    if (onSelectCategory) {
      onSelectCategory(category);
    }
  };

  return (
    <section
      className={styles.carouselWrapper}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        isDragging.current = false;
      }}
      aria-label="Promotional Banners"
    >
      <div className="container">
        <div
          className={styles.carouselContainer}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {/* Full Width Slides Track */}
          <div className={styles.slidesTrack}>
            {HERO_SLIDES.map((slide: HeroSlide, index: number) => {
              const isActive = index === currentSlide;
              return (
                <div
                  key={slide.id}
                  className={`${styles.slide} ${isActive ? styles.slideActive : ""}`}
                  onClick={() => handleBannerClick(slide.ctaCategory)}
                  title={`View ${slide.title}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${HERO_SLIDES.length}: ${slide.title}`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className={styles.bannerImage}
                    style={{ objectPosition: slide.objectPosition || "center 55%" }}
                    loading="eager"
                    decoding="async"
                    draggable={false}
                  />
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            type="button"
            className={`${styles.navArrow} ${styles.prevArrow}`}
            onClick={prevSlide}
            aria-label="Previous Slide"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            className={`${styles.navArrow} ${styles.nextArrow}`}
            onClick={nextSlide}
            aria-label="Next Slide"
          >
            <ChevronRight size={22} />
          </button>

          {/* Bottom Dot Indicators */}
          <div className={styles.dotsWrapper} role="tablist" aria-label="Slide indicators">
            {HERO_SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={index === currentSlide}
                className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ""}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 4 Brand Value Pillars */}
        <div className={styles.trustBar}>
          <div className={styles.trustItem}>
            <div className={styles.trustIconBox}>
              <Award size={20} />
            </div>
            <div>
              <div className={styles.trustTitle}>Quality Packaging</div>
              <div className={styles.trustSubtitle}>Heavy-duty &amp; leak-resistant</div>
            </div>
          </div>

          <div className={styles.trustItem}>
            <div className={styles.trustIconBox}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <div className={styles.trustTitle}>Food-Safe Solutions</div>
              <div className={styles.trustSubtitle}>100% BPA-Free &amp; hygienic</div>
            </div>
          </div>

          <div className={styles.trustItem}>
            <div className={styles.trustIconBox}>
              <Users size={20} />
            </div>
            <div>
              <div className={styles.trustTitle}>Trusted Locally</div>
              <div className={styles.trustSubtitle}>Over 350+ Bakersfield businesses</div>
            </div>
          </div>

          <div className={styles.trustItem}>
            <div className={styles.trustIconBox}>
              <Leaf size={20} />
            </div>
            <div>
              <div className={styles.trustTitle}>A Greener Tomorrow</div>
              <div className={styles.trustSubtitle}>Compostable bagasse &amp; kraft</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
