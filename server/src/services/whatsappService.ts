import { ENV } from "../config/env.js";

export class WhatsAppService {
  /**
   * Helper to format WhatsApp wa.me direct chat link
   */
  static buildChatLink(message: string): string {
    const phone = (ENV.WHATSAPP_PHONE_NUMBER || "16612059667").replace(/[^0-9]/g, "");
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }

  /**
   * Quick link for Order Inquiries & Tracking
   */
  static buildOrderChatLink(orderId: string, customerName?: string, total?: number): string {
    const text = `Hello The Takeout Box Dispatch! I would like to check the status of my Order #${orderId}${
      customerName ? ` (${customerName})` : ""
    }${total ? ` - Total: $${total.toFixed(2)}` : ""}.`;
    return this.buildChatLink(text);
  }

  /**
   * Quick link for Bulk / Wholesale Quotes
   */
  static buildWholesaleChatLink(businessName?: string, volume?: string): string {
    const text = `Hello The Takeout Box Wholesale Desk! I'm interested in bulk packaging pricing${
      businessName ? ` for ${businessName}` : ""
    }${volume ? ` (Est. Volume: ${volume})` : ""}. Could you please share catalog pricing?`;
    return this.buildChatLink(text);
  }

  /**
   * Quick link for General Depot Support
   */
  static buildGeneralSupportChatLink(): string {
    const text = `Hello The Takeout Box Depot! I have a question regarding commercial food packaging supplies.`;
    return this.buildChatLink(text);
  }

  /**
   * Automated Cloud API dispatch (Meta WhatsApp Cloud API)
   * Sends automated WhatsApp message if API token & Phone ID are configured in .env.
   * If not configured, safely logs in development simulation mode.
   */
  static async sendAutomatedOrderAlert(order: any): Promise<boolean> {
    try {
      const recipientPhone = order.customer?.phone?.replace(/[^0-9]/g, "");
      const orderId = order.id;
      const total = order.pricing?.total?.toFixed(2) || "0.00";

      if (!ENV.WHATSAPP_API_TOKEN || !ENV.WHATSAPP_PHONE_NUMBER_ID) {
        console.log(`\n======================================================`);
        console.log(`[WHATSAPP DISPATCH SIMULATION] - Order #${orderId}`);
        console.log(`Recipient Phone: ${recipientPhone || "N/A"}`);
        console.log(`Message: Your order #${orderId} for $${total} is confirmed at The Takeout Box depot.`);
        console.log(`Direct wa.me link: ${this.buildOrderChatLink(orderId, order.customer?.businessName, order.pricing?.total)}`);
        console.log(`======================================================\n`);
        return true;
      }

      if (!recipientPhone) {
        console.warn("[WhatsApp Service] No customer phone provided for order", orderId);
        return false;
      }

      // Meta Cloud API Call
      const endpoint = `https://graph.facebook.com/v19.0/${ENV.WHATSAPP_PHONE_NUMBER_ID}/messages`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ENV.WHATSAPP_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: recipientPhone.startsWith("1") ? recipientPhone : `1${recipientPhone}`,
          type: "text",
          text: {
            preview_url: false,
            body: `Hi ${order.customer?.contactName || "there"}, your order #${orderId} ($${total}) at The Takeout Box has been confirmed! Depot team is preparing your packaging. For questions, reply directly to this chat.`,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("[WhatsApp Service] Cloud API Error:", errorData);
        return false;
      }

      console.log(`[WhatsApp Service] ✔ Automated WhatsApp sent to ${recipientPhone} (Order #${orderId})`);
      return true;
    } catch (err: any) {
      console.error("[WhatsApp Service] Exception sending WhatsApp:", err.message);
      return false;
    }
  }
}
