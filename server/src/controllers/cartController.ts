import { Request, Response } from "express";
import { CartRepository } from "../repositories/cartRepository.js";

export class CartController {
  /**
   * Get user's active cart from database
   */
  static async getCart(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const items = await CartRepository.getCartByUser(userId);

      res.status(200).json({
        success: true,
        items,
      });
    } catch (err: any) {
      console.error("[Cart Error - getCart]", err);
      res.status(500).json({ success: false, message: err.message });
    }
  }

  /**
   * Add item to user's cart in database
   */
  static async addItem(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const { productId, sku, sizeName, caseCount, quantity, unitPrice } = req.body;

      if (!productId || !sizeName) {
        res.status(400).json({
          success: false,
          message: "Product ID and size name are required.",
        });
        return;
      }

      await CartRepository.addItem(userId, {
        productId,
        sku,
        sizeName,
        caseCount: Number(caseCount) || 100,
        quantity: Number(quantity) || 1,
        unitPrice: Number(unitPrice) || 0,
      });

      const updated = await CartRepository.getCartByUser(userId);
      res.status(200).json({
        success: true,
        message: "Item added to cart in database.",
        items: updated,
      });
    } catch (err: any) {
      console.error("[Cart Error - addItem]", err);
      res.status(500).json({ success: false, message: err.message });
    }
  }

  /**
   * Update quantity of an item
   */
  static async updateQuantity(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const { productId, sizeName, quantity } = req.body;

      if (!productId || !sizeName) {
        res.status(400).json({
          success: false,
          message: "Product ID and size name are required.",
        });
        return;
      }

      await CartRepository.updateQuantity(
        userId,
        productId,
        sizeName,
        Number(quantity)
      );

      const updated = await CartRepository.getCartByUser(userId);
      res.status(200).json({
        success: true,
        items: updated,
      });
    } catch (err: any) {
      console.error("[Cart Error - updateQuantity]", err);
      res.status(500).json({ success: false, message: err.message });
    }
  }

  /**
   * Remove item from cart
   */
  static async removeItem(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const { productId, sizeName } = req.body;

      if (!productId || !sizeName) {
        res.status(400).json({
          success: false,
          message: "Product ID and size name are required.",
        });
        return;
      }

      await CartRepository.removeItem(userId, productId, sizeName);
      const updated = await CartRepository.getCartByUser(userId);

      res.status(200).json({
        success: true,
        items: updated,
      });
    } catch (err: any) {
      console.error("[Cart Error - removeItem]", err);
      res.status(500).json({ success: false, message: err.message });
    }
  }

  /**
   * Clear entire cart
   */
  static async clearCart(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      await CartRepository.clearCart(userId);

      res.status(200).json({
        success: true,
        message: "Cart cleared.",
        items: [],
      });
    } catch (err: any) {
      console.error("[Cart Error - clearCart]", err);
      res.status(500).json({ success: false, message: err.message });
    }
  }

  /**
   * Merge guest items into DB cart
   */
  static async syncCart(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const { items } = req.body;

      if (Array.isArray(items) && items.length > 0) {
        await CartRepository.syncCart(
          userId,
          items.map((it: any) => ({
            productId: it.product?.id || it.productId,
            sku: it.size?.sku || it.sku,
            sizeName: it.size?.name || it.sizeName,
            caseCount: it.size?.caseCount || it.caseCount || 100,
            quantity: it.quantity || 1,
            unitPrice: it.size?.price || it.unitPrice || 0,
          }))
        );
      }

      const updated = await CartRepository.getCartByUser(userId);
      res.status(200).json({
        success: true,
        items: updated,
      });
    } catch (err: any) {
      console.error("[Cart Error - syncCart]", err);
      res.status(500).json({ success: false, message: err.message });
    }
  }
}
