import { Router } from "express";
import { AuthController } from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

// POST /api/v1/auth/signup - Manual registration (name, email, phone, password, confirmPassword)
router.post("/signup", AuthController.signup);

// POST /api/v1/auth/login - Manual sign in (email, password)
router.post("/login", AuthController.login);

// POST /api/v1/auth/google - Google OAuth sign in
router.post("/google", AuthController.googleLogin);

// POST /api/v1/auth/refresh-token - Silent token refresh
router.post("/refresh-token", AuthController.refreshToken);

// POST /api/v1/auth/logout - Session teardown
router.post("/logout", AuthController.logout);

// GET /api/v1/auth/me - Authenticated user profile
router.get("/me", requireAuth, AuthController.getMe);

export default router;
