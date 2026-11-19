import { pool } from "../config/db.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface OrderItemInput {
  productId: string;
  productName: string;
  image: string;
  sizeName: string;
  caseCount: number;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface CreateOrderInput {
  id: string;
  userId?: string;
  status?: string;
  statusText: string;
  estimatedDelivery: string;
  fulfillmentType: "delivery" | "pickup";
  customer: {
    businessName: string;
    contactName: string;
    phone: string;
    email: string;
  };
  deliveryAddress?: {
    street: string;
    suite?: string;
    city: string;
    state: string;
    zip: string;
    notes?: string;
  };
  taxExempt: boolean;
  resalePermitNumber?: string;
  items: OrderItemInput[];
  pricing: {
    subtotal: number;
    volumeDiscount: number;
    deliveryFee: number;
    tax: number;
    total: number;
  };
  paymentMethod: "card" | "net30" | "cod" | "zelle" | string;
  paymentStatus: "paid" | "net30_pending" | "cod_pending" | "pending" | string;
  shippingCarrier?: string;
  shippingService?: string;
  shippingServiceCode?: string;
  shippingAmount?: number;
  rateQuoteReference?: string;
  zellePhone?: string;
  zelleReferenceId?: string;
  zelleSenderName?: string;
}

export class OrderRepository {
  static async createOrder(input: CreateOrderInput): Promise<any> {
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      const orderStatus = input.status || (input.paymentMethod === "zelle" ? "pending" : "received");
      const paymentStatus = input.paymentStatus || (input.paymentMethod === "zelle" ? "pending" : "paid");

      // Check if order already exists (e.g. created during selectShipping draft)
      const [existing]: any = await connection.query(
        "SELECT id FROM `orders` WHERE id = ? LIMIT 1",
        [input.id]
      );

      if (existing && existing.length > 0) {
        // Update existing order with final status, payment, and customer details
        await connection.execute(
          `UPDATE orders SET
            user_id = COALESCE(?, user_id),
            status = ?,
            status_text = ?,
            estimated_delivery = ?,
            fulfillment_type = ?,
            customer_business_name = ?,
            customer_contact_name = ?,
            customer_phone = ?,
            customer_email = ?,
            delivery_street = ?,
            delivery_suite = ?,
            delivery_city = ?,
            delivery_state = ?,
            delivery_zip = ?,
            delivery_notes = ?,
            tax_exempt = ?,
            resale_permit_number = ?,
            subtotal = ?,
            volume_discount = ?,
            delivery_fee = ?,
            tax = ?,
            total = ?,
            payment_method = ?,
            payment_status = ?,
            shipping_carrier = COALESCE(?, shipping_carrier, 'UPS'),
            shipping_service = COALESCE(?, shipping_service),
            shipping_service_code = COALESCE(?, shipping_service_code),
            shipping_amount = COALESCE(?, shipping_amount, ?),
            rate_quote_reference = COALESCE(?, rate_quote_reference),
            zelle_phone = ?,
            zelle_reference_id = ?,
            zelle_sender_name = ?,
            updated_at = CURRENT_TIMESTAMP
          WHERE id = ?`,
          [
            input.userId || null,
            orderStatus,
            input.statusText,
            input.estimatedDelivery,
            input.fulfillmentType,
            input.customer.businessName,
            input.customer.contactName,
            input.customer.phone,
            input.customer.email,
            input.deliveryAddress?.street || null,
            input.deliveryAddress?.suite || null,
            input.deliveryAddress?.city || null,
            input.deliveryAddress?.state || null,
            input.deliveryAddress?.zip || null,
            input.deliveryAddress?.notes || null,
            input.taxExempt ? 1 : 0,
            input.resalePermitNumber || null,
            input.pricing.subtotal,
            input.pricing.volumeDiscount,
            input.pricing.deliveryFee,
            input.pricing.tax,
            input.pricing.total,
            input.paymentMethod,
            paymentStatus,
            input.shippingCarrier || null,
            input.shippingService || null,
            input.shippingServiceCode || null,
            input.shippingAmount !== undefined ? input.shippingAmount : null,
            input.pricing.deliveryFee,
            input.rateQuoteReference || null,
            input.zellePhone || (input.paymentMethod === "zelle" ? "(661) 805-9358" : null),
            input.zelleReferenceId || null,
            input.zelleSenderName || null,
            input.id,
          ]
        );
      } else {
        // Insert new order
        await connection.execute(
          `INSERT INTO orders (
            id, user_id, status, status_text, estimated_delivery, fulfillment_type,
            customer_business_name, customer_contact_name, customer_phone, customer_email,
            delivery_street, delivery_suite, delivery_city, delivery_state, delivery_zip, delivery_notes,
            tax_exempt, resale_permit_number, subtotal, volume_discount, delivery_fee, tax, total,
            payment_method, payment_status, shipping_carrier, shipping_service, shipping_service_code,
            shipping_amount, shipping_currency, rate_quote_reference,
            zelle_phone, zelle_reference_id, zelle_sender_name
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'USD', ?, ?, ?, ?)`,
          [
            input.id,
            input.userId || null,
            orderStatus,
            input.statusText,
            input.estimatedDelivery,
            input.fulfillmentType,
            input.customer.businessName,
            input.customer.contactName,
            input.customer.phone,
            input.customer.email,
            input.deliveryAddress?.street || null,
            input.deliveryAddress?.suite || null,
            input.deliveryAddress?.city || null,
            input.deliveryAddress?.state || null,
            input.deliveryAddress?.zip || null,
            input.deliveryAddress?.notes || null,
            input.taxExempt ? 1 : 0,
            input.resalePermitNumber || null,
            input.pricing.subtotal,
            input.pricing.volumeDiscount,
            input.pricing.deliveryFee,
            input.pricing.tax,
            input.pricing.total,
            input.paymentMethod,
            paymentStatus,
            input.shippingCarrier || "UPS",
            input.shippingService || null,
            input.shippingServiceCode || null,
            input.shippingAmount || input.pricing.deliveryFee,
            input.rateQuoteReference || null,
            input.zellePhone || (input.paymentMethod === "zelle" ? "(661) 805-9358" : null),
            input.zelleReferenceId || null,
            input.zelleSenderName || null,
          ]
        );

        // Insert Order Items if fresh order
        for (const item of input.items) {
          await connection.execute(
            `INSERT INTO order_items (
              order_id, product_id, product_name, image, size_name, case_count, quantity, unit_price, line_total
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              input.id,
              item.productId,
              item.productName,
              item.image,
              item.sizeName,
              item.caseCount,
              item.quantity,
              item.unitPrice,
              item.lineTotal,
            ]
          );
        }
      }

      // If Zelle payment, record in zelle_payments table
      if (input.paymentMethod === "zelle" && input.zelleReferenceId) {
        try {
          await connection.execute(
            `INSERT INTO zelle_payments (
              order_id, recipient_phone, recipient_name, amount, currency, reference_id,
              sender_name, sender_phone, sender_email, status, notes
            ) VALUES (?, ?, 'The Takeout Box', ?, 'USD', ?, ?, ?, ?, 'pending', 'Submitted via checkout')`,
            [
              input.id,
              input.zellePhone || "(661) 805-9358",
              input.pricing.total,
              input.zelleReferenceId.trim(),
              input.zelleSenderName || input.customer.contactName || null,
              input.customer.phone || null,
              input.customer.email || null,
            ]
          );
        } catch (zelleErr: any) {
          console.warn("[OrderRepository] Non-fatal error recording in zelle_payments:", zelleErr.message);
        }
      }

      await connection.commit();
      connection.release();

      return await this.getOrderById(input.id);
    } catch (err) {
      await connection.rollback();
      connection.release();
      throw err;
    }
  }

  static async getOrdersByUser(
    userId: string,
    page: number = 1,
    limit: number = 2
  ): Promise<{ orders: any[]; total: number; page: number; totalPages: number }> {
    const offset = (page - 1) * limit;

    // Self-healing: link any previous guest/unlinked orders where customer_email matches this user's email
    try {
      await pool.execute(
        `UPDATE orders 
         SET user_id = ? 
         WHERE (user_id IS NULL OR user_id = '') 
           AND LOWER(TRIM(customer_email)) = (SELECT LOWER(TRIM(email)) FROM users WHERE id = ? LIMIT 1)`,
        [userId, userId]
      );
    } catch (healErr) {
      console.warn("[OrderRepository] Order self-healing notice:", healErr);
    }

    const [countRows] = await pool.execute<RowDataPacket[]>(
      `SELECT COUNT(*) as total FROM orders 
       WHERE user_id = ? 
          OR LOWER(TRIM(customer_email)) = (SELECT LOWER(TRIM(email)) FROM users WHERE id = ? LIMIT 1)`,
      [userId, userId]
    );
    const total = countRows[0]?.total || 0;
    const totalPages = Math.max(1, Math.ceil(total / limit));

    const [orderRows] = await pool.execute<RowDataPacket[]>(
      `SELECT * FROM orders 
       WHERE user_id = ? 
          OR LOWER(TRIM(customer_email)) = (SELECT LOWER(TRIM(email)) FROM users WHERE id = ? LIMIT 1)
       ORDER BY date DESC LIMIT ? OFFSET ?`,
      [userId, userId, Number(limit), Number(offset)]
    );

    const orders = [];
    for (const row of orderRows) {
      const order = await this.formatOrder(row);
      orders.push(order);
    }

    return { orders, total, page, totalPages };
  }

  static async getAllOrders(
    page: number = 1,
    limit: number = 20,
    statusFilter?: string
  ): Promise<{ orders: any[]; total: number; page: number; totalPages: number }> {
    const offset = (page - 1) * limit;
    let queryCount = "SELECT COUNT(*) as total FROM orders";
    let queryOrders = "SELECT * FROM orders ORDER BY date DESC LIMIT ? OFFSET ?";
    let paramsOrders: any[] = [Number(limit), Number(offset)];
    let paramsCount: any[] = [];

    if (statusFilter && statusFilter !== "all") {
      queryCount = "SELECT COUNT(*) as total FROM orders WHERE status = ?";
      queryOrders = "SELECT * FROM orders WHERE status = ? ORDER BY date DESC LIMIT ? OFFSET ?";
      paramsCount = [statusFilter];
      paramsOrders = [statusFilter, Number(limit), Number(offset)];
    }

    const [countRows] = await pool.execute<RowDataPacket[]>(queryCount, paramsCount);
    const total = countRows[0]?.total || 0;
    const totalPages = Math.max(1, Math.ceil(total / limit));

    const [orderRows] = await pool.execute<RowDataPacket[]>(queryOrders, paramsOrders);
    const orders = [];
    for (const row of orderRows) {
      const order = await this.formatOrder(row);
      orders.push(order);
    }

    return { orders, total, page, totalPages };
  }

  static async getOrderById(orderId: string): Promise<any | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      "SELECT * FROM orders WHERE id = ? LIMIT 1",
      [orderId]
    );

    if (rows.length === 0) return null;
    return await this.formatOrder(rows[0]);
  }

  private static async formatOrder(row: any): Promise<any> {
    // Fetch Items
    const [itemRows] = await pool.execute<RowDataPacket[]>(
      "SELECT * FROM order_items WHERE order_id = ?",
      [row.id]
    );

    // Fetch Rating
    const [ratingRows] = await pool.execute<RowDataPacket[]>(
      "SELECT * FROM order_ratings WHERE order_id = ? LIMIT 1",
      [row.id]
    );

    const rating = ratingRows.length > 0 ? {
      rating: ratingRows[0].rating,
      tags: typeof ratingRows[0].tags === "string" ? JSON.parse(ratingRows[0].tags) : ratingRows[0].tags,
      feedback: ratingRows[0].feedback,
      submittedAt: ratingRows[0].submitted_at,
    } : undefined;

    // Fetch Shipment details if available
    const [shipmentRows] = await pool.execute<RowDataPacket[]>(
      "SELECT * FROM order_shipments WHERE order_id = ? ORDER BY id DESC LIMIT 1",
      [row.id]
    );

    const shipment = shipmentRows.length > 0 ? {
      id: shipmentRows[0].id,
      carrier: shipmentRows[0].carrier,
      serviceCode: shipmentRows[0].service_code,
      serviceName: shipmentRows[0].service_name,
      packageWeight: parseFloat(shipmentRows[0].package_weight),
      packageWeightUnit: shipmentRows[0].package_weight_unit,
      packageLength: parseFloat(shipmentRows[0].package_length),
      packageWidth: parseFloat(shipmentRows[0].package_width),
      packageHeight: parseFloat(shipmentRows[0].package_height),
      packageDimensionUnit: shipmentRows[0].package_dimension_unit,
      shippingAmount: parseFloat(shipmentRows[0].shipping_amount),
      currency: shipmentRows[0].currency,
      rateQuoteReference: shipmentRows[0].rate_quote_reference,
      trackingNumber: shipmentRows[0].tracking_number,
      upsShipmentId: shipmentRows[0].ups_shipment_id,
      shipmentStatus: shipmentRows[0].shipment_status,
      estimatedDeliveryDate: shipmentRows[0].estimated_delivery_date,
      shippedAt: shipmentRows[0].shipped_at,
      deliveredAt: shipmentRows[0].delivered_at,
    } : null;

    return {
      id: row.id,
      date: row.date,
      status: row.status,
      statusText: row.status_text,
      estimatedDelivery: row.estimated_delivery,
      fulfillmentType: row.fulfillment_type,
      customer: {
        businessName: row.customer_business_name,
        contactName: row.customer_contact_name,
        phone: row.customer_phone,
        email: row.customer_email,
      },
      deliveryAddress: row.fulfillment_type === "delivery" ? {
        street: row.delivery_street,
        suite: row.delivery_suite,
        city: row.delivery_city,
        state: row.delivery_state,
        zip: row.delivery_zip,
        notes: row.delivery_notes,
      } : undefined,
      shippingAddressSnapshot: {
        firstName: row.shipping_first_name,
        lastName: row.shipping_last_name,
        street: row.shipping_address_line1 || row.delivery_street,
        suite: row.shipping_address_line2 || row.delivery_suite,
        city: row.shipping_city || row.delivery_city,
        state: row.shipping_state || row.delivery_state,
        zip: row.shipping_zip || row.delivery_zip,
        country: row.shipping_country || "United States",
      },
      shippingCarrier: row.shipping_carrier || "UPS",
      shippingService: row.shipping_service || null,
      shippingServiceCode: row.shipping_service_code || null,
      shippingAmount: parseFloat(row.shipping_amount || row.delivery_fee || 0),
      shippingCurrency: row.shipping_currency || "USD",
      rateQuoteReference: row.rate_quote_reference || null,
      shipment,
      taxExempt: Boolean(row.tax_exempt),
      resalePermitNumber: row.resale_permit_number,
      items: itemRows.map((it: any) => ({
        productId: it.product_id,
        productName: it.product_name,
        image: it.image,
        sizeName: it.size_name,
        caseCount: it.case_count,
        quantity: it.quantity,
        unitPrice: parseFloat(it.unit_price),
        lineTotal: parseFloat(it.line_total),
      })),
      pricing: {
        subtotal: parseFloat(row.subtotal),
        volumeDiscount: parseFloat(row.volume_discount),
        deliveryFee: parseFloat(row.shipping_amount || row.delivery_fee || 0),
        tax: parseFloat(row.tax),
        total: parseFloat(row.total),
      },
      paymentMethod: row.payment_method,
      paymentStatus: row.payment_status,
      zelleDetails: row.payment_method === "zelle" || row.zelle_reference_id ? {
        recipientPhone: row.zelle_phone || "(661) 805-9358",
        recipientName: "The Takeout Box",
        referenceId: row.zelle_reference_id,
        senderName: row.zelle_sender_name,
      } : undefined,
      rating,
    };
  }
}
