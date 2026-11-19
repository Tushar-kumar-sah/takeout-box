import { Router } from "express";
import { RatingController } from "../controllers/ratingController.js";
import { optionalAuth } from "../middleware/authMiddleware.js";

const router = Router();

// POST /api/v1/ratings
router.post("/", optionalAuth, RatingController.submitRating);

// GET /api/v1/ratings/order/:orderId
router.get("/order/:orderId", RatingController.getRatingByOrder);

export default router;
