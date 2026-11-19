import { Request, Response } from "express";
import {
  UpsAddressService,
  UpsApiError,
  UpsPackagingService,
  UpsRatingService,
  UpsShippingService,
  UpsTrackingService,
} from "../services/ups/index.js";
import { pool } from "../config/db.js";
import { RowDataPacket } from "mysql2";
import { OrderRepository } from "../repositories/orderRepository.js";
import { UserRepository } from "../repositories/userRepository.js";

export class ShippingController {
  /**
   * POST /api/v1/shipping/validate-address
   * Validate US destination address using UPS Address Validation (XAV API)
   */
  public static async validateAddress(req: Request, res: Response): Promise<void> {
    const { street, suite, city, state, zip } = req.body;

    console.log(`\n======================================================`);
    console.log(`[UPS DEBUG] Step 1: Request Received for Address Validation`);
    console.log(`Payload: street="${street}", suite="${suite || ""}", city="${city}", state="${state}", zip="${zip}"`);

    // Input validation
    if (!street || !String(street).trim()) {
      console.log(`[UPS DEBUG] Validation Error: Missing street address`);
      console.log(`======================================================\n`);
      res.status(400).json({
        success: false,
        valid: false,
        error: {
          type: "VALIDATION_ERROR",
          code: "MISSING_STREET",
          message: "Street address is required.",
        },
        message: "Street address is required.",
      });
      return;
    }

    if (!city || !String(city).trim()) {
      console.log(`[UPS DEBUG] Validation Error: Missing city`);
      console.log(`======================================================\n`);
      res.status(400).json({
        success: false,
        valid: false,
        error: {
          type: "VALIDATION_ERROR",
          code: "MISSING_CITY",
          message: "City is required.",
        },
        message: "City is required.",
      });
      return;
    }

    if (!state || !String(state).trim()) {
      console.log(`[UPS DEBUG] Validation Error: Missing state`);
      console.log(`======================================================\n`);
      res.status(400).json({
        success: false,
        valid: false,
        error: {
          type: "VALIDATION_ERROR",
          code: "MISSING_STATE",
          message: "State is required.",
        },
        message: "State is required.",
      });
      return;
    }

    if (!zip || !String(zip).trim()) {
      console.log(`[UPS DEBUG] Validation Error: Missing ZIP code`);
      console.log(`======================================================\n`);
      res.status(400).json({
        success: false,
        valid: false,
        error: {
          type: "VALIDATION_ERROR",
          code: "MISSING_ZIP",
          message: "ZIP Code is required.",
        },
        message: "ZIP Code is required.",
      });
      return;
    }

    // USA Only validation
    const cleanState = String(state).trim().toUpperCase();
    const cleanZip = String(zip).trim();

    const usZipRegex = /^\d{5}(-\d{4})?$/;
    if (!usZipRegex.test(cleanZip)) {
      console.log(`[UPS DEBUG] Validation Error: Invalid ZIP format "${cleanZip}"`);
      console.log(`======================================================\n`);
      res.status(400).json({
        success: false,
        valid: false,
        error: {
          type: "VALIDATION_ERROR",
          code: "INVALID_ZIP",
          message: "Please enter a valid 5-digit US ZIP code (e.g. 93313 or 93313-1234).",
        },
        message: "Please enter a valid 5-digit US ZIP code (e.g. 93313 or 93313-1234).",
      });
      return;
    }

    try {
      const result = await UpsAddressService.validateAddress({
        street: String(street).trim(),
        suite: suite ? String(suite).trim() : undefined,
        city: String(city).trim(),
        state: cleanState,
        zip: cleanZip,
        country: "US",
        recipientName: req.body.recipientName,
        businessName: req.body.businessName,
      });

      console.log(`[UPS DEBUG] Step 10: Address Validation Succeeded. Valid: ${result.valid}`);
      console.log(`======================================================\n`);

      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (err: any) {
      console.error(`\n[UPS DEBUG] Step 11: Final Backend Error Caught:`);
      console.error(`Type: ${err.type || err.name || "Error"}`);
      console.error(`Code: ${err.code || "UNKNOWN"}`);
      console.error(`Message: ${err.message}`);
      console.log(`======================================================\n`);

      if (err instanceof UpsApiError) {
        // Map upstream auth error to 502 Bad Gateway to avoid triggering customer token refresh in client
        const httpStatus = err.type === "UPS_AUTH_ERROR" ? 502 : (err.statusCode || 500);
        res.status(httpStatus).json({
          success: false,
          valid: false,
          error: {
            type: err.type,
            code: err.code,
            message: err.message,
          },
          message: "We couldn't validate this address right now. Please check your street, city, state, and ZIP code.",
        });
        return;
      }

      res.status(500).json({
        success: false,
        valid: false,
        error: {
          type: "BACKEND_ERROR",
          code: err.code || "INTERNAL_ERROR",
          message: err.message || "An unexpected error occurred during address validation.",
        },
        message: "We couldn't validate this address right now. Please check your street, city, state, and ZIP code.",
      });
    }
  }

  /**
   * POST /api/v1/shipping/rates
   * Calculate live UPS shipping rates based on cart items & US destination address
   */
  public static async getRates(req: Request, res: Response): Promise<void> {
    try {
      const { destination, items } = req.body;

      if (!destination || !destination.street || !destination.city || !destination.state || !destination.zip) {
        res.status(400).json({
          success: false,
          message: "Complete US destination address (street, city, state, ZIP) is required to calculate UPS rates.",
        });
        return;
      }

      if (!items || !Array.isArray(items) || items.length === 0) {
        res.status(400).json({
          success: false,
          message: "Cart is empty. Please add products to your cart before requesting shipping rates.",
        });
        return;
      }

      // 1. Calculate shipment package dimensions & weights from database products
      let packaging;
      try {
        packaging = await UpsPackagingService.calculatePackaging(
          items.map((it: any) => ({
            productId: it.productId || it.id,
            sizeName: it.sizeName || it.size?.name,
            quantity: it.quantity || 1,
          }))
        );
      } catch (pkgErr: any) {
        res.status(400).json({
          success: false,
          message: pkgErr.message || "Failed to calculate package dimensions for cart items.",
        });
        return;
      }

      // 2. Request real rates from UPS Rating API
      const ratesResult = await UpsRatingService.calculateRates(
        {
          street: destination.street,
          suite: destination.suite,
          city: destination.city,
          state: destination.state,
          zip: destination.zip,
          country: "US",
          recipientName: destination.recipientName || destination.contactName,
          businessName: destination.businessName,
        },
        packaging
      );

      if (!ratesResult.rates || ratesResult.rates.length === 0) {
        res.status(200).json({
          success: true,
          rates: [],
          message: "We couldn't find a UPS shipping option for this address. Please verify your shipping address or try again.",
          packageInfo: ratesResult.packageInfo,
        });
        return;
      }

      res.status(200).json({
        success: true,
        rates: ratesResult.rates,
        packageInfo: ratesResult.packageInfo,
        destination: ratesResult.destination,
        requestTimestamp: ratesResult.requestTimestamp,
      });
    } catch (err: any) {
      console.error("[ShippingController.getRates Error]", err.message);

      let userMessage = "We couldn't calculate shipping rates right now. Please check your address and try again.";
      if (err.message && err.message.includes("origin is not configured")) {
        userMessage = "UPS shipping origin is not configured.";
      } else if (err.message && err.message.includes("credentials")) {
        userMessage = "UPS shipping credentials are not configured on the server.";
      }

      res.status(500).json({
        success: false,
        message: userMessage,
      });
    }
  }

  /**
   * POST /api/v1/shipping/select
   * Verifies authoritative rate from UPS, saves shipping selection & creates/updates order draft.
   */
  public static async selectShipping(req: Request, res: Response): Promise<void> {
    try {
      const {
        orderId,
        customer,
        shippingAddress,
        items,
        selectedServiceCode,
        taxExempt,
        resalePermitNumber,
      } = req.body;

      if (!customer || !customer.firstName || !customer.lastName || !customer.email || !customer.phone) {
        res.status(400).json({
          success: false,
          message: "Customer first name, last name, valid email, and phone number are required.",
        });
        return;
      }

      if (!shippingAddress || !shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zip) {
        res.status(400).json({
          success: false,
          message: "Valid US shipping address (street, city, state, ZIP) is required.",
        });
        return;
      }

      if (!selectedServiceCode) {
        res.status(400).json({
          success: false,
          message: "Selected UPS shipping service code is required.",
        });
        return;
      }

      if (!items || !Array.isArray(items) || items.length === 0) {
        res.status(400).json({
          success: false,
          message: "Cannot select shipping for an empty cart.",
        });
        return;
      }

      // 1. Authoritative rate verification on backend
      const packaging = await UpsPackagingService.calculatePackaging(
        items.map((it: any) => ({
          productId: it.productId || it.id,
          sizeName: it.sizeName || it.size?.name,
          quantity: it.quantity || 1,
        }))
      );

      const ratesResult = await UpsRatingService.calculateRates(
        {
          street: shippingAddress.street,
          suite: shippingAddress.suite,
          city: shippingAddress.city,
          state: shippingAddress.state,
          zip: shippingAddress.zip,
          country: "US",
        },
        packaging
      );

      const matchedOption = ratesResult.rates.find(
        (r) => r.serviceCode === selectedServiceCode
      );

      if (!matchedOption) {
        res.status(400).json({
          success: false,
          message: "The selected UPS shipping option is no longer available. Please recalculate rates.",
        });
        return;
      }

      const authoritativeShippingCost = matchedOption.rate;
      const primaryPackage = packaging.packages[0] || {
        weight: packaging.totalWeight,
        length: 14,
        width: 10,
        height: 8,
      };

      // 2. Identify or verify user
      let userId = req.user?.id;
      if (!userId && customer.email) {
        const userByEmail = await UserRepository.findByEmail(customer.email);
        if (userByEmail) userId = userByEmail.id;
      }

      // 3. Subtotal calculation directly from DB prices
      let calculatedSubtotal = 0;
      const orderItems = [];

      for (const it of items) {
        const pId = it.productId || it.id;
        const [pRows] = await pool.execute<RowDataPacket[]>(
          `SELECT id, name, image_url, price FROM products WHERE id = ? LIMIT 1`,
          [pId]
        );
        if (pRows.length === 0) continue;
        const prod = pRows[0];

        let unitPrice = parseFloat(prod.price) || 0;
        let sizeName = it.sizeName || it.size?.name || "Standard";
        let caseCount = it.caseCount || it.size?.caseCount || 100;

        if (it.sizeName || it.size?.name) {
          const [sRows] = await pool.execute<RowDataPacket[]>(
            `SELECT name, price, case_count FROM product_sizes WHERE product_id = ? AND name = ? LIMIT 1`,
            [pId, sizeName]
          );
          if (sRows.length > 0) {
            unitPrice = parseFloat(sRows[0].price);
            caseCount = sRows[0].case_count;
          }
        }

        const qty = Math.max(1, Math.floor(Number(it.quantity) || 1));
        const lineTotal = Math.round(unitPrice * qty * 100) / 100;
        calculatedSubtotal += lineTotal;

        orderItems.push({
          productId: prod.id,
          productName: prod.name,
          image: prod.image_url || "/images/placeholder.jpg",
          sizeName,
          caseCount,
          quantity: qty,
          unitPrice,
          lineTotal,
        });
      }

      calculatedSubtotal = Math.round(calculatedSubtotal * 100) / 100;

      // Volume tiers: >= $300 -> 10%, >= $150 -> 5%
      let volumeDiscount = 0;
      if (calculatedSubtotal >= 300) {
        volumeDiscount = Math.round(calculatedSubtotal * 0.1 * 100) / 100;
      } else if (calculatedSubtotal >= 150) {
        volumeDiscount = Math.round(calculatedSubtotal * 0.05 * 100) / 100;
      }

      const taxableAmount = Math.max(0, calculatedSubtotal - volumeDiscount);
      // CA Sales Tax (8.25%) applied only to CA deliveries unless tax exempt
      const isCADestination = shippingAddress.state.toUpperCase() === "CA";
      const taxRate = isCADestination ? 0.0825 : 0.0;
      const tax = taxExempt ? 0 : Math.round(taxableAmount * taxRate * 100) / 100;
      const finalTotal = Math.round((taxableAmount + authoritativeShippingCost + tax) * 100) / 100;

      const finalOrderId = orderId || `TB-${Math.floor(10000 + Math.random() * 90000)}`;

      // 4. Create or Update Order in MySQL
      const [existingOrderRows] = await pool.execute<RowDataPacket[]>(
        `SELECT id FROM orders WHERE id = ? LIMIT 1`,
        [finalOrderId]
      );

      const fullName = `${customer.firstName.trim()} ${customer.lastName.trim()}`;
      const businessName = customer.businessName?.trim() || fullName;

      if (existingOrderRows.length === 0) {
        await pool.execute(
          `INSERT INTO orders (
            id, user_id, status, status_text, estimated_delivery, fulfillment_type,
            customer_business_name, customer_contact_name, customer_phone, customer_email,
            delivery_street, delivery_suite, delivery_city, delivery_state, delivery_zip,
            shipping_carrier, shipping_service, shipping_service_code, shipping_amount, shipping_currency,
            shipping_first_name, shipping_last_name, shipping_address_line1, shipping_address_line2,
            shipping_city, shipping_state, shipping_zip, shipping_country,
            rate_quote_reference, tax_exempt, resale_permit_number,
            subtotal, volume_discount, delivery_fee, tax, total,
            payment_method, payment_status
          ) VALUES (?, ?, 'READY_FOR_PAYMENT', ?, ?, 'delivery', ?, ?, ?, ?, ?, ?, ?, ?, ?, 'UPS', ?, ?, ?, 'USD', ?, ?, ?, ?, ?, ?, ?, 'United States', ?, ?, ?, ?, ?, ?, ?, ?, 'card', 'NOT_STARTED')`,
          [
            finalOrderId,
            userId || null,
            `UPS ${matchedOption.serviceName} Selected`,
            matchedOption.estimatedDelivery || "Calculated at Dispatch",
            businessName,
            fullName,
            customer.phone,
            customer.email,
            shippingAddress.street,
            shippingAddress.suite || null,
            shippingAddress.city,
            shippingAddress.state,
            shippingAddress.zip,
            matchedOption.serviceName,
            matchedOption.serviceCode,
            authoritativeShippingCost,
            customer.firstName.trim(),
            customer.lastName.trim(),
            shippingAddress.street,
            shippingAddress.suite || null,
            shippingAddress.city,
            shippingAddress.state,
            shippingAddress.zip,
            matchedOption.rateQuoteReference || null,
            taxExempt ? 1 : 0,
            taxExempt ? resalePermitNumber || null : null,
            calculatedSubtotal,
            volumeDiscount,
            authoritativeShippingCost,
            tax,
            finalTotal,
          ]
        );

        // Insert order items
        for (const item of orderItems) {
          await pool.execute(
            `INSERT INTO order_items (
              order_id, product_id, product_name, image, size_name, case_count, quantity, unit_price, line_total
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              finalOrderId,
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
      } else {
        // Update existing order
        await pool.execute(
          `UPDATE orders SET
            customer_business_name = ?, customer_contact_name = ?, customer_phone = ?, customer_email = ?,
            delivery_street = ?, delivery_suite = ?, delivery_city = ?, delivery_state = ?, delivery_zip = ?,
            shipping_carrier = 'UPS', shipping_service = ?, shipping_service_code = ?, shipping_amount = ?, shipping_currency = 'USD',
            shipping_first_name = ?, shipping_last_name = ?, shipping_address_line1 = ?, shipping_address_line2 = ?,
            shipping_city = ?, shipping_state = ?, shipping_zip = ?, shipping_country = 'United States',
            rate_quote_reference = ?, status = 'READY_FOR_PAYMENT', status_text = ?, estimated_delivery = ?,
            subtotal = ?, volume_discount = ?, delivery_fee = ?, tax = ?, total = ?,
            payment_status = 'NOT_STARTED', updated_at = CURRENT_TIMESTAMP
           WHERE id = ?`,
          [
            businessName,
            fullName,
            customer.phone,
            customer.email,
            shippingAddress.street,
            shippingAddress.suite || null,
            shippingAddress.city,
            shippingAddress.state,
            shippingAddress.zip,
            matchedOption.serviceName,
            matchedOption.serviceCode,
            authoritativeShippingCost,
            customer.firstName.trim(),
            customer.lastName.trim(),
            shippingAddress.street,
            shippingAddress.suite || null,
            shippingAddress.city,
            shippingAddress.state,
            shippingAddress.zip,
            matchedOption.rateQuoteReference || null,
            `UPS ${matchedOption.serviceName} Selected`,
            matchedOption.estimatedDelivery || "Calculated at Dispatch",
            calculatedSubtotal,
            volumeDiscount,
            authoritativeShippingCost,
            tax,
            finalTotal,
            finalOrderId,
          ]
        );
      }

      // 5. Record shipment details in order_shipments table
      const origin = UpsRatingService.validateOrigin();
      await UpsShippingService.recordSelectedShipping({
        orderId: finalOrderId,
        carrier: "UPS",
        serviceCode: matchedOption.serviceCode,
        serviceName: matchedOption.serviceName,
        shippingAmount: authoritativeShippingCost,
        currency: "USD",
        originAddress: origin,
        destinationAddress: {
          ...shippingAddress,
          recipientName: fullName,
          businessName,
          country: "United States",
        },
        packageWeight: packaging.totalWeight,
        packageWeightUnit: "LBS",
        packageLength: primaryPackage.length,
        packageWidth: primaryPackage.width,
        packageHeight: primaryPackage.height,
        packageDimensionUnit: "IN",
        rateQuoteReference: matchedOption.rateQuoteReference,
        estimatedDeliveryDate: matchedOption.estimatedDelivery,
      });

      // 6. Fetch full updated order
      const fullOrder = await OrderRepository.getOrderById(finalOrderId);
      const shipmentRecord = await UpsShippingService.getShipmentByOrderId(finalOrderId);

      res.status(200).json({
        success: true,
        message: "Shipping selection saved successfully. Order is ready for payment.",
        orderId: finalOrderId,
        order: fullOrder,
        shipment: shipmentRecord,
        selectedOption: matchedOption,
        totals: {
          subtotal: calculatedSubtotal,
          volumeDiscount,
          shipping: authoritativeShippingCost,
          tax,
          total: finalTotal,
        },
      });
    } catch (err: any) {
      console.error("[ShippingController.selectShipping Error]", err);
      res.status(500).json({
        success: false,
        message: err.message || "Failed to save shipping selection.",
      });
    }
  }

  /**
   * GET /api/v1/shipping/orders/:orderId
   * Return saved shipping details for an order
   */
  public static async getOrderShipping(req: Request, res: Response): Promise<void> {
    try {
      const { orderId } = req.params;
      const shipment = await UpsShippingService.getShipmentByOrderId(orderId);

      if (!shipment) {
        // Fallback to order fields
        const order = await OrderRepository.getOrderById(orderId);
        if (!order) {
          res.status(404).json({ success: false, message: "Order not found." });
          return;
        }

        res.status(200).json({
          success: true,
          shipping: {
            carrier: order.shippingCarrier || "UPS",
            service: order.shippingService || "UPS Ground",
            amount: order.pricing?.deliveryFee || 0,
            status: "RATE_SELECTED",
            trackingNumber: null,
          },
        });
        return;
      }

      res.status(200).json({
        success: true,
        shipment,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  /**
   * GET /api/v1/shipping/orders/:orderId/tracking
   * Return live or recorded tracking info. Never generates fake tracking data.
   */
  public static async getOrderTracking(req: Request, res: Response): Promise<void> {
    try {
      const { orderId } = req.params;
      const tracking = await UpsTrackingService.getOrderTracking(orderId);

      res.status(200).json({
        success: true,
        tracking,
      });
    } catch (err: any) {
      res.status(404).json({
        success: false,
        message: err.message || "Order tracking details not found.",
      });
    }
  }
}
