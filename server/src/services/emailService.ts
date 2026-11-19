import nodemailer, { type Transporter } from "nodemailer";
import { ENV } from "../config/env.js";

export class EmailService {
  private static transporter: Transporter | null = null;

  /**
   * Initialize or retrieve Nodemailer Transporter
   */
  private static getTransporter(): Transporter | null {
    if (this.transporter) return this.transporter;

    if (!ENV.SMTP_USER || !ENV.SMTP_PASS) {
      console.log("[Email Service] SMTP credentials not set in server/.env. Running in preview/log mode.");
      return null;
    }

    try {
      const isGmail =
        (ENV.SMTP_HOST && ENV.SMTP_HOST.toLowerCase().includes("gmail")) ||
        (ENV.SMTP_USER && ENV.SMTP_USER.toLowerCase().includes("gmail"));

      const cleanPass = (ENV.SMTP_PASS || "").replace(/\s+/g, "");

      if (isGmail) {
        this.transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: ENV.SMTP_USER,
            pass: cleanPass,
          },
        });
      } else {
        this.transporter = nodemailer.createTransport({
          host: ENV.SMTP_HOST || "smtp.gmail.com",
          port: ENV.SMTP_PORT || 587,
          secure: ENV.SMTP_SECURE,
          auth: {
            user: ENV.SMTP_USER,
            pass: cleanPass,
          },
        });
      }
      return this.transporter;
    } catch (err: any) {
      console.error("[Email Service] Failed to initialize SMTP transporter:", err.message);
      return null;
    }
  }

  /**
   * Verify SMTP connection status on server startup
   */
  static async verifyConnection(): Promise<boolean> {
    const transporter = this.getTransporter();
    if (!transporter) {
      console.log("[Email Service] No live SMTP credentials configured. Emails will be logged in console simulation mode.");
      return false;
    }

    try {
      await transporter.verify();
      console.log(`[Email Service] ✔ SMTP Connected & Verified successfully via ${ENV.SMTP_USER}`);
      return true;
    } catch (err: any) {
      console.error("[Email Service] ❌ SMTP Verification failed:", err.message);
      return false;
    }
  }

  /**
   * 1. Send Order Confirmation to Customer & Depot Warehouse
   */
  static async sendOrderConfirmation(order: any): Promise<boolean> {
    try {
      const customerEmail = order.customer?.email;
      if (!customerEmail) {
        console.warn("[Email Service] No customer email provided for order", order.id);
        return false;
      }

      const htmlBody = this.buildOrderEmailHtml(order);

      const transporter = this.getTransporter();
      if (!transporter) {
        console.log(`\n======================================================`);
        console.log(`[EMAIL DISPATCH SIMULATION] - Order Confirmation`);
        console.log(`To: ${customerEmail}`);
        console.log(`Bcc: ${ENV.ADMIN_NOTIFICATION_EMAIL}`);
        console.log(`Subject: Order Confirmed #${order.id} - The Takeout Box Depot`);
        console.log(`Order Total: $${order.pricing?.total?.toFixed(2) || "0.00"}`);
        console.log(`======================================================\n`);
        return true;
      }

      // Send to customer with BCC to warehouse dispatch
      const bccTarget =
        ENV.ADMIN_NOTIFICATION_EMAIL && ENV.ADMIN_NOTIFICATION_EMAIL !== customerEmail
          ? ENV.ADMIN_NOTIFICATION_EMAIL
          : undefined;

      await transporter.sendMail({
        from: ENV.EMAIL_FROM || ENV.SMTP_USER,
        to: customerEmail,
        bcc: bccTarget,
        subject: `Order Confirmation #${order.id} - The Takeout Box Restaurant Supply`,
        html: htmlBody,
      });

      console.log(`[Email Service] ✔ Order confirmation sent to ${customerEmail} (Order #${order.id})`);
      return true;
    } catch (err: any) {
      console.error("[Email Service] Failed to send order email:", err.message);
      return false;
    }
  }

  /**
   * 2. Send Wholesale / Bulk Quote Inquiry Email to Customer & Sales Desk
   */
  static async sendWholesaleInquiryNotification(inquiry: any): Promise<boolean> {
    try {
      const customerEmail = inquiry.email;
      const htmlBody = this.buildWholesaleEmailHtml(inquiry);

      const transporter = this.getTransporter();
      if (!transporter) {
        console.log(`\n======================================================`);
        console.log(`[EMAIL DISPATCH SIMULATION] - Wholesale Quote Inquiry`);
        console.log(`To: ${customerEmail}`);
        console.log(`Bcc: ${ENV.ADMIN_NOTIFICATION_EMAIL}`);
        console.log(`Business: ${inquiry.businessName || inquiry.business_name}`);
        console.log(`Monthly Volume: ${inquiry.monthlyVolume || inquiry.monthly_volume || "N/A"}`);
        console.log(`======================================================\n`);
        return true;
      }

      const bccTarget =
        ENV.ADMIN_NOTIFICATION_EMAIL && ENV.ADMIN_NOTIFICATION_EMAIL !== customerEmail
          ? ENV.ADMIN_NOTIFICATION_EMAIL
          : undefined;

      await transporter.sendMail({
        from: ENV.EMAIL_FROM || ENV.SMTP_USER,
        to: customerEmail,
        bcc: bccTarget,
        subject: `Wholesale Packaging Quote Request Received - The Takeout Box`,
        html: htmlBody,
      });

      console.log(`[Email Service] ✔ Wholesale inquiry email sent to ${customerEmail}`);
      return true;
    } catch (err: any) {
      console.error("[Email Service] Failed to send wholesale inquiry email:", err.message);
      return false;
    }
  }


  /**
   * HTML Template: Order Confirmation
   */
  private static buildOrderEmailHtml(order: any): string {
    const isPickup = order.fulfillmentType === "pickup";
    const address = order.deliveryAddress
      ? `${order.deliveryAddress.street || ""}${order.deliveryAddress.suite ? `, ${order.deliveryAddress.suite}` : ""}, ${order.deliveryAddress.city || ""}, ${order.deliveryAddress.state || ""} ${order.deliveryAddress.zip || ""}`
      : "5880 District Blvd. Suite 17, Bakersfield, CA 93313";

    const itemsHtml = (order.items || [])
      .map(
        (it: any) => `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #E2E8F0; font-size: 14px; color: #1E293B;">
            <strong>${it.productName || it.name || "Commercial Packaging Item"}</strong><br />
            <span style="font-size: 12px; color: #64748B;">Size: ${it.sizeName || "Standard"} (${it.caseCount || 100} pcs/case)</span>
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #E2E8F0; font-size: 14px; text-align: center; color: #1E293B;">
            ${it.quantity}
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #E2E8F0; font-size: 14px; text-align: right; color: #1E293B;">
            $${Number(it.unitPrice || 0).toFixed(2)}
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #E2E8F0; font-size: 14px; text-align: right; font-weight: 700; color: #0F172A;">
            $${Number(it.lineTotal || (it.unitPrice || 0) * (it.quantity || 1)).toFixed(2)}
          </td>
        </tr>
      `
      )
      .join("");

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation #${order.id}</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; padding: 24px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); border: 1px solid #E2E8F0;">
                
                <!-- Brand Header -->
                <tr>
                  <td style="background-color: #E51A1A; padding: 28px 32px; text-align: left;">
                    <h1 style="margin: 0; color: #FFFFFF; font-size: 24px; font-weight: 900; letter-spacing: -0.5px;">
                      THE TAKEOUT BOX
                    </h1>
                    <p style="margin: 4px 0 0 0; color: #FEE2E2; font-size: 13px; font-weight: 500;">
                      Commercial Restaurant Packaging & Supply Depot • Bakersfield, CA
                    </p>
                  </td>
                </tr>

                <!-- Status Banner -->
                <tr>
                  <td style="padding: 24px 32px; border-bottom: 1px solid #F1F5F9;">
                    <div style="background-color: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 8px; padding: 14px 18px;">
                      <p style="margin: 0; color: #166534; font-size: 14px; font-weight: 700;">
                        ✔ Order #${order.id} Confirmed &amp; In Queue
                      </p>
                      <p style="margin: 4px 0 0 0; color: #15803D; font-size: 13px;">
                        ${order.statusText || (isPickup ? "Ready for Depot Pickup" : "Scheduled for Bakersfield Local Dispatch")}
                      </p>
                    </div>
                  </td>
                </tr>

                <!-- Order Meta Grid -->
                <tr>
                  <td style="padding: 0 32px 20px 32px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="50%" valign="top" style="padding-right: 12px;">
                          <h3 style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; color: #64748B; letter-spacing: 0.5px;">Recipient Details</h3>
                          <p style="margin: 0; font-size: 14px; color: #0F172A; font-weight: 700;">${order.customer?.businessName || "Valued Customer"}</p>
                          <p style="margin: 2px 0 0 0; font-size: 13px; color: #475569;">Attn: ${order.customer?.contactName || "Kitchen Manager"}</p>
                          <p style="margin: 2px 0 0 0; font-size: 13px; color: #475569;">Phone: ${order.customer?.phone || "N/A"}</p>
                          <p style="margin: 2px 0 0 0; font-size: 13px; color: #475569;">Email: ${order.customer?.email || ""}</p>
                        </td>
                        <td width="50%" valign="top" style="padding-left: 12px;">
                          <h3 style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; color: #64748B; letter-spacing: 0.5px;">${isPickup ? "Pickup Depot" : "Delivery Address"}</h3>
                          <p style="margin: 0; font-size: 13px; color: #1E293B; line-height: 1.4;">${address}</p>
                          <p style="margin: 6px 0 0 0; font-size: 13px; color: #E51A1A; font-weight: 600;">
                            Estimated: ${order.estimatedDelivery || "Next Business Day"}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Items Ordered Table -->
                <tr>
                  <td style="padding: 0 32px 24px 32px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden;">
                      <thead>
                        <tr style="background-color: #F8FAFC;">
                          <th align="left" style="padding: 10px 12px; font-size: 12px; font-weight: 700; color: #475569; border-bottom: 1px solid #E2E8F0;">Packaging Item</th>
                          <th align="center" style="padding: 10px 12px; font-size: 12px; font-weight: 700; color: #475569; border-bottom: 1px solid #E2E8F0;">Cases</th>
                          <th align="right" style="padding: 10px 12px; font-size: 12px; font-weight: 700; color: #475569; border-bottom: 1px solid #E2E8F0;">Price/Cs</th>
                          <th align="right" style="padding: 10px 12px; font-size: 12px; font-weight: 700; color: #475569; border-bottom: 1px solid #E2E8F0;">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${itemsHtml}
                      </tbody>
                    </table>
                  </td>
                </tr>

                <!-- Financial Summary -->
                <tr>
                  <td style="padding: 0 32px 28px 32px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="60%"></td>
                        <td width="40%">
                          <table width="100%" cellpadding="4" cellspacing="0">
                            <tr>
                              <td style="font-size: 13px; color: #64748B;">Items Subtotal:</td>
                              <td style="font-size: 13px; color: #0F172A; text-align: right; font-weight: 600;">$${Number(order.pricing?.subtotal || 0).toFixed(2)}</td>
                            </tr>
                            ${
                              order.pricing?.volumeDiscount > 0
                                ? `<tr>
                                    <td style="font-size: 13px; color: #16A34A;">Wholesale Discount:</td>
                                    <td style="font-size: 13px; color: #16A34A; text-align: right; font-weight: 600;">-$${Number(order.pricing.volumeDiscount).toFixed(2)}</td>
                                   </tr>`
                                : ""
                            }
                            <tr>
                              <td style="font-size: 13px; color: #64748B;">Delivery Fee:</td>
                              <td style="font-size: 13px; color: #0F172A; text-align: right; font-weight: 600;">${Number(order.pricing?.deliveryFee || 0) === 0 ? "FREE" : `$${Number(order.pricing?.deliveryFee).toFixed(2)}`}</td>
                            </tr>
                            <tr>
                              <td style="font-size: 13px; color: #64748B;">Tax:</td>
                              <td style="font-size: 13px; color: #0F172A; text-align: right; font-weight: 600;">$${Number(order.pricing?.tax || 0).toFixed(2)}</td>
                            </tr>
                            <tr>
                              <td style="font-size: 15px; color: #0F172A; font-weight: 800; border-top: 2px solid #E2E8F0; padding-top: 8px;">Total Due:</td>
                              <td style="font-size: 16px; color: #E51A1A; text-align: right; font-weight: 900; border-top: 2px solid #E2E8F0; padding-top: 8px;">$${Number(order.pricing?.total || 0).toFixed(2)}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Depot Contact & Footer -->
                <tr>
                  <td style="background-color: #F1F5F9; padding: 24px 32px; border-top: 1px solid #E2E8F0; text-align: center;">
                    <p style="margin: 0; font-size: 13px; color: #475569; font-weight: 700;">The Takeout Box Depot &amp; Warehouse Dispatch</p>
                    <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748B;">5880 District Blvd. Suite 17, Bakersfield, CA 93313 • Phone: +1 (661) 205-9667</p>
                    <p style="margin: 8px 0 0 0; font-size: 11px; color: #94A3B8;">Need to update your delivery window? Reply directly to this email or chat with us on WhatsApp at +1 (661) 205-9667.</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  }

  /**
   * HTML Template: Wholesale / Bulk Quote Inquiry
   */
  private static buildWholesaleEmailHtml(inquiry: any): string {
    const businessName = inquiry.businessName || inquiry.business_name || "Food Service Operator";
    const contactName = inquiry.contactName || inquiry.contact_name || "Valued Partner";
    const phone = inquiry.phone || "N/A";
    const email = inquiry.email || "";
    const businessType = inquiry.businessType || inquiry.business_type || "Restaurant";
    const monthlyVolume = inquiry.monthlyVolume || inquiry.monthly_volume || "Not specified";
    const notes = inquiry.notes || "None provided";

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Wholesale Quote Request Received</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; padding: 24px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); border: 1px solid #E2E8F0;">
                
                <!-- Brand Header -->
                <tr>
                  <td style="background-color: #E51A1A; padding: 28px 32px; text-align: left;">
                    <h1 style="margin: 0; color: #FFFFFF; font-size: 22px; font-weight: 900;">
                      THE TAKEOUT BOX WHOLESALE DESK
                    </h1>
                    <p style="margin: 4px 0 0 0; color: #FEE2E2; font-size: 13px;">
                      High-Volume Commercial Restaurant Packaging Pricing Request
                    </p>
                  </td>
                </tr>

                <!-- Content Body -->
                <tr>
                  <td style="padding: 28px 32px;">
                    <h2 style="margin: 0 0 12px 0; font-size: 18px; color: #0F172A;">
                      Thank you for contacting us, ${contactName}!
                    </h2>
                    <p style="margin: 0 0 18px 0; font-size: 14px; color: #475569; line-height: 1.6;">
                      We have received your volume quote request for <strong>${businessName}</strong>. Our Bakersfield commercial packaging team is reviewing your estimated monthly volume to apply our top wholesale pallet tier discounts.
                    </p>

                    <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 18px; margin-bottom: 20px;">
                      <h3 style="margin: 0 0 12px 0; font-size: 13px; text-transform: uppercase; color: #64748B; letter-spacing: 0.5px;">Summary of Your Inquiry</h3>
                      <table width="100%" cellpadding="4" cellspacing="0" style="font-size: 13px; color: #334155;">
                        <tr>
                          <td width="35%" style="font-weight: 600; color: #64748B;">Business Name:</td>
                          <td>${businessName}</td>
                        </tr>
                        <tr>
                          <td style="font-weight: 600; color: #64748B;">Business Category:</td>
                          <td>${businessType}</td>
                        </tr>
                        <tr>
                          <td style="font-weight: 600; color: #64748B;">Estimated Monthly Volume:</td>
                          <td><strong>${monthlyVolume} Cases</strong></td>
                        </tr>
                        <tr>
                          <td style="font-weight: 600; color: #64748B;">Direct Phone:</td>
                          <td>${phone}</td>
                        </tr>
                        <tr>
                          <td style="font-weight: 600; color: #64748B;">Special Requirements:</td>
                          <td>${notes}</td>
                        </tr>
                      </table>
                    </div>

                    <p style="margin: 0 0 8px 0; font-size: 13px; color: #475569; line-height: 1.5;">
                      A commercial representative will contact you shortly via phone or email with wholesale pricing and depot pickup/delivery terms.
                    </p>
                  </td>
                </tr>

                <!-- Depot Contact & Footer -->
                <tr>
                  <td style="background-color: #F1F5F9; padding: 20px 32px; border-top: 1px solid #E2E8F0; text-align: center;">
                    <p style="margin: 0; font-size: 12px; color: #64748B;">5880 District Blvd. Suite 17, Bakersfield, CA 93313 • Phone: +1 (661) 205-9667</p>
                    <p style="margin: 6px 0 0 0; font-size: 11px; color: #94A3B8;">Immediate assistance required? Chat directly with us on WhatsApp at +1 (661) 205-9667.</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  }
}
