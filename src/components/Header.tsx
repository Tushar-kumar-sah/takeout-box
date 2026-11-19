"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  MapPin,
  Phone,
  Search,
  ShoppingCart,
  Heart,
  User,
  X,
  FileText,
  Sparkles,
  Menu,
  Receipt,
  FileCheck,
  PackageCheck,
  LogOut,
  LogIn,
} from "lucide-react";
import styles from "./Header.module.css";
import { useCart } from "../context/CartContext";
import { getStoredProfile } from "../data/customerStore";
import { sanitizeSearchQuery } from "../utils/sanitize";

const SEARCH_SUGGESTIONS = [
  'Search for "paper plates"',
  'Search for "takeout containers"',
  'Search for "clear cups"',
  'Search for "aluminum foil trays"',
  'Search for "cutlery & napkins"',
  'Search for "kraft paper bags"',
  'Search for "portion cups & lids"',
  'Search for "bakery boxes"',
];

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectCategory: (categoryId: string) => void;
  onOpenWishlist?: () => void;
}

interface CurrentHeaderUser {
  name: string;
  email: string;
  avatarUrl: string;
  restaurantName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onSelectCategory,
  onOpenWishlist,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const isHomeActive = pathname === "/" || pathname === "";
  const isProductsActive =
    pathname === "/products" ||
    pathname.startsWith("/products/") ||
    pathname.startsWith("/product/");
  const { totalItems, setIsCartOpen, wishlistCount } = useCart();
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentHeaderUser | null>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Load and listen for auth, profile, and avatar changes
  useEffect(() => {
    const syncUserAuthAndProfile = () => {
      try {
        const token = localStorage.getItem("takeout_jwt_token");
        const authRaw = localStorage.getItem("takeout_user_auth");
        const storedProfile = getStoredProfile();

        let parsedAuth: any = null;
        if (authRaw) {
          try {
            parsedAuth = JSON.parse(authRaw);
          } catch {
            parsedAuth = null;
          }
        }

        const authenticated = Boolean(token);

        if (authenticated) {
          setIsLoggedIn(true);
          const name = (parsedAuth?.name || storedProfile?.name || "Member").trim();
          const email = (parsedAuth?.email || storedProfile?.email || "").trim();
          const avatarUrl =
            parsedAuth?.avatarUrl !== undefined
              ? parsedAuth.avatarUrl
              : storedProfile?.avatarUrl || "";
          const restaurantName =
            parsedAuth?.restaurantName || storedProfile?.restaurantName || "";

          setCurrentUser({
            name,
            email,
            avatarUrl,
            restaurantName,
          });
        } else {
          setIsLoggedIn(false);
          setCurrentUser(null);
        }
      } catch (err) {
        console.error("Auth sync error in Header:", err);
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    };

    syncUserAuthAndProfile();

    const handleUpdate = () => syncUserAuthAndProfile();
    window.addEventListener("storage", handleUpdate);
    window.addEventListener("takeout_profile_updated", handleUpdate);
    window.addEventListener("takeout_auth_changed", handleUpdate);

    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("takeout_profile_updated", handleUpdate);
      window.removeEventListener("takeout_auth_changed", handleUpdate);
    };
  }, []);

  const handleLogout = () => {
    setProfileOpen(false);
    try {
      localStorage.removeItem("takeout_user_auth");
      localStorage.removeItem("takeout_jwt_token");
      localStorage.removeItem("takeout_refresh_token");
      localStorage.removeItem("takeout_token_expiry");
      localStorage.removeItem("takeout_last_activity");
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("takeout_profile_updated"));
      window.dispatchEvent(new Event("takeout_auth_changed"));
    } catch (e) {
      console.error(e);
    }
    setIsLoggedIn(false);
    setCurrentUser(null);
    router.push("/login");
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Rotating category search suggestions
  const [suggestionIndex, setSuggestionIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSuggestionIndex((prev) => (prev + 1) % SEARCH_SUGGESTIONS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = sanitizeSearchQuery(searchQuery, 80).trim();
    if (clean !== searchQuery) {
      onSearchChange(clean);
    }
    if (typeof window !== "undefined") {
      if (window.location.pathname === "/products") {
        const params = new URLSearchParams(window.location.search);
        if (clean) params.set("search", clean);
        else params.delete("search");
        router.replace(`/products?${params.toString()}`);
      } else {
        router.push(clean ? `/products?search=${encodeURIComponent(clean)}` : "/products");
      }
    }
  };

  const handleWishlistClick = () => {
    if (onOpenWishlist) {
      onOpenWishlist();
    } else {
      router.push("/wishlist");
    }
  };

  return (
    <header className={styles.headerWrapper}>
      {/* Top Announcement Bar (Location, Contact & Fast Delivery info from poster) */}
      <div className={styles.announcementBar}>
        <div className={`container ${styles.announcementContent}`}>
          <div className={styles.announcementLeft}>
            <span className={styles.announcementItem}>
              <MapPin size={14} />
              5880 District Blvd. Suite 17, Bakersfield CA 93313
            </span>
            <span className={styles.announcementItem}>
              <Phone size={14} />
              +1 661-205-9667 / 661-805-9358
            </span>
          </div>

          <div className={styles.announcementRight}>
            <span className={styles.announcementTag}>Bakersfield Depot</span>
            <span className={styles.announcementItem}>
              <PackageCheck size={14} style={{ color: "var(--brand-red)" }} />
              Fast Local Delivery &amp; Bulk Tier Pricing
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={styles.headerMain}>
        <div className={`container ${styles.headerInner}`}>
          {/* Official Brand Logo */}
          <Link href="/" prefetch={true} className={styles.logoLink}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/takeout-logo.png"
              alt="The Takeout Box Restaurant Supply"
              className={styles.logoImage}
            />
          </Link>

          {/* Search Bar with Compact Rotating Category Placeholder */}
          <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              aria-label="Search restaurant packaging and supplies"
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => {
                const clean = sanitizeSearchQuery(e.target.value, 80);
                onSearchChange(clean);
              }}
              maxLength={80}
            />

            {/* Scroll-up Rotating Category Placeholder */}
            {!searchQuery && (
              <div className={styles.placeholderScroller} aria-hidden="true">
                <span key={suggestionIndex} className={styles.placeholderSlideIn}>
                  {SEARCH_SUGGESTIONS[suggestionIndex]}
                </span>
              </div>
            )}

            {searchQuery && (
              <button
                type="button"
                className={styles.searchClear}
                onClick={() => onSearchChange("")}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </form>

          {/* Navigation Links: 1st Home, 2nd Products (User Requirement) */}
          <nav className={styles.navLinks}>
            <Link
              href="/"
              className={`${styles.navLink} ${isHomeActive ? styles.navLinkActive : ""}`}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`${styles.navLink} ${isProductsActive ? styles.navLinkActive : ""}`}
            >
              Products
            </Link>
            <Link
              href="/#industries-section"
              className={styles.navLink}
              onClick={() => {
                const el = document.getElementById("industries-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Who We Supply
            </Link>
            <Link
              href="/#bulk-quote-section"
              className={styles.navLink}
              onClick={() => {
                const el = document.getElementById("bulk-quote-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Bulk Pricing
            </Link>
          </nav>

          {/* Action Buttons: Profile, Wishlist, Cart & Bulk Quote (User Requirement) */}
          <div className={styles.headerActions}>
            {/* Wishlist Logo & Counter Button - Links to dedicated /wishlist page */}
            <Link
              href="/wishlist"
              className={styles.actionIconBtn}
              aria-label="View Wishlist"
              title="Saved Wishlist Items"
            >
              <Heart
                size={20}
                fill={wishlistCount > 0 ? "#E5252A" : "none"}
                stroke={wishlistCount > 0 ? "#E5252A" : "currentColor"}
              />
              {wishlistCount > 0 && (
                <span className={styles.wishlistBadge}>{wishlistCount}</span>
              )}
            </Link>

            {/* Profile / Account Icon with Dropdown */}
            <div className={styles.profileWrapper} ref={profileRef}>
              <button
                type="button"
                className={styles.actionIconBtn}
                onClick={() => setProfileOpen(!profileOpen)}
                aria-label="User Account"
                title={isLoggedIn ? currentUser?.name || "Commercial Account" : "Log In / Sign Up"}
              >
                {isLoggedIn && currentUser?.avatarUrl ? (
                  <div className={styles.navbarAvatarWrapper}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={currentUser.avatarUrl}
                      alt={currentUser.name || "User Avatar"}
                      className={styles.navbarAvatarImg}
                    />
                  </div>
                ) : isLoggedIn && currentUser?.name ? (
                  <div className={styles.navbarInitialBadge}>
                    {currentUser.name.trim().charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <User size={20} />
                )}
              </button>

              {profileOpen && (
                <div className={styles.profileMenu}>
                  {!isLoggedIn ? (
                    /* WHEN NOT LOGGED IN: SHOW LOGIN/SIGNUP ONLY */
                    <div className={styles.loggedOutBox}>
                      <div className={styles.profileHeader}>
                        <div className={styles.profileTitle}>Commercial Account</div>
                        <div className={styles.profileSub}>Bakersfield Depot Hub</div>
                      </div>
                      <p className={styles.loggedOutText}>
                        Sign in to access your orders, saved addresses, and commercial tier pricing.
                      </p>
                      <Link
                        href="/login"
                        onClick={() => setProfileOpen(false)}
                        className={styles.dropdownAuthBtn}
                      >
                        <LogIn size={16} />
                        <span>Log In / Sign Up</span>
                      </Link>
                    </div>
                  ) : (
                    /* WHEN LOGGED IN: SHOW USER DETAILS, EDIT PROFILE, SAVED ADDRESS, ORDER HISTORY, LOG OUT */
                    <div>
                      <div className={styles.loggedInUserCard}>
                        <div className={styles.menuAvatarWrapper}>
                          {currentUser?.avatarUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={currentUser.avatarUrl}
                              alt={currentUser.name}
                              className={styles.menuAvatarImg}
                            />
                          ) : (
                            <div className={styles.menuInitialBadge}>
                              {(currentUser?.name?.trim()?.charAt(0) || "U").toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className={styles.menuUserDetails}>
                          <div className={styles.menuUserName}>
                            {currentUser?.name || "Valued Customer"}
                          </div>
                          <div className={styles.menuUserEmail}>
                            {currentUser?.email || "Commercial Account"}
                          </div>
                          {currentUser?.restaurantName && (
                            <div className={styles.menuUserRestaurant}>
                              {currentUser.restaurantName}
                            </div>
                          )}
                        </div>
                      </div>

                      <ul className={styles.profileLinks}>
                        <li>
                          <Link
                            href="/account?tab=profile"
                            className={styles.profileLinkItem}
                            onClick={() => setProfileOpen(false)}
                          >
                            <User size={16} />
                            <span>Edit Profile</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/account?tab=addresses"
                            className={styles.profileLinkItem}
                            onClick={() => setProfileOpen(false)}
                          >
                            <MapPin size={16} />
                            <span>Saved Address</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/account?tab=orders"
                            className={styles.profileLinkItem}
                            onClick={() => setProfileOpen(false)}
                          >
                            <PackageCheck size={16} />
                            <span>Order History</span>
                          </Link>
                        </li>
                        <li className={styles.menuDivider}>
                          <button
                            type="button"
                            onClick={handleLogout}
                            className={styles.menuLogoutBtn}
                          >
                            <LogOut size={16} />
                            <span>Log Out</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Cart Link (Navigates to dedicated /cart page per Requirement 8) */}
            <Link
              href="/cart"
              className={styles.cartButton}
              aria-label="View Shopping Cart"
              title="View Shopping Cart"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
            </Link>

            {/* Bulk Request button */}
            <Link
              href="/#bulk-quote-section"
              className={styles.quoteBtn}
              onClick={() => {
                const el = document.getElementById("bulk-quote-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <FileText size={15} />
              <span>Bulk Request</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
