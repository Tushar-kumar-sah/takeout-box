import { Router } from "express";
import { ProfileController } from "../controllers/profileController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

// All profile routes require authentication
router.use(requireAuth);

// GET /api/v1/profile
router.get("/", ProfileController.getProfile);

// PUT /api/v1/profile
router.put("/", ProfileController.updateProfile);

// POST /api/v1/profile/avatar
router.post("/avatar", ProfileController.updateAvatar);

export default router;
