"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Download, Printer, CheckCircle2, ShieldCheck, FileText } from "lucide-react";
import styles from "./InvoiceDocument.module.css";
import { CommercialOrder } from "../data/customerStore";

interface InvoiceDocumentProps {
  order: CommercialOrder;
  showActions?: boolean;
}

export const InvoiceDocument: React.FC<InvoiceDocumentProps> = ({
  order,
  showActions = true,
}) => {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    if (!invoiceRef.current) return;
    setIsGeneratingPdf(true);

    try {
      // Dynamic imports for browser-only execution
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const element = invoiceRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#FFFFFF",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`TakeoutBox_Invoice_${order.id}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
      // Fallback to native print dialog
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const formattedDate = new Date(order.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={styles.invoiceWrapper}>
      {/* Top Floating Action Bar */}
      {showActions && (
        <div className={styles.actionsBar}>
          <div className={styles.actionsLeft}>
            <FileText size={16} color="#E51A1A" />
            <span>Commercial Tax Invoice • #{order.id}</span>
          </div>
          <div className={styles.actionsRight}>
            <button
              type="button"
              className={styles.printBtn}
              onClick={handlePrint}
              title="Print via browser"
            >
              <Printer size={15} />
              <span>Print</span>
            </button>
            <button
              type="button"
              className={styles.downloadPdfBtn}
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              title="Download real PDF file"
            >
              <Download size={15} />
              <span>{isGeneratingPdf ? "Generating PDF..." : "Download PDF"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Printable Sheet Container */}
      <div className={styles.printableContent} ref={invoiceRef} id="invoice-printable-container">
        {/* Invoice Header */}
        <div className={styles.invoiceHeader}>
          <div className={styles.brandArea}>
            <Image
              src="/images/takeout-logo.png"
              alt="The Takeout Box"
              width={180}
              height={58}
              className={styles.invoiceLogo}
              priority
            />
            <div className={styles.depotMeta}>
              <strong>The Takeout Box Restaurant Supply LLC</strong><br />
              5880 District Blvd. Suite 17, Bakersfield, CA 93313<br />
              Tel: +1 (661) 205-9667 / 661-805-9358 • www.thetakeoutbox.com<br />
              California Seller’s Permit: #SR-KHL-90184201
            </div>
          </div>

          <div className={styles.invoiceMetaArea}>
            <h2 className={styles.invoiceHeading}>INVOICE</h2>
            <div className={styles.invoiceIdBadge}>#{order.id}</div>
            <div className={styles.invoiceDateRow}>Invoice Date: {formattedDate}</div>
            <div className={styles.invoiceDateRow}>
              Payment Method: {order.paymentMethod === "card" ? "Credit Card" : order.paymentMethod === "net30" ? "Net-30 Terms" : "Cash/Check on Delivery"}
            </div>

            {order.paymentStatus === "paid" ? (
              <span className={styles.statusStampPaid}>PAID IN FULL</span>
            ) : order.paymentStatus === "net30_pending" ? (
              <span className={styles.statusStampPending}>NET-30 INVOICED</span>
            ) : (
              <span className={styles.statusStampPending}>DUE UPON DELIVERY</span>
            )}
          </div>
        </div>

        {/* Bill To & Ship To Details */}
        <div className={styles.partiesGrid}>
          <div>
            <div className={styles.partyColTitle}>Billed To</div>
            <div className={styles.partyBusinessName}>{order.customer.businessName}</div>
            <div className={styles.partyDetails}>
              Attn: {order.customer.contactName}<br />
              Phone: {order.customer.phone}<br />
              Email: {order.customer.email}
            </div>
            {order.taxExempt && (
              <div className={styles.resaleTag}>
                CA Resale Exempt: {order.resalePermitNumber || "Verified"}
              </div>
            )}
          </div>

          <div>
            <div className={styles.partyColTitle}>
              {order.fulfillmentType === "pickup" ? "Depot Pickup Hub" : "Ship / Deliver To"}
            </div>
            {order.fulfillmentType === "pickup" ? (
              <div className={styles.partyDetails}>
                <strong>Bakersfield Depot Hub</strong><br />
                5880 District Blvd. Suite 17<br />
                Bakersfield, CA 93313<br />
                <em>(Free Customer Pickup • Ready in 2 Hours)</em>
              </div>
            ) : (
              <div className={styles.partyDetails}>
                <strong>{order.customer.businessName}</strong><br />
                {order.deliveryAddress?.street} {order.deliveryAddress?.suite}<br />
                {order.deliveryAddress?.city}, {order.deliveryAddress?.state} {order.deliveryAddress?.zip}<br />
                {order.shippingDetails && (
                  <div style={{ marginTop: 4, color: "#351C15", fontWeight: 700 }}>
                    Shipping: {order.shippingDetails.carrier} {order.shippingDetails.serviceName}
                  </div>
                )}
                {order.deliveryAddress?.notes && (
                  <em>Delivery Note: {order.deliveryAddress.notes}</em>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Itemized Table with Product Images & Specs */}
        <table className={styles.itemsTable}>
          <thead>
            <tr>
              <th style={{ width: "45%" }}>Packaging Item Description</th>
              <th className={styles.colCenter} style={{ width: "15%" }}>Case Pack</th>
              <th className={styles.colCenter} style={{ width: "12%" }}>Qty (Cases)</th>
              <th className={styles.colRight} style={{ width: "13%" }}>Case Price</th>
              <th className={styles.colRight} style={{ width: "15%" }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <div className={styles.itemCellFlex}>
                    {/* Product Image Thumbnail */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.productName}
                      className={styles.productThumb}
                    />
                    <div className={styles.productDetails}>
                      <span className={styles.productTitle}>{item.productName}</span>
                      <span className={styles.productSizeBadge}>
                        Tier / Size: {item.sizeName} ({item.caseCount} pcs/case)
                      </span>
                    </div>
                  </div>
                </td>
                <td className={styles.colCenter}>{item.caseCount} pcs</td>
                <td className={styles.colCenter}><strong>{item.quantity}</strong></td>
                <td className={styles.colRight}>${item.unitPrice.toFixed(2)}</td>
                <td className={styles.colRight}>
                  <strong>${item.lineTotal.toFixed(2)}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals Summary */}
        <div className={styles.totalsSection}>
          <div className={styles.totalsTable}>
            <div className={styles.totalsRow}>
              <span>Items Subtotal:</span>
              <span>${order.pricing.subtotal.toFixed(2)}</span>
            </div>

            {order.pricing.volumeDiscount > 0 && (
              <div className={styles.totalsRow}>
                <span>Wholesale Tier Discount:</span>
                <span className={styles.discountVal}>
                  -${order.pricing.volumeDiscount.toFixed(2)}
                </span>
              </div>
            )}

            <div className={styles.totalsRow}>
              <span>
                {order.shippingDetails
                  ? `${order.shippingDetails.carrier} ${order.shippingDetails.serviceName}:`
                  : "Bakersfield Local Dispatch:"}
              </span>
              <span>
                {order.pricing.deliveryFee === 0 ? "FREE ($200+ Tier)" : `$${order.pricing.deliveryFee.toFixed(2)}`}
              </span>
            </div>

            <div className={styles.totalsRow}>
              <span>California Sales Tax:</span>
              <span>
                {order.taxExempt ? "$0.00 (CA Resale Exempt)" : `$${order.pricing.tax.toFixed(2)}`}
              </span>
            </div>

            <div className={styles.grandTotalRow}>
              <span>Total Invoice Amount:</span>
              <span className={styles.grandTotalVal}>
                ${order.pricing.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Terms & Commercial Packaging Policy */}
        <div className={styles.invoiceFooterTerms}>
          <p>
            <strong>Commercial Packaging Compliance:</strong> All food-contact containers, bagasse plates, cups, and cutlery are 100% FDA food-safe certified, BPA-free, and compliant with California health standards.
          </p>
          <p>
            Returns accepted on unopened, factory-sealed cases within 14 days of dispatch at our Bakersfield depot hub. Net-30 balances payable via check or ACH to The Takeout Box LLC. Thank you for your business!
          </p>
        </div>

        {/* User Requirement 3: In invoice at bottom show designed by risings technologies and when clicked navigate to website */}
        <div className={styles.invoiceBrandingFooter}>
          <span>Official System Document</span>
          <span className={styles.brandingDot}>•</span>
          <span>
            Designed by{" "}
            <a
              href="https://risings.digital/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.invoiceAgencyLink}
            >
              Risings Digital
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};
