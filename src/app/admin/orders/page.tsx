"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  Package,
  Calendar,
  User,
  MapPin,
  Clock,
  ArrowLeft,
  CheckCircle2,
  RefreshCw,
  Search,
  AlertCircle,
  FileText,
} from "lucide-react";
import styles from "./AdminOrders.module.css";
import { ApiClient, getApiBaseUrl } from "../../../services/apiClient";
import { getStoredOrders, CommercialOrder } from "../../../data/customerStore";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const loadOrders = async () => {
    setLoading(true);
    try {
      // 1. Fetch live orders from backend MySQL API
      const res = await fetch(`${getApiBaseUrl()}/orders/admin/all`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.orders)) {
          setOrders(data.orders);
          if (data.orders.length > 0 && !selectedOrder) {
            setSelectedOrder(data.orders[0]);
          }
          setLoading(false);
          return;
        }
      }
    } catch (apiErr) {
      console.warn("[Admin Orders] Backend fetch notice:", apiErr);
    }

    // Fallback to client-side orders
    const local = getStoredOrders();
    setOrders(local);
    if (local.length > 0 && !selectedOrder) {
      setSelectedOrder(local[0]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    if (filterStatus === "shipping_selected" && order.status !== "READY_FOR_PAYMENT" && order.status !== "SHIPPING_SELECTED") {
      return false;
    }
    if (filterStatus === "delivered" && order.status !== "delivered") {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = String(order.id).toLowerCase().includes(q);
      const matchCustomer = String(order.customer?.contactName || order.customer?.businessName || "").toLowerCase().includes(q);
      const matchEmail = String(order.customer?.email || "").toLowerCase().includes(q);
      return matchId || matchCustomer || matchEmail;
    }
    return true;
  });

  return (
    <div className={styles.adminPage}>
      {/* Admin Portal Header */}
      <header className={styles.adminHeader}>
        <div className="site-container">
          <div className={styles.headerInner}>
            <div className={styles.titleArea}>
              <h1>
                <Truck size={22} color="#38BDF8" />
                Admin Order &amp; UPS Shipping Management
              </h1>
              <p>USA Commercial Orders • UPS Courier Dispatch &amp; Rate Snapshot Diagnostics</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className={styles.adminBadge}>
                <ShieldCheck size={14} /> ADMIN CONSOLE
              </div>
              <Link
                href="/"
                style={{
                  color: "#94A3B8",
                  fontSize: 13,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <ArrowLeft size={14} /> Return to Store
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className={styles.container}>
        {/* Filter and Search Bar */}
        <div className={styles.filterBar}>
          <div className={styles.filterTabs}>
            <button
              className={`${styles.filterBtn} ${filterStatus === "all" ? styles.filterBtnActive : ""}`}
              onClick={() => setFilterStatus("all")}
            >
              All Orders ({orders.length})
            </button>
            <button
              className={`${styles.filterBtn} ${filterStatus === "shipping_selected" ? styles.filterBtnActive : ""}`}
              onClick={() => setFilterStatus("shipping_selected")}
            >
              Shipping Selected / Ready for Payment
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <input
              type="text"
              placeholder="Search by order #, customer, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                height: 36,
                borderRadius: 8,
                border: "1px solid #CBD5E1",
                padding: "0 12px",
                fontSize: 13,
                outline: "none",
                minWidth: 260,
              }}
            />
            <button
              onClick={loadOrders}
              title="Refresh Orders"
              style={{
                background: "#F1F5F9",
                border: "1px solid #CBD5E1",
                borderRadius: 8,
                padding: "8px 12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
              }}
            >
              <RefreshCw size={14} /> Refresh
            </button>
          </div>
        </div>

        {/* Master Detail Grid */}
        <div className={styles.ordersGrid}>
          {/* Left Column: Orders List */}
          <div className={styles.ordersListCard}>
            <div className={styles.ordersListHeader}>
              <span>Orders Queue</span>
              <span style={{ fontSize: 12, color: "#64748B", fontWeight: 400 }}>
                Showing {filteredOrders.length} order{filteredOrders.length !== 1 ? "s" : ""}
              </span>
            </div>

            {loading ? (
              <div className={styles.emptyState}>Loading orders from database...</div>
            ) : filteredOrders.length === 0 ? (
              <div className={styles.emptyState}>No orders found matching filter criteria.</div>
            ) : (
              <div>
                {filteredOrders.map((order) => {
                  const isSelected = selectedOrder?.id === order.id;
                  const formattedDate = new Date(order.date || Date.now()).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });

                  return (
                    <div
                      key={order.id}
                      className={`${styles.orderItemRow} ${isSelected ? styles.orderItemRowActive : ""}`}
                      onClick={() => setSelectedOrder(order)}
                    >
                      <div className={styles.orderItemTop}>
                        <span className={styles.orderNumber}>ORDER #{order.id}</span>
                        <span className={styles.orderDate}>{formattedDate}</span>
                      </div>

                      <div className={styles.orderCustomer}>
                        <strong>{order.customer?.contactName || "Customer"}</strong>
                        {order.customer?.businessName && ` • ${order.customer.businessName}`}
                      </div>

                      <div className={styles.orderMetaRow}>
                        <div style={{ display: "flex", gap: 6 }}>
                          <span className={styles.carrierPill}>
                            UPS — {order.shippingService || "Ground"}
                          </span>
                          <span
                            className={styles.statusPill}
                            style={{
                              background: order.paymentStatus === "paid" ? "#DCFCE7" : "#FEF3C7",
                              color: order.paymentStatus === "paid" ? "#15803D" : "#B45309",
                            }}
                          >
                            {order.status || "READY_FOR_PAYMENT"}
                          </span>
                        </div>
                        <strong style={{ color: "#0F172A", fontSize: 13 }}>
                          ${Number(order.pricing?.total || 0).toFixed(2)}
                        </strong>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Detailed Order View */}
          {selectedOrder ? (
            <div className={styles.detailCard}>
              {/* Header */}
              <div className={styles.detailHeader}>
                <div>
                  <div className={styles.detailTitle}>ORDER #{selectedOrder.id}</div>
                  <div className={styles.detailSubtitle}>
                    Received: {new Date(selectedOrder.date).toLocaleString("en-US")}
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: "#64748B", textTransform: "uppercase" }}>Order Total</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#E51A1A" }}>
                    ${Number(selectedOrder.pricing?.total || 0).toFixed(2)} USD
                  </div>
                </div>
              </div>

              {/* 1. Customer Information */}
              <div className={styles.sectionBlock}>
                <div className={styles.sectionBlockTitle}>
                  <User size={15} /> Customer Details
                </div>
                <div className={styles.infoGrid}>
                  <div>
                    <span className={styles.infoItemLabel}>Contact Name</span>
                    <span className={styles.infoItemValue}>
                      {selectedOrder.customer?.contactName || "Customer"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.infoItemLabel}>Business Entity</span>
                    <span className={styles.infoItemValue}>
                      {selectedOrder.customer?.businessName || "Direct Restaurant"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.infoItemLabel}>Email</span>
                    <span className={styles.infoItemValue}>
                      {selectedOrder.customer?.email || "—"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.infoItemLabel}>Phone</span>
                    <span className={styles.infoItemValue}>
                      {selectedOrder.customer?.phone || "—"}
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Shipping Address Snapshot (Requirement 22) */}
              <div className={styles.sectionBlock}>
                <div className={styles.sectionBlockTitle}>
                  <MapPin size={15} /> Shipping Address Snapshot
                </div>
                <div style={{ fontSize: 13, color: "#0F172A", lineHeight: 1.6 }}>
                  <div>
                    <strong>
                      {selectedOrder.shippingAddressSnapshot?.firstName || selectedOrder.customer?.contactName}{" "}
                      {selectedOrder.shippingAddressSnapshot?.lastName || ""}
                    </strong>
                  </div>
                  <div>
                    {selectedOrder.shippingAddressSnapshot?.street || selectedOrder.deliveryAddress?.street}
                    {(selectedOrder.shippingAddressSnapshot?.suite || selectedOrder.deliveryAddress?.suite) &&
                      `, ${selectedOrder.shippingAddressSnapshot?.suite || selectedOrder.deliveryAddress?.suite}`}
                  </div>
                  <div>
                    {selectedOrder.shippingAddressSnapshot?.city || selectedOrder.deliveryAddress?.city},{" "}
                    {selectedOrder.shippingAddressSnapshot?.state || selectedOrder.deliveryAddress?.state}{" "}
                    {selectedOrder.shippingAddressSnapshot?.zip || selectedOrder.deliveryAddress?.zip}
                  </div>
                  <div style={{ color: "#475569", fontWeight: 500 }}>
                    {selectedOrder.shippingAddressSnapshot?.country || "United States"}
                  </div>
                </div>
              </div>

              {/* 3. Dedicated UPS Shipping Section (Requirements 23 & 24) */}
              <div className={styles.shippingDedicatedSection}>
                <div className={styles.shippingTitleRow}>
                  <div className={styles.shippingTitle}>
                    <Truck size={18} />
                    <span>Shipping</span>
                  </div>
                  <div className={styles.upsLogoTag}>UPS® GROUND &amp; AIR</div>
                </div>

                <div className={styles.infoGrid} style={{ marginBottom: 12 }}>
                  <div>
                    <span className={styles.infoItemLabel}>Carrier</span>
                    <strong style={{ color: "#0F172A" }}>
                      {selectedOrder.shippingCarrier || "UPS"}
                    </strong>
                  </div>
                  <div>
                    <span className={styles.infoItemLabel}>Service</span>
                    <strong style={{ color: "#0F172A" }}>
                      {selectedOrder.shippingService || "UPS Ground"}
                    </strong>
                  </div>
                  <div>
                    <span className={styles.infoItemLabel}>Shipping Cost</span>
                    <strong style={{ color: "#0F172A", fontSize: 15 }}>
                      ${Number(selectedOrder.shippingAmount || selectedOrder.pricing?.deliveryFee || 0).toFixed(2)} USD
                    </strong>
                  </div>
                  <div>
                    <span className={styles.infoItemLabel}>Rate Status</span>
                    <span style={{ color: "#16A34A", fontWeight: 700 }}>Selected</span>
                  </div>
                  <div>
                    <span className={styles.infoItemLabel}>Shipment Status</span>
                    <span style={{ color: "#2563EB", fontWeight: 600 }}>
                      {selectedOrder.shipment?.shipmentStatus || "Not Created"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.infoItemLabel}>Tracking Number</span>
                    <span style={{ color: "#64748B", fontWeight: 500 }}>
                      {selectedOrder.shipment?.trackingNumber || "Not Available (Pending Shipment Creation)"}
                    </span>
                  </div>
                </div>

                {/* 4. UPS Rate Details Diagnostic Box (Requirement 25) */}
                <div className={styles.rateDetailsBox}>
                  <div className={styles.rateDetailsTitle}>
                    <Package size={14} /> Rate &amp; Packaging Diagnostics (UPS XAV &amp; Rating API)
                  </div>
                  <div className={styles.rateDebugGrid}>
                    <div>
                      <span className={styles.infoItemLabel}>Service Code</span>
                      <span>{selectedOrder.shippingServiceCode || selectedOrder.shipment?.serviceCode || "03"}</span>
                    </div>
                    <div>
                      <span className={styles.infoItemLabel}>Currency</span>
                      <span>{selectedOrder.shippingCurrency || "USD"}</span>
                    </div>
                    <div>
                      <span className={styles.infoItemLabel}>Package Weight</span>
                      <span>
                        {selectedOrder.shipment?.packageWeight
                          ? `${selectedOrder.shipment.packageWeight} LBS`
                          : "Calculated (approx 6.0 LBS)"}
                      </span>
                    </div>
                    <div>
                      <span className={styles.infoItemLabel}>Package Dimensions</span>
                      <span>
                        {selectedOrder.shipment?.packageLength
                          ? `${selectedOrder.shipment.packageLength} × ${selectedOrder.shipment.packageWidth} × ${selectedOrder.shipment.packageHeight} IN`
                          : "14 × 10 × 8 IN"}
                      </span>
                    </div>
                    <div>
                      <span className={styles.infoItemLabel}>Destination State</span>
                      <span>
                        {selectedOrder.shippingAddressSnapshot?.state || selectedOrder.deliveryAddress?.state || "CA"}
                      </span>
                    </div>
                    <div>
                      <span className={styles.infoItemLabel}>Rate Quote Ref</span>
                      <span style={{ fontSize: 11, wordBreak: "break-all" }}>
                        {selectedOrder.rateQuoteReference || "UPS-AUTO-SHOP"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Order Line Items */}
              <div className={styles.sectionBlock}>
                <div className={styles.sectionBlockTitle}>
                  <Package size={15} /> Order Items ({selectedOrder.items?.length || 0})
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {selectedOrder.items?.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingBottom: 8,
                        borderBottom: "1px solid #E2E8F0",
                        fontSize: 13,
                      }}
                    >
                      <div>
                        <strong>{item.productName}</strong>
                        <div style={{ color: "#64748B", fontSize: 12 }}>
                          Size: {item.sizeName} • Case Count: {item.caseCount} • Qty: {item.quantity}
                        </div>
                      </div>
                      <div style={{ textAlign: "right", fontWeight: 600 }}>
                        ${Number(item.lineTotal || item.unitPrice * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. Pricing Breakdown */}
              <div className={styles.sectionBlock}>
                <div className={styles.sectionBlockTitle}>
                  <FileText size={15} /> Financial Summary
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748B" }}>Subtotal</span>
                    <span>${Number(selectedOrder.pricing?.subtotal || 0).toFixed(2)}</span>
                  </div>
                  {Number(selectedOrder.pricing?.volumeDiscount || 0) > 0 && (
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#16A34A" }}>
                      <span>Volume Discount</span>
                      <span>-${Number(selectedOrder.pricing?.volumeDiscount).toFixed(2)}</span>
                    </div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748B" }}>
                      UPS Shipping ({selectedOrder.shippingService || "Ground"})
                    </span>
                    <strong style={{ color: "#0F172A" }}>
                      ${Number(selectedOrder.shippingAmount || selectedOrder.pricing?.deliveryFee || 0).toFixed(2)}
                    </strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748B" }}>Sales Tax</span>
                    <span>${Number(selectedOrder.pricing?.tax || 0).toFixed(2)}</span>
                  </div>
                  <div
                    style={{
                      borderTop: "1px solid #CBD5E1",
                      paddingTop: 8,
                      marginTop: 4,
                      display: "flex",
                      justifyContent: "space-between",
                      fontWeight: 700,
                      fontSize: 15,
                    }}
                  >
                    <span>Total Amount</span>
                    <span style={{ color: "#E51A1A" }}>
                      ${Number(selectedOrder.pricing?.total || 0).toFixed(2)} USD
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 12 }}>
                    <span style={{ color: "#64748B" }}>Payment Status</span>
                    <span style={{ color: "#D97706", fontWeight: 700 }}>
                      {selectedOrder.paymentStatus || "NOT_STARTED (Next Phase)"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.emptyState}>Select an order on the left to view UPS shipping details.</div>
          )}
        </div>
      </div>
    </div>
  );
}
