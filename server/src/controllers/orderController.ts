import { Request, Response } from "express";
import { OrderRepository } from "../repositories/orderRepository.js";
import { UserRepository } from "../repositories/userRepository.js";
import { AddressRepository } from "../repositories/addressRepository.js";
import { ENV } from "../config/env.js";
import { EmailService } from "../services/emailService.js";
import { WhatsAppService } from "../services/whatsappService.js";

export class OrderController {
  /**
   * Place a new commercial order
   */
  static async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const {
        fulfillmentType,
        customer,
        deliveryAddress,
        taxExempt,
        resalePermitNumber,
        items,
        paymentMethod,
      } = req.body;

      // Identify user by auth token or matching customer email/phone
      let userId = req.user?.id;
      if (!userId && customer?.email) {
        const userByEmail = await UserRepository.findByEmail(customer.email);
        if (userByEmail) {
          userId = userByEmail.id;
        }
      }
      if (!userId && customer?.phone) {
        const userByPhone = await UserRepository.findByPhone(customer.phone);
        if (userByPhone) {
          userId = userByPhone.id;
        }
      }

      if (!items || !Array.isArray(items) || items.length === 0) {
        res.status(400).json({ success: false, message: "Order must contain at least one item." });
        return;
      }

      if (!customer || !customer.businessName || !customer.contactName || !customer.phone) {
        res.status(400).json({
          success: false,
          message: "Customer business name, contact person, and phone number are required.",
        });
        return;
      }

      if (fulfillmentType === "delivery" && (!deliveryAddress || !deliveryAddress.street || !deliveryAddress.zip)) {
        res.status(400).json({
          success: false,
          message: "Delivery street address and ZIP code are required for delivery orders.",
        });
        return;
      }

      if (paymentMethod === "zelle" && !(req.body.zelleReferenceId || req.body.referenceId)?.trim()) {
        res.status(400).json({
          success: false,
          message: "Please enter your Zelle reference / confirmation ID to place your order.",
        });
        return;
      }

      // Calculate server-side financials
      const subtotal = items.reduce(
        (sum: number, it: any) => sum + (it.unitPrice || 0) * (it.quantity || 1),
        0
      );

      // Volume discount: >= $300 => 10%, >= $150 => 5% (unless explicitly 0 in wholesale checkout)
      let volumeDiscount = 0;
      if (req.body.pricing?.volumeDiscount !== undefined) {
        volumeDiscount = Number(req.body.pricing.volumeDiscount);
      } else if (subtotal >= 300) {
        volumeDiscount = subtotal * 0.1;
      } else if (subtotal >= 150) {
        volumeDiscount = subtotal * 0.05;
      }

      const taxableAmount = Math.max(0, subtotal - volumeDiscount);
      const deliveryFee = req.body.shippingAmount !== undefined
        ? Number(req.body.shippingAmount)
        : (req.body.pricing?.deliveryFee !== undefined
            ? Number(req.body.pricing.deliveryFee)
            : (fulfillmentType === "pickup" || subtotal >= 200 ? 0 : 15));
      const tax = taxExempt ? 0 : (req.body.pricing?.tax !== undefined ? Number(req.body.pricing.tax) : taxableAmount * ENV.CALIFORNIA_SALES_TAX_RATE);
      const total = req.body.pricing?.total !== undefined ? Number(req.body.pricing.total) : Math.max(0, taxableAmount + deliveryFee + tax);

      const orderId = req.body.id || `TB-${Math.floor(10000 + Math.random() * 90000)}`;

      const isZelle = paymentMethod === "zelle";
      const status = isZelle ? "pending" : (paymentMethod === "net30" ? "net30_pending" : paymentMethod === "cod" ? "cod_pending" : "received");
      const statusText = isZelle
        ? "Zelle Payment Pending Verification"
        : (fulfillmentType === "pickup"
            ? "Ready for Bakersfield Depot Pickup in 2 Hours"
            : "Scheduled for Bakersfield Local Dispatch Tomorrow");

      const estimatedDelivery =
        req.body.estimatedDelivery ||
        (fulfillmentType === "pickup"
          ? "Today by 4:00 PM at 5880 District Blvd"
          : "Tomorrow, 9:00 AM – 11:30 AM");

      const paymentStatus = isZelle ? "pending" : (paymentMethod === "net30" ? "net30_pending" : paymentMethod === "cod" ? "cod_pending" : "paid");

      const createdOrder = await OrderRepository.createOrder({
        id: orderId,
        userId,
        status,
        statusText,
        estimatedDelivery,
        fulfillmentType: fulfillmentType || "delivery",
        customer: {
          businessName: customer.businessName,
          contactName: customer.contactName,
          phone: customer.phone,
          email: customer.email || "",
        },
        deliveryAddress: fulfillmentType === "delivery" ? deliveryAddress : undefined,
        taxExempt: Boolean(taxExempt),
        resalePermitNumber: taxExempt ? resalePermitNumber : undefined,
        items: items.map((it: any) => ({
          productId: it.productId,
          productName: it.productName,
          image: it.image,
          sizeName: it.sizeName,
          caseCount: it.caseCount,
          quantity: it.quantity,
          unitPrice: it.unitPrice,
          lineTotal: it.unitPrice * it.quantity,
        })),
        pricing: {
          subtotal: Math.round(subtotal * 100) / 100,
          volumeDiscount: Math.round(volumeDiscount * 100) / 100,
          deliveryFee: Math.round(deliveryFee * 100) / 100,
          tax: Math.round(tax * 100) / 100,
          total: Math.round(total * 100) / 100,
        },
        paymentMethod: paymentMethod || "zelle",
        paymentStatus,
        shippingCarrier: req.body.shippingCarrier || "UPS",
        shippingService: req.body.shippingService || req.body.selectedOption?.serviceName,
        shippingServiceCode: req.body.shippingServiceCode || req.body.selectedOption?.serviceCode,
        shippingAmount: deliveryFee,
        rateQuoteReference: req.body.rateQuoteReference || req.body.selectedOption?.rateQuoteReference,
        zellePhone: req.body.zellePhone || "(661) 805-9358",
        zelleReferenceId: req.body.zelleReferenceId || req.body.referenceId,
        zelleSenderName: req.body.zelleSenderName || req.body.senderName,
      });

      // Auto-save delivery address to customer profile if user is identified
      if (userId && fulfillmentType === "delivery" && deliveryAddress?.street) {
        try {
          const userAddresses = await AddressRepository.findByUserId(userId);
          const alreadyExists = userAddresses.some(
            (a) =>
              a.street.toLowerCase().trim() === deliveryAddress.street.toLowerCase().trim() &&
              a.zip.trim() === (deliveryAddress.zip || "").trim()
          );

          if (!alreadyExists) {
            const newAddrId = `addr-${Date.now().toString(36)}`;
            await AddressRepository.create({
              id: newAddrId,
              userId,
              nickname: customer.businessName || "Primary Delivery Location",
              recipientName: customer.contactName || "Receiving Dock",
              phone: customer.phone,
              street: deliveryAddress.street,
              suite: deliveryAddress.suite || undefined,
              city: deliveryAddress.city || "Bakersfield",
              state: deliveryAddress.state || "CA",
              zip: deliveryAddress.zip,
              notes: deliveryAddress.notes || undefined,
              isDefault: userAddresses.length === 0,
            });
          }
        } catch (addrErr) {
          console.warn("[OrderController] Failed to auto-save address:", addrErr);
        }
      }

      // Asynchronously trigger customer & depot confirmation email (non-blocking)
      EmailService.sendOrderConfirmation(createdOrder).catch((err) => {
        console.error("[Order Controller] Non-fatal email notification error:", err?.message);
      });

      // Asynchronously trigger automated WhatsApp order alert if configured
      WhatsAppService.sendAutomatedOrderAlert(createdOrder).catch((err) => {
        console.error("[Order Controller] Non-fatal WhatsApp notification error:", err?.message);
      });

      res.status(201).json({
        success: true,
        message: "Commercial order created successfully.",
        order: createdOrder,
      });
    } catch (err: any) {
      console.error("[Order Error]", err);
      res.status(500).json({ success: false, message: err.message });
    }
  }

  /**
   * Get user order history with pagination
   */
  static async getOrders(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 2; // Default 2 orders/page per UX requirement

      const result = await OrderRepository.getOrdersByUser(userId, page, limit);

      res.status(200).json({
        success: true,
        orders: result.orders,
        pagination: {
          total: result.total,
          page: result.page,
          totalPages: result.totalPages,
          limit,
        },
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  /**
   * Get all orders with pagination and status filter (Admin)
   */
  static async getAllOrders(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 20;
      const status = req.query.status as string | undefined;

      const result = await OrderRepository.getAllOrders(page, limit, status);

      res.status(200).json({
        success: true,
        orders: result.orders,
        pagination: {
          total: result.total,
          page: result.page,
          totalPages: result.totalPages,
          limit,
        },
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  /**
   * Get single order by ID
   */
  static async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      const { orderId } = req.params;
      const order = await OrderRepository.getOrderById(orderId);

      if (!order) {
        res.status(404).json({ success: false, message: "Order not found." });
        return;
      }

      res.status(200).json({ success: true, order });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  /**
   * Generate / retrieve formatted invoice payload
   */
  static async getInvoice(req: Request, res: Response): Promise<void> {
    try {
      const { orderId } = req.params;
      const order = await OrderRepository.getOrderById(orderId);

      if (!order) {
        res.status(404).json({ success: false, message: "Order not found." });
        return;
      }

      const invoiceData = {
        invoiceNumber: `INV-${order.id.replace("TB-", "")}`,
        orderId: order.id,
        invoiceDate: new Date(order.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        depot: {
          name: "The Takeout Box Restaurant Supply",
          address: "5880 District Blvd. Suite 17, Bakersfield, CA 93313",
          phones: ["+1 661-205-9667", "+1 661-805-9358"],
          tagline: "Pack Smarter. Serve Better.",
          website: "https://thetakeoutbox.com",
        },
        billTo: {
          businessName: order.customer.businessName,
          contactName: order.customer.contactName,
          phone: order.customer.phone,
          email: order.customer.email,
        },
        fulfillment: {
          type: order.fulfillmentType,
          address: order.deliveryAddress,
          status: order.status,
          statusText: order.statusText,
        },
        taxExempt: order.taxExempt,
        resalePermitNumber: order.resalePermitNumber,
        items: order.items,
        pricing: order.pricing,
        payment: {
          method: order.paymentMethod,
          status: order.paymentStatus,
        },
        designerAttribution: {
          text: "Designed by Risings Technologies",
          url: "https://risingstech.com/",
        },
      };

      res.status(200).json({ success: true, invoice: invoiceData });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}
