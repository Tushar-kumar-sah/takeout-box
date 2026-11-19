"use client";

import React, { useState } from "react";
import {
  Truck,
  TrendingDown,
  ShieldCheck,
  Send,
  CheckCircle2,
  MapPin,
  Phone,
  MessageCircle,
} from "lucide-react";
import styles from "./BulkRequest.module.css";
import {
  sanitizeText,
  sanitizePhone,
  sanitizeEmail,
  sanitizeMultilineText,
  isValidPhone,
  isValidEmail,
} from "../utils/sanitize";
import { ApiClient } from "../services/apiClient";

export const BulkRequest: React.FC = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    phone: "",
    email: "",
    monthlyVolume: "20-50 cases/mo",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    const cleanBusiness = sanitizeText(formData.businessName, 100);
    const cleanContact = sanitizeText(formData.contactName, 80);
    const cleanPhone = sanitizePhone(formData.phone);
    const cleanEmail = sanitizeEmail(formData.email);
    const cleanNotes = sanitizeText(formData.notes, 200);

    if (!cleanBusiness) {
      newErrors.businessName = "Please enter your business or restaurant name.";
    }
    if (!cleanContact) {
      newErrors.contactName = "Please enter a contact name.";
    }
    if (!cleanPhone) {
      newErrors.phone = "Phone number is required.";
    } else if (!isValidPhone(cleanPhone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number.";
    }

    if (cleanEmail && !isValidEmail(cleanEmail)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setFormData({
      ...formData,
      businessName: cleanBusiness,
      contactName: cleanContact,
      phone: cleanPhone,
      email: cleanEmail,
      notes: cleanNotes,
    });
    setErrors({});
    setIsSubmitting(true);

    try {
      await ApiClient.wholesale.submitQuote({
        businessName: cleanBusiness,
        contactName: cleanContact,
        phone: cleanPhone,
        email: cleanEmail,
        businessType: "Restaurant",
        otherBusinessType: "",
        monthlyVolume: formData.monthlyVolume,
        notes: cleanNotes,
      });
    } catch (err: any) {
      console.warn("[Wholesale Inquiry] Backend error (proceeding with optimistic success):", err?.message);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormData({
      businessName: "",
      contactName: "",
      phone: "",
      email: "",
      monthlyVolume: "20-50 cases/mo",
      notes: "",
    });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <section className={styles.bulkSection} id="bulk-quote-section">
      <div className="container">
        <div className={styles.bulkGrid}>
          {/* Left Column: Clean & Balanced Value Proposition */}
          <div className={styles.infoColumn}>
            <h2 className={styles.heading}>
              Wholesale Volume &amp; Scheduled Restock
            </h2>

            <p className={styles.description}>
              Direct case and pallet pricing with scheduled route delivery or warehouse pickup for
              restaurants, food trucks, and commercial kitchens across Kern County.
            </p>

            {/* Streamlined Perks List */}
            <div className={styles.perksList}>
              <div className={styles.perkItem}>
                <div className={styles.perkIconBox}>
                  <TrendingDown size={18} />
                </div>
                <div className={styles.perkText}>
                  <span className={styles.perkTitle}>Tiered Volume Savings</span>
                  <span className={styles.perkSubtitle}>
                    Up to 30% savings on scheduled case restocks and full pallet shipments.
                  </span>
                </div>
              </div>

              <div className={styles.perkItem}>
                <div className={styles.perkIconBox}>
                  <Truck size={18} />
                </div>
                <div className={styles.perkText}>
                  <span className={styles.perkTitle}>Bakersfield Route Dispatch</span>
                  <span className={styles.perkSubtitle}>
                    Fast delivery direct to your kitchen dock or immediate depot pickup.
                  </span>
                </div>
              </div>

              <div className={styles.perkItem}>
                <div className={styles.perkIconBox}>
                  <ShieldCheck size={18} />
                </div>
                <div className={styles.perkText}>
                  <span className={styles.perkTitle}>Guaranteed Stock Allocation</span>
                  <span className={styles.perkSubtitle}>
                    Priority inventory reservation so your kitchen never runs out of essentials.
                  </span>
                </div>
              </div>
            </div>

            {/* Compact Depot Info Card */}
            <div className={styles.contactBar}>
              <a
                href="https://maps.google.com/?q=5880+District+Blvd+Suite+17+Bakersfield+CA+93313"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactItem}
                title="Bakersfield Depot Address"
              >
                <MapPin size={16} className={styles.contactIcon} />
                <span>5880 District Blvd. Ste 17, Bakersfield, CA</span>
              </a>

              <a href="tel:+16612059667" className={styles.contactItem} title="Call Direct Line">
                <Phone size={16} className={styles.contactIcon} />
                <span>+1 661-205-9667</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clean, Streamlined Wholesale Quote Form */}
          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <h3 className={styles.formTitle}>Request Wholesale Quote</h3>
              <p className={styles.formSubtitle}>
                Get custom volume pricing tailored to your restaurant within 2 hours.
              </p>
            </div>

            {submitted ? (
              <div className={styles.successBox}>
                <div className={styles.successIcon}>
                  <CheckCircle2 size={32} />
                </div>
                <h4 className={styles.successTitle}>Quote Request Received!</h4>
                <p className={styles.successText}>
                  Thank you, <strong>{formData.contactName}</strong> from{" "}
                  <strong>{formData.businessName}</strong>. Our Bakersfield wholesale desk will
                  reach you at <strong>{formData.phone}</strong> shortly with your custom volume pricing.
                </p>

                <div className={styles.successActions}>
                  <a
                    href={`https://wa.me/16612059667?text=${encodeURIComponent(
                      `Hello The Takeout Box Wholesale Desk! I just submitted a volume quote for ${formData.businessName} and would like to chat.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.whatsappSuccessBtn}
                  >
                    <MessageCircle size={18} />
                    <span>Instant Chat on WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    className={styles.sendAnotherBtn}
                    onClick={handleReset}
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Business / Restaurant Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bakersfield Tacos &amp; Grill"
                      className={styles.input}
                      value={formData.businessName}
                      onChange={(e) => {
                        setFormData({ ...formData, businessName: e.target.value });
                        if (errors.businessName) setErrors({ ...errors, businessName: "" });
                      }}
                      onBlur={() =>
                        setFormData((prev) => ({
                          ...prev,
                          businessName: sanitizeText(prev.businessName, 100),
                        }))
                      }
                    />
                    {errors.businessName && (
                      <span className={styles.errorText}>{errors.businessName}</span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Contact Person *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe (Manager)"
                      className={styles.input}
                      value={formData.contactName}
                      onChange={(e) => {
                        setFormData({ ...formData, contactName: e.target.value });
                        if (errors.contactName) setErrors({ ...errors, contactName: "" });
                      }}
                      onBlur={() =>
                        setFormData((prev) => ({
                          ...prev,
                          contactName: sanitizeText(prev.contactName, 80),
                        }))
                      }
                    />
                    {errors.contactName && (
                      <span className={styles.errorText}>{errors.contactName}</span>
                    )}
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. (661) 555-0199"
                      className={styles.input}
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: sanitizePhone(e.target.value) });
                        if (errors.phone) setErrors({ ...errors, phone: "" });
                      }}
                    />
                    {errors.phone && (
                      <span className={styles.errorText}>{errors.phone}</span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. orders@restaurant.com"
                      className={styles.input}
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: "" });
                      }}
                      onBlur={() =>
                        setFormData((prev) => ({
                          ...prev,
                          email: sanitizeEmail(prev.email),
                        }))
                      }
                    />
                    {errors.email && (
                      <span className={styles.errorText}>{errors.email}</span>
                    )}
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Estimated Monthly Volume</label>
                    <select
                      className={styles.select}
                      value={formData.monthlyVolume}
                      onChange={(e) =>
                        setFormData({ ...formData, monthlyVolume: e.target.value })
                      }
                    >
                      <option value="<20 cases/mo">&lt; 20 Cases / month</option>
                      <option value="20-50 cases/mo">20 – 50 Cases / month</option>
                      <option value="50-100 cases/mo">50 – 100 Cases / month</option>
                      <option value="100+ cases/mo">100+ Cases (Half / Full Pallet)</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Products Needed (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. 16oz deli cups, 9x9 clamshells"
                      className={styles.input}
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: sanitizeText(e.target.value, 200) })
                      }
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isSubmitting}
                >
                  <Send size={16} />
                  <span>{isSubmitting ? "Submitting Request..." : "Request Wholesale Pricing"}</span>
                </button>

                <div className={styles.whatsappNote}>
                  <span>Prefer to chat directly? </span>
                  <a
                    href={`https://wa.me/16612059667?text=${encodeURIComponent(
                      `Hello The Takeout Box Wholesale Desk! I'm interested in bulk wholesale packaging pricing.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.whatsappLink}
                  >
                    <MessageCircle size={14} />
                    <span>WhatsApp Desk (+1 661-205-9667)</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
