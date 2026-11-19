"use client";

import React from "react";
import Link from "next/link";
import styles from "./IndustryBanners.module.css";

export interface IndustryBannerItem {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  image: string;
  link: string;
  categorySlug?: string;
}

const INDUSTRY_BANNERS: IndustryBannerItem[] = [
  {
    id: "bar-beverage",
    title: "Bar & Beverage",
    subtitle: "Professional drinkware for bars, events, and beverage service.",
    buttonText: "Explore Bar Essentials",
    image: "/images/banner_bar_beverage.jpg",
    link: "/products?category=cups-lids",
    categorySlug: "cups-lids",
  },
  {
    id: "restaurant-takeout",
    title: "Restaurant Takeout",
    subtitle: "Packaging designed for busy restaurant operations.",
    buttonText: "Shop Restaurant Supplies",
    image: "/images/banner_restaurant_takeout.jpg",
    link: "/products?category=takeout-containers",
    categorySlug: "takeout-containers",
  },
  {
    id: "coffee-shop-cafe",
    title: "Coffee Shop & Café",
    subtitle: "Everyday cups and food packaging for cafés and coffee shops.",
    buttonText: "Shop Café Essentials",
    image: "/images/banner_coffee_cafe.jpg",
    link: "/products?category=cups-lids",
    categorySlug: "cups-lids",
  },
  {
    id: "food-truck",
    title: "Food Truck",
    subtitle: "Durable, lightweight packaging made for fast service on the go.",
    buttonText: "View Food Truck Packaging",
    image: "/images/banner_food_truck.jpg",
    link: "/products?category=hinged-containers",
    categorySlug: "hinged-containers",
  },
];

interface IndustryBannersProps {
  onSelectCategory?: (categorySlug: string) => void;
}

export const IndustryBanners: React.FC<IndustryBannersProps> = ({
  onSelectCategory,
}) => {
  return (
    <section className={styles.industrySection} aria-label="Industry Packaging Solutions">
      <div className="container">
        <div className={styles.bannerGrid}>
          {INDUSTRY_BANNERS.map((banner) => (
            <Link
              key={banner.id}
              href={banner.link}
              prefetch={true}
              className={styles.bannerCard}
              title={`${banner.title} — ${banner.subtitle}`}
            >
              {/* Image with gradient fade on the right */}
              <div className={styles.imageWrapper}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={banner.image}
                  alt={banner.title}
                  className={styles.bannerImg}
                  loading="lazy"
                />
                <div className={styles.gradientFade} />
              </div>

              {/* Text content on the left */}
              <div className={styles.contentBox}>
                <div className={styles.textGroup}>
                  <h3 className={styles.bannerTitle}>{banner.title}</h3>
                  <p className={styles.bannerSubtitle}>{banner.subtitle}</p>
                </div>

                <div className={styles.btnWrapper}>
                  <span className={styles.pillButton}>
                    {banner.buttonText}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
