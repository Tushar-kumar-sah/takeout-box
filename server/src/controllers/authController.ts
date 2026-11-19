import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { UserRepository } from "../repositories/userRepository.js";
import { ENV } from "../config/env.js";

export class AuthController {
  /**
   * Manual Customer Sign Up with Name, Email, Phone, Password, and Confirm Password
   * POST /api/v1/auth/signup
   */
  static async signup(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, phone, password, confirmPassword } = req.body;

      // 1. Validate required fields
      if (!name || typeof name !== "string" || name.trim().length < 2) {
        res.status(400).json({ success: false, message: "Please provide a valid full name (minimum 2 characters)." });
        return;
      }

      if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        res.status(400).json({ success: false, message: "Please enter a valid commercial email address." });
        return;
      }

      if (!phone || typeof phone !== "string" || phone.replace(/\D/g, "").length < 10) {
        res.status(400).json({ success: false, message: "Please enter a valid 10-digit mobile number." });
        return;
      }

      if (!password || typeof password !== "string" || password.length < 6) {
        res.status(400).json({ success: false, message: "Password must be at least 6 characters long." });
        return;
      }

      if (confirmPassword !== undefined && password !== confirmPassword) {
        res.status(400).json({ success: false, message: "Passwords do not match. Please re-enter your password." });
        return;
      }

      const normalizedEmail = email.trim().toLowerCase();

      // 2. Check if user already exists
      const existingUser = await UserRepository.findByEmail(normalizedEmail);
      if (existingUser) {
        res.status(409).json({
          success: false,
          message: "An account with this email address already exists. Please sign in instead.",
        });
        return;
      }

      // 3. Hash password using bcrypt
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // 4. Create new customer in MySQL
      const user = await UserRepository.createUser({
        id: uuidv4(),
        name: name.trim(),
        email: normalizedEmail,
        phone: phone.trim(),
        passwordHash,
        role: "customer",
        loginType: "email_password",
      });

      // 5. Generate production JWT Access Token (1 hour)
      const token = jwt.sign(
        {
          id: user.id,
          phone: user.phone,
          email: user.email,
          role: user.role,
        },
        ENV.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // 6. Generate Refresh Token (30 days)
      const refreshToken = jwt.sign(
        {
          id: user.id,
          tokenType: "refresh",
        },
        ENV.JWT_REFRESH_SECRET,
        { expiresIn: "30d" }
      );

      res.status(201).json({
        success: true,
        message: "Account created successfully.",
        token,
        refreshToken,
        expiresIn: 3600,
        user: {
          id: user.id,
          name: user.name,
          restaurantName: user.restaurant_name,
          phone: user.phone,
          email: user.email,
          dob: user.dob,
          avatarUrl: user.avatar_url,
          businessType: user.business_type,
          role: user.role,
        },
      });
    } catch (err: any) {
      console.error("[Auth Error] Sign up error:", err);
      res.status(500).json({
        success: false,
        message: err.message || "Failed to create account. Please try again.",
      });
    }
  }

  /**
   * Manual Customer Sign In with Email and Password
   * POST /api/v1/auth/login
   */
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: "Please enter both email and password.",
        });
        return;
      }

      const normalizedEmail = email.trim().toLowerCase();

      // 1. Fetch user including password_hash
      const user = await UserRepository.findByEmailWithPassword(normalizedEmail);
      if (!user) {
        res.status(401).json({
          success: false,
          message: "Invalid email or password. Please verify your credentials.",
        });
        return;
      }

      // 2. Check if account signed up via Google without a password
      if (!user.password_hash) {
        res.status(400).json({
          success: false,
          message: "This account was registered using Google. Please click 'Continue with Google'.",
        });
        return;
      }

      // 3. Verify password hash with bcrypt
      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        res.status(401).json({
          success: false,
          message: "Invalid email or password. Please verify your credentials.",
        });
        return;
      }

      // 4. Verify account active status
      if (user.is_active === false || (user as any).is_active === 0) {
        res.status(403).json({
          success: false,
          message: "Your account is deactivated. Please contact depot support.",
        });
        return;
      }

      // 5. Generate production JWT Access Token (1 hour)
      const token = jwt.sign(
        {
          id: user.id,
          phone: user.phone,
          email: user.email,
          role: user.role,
        },
        ENV.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // 6. Generate Refresh Token (30 days)
      const refreshToken = jwt.sign(
        {
          id: user.id,
          tokenType: "refresh",
        },
        ENV.JWT_REFRESH_SECRET,
        { expiresIn: "30d" }
      );

      res.status(200).json({
        success: true,
        message: "Sign in successful.",
        token,
        refreshToken,
        expiresIn: 3600,
        user: {
          id: user.id,
          name: user.name,
          restaurantName: user.restaurant_name,
          phone: user.phone,
          email: user.email,
          dob: user.dob,
          avatarUrl: user.avatar_url,
          businessType: user.business_type,
          role: user.role,
        },
      });
    } catch (err: any) {
      console.error("[Auth Error] Login error:", err);
      res.status(500).json({
        success: false,
        message: err.message || "Failed to sign in. Please try again.",
      });
    }
  }

  /**
   * Google OAuth Authentication (direct Google Sign In / Account Chooser)
   * POST /api/v1/auth/google
   */
  static async googleLogin(req: Request, res: Response): Promise<void> {
    try {
      const { email, name, avatarUrl, googleId, credential, accessToken, phone, dob } = req.body;

      let verifiedEmail = email;
      let verifiedName = name;
      let verifiedAvatar = avatarUrl;
      let verifiedGoogleId = googleId;
      let verifiedPhone = phone;
      let verifiedDob = dob;

      // 1. Verify Google ID token (JWT credential) with Google if provided
      if (credential && typeof credential === "string") {
        try {
          const verifyRes = await fetch(
            `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`
          );
          if (verifyRes.ok) {
            const tokenInfo: any = await verifyRes.json();
            if (ENV.GOOGLE_CLIENT_ID && tokenInfo.aud && tokenInfo.aud !== ENV.GOOGLE_CLIENT_ID) {
              console.warn(
                `[Google Auth] Client ID mismatch. Expected: ${ENV.GOOGLE_CLIENT_ID}, received: ${tokenInfo.aud}`
              );
            }
            if (tokenInfo.email) {
              verifiedEmail = tokenInfo.email;
              verifiedName = tokenInfo.name || tokenInfo.given_name || verifiedName;
              verifiedAvatar = tokenInfo.picture || verifiedAvatar;
              verifiedGoogleId = tokenInfo.sub || verifiedGoogleId;
            }
          } else {
            console.warn("[Google Auth] tokeninfo verification returned non-OK");
          }
        } catch (vErr) {
          console.warn("[Google Auth] Error contacting Google tokeninfo endpoint:", vErr);
        }
      } else if (accessToken && typeof accessToken === "string") {
        // 2. Verify OAuth2 access token with Google userinfo API
        try {
          const userinfoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          if (userinfoRes.ok) {
            const userInfo: any = await userinfoRes.json();
            if (userInfo.email) {
              verifiedEmail = userInfo.email;
              verifiedName = userInfo.name || userInfo.given_name || verifiedName;
              verifiedAvatar = userInfo.picture || verifiedAvatar;
              verifiedGoogleId = userInfo.sub || verifiedGoogleId;
            }
          } else {
            console.warn("[Google Auth] userinfo verification returned non-OK");
          }
        } catch (vErr) {
          console.warn("[Google Auth] Error contacting Google userinfo endpoint:", vErr);
        }
      }

      if (!verifiedEmail || typeof verifiedEmail !== "string" || !verifiedEmail.includes("@")) {
        res.status(400).json({
          success: false,
          message: "A valid email address is required for Google authentication.",
        });
        return;
      }

      const normalizedEmail = verifiedEmail.trim().toLowerCase();
      const displayName =
        verifiedName ||
        normalizedEmail.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

      // 1. Upsert Google user in MySQL
      const user = await UserRepository.upsertGoogleUser({
        id: uuidv4(),
        email: normalizedEmail,
        name: displayName,
        avatarUrl: verifiedAvatar,
        googleId: verifiedGoogleId,
        phone: verifiedPhone,
        dob: verifiedDob,
      });

      // 2. Generate production JWT Access Token (1 hour)
      const token = jwt.sign(
        {
          id: user.id,
          phone: user.phone,
          email: user.email,
          role: user.role,
        },
        ENV.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // 3. Generate Refresh Token (30 days)
      const refreshToken = jwt.sign(
        {
          id: user.id,
          tokenType: "refresh",
        },
        ENV.JWT_REFRESH_SECRET,
        { expiresIn: "30d" }
      );

      res.status(200).json({
        success: true,
        message: "Google authentication successful.",
        token,
        refreshToken,
        expiresIn: 3600,
        user: {
          id: user.id,
          name: user.name,
          restaurantName: user.restaurant_name,
          phone: user.phone,
          email: user.email,
          dob: user.dob,
          avatarUrl: user.avatar_url,
          businessType: user.business_type,
          role: user.role,
        },
      });
    } catch (err: any) {
      console.error("[Auth Error] Google login error:", err);
      res.status(500).json({
        success: false,
        message: err.message || "Failed to authenticate with Google.",
      });
    }
  }

  /**
   * Refreshes an expired access token using a valid refresh token
   * POST /api/v1/auth/refresh-token
   */
  static async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        res.status(400).json({ success: false, message: "Refresh token is required." });
        return;
      }

      let payload: any;
      try {
        payload = jwt.verify(refreshToken, ENV.JWT_REFRESH_SECRET);
      } catch {
        res.status(401).json({
          success: false,
          message: "Session expired or invalid refresh token. Please sign in again.",
        });
        return;
      }

      if (!payload || !payload.id) {
        res.status(401).json({ success: false, message: "Malformed refresh token." });
        return;
      }

      const user = await UserRepository.findById(payload.id);
      if (!user) {
        res.status(404).json({ success: false, message: "User account not found." });
        return;
      }

      if (user.is_active === false || (user as any).is_active === 0) {
        res.status(403).json({ success: false, message: "Account has been deactivated. Please contact support." });
        return;
      }

      // Generate new access token (1 hour)
      const newToken = jwt.sign(
        {
          id: user.id,
          phone: user.phone,
          email: user.email,
          role: user.role,
        },
        ENV.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Generate new rotating refresh token (30 days)
      const newRefreshToken = jwt.sign(
        {
          id: user.id,
          tokenType: "refresh",
        },
        ENV.JWT_REFRESH_SECRET,
        { expiresIn: "30d" }
      );

      res.status(200).json({
        success: true,
        message: "Access token refreshed successfully.",
        token: newToken,
        refreshToken: newRefreshToken,
        expiresIn: 3600,
        user: {
          id: user.id,
          name: user.name,
          restaurantName: user.restaurant_name,
          phone: user.phone,
          email: user.email,
          dob: user.dob,
          avatarUrl: user.avatar_url,
          businessType: user.business_type,
          role: user.role,
        },
      });
    } catch (err: any) {
      console.error("[Auth Error] Refresh token error:", err);
      res.status(500).json({ success: false, message: "Failed to refresh session." });
    }
  }

  /**
   * Logs out user session
   * POST /api/v1/auth/logout
   */
  static async logout(req: Request, res: Response): Promise<void> {
    res.status(200).json({
      success: true,
      message: "Session logged out successfully.",
    });
  }

  /**
   * Get current authenticated user profile
   * GET /api/v1/auth/me
   */
  static async getMe(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
      }

      const user = await UserRepository.findById(userId);
      if (!user) {
        res.status(404).json({ success: false, message: "User not found." });
        return;
      }

      res.status(200).json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          restaurantName: user.restaurant_name,
          phone: user.phone,
          email: user.email,
          dob: user.dob,
          avatarUrl: user.avatar_url,
          businessType: user.business_type,
          role: user.role,
        },
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}
