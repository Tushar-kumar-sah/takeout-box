"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Clock, ShieldAlert, CheckCircle, LogOut } from "lucide-react";
import { ApiClient } from "../services/apiClient";
import styles from "./SessionTimeout.module.css";

// Session Constants (Production-ready standards)
const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes total inactivity allowed
const WARNING_WINDOW_MS = 2 * 60 * 1000;      // 2 minutes warning before auto-logout
const THROTTLE_MS = 10 * 1000;                // Throttle activity updates to once every 10s
const CHECK_INTERVAL_MS = 1000;               // Evaluate timer every second

export function SessionTimeoutProvider() {
  const router = useRouter();
  const [showWarning, setShowWarning] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(120);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const lastActivityRef = useRef<number>(Date.now());
  const lastThrottleRef = useRef<number>(0);
  const showWarningRef = useRef<boolean>(false);

  // Sync ref with state
  useEffect(() => {
    showWarningRef.current = showWarning;
  }, [showWarning]);

  // Check if user is currently authenticated
  const checkIsLoggedIn = useCallback(() => {
    if (typeof window === "undefined") return false;
    return Boolean(localStorage.getItem("takeout_jwt_token"));
  }, []);

  // Update activity timestamp in memory and localStorage (throttled)
  const recordActivity = useCallback(() => {
    // If warning modal is actively displayed, do NOT auto-reset on passive mouse wiggle
    // User must click "Stay Signed In" to explicitly confirm presence
    if (showWarningRef.current) return;

    const now = Date.now();
    lastActivityRef.current = now;

    if (now - lastThrottleRef.current > THROTTLE_MS) {
      lastThrottleRef.current = now;
      try {
        localStorage.setItem("takeout_last_activity", now.toString());
      } catch {}
    }
  }, []);

  // Action: User explicitly clicks "Stay Signed In"
  const handleStaySignedIn = async () => {
    setIsRefreshing(true);
    try {
      // 1. Refresh JWT token via API
      await ApiClient.auth.refreshToken();

      // 2. Reset activity timer
      const now = Date.now();
      lastActivityRef.current = now;
      lastThrottleRef.current = now;
      localStorage.setItem("takeout_last_activity", now.toString());

      // 3. Close warning modal
      setShowWarning(false);
    } catch (err) {
      console.error("[Session] Error extending session:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Action: User clicks "Sign Out Now" or timer expires
  const handleSignOut = useCallback(async (reason: "inactivity" | "manual" = "manual") => {
    setShowWarning(false);
    try {
      await ApiClient.auth.logout();
    } catch {}

    const query = reason === "inactivity" ? "?reason=inactivity" : "";
    router.push(`/login${query}`);
  }, [router]);

  // Listen to user input events
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initialize last activity from storage or now
    const stored = localStorage.getItem("takeout_last_activity");
    if (stored) {
      const parsed = Number(stored);
      if (!isNaN(parsed) && parsed > 0) {
        lastActivityRef.current = parsed;
      }
    } else {
      localStorage.setItem("takeout_last_activity", Date.now().toString());
    }

    const events = ["mousedown", "keydown", "scroll", "touchstart"];
    const onEvent = () => recordActivity();

    events.forEach((evt) => window.addEventListener(evt, onEvent, { passive: true }));

    // Cross-tab synchronization
    const onStorage = (e: StorageEvent) => {
      if (e.key === "takeout_last_activity" && e.newValue) {
        const remoteTime = Number(e.newValue);
        if (!isNaN(remoteTime)) {
          lastActivityRef.current = remoteTime;
          // If remote tab was active, close warning on this tab too
          if (showWarningRef.current && Date.now() - remoteTime < INACTIVITY_TIMEOUT_MS - WARNING_WINDOW_MS) {
            setShowWarning(false);
          }
        }
      } else if (e.key === "takeout_jwt_token" && !e.newValue) {
        // User logged out in another tab
        setShowWarning(false);
      }
    };

    // Listen to expired session event from apiClient
    const onSessionExpired = () => {
      setShowWarning(false);
      router.push("/login?reason=session_expired");
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("takeout_session_expired", onSessionExpired);

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, onEvent));
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("takeout_session_expired", onSessionExpired);
    };
  }, [recordActivity, router]);

  // Heartbeat Interval: checks inactivity and token expiration
  useEffect(() => {
    const timer = setInterval(() => {
      if (!checkIsLoggedIn()) {
        if (showWarningRef.current) setShowWarning(false);
        return;
      }

      const now = Date.now();
      const elapsed = now - lastActivityRef.current;

      // 1. Inactivity check: Exceeded 30 minutes -> Auto logout
      if (elapsed >= INACTIVITY_TIMEOUT_MS) {
        handleSignOut("inactivity");
        return;
      }

      // 2. Warning check: Within 2 minutes of timeout -> Show warning modal
      const timeRemaining = INACTIVITY_TIMEOUT_MS - elapsed;
      if (timeRemaining <= WARNING_WINDOW_MS) {
        setShowWarning(true);
        setSecondsRemaining(Math.max(0, Math.ceil(timeRemaining / 1000)));
      } else if (showWarningRef.current) {
        setShowWarning(false);
      }

      // 3. Proactive Silent JWT Token Refresh:
      // If token expires within 5 minutes AND user was active in last 10 minutes, silently refresh
      const expiryStr = localStorage.getItem("takeout_token_expiry");
      if (expiryStr) {
        const tokenExpiry = Number(expiryStr);
        if (!isNaN(tokenExpiry)) {
          const msUntilTokenExpiry = tokenExpiry - now;
          if (msUntilTokenExpiry < 5 * 60 * 1000 && msUntilTokenExpiry > 0 && elapsed < 10 * 60 * 1000) {
            ApiClient.auth.refreshToken().catch(() => {});
          }
        }
      }
    }, CHECK_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [checkIsLoggedIn, handleSignOut]);

  if (!showWarning) return null;

  // Format seconds into MM:SS
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className={styles.overlay} role="alertdialog" aria-modal="true" aria-labelledby="session-warning-title">
      <div className={styles.modal}>
        <div className={styles.topAccentBar} />

        <div className={styles.iconWrapper}>
          <div className={styles.pulsingRing} />
          <Clock size={32} />
        </div>

        <h2 id="session-warning-title" className={styles.title}>
          Session Inactivity Warning
        </h2>

        <p className={styles.description}>
          You have been inactive for a while. For your account security, your commercial session will automatically expire soon.
        </p>

        <div className={styles.timerBox}>
          <span className={styles.timerLabel}>Time Remaining:</span>
          <span className={styles.timerValue}>{formattedTime}</span>
        </div>

        <div className={styles.actionButtons}>
          <button
            type="button"
            className={styles.staySignedInBtn}
            onClick={handleStaySignedIn}
            disabled={isRefreshing}
          >
            <CheckCircle size={18} />
            <span>{isRefreshing ? "Refreshing Session..." : "Stay Signed In"}</span>
          </button>

          <button
            type="button"
            className={styles.signOutBtn}
            onClick={() => handleSignOut("manual")}
            disabled={isRefreshing}
          >
            <LogOut size={16} style={{ display: "inline", marginRight: 6 }} />
            Sign Out Now
          </button>
        </div>
      </div>
    </div>
  );
}
