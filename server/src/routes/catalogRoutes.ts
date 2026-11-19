import { Router } from "express";
import { CatalogController } from "../controllers/catalogController.js";

const router = Router();

// GET /api/v1/catalog/categories
router.get("/categories", CatalogController.getCategories);

// GET /api/v1/catalog/products
router.get("/products", CatalogController.getProducts);

// GET /api/v1/catalog/products/:id
router.get("/products/:id", CatalogController.getProductById);

export default router;
