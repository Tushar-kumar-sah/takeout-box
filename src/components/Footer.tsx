"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Globe } from "lucide-react";
import styles from "./Footer.module.css";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "../data/products";
import { DepotLocationSection } from "./DepotLocationSection";

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

interface FooterProps {
  onSelectCategory: (categorySlug: string) => void;
  hideLocationMap?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, hideLocationMap = false }) => {
  const router = useRouter();

  const handleCategoryClick = (slug: string) => {
    onSelectCategory(slug);
    if (typeof window !== "undefined") {
      router.push(`/products?category=${encodeURIComponent(slug)}`);
    }
  };

  return (
    <>
      {!hideLocationMap && <DepotLocationSection />}
      <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          {/* Brand Info Column */}
          <div className={styles.brandCol}>
            <div className={styles.brandHeaderGroup}>
              <Link
                href="/"
                className={styles.footerLogoBadge}
                onClick={() => onSelectCategory("all")}
                aria-label="The Takeout Box Home"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/takeout-logo.png"
                  alt="The Takeout Box Restaurant Supply"
                  className={styles.footerLogoImage}
                />
              </Link>

              <div className={styles.tagline}>Pack Smarter. Serve Better.</div>
            </div>
            <p className={styles.brandBio}>
              Bakersfield&apos;s leading restaurant supply depot for food packaging, leak-proof
              takeout containers, eco-friendly bagasse dinnerware, cups, cutlery, and heavy-gauge
              aluminum foil trays.
            </p>

            <div className={styles.certBadges}>
              <span className={styles.certBadge}>FDA Food-Contact Safe</span>
              <span className={styles.certBadge}>BPI Certified Compostable</span>
              <span className={styles.certBadge}>100% BPA-Free</span>
            </div>

            {/* Social Icons (Only Instagram) */}
            <div className={styles.socialGroup}>
              <a
                href="https://www.instagram.com/thetakeoutboxrestaurantsupply/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIconBtn}
                aria-label="Follow The Takeout Box on Instagram"
                title="Follow @thetakeoutboxrestaurantsupply on Instagram"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className={styles.colTitle}>Packaging Catalog</h4>
            <ul className={styles.linksList}>
              {CATEGORIES.slice(1, 8).map((cat) => (
                <li key={cat.id} className={styles.linkItem}>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick(cat.slug)}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & Industries */}
          <div>
            <h4 className={styles.colTitle}>Industries Served</h4>
            <ul className={styles.linksList}>
              <li className={styles.linkItem}>
                <a href="#industries-section">Restaurants &amp; Cafés</a>
              </li>
              <li className={styles.linkItem}>
                <a href="#industries-section">Food Trucks &amp; Carts</a>
              </li>
              <li className={styles.linkItem}>
                <a href="#industries-section">Ghost &amp; Cloud Kitchens</a>
              </li>
              <li className={styles.linkItem}>
                <a href="#industries-section">Catering &amp; Banquet Lines</a>
              </li>
              <li className={styles.linkItem}>
                <a href="#industries-section">Hoteliers &amp; Bakeries</a>
              </li>
              <li className={styles.linkItem}>
                <a href="#bulk-quote-section">Wholesale Quote Request</a>
              </li>
            </ul>
          </div>

          {/* Contact Details from Poster */}
          <div>
            <h4 className={styles.colTitle}>Bakersfield Depot</h4>
            <div className={styles.contactList}>
              <div className={styles.contactRow}>
                <MapPin size={18} className={styles.contactIcon} />
                <span>
                  5880 District Blvd. Suite 17<br />
                  Bakersfield, CA 93313
                </span>
              </div>

              <div className={styles.contactRow}>
                <Phone size={18} className={styles.contactIcon} />
                <span>
                  +1 661-205-9667<br />
                  +1 661-805-9358
                </span>
              </div>

              <div className={styles.contactRow}>
                <Globe size={18} className={styles.contactIcon} />
                <span>www.thetakeoutbox.com</span>
              </div>

              <div className={styles.contactRow}>
                <Clock size={18} className={styles.contactIcon} />
                <span>
                  Mon – Sat: 9:00 AM – 5:00 PM<br />
                  Sun: 9:00 AM – 2:00 PM
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div className={styles.bottomBar}>
          <div>
            &copy; 2026{" "}
            <a
              href="https://risings.digital/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.agencyLink}
            >
              Risings Digital
            </a>
            . All rights reserved.
          </div>
          <div className={styles.bottomLinks}>
            <Link href="/terms" className={styles.bottomLink}>Commercial Terms</Link>
            <Link href="/privacy" className={styles.bottomLink}>Privacy Policy</Link>
            <Link href="/account?tab=orders" className={styles.bottomLink}>Track Orders</Link>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
};
