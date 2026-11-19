import { Router } from "express";
import { CartController } from "../controllers/cartController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

// Cart routes require customer authentication
router.use(requireAuth);

// GET /api/v1/cart (Fetch cart from database)
router.get("/", CartController.getCart);

// POST /api/v1/cart/items (Add item to cart)
router.post("/items", CartController.addItem);

// PUT /api/v1/cart/items (Update item quantity)
router.put("/items", CartController.updateQuantity);

// DELETE /api/v1/cart/items (Remove item from cart)
router.delete("/items", CartController.removeItem);

// DELETE /api/v1/cart (Clear cart)
router.delete("/", CartController.clearCart);

// POST /api/v1/cart/sync (Sync guest cart to database upon login)
router.post("/sync", CartController.syncCart);

export default router;
