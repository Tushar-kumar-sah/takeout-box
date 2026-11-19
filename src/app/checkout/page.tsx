"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Shield,
  Truck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Package,
  Clock,
  MapPin,
  Building2,
  Mail,
  Phone,
  FileCheck,
  Sparkles,
  CreditCard,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Lock,
} from "lucide-react";
import styles from "./CheckoutPage.module.css";
import { useCart } from "../../context/CartContext";
import {
  saveOrder,
  saveAddress,
  getStoredAddresses,
  getStoredProfile,
  DEFAULT_PROFILE,
  CommercialOrder,
  CustomerAddress,
  CustomerProfile,
} from "../../data/customerStore";
import { ApiClient } from "../../services/apiClient";
import { US_STATES } from "../../data/usStates";
import {
  sanitizeText,
  sanitizePhone,
  sanitizeEmail,
  sanitizeZip,
  isValidPhone,
  isValidEmail,
  isValidZip,
} from "../../utils/sanitize";

interface ShippingOption {
  carrier: "UPS";
  serviceCode: string;
  serviceName: string;
  rate: number;
  currency: "USD";
  deliveryDays?: number;
  estimatedDelivery?: string;
  guaranteed: boolean;
  rateQuoteReference?: string;
}

interface AddressValidationState {
  isValidated: boolean;
  isValid: boolean;
  isStandardized: boolean;
  classification?: "Commercial" | "Residential" | "Unknown";
  message?: string;
  original?: {
    street: string;
    suite?: string;
    city: string;
    state: string;
    zip: string;
  };
  suggested?: {
    street: string;
    suite?: string;
    city: string;
    state: string;
    zip: string;
  };
}

function ZelleLogo({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <rect width="40" height="40" rx="9" fill="#7414CA" />
      <line x1="20" y1="7.5" x2="20" y2="32.5" stroke="#FFFFFF" strokeWidth="3.6" strokeLinecap="round" />
      <path
        d="M 12 13 H 28 L 12 27 H 28"
        stroke="#FFFFFF"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCart();

  // Profile & Saved Addresses
  const [profile, setProfile] = useState<CustomerProfile>(DEFAULT_PROFILE);
  const [savedAddresses, setSavedAddresses] = useState<CustomerAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");

  // Customer Contact Information
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState("");

  // Shipping Address (United States Only)
  const [street, setStreet] = useState("");
  const [suite, setSuite] = useState("");
  const [city, setCity] = useState("Bakersfield");
  const [state, setState] = useState("CA");
  const [zip, setZip] = useState("93313");
  const country = "United States";

  // Address Validation State
  const [isValidatingAddress, setIsValidatingAddress] = useState(false);
  const [validationState, setValidationState] = useState<AddressValidationState>({
    isValidated: false,
    isValid: false,
    isStandardized: false,
  });

  // UPS Rates State
  const [isLoadingRates, setIsLoadingRates] = useState(false);
  const [upsRates, setUpsRates] = useState<ShippingOption[]>([]);
  const [selectedServiceCode, setSelectedServiceCode] = useState<string>("");
  const [packageInfo, setPackageInfo] = useState<{
    totalWeight: number;
    weightUnit: "LBS";
    packageCount: number;
  } | null>(null);
  const [ratesError, setRatesError] = useState<string | null>(null);

  // Payment states (Zelle Business Payment)
  const [paymentMethod, setPaymentMethod] = useState<"zelle">("zelle");
  const [zelleReferenceId, setZelleReferenceId] = useState("");
  const [zelleSenderName, setZelleSenderName] = useState("");
  const [isCopiedPhone, setIsCopiedPhone] = useState(false);
  const [showZelleHelp, setShowZelleHelp] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText("6618059358");
    setIsCopiedPhone(true);
    setTimeout(() => setIsCopiedPhone(false), 2000);
  };

  // Tax Exemption State (California B2B Resale)
  const [taxExempt, setTaxExempt] = useState(true);
  const [resalePermitNumber, setResalePermitNumber] = useState("SR-KHL-103849102");

  // Submission & Form Errors
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutErrors, setCheckoutErrors] = useState<Record<string, string>>({});
  const [savedOrderResult, setSavedOrderResult] = useState<any | null>(null);

  // Load stored profile and addresses on mount
  useEffect(() => {
    const prof = getStoredProfile();
    setProfile(prof);
    if (prof.name) {
      setFullName(prof.name);
    }
    setBusinessName(prof.restaurantName || "");
    setPhone(prof.phone || "");
    setEmail(prof.email || "");

    const addrs = getStoredAddresses();
    setSavedAddresses(addrs);
    if (addrs.length > 0) {
      const defaultAddr = addrs.find((a) => a.isDefault) || addrs[0];
      setSelectedAddressId(defaultAddr.id);
      setStreet(defaultAddr.street);
      setSuite(defaultAddr.suite || "");
      setCity(defaultAddr.city);
      setState(defaultAddr.state);
      setZip(defaultAddr.zip);
    }

    // Synchronize authenticated profile if token exists
    const token = typeof window !== "undefined" ? localStorage.getItem("takeout_jwt_token") : null;
    if (token) {
      ApiClient.profile.get().then((res) => {
        if (res.success && res.profile) {
          setProfile(res.profile);
          if (res.profile.name) {
            setFullName(res.profile.name);
          }
          if (res.profile.restaurantName) setBusinessName(res.profile.restaurantName);
          if (res.profile.phone) setPhone(res.profile.phone);
          if (res.profile.email) setEmail(res.profile.email);
        }
      }).catch(() => {});

      ApiClient.addresses.list().then((res) => {
        if (res.success && Array.isArray(res.addresses) && res.addresses.length > 0) {
          setSavedAddresses(res.addresses);
          const defaultAddr = res.addresses.find((a) => a.isDefault) || res.addresses[0];
          setSelectedAddressId(defaultAddr.id);
          setStreet(defaultAddr.street);
          setSuite(defaultAddr.suite || "");
          setCity(defaultAddr.city);
          setState(defaultAddr.state);
          setZip(defaultAddr.zip);
        }
      }).catch(() => {});
    }
  }, []);

  // When saved address is selected from dropdown
  const handleAddressSelect = (addrId: string) => {
    setSelectedAddressId(addrId);
    const addr = savedAddresses.find((a) => a.id === addrId);
    if (addr) {
      setStreet(addr.street);
      setSuite(addr.suite || "");
      setCity(addr.city);
      setState(addr.state);
      setZip(addr.zip);
      // Reset validation state on address change
      setValidationState({ isValidated: false, isValid: false, isStandardized: false });
      setUpsRates([]);
      setSelectedServiceCode("");
    }
  };

  // Pricing calculations
  const subtotal = items.reduce(
    (sum, item) => sum + item.size.price * item.quantity,
    0
  );

  const volumeDiscount = 0;

  // Active selected UPS shipping rate
  const selectedRate = upsRates.find((r) => r.serviceCode === selectedServiceCode) || null;
  const shippingAmount = selectedRate ? selectedRate.rate : 0.0;

  // Sales Tax: CA destinations (8.25%) unless tax exempt
  const isCADestination = state.toUpperCase() === "CA";
  const tax = isCADestination && !taxExempt ? Math.round(subtotal * 0.0825 * 100) / 100 : 0.0;
  const grandTotal = Math.round((subtotal + shippingAmount + tax) * 100) / 100;

  // Reset rates and validation when user modifies address fields
  const handleAddressFieldChange = () => {
    if (validationState.isValidated) {
      setValidationState({ isValidated: false, isValid: false, isStandardized: false });
      setUpsRates([]);
      setSelectedServiceCode("");
    }
  };

  // STEP 3: Validate Address via UPS Address Validation API
  const handleValidateAddress = async () => {
    if (isValidatingAddress) return;

    const errors: Record<string, string> = {};
    const cleanStreet = sanitizeText(street, 100);
    const cleanCity = sanitizeText(city, 50);
    const cleanZip = sanitizeZip(zip);

    if (!cleanStreet) errors.street = "Street address is required";
    if (!cleanCity) errors.city = "City is required";
    if (!state) errors.state = "State is required";
    if (!cleanZip || !isValidZip(cleanZip)) errors.zip = "Valid 5-digit US ZIP code is required (e.g. 93313)";

    if (Object.keys(errors).length > 0) {
      setCheckoutErrors(errors);
      return;
    }

    setCheckoutErrors({});
    setIsValidatingAddress(true);
    setRatesError(null);

    try {
      const res = await ApiClient.shipping.validateAddress({
        street: cleanStreet,
        suite: suite ? sanitizeText(suite, 50) : undefined,
        city: cleanCity,
        state,
        zip: cleanZip,
        recipientName: fullName.trim() || undefined,
        businessName: businessName || undefined,
      });

      if (res.valid) {
        setValidationState({
          isValidated: true,
          isValid: true,
          isStandardized: res.standardized,
          classification: res.classification,
          message: res.message,
          original: res.originalAddress,
          suggested: res.suggestedAddress,
        });

        // If exact match or validated without needing suggestion confirmation, immediately request UPS rates
        if (!res.standardized) {
          fetchUpsRates(cleanStreet, suite, cleanCity, state, cleanZip);
        }
      } else {
        setValidationState({
          isValidated: true,
          isValid: false,
          isStandardized: false,
          message: res.message || "We couldn't validate this address. Please check your street, city, state, and ZIP code.",
        });
        setUpsRates([]);
        setSelectedServiceCode("");
      }
    } catch (err: any) {
      setValidationState({
        isValidated: true,
        isValid: false,
        isStandardized: false,
        message: "We couldn't validate this address right now. Please check your address and try again.",
      });
      setUpsRates([]);
      setSelectedServiceCode("");
    } finally {
      setIsValidatingAddress(false);
    }
  };

  // STEP 4: Fetch UPS Shipping Rates
  const fetchUpsRates = async (
    targetStreet: string,
    targetSuite: string | undefined,
    targetCity: string,
    targetState: string,
    targetZip: string
  ) => {
    setIsLoadingRates(true);
    setRatesError(null);

    const cartPayload =
      items.length > 0
        ? items.map((i) => ({
            productId: i.product.id,
            sizeName: i.size.name,
            quantity: i.quantity,
          }))
        : [
            {
              productId: "500ml",
              sizeName: "500ml",
              quantity: 2,
            },
          ];

    try {
      const res = await ApiClient.shipping.getRates({
        destination: {
          street: targetStreet,
          suite: targetSuite,
          city: targetCity,
          state: targetState,
          zip: targetZip,
          recipientName: fullName.trim() || "Customer",
          businessName: businessName || undefined,
        },
        items: cartPayload,
      });

      if (res.success && Array.isArray(res.rates) && res.rates.length > 0) {
        setUpsRates(res.rates);
        setPackageInfo({
          totalWeight: res.packageInfo.totalWeight,
          weightUnit: res.packageInfo.weightUnit,
          packageCount: res.packageInfo.packageCount,
        });
        // Select lowest-priced service by default (first returned in sorted list)
        setSelectedServiceCode(res.rates[0].serviceCode);
      } else {
        setUpsRates([]);
        setSelectedServiceCode("");
        setRatesError(
          res.message ||
            "We couldn't find a UPS shipping option for this address. Please verify your shipping address or try again."
        );
      }
    } catch (err: any) {
      setUpsRates([]);
      setSelectedServiceCode("");
      setRatesError(
        err.message ||
          "We couldn't calculate shipping rates right now. Please check your address and try again."
      );
    } finally {
      setIsLoadingRates(false);
    }
  };

  // Accept suggested address
  const handleUseSuggestedAddress = () => {
    if (validationState.suggested) {
      const s = validationState.suggested;
      setStreet(s.street);
      setSuite(s.suite || "");
      setCity(s.city);
      setState(s.state);
      setZip(s.zip);

      setValidationState((prev) => ({
        ...prev,
        isStandardized: false,
        message: "Suggested address applied and verified.",
      }));

      // Calculate rates with standardized address
      fetchUpsRates(s.street, s.suite, s.city, s.state, s.zip);
    }
  };

  // Keep entered address
  const handleKeepEnteredAddress = () => {
    setValidationState((prev) => ({
      ...prev,
      isStandardized: false,
      message: "Address confirmed.",
    }));
    fetchUpsRates(street, suite, city, state, zip);
  };

  // STEP 5: Save Shipping Selection & Prepare Order
  const handleSaveShippingAndProceed = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const errors: Record<string, string> = {};
    const cleanName = sanitizeText(fullName, 100);
    const cleanEmail = sanitizeEmail(email);
    const cleanPhone = sanitizePhone(phone);
    const cleanStreet = sanitizeText(street, 100);
    const cleanCity = sanitizeText(city, 50);
    const cleanZip = sanitizeZip(zip);

    if (!cleanName) errors.fullName = "Full name is required";
    if (!cleanEmail || !isValidEmail(cleanEmail)) errors.email = "Valid email is required";
    if (!cleanPhone || !isValidPhone(cleanPhone)) errors.phone = "Valid 10-digit phone number is required";
    if (!cleanStreet) errors.street = "Street address is required";
    if (!cleanCity) errors.city = "City is required";
    if (!state) errors.state = "State is required";
    if (!cleanZip || !isValidZip(cleanZip)) errors.zip = "Valid 5-digit US ZIP code is required";

    if (!validationState.isValid) {
      errors.address = "Please validate your US shipping address before proceeding.";
    }

    if (!selectedServiceCode || !selectedRate) {
      errors.shipping = "Please select a UPS shipping option before proceeding.";
    }

    if (!zelleReferenceId.trim()) {
      errors.zelleReferenceId = "Please enter your Zelle reference / confirmation ID.";
    }

    if (Object.keys(errors).length > 0) {
      setCheckoutErrors(errors);
      return;
    }

    setCheckoutErrors({});
    setIsSubmitting(true);

    const nameParts = cleanName.split(/\s+/);
    const cleanFirst = nameParts[0] || cleanName;
    const cleanLast = nameParts.slice(1).join(" ") || "";

    const cartPayload =
      items.length > 0
        ? items.map((i) => ({
            productId: i.product.id,
            productName: i.product.name,
            image: i.product.image,
            sizeName: i.size.name,
            caseCount: i.size.caseCount,
            quantity: i.quantity,
            unitPrice: i.size.price,
            lineTotal: i.size.price * i.quantity,
          }))
        : [];

    try {
      // 1. Record snapshot with shipping selection
      let draftOrderId: string | undefined = undefined;
      try {
        const shipRes = await ApiClient.shipping.selectShipping({
          customer: {
            firstName: cleanFirst,
            lastName: cleanLast,
            email: cleanEmail,
            phone: cleanPhone,
            businessName: businessName.trim() || undefined,
          },
          shippingAddress: {
            street: cleanStreet,
            suite: suite ? sanitizeText(suite, 50) : undefined,
            city: cleanCity,
            state,
            zip: cleanZip,
            country: "United States",
          },
          items: cartPayload.map((c) => ({
            productId: c.productId,
            sizeName: c.sizeName,
            quantity: c.quantity,
          })),
          selectedServiceCode,
          taxExempt,
          resalePermitNumber: taxExempt ? resalePermitNumber : undefined,
        });

        if (shipRes?.success && shipRes?.orderId) {
          draftOrderId = shipRes.orderId;
        }
      } catch (shipErr) {
        console.warn("Shipping snapshot notice:", shipErr);
      }

      const finalOrderId = draftOrderId || `TB-${Math.floor(10000 + Math.random() * 90000)}`;

      // 2. Place order with Zelle payment in PENDING status
      const res = await ApiClient.orders.create({
        id: finalOrderId,
        fulfillmentType: "delivery",
        customer: {
          businessName: businessName.trim() || cleanName,
          contactName: cleanName,
          phone: cleanPhone,
          email: cleanEmail,
        },
        deliveryAddress: {
          street: cleanStreet,
          suite: suite ? sanitizeText(suite, 50) : undefined,
          city: cleanCity,
          state,
          zip: cleanZip,
        },
        taxExempt,
        resalePermitNumber: taxExempt ? resalePermitNumber : undefined,
        items: cartPayload,
        pricing: {
          subtotal,
          volumeDiscount: 0,
          deliveryFee: selectedRate ? selectedRate.rate : 0,
          tax,
          total: grandTotal,
        },
        paymentMethod: "zelle",
        paymentStatus: "pending",
        status: "pending",
        statusText: "Zelle Payment Pending Verification",
        shippingCarrier: "UPS",
        shippingService: selectedRate?.serviceName,
        shippingServiceCode: selectedRate?.serviceCode,
        shippingAmount: selectedRate?.rate || 0,
        rateQuoteReference: selectedRate?.rateQuoteReference,
        zellePhone: "(661) 805-9358",
        zelleReferenceId: zelleReferenceId.trim(),
        zelleSenderName: zelleSenderName.trim() || cleanName,
      });

      if (res.success || res.order) {
        const orderData = res.order || { id: finalOrderId };

        // Save order locally in customerStore for instant account and invoice access
        const localOrder: CommercialOrder = {
          id: orderData.id || finalOrderId,
          date: new Date().toISOString(),
          status: "pending",
          statusText: "Zelle Payment Pending Verification",
          estimatedDelivery: selectedRate?.estimatedDelivery || "Calculated at Dispatch",
          fulfillmentType: "delivery",
          customer: {
            businessName: businessName || cleanName,
            contactName: cleanName,
            phone: cleanPhone,
            email: cleanEmail,
          },
          deliveryAddress: {
            street: cleanStreet,
            suite: suite || undefined,
            city: cleanCity,
            state,
            zip: cleanZip,
          },
          taxExempt,
          resalePermitNumber: taxExempt ? resalePermitNumber : undefined,
          items: cartPayload,
          pricing: {
            subtotal,
            volumeDiscount: 0,
            deliveryFee: selectedRate ? selectedRate.rate : 0,
            tax,
            total: grandTotal,
          },
          paymentMethod: "zelle",
          paymentStatus: "pending",
          zelleDetails: {
            recipientPhone: "(661) 805-9358",
            recipientName: "The Takeout Box",
            referenceId: zelleReferenceId.trim(),
            senderName: zelleSenderName.trim() || cleanName,
          },
          shippingCarrier: "UPS",
          shippingService: selectedRate?.serviceName,
          shippingServiceCode: selectedRate?.serviceCode,
          shippingAmount: selectedRate?.rate,
        };

        saveOrder(localOrder);

        // Auto-save address to user address book
        saveAddress({
          id: selectedAddressId && selectedAddressId.startsWith("addr-") ? selectedAddressId : `addr-${Date.now()}`,
          nickname: businessName || "Primary Delivery Location",
          recipientName: cleanName,
          phone: cleanPhone,
          street: cleanStreet,
          suite: suite || undefined,
          city: cleanCity,
          state,
          zip: cleanZip,
          isDefault: savedAddresses.length === 0,
        });

        // Clear shopping cart
        clearCart();

        // Redirect to order success confirmation page
        router.push(`/order-success?orderId=${localOrder.id}`);
      } else {
        setCheckoutErrors({ form: res.message || "Failed to place order." });
      }
    } catch (err: any) {
      setCheckoutErrors({ form: err.message || "An unexpected error occurred while placing your order." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.checkoutPage}>
      {/* Header */}
      <header className={styles.checkoutHeader}>
        <div className={styles.headerContainer}>
          <div className={styles.headerInner}>
            <Link href="/" className={styles.logoLink}>
              <Image
                src="/images/takeout-logo.png"
                alt="The Takeout Box Restaurant Supply"
                width={150}
                height={40}
                className={styles.logoImg}
                priority
              />
            </Link>

            <div className={styles.headerRight}>
              <Link href="/cart" className={styles.backToCartBtn}>
                <ArrowLeft size={14} /> Back to Cart
              </Link>
              <div className={styles.secureBadge}>
                <ShieldCheck size={14} />
                <span>USA Domestic UPS Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.mainContainer}>
        <div className={styles.checkoutContainer}>
          {/* Order Saved / Phase Confirmation Banner */}
          {savedOrderResult && (
            <div className={styles.orderSuccessBanner} style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <CheckCircle2 size={20} color="#16A34A" />
                <div>
                  <h3 style={{ margin: 0, fontSize: 15, color: "#166534", fontWeight: 700 }}>
                    UPS Shipping Confirmed for Order #{savedOrderResult.orderId}
                  </h3>
                  <p style={{ margin: "2px 0 0 0", fontSize: 12.5, color: "#15803D" }}>
                    Your shipping information and selected rate have been saved to the database.
                  </p>
                </div>
              </div>

              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #BBF7D0",
                  borderRadius: 8,
                  padding: 10,
                  marginTop: 8,
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                  gap: 8,
                  fontSize: 12,
                }}
              >
                <div>
                  <span style={{ color: "#64748B", display: "block" }}>Carrier &amp; Service</span>
                  <strong style={{ color: "#0F172A" }}>
                    UPS — {savedOrderResult.selectedOption?.serviceName}
                  </strong>
                </div>
                <div>
                  <span style={{ color: "#64748B", display: "block" }}>Shipping Cost</span>
                  <strong style={{ color: "#0F172A" }}>
                    ${Number(savedOrderResult.totals?.shipping).toFixed(2)} USD
                  </strong>
                </div>
                <div>
                  <span style={{ color: "#64748B", display: "block" }}>Shipment Status</span>
                  <strong style={{ color: "#2563EB" }}>RATE_SELECTED</strong>
                </div>
                <div>
                  <span style={{ color: "#64748B", display: "block" }}>Payment Status</span>
                  <strong style={{ color: "#D97706" }}>NOT_STARTED (Next Phase)</strong>
                </div>
              </div>

              <div style={{ marginTop: 8, fontSize: 11.5, color: "#475569" }}>
                <em>
                  Note: Payment Gateway integration is scheduled for the next phase. The order is securely stored
                  with authoritative UPS rate snapshots ready for payment processing.
                </em>
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <Link
                  href={`/account`}
                  className={styles.btnUseSuggested}
                  style={{ textDecoration: "none", display: "inline-block" }}
                >
                  View in My Orders
                </Link>
                <Link
                  href="/"
                  className={styles.btnKeepEntered}
                  style={{ textDecoration: "none", display: "inline-block" }}
                >
                  Return to Store
                </Link>
              </div>
            </div>
          )}

          <div className={styles.checkoutGrid}>
            {/* Left Column: Form Sections */}
            <div className={styles.formColumn}>
              {/* Section 1: Customer Contact Information */}
              <div className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIconRing}>
                    <Mail size={16} />
                  </div>
                  <div>
                    <h2 className={styles.sectionTitle}>1. Customer Information</h2>
                    <p className={styles.sectionSubtitle}>
                      Order confirmation, shipment tracking alerts, and delivery receipts
                    </p>
                  </div>
                </div>

                <div className={styles.formRow2}>
                  <div className={styles.formGroup}>
                    <label className={styles.fieldLabel}>Full Name *</label>
                    <input
                      type="text"
                      required
                      className={styles.inputField}
                      placeholder="e.g. John Smith"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (checkoutErrors.fullName) setCheckoutErrors({ ...checkoutErrors, fullName: "" });
                      }}
                      onBlur={() => setFullName((prev) => sanitizeText(prev, 100))}
                    />
                    {checkoutErrors.fullName && (
                      <span style={{ color: "#DC2626", fontSize: 12, marginTop: 3, display: "block" }}>
                        {checkoutErrors.fullName}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.fieldLabel}>Email Address *</label>
                    <input
                      type="email"
                      required
                      className={styles.inputField}
                      placeholder="e.g. orders@restaurant.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (checkoutErrors.email) setCheckoutErrors({ ...checkoutErrors, email: "" });
                      }}
                      onBlur={() => setEmail((prev) => sanitizeEmail(prev))}
                    />
                    {checkoutErrors.email && (
                      <span style={{ color: "#DC2626", fontSize: 12, marginTop: 3, display: "block" }}>
                        {checkoutErrors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.formRow2}>
                  <div className={styles.formGroup} style={{ marginBottom: 0 }}>
                    <label className={styles.fieldLabel}>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      className={styles.inputField}
                      placeholder="e.g. (661) 205-9667"
                      value={phone}
                      onChange={(e) => {
                        const val = sanitizePhone(e.target.value);
                        setPhone(val);
                        if (checkoutErrors.phone) setCheckoutErrors({ ...checkoutErrors, phone: "" });
                      }}
                    />
                    {checkoutErrors.phone && (
                      <span style={{ color: "#DC2626", fontSize: 12, marginTop: 3, display: "block" }}>
                        {checkoutErrors.phone}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup} style={{ marginBottom: 0 }}>
                    <label className={styles.fieldLabel}>Business / Restaurant Name (Optional)</label>
                    <input
                      type="text"
                      className={styles.inputField}
                      placeholder="e.g. Acme Grill &amp; Bar"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      onBlur={() => setBusinessName((prev) => sanitizeText(prev, 100))}
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: US Shipping Address */}
              <div className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIconRing}>
                    <MapPin size={16} />
                  </div>
                  <div>
                    <h2 className={styles.sectionTitle}>2. Shipping Address</h2>
                    <p className={styles.sectionSubtitle}>
                      USA domestic delivery destination for UPS Courier Dispatch
                    </p>
                  </div>
                </div>

                {/* Saved Address Selector if available */}
                {savedAddresses.length > 0 && (
                  <div className={styles.formGroup} style={{ marginBottom: 12 }}>
                    <label className={styles.fieldLabel}>Saved Delivery Locations</label>
                    <select
                      className={styles.inputField}
                      value={selectedAddressId}
                      onChange={(e) => handleAddressSelect(e.target.value)}
                    >
                      {savedAddresses.map((addr) => (
                        <option key={addr.id} value={addr.id}>
                          {addr.nickname} — {addr.street}, {addr.city} {addr.zip}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Address Line 1 */}
                <div className={styles.formGroup}>
                  <label className={styles.fieldLabel}>Address Line 1 (Street Address) *</label>
                  <input
                    type="text"
                    required
                    className={styles.inputField}
                    placeholder="e.g. 123 Main Street"
                    value={street}
                    onChange={(e) => {
                      setStreet(e.target.value);
                      handleAddressFieldChange();
                      if (checkoutErrors.street) setCheckoutErrors({ ...checkoutErrors, street: "" });
                    }}
                    onBlur={() => setStreet((prev) => sanitizeText(prev, 100))}
                  />
                  {checkoutErrors.street && (
                    <span style={{ color: "#DC2626", fontSize: 12, marginTop: 4, display: "block" }}>
                      {checkoutErrors.street}
                    </span>
                  )}
                </div>

                {/* Address Line 2 */}
                <div className={styles.formGroup}>
                  <label className={styles.fieldLabel}>
                    Address Line 2 (Apartment, Suite, Unit, Dock - Optional)
                  </label>
                  <input
                    type="text"
                    className={styles.inputField}
                    placeholder="e.g. Suite 204, Unit B, Dock #4"
                    value={suite}
                    onChange={(e) => {
                      setSuite(e.target.value);
                      handleAddressFieldChange();
                    }}
                    onBlur={() => setSuite((prev) => sanitizeText(prev, 50))}
                  />
                </div>

                {/* City, State, ZIP */}
                <div className={styles.formRow3}>
                  <div className={styles.formGroup}>
                    <label className={styles.fieldLabel}>City *</label>
                    <input
                      type="text"
                      required
                      className={styles.inputField}
                      placeholder="e.g. Dallas"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        handleAddressFieldChange();
                        if (checkoutErrors.city) setCheckoutErrors({ ...checkoutErrors, city: "" });
                      }}
                      onBlur={() => setCity((prev) => sanitizeText(prev, 50))}
                    />
                    {checkoutErrors.city && (
                      <span style={{ color: "#DC2626", fontSize: 12, marginTop: 4, display: "block" }}>
                        {checkoutErrors.city}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.fieldLabel}>State *</label>
                    <select
                      required
                      className={styles.inputField}
                      value={state}
                      onChange={(e) => {
                        setState(e.target.value);
                        handleAddressFieldChange();
                        if (checkoutErrors.state) setCheckoutErrors({ ...checkoutErrors, state: "" });
                      }}
                    >
                      {US_STATES.map((s) => (
                        <option key={s.code} value={s.code}>
                          {s.name} — {s.code}
                        </option>
                      ))}
                    </select>
                    {checkoutErrors.state && (
                      <span style={{ color: "#DC2626", fontSize: 12, marginTop: 4, display: "block" }}>
                        {checkoutErrors.state}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.fieldLabel}>ZIP Code *</label>
                    <input
                      type="text"
                      required
                      className={styles.inputField}
                      placeholder="e.g. 75001"
                      value={zip}
                      onChange={(e) => {
                        const val = sanitizeZip(e.target.value);
                        setZip(val);
                        handleAddressFieldChange();
                        if (checkoutErrors.zip) setCheckoutErrors({ ...checkoutErrors, zip: "" });
                      }}
                    />
                    {checkoutErrors.zip && (
                      <span style={{ color: "#DC2626", fontSize: 12, marginTop: 4, display: "block" }}>
                        {checkoutErrors.zip}
                      </span>
                    )}
                  </div>
                </div>

                {/* Address Validation Button & Country Tag */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6, flexWrap: "wrap", gap: 8 }}>
                  <button
                    type="button"
                    onClick={handleValidateAddress}
                    disabled={isValidatingAddress}
                    className={styles.validateAddressBtn}
                  >
                    {isValidatingAddress ? (
                      <>
                        <span className="spinner" /> Validating with UPS...
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={14} /> Validate Address
                      </>
                    )}
                  </button>
                  <span style={{ fontSize: 11.5, color: "#64748B" }}>
                    USA Domestic Delivery • United States
                  </span>
                </div>

                {/* Address Validation Status Messages */}
                {validationState.isValidated && validationState.isValid && !validationState.isStandardized && (
                  <div className={styles.validationBannerSuccess}>
                    <CheckCircle2 size={16} />
                    <span>✓ Address verified with UPS Street-Level Validation</span>
                  </div>
                )}

                {validationState.isValidated && validationState.isValid && validationState.isStandardized && validationState.suggested && (
                  <div className={styles.validationBannerWarning}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#1D4ED8", fontWeight: 600 }}>
                      <AlertCircle size={16} />
                      <span>We found a standardized version of your address.</span>
                    </div>

                    <div className={styles.addressComparisonGrid}>
                      <div className={styles.addressCompareBox}>
                        <div className={styles.addressCompareTitle}>Entered Address</div>
                        <div>{street} {suite}</div>
                        <div>{city}, {state} {zip}</div>
                      </div>
                      <div className={styles.addressCompareBox} style={{ borderColor: "#3B82F6", background: "#F8FAFC" }}>
                        <div className={styles.addressCompareTitle} style={{ color: "#2563EB" }}>
                          Suggested (UPS Standardized)
                        </div>
                        <div>{validationState.suggested.street} {validationState.suggested.suite}</div>
                        <div>{validationState.suggested.city}, {validationState.suggested.state} {validationState.suggested.zip}</div>
                      </div>
                    </div>

                    <div className={styles.addressCompareActions}>
                      <button
                        type="button"
                        onClick={handleUseSuggestedAddress}
                        className={styles.btnUseSuggested}
                      >
                        Use Suggested Address
                      </button>
                      <button
                        type="button"
                        onClick={handleKeepEnteredAddress}
                        className={styles.btnKeepEntered}
                      >
                        Keep Entered Address
                      </button>
                    </div>
                  </div>
                )}

                {validationState.isValidated && !validationState.isValid && (
                  <div className={styles.validationBannerError}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600 }}>
                      <AlertCircle size={16} />
                      <span>We couldn&apos;t validate this address.</span>
                    </div>
                    <p style={{ margin: "2px 0 0 0" }}>
                      {validationState.message || "Please check your street address, city, state, and 5-digit ZIP code."}
                    </p>
                  </div>
                )}

                {checkoutErrors.address && (
                  <span style={{ color: "#DC2626", fontSize: 12, marginTop: 8, display: "block" }}>
                    {checkoutErrors.address}
                  </span>
                )}
              </div>

              {/* Section 3: UPS Shipping Options */}
              <div className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIconRing}>
                    <Truck size={16} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <h2 className={styles.sectionTitle}>3. Shipping Method</h2>
                      <div className={styles.upsBadge}>
                        <span>UPS® COURIER</span>
                      </div>
                    </div>
                    <p className={styles.sectionSubtitle}>
                      Live rates calculated from origin depot (Bakersfield, CA 93313)
                    </p>
                  </div>
                </div>

                {/* Package calculation info if available */}
                {packageInfo && (
                  <div className={styles.packageInfoTag}>
                    <Package size={13} />
                    <span>
                      Total Shipment: {packageInfo.totalWeight} lbs • {packageInfo.packageCount} Package{packageInfo.packageCount > 1 ? "s" : ""}
                    </span>
                  </div>
                )}

                {/* State: Not yet validated */}
                {!validationState.isValid && !isLoadingRates && (
                  <div className={styles.shippingEmptyNotice}>
                    Enter your US delivery address and click <strong>Validate Address</strong> to calculate live UPS shipping rates.
                  </div>
                )}

                {/* State: Loading rates */}
                {isLoadingRates && (
                  <div className={styles.shippingEmptyNotice} style={{ background: "#FEF2F2", borderColor: "#FECACA", color: "#991B1B" }}>
                    <span className="spinner" style={{ marginRight: 8 }} />
                    Calculating live UPS shipping options...
                  </div>
                )}

                {/* State: Rates error */}
                {ratesError && !isLoadingRates && (
                  <div className={styles.validationBannerError}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600 }}>
                      <AlertCircle size={16} />
                      <span>Rate Calculation Notice</span>
                    </div>
                    <p style={{ margin: "2px 0 0 0" }}>{ratesError}</p>
                  </div>
                )}

                {/* State: UPS Rates List */}
                {upsRates.length > 0 && !isLoadingRates && (
                  <div className={styles.shippingOptionsGrid}>
                    {upsRates.map((option) => {
                      const isSelected = selectedServiceCode === option.serviceCode;
                      return (
                        <div
                          key={option.serviceCode}
                          className={`${styles.shippingOptionCard} ${isSelected ? styles.shippingOptionActive : ""}`}
                          onClick={() => setSelectedServiceCode(option.serviceCode)}
                        >
                          <div className={styles.shippingOptionLeft}>
                            <input
                              type="radio"
                              name="ups_shipping_option"
                              checked={isSelected}
                              onChange={() => setSelectedServiceCode(option.serviceCode)}
                              className={styles.shippingRadio}
                            />
                            <div>
                              <div className={styles.shippingServiceName}>
                                <span>{option.serviceName}</span>
                                {isSelected && (
                                  <CheckCircle2 size={15} color="#E51A1A" />
                                )}
                              </div>
                              <div className={styles.shippingServiceDelivery}>
                                {option.estimatedDelivery ? (
                                  <span>Estimated Delivery: {option.estimatedDelivery}</span>
                                ) : (
                                  <span>UPS Business Delivery</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className={styles.shippingRatePrice}>
                            ${option.rate.toFixed(2)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {checkoutErrors.shipping && (
                  <span style={{ color: "#DC2626", fontSize: 12, marginTop: 8, display: "block" }}>
                    {checkoutErrors.shipping}
                  </span>
                )}
              </div>

              {/* Section 4: Payment Method */}
              <div className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIconRing}>
                    <CreditCard size={15} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <h2 className={styles.sectionTitle}>4. Payment Method</h2>
                      <div className={styles.zelleBadge}>
                        <span>0% Processing Fee</span>
                      </div>
                    </div>
                    <p className={styles.sectionSubtitle}>
                      Direct business bank transfer via Zelle®
                    </p>
                  </div>
                </div>

                {/* Zelle Option Card */}
                <div
                  className={`${styles.zelleCard} ${paymentMethod === "zelle" ? styles.zelleCardActive : ""}`}
                  onClick={() => setPaymentMethod("zelle")}
                >
                  <div className={styles.zelleRadioRow}>
                    <div className={styles.zelleRadioLeft}>
                      <input
                        type="radio"
                        name="payment_method_option"
                        checked={paymentMethod === "zelle"}
                        onChange={() => setPaymentMethod("zelle")}
                        className={styles.zelleRadio}
                      />
                      <ZelleLogo size={28} />
                      <div>
                        <div className={styles.zelleTitleRow}>
                          <span className={styles.zelleTitle}>Zelle® Instant Bank Transfer</span>
                        </div>
                        <div className={styles.zelleSub}>
                          Pay directly via your bank&apos;s mobile app or Zelle app
                        </div>
                      </div>
                    </div>
                    <div className={styles.zelleBadge}>
                      Instant Verification
                    </div>
                  </div>

                  {/* Expanded Zelle Payment Details */}
                  {paymentMethod === "zelle" && (
                    <div className={styles.zelleExpandedPanel}>
                      {/* Top Header Box: Phone Number on Left, Total Amount on Right */}
                      <div className={styles.zellePayHeaderBox}>
                        <div className={styles.zelleRecipientMeta}>
                          <span className={styles.zelleLabelSmall}>Send Zelle Payment To</span>
                          <div className={styles.zellePhoneDisplay}>
                            <span>(661) 805-9358</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopyPhone();
                              }}
                              className={styles.zelleCopyBtn}
                              title="Copy Zelle mobile number"
                            >
                              {isCopiedPhone ? (
                                <>
                                  <Check size={12} color="#16A34A" /> Copied!
                                </>
                              ) : (
                                <>
                                  <Copy size={12} /> Copy
                                </>
                              )}
                            </button>
                          </div>
                          <span style={{ fontSize: 11, color: "#64748B" }}>
                            Recipient: <strong>The Takeout Box</strong>
                          </span>
                        </div>

                        <div className={styles.zelleAmountBox}>
                          <span className={styles.zelleLabelSmall}>Total Amount Due</span>
                          <div className={styles.zelleAmountValue}>
                            ${grandTotal.toFixed(2)}
                          </div>
                          <span className={styles.zelleAmountSub}>USD (Exact Total)</span>
                        </div>
                      </div>

                      {/* How to pay help toggle */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowZelleHelp((prev) => !prev);
                          }}
                          className={styles.zelleHelpToggleBtn}
                        >
                          <HelpCircle size={14} />
                          {showZelleHelp ? "Hide Instructions" : "How to pay with Zelle?"}
                          {showZelleHelp ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                        </button>
                        <span style={{ fontSize: 10.5, color: "#94A3B8" }}>
                          Step-by-step instructions
                        </span>
                      </div>

                      {/* Expandable Step-by-Step Instructions */}
                      {showZelleHelp && (
                        <div className={styles.zelleStepsContainer}>
                          <div className={styles.zelleStepItem}>
                            <span className={styles.zelleStepNumber}>1</span>
                            <div>
                              Open your mobile banking app (e.g. <strong>Chase, BofA, Wells Fargo, Citi, US Bank</strong>) or the Zelle® app.
                            </div>
                          </div>
                          <div className={styles.zelleStepItem}>
                            <span className={styles.zelleStepNumber}>2</span>
                            <div>
                              Select <strong>Send Money with Zelle®</strong> and enter our verified mobile number: <strong>(661) 805-9358</strong> (Business Name: <em>The Takeout Box</em>).
                            </div>
                          </div>
                          <div className={styles.zelleStepItem}>
                            <span className={styles.zelleStepNumber}>3</span>
                            <div>
                              Enter the exact order total of <strong>${grandTotal.toFixed(2)}</strong>.
                            </div>
                          </div>
                          <div className={styles.zelleStepItem}>
                            <span className={styles.zelleStepNumber}>4</span>
                            <div>
                              Confirm the payment and copy the <strong>Reference / Confirmation Number</strong> from your payment receipt.
                            </div>
                          </div>
                          <div className={styles.zelleStepItem}>
                            <span className={styles.zelleStepNumber}>5</span>
                            <div>
                              Paste your <strong>Reference ID</strong> in the box below and click <strong>Place Order with Zelle</strong>.
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Reference ID and Sender Name Inputs */}
                      <div className={styles.zelleReferenceContainer}>
                        <div className={styles.formRow2}>
                          <div className={styles.formGroup} style={{ marginBottom: 0 }}>
                            <label className={styles.fieldLabel}>
                              Zelle Reference / Confirmation ID *
                            </label>
                            <input
                              type="text"
                              required
                              className={styles.inputField}
                              placeholder="e.g. 1092837492 or Confirmation #"
                              value={zelleReferenceId}
                              onChange={(e) => {
                                setZelleReferenceId(e.target.value);
                                if (checkoutErrors.zelleReferenceId) {
                                  setCheckoutErrors({ ...checkoutErrors, zelleReferenceId: "" });
                                }
                              }}
                              onClick={(e) => e.stopPropagation()}
                            />
                            {checkoutErrors.zelleReferenceId && (
                              <span style={{ color: "#DC2626", fontSize: 12, marginTop: 3, display: "block" }}>
                                {checkoutErrors.zelleReferenceId}
                              </span>
                            )}
                          </div>

                          {/* Optional Sender Name */}
                          <div className={styles.formGroup} style={{ marginBottom: 0 }}>
                            <label className={styles.fieldLabel}>
                              Sender / Bank Account Name (Optional)
                            </label>
                            <input
                              type="text"
                              className={styles.inputField}
                              placeholder="e.g. Name on bank account"
                              value={zelleSenderName}
                              onChange={(e) => setZelleSenderName(e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        </div>

                        {/* Pending Order Notice */}
                        <div className={styles.zellePendingNoticeBox}>
                          <Clock size={15} style={{ flexShrink: 0, marginTop: 1, color: "#D97706" }} />
                          <div>
                            <strong>Order Placement Notice:</strong> Your order will be placed with <strong>PENDING</strong> status. Once our billing team verifies your Zelle transfer, the order is confirmed and scheduled for UPS courier dispatch.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Right Column: Order Summary */}
            <div className={styles.summaryColumn}>
              <div className={styles.summaryStickyWrapper}>
                <div className={styles.sectionCard}>
                  <h3 className={styles.sectionTitle} style={{ marginBottom: 14 }}>
                    Order Summary
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {/* Subtotal */}
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#475569" }}>
                      <span>Subtotal</span>
                      <span style={{ fontWeight: 600, color: "#0F172A" }}>${subtotal.toFixed(2)}</span>
                    </div>

                    {/* UPS Shipping */}
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#475569" }}>
                      <span>
                        UPS Shipping {selectedRate ? `(${selectedRate.serviceName})` : ""}
                      </span>
                      <span style={{ fontWeight: 600, color: selectedRate ? "#0F172A" : "#94A3B8" }}>
                        {selectedRate ? `$${selectedRate.rate.toFixed(2)}` : "Calculated below"}
                      </span>
                    </div>

                    {/* Tax */}
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#475569" }}>
                      <span>Tax</span>
                      <span style={{ fontWeight: 600, color: "#0F172A" }}>${tax.toFixed(2)}</span>
                    </div>

                    {/* Total */}
                    <div
                      style={{
                        borderTop: "1.5px solid #CBD5E1",
                        paddingTop: 10,
                        marginTop: 4,
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#0F172A",
                      }}
                    >
                      <span>Total (USD)</span>
                      <span style={{ color: "#E51A1A", fontSize: 18 }}>${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {checkoutErrors.form && (
                    <div className={styles.validationBannerError} style={{ marginTop: 10 }}>
                      <span>{checkoutErrors.form}</span>
                    </div>
                  )}

                  {/* Primary CTA Button */}
                  <div style={{ marginTop: 14 }}>
                    <button
                      type="button"
                      onClick={handleSaveShippingAndProceed}
                      disabled={isSubmitting || !validationState.isValid || !selectedServiceCode}
                      className={styles.placeOrderBtn}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner" /> Placing Order with Zelle...
                        </>
                      ) : (
                        <>
                          Place Order with Zelle • ${grandTotal.toFixed(2)} <CheckCircle2 size={16} />
                        </>
                      )}
                    </button>
                  </div>

                  <div className={styles.trustGuarantees}>
                    <div className={styles.trustItem}>
                      <ShieldCheck size={13} color="#16A34A" />
                      <span>Real-time UPS Street-level Address Verification</span>
                    </div>
                    <div className={styles.trustItem}>
                      <Clock size={13} color="#16A34A" />
                      <span>Live UPS Commercial Shipping Quotes</span>
                    </div>
                    <div className={styles.trustItem}>
                      <Package size={13} color="#16A34A" />
                      <span>Commercial Restaurant Supply Dispatch</span>
                    </div>
                    <div className={styles.trustItem}>
                      <Lock size={13} color="#7414CA" />
                      <span style={{ color: "#7414CA", fontWeight: 600 }}>Secure Zelle® Direct Bank Transfer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
