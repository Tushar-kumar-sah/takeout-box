import { pool } from "../config/db.js";
import { RowDataPacket } from "mysql2";

export interface CategoryRecord {
  id: string;
  slug: string;
  name: string;
  description: string;
  image_url: string;
  display_order: number;
}

export interface ProductSizeRecord {
  id: number;
  product_id: string;
  name: string;
  sku?: string;
  case_count: number;
  price: number;
  dimensions?: string;
  stock_status: string;
}

export interface ProductRecord {
  id: string;
  category_id: string;
  sku?: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  material?: string;
  color?: string;
  bpi_certified: boolean;
  fda_approved: boolean;
  microwave_safe: boolean;
  rating_avg: number;
  review_count: number;
  is_active: boolean;
  sizes?: ProductSizeRecord[];
}

export class CatalogRepository {
  static async getCategories(): Promise<CategoryRecord[]> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      "SELECT * FROM categories ORDER BY display_order ASC"
    );
    return rows as CategoryRecord[];
  }

  static async getProducts(params: {
    categorySlug?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ products: ProductRecord[]; total: number }> {
    const limit = params.limit || 50;
    const offset = params.offset || 0;

    let whereClauses: string[] = ["p.is_active = TRUE"];
    const queryParams: any[] = [];

    if (params.categorySlug && params.categorySlug !== "all") {
      whereClauses.push("c.slug = ?");
      queryParams.push(params.categorySlug);
    }

    if (params.search) {
      whereClauses.push("(p.name LIKE ? OR p.description LIKE ? OR p.material LIKE ?)");
      const term = `%${params.search}%`;
      queryParams.push(term, term, term);
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    // Count total matching
    const [countRows] = await pool.execute<RowDataPacket[]>(
      `SELECT COUNT(DISTINCT p.id) as total
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       ${whereSql}`,
      queryParams
    );
    const total = countRows[0]?.total || 0;

    // Fetch products
    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT p.*, c.name as category_name, c.slug as category_slug
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       ${whereSql}
       ORDER BY p.name ASC
       LIMIT ? OFFSET ?`,
      [...queryParams, Number(limit), Number(offset)]
    );

    const products = rows as ProductRecord[];

    // Fetch sizes for each product
    for (const prod of products) {
      const [sizes] = await pool.execute<RowDataPacket[]>(
        "SELECT * FROM product_sizes WHERE product_id = ? ORDER BY price ASC",
        [prod.id]
      );
      prod.sizes = sizes as ProductSizeRecord[];
    }

    return { products, total };
  }

  static async getProductById(id: string): Promise<ProductRecord | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT p.*, c.name as category_name, c.slug as category_slug
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.id = ? OR p.slug = ?
       LIMIT 1`,
      [id, id]
    );

    if (rows.length === 0) return null;
    const product = rows[0] as ProductRecord;

    const [sizes] = await pool.execute<RowDataPacket[]>(
      "SELECT * FROM product_sizes WHERE product_id = ? ORDER BY price ASC",
      [product.id]
    );
    product.sizes = sizes as ProductSizeRecord[];

    return product;
  }
}
