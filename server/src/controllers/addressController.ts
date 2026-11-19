import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { AddressRepository } from "../repositories/addressRepository.js";

export class AddressController {
  static async getAddresses(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const addresses = await AddressRepository.findByUserId(userId);

      res.status(200).json({
        success: true,
        addresses: addresses.map((a) => ({
          id: a.id,
          nickname: a.nickname,
          recipientName: a.recipient_name,
          phone: a.phone,
          street: a.street,
          suite: a.suite || "",
          city: a.city,
          state: a.state,
          zip: a.zip,
          notes: a.notes || "",
          isDefault: Boolean(a.is_default),
        })),
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async createAddress(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const { nickname, recipientName, phone, street, suite, city, state, zip, notes, isDefault } = req.body;

      if (!recipientName || !phone || !street || !zip) {
        res.status(400).json({
          success: false,
          message: "Recipient name, phone, street address, and ZIP code are required.",
        });
        return;
      }

      const created = await AddressRepository.create({
        id: uuidv4(),
        userId,
        nickname: nickname || "Kitchen Location",
        recipientName,
        phone,
        street,
        suite,
        city: city || "Bakersfield",
        state: state || "CA",
        zip,
        notes,
        isDefault: Boolean(isDefault),
      });

      res.status(201).json({
        success: true,
        message: "Address saved successfully.",
        address: {
          id: created.id,
          nickname: created.nickname,
          recipientName: created.recipient_name,
          phone: created.phone,
          street: created.street,
          suite: created.suite || "",
          city: created.city,
          state: created.state,
          zip: created.zip,
          notes: created.notes || "",
          isDefault: Boolean(created.is_default),
        },
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async updateAddress(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const { id } = req.params;
      const data = req.body;

      const updated = await AddressRepository.update(id, userId, {
        nickname: data.nickname,
        recipientName: data.recipientName,
        phone: data.phone,
        street: data.street,
        suite: data.suite,
        city: data.city,
        state: data.state,
        zip: data.zip,
        notes: data.notes,
        isDefault: data.isDefault,
      });

      if (!updated) {
        res.status(404).json({ success: false, message: "Address not found." });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Address updated successfully.",
        address: {
          id: updated.id,
          nickname: updated.nickname,
          recipientName: updated.recipient_name,
          phone: updated.phone,
          street: updated.street,
          suite: updated.suite || "",
          city: updated.city,
          state: updated.state,
          zip: updated.zip,
          notes: updated.notes || "",
          isDefault: Boolean(updated.is_default),
        },
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async deleteAddress(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const { id } = req.params;

      const deleted = await AddressRepository.delete(id, userId);
      if (!deleted) {
        res.status(404).json({ success: false, message: "Address not found." });
        return;
      }

      res.status(200).json({ success: true, message: "Address deleted successfully." });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async setDefault(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const { id } = req.params;

      await AddressRepository.setDefault(id, userId);
      res.status(200).json({ success: true, message: "Default address updated." });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}
