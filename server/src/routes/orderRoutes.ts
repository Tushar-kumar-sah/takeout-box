import { Router } from "express";
import { OrderController } from "../controllers/orderController.js";
import { requireAuth, optionalAuth } from "../middleware/authMiddleware.js";

const router = Router();

// POST /api/v1/orders (Place order - allows guest or authenticated user)
router.post("/", optionalAuth, OrderController.createOrder);

// GET /api/v1/orders (Get customer order history)
router.get("/", requireAuth, OrderController.getOrders);

// GET /api/v1/orders/admin/all (Get all orders for admin review)
router.get("/admin/all", OrderController.getAllOrders);

// GET /api/v1/orders/:orderId (Get single order details)
router.get("/:orderId", OrderController.getOrderById);

// GET /api/v1/orders/:orderId/invoice (Download/view formatted invoice)
router.get("/:orderId/invoice", OrderController.getInvoice);

export default router;
