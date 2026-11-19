import { Request, Response } from "express";
import { WholesaleRepository } from "../repositories/wholesaleRepository.js";
import { EmailService } from "../services/emailService.js";

export class WholesaleController {
  static async submitQuoteRequest(req: Request, res: Response): Promise<void> {
    try {
      const {
        businessName,
        contactName,
        phone,
        email,
        businessType,
        otherBusinessType,
        monthlyVolume,
        notes,
      } = req.body;

      if (!businessName || !contactName || !phone) {
        res.status(400).json({
          success: false,
          message: "Business name, contact person name, and phone number are required.",
        });
        return;
      }

      const id = await WholesaleRepository.createInquiry({
        businessName,
        contactName,
        phone,
        email,
        businessType: businessType || "Restaurant",
        otherBusinessType: businessType === "Other" ? otherBusinessType : undefined,
        monthlyVolume: monthlyVolume || "20-50 cases/mo",
        notes,
      });

      // Asynchronously trigger customer confirmation and sales desk notification email
      EmailService.sendWholesaleInquiryNotification(req.body).catch((err) => {
        console.error("[Wholesale Controller] Non-fatal email notification error:", err?.message);
      });

      res.status(201).json({
        success: true,
        message: "Wholesale quote request submitted successfully. A specialist will contact you shortly.",
        inquiryId: id,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}

