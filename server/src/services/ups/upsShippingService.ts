import { pool } from "../../config/db.js";
import { RowDataPacket } from "mysql2";

export interface CreateShipmentPreparationInput {
  orderId: string;
  carrier: "UPS";
  serviceCode: string;
  serviceName: string;
  shippingAmount: number;
  currency: "USD";
  originAddress: any;
  destinationAddress: any;
  packageWeight: number;
  packageWeightUnit: "LBS";
  packageLength: number;
  packageWidth: number;
  packageHeight: number;
  packageDimensionUnit: "IN";
  rateQuoteReference?: string;
  estimatedDeliveryDate?: string;
}

/**
 * Service handling shipment records and prepared for future UPS label creation.
 * Does not generate fake labels or fake tracking numbers.
 */
export class UpsShippingService {
  /**
   * Save or update selected shipping rate and package details for an order
   */
  public static async recordSelectedShipping(
    input: CreateShipmentPreparationInput
  ): Promise<{ success: boolean; shipmentId: number }> {
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      // Check if an order_shipments record already exists for this order
      const [existingRows] = await connection.execute<RowDataPacket[]>(
        `SELECT id FROM order_shipments WHERE order_id = ? LIMIT 1`,
        [input.orderId]
      );

      let shipmentId: number;

      if (existingRows.length > 0) {
        shipmentId = existingRows[0].id;
        await connection.execute(
          `UPDATE order_shipments SET
            carrier = ?,
            service_code = ?,
            service_name = ?,
            origin_address = ?,
            destination_address = ?,
            package_weight = ?,
            package_weight_unit = ?,
            package_length = ?,
            package_width = ?,
            package_height = ?,
            package_dimension_unit = ?,
            shipping_amount = ?,
            currency = ?,
            rate_quote_reference = ?,
            shipment_status = 'RATE_SELECTED',
            estimated_delivery_date = ?,
            updated_at = CURRENT_TIMESTAMP
           WHERE id = ?`,
          [
            input.carrier,
            input.serviceCode,
            input.serviceName,
            JSON.stringify(input.originAddress),
            JSON.stringify(input.destinationAddress),
            input.packageWeight,
            input.packageWeightUnit,
            input.packageLength,
            input.packageWidth,
            input.packageHeight,
            input.packageDimensionUnit,
            input.shippingAmount,
            input.currency,
            input.rateQuoteReference || null,
            input.estimatedDeliveryDate || null,
            shipmentId,
          ]
        );
      } else {
        const [result]: any = await connection.execute(
          `INSERT INTO order_shipments (
            order_id, carrier, service_code, service_name, origin_address, destination_address,
            package_weight, package_weight_unit, package_length, package_width, package_height, package_dimension_unit,
            shipping_amount, currency, rate_quote_reference, shipment_status, estimated_delivery_date
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'RATE_SELECTED', ?)`,
          [
            input.orderId,
            input.carrier,
            input.serviceCode,
            input.serviceName,
            JSON.stringify(input.originAddress),
            JSON.stringify(input.destinationAddress),
            input.packageWeight,
            input.packageWeightUnit,
            input.packageLength,
            input.packageWidth,
            input.packageHeight,
            input.packageDimensionUnit,
            input.shippingAmount,
            input.currency,
            input.rateQuoteReference || null,
            input.estimatedDeliveryDate || null,
          ]
        );
        shipmentId = result.insertId;
      }

      // Update orders table with snapshot
      await connection.execute(
        `UPDATE orders SET
          shipping_carrier = ?,
          shipping_service = ?,
          shipping_service_code = ?,
          shipping_amount = ?,
          shipping_currency = ?,
          delivery_fee = ?,
          rate_quote_reference = ?,
          status = 'SHIPPING_SELECTED',
          status_text = ?,
          estimated_delivery = ?,
          updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`,
        [
          input.carrier,
          input.serviceName,
          input.serviceCode,
          input.shippingAmount,
          input.currency,
          input.shippingAmount,
          input.rateQuoteReference || null,
          `UPS Shipping Selected: ${input.serviceName}`,
          input.estimatedDeliveryDate || "Calculated at Dispatch",
          input.orderId,
        ]
      );

      // Recalculate order total (subtotal - volume_discount + shipping_amount + tax)
      await connection.execute(
        `UPDATE orders SET
          total = GREATEST(0, (subtotal - volume_discount) + shipping_amount + tax)
         WHERE id = ?`,
        [input.orderId]
      );

      await connection.commit();
      connection.release();

      return { success: true, shipmentId };
    } catch (err) {
      await connection.rollback();
      connection.release();
      throw err;
    }
  }

  /**
   * Get shipment record by order ID
   */
  public static async getShipmentByOrderId(orderId: string): Promise<any | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT * FROM order_shipments WHERE order_id = ? ORDER BY id DESC LIMIT 1`,
      [orderId]
    );

    if (rows.length === 0) return null;
    const r = rows[0];

    return {
      id: r.id,
      orderId: r.order_id,
      carrier: r.carrier,
      serviceCode: r.service_code,
      serviceName: r.service_name,
      originAddress: typeof r.origin_address === "string" ? JSON.parse(r.origin_address) : r.origin_address,
      destinationAddress: typeof r.destination_address === "string" ? JSON.parse(r.destination_address) : r.destination_address,
      packageWeight: parseFloat(r.package_weight),
      packageWeightUnit: r.package_weight_unit,
      packageLength: parseFloat(r.package_length),
      packageWidth: parseFloat(r.package_width),
      packageHeight: parseFloat(r.package_height),
      packageDimensionUnit: r.package_dimension_unit,
      shippingAmount: parseFloat(r.shipping_amount),
      currency: r.currency,
      rateQuoteReference: r.rate_quote_reference,
      trackingNumber: r.tracking_number,
      upsShipmentId: r.ups_shipment_id,
      shipmentStatus: r.shipment_status,
      estimatedDeliveryDate: r.estimated_delivery_date,
      shippedAt: r.shipped_at,
      deliveredAt: r.delivered_at,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    };
  }
}
