import { pool } from "../../config/db.js";
import { RowDataPacket } from "mysql2";

export interface CartItemInput {
  productId: string;
  sizeName?: string;
  quantity: number;
}

export interface CalculatedPackage {
  packageNumber: number;
  weight: number;
  weightUnit: "LBS";
  length: number;
  width: number;
  height: number;
  dimensionUnit: "IN";
}

export interface PackagingResult {
  packages: CalculatedPackage[];
  totalWeight: number;
  weightUnit: "LBS";
  totalPackages: number;
  itemDetails: Array<{
    productId: string;
    productName: string;
    quantity: number;
    unitWeight: number;
    totalWeight: number;
  }>;
}

export class UpsPackagingService {
  // Box standards (Max 50 lbs per box for restaurant takeout supplies)
  private static readonly MAX_BOX_WEIGHT = 50.0; // lbs

  /**
   * Calculate shipment packaging from database product records
   */
  public static async calculatePackaging(cartItems: CartItemInput[]): Promise<PackagingResult> {
    if (!cartItems || cartItems.length === 0) {
      throw new Error("Cart is empty. Cannot calculate shipping packages.");
    }

    const itemDetails: Array<{
      productId: string;
      productName: string;
      quantity: number;
      unitWeight: number;
      totalWeight: number;
      length: number;
      width: number;
      height: number;
    }> = [];

    for (const item of cartItems) {
      const qty = Math.max(1, Math.floor(Number(item.quantity) || 1));

      // Query product and optional size info from MySQL
      const [pRows] = await pool.execute<RowDataPacket[]>(
        `SELECT id, name, is_active, is_shippable, weight, weight_unit, length, width, height, dimension_unit 
         FROM products WHERE id = ? LIMIT 1`,
        [item.productId]
      );

      if (pRows.length === 0) {
        throw new Error(`Product "${item.productId}" not found in database.`);
      }

      const product = pRows[0];

      if (!product.is_active) {
        throw new Error(`Product "${product.name}" is currently inactive.`);
      }

      if (product.is_shippable === 0 || product.is_shippable === false) {
        throw new Error(`Product "${product.name}" is not eligible for delivery.`);
      }

      // Check size override if sizeName provided
      let unitWeight = parseFloat(product.weight) || 2.5;
      let unitLength = parseFloat(product.length) || 12.0;
      let unitWidth = parseFloat(product.width) || 10.0;
      let unitHeight = parseFloat(product.height) || 8.0;

      if (item.sizeName) {
        const [sRows] = await pool.execute<RowDataPacket[]>(
          `SELECT weight, length, width, height FROM product_sizes 
           WHERE product_id = ? AND name = ? LIMIT 1`,
          [item.productId, item.sizeName]
        );
        if (sRows.length > 0) {
          const size = sRows[0];
          if (size.weight && parseFloat(size.weight) > 0) unitWeight = parseFloat(size.weight);
          if (size.length && parseFloat(size.length) > 0) unitLength = parseFloat(size.length);
          if (size.width && parseFloat(size.width) > 0) unitWidth = parseFloat(size.width);
          if (size.height && parseFloat(size.height) > 0) unitHeight = parseFloat(size.height);
        }
      }

      // Minimum bounds check
      unitWeight = Math.max(0.5, unitWeight);
      unitLength = Math.max(1.0, unitLength);
      unitWidth = Math.max(1.0, unitWidth);
      unitHeight = Math.max(1.0, unitHeight);

      const totalItemWeight = Math.round(unitWeight * qty * 100) / 100;

      itemDetails.push({
        productId: product.id,
        productName: product.name,
        quantity: qty,
        unitWeight,
        totalWeight: totalItemWeight,
        length: unitLength,
        width: unitWidth,
        height: unitHeight,
      });
    }

    const totalOrderWeight = Math.round(
      itemDetails.reduce((sum, item) => sum + item.totalWeight, 0) * 100
    ) / 100;

    // Packaging distribution logic
    // Determine package count based on max 50 lbs limit
    const packageCount = Math.max(1, Math.ceil(totalOrderWeight / this.MAX_BOX_WEIGHT));
    const packages: CalculatedPackage[] = [];

    // Distribute weight evenly across packages
    const weightPerPackage = Math.round((totalOrderWeight / packageCount) * 100) / 100;

    for (let i = 0; i < packageCount; i++) {
      const pkgWeight =
        i === packageCount - 1
          ? Math.max(1.0, Math.round((totalOrderWeight - weightPerPackage * (packageCount - 1)) * 100) / 100)
          : Math.max(1.0, weightPerPackage);

      // Select realistic box dimensions based on package weight
      let boxLength = 14.0;
      let boxWidth = 10.0;
      let boxHeight = 8.0;

      if (pkgWeight > 30.0) {
        boxLength = 24.0;
        boxWidth = 18.0;
        boxHeight = 18.0;
      } else if (pkgWeight > 15.0) {
        boxLength = 18.0;
        boxWidth = 14.0;
        boxHeight = 12.0;
      }

      packages.push({
        packageNumber: i + 1,
        weight: pkgWeight,
        weightUnit: "LBS",
        length: boxLength,
        width: boxWidth,
        height: boxHeight,
        dimensionUnit: "IN",
      });
    }

    return {
      packages,
      totalWeight: totalOrderWeight,
      weightUnit: "LBS",
      totalPackages: packages.length,
      itemDetails: itemDetails.map((it) => ({
        productId: it.productId,
        productName: it.productName,
        quantity: it.quantity,
        unitWeight: it.unitWeight,
        totalWeight: it.totalWeight,
      })),
    };
  }
}
