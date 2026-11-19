"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  ShieldCheck,
  Truck,
  Handshake,
  Check,
  X,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  LogIn,
  UserPlus,
} from "lucide-react";
import styles from "./LoginPage.module.css";
import { ApiClient } from "../../services/apiClient";
import { saveProfile, getStoredProfile } from "../../data/customerStore";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") || "/";
  const reason = searchParams.get("reason");
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "signin";

  // Active Tab: "signin" | "signup"
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);

  // Sign In Form State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Sign Up Form State
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // UI Feedback States
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);

  // Phone number input formatter: (XXX) XXX-XXXX
  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, "").slice(0, 10);
    setSignupPhone(formatPhoneNumber(rawVal));
    if (errorMessage) setErrorMessage("");
  };

  // Helper: Persist session across storage and dispatch notifications
  const finalizeAuth = (userData: any, token?: string, refreshToken?: string, expiresIn?: number) => {
    try {
      if (token) {
        localStorage.setItem("takeout_jwt_token", token);
      }
      if (refreshToken) {
        localStorage.setItem("takeout_refresh_token", refreshToken);
      }
      const expiry = Date.now() + (expiresIn || 3600) * 1000;
      localStorage.setItem("takeout_token_expiry", expiry.toString());
      localStorage.setItem("takeout_last_activity", Date.now().toString());

      const updatedProfile = {
        name: userData.name || "",
        restaurantName: userData.restaurantName || "",
        phone: userData.phone || "",
        email: userData.email || "",
        dob: userData.dob || "",
        avatarUrl: userData.avatarUrl || "",
        businessType: userData.businessType || "Restaurant",
      };

      saveProfile(updatedProfile);

      localStorage.setItem(
        "takeout_user_auth",
        JSON.stringify({
          ...userData,
          name: updatedProfile.name,
          email: updatedProfile.email,
          phone: updatedProfile.phone,
          dob: updatedProfile.dob,
          avatarUrl: updatedProfile.avatarUrl,
          restaurantName: updatedProfile.restaurantName,
          loggedIn: true,
          loginTime: new Date().toISOString(),
        })
      );

      // Notify Header, SessionTimeoutProvider, etc.
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("takeout_profile_updated"));
      window.dispatchEvent(new Event("takeout_auth_changed"));
    } catch (err) {
      console.error("Storage error:", err);
    }

    setIsSubmitting(false);
    setSuccessMessage("Authentication successful");

    setTimeout(() => {
      router.push(redirectTarget);
    }, 850);
  };

  // 1. Handle Manual Sign In
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!loginEmail.trim() || !loginEmail.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!loginPassword) {
      setErrorMessage("Please enter your valid password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await ApiClient.auth.login({
        email: loginEmail.trim(),
        password: loginPassword,
      });

      finalizeAuth(res.user, res.token, res.refreshToken, res.expiresIn);
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err.message || "Invalid email or password. Please verify your credentials.");
    }
  };

  // 2. Handle Manual Sign Up
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!signupName.trim() || signupName.trim().length < 2) {
      setErrorMessage("Please enter your full name or business name.");
      return;
    }

    const rawPhoneDigits = signupPhone.replace(/\D/g, "");
    if (rawPhoneDigits.length !== 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!signupEmail.trim() || !signupEmail.includes("@")) {
      setErrorMessage("Please enter a valid  email address.");
      return;
    }

    if (signupPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      setErrorMessage("Passwords do not match. Please verify your password entry.");
      return;
    }

    if (!agreedToTerms) {
      setErrorMessage("Please agree to the Terms & Conditions and Privacy Policy.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await ApiClient.auth.signup({
        name: signupName.trim(),
        email: signupEmail.trim(),
        phone: signupPhone.trim(),
        password: signupPassword,
        confirmPassword: signupConfirmPassword,
      });

      finalizeAuth(res.user, res.token, res.refreshToken, res.expiresIn);
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err.message || "Failed to create account. Please try again.");
    }
  };

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

  // Real Google Identity Services (GSI) / One Tap listener
  useEffect(() => {
    if (!googleClientId || typeof window === "undefined") return;

    const setupGoogleGsi = () => {
      const google = (window as any).google;
      if (google?.accounts?.id) {
        try {
          google.accounts.id.initialize({
            client_id: googleClientId,
            auto_select: false,
            use_fedcm_for_prompt: false,
            callback: async (response: any) => {
              if (response?.credential) {
                setSocialLoading(true);
                try {
                  let credentialPayload: any = {};
                  try {
                    const parts = response.credential.split(".");
                    if (parts.length === 3) {
                      credentialPayload = JSON.parse(atob(parts[1]));
                    }
                  } catch (e) {
                    console.warn("Credential parse:", e);
                  }

                  const res = await ApiClient.auth.googleLogin({
                    credential: response.credential,
                    email: credentialPayload.email,
                    name: credentialPayload.name,
                    avatarUrl: credentialPayload.picture,
                  });

                  finalizeAuth(
                    {
                      ...res.user,
                      email: res.user?.email || credentialPayload.email,
                      name: res.user?.name || credentialPayload.name,
                      avatarUrl: res.user?.avatarUrl || credentialPayload.picture,
                    },
                    res.token,
                    res.refreshToken,
                    res.expiresIn
                  );
                } catch (err: any) {
                  setSocialLoading(false);
                  setErrorMessage(err.message || "Google authentication failed.");
                }
              }
            },
          });

          // Handle One Tap prompt safely without FedCM rejection
          google.accounts.id.prompt((notification: any) => {
            if (notification?.isNotDisplayed?.() || notification?.isSkippedMoment?.()) {
              // Normal dismissed/skipped state
            }
          });
        } catch (e) {
          // Ignore non-fatal GSI notices
        }
      }
    };

    if ((window as any).google?.accounts?.id) {
      setupGoogleGsi();
    } else {
      const timer = setInterval(() => {
        if ((window as any).google?.accounts?.id) {
          clearInterval(timer);
          setupGoogleGsi();
        }
      }, 500);
      return () => clearInterval(timer);
    }
  }, [googleClientId]);

  // Handle Google Sign In button click (Triggers Google's authentic account chooser on device)
  const handleGoogleClick = () => {
    setErrorMessage("");

    if (!googleClientId) {
      setErrorMessage(
        "Google Client ID is not configured. Please add NEXT_PUBLIC_GOOGLE_CLIENT_ID in your .env.local file to connect your Google Cloud credentials."
      );
      return;
    }

    if (typeof window === "undefined" || !(window as any).google?.accounts?.oauth2) {
      setErrorMessage("Google Sign-In is initializing. Please try again in a few seconds.");
      return;
    }

    try {
      setSocialLoading(true);

      // Initialize Google OAuth2 Token Client with prompt: 'select_account'
      // Scopes: openid, email, profile, phone, birthday
      const tokenClient = (window as any).google.accounts.oauth2.initTokenClient({
        client_id: googleClientId,
        scope: "openid email profile https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.phonenumbers.read",
        callback: async (tokenResponse: any) => {
          if (tokenResponse.error) {
            setSocialLoading(false);
            if (tokenResponse.error !== "popup_closed_by_user") {
              setErrorMessage(`Google authentication error: ${tokenResponse.error_description || tokenResponse.error}`);
            }
            return;
          }

          try {
            // Fetch verified user profile directly from Google
            const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
              headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
            });

            if (!userInfoRes.ok) {
              throw new Error("Unable to retrieve Google user profile.");
            }

            const googleProfile = await userInfoRes.json();

            // Attempt to retrieve phone and dob from Google People API if permitted
            let googlePhone = "";
            let googleDob = "";

            try {
              const peopleRes = await fetch(
                "https://people.googleapis.com/v1/people/me?personFields=birthdays,phoneNumbers",
                {
                  headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                }
              );
              if (peopleRes.ok) {
                const peopleData = await peopleRes.json();
                if (peopleData.phoneNumbers && peopleData.phoneNumbers.length > 0) {
                  googlePhone = peopleData.phoneNumbers[0].value || "";
                }
                if (peopleData.birthdays && peopleData.birthdays.length > 0) {
                  const bDate = peopleData.birthdays.find((b: any) => b.date)?.date;
                  if (bDate && bDate.year && bDate.month && bDate.day) {
                    googleDob = `${bDate.year}-${String(bDate.month).padStart(2, "0")}-${String(bDate.day).padStart(2, "0")}`;
                  }
                }
              }
            } catch (pErr) {
              console.log("[Google Auth] People API optional lookup:", pErr);
            }

            // Synchronize with backend API (creates or finds user in DB and returns JWT session)
            const res = await ApiClient.auth.googleLogin({
              email: googleProfile.email,
              name: googleProfile.name || googleProfile.given_name || "Google Commercial Client",
              avatarUrl: googleProfile.picture || "",
              phone: googlePhone,
              dob: googleDob,
              googleId: googleProfile.sub,
              accessToken: tokenResponse.access_token,
            });

            // Ensure profile pic, phone, dob, email, name are merged
            finalizeAuth(
              {
                ...res.user,
                email: res.user?.email || googleProfile.email,
                name: res.user?.name || googleProfile.name || googleProfile.given_name,
                avatarUrl: res.user?.avatarUrl || googleProfile.picture || "",
                phone: res.user?.phone || googlePhone,
                dob: res.user?.dob || googleDob,
              },
              res.token,
              res.refreshToken,
              res.expiresIn
            );
          } catch (err: any) {
            setSocialLoading(false);
            setErrorMessage(err.message || "Failed to authenticate Google user with server.");
          }
        },
        error_callback: (err: any) => {
          setSocialLoading(false);
          console.error("Google Token Client error:", err);
          setErrorMessage(err.message || "Failed to launch Google account selector.");
        },
      });

      // Request access token with prompt="select_account"
      // Google displays the native Google account chooser dialog on the device
      tokenClient.requestAccessToken({ prompt: "select_account" });
    } catch (err: any) {
      setSocialLoading(false);
      console.error("Google sign in invocation error:", err);
      setErrorMessage(err.message || "Failed to open Google account chooser.");
    }
  };


  return (
    <div className={styles.loginPage}>
      {/* =======================================================
          LEFT SHOWCASE: Food packaging photo, Takeout Box branding,
          curved swoops, and 3 commercial trust badges
          ======================================================= */}
      <section className={styles.leftShowcase} aria-label="Brand Showcase">
        {/* Dark Vignette Overlay */}
        <div className={styles.showcaseOverlay} />

        {/* Top-Left Red Dynamic Curve Accent */}
        <svg
          className={`${styles.waveSvg} ${styles.topLeftWave}`}
          viewBox="0 0 280 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-50 -50 C 140 10, 240 120, 200 280 C 150 180, 80 120, -50 90 Z"
            fill="url(#topWaveGrad)"
          />
          <path
            d="M-40 -40 C 120 20, 190 110, 160 250 C 120 160, 60 100, -40 70 Z"
            fill="url(#brightRedGrad)"
            opacity="0.8"
          />
          <defs>
            <linearGradient id="topWaveGrad" x1="0" y1="0" x2="280" y2="280" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E51A1A" />
              <stop offset="1" stopColor="#7F1D1D" />
            </linearGradient>
            <linearGradient id="brightRedGrad" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
              <stop stopColor="#EF4444" />
              <stop offset="1" stopColor="#B91C1C" />
            </linearGradient>
          </defs>
        </svg>

        {/* Right Boundary Flowing S-Curve Divider */}
        <svg
          className={`${styles.waveSvg} ${styles.rightBoundaryWave}`}
          viewBox="0 0 130 1000"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M130 0 C 40 180, 10 320, 55 500 C 100 680, 20 850, 130 1000 L 130 0 Z"
            fill="url(#dividerDarkGrad)"
            opacity="0.9"
          />
          <path
            d="M130 0 C 60 170, 30 330, 75 510 C 115 670, 45 840, 130 1000 L 130 0 Z"
            fill="url(#dividerRedGrad)"
          />
          <path
            d="M130 0 C 80 165, 50 335, 90 515 C 125 665, 70 835, 130 1000 L 130 0 Z"
            fill="#FFFFFF"
            opacity="0.08"
          />
          <defs>
            <linearGradient id="dividerDarkGrad" x1="0" y1="0" x2="130" y2="1000" gradientUnits="userSpaceOnUse">
              <stop stopColor="#991B1B" />
              <stop offset="0.5" stopColor="#7F1D1D" />
              <stop offset="1" stopColor="#E51A1A" />
            </linearGradient>
            <linearGradient id="dividerRedGrad" x1="0" y1="0" x2="130" y2="1000" gradientUnits="userSpaceOnUse">
              <stop stopColor="#EF4444" />
              <stop offset="0.45" stopColor="#E51A1A" />
              <stop offset="1" stopColor="#B91C1C" />
            </linearGradient>
          </defs>
        </svg>

        {/* Brand Center */}
        <div className={styles.showcaseCenter}>
          <div className={styles.brandLogoWrapper}>
            <Image
              src="/images/takeout-logo.png"
              alt="The Takeout Box"
              width={250}
              height={75}
              className={styles.brandLogoImage}
              priority
              unoptimized
            />
          </div>
          <p className={styles.sloganText}>
            Direct Wholesale Commercial Food Packaging &amp; Supplies
          </p>
        </div>

        {/* 3 Commercial Value Badges */}
        <div className={styles.showcaseBadges}>
          <div className={styles.badgeItem}>
            <div className={styles.badgeIconRing}>
              <Truck size={17} />
            </div>
            <span className={styles.badgeLabel}>
              Fast Local<br />Bakersfield Dispatch
            </span>
          </div>

          <div className={styles.badgeItem}>
            <div className={styles.badgeIconRing}>
              <ShieldCheck size={17} />
            </div>
            <span className={styles.badgeLabel}>
              100% Certified<br />FDA &amp; BPI Safe
            </span>
          </div>

          <div className={styles.badgeItem}>
            <div className={styles.badgeIconRing}>
              <Handshake size={17} />
            </div>
            <span className={styles.badgeLabel}>
              Wholesale Tier<br />Direct Pricing
            </span>
          </div>
        </div>
      </section>

      {/* =======================================================
          RIGHT FORM SECTION
          ======================================================= */}
      <main className={styles.rightPane} aria-label="Customer Authentication">
        {/* Top Navigation */}
        <div className={styles.topNavigation}>
          <Link href="/" className={styles.backToStoreBtn}>
            <ArrowLeft size={14} />
            <span>Back to Store</span>
          </Link>

          <div className={styles.mobileBrandLogo}>
            <Image
              src="/images/takeout-logo.png"
              alt="The Takeout Box"
              width={150}
              height={44}
              className={styles.mobileLogoImg}
              priority
              unoptimized
            />
          </div>
        </div>

        {/* Central Form Card */}
        <div className={styles.formCard}>
          <div className={styles.welcomeEyebrow}>
            {mode === "signin" ? "Commercial Client Portal" : "Join The Takeout Box"}
          </div>
          <h1 className={styles.formHeadline}>
            {mode === "signin" ? (
              <>
                Sign in to <span className={styles.highlightText}>Takeout Box</span>
              </>
            ) : (
              <>
                Create <span className={styles.highlightText}>Account</span>
              </>
            )}
          </h1>
          <p className={styles.formDescription}>
            {mode === "signin"
              ? "Access wholesale pricing, manage reorders, and view invoices."
              : "Register your restaurant, catering, or commercial food service account."}
          </p>

          {/* Session Expiration or Inactivity Banner */}
          {reason === "inactivity" && (
            <div className={styles.sessionNoticeBanner}>
              <AlertCircle size={15} className={styles.sessionNoticeIcon} />
              <div>
                <strong>Session Timed Out:</strong> Signed out after 30 minutes of inactivity. Please sign in to resume.
              </div>
            </div>
          )}
          {reason === "session_expired" && (
            <div className={styles.sessionNoticeBanner}>
              <AlertCircle size={15} className={styles.sessionNoticeIcon} />
              <div>
                <strong>Security Notice:</strong> Your session has expired. Please sign in again.
              </div>
            </div>
          )}

          {/* Success Banner */}
          {successMessage && (
            <div className={styles.successAlert}>
              <CheckCircle2 size={16} color="#16A34A" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Error Banner */}
          {errorMessage && (
            <div className={styles.errorMessage}>
              <AlertCircle size={15} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Segmented Control Tab Switcher */}
          <div className={styles.authTabs} role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={mode === "signin"}
              className={`${styles.authTabBtn} ${mode === "signin" ? styles.authTabBtnActive : ""}`}
              onClick={() => {
                setMode("signin");
                setErrorMessage("");
                setSuccessMessage("");
              }}
            >
              <LogIn size={14} />
              <span>Sign In</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "signup"}
              className={`${styles.authTabBtn} ${mode === "signup" ? styles.authTabBtnActive : ""}`}
              onClick={() => {
                setMode("signup");
                setErrorMessage("");
                setSuccessMessage("");
              }}
            >
              <UserPlus size={14} />
              <span>Create Account</span>
            </button>
          </div>

          {/* =======================================================
              TAB 1: SIGN IN (Email & Password)
              ======================================================= */}
          {mode === "signin" && (
            <form onSubmit={handleSignIn} noValidate>
              {/* Email Field */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Email Address <span className={styles.requiredStar}>*</span>
                </label>
                <div className={styles.inputContainer}>
                  <Mail size={16} className={styles.inputIcon} />
                  <input
                    type="email"
                    className={styles.formField}
                    placeholder="name@company.com"
                    value={loginEmail}
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                      if (errorMessage) setErrorMessage("");
                    }}
                    autoComplete="email"
                    required
                    autoFocus
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Password <span className={styles.requiredStar}>*</span>
                </label>
                <div className={styles.inputContainer}>
                  <Lock size={16} className={styles.inputIcon} />
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    className={styles.formField}
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                      if (errorMessage) setErrorMessage("");
                    }}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className={styles.passwordToggleBtn}
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    aria-label={showLoginPassword ? "Hide password" : "Show password"}
                  >
                    {showLoginPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Extra row: Remember Me & Forgot Password */}
              <div className={styles.formExtraRow}>
                <label className={styles.rememberLabel} onClick={() => setRememberMe(!rememberMe)}>
                  <div className={`${styles.customCheckbox} ${rememberMe ? styles.checkboxChecked : ""}`}>
                    {rememberMe && <Check size={11} strokeWidth={3} />}
                  </div>
                  <span>Remember Me</span>
                </label>

                <button
                  type="button"
                  className={styles.forgotPasswordLink}
                  onClick={() => alert("Please contact depot dispatch at (661) 205-9667 to reset your commercial account password.")}
                >
                  Forgot Password?
                </button>
              </div>

              {/* Sign In Submit Button */}
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isSubmitting || socialLoading}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              {/* OR Divider */}
              <div className={styles.orDivider}>
                <span className={styles.orText}>OR</span>
              </div>

              {/* Google Sign In Button */}
              <button
                type="button"
                className={styles.googleBtn}
                onClick={handleGoogleClick}
                disabled={isSubmitting || socialLoading}
                aria-label="Continue with Google"
              >
                {socialLoading ? (
                  <RefreshCw size={15} className="animate-spin" />
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" className={styles.socialBtnIcon}>
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                )}
                <span>Continue with Google</span>
              </button>

              {/* Bottom Switch Link */}
              <div className={styles.bottomSignUp}>
                Don&apos;t have an account?
                <button
                  type="button"
                  className={styles.switchAuthBtn}
                  onClick={() => {
                    setMode("signup");
                    setErrorMessage("");
                  }}
                >
                  Create Account
                </button>
              </div>
            </form>
          )}

          {/* =======================================================
              TAB 2: CREATE ACCOUNT (Sign Up - Compact 2-Column)
              ======================================================= */}
          {mode === "signup" && (
            <form onSubmit={handleSignUp} noValidate>
              {/* Row 1: Full Name & Phone Number Side by Side */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Full Name <span className={styles.requiredStar}>*</span>
                  </label>
                  <div className={styles.inputContainer}>
                    <User size={15} className={styles.inputIcon} />
                    <input
                      type="text"
                      className={styles.formField}
                      placeholder="e.g. John Doe"
                      value={signupName}
                      onChange={(e) => {
                        setSignupName(e.target.value);
                        if (errorMessage) setErrorMessage("");
                      }}
                      autoComplete="name"
                      required
                      autoFocus
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Mobile Number <span className={styles.requiredStar}>*</span>
                  </label>
                  <div className={styles.inputContainer}>
                    <Phone size={15} className={styles.inputIcon} />
                    <input
                      type="tel"
                      className={styles.formField}
                      placeholder="(661) 000-0000"
                      value={signupPhone}
                      onChange={handlePhoneChange}
                      autoComplete="tel-national"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Commercial Email Address */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Email Address <span className={styles.requiredStar}>*</span>
                </label>
                <div className={styles.inputContainer}>
                  <Mail size={15} className={styles.inputIcon} />
                  <input
                    type="email"
                    className={styles.formField}
                    placeholder="name@company.com"
                    value={signupEmail}
                    onChange={(e) => {
                      setSignupEmail(e.target.value);
                      if (errorMessage) setErrorMessage("");
                    }}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* Row 3: Password & Confirm Password Side by Side */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Password (min 6) <span className={styles.requiredStar}>*</span>
                  </label>
                  <div className={styles.inputContainer}>
                    <Lock size={15} className={styles.inputIcon} />
                    <input
                      type={showSignupPassword ? "text" : "password"}
                      className={styles.formField}
                      placeholder="Password"
                      value={signupPassword}
                      onChange={(e) => {
                        setSignupPassword(e.target.value);
                        if (errorMessage) setErrorMessage("");
                      }}
                      autoComplete="new-password"
                      required
                    />
                    <button
                      type="button"
                      className={styles.passwordToggleBtn}
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                      aria-label={showSignupPassword ? "Hide password" : "Show password"}
                    >
                      {showSignupPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Confirm Password <span className={styles.requiredStar}>*</span>
                  </label>
                  <div className={styles.inputContainer}>
                    <Lock size={15} className={styles.inputIcon} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className={styles.formField}
                      placeholder="Confirm"
                      value={signupConfirmPassword}
                      onChange={(e) => {
                        setSignupConfirmPassword(e.target.value);
                        if (errorMessage) setErrorMessage("");
                      }}
                      autoComplete="new-password"
                      required
                    />
                    <button
                      type="button"
                      className={styles.passwordToggleBtn}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className={styles.termsRow}>
                <label
                  className={styles.termsLabel}
                  onClick={() => {
                    setAgreedToTerms(!agreedToTerms);
                    if (errorMessage) setErrorMessage("");
                  }}
                >
                  <div className={`${styles.customCheckbox} ${agreedToTerms ? styles.checkboxChecked : ""}`}>
                    {agreedToTerms && <Check size={11} strokeWidth={3} />}
                  </div>
                  <span className={styles.termsText}>
                    I agree to the{" "}
                    <Link href="/terms" target="_blank" className={styles.termsLink} onClick={(e) => e.stopPropagation()}>
                      Terms
                    </Link>{" "}
                    &amp;{" "}
                    <Link href="/privacy" target="_blank" className={styles.termsLink} onClick={(e) => e.stopPropagation()}>
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </div>

              {/* Sign Up Submit Button */}
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isSubmitting || socialLoading}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              {/* OR Divider */}
              <div className={styles.orDivider}>
                <span className={styles.orText}>OR</span>
              </div>

              {/* Google Sign In Button */}
              <button
                type="button"
                className={styles.googleBtn}
                onClick={handleGoogleClick}
                disabled={isSubmitting || socialLoading}
                aria-label="Continue with Google"
              >
                {socialLoading ? (
                  <RefreshCw size={15} className="animate-spin" />
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" className={styles.socialBtnIcon}>
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                )}
                <span>Continue with Google</span>
              </button>

              {/* Bottom Switch Link */}
              <div className={styles.bottomSignUp}>
                Already have an account?
                <button
                  type="button"
                  className={styles.switchAuthBtn}
                  onClick={() => {
                    setMode("signin");
                    setErrorMessage("");
                  }}
                >
                  Sign In
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      {/* Official Google Identity Services Client Script */}
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
      />
    </div>
  );
}

export default function LoginPage() {
  return (
    <React.Suspense
      fallback={
        <div style={{ minHeight: "100vh", background: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ color: "#FFFFFF", fontSize: "14px", fontWeight: 600 }}>Loading Takeout Box Login...</div>
        </div>
      }
    >
      <LoginFormContent />
    </React.Suspense>
  );
}
