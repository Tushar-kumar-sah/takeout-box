import { Router } from "express";
import { ShippingController } from "../controllers/shippingController.js";
import { optionalAuth } from "../middleware/authMiddleware.js";

const router = Router();

/**
 * 1. Validate US destination address using UPS Address Validation (XAV API)
 * POST /api/v1/shipping/validate-address
 */
router.post("/validate-address", ShippingController.validateAddress);

/**
 * 2. Calculate live UPS shipping rates for cart & US destination
 * POST /api/v1/shipping/rates
 */
router.post("/rates", ShippingController.getRates);

/**
 * 3. Authoritatively verify rate and save shipping selection to order
 * POST /api/v1/shipping/select
 */
router.post("/select", optionalAuth, ShippingController.selectShipping);

/**
 * 4. Get saved shipping information for an order
 * GET /api/v1/shipping/orders/:orderId
 */
router.get("/orders/:orderId", ShippingController.getOrderShipping);

/**
 * 5. Tracking endpoint (future-ready; returns truth without fake data)
 * GET /api/v1/shipping/orders/:orderId/tracking
 */
router.get("/orders/:orderId/tracking", ShippingController.getOrderTracking);

export default router;
