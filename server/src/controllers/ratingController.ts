import { Request, Response } from "express";
import { RatingRepository } from "../repositories/ratingRepository.js";

export class RatingController {
  static async submitRating(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { orderId, rating, tags, feedback } = req.body;

      if (!orderId || !rating) {
        res.status(400).json({ success: false, message: "Order ID and star rating are required." });
        return;
      }

      await RatingRepository.createRating({
        orderId,
        userId,
        rating: Math.min(5, Math.max(1, parseInt(rating, 10))),
        tags: Array.isArray(tags) ? tags : [],
        feedback: feedback || "",
      });

      res.status(201).json({
        success: true,
        message: "Thank you! Your commercial feedback has been submitted.",
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async getRatingByOrder(req: Request, res: Response): Promise<void> {
    try {
      const { orderId } = req.params;
      const rating = await RatingRepository.getRatingByOrder(orderId);

      res.status(200).json({ success: true, rating });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}
