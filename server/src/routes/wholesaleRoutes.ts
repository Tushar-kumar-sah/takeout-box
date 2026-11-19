import { Router } from "express";
import { WholesaleController } from "../controllers/wholesaleController.js";

const router = Router();

// POST /api/v1/wholesale/quote-request
router.post("/quote-request", WholesaleController.submitQuoteRequest);

export default router;
