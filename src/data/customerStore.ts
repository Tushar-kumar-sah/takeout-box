export interface OrderItem {
  productId: string;
  productName: string;
  image: string;
  sizeName: string;
  caseCount: number;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface OrderRating {
  rating: number; // 1-5
  tags: string[];
  feedback: string;
  submittedAt: string;
}

export interface CommercialOrder {
  id: string; // e.g. "TB-84920"
  date: string;
  status: "received" | "packing" | "dispatched" | "delivered" | "pending";
  statusText: string;
  estimatedDelivery: string;
  fulfillmentType: "delivery" | "pickup";
  customer: {
    businessName: string;
    contactName: string;
    phone: string;
    email: string;
  };
  deliveryAddress?: {
    street: string;
    suite?: string;
    city: string;
    state: string;
    zip: string;
    notes?: string;
  };
  taxExempt: boolean;
  resalePermitNumber?: string;
  items: OrderItem[];
  pricing: {
    subtotal: number;
    volumeDiscount: number;
    deliveryFee: number;
    tax: number;
    total: number;
  };
  paymentMethod: "card" | "net30" | "cod" | "zelle";
  paymentStatus: "paid" | "net30_pending" | "cod_pending" | "pending";
  zelleDetails?: {
    recipientPhone: string;
    recipientName: string;
    referenceId: string;
    senderName?: string;
  };
  rating?: OrderRating;
  shippingCarrier?: string;
  shippingService?: string;
  shippingServiceCode?: string;
  shippingAmount?: number;
  shippingDetails?: {
    carrier: string;
    serviceName: string;
    serviceCode?: string;
    trackingNumber?: string;
    rate: number;
    estimatedDelivery?: string;
  };
}

export interface CustomerAddress {
  id: string;
  nickname: string;
  recipientName: string;
  phone: string;
  street: string;
  suite?: string;
  city: string;
  state: string;
  zip: string;
  notes?: string;
  isDefault: boolean;
}

export interface CustomerProfile {
  name: string;
  restaurantName: string;
  email: string;
  phone: string;
  dob: string;
  avatarUrl: string;
  businessType: string;
}

// Customer Addresses initial store
export const INITIAL_ADDRESSES: CustomerAddress[] = [];

// Customer Orders initial store
export const INITIAL_ORDERS: CommercialOrder[] = [];

// Helper functions for localStorage persistence
const STORAGE_KEYS = {
  ORDERS: "takeout_orders_v1",
  ADDRESSES: "takeout_addresses_v1",
  PROFILE: "takeout_profile_v1",
};

export const getStoredOrders = (): CommercialOrder[] => {
  if (typeof window === "undefined") return INITIAL_ORDERS;
  try {
    const data1 = localStorage.getItem("takeout_orders_v1");
    const data2 = localStorage.getItem("takeout_box_orders");
    const orders1 = data1 ? JSON.parse(data1) : [];
    const orders2 = data2 ? JSON.parse(data2) : [];
    const combined = [...orders1];
    orders2.forEach((o: CommercialOrder) => {
      if (!combined.some((item) => item.id === o.id)) {
        combined.push(o);
      }
    });
    return combined.length > 0 ? combined : INITIAL_ORDERS;
  } catch {
    return INITIAL_ORDERS;
  }
};

export const saveOrder = (order: CommercialOrder): void => {
  if (typeof window === "undefined") return;
  try {
    const orders = getStoredOrders();
    const updated = [order, ...orders.filter((o) => o.id !== order.id)];
    localStorage.setItem("takeout_orders_v1", JSON.stringify(updated));
    localStorage.setItem("takeout_box_orders", JSON.stringify(updated));
  } catch (err) {
    console.error("Failed to save order:", err);
  }
};

export const getOrderById = (id: string): CommercialOrder | null => {
  const orders = getStoredOrders();
  return orders.find((o) => o.id === id) || null;
};

export const submitOrderRating = (orderId: string, ratingData: OrderRating): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const orders = getStoredOrders();
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        return { ...o, rating: ratingData };
      }
      return o;
    });
    localStorage.setItem("takeout_orders_v1", JSON.stringify(updated));
    localStorage.setItem("takeout_box_orders", JSON.stringify(updated));
    return true;
  } catch {
    return false;
  }
};

export const getStoredAddresses = (): CustomerAddress[] => {
  if (typeof window === "undefined") return INITIAL_ADDRESSES;
  try {
    const data1 = localStorage.getItem("takeout_addresses_v1");
    const data2 = localStorage.getItem("takeout_box_addresses");
    const addrs1 = data1 ? JSON.parse(data1) : [];
    const addrs2 = data2 ? JSON.parse(data2) : [];
    const combined = [...addrs1];
    addrs2.forEach((a: CustomerAddress) => {
      if (!combined.some((item) => item.id === a.id)) {
        combined.push(a);
      }
    });
    return combined.length > 0 ? combined : INITIAL_ADDRESSES;
  } catch {
    return INITIAL_ADDRESSES;
  }
};

export const saveAddress = (address: CustomerAddress): void => {
  if (typeof window === "undefined") return;
  try {
    const addrs = getStoredAddresses();
    const exists = addrs.some((a) => a.id === address.id);
    let updated = exists
      ? addrs.map((a) => (a.id === address.id ? address : a))
      : [address, ...addrs];

    if (address.isDefault) {
      updated = updated.map((a) => ({
        ...a,
        isDefault: a.id === address.id,
      }));
    }
    localStorage.setItem("takeout_addresses_v1", JSON.stringify(updated));
    localStorage.setItem("takeout_box_addresses", JSON.stringify(updated));
  } catch (err) {
    console.error("Failed to save address:", err);
  }
};

export const deleteAddress = (id: string): void => {
  if (typeof window === "undefined") return;
  try {
    const addrs = getStoredAddresses().filter((a) => a.id !== id);
    localStorage.setItem(STORAGE_KEYS.ADDRESSES, JSON.stringify(addrs));
  } catch (err) {
    console.error("Failed to delete address:", err);
  }
};

export const DEFAULT_PROFILE: CustomerProfile = {
  name: "",
  restaurantName: "",
  email: "",
  phone: "",
  dob: "",
  avatarUrl: "",
  businessType: "",
};

export const getStoredProfile = (): CustomerProfile => {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (!data) return DEFAULT_PROFILE;
    const parsed = JSON.parse(data);
    // Discard legacy hardcoded mock profile if present
    if (parsed.name === "Marco Valenzuela" && parsed.email === "marco@elmolinobakersfield.com") {
      localStorage.removeItem(STORAGE_KEYS.PROFILE);
      return DEFAULT_PROFILE;
    }
    return parsed;
  } catch {
    return DEFAULT_PROFILE;
  }
};

export const saveProfile = (profile: CustomerProfile): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    window.dispatchEvent(new Event("takeout_profile_updated"));
  } catch (err) {
    console.error("Failed to save profile:", err);
  }
};
