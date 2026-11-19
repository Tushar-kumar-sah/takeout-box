"use client";

import React, { useState, useEffect } from "react";
import { MapPin, Clock, Phone, Navigation, ExternalLink, ShieldCheck } from "lucide-react";
import styles from "./DepotLocationSection.module.css";

interface DaySchedule {
  day: string;
  hours: string;
  isOpen: boolean;
  dayIndex: number;
}

const SCHEDULE: DaySchedule[] = [
  { day: "Monday", hours: "9:00 AM – 5:00 PM", isOpen: true, dayIndex: 1 },
  { day: "Tuesday", hours: "9:00 AM – 5:00 PM", isOpen: true, dayIndex: 2 },
  { day: "Wednesday", hours: "9:00 AM – 5:00 PM", isOpen: true, dayIndex: 3 },
  { day: "Thursday", hours: "9:00 AM – 5:00 PM", isOpen: true, dayIndex: 4 },
  { day: "Friday", hours: "9:00 AM – 5:00 PM", isOpen: true, dayIndex: 5 },
  { day: "Saturday", hours: "9:00 AM – 5:00 PM", isOpen: true, dayIndex: 6 },
  { day: "Sunday", hours: "9:00 AM – 2:00 PM", isOpen: true, dayIndex: 0 },
];

export const DepotLocationSection: React.FC = () => {
  const [currentDayIndex, setCurrentDayIndex] = useState<number | null>(null);

  useEffect(() => {
    // Hydration-safe detection of today's day of week
    const now = new Date();
    setCurrentDayIndex(now.getDay());
  }, []);

  const directionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=The+Takeout+box+Restaurant+Supply+5880+District+Blvd+Suite+17+Bakersfield+CA+93313";
  const externalMapUrl =
    "https://www.google.com/maps/search/?api=1&query=The+Takeout+box+Restaurant+Supply+5880+District+Blvd+Suite+17+Bakersfield+CA+93313";

  return (
    <section className={styles.locationSection} id="depot-location-section" aria-label="Depot Location and Hours">
      <div className="container">
        {/* Top Header with "Open" status & green pulsing dot */}
        <div className={styles.headerArea}>
          <div className={styles.statusBadgeTop}>
            <span className={styles.greenDotPulse} aria-hidden="true" />
            <span>Open · Bakersfield Wholesale Depot &amp; Warehouse</span>
          </div>

          <h2 className={styles.sectionHeading}>
            Visit Our <span className={styles.headingHighlight}>Bakersfield Depot</span> &amp; Warehouse
          </h2>
          <p className={styles.sectionSub}>
            Direct commercial pickup, in-person sample inspection, and bulk restaurant supplies. Walk-ins, local restaurant owners, caterers, and food truck operators are always welcome.
          </p>
        </div>

        {/* 2-Column Responsive Layout: Left Details, Right Satellite Map */}
        <div className={styles.mainGrid}>
          {/* Left Column: Location Address, Contact & Separate Timings */}
          <div className={styles.leftCol}>
            {/* Address & Contact Card */}
            <div className={styles.infoCard}>
              <div className={styles.cardHeader}>
                <div className={styles.iconBoxRed}>
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className={styles.cardTitle}>Depot Location &amp; Contact</h3>
                </div>
              </div>

              <div className={styles.depotName}>The Takeout Box Restaurant Supply</div>
              <p className={styles.addressText}>
                5880 District Blvd. Suite 17<br />
                Bakersfield, CA 93313, United States
              </p>

              <div className={styles.contactRow}>
                <Phone size={15} style={{ color: "#E51A1A", flexShrink: 0 }} />
                <span>
                  Direct Call:{" "}
                  <a href="tel:+16612059667">+1 661-205-9667</a>
                  {"  •  "}
                  <a href="tel:+16618059358">+1 661-805-9358</a>
                </span>
              </div>

              <div className={styles.actionsRow}>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.directionBtn}
                  id="btn-get-directions"
                >
                  <Navigation size={14} />
                  Get Driving Directions
                </a>

                <a
                  href="tel:+16612059667"
                  className={styles.callBtn}
                  id="btn-call-depot"
                >
                  <Phone size={14} />
                  Call Warehouse
                </a>
              </div>
            </div>

            {/* Business Hours Card (Separately for Monday, Tuesday, ...etc) */}
            <div className={styles.infoCard}>
              <div className={styles.cardHeader}>
                <div className={styles.iconBoxSlate}>
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className={styles.cardTitle}>Depot Operating Hours</h3>
                </div>
              </div>

              <div className={styles.hoursTable}>
                {SCHEDULE.map((item) => {
                  const isToday = currentDayIndex === item.dayIndex;
                  return (
                    <div
                      key={item.day}
                      className={`${styles.hoursRow} ${isToday ? styles.hoursRowToday : ""}`}
                    >
                      <div className={styles.dayWrapper}>
                        <span className={styles.dayLabel}>{item.day}</span>
                        {isToday && <span className={styles.todayPill}>Today</span>}
                      </div>
                      <span
                        className={
                          item.isOpen ? styles.timeLabel : styles.timeLabelClosed
                        }
                      >
                        {item.hours}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps in Satellite Mode */}
          <div className={styles.mapCol}>
            <div className={styles.mapCard}>
              <div className={styles.mapToolbar}>
                <span className={styles.mapModeBadge}>
                  🛰️ Satellite Mode · Live Depot View
                </span>
                <a
                  href={externalMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openInMapsLink}
                >
                  Open in Google Maps
                  <ExternalLink size={13} />
                </a>
              </div>

              <div className={styles.mapFrameWrapper}>
                {/*
                  User-supplied Google Maps embed updated to Satellite Mode (!5e1 parameter)
                */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3255.685260544888!2d-119.07054022476639!3d35.31380125007137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80ea41e607f0d26f%3A0x5eb137de77a68c2b!2sThe%20Takeout%20box%20Restaurant%20Supply!5e1!3m2!1sen!2sin!4v1790587985317!5m2!1sen!2sin"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="The Takeout Box Restaurant Supply Satellite Map"
                  className={styles.mapIframe}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
