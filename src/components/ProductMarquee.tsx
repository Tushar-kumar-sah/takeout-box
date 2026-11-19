"use client";

import React from "react";
import Link from "next/link";
import styles from "./ProductMarquee.module.css";

interface ProductCardItem {
  id: string;
  name: string;
  image: string;
  link: string;
}

const PRODUCT_CARDS: ProductCardItem[] = [
  { id: "food-containers", name: "Food Containers", image: "/images/cat_takeout_containers.jpg", link: "/products?category=takeout-containers" },
  { id: "takeaway-boxes", name: "Takeaway Boxes", image: "/images/black_hinged_box.jpg", link: "/products?category=hinged-containers" },
  { id: "cups-lids", name: "Cups & Lids", image: "/images/cat_cups_lids.jpg", link: "/products?category=cups-lids" },
  { id: "bags-packaging", name: "Bags & Packaging", image: "/images/cat_kraft_bags.jpg", link: "/products?category=kraft-bags" },
  { id: "cutlery-napkins", name: "Cutlery & Napkins", image: "/images/cat_cutlery.jpg", link: "/products?category=cutlery" },
  { id: "kraft-packaging", name: "Kraft Packaging", image: "/images/cat_kraft_bags.jpg", link: "/products?category=kraft-bags" },
  { id: "paper-plates", name: "Paper & Bagasse Plates", image: "/images/cat_paper_plates.jpg", link: "/products?category=bagasse-products" },
  { id: "soup-bowls", name: "Soup & Deli Bowls", image: "/images/round_takeout_bowl.jpg", link: "/products?category=soup-containers" },
  { id: "aluminum-trays", name: "Food Trays & Foil", image: "/images/cat_aluminum_trays.jpg", link: "/products?category=food-trays-plates" },
  { id: "clear-deli-cups", name: "Clear Deli Cups", image: "/images/clear_deli_cup.jpg", link: "/products?category=deli-containers" },
  { id: "white-boxes", name: "White Hinged Boxes", image: "/images/white_hinged_box.jpg", link: "/products?category=hinged-containers" },
];

export const ProductMarquee: React.FC = () => {
  // 2x duplicated array for seamless, gapless infinite auto-scrolling
  const duplicatedList = [...PRODUCT_CARDS, ...PRODUCT_CARDS];

  return (
    <section className={styles.marqueeWrapper} aria-label="Product Showcase Categories">
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrack}>
          {duplicatedList.map((item, index) => (
            <Link
              key={`${item.id}-${index}`}
              href={item.link}
              className={styles.productCard}
              title={`Shop ${item.name}`}
            >
              <div className={styles.imageBox}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.productImg}
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/product-placeholder.png";
                  }}
                />
              </div>
              <span className={styles.cardLabel}>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
