import { pool } from "../config/db.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export class RatingRepository {
  static async createRating(data: {
    orderId: string;
    userId?: string;
    rating: number;
    tags: string[];
    feedback: string;
  }): Promise<void> {
    await pool.execute<ResultSetHeader>(
      `INSERT INTO order_ratings (order_id, user_id, rating, tags, feedback, submitted_at)
       VALUES (?, ?, ?, ?, ?, NOW())
       ON DUPLICATE KEY UPDATE
         rating = VALUES(rating),
         tags = VALUES(tags),
         feedback = VALUES(feedback),
         submitted_at = NOW()`,
      [
        data.orderId,
        data.userId || null,
        data.rating,
        JSON.stringify(data.tags || []),
        data.feedback || null,
      ]
    );
  }

  static async getRatingByOrder(orderId: string): Promise<any | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      "SELECT * FROM order_ratings WHERE order_id = ? LIMIT 1",
      [orderId]
    );

    if (rows.length === 0) return null;

    return {
      orderId: rows[0].order_id,
      rating: rows[0].rating,
      tags: typeof rows[0].tags === "string" ? JSON.parse(rows[0].tags) : rows[0].tags,
      feedback: rows[0].feedback,
      submittedAt: rows[0].submitted_at,
    };
  }
}
