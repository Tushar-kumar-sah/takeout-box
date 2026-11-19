"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  User,
  MapPin,
  PackageCheck,
  LogOut,
  Upload,
  CheckCircle2,
  Plus,
  Trash2,
  Edit2,
  Star,
  Download,
  RotateCcw,
  ShieldCheck,
  Calendar,
  Building,
  Phone,
  Mail,
  FileText,
  X,
} from "lucide-react";
import styles from "./AccountPage.module.css";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useCart } from "../../context/CartContext";
import { PRODUCTS } from "../../data/products";
import { ApiClient } from "../../services/apiClient";
import {
  getStoredOrders,
  getStoredAddresses,
  getStoredProfile,
  DEFAULT_PROFILE,
  saveProfile,
  saveAddress,
  deleteAddress,
  CommercialOrder,
  CustomerAddress,
  CustomerProfile,
} from "../../data/customerStore";
import { OrderRatingModal } from "../../components/OrderRatingModal";
import {
  sanitizeText,
  sanitizePhone,
  sanitizeEmail,
  sanitizeMultilineText,
  sanitizeZip,
} from "../../utils/sanitize";
import { InvoiceDocument } from "../../components/InvoiceDocument";

function AccountPortalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawTab = searchParams.get("tab");
  const initialTab: "profile" | "addresses" | "orders" =
    rawTab === "addresses" || rawTab === "orders" || rawTab === "profile"
      ? rawTab
      : "profile";

  const [activeTab, setActiveTab] = useState<"profile" | "addresses" | "orders">(initialTab);

  // Tab change handler that updates URL query param
  const handleTabChange = (tab: "profile" | "addresses" | "orders") => {
    setActiveTab(tab);
    router.replace(`/account?tab=${tab}`, { scroll: false });
  };

  // Cart Context for 1-Click Reorders
  const { addToCart } = useCart();

  // Data States
  const [profile, setProfile] = useState<CustomerProfile>(DEFAULT_PROFILE);
  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const [orders, setOrders] = useState<CommercialOrder[]>([]);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");

  // Order History Pagination (2 orders per page per Requirement 4)
  const [ordersPage, setOrdersPage] = useState(1);
  const ORDERS_PER_PAGE = 2;
  const totalOrdersPages = Math.max(1, Math.ceil(orders.length / ORDERS_PER_PAGE));
  const paginatedOrders = orders.slice(
    (ordersPage - 1) * ORDERS_PER_PAGE,
    ordersPage * ORDERS_PER_PAGE
  );

  // Rating Modal State (User Requirement: "and in order history after delivery show rate so user can give rating")
  const [ratingModalOrderId, setRatingModalOrderId] = useState<string | null>(null);

  // Invoice Modal State
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<CommercialOrder | null>(null);

  // Address Modal State
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [newAddrNickname, setNewAddrNickname] = useState("");
  const [newAddrRecipient, setNewAddrRecipient] = useState("");
  const [newAddrPhone, setNewAddrPhone] = useState("");
  const [newAddrStreet, setNewAddrStreet] = useState("");
  const [newAddrSuite, setNewAddrSuite] = useState("");
  const [newAddrCity, setNewAddrCity] = useState("");
  const [newAddrState, setNewAddrState] = useState("CA");
  const [newAddrZip, setNewAddrZip] = useState("");
  const [newAddrNotes, setNewAddrNotes] = useState("");
  const [newAddrDefault, setNewAddrDefault] = useState(false);

  // File Upload Ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("takeout_jwt_token") : null;
    if (!token) {
      router.push("/login?redirect=/account");
      return;
    }

    const authRaw = typeof window !== "undefined" ? localStorage.getItem("takeout_user_auth") : null;
    let authObj: any = null;
    if (authRaw) {
      try {
        authObj = JSON.parse(authRaw);
      } catch {}
    }

    // Set initial values from active auth session
    const initialProfile: CustomerProfile = {
      name: authObj?.name || "",
      email: authObj?.email || "",
      phone: authObj?.phone || "",
      dob: authObj?.dob || "",
      restaurantName: authObj?.restaurantName || "",
      avatarUrl: authObj?.avatarUrl || "",
      businessType: authObj?.businessType || "",
    };

    setProfile(initialProfile);
    setAddresses(getStoredAddresses());
    setOrders(getStoredOrders());

    // Live MySQL Database Synchronization
    // 1. Fetch Profile directly from MySQL
    ApiClient.profile
      .get()
      .then((res) => {
        if (res.success && res.profile) {
          const rawDob = res.profile.dob || "";
          const formattedDob = rawDob.includes("T") ? rawDob.split("T")[0] : rawDob;
          const liveProfile: CustomerProfile = {
            name: res.profile.name ?? "",
            email: res.profile.email ?? "",
            phone: res.profile.phone ?? "",
            restaurantName: res.profile.restaurantName ?? "",
            dob: formattedDob,
            avatarUrl: res.profile.avatarUrl ?? "",
            businessType: res.profile.businessType || "",
          };
          setProfile(liveProfile);
          saveProfile(liveProfile);
        }
      })
      .catch((err) => {
        console.error("[Account] Failed to fetch live profile:", err);
      });

    // 2. Fetch Saved Addresses directly from MySQL
    ApiClient.addresses
      .list()
      .then((res) => {
        if (res.success && Array.isArray(res.addresses)) {
          if (res.addresses.length > 0) {
            setAddresses(res.addresses);
            try {
              localStorage.setItem("takeout_box_addresses", JSON.stringify(res.addresses));
              localStorage.setItem("takeout_addresses_v1", JSON.stringify(res.addresses));
            } catch {}
          } else {
            const localAddrs = getStoredAddresses();
            if (localAddrs.length > 0) {
              setAddresses(localAddrs);
              localAddrs.forEach((addr) => {
                ApiClient.addresses.create(addr).catch(() => {});
              });
            }
          }
        }
      })
      .catch((err) => {
        console.error("[Account] Failed to fetch live addresses:", err);
      });

    // 3. Fetch Orders directly from MySQL
    ApiClient.orders
      .list(1, 50)
      .then((res) => {
        if (res.success && Array.isArray(res.orders)) {
          if (res.orders.length > 0) {
            setOrders(res.orders);
            try {
              localStorage.setItem("takeout_box_orders", JSON.stringify(res.orders));
              localStorage.setItem("takeout_orders_v1", JSON.stringify(res.orders));
            } catch {}
          } else {
            const localOrders = getStoredOrders();
            if (localOrders.length > 0) {
              setOrders(localOrders);
            }
          }
        }
      })
      .catch((err) => {
        console.error("[Account] Failed to fetch live orders:", err);
      });
  }, [router]);

  // Update active tab if URL param changes
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && (tab === "orders" || tab === "profile" || tab === "addresses")) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Profile Picture Upload Handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result as string;
      const updated = { ...profile, avatarUrl: base64Url };
      setProfile(updated);
      saveProfile(updated);

      // Synchronize takeout_user_auth
      const authRaw = localStorage.getItem("takeout_user_auth");
      if (authRaw) {
        try {
          const auth = JSON.parse(authRaw);
          auth.avatarUrl = base64Url;
          localStorage.setItem("takeout_user_auth", JSON.stringify(auth));
        } catch {}
      }

      ApiClient.profile.updateAvatar(base64Url).catch(() => {});

      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("takeout_profile_updated"));
      window.dispatchEvent(new Event("takeout_auth_changed"));

      setSaveSuccessMsg("Profile photo uploaded successfully!");
      setTimeout(() => setSaveSuccessMsg(""), 3500);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    const updated = { ...profile, avatarUrl: "" };
    setProfile(updated);
    saveProfile(updated);

    const authRaw = localStorage.getItem("takeout_user_auth");
    if (authRaw) {
      try {
        const auth = JSON.parse(authRaw);
        auth.avatarUrl = "";
        localStorage.setItem("takeout_user_auth", JSON.stringify(auth));
      } catch {}
    }

    ApiClient.profile.updateAvatar("").catch(() => {});

    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("takeout_profile_updated"));
    window.dispatchEvent(new Event("takeout_auth_changed"));

    setSaveSuccessMsg("Profile photo removed. Name initial is now displayed.");
    setTimeout(() => setSaveSuccessMsg(""), 3500);
  };

  // Save Profile Changes
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("takeout_jwt_token");
    if (!token) {
      alert("Please sign in to save your profile changes.");
      router.push("/login?redirect=/account");
      return;
    }

    const cleanProfile: CustomerProfile = {
      ...profile,
      name: sanitizeText(profile.name, 80),
      restaurantName: sanitizeText(profile.restaurantName, 100),
      email: sanitizeEmail(profile.email),
      phone: sanitizePhone(profile.phone),
      dob: sanitizeText(profile.dob || "", 20),
    };

    try {
      const res = await ApiClient.profile.update(cleanProfile);
      if (res.success) {
        setProfile(cleanProfile);
        saveProfile(cleanProfile);

        // Synchronize takeout_user_auth
        const authRaw = localStorage.getItem("takeout_user_auth");
        if (authRaw) {
          try {
            const auth = JSON.parse(authRaw);
            auth.name = cleanProfile.name;
            auth.email = cleanProfile.email;
            auth.phone = cleanProfile.phone;
            auth.dob = cleanProfile.dob;
            auth.restaurantName = cleanProfile.restaurantName;
            auth.businessType = cleanProfile.businessType;
            localStorage.setItem("takeout_user_auth", JSON.stringify(auth));
          } catch {}
        }

        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new Event("takeout_profile_updated"));
        window.dispatchEvent(new Event("takeout_auth_changed"));

        setSaveSuccessMsg("Profile details saved to database successfully!");
        setTimeout(() => setSaveSuccessMsg(""), 3500);
      } else {
        alert("Failed to update profile: " + (res.message || "Unknown error"));
      }
    } catch (err: any) {
      alert("Error saving profile to database: " + err.message);
    }
  };

  // Add / Edit Address Submit
  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("takeout_jwt_token");
    if (!token) {
      alert("Please sign in to save addresses to your account.");
      router.push("/login?redirect=/account");
      return;
    }

    const addrPayload = {
      nickname: sanitizeText(newAddrNickname || "Delivery Address", 50),
      recipientName: sanitizeText(newAddrRecipient || profile.name, 80),
      phone: sanitizePhone(newAddrPhone || profile.phone),
      street: sanitizeText(newAddrStreet, 100),
      suite: sanitizeText(newAddrSuite, 50),
      city: sanitizeText(newAddrCity, 50),
      state: sanitizeText(newAddrState, 20),
      zip: sanitizeZip(newAddrZip),
      notes: sanitizeMultilineText(newAddrNotes, 300),
      isDefault: newAddrDefault,
    };

    try {
      if (editingAddressId) {
        await ApiClient.addresses.update(editingAddressId, addrPayload);
      } else {
        await ApiClient.addresses.create(addrPayload);
      }

      // Re-fetch fresh list directly from MySQL
      const res = await ApiClient.addresses.list();
      if (res.success && Array.isArray(res.addresses)) {
        setAddresses(res.addresses);
        try {
          localStorage.setItem("takeout_box_addresses", JSON.stringify(res.addresses));
        } catch {}
      }

      setIsAddressModalOpen(false);
      resetAddressForm();
      setSaveSuccessMsg("Address saved to database successfully!");
      setTimeout(() => setSaveSuccessMsg(""), 3500);
    } catch (err: any) {
      alert("Error saving address to database: " + err.message);
    }
  };

  const openEditAddress = (addr: CustomerAddress) => {
    setEditingAddressId(addr.id);
    setNewAddrNickname(addr.nickname);
    setNewAddrRecipient(addr.recipientName);
    setNewAddrPhone(addr.phone);
    setNewAddrStreet(addr.street);
    setNewAddrSuite(addr.suite || "");
    setNewAddrCity(addr.city);
    setNewAddrState(addr.state);
    setNewAddrZip(addr.zip);
    setNewAddrNotes(addr.notes || "");
    setNewAddrDefault(addr.isDefault);
    setIsAddressModalOpen(true);
  };

  const handleDeleteAddress = async (id: string) => {
    try {
      await ApiClient.addresses.delete(id);
      const res = await ApiClient.addresses.list();
      if (res.success && Array.isArray(res.addresses)) {
        setAddresses(res.addresses);
        try {
          localStorage.setItem("takeout_box_addresses", JSON.stringify(res.addresses));
        } catch {}
      }
    } catch (err: any) {
      console.error("Failed to delete address:", err);
    }
  };

  const resetAddressForm = () => {
    setEditingAddressId(null);
    setNewAddrNickname("");
    setNewAddrRecipient("");
    setNewAddrPhone("");
    setNewAddrStreet("");
    setNewAddrSuite("");
    setNewAddrCity("");
    setNewAddrState("CA");
    setNewAddrZip("");
    setNewAddrNotes("");
    setNewAddrDefault(false);
  };

  // 1-Click Reorder Action
  const handleReorder = (order: CommercialOrder) => {
    order.items.forEach((item) => {
      const matchedProd = PRODUCTS.find((p) => p.id === item.productId);
      if (matchedProd) {
        const matchedSize =
          matchedProd.sizes.find((s) => s.name === item.sizeName) ||
          matchedProd.sizes[0];
        addToCart(matchedProd, matchedSize, item.quantity);
      }
    });
    router.push("/cart");
  };

  // Logout Handler
  const handleLogout = () => {
    try {
      localStorage.removeItem("takeout_user_auth");
      localStorage.removeItem("takeout_jwt_token");
      localStorage.removeItem("takeout_refresh_token");
      localStorage.removeItem("takeout_token_expiry");
      localStorage.removeItem("takeout_last_activity");
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("takeout_profile_updated"));
      window.dispatchEvent(new Event("takeout_auth_changed"));
    } catch (e) {
      console.error(e);
    }
    router.push("/login");
  };

  return (
    <div className={styles.accountPage}>
      <Header
        searchQuery=""
        onSearchChange={() => {}}
        onSelectCategory={() => {}}
      />

      {/* Rating & Review Popup Modal */}
      {ratingModalOrderId && (
        <OrderRatingModal
          orderId={ratingModalOrderId}
          isOpen={true}
          orderStatus="delivered"
          onClose={() => {
            setRatingModalOrderId(null);
            setOrders(getStoredOrders());
          }}
          onSubmitSuccess={() => {
            setOrders(getStoredOrders());
          }}
        />
      )}

      {/* Invoice Document Modal */}
      {selectedInvoiceOrder && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedInvoiceOrder(null)}
        >
          <div
            style={{
              maxWidth: 860,
              width: "100%",
              maxHeight: "92vh",
              overflowY: "auto",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ textAlign: "right", marginBottom: 8 }}>
              <button
                type="button"
                onClick={() => setSelectedInvoiceOrder(null)}
                style={{
                  background: "#0F172A",
                  color: "#FFFFFF",
                  border: "none",
                  padding: "6px 14px",
                  borderRadius: 9999,
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                ✕ Close Invoice
              </button>
            </div>
            <InvoiceDocument order={selectedInvoiceOrder} showActions={true} />
          </div>
        </div>
      )}

      <main className={styles.mainContainer}>
        <div className="container">
          <div className={styles.portalGrid}>
            {/* Sidebar Column */}
            <aside className={styles.sidebarCard}>
              <div className={styles.profileCardMini}>
                <div className={styles.avatarRing}>
                  {profile.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      className={styles.avatarImg}
                    />
                  ) : (
                    <span>{(profile.name?.trim()?.charAt(0) || "U").toUpperCase()}</span>
                  )}
                </div>
                <h3 className={styles.userName}>{profile.name}</h3>
                {profile.restaurantName && <p className={styles.userBusiness}>{profile.restaurantName}</p>}
                {profile.email && <span className={styles.userPhone} style={{ display: "block", marginBottom: 2 }}>{profile.email}</span>}
                {profile.phone && <span className={styles.userPhone} style={{ display: "block", marginBottom: 2 }}>{profile.phone}</span>}
                {profile.dob && <span className={styles.userPhone} style={{ display: "block", fontSize: 11, color: "#94A3B8" }}>DOB: {profile.dob}</span>}
              </div>

              {/* Sidebar Navigation in exact order requested by user:
                  1. Edit Profile
                  2. Saved Address
                  3. Order History
                  4. Log Out */}
              <nav className={styles.sidebarNav}>
                <button
                  type="button"
                  className={`${styles.navBtn} ${
                    activeTab === "profile" ? styles.navBtnActive : ""
                  }`}
                  onClick={() => handleTabChange("profile")}
                >
                  <User size={18} />
                  <span>Edit Profile</span>
                </button>

                <button
                  type="button"
                  className={`${styles.navBtn} ${
                    activeTab === "addresses" ? styles.navBtnActive : ""
                  }`}
                  onClick={() => handleTabChange("addresses")}
                >
                  <MapPin size={18} />
                  <span>Saved Address</span>
                </button>

                <button
                  type="button"
                  className={`${styles.navBtn} ${
                    activeTab === "orders" ? styles.navBtnActive : ""
                  }`}
                  onClick={() => handleTabChange("orders")}
                >
                  <PackageCheck size={18} />
                  <span>Order History</span>
                </button>

                {/* Logout Button per user requirement */}
                <button
                  type="button"
                  className={styles.logoutBtn}
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                  <span>Log Out</span>
                </button>
              </nav>
            </aside>

            {/* Content Column */}
            <section className={styles.contentPanel}>
              {saveSuccessMsg && (
                <div className={styles.savedAlert}>
                  <CheckCircle2 size={18} color="#16A34A" />
                  <span>{saveSuccessMsg}</span>
                </div>
              )}

              {/* ========================================================
                  TAB 1: EDIT PROFILE
                  Upload profile picture, Email ID, Date of Birth (DOB)
                  ======================================================== */}
              {activeTab === "profile" && (
                <div>
                  <div className={styles.panelHeader}>
                    <div>
                      <h2 className={styles.panelTitle}>Edit Commercial Profile</h2>
                      <p className={styles.panelSub}>
                        Update your restaurant details, contact email, birthday, and avatar
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSaveProfile}>
                    {/* Profile Picture Upload Section */}
                    <div className={styles.avatarUploadSection}>
                      <div className={styles.uploadAvatarRing}>
                        {profile.avatarUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={profile.avatarUrl}
                            alt={profile.name}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        ) : (
                          <span>{(profile.name?.trim()?.charAt(0) || "U").toUpperCase()}</span>
                        )}
                      </div>

                      <div className={styles.uploadActions}>
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handlePhotoUpload}
                        />
                        <button
                          type="button"
                          className={styles.uploadBtn}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload size={14} />
                          <span>Upload Profile Picture</span>
                        </button>

                        {profile.avatarUrl && (
                          <button
                            type="button"
                            className={styles.removePhotoBtn}
                            onClick={handleRemovePhoto}
                          >
                            Remove Photo
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Profile Fields */}
                    <div className={styles.formGrid2}>
                      <div className={styles.formGroup}>
                        <label className={styles.fieldLabel}>Full Name *</label>
                        <input
                          type="text"
                          required
                          className={styles.inputField}
                          value={profile.name}
                          onChange={(e) =>
                            setProfile({ ...profile, name: e.target.value })
                          }
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.fieldLabel}>Email ID *</label>
                        <input
                          type="email"
                          required
                          className={styles.inputField}
                          value={profile.email}
                          onChange={(e) =>
                            setProfile({ ...profile, email: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className={styles.formGrid2}>
                      {/* Date of Birth (DOB) Field as explicitly requested */}
                      <div className={styles.formGroup}>
                        <label className={styles.fieldLabel}>
                          Date of Birth (DOB) *
                        </label>
                        <input
                          type="date"
                          className={styles.inputField}
                          value={profile.dob}
                          onChange={(e) =>
                            setProfile({ ...profile, dob: e.target.value })
                          }
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.fieldLabel}>Mobile Number</label>
                        <input
                          type="tel"
                          className={styles.inputField}
                          value={profile.phone}
                          onChange={(e) =>
                            setProfile({ ...profile, phone: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className={styles.formGrid2}>
                      <div className={styles.formGroup}>
                        <label className={styles.fieldLabel}>Restaurant / Business Name</label>
                        <input
                          type="text"
                          className={styles.inputField}
                          value={profile.restaurantName}
                          onChange={(e) =>
                            setProfile({ ...profile, restaurantName: e.target.value })
                          }
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.fieldLabel}>Food Service Category</label>
                        <select
                          className={styles.inputField}
                          value={profile.businessType || ""}
                          onChange={(e) =>
                            setProfile({ ...profile, businessType: e.target.value })
                          }
                        >
                          <option value="">Select</option>
                          <option value="Restaurant">Restaurant</option>
                          <option value="Mexican Restaurant & Taqueria">Mexican Restaurant &amp; Taqueria</option>
                          <option value="Food Truck / Mobile Kitchen">Food Truck / Mobile Kitchen</option>
                          <option value="Bakery & Delicatessen">Bakery &amp; Delicatessen</option>
                          <option value="Coffee Shop">Coffee Shop</option>
                          <option value="Barbecue & Smokehouse">Barbecue &amp; Smokehouse</option>
                          <option value="Catering & Event Dining">Catering &amp; Event Dining</option>
                          <option value="Ghost / Cloud Kitchen">Ghost / Cloud Kitchen</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ marginTop: 24 }}>
                      <button type="submit" className={styles.saveChangesBtn}>
                        <CheckCircle2 size={16} />
                        <span>Save Profile Changes</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* ========================================================
                  TAB 2: ADD & MANAGE ADDRESSES
                  ======================================================== */}
              {activeTab === "addresses" && (
                <div>
                  <div className={styles.panelHeader}>
                    <div>
                      <h2 className={styles.panelTitle}>Saved Addresses</h2>
                      <p className={styles.panelSub}>
                        Manage delivery addresses for your restaurant and business locations
                      </p>
                    </div>
                    <button
                      type="button"
                      className={styles.addAddressBtn}
                      onClick={() => {
                        resetAddressForm();
                        setIsAddressModalOpen(true);
                      }}
                    >
                      <Plus size={15} />
                      <span>Add Address</span>
                    </button>
                  </div>

                  <div className={styles.addressesGrid}>
                    {addresses.map((addr) => (
                      <div key={addr.id} className={styles.addressCard}>
                        <div className={styles.addressHeader}>
                          <span className={styles.addressNickname}>{addr.nickname}</span>
                          {addr.isDefault && (
                            <span className={styles.defaultBadge}>Default</span>
                          )}
                        </div>

                        <div className={styles.addressText}>
                          <strong>{addr.recipientName}</strong> ({addr.phone})<br />
                          {addr.street} {addr.suite}<br />
                          {addr.city}, {addr.state} {addr.zip}
                        </div>

                        {addr.notes && (
                          <div className={styles.addressNotes}>
                            <strong>Delivery Note:</strong> {addr.notes}
                          </div>
                        )}

                        <div className={styles.addressActions}>
                          <button
                            type="button"
                            className={styles.addrActionBtn}
                            onClick={() => openEditAddress(addr)}
                          >
                            <Edit2 size={13} />
                            <span>Edit</span>
                          </button>

                          <button
                            type="button"
                            className={`${styles.addrActionBtn} ${styles.deleteAddrBtn}`}
                            onClick={() => handleDeleteAddress(addr.id)}
                          >
                            <Trash2 size={13} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add / Edit Address Modal */}
                  {isAddressModalOpen && (
                    <div
                      className={styles.modalOverlay}
                      onClick={() => setIsAddressModalOpen(false)}
                    >
                      <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 20,
                          }}
                        >
                          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
                            {editingAddressId ? "Edit Address" : "Add Address"}
                          </h3>
                          <button
                            type="button"
                            onClick={() => setIsAddressModalOpen(false)}
                            style={{ background: "none", border: "none", cursor: "pointer" }}
                          >
                            <X size={18} />
                          </button>
                        </div>

                        <form onSubmit={handleSaveAddress}>
                          <div className={styles.formGroup} style={{ marginBottom: 12 }}>
                            <label className={styles.fieldLabel}>Location Nickname *</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Main Branch or Downtown Office"
                              className={styles.inputField}
                              value={newAddrNickname}
                              onChange={(e) => setNewAddrNickname(e.target.value)}
                            />
                          </div>

                          <div className={styles.formGrid2}>
                            <div className={styles.formGroup}>
                              <label className={styles.fieldLabel}>Recipient Name *</label>
                              <input
                                type="text"
                                required
                                className={styles.inputField}
                                value={newAddrRecipient}
                                onChange={(e) => setNewAddrRecipient(e.target.value)}
                              />
                            </div>
                            <div className={styles.formGroup}>
                              <label className={styles.fieldLabel}>Phone *</label>
                              <input
                                type="tel"
                                required
                                className={styles.inputField}
                                value={newAddrPhone}
                                onChange={(e) => setNewAddrPhone(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className={styles.formGrid2}>
                            <div className={styles.formGroup}>
                              <label className={styles.fieldLabel}>Street Address *</label>
                              <input
                                type="text"
                                required
                                className={styles.inputField}
                                value={newAddrStreet}
                                onChange={(e) => setNewAddrStreet(e.target.value)}
                              />
                            </div>
                            <div className={styles.formGroup}>
                              <label className={styles.fieldLabel}>Suite / Unit</label>
                              <input
                                type="text"
                                className={styles.inputField}
                                value={newAddrSuite}
                                onChange={(e) => setNewAddrSuite(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className={styles.formGrid2}>
                            <div className={styles.formGroup}>
                              <label className={styles.fieldLabel}>City</label>
                              <input
                                type="text"
                                className={styles.inputField}
                                value={newAddrCity}
                                onChange={(e) => setNewAddrCity(e.target.value)}
                              />
                            </div>
                            <div className={styles.formGroup}>
                              <label className={styles.fieldLabel}>ZIP Code *</label>
                              <input
                                type="text"
                                required
                                className={styles.inputField}
                                value={newAddrZip}
                                onChange={(e) => setNewAddrZip(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className={styles.formGroup} style={{ marginBottom: 16 }}>
                            <label className={styles.fieldLabel}>Delivery Notes / Gate Code</label>
                            <textarea
                              className={styles.inputField}
                              style={{ height: 60, paddingTop: 8 }}
                              placeholder="e.g. Deliver to rear service alley. Ring buzzer."
                              value={newAddrNotes}
                              onChange={(e) => setNewAddrNotes(e.target.value)}
                            />
                          </div>

                          <div style={{ marginBottom: 20 }}>
                            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer" }}>
                              <input
                                type="checkbox"
                                checked={newAddrDefault}
                                onChange={(e) => setNewAddrDefault(e.target.checked)}
                              />
                              <span>Set as Default Address</span>
                            </label>
                          </div>

                          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                            <button
                              type="button"
                              onClick={() => setIsAddressModalOpen(false)}
                              style={{
                                padding: "8px 16px",
                                borderRadius: 8,
                                border: "1px solid #CBD5E1",
                                background: "#FFF",
                                cursor: "pointer",
                              }}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className={styles.saveChangesBtn}
                              style={{ height: 42, padding: "0 22px" }}
                            >
                              Save Address
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ========================================================
                  TAB 3: ORDER HISTORY & DELIVERED RATING
                  User Requirement: "and in order history after delivery show rate so user can give rating"
                  ======================================================== */}
              {activeTab === "orders" && (
                <div>
                  <div className={styles.panelHeader}>
                    <div>
                      <h2 className={styles.panelTitle}>Order History &amp; Reorders</h2>
                      <p className={styles.panelSub}>
                        View past dispatches, download official invoices, rate delivered supplies, and 1-click reorder
                      </p>
                    </div>
                  </div>

                  {orders.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "48px 20px", color: "#64748B" }}>
                      <PackageCheck size={48} style={{ margin: "0 auto 12px", opacity: 0.4 }} />
                      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1E293B", marginBottom: 6 }}>
                        No orders placed yet
                      </h3>
                      <p style={{ fontSize: 13, maxWidth: 360, margin: "0 auto 16px" }}>
                        When you order commercial takeout containers or eco-friendly tableware, your dispatches will appear here.
                      </p>
                      <Link
                        href="/"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          background: "#E51A1A",
                          color: "#FFF",
                          padding: "8px 18px",
                          borderRadius: 9999,
                          fontWeight: 700,
                          fontSize: 13,
                          textDecoration: "none",
                        }}
                      >
                        Browse Wholesale Catalog
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className={styles.ordersList}>
                        {paginatedOrders.map((order) => {
                          const isDelivered = order.status === "delivered";
                          const hasRating = Boolean(order.rating);

                          return (
                            <div key={order.id} className={styles.orderCard}>
                              {/* Card Header */}
                              <div className={styles.orderCardHeader}>
                                <div className={styles.orderIdDate}>
                                  <span className={styles.orderId}>Order #{order.id}</span>
                                  <span className={styles.orderDate}>
                                    {new Date(order.date).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    })}
                                  </span>
                                  {order.shippingCarrier && (
                                    <span style={{ fontSize: 11, background: "#FEF3C7", color: "#92400E", padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>
                                      {order.shippingCarrier} {order.shippingService || "Ground"}
                                    </span>
                                  )}
                                </div>

                                {/* Status Pill */}
                                {isDelivered ? (
                                  <span className={styles.statusPillDelivered}>
                                    <CheckCircle2 size={14} />
                                    <span>Delivered</span>
                                  </span>
                                ) : (
                                  <span className={styles.statusPillDispatched}>
                                    <PackageCheck size={14} />
                                    <span>{order.statusText}</span>
                                  </span>
                                )}
                              </div>

                              {/* Order Items */}
                              <div className={styles.orderItemsRow}>
                                {order.items.map((item, idx) => (
                                  <div key={idx} className={styles.orderItemSingle}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                      src={item.image}
                                      alt={item.productName}
                                      className={styles.itemThumb}
                                    />
                                    <div className={styles.itemMeta}>
                                      <div className={styles.itemTitle}>{item.productName}</div>
                                      <div className={styles.itemSub}>
                                        {item.quantity} case{item.quantity > 1 ? "s" : ""} × {item.sizeName} ({item.caseCount} pcs/case)
                                      </div>
                                    </div>
                                    <div>
                                      <strong>${item.lineTotal.toFixed(2)}</strong>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Card Footer Actions */}
                              <div className={styles.orderCardFooter}>
                                <div className={styles.orderTotalAmount}>
                                  Total: ${order.pricing.total.toFixed(2)}
                                </div>

                                <div className={styles.orderCardActions}>
                                  {/* User Requirement: "and in order history after delivery show rate so user can give rating" */}
                                  {isDelivered && (
                                    hasRating ? (
                                      <button
                                        type="button"
                                        className={styles.ratedBadge}
                                        onClick={() => setRatingModalOrderId(order.id)}
                                        title="Click to view or edit rating"
                                      >
                                        <Star size={13} fill="#B45309" />
                                        <span>Rated {order.rating?.rating}/5 ⭐</span>
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        className={styles.rateOrderBtn}
                                        onClick={() => setRatingModalOrderId(order.id)}
                                      >
                                        <Star size={13} fill="#FFFFFF" />
                                        <span>Rate Delivered Order</span>
                                      </button>
                                    )
                                  )}

                                  {/* Download Invoice Button */}
                                  <button
                                    type="button"
                                    className={styles.invoiceBtn}
                                    onClick={() => setSelectedInvoiceOrder(order)}
                                  >
                                    <Download size={13} />
                                    <span>PDF Invoice</span>
                                  </button>

                                  {/* 1-Click Reorder Button */}
                                  <button
                                    type="button"
                                    className={styles.reorderBtn}
                                    onClick={() => handleReorder(order)}
                                  >
                                    <RotateCcw size={13} />
                                    <span>1-Click Reorder</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Pagination Controls per Requirement 4 */}
                      {orders.length > ORDERS_PER_PAGE && (
                        <div className={styles.paginationWrapper}>
                          <div className={styles.paginationInfo}>
                            Showing {(ordersPage - 1) * ORDERS_PER_PAGE + 1}–
                            {Math.min(ordersPage * ORDERS_PER_PAGE, orders.length)} of {orders.length} orders
                          </div>
                          <div className={styles.paginationControls}>
                            <button
                              type="button"
                              className={styles.pageBtn}
                              disabled={ordersPage === 1}
                              onClick={() => setOrdersPage((p) => Math.max(1, p - 1))}
                            >
                              Previous
                            </button>
                            {Array.from({ length: totalOrdersPages }, (_, i) => i + 1).map((pageNum) => (
                              <button
                                key={pageNum}
                                type="button"
                                className={`${styles.pageBtn} ${
                                  ordersPage === pageNum ? styles.pageBtnActive : ""
                                }`}
                                onClick={() => setOrdersPage(pageNum)}
                              >
                                {pageNum}
                              </button>
                            ))}
                            <button
                              type="button"
                              className={styles.pageBtn}
                              disabled={ordersPage === totalOrdersPages}
                              onClick={() => setOrdersPage((p) => Math.min(totalOrdersPages, p + 1))}
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer onSelectCategory={() => {}} />
    </div>
  );
}

export default function AccountPage() {
  return (
    <React.Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#64748B",
            fontWeight: 600,
          }}
        >
          Loading Commercial Account Portal...
        </div>
      }
    >
      <AccountPortalContent />
    </React.Suspense>
  );
}
