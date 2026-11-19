import { pool } from "../config/db.js";
import { RowDataPacket } from "mysql2";

export interface CartItemInput {
  productId: string;
  sku?: string;
  sizeName: string;
  caseCount: number;
  quantity: number;
  unitPrice: number;
}

export class CartRepository {
  /**
   * Fetch all items in user's cart joined with product details
   */
  static async getCartByUser(userId: string): Promise<any[]> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT 
        ci.id as cart_item_id,
        ci.product_id,
        ci.sku,
        ci.size_name,
        ci.case_count,
        ci.quantity,
        ci.unit_price,
        p.name as product_name,
        p.image_url,
        p.category_id,
        p.description,
        p.material,
        p.pallet_ti_hi
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.user_id = ?
       ORDER BY ci.updated_at DESC`,
      [userId]
    );

    return rows.map((r) => ({
      product: {
        id: r.product_id,
        sku: r.sku || r.product_id,
        name: r.product_name,
        category: r.category_id,
        image: r.image_url,
        inStock: true,
        stockCount: 100,
        rating: 4.8,
        reviewsCount: 15,
        tags: [r.category_id],
        description: r.description || "",
        features: [],
        material: r.material || "",
        palletTiHi: r.pallet_ti_hi || "",
        price: Number(r.unit_price),
        sizes: [
          {
            name: r.size_name,
            sku: r.sku || r.product_id,
            price: Number(r.unit_price),
            caseCount: r.case_count,
            unitPrice: Number(r.unit_price),
          },
        ],
      },
      size: {
        name: r.size_name,
        sku: r.sku || r.product_id,
        price: Number(r.unit_price),
        caseCount: r.case_count,
        unitPrice: Number(r.unit_price),
      },
      quantity: r.quantity,
    }));
  }

  /**
   * Add item or increment quantity in database
   */
  static async addItem(userId: string, item: CartItemInput): Promise<void> {
    await pool.execute(
      `INSERT INTO cart_items (user_id, product_id, sku, size_name, case_count, quantity, unit_price)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         quantity = quantity + VALUES(quantity),
         unit_price = VALUES(unit_price),
         updated_at = CURRENT_TIMESTAMP`,
      [
        userId,
        item.productId,
        item.sku || null,
        item.sizeName,
        item.caseCount || 100,
        item.quantity || 1,
        item.unitPrice || 0,
      ]
    );
  }

  /**
   * Set specific quantity for item
   */
  static async updateQuantity(
    userId: string,
    productId: string,
    sizeName: string,
    quantity: number
  ): Promise<void> {
    if (quantity <= 0) {
      await this.removeItem(userId, productId, sizeName);
      return;
    }

    await pool.execute(
      `UPDATE cart_items
       SET quantity = ?, updated_at = CURRENT_TIMESTAMP
       WHERE user_id = ? AND product_id = ? AND size_name = ?`,
      [quantity, userId, productId, sizeName]
    );
  }

  /**
   * Remove single item from cart
   */
  static async removeItem(userId: string, productId: string, sizeName: string): Promise<void> {
    await pool.execute(
      `DELETE FROM cart_items
       WHERE user_id = ? AND product_id = ? AND size_name = ?`,
      [userId, productId, sizeName]
    );
  }

  /**
   * Clear entire cart for user
   */
  static async clearCart(userId: string): Promise<void> {
    await pool.execute(`DELETE FROM cart_items WHERE user_id = ?`, [userId]);
  }

  /**
   * Bulk sync/merge guest cart items into user's DB cart.
   * Uses GREATEST(quantity, VALUES(quantity)) to prevent accidental doubling
   * if the user already had the same quantity in their database cart.
   */
  static async syncCart(userId: string, items: CartItemInput[]): Promise<void> {
    for (const it of items) {
      await pool.execute(
        `INSERT INTO cart_items (user_id, product_id, sku, size_name, case_count, quantity, unit_price)
         VALUES (?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           quantity = GREATEST(quantity, VALUES(quantity)),
           unit_price = VALUES(unit_price),
           updated_at = CURRENT_TIMESTAMP`,
        [
          userId,
          it.productId,
          it.sku || null,
          it.sizeName,
          it.caseCount || 100,
          it.quantity || 1,
          it.unitPrice || 0,
        ]
      );
    }
  }
}
