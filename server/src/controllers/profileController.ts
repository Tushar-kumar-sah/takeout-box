import { Request, Response } from "express";
import { UserRepository } from "../repositories/userRepository.js";

export class ProfileController {
  static async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const user = await UserRepository.findById(userId);

      if (!user) {
        res.status(404).json({ success: false, message: "User not found." });
        return;
      }

      res.status(200).json({
        success: true,
        profile: {
          id: user.id,
          name: user.name || "",
          restaurantName: user.restaurant_name || "",
          phone: user.phone || "",
          email: user.email || "",
          dob: user.dob || "",
          avatarUrl: user.avatar_url || "",
          businessType: user.business_type || "Restaurant",
        },
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const { name, restaurantName, email, phone, dob, businessType } = req.body;

      const updated = await UserRepository.updateProfile(userId, {
        name,
        restaurantName,
        email,
        phone,
        dob,
        businessType,
      });

      res.status(200).json({
        success: true,
        message: "Profile updated successfully.",
        profile: {
          id: updated.id,
          name: updated.name,
          restaurantName: updated.restaurant_name,
          phone: updated.phone,
          email: updated.email,
          dob: updated.dob,
          avatarUrl: updated.avatar_url,
          businessType: updated.business_type,
        },
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async updateAvatar(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const { avatarUrl } = req.body;

      await UserRepository.updateAvatar(userId, avatarUrl || "");

      res.status(200).json({
        success: true,
        message: "Avatar updated successfully.",
        avatarUrl: avatarUrl || "",
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}
