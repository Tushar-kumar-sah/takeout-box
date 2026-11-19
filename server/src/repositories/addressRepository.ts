import { pool } from "../config/db.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface AddressRecord {
  id: string;
  user_id: string;
  nickname: string;
  recipient_name: string;
  phone: string;
  street: string;
  suite?: string;
  city: string;
  state: string;
  zip: string;
  notes?: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export class AddressRepository {
  static async findByUserId(userId: string): Promise<AddressRecord[]> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      "SELECT * FROM addresses WHERE user_id = ? ORDER BY is_default DESC, created_at DESC",
      [userId]
    );
    return rows as AddressRecord[];
  }

  static async findById(id: string, userId: string): Promise<AddressRecord | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      "SELECT * FROM addresses WHERE id = ? AND user_id = ? LIMIT 1",
      [id, userId]
    );
    return (rows[0] as AddressRecord) || null;
  }

  static async create(data: {
    id: string;
    userId: string;
    nickname: string;
    recipientName: string;
    phone: string;
    street: string;
    suite?: string;
    city: string;
    state: string;
    zip: string;
    notes?: string;
    isDefault?: boolean;
  }): Promise<AddressRecord> {
    if (data.isDefault) {
      await pool.execute(
        "UPDATE addresses SET is_default = FALSE WHERE user_id = ?",
        [data.userId]
      );
    }

    await pool.execute<ResultSetHeader>(
      `INSERT INTO addresses
        (id, user_id, nickname, recipient_name, phone, street, suite, city, state, zip, notes, is_default)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.id,
        data.userId,
        data.nickname,
        data.recipientName,
        data.phone,
        data.street,
        data.suite || null,
        data.city || "Bakersfield",
        data.state || "CA",
        data.zip,
        data.notes || null,
        data.isDefault ? 1 : 0,
      ]
    );

    return (await this.findById(data.id, data.userId))!;
  }

  static async update(
    id: string,
    userId: string,
    data: {
      nickname?: string;
      recipientName?: string;
      phone?: string;
      street?: string;
      suite?: string;
      city?: string;
      state?: string;
      zip?: string;
      notes?: string;
      isDefault?: boolean;
    }
  ): Promise<AddressRecord | null> {
    if (data.isDefault) {
      await pool.execute(
        "UPDATE addresses SET is_default = FALSE WHERE user_id = ?",
        [userId]
      );
    }

    await pool.execute<ResultSetHeader>(
      `UPDATE addresses SET
        nickname = COALESCE(?, nickname),
        recipient_name = COALESCE(?, recipient_name),
        phone = COALESCE(?, phone),
        street = COALESCE(?, street),
        suite = COALESCE(?, suite),
        city = COALESCE(?, city),
        state = COALESCE(?, state),
        zip = COALESCE(?, zip),
        notes = COALESCE(?, notes),
        is_default = COALESCE(?, is_default),
        updated_at = NOW()
      WHERE id = ? AND user_id = ?`,
      [
        data.nickname || null,
        data.recipientName || null,
        data.phone || null,
        data.street || null,
        data.suite !== undefined ? data.suite : null,
        data.city || null,
        data.state || null,
        data.zip || null,
        data.notes !== undefined ? data.notes : null,
        data.isDefault !== undefined ? (data.isDefault ? 1 : 0) : null,
        id,
        userId,
      ]
    );

    return await this.findById(id, userId);
  }

  static async delete(id: string, userId: string): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      "DELETE FROM addresses WHERE id = ? AND user_id = ?",
      [id, userId]
    );
    return result.affectedRows > 0;
  }

  static async setDefault(id: string, userId: string): Promise<void> {
    await pool.execute(
      "UPDATE addresses SET is_default = FALSE WHERE user_id = ?",
      [userId]
    );
    await pool.execute(
      "UPDATE addresses SET is_default = TRUE WHERE id = ? AND user_id = ?",
      [id, userId]
    );
  }
}
