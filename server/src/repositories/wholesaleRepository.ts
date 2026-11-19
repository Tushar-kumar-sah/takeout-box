import { pool } from "../config/db.js";
import { ResultSetHeader } from "mysql2";

export class WholesaleRepository {
  static async createInquiry(data: {
    businessName: string;
    contactName: string;
    phone: string;
    email?: string;
    businessType: string;
    otherBusinessType?: string;
    monthlyVolume: string;
    notes?: string;
  }): Promise<number> {
    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO wholesale_inquiries
        (business_name, contact_name, phone, email, business_type, other_business_type, monthly_volume, notes, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'new', NOW())`,
      [
        data.businessName,
        data.contactName,
        data.phone,
        data.email || null,
        data.businessType,
        data.otherBusinessType || null,
        data.monthlyVolume,
        data.notes || null,
      ]
    );

    return result.insertId;
  }
}
