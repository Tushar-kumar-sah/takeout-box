"use client";

import React, { useState } from "react";
import styles from "./FloatingWhatsApp.module.css";

export function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = "16612059667"; // +1 661-205-9667
  const message = encodeURIComponent(
    "Hello The Takeout Box Depot! I have an inquiry regarding restaurant packaging supplies."
  );
  const waUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <aside
      aria-label="Direct WhatsApp Support"
      className={styles.floatingWrapper}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip / Pill Badge */}
      <div
        className={`${styles.tooltipPill} ${isHovered ? styles.tooltipVisible : ""}`}
      >
        <span className={styles.greenDot} />
        <span>Chat with Depot Dispatch</span>
        <span className={styles.phoneMuted}>| +1 (661) 205-9667</span>
      </div>

      {/* WhatsApp Action Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with The Takeout Box depot on WhatsApp"
        className={styles.whatsappButton}
      >
        {/* Glow pulse ring */}
        <span className={styles.pulseRing} />

        {/* Official WhatsApp SVG Icon with explicit dimensions */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="30"
          height="30"
          style={{ width: "30px", height: "30px", flexShrink: 0 }}
        >
          <path
            fill="#FFFFFF"
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.05 21.95a.75.75 0 0 0 .937.937l4.782-1.388A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Zm4.838 13.568c-.208.583-1.034 1.108-1.636 1.18-.41.05-.944.092-2.85-.7-2.437-1.01-4.01-3.483-4.13-3.645-.12-.162-.98-1.306-.98-2.49 0-1.185.62-1.768.84-2.008.22-.24.48-.3.64-.3.16 0 .32.002.46.009.15.007.35-.057.548.42.208.5.71 1.733.77 1.86.06.126.1.272.02.433-.08.161-.12.261-.24.402-.12.14-.25.313-.36.42-.12.12-.24.25-.1.49.14.24.62 1.02 1.33 1.65.91.81 1.68 1.06 1.92 1.18.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.39.655 1.63.775.24.12.4.18.46.28.06.1.06.58-.148 1.163Z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </aside>
  );
}
