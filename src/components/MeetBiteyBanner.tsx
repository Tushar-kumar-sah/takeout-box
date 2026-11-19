"use client";

import React from "react";
import {
  Search,
  Sparkles,
  Scale,
  Building2,
  ShoppingCart,
  Headphones,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import styles from "./MeetBiteyBanner.module.css";

interface MeetBiteyBannerProps {
  onOpenChat?: () => void;
}

const BITEY_CAPABILITIES = [
  { icon: Search, label: "Product Search" },
  { icon: Sparkles, label: "Recommendations" },
  { icon: Scale, label: "Compare Products" },
  { icon: Building2, label: "Bulk & Wholesale Pricing" },
  { icon: ShoppingCart, label: "Order Help" },
  { icon: Headphones, label: "Account & Support" },
];

export const MeetBiteyBanner: React.FC<MeetBiteyBannerProps> = ({ onOpenChat }) => {
  const triggerOpenChat = () => {
    if (onOpenChat) {
      onOpenChat();
    } else {
      window.dispatchEvent(new CustomEvent("open-bitey-chat"));
    }
  };

  return (
    <section className={styles.biteySectionWrapper} aria-label="Meet Bitey AI Assistant">
      <div className={styles.biteyContainer}>
        {/* Left Column: AI Capabilities & Details */}
        <div className={styles.contentCol}>
          <div className={styles.brandBadge}>
            <span className={styles.brandBadgeDot} />
            <span>AI Restaurant Supply Assistant</span>
          </div>

          <div className={styles.headingWrapper}>
            <h2 className={styles.meetBiteyTitle}>
              <span className={styles.meetPrefix}>Meet</span> Bitey
            </h2>
            <div className={styles.subHeading}>Your AI Restaurant Supply Assistant!</div>
          </div>

          <p className={styles.leadDescription}>
            I can help you find the right disposable food packaging and restaurant supplies quickly
            and easily. Ask for case specs, microwave safety, Bakersfield dock pickup, or wholesale
            pallet volume pricing.
          </p>

          {/* 6 Circular Feature Badges */}
          <div className={styles.featuresGrid}>
            {BITEY_CAPABILITIES.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className={styles.featureItem}>
                  <div className={styles.featureIconCircle}>
                    <IconComp size={18} />
                  </div>
                  <span className={styles.featureLabel}>{item.label}</span>
                </div>
              );
            })}
          </div>

          {/* Call to Action Button */}
          <div className={styles.ctaBox}>
            <button
              type="button"
              className={styles.primaryChatBtn}
              onClick={triggerOpenChat}
              aria-label="Ask Bitey Anything in Chat"
            >
              <MessageSquare size={18} />
              <span>Ask Bitey Anything!</span>
              <ArrowRight size={16} />
            </button>
            <span className={styles.secondaryGuideText}>
              Physical Stock at Bakersfield Depot · Ready for Loading
            </span>
          </div>
        </div>

        {/* Right Column: High Quality Bitey Mascot Image */}
        <div className={styles.mascotCol}>
          <div className={styles.mascotCard} onClick={triggerOpenChat} role="button" tabIndex={0}>
            <div className={styles.mascotGlow} />
            <img
              src="/images/bitey-mascot.png"
              alt="Bitey - The Takeout Box AI Packaging Assistant"
              className={styles.mascotImg}
              onError={(e) => {
                // Fallback to avatar if mascot not present
                (e.target as HTMLImageElement).src = "/images/bitey-avatar.png";
              }}
            />

            {/* Status badge positioned under Bitey's legs/feet */}
            <div className={styles.mascotStatusBadge}>
              <span className={styles.liveIndicator} />
              <span className={styles.liveText}>Bitey is Online · Ready to Help</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
