"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  UtensilsCrossed,
  Truck,
  Building2,
  ChefHat,
  Soup,
  Store,
  ShieldCheck,
  Flame,
  Snowflake,
  Droplets,
  Leaf,
  ChevronDown,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Packaging3DShowcase.module.css";

interface Packaging3DShowcaseProps {
  onSelectCategory?: (categorySlug: string) => void;
}

interface SectorCard {
  id: string;
  step: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  categorySlug: string;
  icon: React.ReactNode;
  popularItems: string[];
}

const SECTOR_CARDS: SectorCard[] = [
  {
    id: "restaurants",
    step: "01",
    name: "Full-Service Restaurants & Diners",
    shortName: "Restaurants & Diners",
    tagline: "LEAK-PROOF DINE-IN TO CARRYOUT",
    description:
      "Reliable, presentable containers that preserve temperature, integrity and sauce viscosity during transit.",
    categorySlug: "hinged-containers",
    icon: <UtensilsCrossed size={20} strokeWidth={2.4} />,
    popularItems: ["Hinged Containers", "Rectangular PP Bowls", "Lidded Portion Cups", "Dinner Napkins"],
  },
  {
    id: "food-trucks",
    step: "02",
    name: "Food Trucks & Street Carts",
    shortName: "Food Trucks & Carts",
    tagline: "SPEED, DURABILITY & EASY HAND-OFF",
    description:
      "Fast-loading clamshells, durable paper food trays, and heavy-weight cutlery built for high-volume service.",
    categorySlug: "hinged-containers",
    icon: <Truck size={20} strokeWidth={2.4} />,
    popularItems: ["MFPP Clamshells", "Paper Food Trays", "Wrapped Cutlery Kits", "Kraft Carryout Bags"],
  },
  {
    id: "ghost-kitchens",
    step: "03",
    name: "Ghost Kitchens & Delivery Brands",
    shortName: "Ghost Kitchens",
    tagline: "ENGINEERED FOR 30+ MINUTE DELIVERY",
    description:
      "Vented and anti-fog lids ensure fried food stays crispy and hot entrees never leak in courier bags.",
    categorySlug: "round-containers",
    icon: <Building2 size={20} strokeWidth={2.4} />,
    popularItems: ["Vented Hinged Boxes", "Noodle Bowls with Lids", "PET Drink Cups", "Tamper-Evident Bags"],
  },
  {
    id: "caterers",
    step: "04",
    name: "Caterers & Banquet Services",
    shortName: "Caterers & Banquets",
    tagline: "HIGH-VOLUME BULK PRESENTATION",
    description:
      "Large capacity multi-compartment containers, eco dinnerware and heavy foil trays for elegant service.",
    categorySlug: "two-piece-containers",
    icon: <ChefHat size={20} strokeWidth={2.4} />,
    popularItems: ["Bagasse 3-Comp Plates", "Compartment Trays", "Aluminum Foil Pans", "Catering Cutlery"],
  },
  {
    id: "asian-dining",
    step: "05",
    name: "Asian Dining & Noodle Bars",
    shortName: "Noodle Bars & Asian Dining",
    tagline: "DEEP BOWLS & BROTH-SEPARATED INSERTS",
    description:
      "Microwaveable noodle bowls with leak-proof lids and separate tray inserts to keep ramen and pho noodles firm.",
    categorySlug: "noodle-bowls",
    icon: <Soup size={20} strokeWidth={2.4} />,
    popularItems: ["36oz/42oz/50oz Noodle Bowls", "Noodle Bowl Inserts", "Soup Cups & Lids", "Chopsticks"],
  },
  {
    id: "bakeries",
    step: "06",
    name: "Bakeries, Cafés & Delis",
    shortName: "Bakeries & Cafés",
    tagline: "CRYSTAL-CLEAR PRODUCT SHOWCASE",
    description:
      "Ultra-clear PET cups, portion cups for sauces and dressings, and deli tubs that highlight freshness.",
    categorySlug: "deli-containers",
    icon: <Store size={20} strokeWidth={2.4} />,
    popularItems: ["Clear Deli Cups & Lids", "PET Cold Cups & Dome Lids", "Pastry Bags", "Coffee Sleeves"],
  },
];

export const Packaging3DShowcase: React.FC<Packaging3DShowcaseProps> = ({
  onSelectCategory,
}) => {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  const handleCardClick = (slug: string) => {
    if (onSelectCategory) {
      onSelectCategory(slug);
    } else {
      router.push(slug === "all" ? "/products" : `/products?category=${encodeURIComponent(slug)}`);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.config({
      ignoreMobileResize: true,
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    });

    const sectionEl = sectionRef.current;
    const stageEl = stageRef.current;
    if (!sectionEl || !stageEl) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth <= 768;
      const cards = cardRefs.current;
      const numCards = cards.length; // 6 cards

      // 3D Stacking Parameters
      // yStep: vertical offset for stacked cards behind active card
      // scaleStep: scale decrement for each layer in depth
      // exitY: distance to glide upward when exiting
      const yStep = isMobile ? 18 : 30;
      const scaleStep = 0.055;
      const exitY = isMobile ? -130 : -180;
      const exitScale = 0.94;

      // Initial visual stack setup (State 0, before user scrolls)
      // Card 0 is active in front (Level 0).
      // Card 1 peeks out right behind it (Level 1).
      // Card 2 peeks out behind Card 1 (Level 2).
      // Card 3 peeks out behind Card 2 (Level 3).
      // Cards 4 & 5 wait deeper in the stack.
      cards.forEach((card, i) => {
        if (!card) return;
        if (i === 0) {
          gsap.set(card, {
            y: 0,
            scale: 1.0,
            opacity: 1.0,
            zIndex: 30,
            visibility: "visible",
            pointerEvents: "auto",
          });
        } else if (i === 1) {
          gsap.set(card, {
            y: yStep,
            scale: 1.0 - scaleStep,
            opacity: 0.82,
            zIndex: 25,
            visibility: "visible",
            pointerEvents: "none",
          });
        } else if (i === 2) {
          gsap.set(card, {
            y: yStep * 2,
            scale: 1.0 - scaleStep * 2,
            opacity: 0.52,
            zIndex: 20,
            visibility: "visible",
            pointerEvents: "none",
          });
        } else if (i === 3) {
          gsap.set(card, {
            y: yStep * 3,
            scale: 1.0 - scaleStep * 3,
            opacity: 0.24,
            zIndex: 15,
            visibility: "visible",
            pointerEvents: "none",
          });
        } else {
          gsap.set(card, {
            y: yStep * 4,
            scale: 1.0 - scaleStep * 4,
            opacity: 0,
            zIndex: 10 - i,
            visibility: "hidden",
            pointerEvents: "none",
          });
        }
      });

      // Pinned ScrollTrigger timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: "top top",
          end: isMobile ? "+=2200" : "+=3200",
          pin: stageEl,
          pinSpacing: true,
          scrub: isMobile ? 0.6 : 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            // Synchronized sector badge indicator based on the active front card
            let idx = 0;
            if (p < 0.10) idx = 0;
            else if (p < 0.27) idx = 1;
            else if (p < 0.44) idx = 2;
            else if (p < 0.61) idx = 3;
            else if (p < 0.77) idx = 4;
            else idx = 5;
            setActiveStep(idx);
          },
        },
      });

      // Scroll hint fades out early as soon as scrolling starts
      if (scrollIndicatorRef.current) {
        tl.to(
          scrollIndicatorRef.current,
          { opacity: 0, y: 10, duration: 0.2, ease: "power1.out" },
          0
        );
      }

      // =========================================================
      // 3D VERTICAL CARD STACK SCROLLING (Cards move smoothly in depth)
      // Card N glides upward and exits out of the top,
      // while Card N+1 naturally moves forward from behind to become active!
      // =========================================================
      const transitionDuration = 1.0;
      const dwellDuration = 0.35;
      const stepInterval = transitionDuration + dwellDuration;

      for (let s = 0; s < numCards - 1; s++) {
        const startTime = 0.25 + s * stepInterval;
        const endTime = startTime + transitionDuration;

        // 1. Outgoing active card (Card s): Moves upward and fades out
        if (cards[s]) {
          tl.to(
            cards[s],
            {
              y: exitY,
              scale: exitScale,
              opacity: 0,
              pointerEvents: "none",
              duration: transitionDuration,
              ease: "power1.inOut",
            },
            startTime
          );
          tl.set(cards[s], { visibility: "hidden" }, endTime);
        }

        // 2. Incoming card (Card s + 1): Glides forward from Level 1 to Level 0 (Active Front)
        if (cards[s + 1]) {
          tl.set(cards[s + 1], { zIndex: 30, visibility: "visible" }, startTime);
          tl.to(
            cards[s + 1],
            {
              y: 0,
              scale: 1.0,
              opacity: 1.0,
              pointerEvents: "auto",
              duration: transitionDuration,
              ease: "power1.inOut",
            },
            startTime
          );
        }

        // 3. Subsequent cards in the stack behind: each advances forward by 1 level
        for (let j = s + 2; j < numCards; j++) {
          if (!cards[j]) continue;
          const newPos = j - (s + 1);

          if (newPos === 1) {
            // Becomes Level 1 (immediately behind active)
            tl.set(cards[j], { zIndex: 25 }, startTime);
            tl.to(
              cards[j],
              {
                y: yStep,
                scale: 1.0 - scaleStep,
                opacity: 0.82,
                duration: transitionDuration,
                ease: "power1.inOut",
              },
              startTime
            );
          } else if (newPos === 2) {
            // Becomes Level 2 (second behind active)
            tl.set(cards[j], { zIndex: 20 }, startTime);
            tl.to(
              cards[j],
              {
                y: yStep * 2,
                scale: 1.0 - scaleStep * 2,
                opacity: 0.52,
                duration: transitionDuration,
                ease: "power1.inOut",
              },
              startTime
            );
          } else if (newPos === 3) {
            // Becomes Level 3 (enters visible stack)
            tl.set(cards[j], { visibility: "visible", zIndex: 15 }, startTime);
            tl.to(
              cards[j],
              {
                y: yStep * 3,
                scale: 1.0 - scaleStep * 3,
                opacity: 0.24,
                duration: transitionDuration,
                ease: "power1.inOut",
              },
              startTime
            );
          } else {
            // Stays deeper in stack
            tl.to(
              cards[j],
              {
                y: yStep * 4,
                scale: 1.0 - scaleStep * 4,
                opacity: 0,
                duration: transitionDuration,
                ease: "power1.inOut",
              },
              startTime
            );
          }
        }
      }

      // Final dwell on Card 6 (Card 5): holds stably in place before unpinning cleanly
      tl.to({}, { duration: 1.4 });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.showcaseContainer}
      aria-label="Foodservice Sector Packaging Showcase"
      id="foodservice-showcase-section"
    >
      {/* Pinned Showcase Viewport */}
      <div ref={stageRef} className={styles.pinnedStage}>
        {/* Soft Dimmed Real Packaging Background Image */}
        <div className={styles.backgroundWrapper}>
          <img
            src="/images/showcase_bg.jpg"
            alt="Foodservice Packaging & Restaurant Supply Countertop"
            className={styles.bgImage}
            loading="eager"
            decoding="async"
            draggable={false}
          />
          <div className={styles.bgOverlay} />
        </div>

        {/* 2-Column Split: [Left Fixed Text] [Right Scrolling Cards Slot] */}
        <div className={styles.stageContent}>
          {/* =========================================================
              LEFT COLUMN: Fixed Headline, Context & Live Sector Badge
             ========================================================= */}
          <div className={styles.leftContentColumn}>
            {/* Small uppercase label */}
            <div className={styles.overlineTag}>
              <span className={styles.overlineLine} />
              <span>FOOD SERVICE PACKAGING</span>
              <span className={styles.overlineLine} />
            </div>

            {/* Main Headline */}
            <h2 className={styles.mainHeadline}>
              Packaging Solutions for the{" "}
              <span className={styles.highlightTextWrapper}>
                Foodservice Industry
                <svg
                  className={styles.brushUnderline}
                  viewBox="0 0 280 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 13C60 4 170 3 277 10C240 16 100 17 25 15"
                    stroke="#15803d"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </h2>

            {/* Supporting Text */}
            <p className={styles.supportingText}>
              Engineered for high-heat grease barriers, tamper-resistant delivery transit,
              and multi-compartment portion control across commercial kitchens, catering,
              and cloud facilities.
            </p>

            {/* Live Synchronized Sector Pill */}
            <div className={styles.sectorBadge}>
              <span className={styles.sectorBadgeDot} />
              <span>
                Sector {SECTOR_CARDS[activeStep]?.step} of 06 &bull; {SECTOR_CARDS[activeStep]?.shortName}
              </span>
            </div>

            {/* Subtle Scroll Indicator */}
            <div ref={scrollIndicatorRef} className={styles.scrollIndicator}>
              <div className={styles.mouseIcon}>
                <span className={styles.mouseWheel} />
              </div>
              <span>Scroll to explore sectors</span>
              <ChevronDown size={14} className={styles.scrollChevron} />
            </div>
          </div>

          {/* =========================================================
              RIGHT COLUMN: Single-Card Viewport (Strict overflow:hidden)
             ========================================================= */}
          <div className={styles.rightCardsSlot}>
            {SECTOR_CARDS.map((card, idx) => (
              <div
                key={card.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className={styles.compactCard}
                onClick={() => handleCardClick(card.categorySlug)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleCardClick(card.categorySlug);
                  }
                }}
                title={`Shop ${card.name}`}
                id={`card-sector-${card.id}`}
              >
                <div className={styles.cardHeaderRow}>
                  <div className={styles.cardIconBox}>{card.icon}</div>
                  <span className={styles.cardStepBadge}>{card.step} / 06</span>
                </div>

                <h3 className={styles.cardName}>{card.name}</h3>
                <div className={styles.cardTagline}>{card.tagline}</div>
                <p className={styles.cardDesc}>{card.description}</p>

                <div className={styles.suppliesLabel}>Most Requested Supplies:</div>
                <div className={styles.tagsWrapper}>
                  {card.popularItems.map((item, itemIdx) => (
                    <span key={itemIdx} className={styles.supplyTag}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================
          TECHNICAL & COMPLIANCE SEALS BANNER (Black & Red Colorway)
          Placed directly below the pinned container
         ========================================================= */}
      <div className={styles.sealsContainer}>
        <div className="container">
          <div className={styles.sealsBanner}>
            <div className={styles.sealItem}>
              <div className={styles.sealIcon}>
                <ShieldCheck size={22} strokeWidth={2.4} />
              </div>
              <div>
                <div className={styles.sealTitle}>100% Food Safe</div>
                <div className={styles.sealSubtitle}>BPA-Free Certified</div>
              </div>
            </div>

            <div className={styles.sealItem}>
              <div className={styles.sealIcon}>
                <Flame size={22} strokeWidth={2.4} />
              </div>
              <div>
                <div className={styles.sealTitle}>Microwave Safe</div>
                <div className={styles.sealSubtitle}>Up to +110°C / 230°F</div>
              </div>
            </div>

            <div className={styles.sealItem}>
              <div className={styles.sealIcon}>
                <Snowflake size={22} strokeWidth={2.4} />
              </div>
              <div>
                <div className={styles.sealTitle}>Freezer Safe</div>
                <div className={styles.sealSubtitle}>Down to -20°C / -4°F</div>
              </div>
            </div>

            <div className={styles.sealItem}>
              <div className={styles.sealIcon}>
                <Droplets size={22} strokeWidth={2.4} />
              </div>
              <div>
                <div className={styles.sealTitle}>Leak-Proof Snap</div>
                <div className={styles.sealSubtitle}>Airtight Rim Lids</div>
              </div>
            </div>

            <div className={styles.sealItem}>
              <div className={styles.sealIcon}>
                <Leaf size={22} strokeWidth={2.4} />
              </div>
              <div>
                <div className={styles.sealTitle}>Eco-Friendly</div>
                <div className={styles.sealSubtitle}>100% Compostable Bagasse</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
