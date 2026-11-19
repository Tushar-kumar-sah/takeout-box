"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ChevronRight, Lock, Eye, Bell } from "lucide-react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
      <Header searchQuery="" onSearchChange={() => {}} onSelectCategory={() => {}} />

      {/* Breadcrumb */}
      <div style={{ background: "#FFFFFF", borderBottom: "1px solid #E2E8F0", padding: "12px 0" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#64748B" }}>
          <Link href="/" style={{ color: "#64748B", textDecoration: "none" }}>Home</Link>
          <ChevronRight size={13} />
          <span style={{ color: "#0F172A", fontWeight: 500 }}>Privacy Policy</span>
        </div>
      </div>

      <main className="container" style={{ flex: 1, padding: "40px 16px 80px 16px", maxWidth: 900 }}>
        <div style={{ background: "#FFFFFF", borderRadius: 16, border: "1px solid #E2E8F0", padding: "40px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#FEF2F2", color: "#E51A1A", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Lock size={22} />
            </div>
            <div>
              <h1 style={{ fontSize: 26, fontWeight: 600, color: "#0F172A", margin: 0, letterSpacing: "-0.4px" }}>
                Commercial Privacy Policy
              </h1>
              <p style={{ fontSize: 13, color: "#64748B", margin: "2px 0 0 0" }}>
                The Takeout Box Restaurant Supply LLC • California Privacy Rights (CCPA / CPRA)
              </p>
            </div>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid #F1F5F9", margin: "24px 0" }} />

          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "#0F172A", marginBottom: 8 }}>1. Information We Collect</h2>
            <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6 }}>
              We collect information necessary to process commercial wholesale orders and facilitate local Bakersfield depot dispatches. This includes business name, contact person name, restaurant delivery address, mobile phone number for driver SMS alerts, email address for invoices, and California Seller&apos;s Permit numbers for tax exemptions.
            </p>
          </section>

          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "#0F172A", marginBottom: 8 }}>2. SMS Dispatch &amp; Delivery Notifications</h2>
            <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6 }}>
              When you provide a mobile phone number during checkout or in your Commercial Account, you consent to receive order updates, OTP verification codes, and real-time delivery notices from our local dispatch drivers. We never sell or share phone numbers with third-party advertisers. You may opt out of promotional text messages at any time.
            </p>
          </section>

          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "#0F172A", marginBottom: 8 }}>3. Payment &amp; Financial Security</h2>
            <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6 }}>
              Payment transactions are encrypted using industry-standard 256-bit Secure Sockets Layer (SSL) protocol. Full card details are processed directly through PCI-DSS Level 1 compliant processors. The Takeout Box does not store complete credit card numbers or CVV codes on our local servers.
            </p>
          </section>

          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "#0F172A", marginBottom: 8 }}>4. California Consumer Privacy Act (CCPA)</h2>
            <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6 }}>
              As a California commercial enterprise, we respect your rights under the CCPA/CPRA. California residents have the right to request disclosure of personal data collected, request deletion of account records, and direct us not to sell or share personal data. To exercise these rights, contact us at privacy@thetakeoutbox.com.
            </p>
          </section>

          <div style={{ background: "#F8FAFC", borderRadius: 12, padding: 20, border: "1px solid #E2E8F0", marginTop: 32 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: "#0F172A", margin: "0 0 4px 0" }}>Privacy Questions?</h3>
            <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 12px 0" }}>
              Our data compliance officer is based at 5880 District Blvd. Suite 17, Bakersfield, CA 93313.
            </p>
            <a href="mailto:privacy@thetakeoutbox.com" style={{ color: "#E51A1A", fontWeight: 500, fontSize: 14, textDecoration: "none" }}>
              Contact: privacy@thetakeoutbox.com
            </a>
          </div>
        </div>
      </main>

      <Footer onSelectCategory={() => {}} />
    </div>
  );
}
