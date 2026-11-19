"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Star, CheckCircle2 } from "lucide-react";
import styles from "./ReviewsModal.module.css";
import { Product } from "../data/products";

export interface ReviewItem {
  id: string;
  name: string;
  time: string; // e.g. "2 hours ago", "Yesterday at 4:10 PM", "3 days ago"
  rating: number;
  comment: string;
}

const DEFAULT_REVIEWS: ReviewItem[] = [
  {
    id: "r1",
    name: "Chef Marco Valenti",
    time: "2 hours ago",
    rating: 5,
    comment:
      "We run heavy pasta takeaway and lasagna catering trays. These containers hold high heat (+110°C) with zero buckling, and the snap-lock lids never leak marinara sauce during long delivery routes.",
  },
  {
    id: "r2",
    name: "Elena Rodriguez",
    time: "Yesterday at 3:45 PM",
    rating: 5,
    comment:
      "Bakersfield depot local delivery is always on time. We order weekly pallets of these. Rigid commercial quality, grease-resistant, and customers appreciate the food-safe BPA-free packaging.",
  },
  {
    id: "r3",
    name: "David Kim",
    time: "3 days ago",
    rating: 4,
    comment:
      "Stackable and strong. Great for 3rd-party delivery drivers. Lids stay tight and crystal clear lids let our prep team verify orders before packaging.",
  },
  {
    id: "r4",
    name: "Sarah Jenkins",
    time: "5 days ago",
    rating: 5,
    comment:
      "Excellent commercial grade supplies. Our orders arrive clean, tightly strapped, and well packaged. Best bulk pricing in Kern County.",
  },
  {
    id: "r5",
    name: "Carlos Mendez",
    time: "1 week ago",
    rating: 5,
    comment:
      "Switched our food truck fleet to these last month. Absolutely zero spills on bumpy transit routes. Fast reordering directly from Bakersfield warehouse.",
  },
  {
    id: "r6",
    name: "Amina Al-Mansoor",
    time: "2 weeks ago",
    rating: 5,
    comment:
      "Microwave-safe and freezer-safe as advertised. Our catering clients always compliment how sleek and premium the presentation looks.",
  },
];

interface ReviewsModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const ReviewsModal: React.FC<ReviewsModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      className={styles.modalOverlay}
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="reviews-modal-title"
    >
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className={styles.modalHeader}>
          <div>
            <h3 id="reviews-modal-title" className={styles.modalTitle}>
              Ratings &amp; Reviews
            </h3>
            <p className={styles.modalSubtitle}>{product.name}</p>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close ratings and reviews modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* FIXED / NON-SCROLLING 4.8 Rating Summary Card (Requirement 3) */}
        <div className={styles.fixedRatingSection}>
          <div className={styles.ratingSummaryCard}>
            <div className={styles.ratingScoreCol}>
              <div className={styles.bigRatingNumber}>{product.rating}</div>
              <div className={styles.starRow}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < Math.floor(product.rating) ? "#F59E0B" : "#E2E8F0"}
                    color={i < Math.floor(product.rating) ? "#F59E0B" : "#CBD5E1"}
                  />
                ))}
              </div>
              <div className={styles.ratingBuyerCount}>
                Based on {product.reviewsCount} verified buyers
              </div>
            </div>

            <div className={styles.ratingHighlightCol}>
              <div className={styles.highlightBadge}>
                <CheckCircle2 size={15} style={{ color: "#16A34A" }} />
                <span>100% Verified Commercial Kitchen Feedback</span>
              </div>
              <p className={styles.highlightText}>
                Tested and approved for commercial heat tolerance, airtight leak prevention, and delivery transit durability in Kern County food businesses.
              </p>
            </div>
          </div>
        </div>

        {/* SCROLLABLE Reviews List Below (Requirement 3) */}
        <div className={styles.scrollableReviewsList}>
          {DEFAULT_REVIEWS.map((rev) => (
            <div key={rev.id} className={styles.reviewItem}>
              <div className={styles.reviewItemHeader}>
                {/* Reviewer Name and TIME directly below it (no role text) */}
                <div className={styles.reviewerInfo}>
                  <div className={styles.reviewerName}>{rev.name}</div>
                  <div className={styles.reviewTime}>{rev.time}</div>
                </div>

                {/* Rating Stars on Right */}
                <div className={styles.reviewStars}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      fill={i < rev.rating ? "#F59E0B" : "#E2E8F0"}
                      color={i < rev.rating ? "#F59E0B" : "#CBD5E1"}
                    />
                  ))}
                </div>
              </div>

              <p className={styles.reviewComment}>{rev.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};
