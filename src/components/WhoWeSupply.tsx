"use client";

import React from "react";
import {
  UtensilsCrossed,
  Truck,
  ChefHat,
  Soup,
  Building2,
  Store,
  Sparkles,
  ShieldCheck,
  Flame,
  Snowflake,
  Droplets,
  Leaf,
} from "lucide-react";
import styles from "./WhoWeSupply.module.css";
import { INDUSTRIES } from "../data/products";

const ICON_MAP: Record<string, React.ReactNode> = {
  UtensilsCrossed: <UtensilsCrossed size={26} />,
  Truck: <Truck size={26} />,
  ChefHat: <ChefHat size={26} />,
  Soup: <Soup size={26} />,
  Building2: <Building2 size={26} />,
  Store: <Store size={26} />,
};

export const WhoWeSupply: React.FC = () => {
  return (
    <section className={styles.supplySection} id="industries-section">
      <div className="container">
        {/* Section Header */}
        <div className={styles.headerArea}>
          <div className={styles.tagline}>
            <Building2 size={14} />
            Commercial Sector Applications
          </div>
          <h2 className={styles.heading}>
            Packaging Solutions by <span className={styles.headingHighlight}>Foodservice Sector</span>
          </h2>
          <p className={styles.subtitle}>
            Engineered for high-heat grease barriers, tamper-resistant delivery transit, and multi-compartment portion control across commercial kitchens, catering, and cloud facilities.
          </p>
        </div>

        {/* Industries Grid */}
        <div className={styles.industriesGrid}>
          {INDUSTRIES.map((ind) => (
            <div key={ind.id} className={styles.industryCard}>
              <div className={styles.iconHeader}>
                <div className={styles.iconBox}>
                  {ICON_MAP[ind.iconName] || <Store size={26} />}
                </div>
              </div>

              <h3 className={styles.cardName}>{ind.name}</h3>
              <div className={styles.cardTagline}>{ind.tagline}</div>
              <p className={styles.cardDesc}>{ind.description}</p>

              <div>
                <div className={styles.popularLabel}>Most Requested Supplies:</div>
                <div className={styles.itemTags}>
                  {ind.popularItems.map((item, i) => (
                    <span key={i} className={styles.itemTag}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 5 Technical Seals Strip (From Posters #2, #3 & #4) */}
        <div className={styles.sealsBanner}>
          <div className={styles.sealItem}>
            <div className={styles.sealIcon}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className={styles.sealTitle}>100% Food Safe</div>
              <div className={styles.sealSubtitle}>BPA-Free Certified</div>
            </div>
          </div>

          <div className={styles.sealItem}>
            <div className={styles.sealIcon}>
              <Flame size={22} />
            </div>
            <div>
              <div className={styles.sealTitle}>Microwave Safe</div>
              <div className={styles.sealSubtitle}>Up to +110°C / 230°F</div>
            </div>
          </div>

          <div className={styles.sealItem}>
            <div className={styles.sealIcon}>
              <Snowflake size={22} />
            </div>
            <div>
              <div className={styles.sealTitle}>Freezer Safe</div>
              <div className={styles.sealSubtitle}>Down to -20°C / -4°F</div>
            </div>
          </div>

          <div className={styles.sealItem}>
            <div className={styles.sealIcon}>
              <Droplets size={22} />
            </div>
            <div>
              <div className={styles.sealTitle}>Leak-Proof Snap</div>
              <div className={styles.sealSubtitle}>Airtight Rim Lids</div>
            </div>
          </div>

          <div className={styles.sealItem}>
            <div className={styles.sealIcon}>
              <Leaf size={22} />
            </div>
            <div>
              <div className={styles.sealTitle}>Eco-Friendly</div>
              <div className={styles.sealSubtitle}>100% Compostable Bagasse</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
