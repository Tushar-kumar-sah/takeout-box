"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "../components/Header";
import { HeroCarousel } from "../components/HeroCarousel";
import { ProductMarquee } from "../components/ProductMarquee";
import { CategoryBar } from "../components/CategoryBar";
import { IndustryBanners } from "../components/IndustryBanners";
import { BulkRequest } from "../components/BulkRequest";
import { PosterCarousel } from "../components/PosterCarousel";
import { BestSellerShowcase } from "../components/BestSellerShowcase";
import { Packaging3DShowcase } from "../components/Packaging3DShowcase";
import { MeetBiteyBanner } from "../components/MeetBiteyBanner";
import { PackagingVideoCarousel } from "../components/PackagingVideoCarousel";
import { Footer } from "../components/Footer";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSelectCategory = (categorySlug: string) => {
    if (categorySlug === "all") {
      router.push("/products");
    } else {
      router.push(`/products?category=${encodeURIComponent(categorySlug)}`);
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* 1. Header with Profile Icon, Wishlist Icon & Logo, Search & Cart Drawer */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSelectCategory={handleSelectCategory}
      />

      {/* 2. Hero Carousel (Full promotional posters with ambient stage & category tabs) */}
      <HeroCarousel onSelectCategory={handleSelectCategory} />

      {/* 2b. Continuous Auto-Scroll Products Marquee (Plates, cups, containers) */}
      <ProductMarquee />

      {/* 3. Shop By Category (All categories with image, name, and count linking to product page) */}
      <CategoryBar selectedCategory="all" />

      {/* 3b. Industry & Sector Solution Banners (Bar & Beverage, Restaurant Takeout, Coffee Shop, Food Truck) */}
      <IndustryBanners />

      {/* 4. Bulk Request & Wholesale Volume Section (Title: Request Wholesale Quote) */}
      <BulkRequest />

      {/* 5. Featured Packaging Specials / Promotional Poster Carousel */}
      <PosterCarousel onSelectCategory={handleSelectCategory} />

      {/* 5b. Commercial Wholesale Best Sellers (Sticky Brand Image + 8 Products) */}
      <BestSellerShowcase />

      {/* 6. Scroll-Driven Food Service Packaging Showcase with 6 alternating sector containers */}
      <Packaging3DShowcase onSelectCategory={handleSelectCategory} />

      {/* 6b. Meet Bitey - AI Restaurant Supply Assistant Showcase Banner */}
      <MeetBiteyBanner />

      {/* 6c. Real Packaging In Action - Vertical Video Reels Carousel (Above Google Maps Container) */}
      <PackagingVideoCarousel onSelectCategory={handleSelectCategory} />

      {/* 7. Comprehensive Brand Footer (Includes DepotLocationSection Google Maps) */}
      <Footer onSelectCategory={handleSelectCategory} />
    </main>
  );
}
