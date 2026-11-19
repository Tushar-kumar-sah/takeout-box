"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertOctagon,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  ShoppingBag,
  Phone,
  ShieldAlert,
} from "lucide-react";
import styles from "./OrderFailedPage.module.css";

export default function OrderFailedPage() {
  return (
    <div className={styles.failedPage}>
      {/* Header */}
      <header className={styles.failedHeader}>
        <div className={`container ${styles.headerInner}`}>
          <Link href="/" aria-label="The Takeout Box">
            <Image
              src="/images/takeout-logo.png"
              alt="The Takeout Box"
              width={160}
              height={50}
              className={styles.logoImg}
              priority
            />
          </Link>
          <Link href="/cart" className={styles.supportPhone}>
            Return to Cart
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.mainContainer}>
        <div className={styles.failedCard}>
          <div className={styles.errorIconRing}>
            <AlertOctagon size={38} strokeWidth={2.5} />
          </div>

          <h1 className={styles.failedTitle}>Transaction Could Not Be Processed</h1>
          <p className={styles.failedSubtitle}>
            We were unable to complete authorization for this order with your financial institution.
          </p>

          {/* Cart Preservation Reassurance */}
          <div className={styles.cartPreservedAlert}>
            <ShieldAlert size={18} color="#2563EB" style={{ flexShrink: 0 }} />
            <span>
              <strong>Don&apos;t worry:</strong> Your cart items are still safely saved and no charges were completed on your card.
            </span>
          </div>

          {/* Common Reasons Checklist */}
          <div className={styles.reasonsCard}>
            <div className={styles.reasonsTitle}>Common Reasons for Commercial Card Declines:</div>
            <ul className={styles.reasonsList}>
              <li>Card spending limit for commercial packaging exceeded.</li>
              <li>Billing ZIP code or CVV mismatch on file with your bank.</li>
              <li>Bank fraud prevention triggered for wholesale bulk transactions.</li>
            </ul>
          </div>

          {/* Recovery Actions */}
          <div className={styles.actionsRow}>
            <Link href="/checkout" className={styles.retryBtn}>
              <RotateCcw size={16} />
              <span>Try Payment Again (or Choose Net-30 / Cash on Delivery)</span>
            </Link>

            <Link href="/cart" className={styles.returnCartBtn}>
              <ShoppingBag size={16} />
              <span>Review Cart Items</span>
            </Link>
          </div>

          {/* Bakersfield Depot Phone Assistance */}
          <div className={styles.supportBanner}>
            <Phone size={14} color="#E51A1A" />
            <span>Need phone support? Call Bakersfield Depot:</span>
            <a href="tel:+16612059667" className={styles.supportPhone}>
              +1 661-205-9667
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
