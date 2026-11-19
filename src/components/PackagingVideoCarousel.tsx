"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import styles from "./PackagingVideoCarousel.module.css";

export interface PackagingReel {
  id: string;
  title: string;
  categoryName: string;
  categorySlug: string;
  badge?: string;
  description: string;
  videoSrc: string;
}

const REELS: PackagingReel[] = [
  {
    id: "burger-clamshell",
    title: "Heavy-Duty Burger Box",
    categoryName: "Takeout Containers",
    categorySlug: "takeout-containers",
    badge: "Clamshell Pack",
    description: "Grease-resistant hinged container with secure snap-lock closure.",
    videoSrc: "/videos/reel-burger-clamshell.mp4",
  },
  {
    id: "takeaway-delivery",
    title: "Commercial Meal Delivery",
    categoryName: "Takeout Containers",
    categorySlug: "takeout-containers",
    badge: "Leak-Proof",
    description: "Rigid food boxes engineered for high-volume takeout and delivery.",
    videoSrc: "/videos/reel-takeaway-box.mp4",
  },
  {
    id: "kraft-bag",
    title: "Reinforced Kraft Bags",
    categoryName: "Kraft Bags",
    categorySlug: "kraft-bags",
    badge: "Eco Friendly",
    description: "100% recyclable heavy-gauge paper bags with reinforced twisted handles.",
    videoSrc: "/videos/reel-kraft-bag.mp4",
  },
  {
    id: "meal-prep",
    title: "Clear-Lid Meal Prep Bowls",
    categoryName: "Deli Containers",
    categorySlug: "takeout-containers",
    badge: "Microwavable",
    description: "Stackable polypropylene deli containers with anti-fog snap lids.",
    videoSrc: "/videos/reel-meal-prep.mp4",
  },
  {
    id: "iced-beverage",
    title: "Cold Beverage Cups & Lids",
    categoryName: "Cups & Lids",
    categorySlug: "cups-lids",
    badge: "Crystal Clear",
    description: "Heavy-duty PET drink cups with tight-seal dome and flat lids.",
    videoSrc: "/videos/reel-iced-beverage.mp4",
  },
  {
    id: "salad-bowl",
    title: "Fresh Salad & Grain Bowls",
    categoryName: "Soup Containers",
    categorySlug: "soup-containers",
    badge: "Eco Bagasse",
    description: "Biodegradable sugarcane fiber bowls for healthy casual concepts.",
    videoSrc: "/videos/reel-salad-bowl.mp4",
  },
  {
    id: "burger-assembly",
    title: "Artisan Burger Pack Box",
    categoryName: "Takeout Containers",
    categorySlug: "takeout-containers",
    badge: "Thermal Hold",
    description: "Ventilated container keeping sandwiches crisp and piping hot.",
    videoSrc: "/videos/reel-burger-assembly.mp4",
  },
  {
    id: "kitchen-service",
    title: "Catering Foil Steam Pans",
    categoryName: "Aluminum Trays",
    categorySlug: "aluminum-trays",
    badge: "Heavy Gauge",
    description: "Commercial deep aluminum steam table trays for banquet volume.",
    videoSrc: "/videos/reel-kitchen-service.mp4",
  },
];

interface VideoCardItemProps {
  reel: PackagingReel;
  onSelectCategory?: (categorySlug: string) => void;
}

const VideoCardItem: React.FC<VideoCardItemProps> = ({ reel, onSelectCategory }) => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay policy fallback
        });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
      setProgress(0);
    }
  };

  const togglePlayTouch = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(pct);
    }
  };

  const handleCardClick = () => {
    if (onSelectCategory) {
      onSelectCategory(reel.categorySlug);
    }
    router.push(`/products?category=${encodeURIComponent(reel.categorySlug)}`);
  };

  return (
    <div
      className={styles.videoCard}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      aria-label={`Watch ${reel.title} Packaging Video`}
    >
      {/* HTML5 Video Element */}
      <video
        ref={videoRef}
        src={reel.videoSrc}
        className={styles.videoElement}
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
      />

      {/* Top Overlay with Mute/Unmute toggle */}
      <div className={styles.topOverlay}>
        <button
          type="button"
          className={styles.audioToggleBtn}
          onClick={toggleSound}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          title={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>
      </div>

      {/* Center Play Icon (hidden when hovered/playing) */}
      <div
        className={styles.centerPlayOverlay}
        style={{ opacity: isPlaying ? 0 : 1 }}
      >
        <div className={styles.playCircle} onClick={togglePlayTouch}>
          <Play size={24} fill="#FFFFFF" style={{ marginLeft: 3 }} />
        </div>
      </div>

      {/* "Playing" Badge Overlay on Hover */}
      <div className={styles.playingIndicator}>
        <span className={styles.pulsingRedDot} />
        <span>Playing Reel</span>
      </div>

      {/* Bottom Content with Category, Title, and Description */}
      <div className={styles.bottomOverlay}>
        <div className={styles.videoCategory}>{reel.categoryName}</div>
        <h3 className={styles.videoTitle}>{reel.title}</h3>
        <p className={styles.videoDesc}>{reel.description}</p>
      </div>

      {/* Progress Bar Track */}
      <div className={styles.progressBarTrack}>
        <div
          className={styles.progressBarFill}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

interface PackagingVideoCarouselProps {
  onSelectCategory?: (categorySlug: string) => void;
}

export const PackagingVideoCarousel: React.FC<PackagingVideoCarouselProps> = ({
  onSelectCategory,
}) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  const checkScroll = () => {
    if (trackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = trackRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (trackRef.current) {
      const cardWidth = 300;
      const scrollAmount = direction === "left" ? -cardWidth * 2 : cardWidth * 2;
      trackRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      className={styles.section}
      id="packaging-video-reels-section"
      aria-label="Packaging Video Showcase"
    >
      <div className="container">
        {/* Header with Title and Scroll Controls */}
        <div className={styles.headerWrapper}>
          <div className={styles.headerLeft}>
            <div className={styles.kickerBadge}>
              <span className={styles.pulsingRedDot} />
              <span>Real Packaging in Action · Watch &amp; Shop</span>
            </div>
            <h2 className={styles.sectionHeading}>
              See How Top Restaurants Pack with{" "}
              <span className={styles.headingHighlight}>Our Supplies</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Hover over any reel to see our commercial takeout containers, kraft bags, cups, and eco-friendly packaging in real service.
            </p>
          </div>

          <div className={styles.navControls}>
            <button
              type="button"
              className={styles.navBtn}
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left video reels"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className={styles.navBtn}
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right video reels"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div className={styles.carouselContainer}>
          <div ref={trackRef} className={styles.carouselTrack}>
            {REELS.map((reel) => (
              <VideoCardItem
                key={reel.id}
                reel={reel}
                onSelectCategory={onSelectCategory}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
