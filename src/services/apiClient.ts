/**
 * API Client for The Takeout Box Backend Service (http://localhost:5000/api/v1)
 * Decoupled client with transparent fallback to local storage if server is offline.
 */

// In-memory cache of dynamic API base URL
let cachedApiBase: string | null = null;

/**
 * Returns the current active API base URL.
 * Automatically respects:
 * 1. Dynamic /api-config.json published by the server
 * 2. Cached URL in browser storage
 * 3. Environment variable NEXT_PUBLIC_API_URL
 * 4. Fallback defaults
 */
export function getApiBaseUrl(): string {
  if (cachedApiBase) return cachedApiBase;

  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("takeout_dynamic_api_url");
    if (stored) {
      cachedApiBase = stored;
      return stored;
    }
  }

  if (process.env.NEXT_PUBLIC_API_URL) {
    cachedApiBase = process.env.NEXT_PUBLIC_API_URL;
    return cachedApiBase;
  }

  return "http://localhost:8000/api/v1";
}

/**
 * Asynchronously discovers and verifies the active backend port:
 * 1. Checks /api-config.json (generated automatically by server on boot)
 * 2. Probes candidate ports (8000, 5000, etc.) on /api/health to find which server is alive
 */
export async function resolveActiveApiBaseUrl(): Promise<string> {
  if (typeof window === "undefined") {
    return getApiBaseUrl();
  }

  // 1. Try reading /api-config.json
  try {
    const configRes = await fetch(`/api-config.json?_t=${Date.now()}`, { cache: "no-store" });
    if (configRes.ok) {
      const config = await configRes.json();
      if (config.apiUrl && typeof config.apiUrl === "string") {
        cachedApiBase = config.apiUrl;
        localStorage.setItem("takeout_dynamic_api_url", config.apiUrl);
        return config.apiUrl;
      }
    }
  } catch {}

  // 2. Health check probe across candidate ports
  const candidates = [
    getApiBaseUrl(),
    "http://localhost:8000/api/v1",
    "http://localhost:5000/api/v1",
  ];

  for (const candidate of candidates) {
    try {
      const healthUrl = candidate.replace(/\/api\/v1\/?$/, "") + "/api/health";
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 700);
      const res = await fetch(healthUrl, { signal: controller.signal });
      clearTimeout(timer);
      if (res.ok) {
        cachedApiBase = candidate;
        localStorage.setItem("takeout_dynamic_api_url", candidate);
        return candidate;
      }
    } catch {}
  }

  return getApiBaseUrl();
}

// Proactively run discovery when loaded in browser
if (typeof window !== "undefined") {
  resolveActiveApiBaseUrl().catch(() => {});
}

export interface AuthResponse {
  success: boolean;
  token: string;
  refreshToken: string;
  expiresIn: number;
  user: any;
}

function getAuthHeader(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("takeout_jwt_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRefreshed(token: string) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  let apiBase = getApiBaseUrl();
  let url = `${apiBase}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    ...getAuthHeader(),
    ...(options.headers || {}),
  };

  let response: Response;
  try {
    response = await fetch(url, { ...options, headers });
  } catch (netErr) {
    // If connection failed (e.g. backend port changed), attempt auto-discovery and retry once
    const discoveredBase = await resolveActiveApiBaseUrl();
    if (discoveredBase && discoveredBase !== apiBase) {
      console.log(`[API Client] Port switch detected. Retrying with live backend: ${discoveredBase}`);
      apiBase = discoveredBase;
      url = `${apiBase}${endpoint}`;
      response = await fetch(url, { ...options, headers });
    } else {
      throw netErr;
    }
  }
  
  // 401 Unauthorized handling with automatic token refresh (bypass on credentials endpoints)
  const isAuthEndpoint =
    endpoint.startsWith("/auth/login") ||
    endpoint.startsWith("/auth/signup") ||
    endpoint.startsWith("/auth/google") ||
    endpoint.startsWith("/auth/refresh-token");

  if (response.status === 401 && !isAuthEndpoint) {
    if (typeof window !== "undefined") {
      const refreshToken = localStorage.getItem("takeout_refresh_token");

      if (refreshToken) {
        if (!isRefreshing) {
          isRefreshing = true;
          try {
            const refreshRes = await fetch(`${getApiBaseUrl()}/auth/refresh-token`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refreshToken }),
            });

            const refreshData = await refreshRes.json();
            if (refreshRes.ok && refreshData.token) {
              localStorage.setItem("takeout_jwt_token", refreshData.token);
              if (refreshData.refreshToken) {
                localStorage.setItem("takeout_refresh_token", refreshData.refreshToken);
              }
              const expiryTime = Date.now() + (refreshData.expiresIn || 3600) * 1000;
              localStorage.setItem("takeout_token_expiry", expiryTime.toString());

              isRefreshing = false;
              onRefreshed(refreshData.token);

              // Retry original request with new token
              return request<T>(endpoint, {
                ...options,
                headers: {
                  ...headers,
                  Authorization: `Bearer ${refreshData.token}`,
                },
              });
            } else {
              throw new Error("Refresh token expired");
            }
          } catch {
            isRefreshing = false;
            localStorage.removeItem("takeout_jwt_token");
            localStorage.removeItem("takeout_refresh_token");
            localStorage.removeItem("takeout_token_expiry");
            window.dispatchEvent(new Event("takeout_session_expired"));
          }
        } else {
          // Wait for ongoing refresh
          return new Promise<T>((resolve) => {
            refreshSubscribers.push((newToken: string) => {
              resolve(
                request<T>(endpoint, {
                  ...options,
                  headers: {
                    ...headers,
                    Authorization: `Bearer ${newToken}`,
                  },
                })
              );
            });
          });
        }
      }
    }
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `API request failed with status ${response.status}`);
  }

  return data;
}

export const ApiClient = {
  // 1. Authentication
  auth: {
    signup: async (data: {
      name: string;
      email: string;
      phone: string;
      password: string;
      confirmPassword?: string;
    }): Promise<AuthResponse> => {
      const res = await request<AuthResponse>("/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (res.token && typeof window !== "undefined") {
        localStorage.setItem("takeout_jwt_token", res.token);
        if (res.refreshToken) {
          localStorage.setItem("takeout_refresh_token", res.refreshToken);
        }
        const expiryTime = Date.now() + (res.expiresIn || 3600) * 1000;
        localStorage.setItem("takeout_token_expiry", expiryTime.toString());
        localStorage.setItem("takeout_last_activity", Date.now().toString());
      }
      return res;
    },

    login: async (data: { email: string; password: string }): Promise<AuthResponse> => {
      const res = await request<AuthResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (res.token && typeof window !== "undefined") {
        localStorage.setItem("takeout_jwt_token", res.token);
        if (res.refreshToken) {
          localStorage.setItem("takeout_refresh_token", res.refreshToken);
        }
        const expiryTime = Date.now() + (res.expiresIn || 3600) * 1000;
        localStorage.setItem("takeout_token_expiry", expiryTime.toString());
        localStorage.setItem("takeout_last_activity", Date.now().toString());
      }
      return res;
    },

    googleLogin: async (data: {
      email?: string;
      name?: string;
      avatarUrl?: string;
      googleId?: string;
      credential?: string;
      accessToken?: string;
      phone?: string;
      dob?: string;
    }): Promise<AuthResponse> => {
      const res = await request<AuthResponse>("/auth/google", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (res.token && typeof window !== "undefined") {
        localStorage.setItem("takeout_jwt_token", res.token);
        if (res.refreshToken) {
          localStorage.setItem("takeout_refresh_token", res.refreshToken);
        }
        const expiryTime = Date.now() + (res.expiresIn || 3600) * 1000;
        localStorage.setItem("takeout_token_expiry", expiryTime.toString());
        localStorage.setItem("takeout_last_activity", Date.now().toString());
      }
      return res;
    },

    refreshToken: async (): Promise<AuthResponse | null> => {
      if (typeof window === "undefined") return null;
      const refreshToken = localStorage.getItem("takeout_refresh_token");
      if (!refreshToken) return null;

      const res = await request<AuthResponse>("/auth/refresh-token", {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
      });

      if (res.token) {
        localStorage.setItem("takeout_jwt_token", res.token);
        if (res.refreshToken) {
          localStorage.setItem("takeout_refresh_token", res.refreshToken);
        }
        const expiryTime = Date.now() + (res.expiresIn || 3600) * 1000;
        localStorage.setItem("takeout_token_expiry", expiryTime.toString());
      }
      return res;
    },

    getMe: async () => {
      return request<{ success: boolean; user: any }>("/auth/me");
    },

    logout: async () => {
      if (typeof window !== "undefined") {
        try {
          await request("/auth/logout", { method: "POST" });
        } catch {
          // ignore
        }
        localStorage.removeItem("takeout_jwt_token");
        localStorage.removeItem("takeout_refresh_token");
        localStorage.removeItem("takeout_token_expiry");
        localStorage.removeItem("takeout_user_auth");
        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new Event("takeout_profile_updated"));
      }
    },
  },

  // 2. Customer Profile
  profile: {
    get: async () => {
      return request<{ success: boolean; profile: any }>("/profile");
    },
    update: async (data: any) => {
      return request<{ success: boolean; message: string; profile: any }>("/profile", {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
    updateAvatar: async (avatarUrl: string) => {
      return request<{ success: boolean; avatarUrl: string }>("/profile/avatar", {
        method: "POST",
        body: JSON.stringify({ avatarUrl }),
      });
    },
  },

  // 3. Saved Addresses
  addresses: {
    list: async () => {
      return request<{ success: boolean; addresses: any[] }>("/addresses");
    },
    create: async (address: any) => {
      return request<{ success: boolean; address: any }>("/addresses", {
        method: "POST",
        body: JSON.stringify(address),
      });
    },
    update: async (id: string, address: any) => {
      return request<{ success: boolean; address: any }>(`/addresses/${id}`, {
        method: "PUT",
        body: JSON.stringify(address),
      });
    },
    delete: async (id: string) => {
      return request<{ success: boolean }>(`/addresses/${id}`, {
        method: "DELETE",
      });
    },
    setDefault: async (id: string) => {
      return request<{ success: boolean }>(`/addresses/${id}/default`, {
        method: "PATCH",
      });
    },
  },

  // 4. Catalog
  catalog: {
    getCategories: async () => {
      return request<{ success: boolean; categories: any[] }>("/catalog/categories");
    },
    getProducts: async (params?: { category?: string; search?: string; page?: number; limit?: number }) => {
      const searchParams = new URLSearchParams();
      if (params?.category) searchParams.set("category", params.category);
      if (params?.search) searchParams.set("search", params.search);
      if (params?.page) searchParams.set("page", params.page.toString());
      if (params?.limit) searchParams.set("limit", params.limit.toString());
      const query = searchParams.toString() ? `?${searchParams.toString()}` : "";
      return request<{ success: boolean; products: any[]; total: number; totalPages: number }>(`/catalog/products${query}`);
    },
    getProductById: async (id: string) => {
      return request<{ success: boolean; product: any }>(`/catalog/products/${id}`);
    },
  },

  // 5. Orders & Checkout
  orders: {
    create: async (orderData: any) => {
      return request<{ success: boolean; message: string; order: any }>("/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
      });
    },
    list: async (page: number = 1, limit: number = 2) => {
      return request<{ success: boolean; orders: any[]; pagination: any }>(`/orders?page=${page}&limit=${limit}`);
    },
    getById: async (orderId: string) => {
      return request<{ success: boolean; order: any }>(`/orders/${orderId}`);
    },
    getInvoice: async (orderId: string) => {
      return request<{ success: boolean; invoice: any }>(`/orders/${orderId}/invoice`);
    },
  },

  // 6. Ratings
  ratings: {
    submit: async (data: { orderId: string; rating: number; tags: string[]; feedback: string }) => {
      return request<{ success: boolean; message: string }>("/ratings", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    getByOrder: async (orderId: string) => {
      return request<{ success: boolean; rating: any }>(`/ratings/order/${orderId}`);
    },
  },

  // 7. Wholesale Quotes
  wholesale: {
    submitQuote: async (quoteData: any) => {
      return request<{ success: boolean; message: string; inquiryId: number }>("/wholesale/quote-request", {
        method: "POST",
        body: JSON.stringify(quoteData),
      });
    },
  },

  // 8. Database Cart Persistence
  cart: {
    get: async () => {
      return request<{ success: boolean; items: any[] }>("/cart");
    },
    addItem: async (item: {
      productId: string;
      sku?: string;
      sizeName: string;
      caseCount: number;
      quantity: number;
      unitPrice: number;
    }) => {
      return request<{ success: boolean; message: string; items: any[] }>("/cart/items", {
        method: "POST",
        body: JSON.stringify(item),
      });
    },
    updateQuantity: async (productId: string, sizeName: string, quantity: number) => {
      return request<{ success: boolean; items: any[] }>("/cart/items", {
        method: "PUT",
        body: JSON.stringify({ productId, sizeName, quantity }),
      });
    },
    removeItem: async (productId: string, sizeName: string) => {
      return request<{ success: boolean; items: any[] }>("/cart/items", {
        method: "DELETE",
        body: JSON.stringify({ productId, sizeName }),
      });
    },
    clear: async () => {
      return request<{ success: boolean; message: string; items: any[] }>("/cart", {
        method: "DELETE",
      });
    },
    sync: async (items: any[]) => {
      return request<{ success: boolean; items: any[] }>("/cart/sync", {
        method: "POST",
        body: JSON.stringify({ items }),
      });
    },
  },

  // 9. Interactive Packaging & Depot Chatbot
  chat: {
    sendMessage: async (data: {
      message: string;
      conversationHistory?: { role: "user" | "assistant" | "system"; content: string }[];
    }): Promise<{
      success: boolean;
      reply: string;
      suggestedProducts?: Array<{
        id: string;
        name: string;
        sku?: string;
        price: number;
        image: string;
        category: string;
        caseCount?: number;
      }>;
      action?: "whatsapp" | "quote" | "catalog" | "none";
      message?: string;
    }> => {
      return request("/chat", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
  },

  // 10. UPS Courier Shipping Integration
  shipping: {
    validateAddress: async (address: {
      street: string;
      suite?: string;
      city: string;
      state: string;
      zip: string;
      recipientName?: string;
      businessName?: string;
    }) => {
      return request<{
        success: boolean;
        valid: boolean;
        standardized: boolean;
        classification?: "Commercial" | "Residential" | "Unknown";
        message: string;
        originalAddress: any;
        suggestedAddress?: any;
      }>("/shipping/validate-address", {
        method: "POST",
        body: JSON.stringify(address),
      });
    },

    getRates: async (data: {
      destination: {
        street: string;
        suite?: string;
        city: string;
        state: string;
        zip: string;
        recipientName?: string;
        businessName?: string;
      };
      items: Array<{
        productId: string;
        sizeName?: string;
        quantity: number;
      }>;
    }) => {
      return request<{
        success: boolean;
        rates: Array<{
          carrier: "UPS";
          serviceCode: string;
          serviceName: string;
          rate: number;
          currency: "USD";
          deliveryDays?: number;
          estimatedDelivery?: string;
          guaranteed: boolean;
          rateQuoteReference?: string;
        }>;
        packageInfo: {
          totalWeight: number;
          weightUnit: "LBS";
          packageCount: number;
          packages: any[];
        };
        destination: any;
        requestTimestamp: string;
        message?: string;
      }>("/shipping/rates", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },

    selectShipping: async (data: {
      orderId?: string;
      customer: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        businessName?: string;
      };
      shippingAddress: {
        street: string;
        suite?: string;
        city: string;
        state: string;
        zip: string;
        country: string;
      };
      items: Array<{
        productId: string;
        sizeName?: string;
        quantity: number;
      }>;
      selectedServiceCode: string;
      taxExempt?: boolean;
      resalePermitNumber?: string;
    }) => {
      return request<{
        success: boolean;
        message: string;
        orderId: string;
        order: any;
        shipment: any;
        selectedOption: any;
        totals: {
          subtotal: number;
          volumeDiscount: number;
          shipping: number;
          tax: number;
          total: number;
        };
      }>("/shipping/select", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },

    getOrderShipping: async (orderId: string) => {
      return request<{
        success: boolean;
        shipment?: any;
        shipping?: any;
      }>(`/shipping/orders/${orderId}`);
    },

    getOrderTracking: async (orderId: string) => {
      return request<{
        success: boolean;
        tracking: {
          available: boolean;
          orderId: string;
          carrier: string;
          trackingNumber: string | null;
          shipmentStatus: string;
          statusText: string;
          estimatedDeliveryDate?: string | null;
        };
      }>(`/shipping/orders/${orderId}/tracking`);
    },
  },
};


