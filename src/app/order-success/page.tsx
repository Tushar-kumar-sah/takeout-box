"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  PackageCheck,
  Truck,
  Star,
  ShoppingBag,
  Clock,
  Download,
  Eye,
  FileText,
  X,
  Copy,
  Check,
} from "lucide-react";
import styles from "./OrderSuccessPage.module.css";
import {
  getOrderById,
  CommercialOrder,
  getStoredOrders,
} from "../../data/customerStore";
import { InvoiceDocument } from "../../components/InvoiceDocument";
import { OrderRatingModal } from "../../components/OrderRatingModal";

const DEFAULT_ORDER: CommercialOrder = {
  id: "TB-84920",
  date: new Date().toISOString(),
  status: "received",
  statusText: "Scheduled for Bakersfield Local Van Dispatch",
  estimatedDelivery: "Tomorrow between 9:00 AM - 1:00 PM",
  fulfillmentType: "delivery",
  customer: {
    businessName: "Your Business",
    contactName: "Valued Customer",
    phone: "(661) 555-0192",
    email: "orders@restaurant.com",
  },
  deliveryAddress: {
    street: "5880 District Blvd",
    suite: "Suite 17",
    city: "Bakersfield",
    state: "CA",
    zip: "93313",
  },
  items: [
    {
      productId: "pp-container-rect",
      productName: "Heavy-Duty Rectangular PP Food Containers with Lids",
      image: "/images/rectangular_takeout_box.jpg",
      sizeName: "28 oz (Single Comp)",
      caseCount: 150,
      quantity: 1,
      unitPrice: 38.5,
      lineTotal: 38.5,
    },
  ],
  pricing: {
    subtotal: 38.5,
    volumeDiscount: 0,
    deliveryFee: 0,
    tax: 3.18,
    total: 41.68,
  },
  taxExempt: false,
  paymentMethod: "card",
  paymentStatus: "paid",
};

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "latest";

  const [order, setOrder] = useState<CommercialOrder>(() => {
    return {
      ...DEFAULT_ORDER,
      id: orderId !== "latest" ? orderId : "TB-84920",
      date: new Date().toISOString(),
    };
  });
  // User Requirement: "here after order success dont show rating and review screen immediately show after 5 seconds"
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const handleDownloadPdf = async () => {
    if (!order) return;
    setIsDownloadingPdf(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const element =
        document.getElementById("invoice-printable-container") ||
        document.getElementById("hidden-invoice-printable");
      if (!element) return;

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
      pdf.save(`TakeoutBox_Commercial_Invoice_${order.id}.pdf`);
    } catch (err) {
      console.error("PDF download failed:", err);
      window.print();
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  useEffect(() => {
    // 1. Fetch order data
    let found = getOrderById(orderId);
    if (!found) {
      const allOrders = getStoredOrders();
      if (allOrders.length > 0) {
        found = allOrders.find((o) => o.id === orderId) || allOrders[0];
      }
    }

    if (found) {
      setOrder(found);
    } else {
      setOrder({
        ...DEFAULT_ORDER,
        id: orderId !== "latest" ? orderId : "TB-84920",
        date: new Date().toISOString(),
      });
    }

    // 2. Trigger top-end celebrating confetti cannons
    const triggerCelebration = async () => {
      try {
        const confetti = (await import("canvas-confetti")).default;

        confetti({
          particleCount: 80,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: 0.7 },
          colors: ["#E51A1A", "#F59E0B", "#10B981", "#3B82F6"],
        });

        confetti({
          particleCount: 80,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: 0.7 },
          colors: ["#E51A1A", "#F59E0B", "#10B981", "#3B82F6"],
        });

        setTimeout(() => {
          confetti({
            particleCount: 60,
            spread: 100,
            origin: { y: 0.4 },
            colors: ["#FFD700", "#FF4500", "#32CD32"],
          });
        }, 400);
      } catch (err) {
        console.error("Confetti effect failed:", err);
      }
    };

    triggerCelebration();

    // User Requirement: "here after order success dont show rating and review screen immediately show after 5 seconds"
    const ratingTimer = setTimeout(() => {
      setShowRatingModal(true);
    }, 5000);

    return () => clearTimeout(ratingTimer);
  }, [orderId]);

  if (!order) return null;

  return (
    <div className={styles.successPage}>
      {/* Rating & Review Popup Modal (Shown automatically per user requirement) */}
      <OrderRatingModal
        orderId={order.id}
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
      />

      {/* Header */}
      <header className={styles.successHeader}>
        <div className={`container ${styles.headerInner}`}>
          <Link href="/" aria-label="The Takeout Box">
            <Image
              src="/images/takeout-logo.png"
              alt="The Takeout Box"
              width={160}
              height={50}
              className={styles.logoImg}
              priority
            />
          </Link>

          <div className={styles.headerLinks}>
            <Link href="/account?tab=orders" className={styles.headerLink}>
              My Orders
            </Link>
            <Link href="/" className={styles.headerLink}>
              Storefront
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.mainContainer}>
        <div className={`container ${styles.contentWrapper}`}>
          {/* Top Celebration Card */}
          <div className={styles.celebrationCard}>
            <div className={styles.successIconGlow}>
              <CheckCircle2 size={42} strokeWidth={2.5} />
            </div>

            <div className={styles.orderIdBadge}>Order Confirmed #{order.id}</div>
            <h1 className={styles.successTitle}>Thank You for Your Order!</h1>
            <p className={styles.successSubtitle}>
              We have received your commercial packaging order for{" "}
              <strong>{order.customer.businessName}</strong>. Our Bakersfield depot team is preparing your dispatch.
            </p>
            {order.customer.email && (
              <p
                style={{
                  marginTop: 10,
                  fontSize: 13,
                  color: "#166534",
                  backgroundColor: "#F0FDF4",
                  display: "inline-block",
                  padding: "6px 16px",
                  borderRadius: 9999,
                  border: "1px solid #BBF7D0",
                  fontWeight: 600,
                }}
              >
                📧 Confirmation email sent to <strong>{order.customer.email}</strong> &amp; warehouse dispatch.
              </p>
            )}

            {/* Visual Dispatch Stepper */}
            <div className={styles.timelineCard}>
              <div className={styles.timelineHeading}>
                <Clock size={16} color="#E51A1A" />
                <span>
                  {order.fulfillmentType === "pickup"
                    ? "Depot Pickup Timeline (Ready in 2 Hours)"
                    : "Scheduled Bakersfield Dispatch Timeline"}
                </span>
              </div>

              <div className={styles.stepperRow}>
                <div className={styles.stepItem}>
                  <div className={styles.stepIconDotActive}>
                    <CheckCircle2 size={18} />
                  </div>
                  <span className={styles.stepLabel}>Order Received</span>
                  <span className={styles.stepSub}>Just now</span>
                </div>

                <div className={styles.stepItem}>
                  <div className={styles.stepIconDotNext}>
                    <PackageCheck size={18} />
                  </div>
                  <span className={styles.stepLabel}>Depot Packing</span>
                  <span className={styles.stepSub}>5880 District Blvd</span>
                </div>

                <div className={styles.stepItem}>
                  <div className={styles.stepIconDotPending}>
                    <Truck size={18} />
                  </div>
                  <span className={styles.stepLabel}>
                    {order.fulfillmentType === "pickup" ? "Ready for Pickup" : "Out for Delivery"}
                  </span>
                  <span className={styles.stepSub}>{order.estimatedDelivery}</span>
                </div>
              </div>
            </div>

            {/* Order Fulfillment & Payment Status Card */}
            <div className={styles.orderStatusDetailsGrid}>
              {/* Payment Status Card */}
              <div className={styles.standardStatusCard}>
                <div className={styles.cardHeaderRow}>
                  <h3 className={styles.statusCardTitle}>Payment Details</h3>
                  <span className={styles.paymentMethodPill}>
                    {order.paymentMethod === "card"
                      ? "Credit Card"
                      : order.paymentMethod === "net30"
                      ? "Net-30 Terms"
                      : "Cash / Check (COD)"}
                  </span>
                </div>

                <div className={styles.statusMetaRow}>
                  <span className={styles.metaLabel}>Payment Status:</span>
                  <span className={styles.metaVal}>
                    {order.paymentStatus === "paid" ? (
                      <span style={{ color: "#16A34A", fontWeight: 500 }}>Paid &amp; Authorized</span>
                    ) : order.paymentStatus === "net30_pending" ? (
                      <span style={{ color: "#2563EB", fontWeight: 500 }}>Net-30 Invoice Billed</span>
                    ) : (
                      <span style={{ color: "#D97706", fontWeight: 500 }}>Due Upon Handover</span>
                    )}
                  </span>
                </div>

                <div className={styles.statusMetaRow}>
                  <span className={styles.metaLabel}>Total Invoiced:</span>
                  <span className={styles.metaVal} style={{ fontWeight: 600, color: "#0F172A" }}>
                    ${order.pricing.total.toFixed(2)}
                  </span>
                </div>

                <div className={styles.statusMetaRow}>
                  <span className={styles.metaLabel}>Invoice Recipient:</span>
                  <span className={styles.metaVal}>{order.customer.email}</span>
                </div>
              </div>

              {/* Delivery / Pickup Status Card */}
              <div className={styles.standardStatusCard}>
                <div className={styles.cardHeaderRow}>
                  <h3 className={styles.statusCardTitle}>
                    {order.fulfillmentType === "pickup" ? "Pickup Information" : "Delivery Address"}
                  </h3>
                  <span className={styles.fulfillmentPill}>
                    {order.fulfillmentType === "pickup" ? "Depot Pickup" : "Local Van Dispatch"}
                  </span>
                </div>

                <div className={styles.statusMetaRow}>
                  <span className={styles.metaLabel}>Destination:</span>
                  <span className={styles.metaVal}>
                    {order.fulfillmentType === "pickup"
                      ? "5880 District Blvd. Suite 17, Bakersfield, CA 93313"
                      : order.deliveryAddress
                      ? `${order.deliveryAddress.street}${order.deliveryAddress.suite ? `, ${order.deliveryAddress.suite}` : ""}, ${order.deliveryAddress.city}, ${order.deliveryAddress.state} ${order.deliveryAddress.zip}`
                      : "Registered Bakersfield Address"}
                  </span>
                </div>

                <div className={styles.statusMetaRow}>
                  <span className={styles.metaLabel}>Estimated Schedule:</span>
                  <span className={styles.metaVal} style={{ color: "#16A34A", fontWeight: 700 }}>
                    {order.estimatedDelivery}
                  </span>
                </div>

                <div className={styles.statusMetaRow}>
                  <span className={styles.metaLabel}>Driver Contact:</span>
                  <span className={styles.metaVal}>{order.customer.phone}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Row */}
            <div className={styles.quickActionsRow} style={{ marginTop: 24 }}>
              <a
                href={`https://wa.me/16612059667?text=${encodeURIComponent(
                  `Hello The Takeout Box Dispatch! I have a question regarding my Order #${order.id} (${order.customer.businessName}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappChatBtn}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="16"
                  height="16"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.05 21.95a.75.75 0 0 0 .937.937l4.782-1.388A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Zm4.838 13.568c-.208.583-1.034 1.108-1.636 1.18-.41.05-.944.092-2.85-.7-2.437-1.01-4.01-3.483-4.13-3.645-.12-.162-.98-1.306-.98-2.49 0-1.185.62-1.768.84-2.008.22-.24.48-.3.64-.3.16 0 .32.002.46.009.15.007.35-.057.548.42.208.5.71 1.733.77 1.86.06.126.1.272.02.433-.08.161-.12.261-.24.402-.12.14-.25.313-.36.42-.12.12-.24.25-.1.49.14.24.62 1.02 1.33 1.65.91.81 1.68 1.06 1.92 1.18.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.39.655 1.63.775.24.12.4.18.46.28.06.1.06.58-.148 1.163Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Chat with Dispatch</span>
              </a>

              <button
                type="button"
                className={styles.rateOrderBtn}
                onClick={() => setShowRatingModal(true)}
              >
                <Star size={16} fill="#FFFFFF" />
                <span>Rate Order Experience</span>
              </button>

              <Link href="/account?tab=orders" className={styles.viewHistoryBtn}>
                <PackageCheck size={16} />
                <span>View Order History</span>
              </Link>

              <Link href="/" className={styles.continueShopBtn}>
                <ShoppingBag size={16} />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Download Invoice Card (Requirement 3: "after order placed below we are showing invoice so instead of that i want to show download invoice btn") */}
          <div className={styles.downloadInvoiceSection}>
            <div className={styles.invoiceMetaLeft}>
              <div className={styles.invoiceIconBox}>
                <FileText size={26} strokeWidth={2.2} />
              </div>
              <div>
                <h3 className={styles.invoiceMetaTitle}>Official Commercial Tax Invoice</h3>
                <p className={styles.invoiceMetaSub}>
                  Invoice #{order.id} • Itemized packaging cases, pricing, and California tax exemption summary.
                </p>
              </div>
            </div>

            <div className={styles.invoiceActionsRight}>
              <button
                type="button"
                className={styles.downloadPdfPrimaryBtn}
                onClick={handleDownloadPdf}
                disabled={isDownloadingPdf}
                title="Download PDF invoice directly"
              >
                <Download size={16} />
                <span>{isDownloadingPdf ? "Generating PDF..." : "Download Invoice"}</span>
              </button>

              <button
                type="button"
                className={styles.viewInvoiceSecondaryBtn}
                onClick={() => setShowInvoiceModal(true)}
                title="Preview invoice in modal"
              >
                <Eye size={15} />
                <span>View Invoice</span>
              </button>
            </div>
          </div>

          {/* Hidden off-screen printable invoice for direct PDF generation */}
          <div
            style={{
              position: "absolute",
              left: "-9999px",
              top: "-9999px",
              width: "820px",
              opacity: 0,
              pointerEvents: "none",
            }}
            aria-hidden="true"
          >
            <div id="hidden-invoice-printable">
              <InvoiceDocument order={order} showActions={false} />
            </div>
          </div>

          {/* Invoice Modal for Previewing/Printing */}
          {showInvoiceModal && (
            <div
              className={styles.invoiceModalOverlay}
              onClick={() => setShowInvoiceModal(false)}
            >
              <div
                className={styles.invoiceModalBox}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontWeight: 600,
                      fontSize: 16,
                      color: "#0F172A",
                    }}
                  >
                    <FileText size={18} color="#E51A1A" />
                    <span>Commercial Invoice #{order.id}</span>
                  </div>
                  <button
                    type="button"
                    className={styles.invoiceModalClose}
                    onClick={() => setShowInvoiceModal(false)}
                  >
                    <X size={15} />
                    <span>Close</span>
                  </button>
                </div>
                <InvoiceDocument order={order} showActions={true} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            color: "#64748B",
          }}
        >
          Loading Order Confirmation...
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
