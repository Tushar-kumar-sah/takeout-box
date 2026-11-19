import { pool } from "../config/db.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface UserRecord {
  id: string;
  firebase_uid?: string | null;
  phone?: string;
  email?: string;
  name?: string;
  password_hash?: string;
  restaurant_name?: string;
  business_type?: string;
  dob?: string;
  avatar_url?: string;
  role: "customer" | "admin";
  login_type: "email_password" | "google" | "phone_otp" | "apple" | "guest";
  last_login_at?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export class UserRepository {
  static async findById(id: string): Promise<UserRecord | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      "SELECT * FROM users WHERE id = ? LIMIT 1",
      [id]
    );
    return (rows[0] as UserRecord) || null;
  }

  static async findByEmail(email: string): Promise<UserRecord | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      "SELECT id, phone, email, name, restaurant_name, business_type, dob, avatar_url, role, login_type, last_login_at, is_active, created_at, updated_at FROM users WHERE LOWER(email) = LOWER(?) LIMIT 1",
      [email]
    );
    return (rows[0] as UserRecord) || null;
  }

  static async findByEmailWithPassword(email: string): Promise<(UserRecord & { password_hash?: string }) | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      "SELECT * FROM users WHERE LOWER(email) = LOWER(?) LIMIT 1",
      [email]
    );
    return (rows[0] as (UserRecord & { password_hash?: string })) || null;
  }

  static async findByPhone(phone: string): Promise<UserRecord | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      "SELECT * FROM users WHERE phone = ? LIMIT 1",
      [phone]
    );
    return (rows[0] as UserRecord) || null;
  }

  /**
   * Create a new user account with manual email + password + phone + name
   */
  static async createUser(data: {
    id: string;
    name: string;
    email: string;
    phone: string;
    passwordHash: string;
    role?: "customer" | "admin";
    loginType?: "email_password" | "google";
  }): Promise<UserRecord> {
    const role = data.role || "customer";
    const loginType = data.loginType || "email_password";

    await pool.execute<ResultSetHeader>(
      `INSERT INTO users (id, name, email, phone, password_hash, role, login_type, last_login_at, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), TRUE)`,
      [
        data.id,
        data.name,
        data.email.toLowerCase().trim(),
        data.phone.trim(),
        data.passwordHash,
        role,
        loginType,
      ]
    );

    const user = await this.findById(data.id);
    return user!;
  }

  /**
   * Upsert a user via Google OAuth (finding by email or creating new)
   */
  static async upsertGoogleUser(data: {
    id: string;
    email: string;
    name: string;
    avatarUrl?: string;
    phone?: string;
    dob?: string;
    googleId?: string;
  }): Promise<UserRecord> {
    const existing = await this.findByEmail(data.email);

    if (existing) {
      await pool.execute<ResultSetHeader>(
        `UPDATE users SET
          name = COALESCE(?, name),
          avatar_url = COALESCE(?, avatar_url),
          phone = COALESCE(?, phone),
          dob = COALESCE(?, dob),
          last_login_at = NOW(),
          updated_at = NOW()
        WHERE id = ?`,
        [data.name || null, data.avatarUrl || null, data.phone || null, data.dob || null, existing.id]
      );
      return (await this.findById(existing.id))!;
    }

    await pool.execute<ResultSetHeader>(
      `INSERT INTO users (id, firebase_uid, email, name, avatar_url, phone, dob, role, login_type, last_login_at, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'customer', 'google', NOW(), TRUE)`,
      [
        data.id,
        data.googleId || `google_${Date.now()}`,
        data.email.toLowerCase().trim(),
        data.name,
        data.avatarUrl || null,
        data.phone || null,
        data.dob || null,
      ]
    );

    return (await this.findById(data.id))!;
  }

  static async updateProfile(
    userId: string,
    data: {
      name?: string;
      restaurantName?: string;
      email?: string;
      phone?: string;
      dob?: string;
      businessType?: string;
    }
  ): Promise<UserRecord> {
    await pool.execute<ResultSetHeader>(
      `UPDATE users SET
        name = COALESCE(?, name),
        restaurant_name = COALESCE(?, restaurant_name),
        email = COALESCE(?, email),
        phone = COALESCE(?, phone),
        dob = COALESCE(?, dob),
        business_type = COALESCE(?, business_type),
        updated_at = NOW()
      WHERE id = ?`,
      [
        data.name || null,
        data.restaurantName || null,
        data.email || null,
        data.phone || null,
        data.dob || null,
        data.businessType || null,
        userId,
      ]
    );

    return (await this.findById(userId))!;
  }

  static async updateAvatar(userId: string, avatarUrl: string): Promise<void> {
    await pool.execute<ResultSetHeader>(
      "UPDATE users SET avatar_url = ?, updated_at = NOW() WHERE id = ?",
      [avatarUrl, userId]
    );
  }
}
