import { Request, Response } from "express";
import { CatalogRepository } from "../repositories/catalogRepository.js";

export class CatalogController {
  static async getCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await CatalogRepository.getCategories();
      res.status(200).json({ success: true, categories });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async getProducts(req: Request, res: Response): Promise<void> {
    try {
      const { category, search, page, limit } = req.query;

      const pageNum = parseInt(page as string, 10) || 1;
      const limitNum = parseInt(limit as string, 10) || 24;
      const offset = (pageNum - 1) * limitNum;

      const { products, total } = await CatalogRepository.getProducts({
        categorySlug: category as string,
        search: search as string,
        limit: limitNum,
        offset,
      });

      res.status(200).json({
        success: true,
        products,
        total,
        page: pageNum,
        totalPages: Math.max(1, Math.ceil(total / limitNum)),
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const product = await CatalogRepository.getProductById(id);

      if (!product) {
        res.status(404).json({ success: false, message: "Product not found." });
        return;
      }

      res.status(200).json({ success: true, product });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}
