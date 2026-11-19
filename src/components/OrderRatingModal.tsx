"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Star, X, Check, Sparkles, ThumbsUp } from "lucide-react";
import styles from "./OrderRatingModal.module.css";
import { submitOrderRating, OrderRating } from "../data/customerStore";
import { sanitizeMultilineText } from "../utils/sanitize";
import { ApiClient } from "../services/apiClient";

interface OrderRatingModalProps {
  orderId: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: (rating: OrderRating) => void;
  orderStatus?: string;
}

const STAR_LABELS = [
  "Tap a star to rate",
  "Poor Packaging / Service",
  "Fair Quality",
  "Good Experience",
  "Very Good & Reliable",
  "Exceptional Commercial Quality! ⭐",
];

const QUICK_TAGS = [
  "⚡ Fast Bakersfield Dispatch",
  "🛡️ Leak-Proof & Heavy Duty",
  "🌱 100% Eco & Compostable",
  "💰 Best Wholesale Case Price",
  "📦 Pristine Food-Safe Packaging",
  "🤝 Great Depot Support",
];

export const OrderRatingModal: React.FC<OrderRatingModalProps> = ({
  orderId,
  isOpen,
  onClose,
  onSubmitSuccess,
  orderStatus,
}) => {
  const [mounted, setMounted] = useState(false);
  const [selectedRating, setSelectedRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRating === 0) return;

    const ratingData: OrderRating = {
      rating: selectedRating,
      tags: selectedTags,
      feedback: sanitizeMultilineText(feedback, 500),
      submittedAt: new Date().toISOString(),
    };

    submitOrderRating(orderId, ratingData);
    ApiClient.ratings
      .submit({
        orderId,
        rating: selectedRating,
        tags: selectedTags,
        feedback: ratingData.feedback,
      })
      .catch((err) => {
        console.warn("Backend rating submission notice:", err);
      });

    setSubmitted(true);

    if (onSubmitSuccess) {
      onSubmitSuccess(ratingData);
    }
  };

  const activeRating = hoverRating || selectedRating;

  const modalContent = (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close rating modal"
          >
            <X size={18} />
          </button>

          <div className={styles.headerIconBadge}>
            <Sparkles size={12} />
            <span>Customer Feedback</span>
          </div>

          <h3 className={styles.modalTitle}>
            {orderStatus === "delivered"
              ? "How was your delivered packaging?"
              : "Rate Your Order Experience"}
          </h3>
          <p className={styles.modalSubtitle}>
            Order #{orderId} • Your rating helps us maintain top Bakersfield food packaging standards!
          </p>
        </div>

        {/* Content Body */}
        {submitted ? (
          <div className={styles.successView}>
            <div className={styles.successIconRing}>
              <Check size={32} strokeWidth={2.5} />
            </div>
            <h4 className={styles.successTitle}>Thank You for Your Feedback!</h4>
            <p className={styles.successText}>
              Your rating for <strong>Order #{orderId}</strong> has been recorded. We appreciate your partnership with The Takeout Box!
            </p>
            <button
              type="button"
              className={styles.doneBtn}
              onClick={onClose}
            >
              Done
            </button>
          </div>
        ) : (
          <form className={styles.modalBody} onSubmit={handleSubmit}>
            {/* Star Selector */}
            <div className={styles.starSection}>
              <div className={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={styles.starBtn}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setSelectedRating(star)}
                    aria-label={`${star} Stars`}
                  >
                    <Star
                      size={36}
                      fill={star <= activeRating ? "#E51A1A" : "none"}
                      stroke={star <= activeRating ? "#E51A1A" : "#CBD5E1"}
                      strokeWidth={2}
                    />
                  </button>
                ))}
              </div>
              <div className={styles.starLabel}>
                {STAR_LABELS[activeRating] || STAR_LABELS[0]}
              </div>
            </div>

            {/* Quick Feedback Tags */}
            <div className={styles.tagsSection}>
              <div className={styles.tagsTitle}>What did you appreciate most?</div>
              <div className={styles.tagsGrid}>
                {QUICK_TAGS.map((tag) => {
                  const isActive = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      className={`${styles.tagPill} ${
                        isActive ? styles.tagPillActive : ""
                      }`}
                      onClick={() => toggleTag(tag)}
                    >
                      {isActive && <Check size={12} strokeWidth={3} />}
                      <span>{tag}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Review Comment Textarea */}
            <div className={styles.textareaGroup}>
              <div className={styles.textareaLabel}>
                <span>Additional Notes (Optional)</span>
                <span className={styles.textareaCharCount}>
                  {feedback.length}/300
                </span>
              </div>
              <textarea
                className={styles.reviewTextarea}
                placeholder="Share any details about item durability, packaging quality, or local driver delivery..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value.slice(0, 300))}
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.skipBtn}
                onClick={onClose}
              >
                Skip for Now
              </button>
              <button
                type="submit"
                className={styles.submitReviewBtn}
                disabled={selectedRating === 0}
              >
                <ThumbsUp size={16} />
                <span>Submit Rating</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
