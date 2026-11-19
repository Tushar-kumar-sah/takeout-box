"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ChevronRight, FileText, CheckCircle2, Building, Scale } from "lucide-react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export default function TermsPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
      <Header searchQuery="" onSearchChange={() => {}} onSelectCategory={() => {}} />

      {/* Breadcrumb */}
      <div style={{ background: "#FFFFFF", borderBottom: "1px solid #E2E8F0", padding: "12px 0" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#64748B" }}>
          <Link href="/" style={{ color: "#64748B", textDecoration: "none" }}>Home</Link>
          <ChevronRight size={13} />
          <span style={{ color: "#0F172A", fontWeight: 500 }}>Terms and Conditions</span>
        </div>
      </div>

      <main className="container" style={{ flex: 1, padding: "40px 16px 80px 16px", maxWidth: 900 }}>
        <div style={{ background: "#FFFFFF", borderRadius: 16, border: "1px solid #E2E8F0", padding: "40px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#FEF2F2", color: "#E51A1A", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Scale size={22} />
            </div>
            <div>
              <h1 style={{ fontSize: 26, fontWeight: 600, color: "#0F172A", margin: 0, letterSpacing: "-0.4px" }}>
                Commercial Terms &amp; Conditions
              </h1>
              <p style={{ fontSize: 13, color: "#64748B", margin: "2px 0 0 0" }}>
                The Takeout Box Restaurant Supply LLC • Bakersfield, CA • Last Updated: September 2026
              </p>
            </div>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid #F1F5F9", margin: "24px 0" }} />

          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "#0F172A", marginBottom: 8 }}>1. Commercial Wholesale Purchasing</h2>
            <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6 }}>
              The Takeout Box supplies certified food packaging, meal containers, paper goods, and catering supplies to licensed food service establishments including restaurants, food trucks, caterers, bakeries, and cloud kitchens in Kern County, California, and surrounding areas. All orders are sold by the case pack unless explicitly designated as sample units.
            </p>
          </section>

          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "#0F172A", marginBottom: 8 }}>2. California Sales Tax Exemption (CDTFA Resale)</h2>
            <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6 }}>
              Under California Department of Tax and Fee Administration (CDTFA) Regulation 1603 and California Sales and Use Tax Law, disposable food containers, cups, napkins, and cutlery furnished to customers with meals for takeout or delivery are considered purchases for resale. Buyers claiming exemption must provide a valid California Seller’s Permit number upon checkout or in their Commercial Account profile.
            </p>
          </section>

          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "#0F172A", marginBottom: 8 }}>3. Bakersfield Local Delivery &amp; Depot Pickup</h2>
            <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6 }}>
              Orders meeting or exceeding the <strong>$200 threshold</strong> qualify for Free Bakersfield Local Dispatch. Orders under $200 incur a standard flat dispatch fee of $15.00 within Kern County metro areas. Free depot customer pickup is available at our central warehouse at 5880 District Blvd. Suite 17, Bakersfield, CA 93313, ready within two business hours of order confirmation.
            </p>
          </section>

          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "#0F172A", marginBottom: 8 }}>4. Commercial Net-30 Credit Terms</h2>
            <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6 }}>
              Approved commercial accounts may place orders on Net-30 credit terms. Invoices are payable within thirty (30) calendar days from the date of dispatch via check, ACH transfer, or commercial card. Balances past due beyond 45 days may be subject to a 1.5% monthly late assessment.
            </p>
          </section>

          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "#0F172A", marginBottom: 8 }}>5. Food Safety Compliance &amp; Case Return Policy</h2>
            <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6 }}>
              To ensure 100% hygienic safety for food service operations, returns can only be accepted on unopened, original factory-sealed cases within fourteen (14) days of dispatch. Opened packaging or partially used sleeves cannot be returned or restocked due to sanitary health standards.
            </p>
          </section>

          <div style={{ background: "#F8FAFC", borderRadius: 12, padding: 20, border: "1px solid #E2E8F0", marginTop: 32 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: "#0F172A", margin: "0 0 4px 0" }}>Need Clarification on Commercial Terms?</h3>
            <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 12px 0" }}>
              Our Bakersfield depot accounts team is available Monday through Saturday to assist.
            </p>
            <a href="tel:+16612059667" style={{ color: "#E51A1A", fontWeight: 500, fontSize: 14, textDecoration: "none" }}>
              Call Bakersfield Depot: +1 661-205-9667
            </a>
          </div>
        </div>
      </main>

      <Footer onSelectCategory={() => {}} />
    </div>
  );
}
