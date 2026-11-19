import { Router } from "express";
import { AddressController } from "../controllers/addressController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

// All address routes require authentication
router.use(requireAuth);

// GET /api/v1/addresses
router.get("/", AddressController.getAddresses);

// POST /api/v1/addresses
router.post("/", AddressController.createAddress);

// PUT /api/v1/addresses/:id
router.put("/:id", AddressController.updateAddress);

// DELETE /api/v1/addresses/:id
router.delete("/:id", AddressController.deleteAddress);

// PATCH /api/v1/addresses/:id/default
router.patch("/:id/default", AddressController.setDefault);

export default router;
