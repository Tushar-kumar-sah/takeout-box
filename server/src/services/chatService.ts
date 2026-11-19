import { ENV } from "../config/env.js";
import { CatalogRepository, ProductRecord } from "../repositories/catalogRepository.js";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface SuggestedProduct {
  id: string;
  name: string;
  sku?: string;
  price: number;
  image: string;
  category: string;
  caseCount?: number;
}

export interface ChatResponse {
  reply: string;
  suggestedProducts?: SuggestedProduct[];
  action?: "whatsapp" | "quote" | "catalog" | "none";
}

// Business metadata
const DEPOT_INFO = {
  name: "The Takeout Box Restaurant Supply",
  tagline: "Pack Smarter. Serve Better.",
  address: ENV.DEPOT_ADDRESS || "5880 District Blvd. Suite 17, Bakersfield, CA 93313",
  phone1: ENV.DEPOT_PHONE_1 || "+1 661-205-9667",
  phone2: ENV.DEPOT_PHONE_2 || "+1 661-805-9358",
  whatsapp: ENV.WHATSAPP_PHONE_NUMBER || "16612059667",
  hours: "Monday – Saturday: 9:00 AM – 5:00 PM, Sunday: 9:00 AM – 2:00 PM",
  serviceArea: "Bakersfield and Kern County commercial route dispatch & doorstep delivery",
  pickup: "Direct drive-in warehouse pickup at 5880 District Blvd Suite 17",
  taxPolicy: "California Sales Tax (8.25%). Food businesses with a valid California Resale Certificate (CDTFA BOE-230) qualify for tax exemption.",
  wholesalePolicy: "Pallet orders (20+ cases to full truckloads) receive tiered volume discounts up to 30%. Scheduled weekly or bi-weekly standing deliveries available.",
};

const SYSTEM_PROMPT = `You are the Official AI Packaging Specialist for "The Takeout Box Restaurant Supply" located at 5880 District Blvd. Suite 17, Bakersfield, CA 93313.

CORE BUSINESS FACTS (VERIFIED):
- Address: 5880 District Blvd. Suite 17, Bakersfield, CA 93313
- Phone 1: +1 661-205-9667
- Phone 2: +1 661-805-9358
- WhatsApp: +1 661-205-9667
- Operating Hours: Monday – Saturday: 9:00 AM – 5:00 PM | Sunday: 9:00 AM – 2:00 PM
- Service Area: Direct warehouse pickup in Bakersfield; route dispatch across Kern County.
- California Resale Tax Exemption: Valid CA Resale Certificate (CDTFA BOE-230) qualifies for 0% California sales tax.
- Wholesale & Volume Discounts: Pallet orders (20+ cases) receive 10% to 30% tiered discounts.

PRODUCT LINES CARRIED:
1. Hinged Containers: Heavy-duty mineral-filled PP (MFPP) microwave-safe to 230°F, freezer-safe to -20°C, 1-comp and 3-comp (9x9, 8x8, 6x6) in White and Black.
2. Deli Containers: Clear polypropylene (8oz, 12oz, 16oz, 24oz, 32oz) with tight-seal leak-resistant lids.
3. Soup & Noodle Bowls: Heavy-duty microwaveable round bowls with leak-proof lids and compartmental inserts.
4. Bagasse Sugarcane: 100% compostable, PFAS-free plates, bowls, and hinged boxes.
5. Drink Cups: Crystal-clear PET cold cups (12-24oz) with flat/dome lids, and double-wall insulated hot paper coffee cups.
6. Cutlery & Catering: Wrapped heavy-duty cutlery kits and half/full-size aluminum steam table pans.

STRICT RELEVANCE RULES (MANDATORY):
1. Answer ONLY what the customer explicitly asked. Give direct, focused, concise answers.
2. If asked about hours, give the depot hours and nothing else.
3. If asked about address or pickup, give the Bakersfield depot location and pickup instructions.
4. If asked about contact or WhatsApp, provide the phone numbers and WhatsApp support directly.
5. If asked about technical specs (microwave, heat, freezer), answer the exact temperature ratings.
6. Do NOT recommend or pitch products unless the customer specifically asks for product recommendations, inventory, containers, or pricing.
7. If the customer asks anything completely unrelated to commercial restaurant packaging, food containers, or our Bakersfield depot, politely explain that you are dedicated exclusively to packaging and depot supplies.`;

export class ChatService {
  /**
   * Process a customer message using AI (Gemini or OpenAI) with built-in intelligent fallback
   */
  static async processMessage(
    userMessage: string,
    conversationHistory: ChatMessage[] = []
  ): Promise<ChatResponse> {
    const cleanMsg = (userMessage || "").trim();
    if (!cleanMsg) {
      return {
        reply: "Hello! Welcome to The Takeout Box Restaurant Supply in Bakersfield. How can I help you with your commercial food packaging or kitchen supplies today?",
        action: "none",
      };
    }

    const wantsProducts = this.shouldIncludeProducts(cleanMsg);

    // 1. Try Google Gemini API if configured
    if (ENV.GEMINI_API_KEY) {
      try {
        const geminiReply = await this.callGemini(cleanMsg, conversationHistory);
        if (geminiReply) {
          const suggestedProducts = wantsProducts ? await this.findRelevantProducts(cleanMsg) : [];
          const action = this.determineAction(cleanMsg);
          return { reply: geminiReply, suggestedProducts: suggestedProducts.length > 0 ? suggestedProducts : undefined, action };
        }
      } catch (err: any) {
        console.warn("[ChatService] Gemini API call failed, falling back to local engine:", err.message);
      }
    }

    // 2. Try OpenAI API if configured
    if (ENV.OPENAI_API_KEY) {
      try {
        const openAiReply = await this.callOpenAI(cleanMsg, conversationHistory);
        if (openAiReply) {
          const suggestedProducts = wantsProducts ? await this.findRelevantProducts(cleanMsg) : [];
          const action = this.determineAction(cleanMsg);
          return { reply: openAiReply, suggestedProducts: suggestedProducts.length > 0 ? suggestedProducts : undefined, action };
        }
      } catch (err: any) {
        console.warn("[ChatService] OpenAI API call failed, falling back to local engine:", err.message);
      }
    }

    // 3. Built-in Intelligent Domain Engine (Offline / Zero-Config fallback)
    return await this.generateIntelligentFallback(cleanMsg);
  }

  /**
   * Google Gemini 1.5 Flash via REST API
   */
  private static async callGemini(
    message: string,
    history: ChatMessage[]
  ): Promise<string | null> {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${ENV.GEMINI_API_KEY}`;

    const formattedHistory = history.slice(-6).map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const contents = [
      ...formattedHistory,
      { role: "user", parts: [{ text: message }] },
    ];

    const body = {
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents,
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 600,
      },
    };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Gemini API HTTP ${res.status}: ${errText}`);
    }

    const data: any = await res.json();
    const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return candidate ? candidate.trim() : null;
  }

  /**
   * OpenAI gpt-4o-mini via REST API
   */
  private static async callOpenAI(
    message: string,
    history: ChatMessage[]
  ): Promise<string | null> {
    const endpoint = "https://api.openai.com/v1/chat/completions";

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.slice(-6).map((msg) => ({
        role: msg.role === "assistant" ? "assistant" : "user",
        content: msg.content,
      })),
      { role: "user", content: message },
    ];

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ENV.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.3,
        max_tokens: 600,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`OpenAI API HTTP ${res.status}: ${errText}`);
    }

    const data: any = await res.json();
    return data.choices?.[0]?.message?.content?.trim() || null;
  }

  /**
   * Built-in intelligent domain engine that handles common kitchen packaging queries
   */
  private static async generateIntelligentFallback(query: string): Promise<ChatResponse> {
    const q = query.toLowerCase();

    // 1. Greetings
    if (/^(hi|hello|hey|good morning|good afternoon|good evening)\b/i.test(q)) {
      return {
        reply: `Hello! Welcome to **The Takeout Box Restaurant Supply** in Bakersfield. How can I help you today with your restaurant packaging, depot warehouse pickup, or bulk pallet pricing?`,
        action: "none",
      };
    }

    // 2. Hours & Timing (strictly hours, zero products)
    if (q.includes("hour") || q.includes("time") || q.includes("open") || q.includes("close") || q.includes("schedule") || q.includes("sunday")) {
      return {
        reply: `**Bakersfield Depot Hours:**\n- **Monday – Saturday:** 9:00 AM – 5:00 PM\n- **Sunday:** 9:00 AM – 2:00 PM\n\nOur warehouse at **5880 District Blvd. Suite 17, Bakersfield, CA 93313** is open during these hours for walk-in shopping and immediate dock pickup.`,
        action: "none",
      };
    }

    // 3. Location, Address, Pickup & Directions (strictly location, zero products)
    if (q.includes("where") || q.includes("address") || q.includes("location") || q.includes("pickup") || q.includes("direction") || q.includes("dock")) {
      return {
        reply: `**Depot Location & Warehouse Pickup:**\n📍 **5880 District Blvd. Suite 17, Bakersfield, CA 93313**\n\nWalk-ins, restaurant operators, and food trucks are welcome for direct dock pickup during open hours. You can also call ahead at **${DEPOT_INFO.phone1}** to have your order staged and ready.`,
        action: "none",
      };
    }

    // 4. Contact, Phone & WhatsApp (strictly contact, zero products)
    if (q.includes("phone") || q.includes("call") || q.includes("contact") || q.includes("number") || q.includes("whatsapp") || q.includes("human") || q.includes("person") || q.includes("support") || q.includes("speak")) {
      return {
        reply: `**Direct Depot Contact Lines:**\n📞 **Main Dispatch:** ${DEPOT_INFO.phone1}\n📞 **Office Line:** ${DEPOT_INFO.phone2}\n💬 **WhatsApp:** Click below to chat directly with our Bakersfield warehouse team.\n\nAddress: **5880 District Blvd. Suite 17, Bakersfield**`,
        action: "whatsapp",
      };
    }

    // 5. Wholesale & Pallet Volume Pricing (strictly wholesale info, zero products unless asked)
    if (q.includes("wholesale") || q.includes("bulk") || q.includes("pallet") || q.includes("volume discount") || q.includes("quote")) {
      return {
        reply: `**Wholesale & Pallet Pricing:**\n- **Tiered Volume Savings:** Save up to 30% on pallet orders (20+ cases to full truckloads).\n- **Standing Restock:** Scheduled weekly or bi-weekly standing deliveries across Kern County.\n- **Tax Exemption:** 0% CA sales tax with valid resale certificate.\n\nWould you like to submit a wholesale quote request or chat on WhatsApp with our sales manager?`,
        action: "quote",
      };
    }

    // 6. California Resale Certificate / Tax Exemption
    if (q.includes("tax") || q.includes("resale") || q.includes("permit") || q.includes("exempt") || q.includes("boe-230") || q.includes("cdtfa")) {
      return {
        reply: `**California Resale Tax Exemption:**\nCalifornia food businesses, restaurants, and caterers holding a valid **California Resale Certificate (CDTFA BOE-230)** qualify for **0% sales tax** on packaging and disposable food containers intended for resale with food. You can input your permit number at checkout or present it at our depot counter.`,
        action: "none",
      };
    }

    // 7. Delivery Area & Shipping
    if (q.includes("deliver") || q.includes("ship") || q.includes("radius") || q.includes("freight") || q.includes("area")) {
      return {
        reply: `**Delivery & Logistics Area:**\nWe provide commercial route dispatch and doorstep delivery throughout **Bakersfield and greater Kern County**.\n- Local depot delivery: Typically next business day on commercial routes.\n- Direct dock pickup: Available immediately for same-day walk-in loading at 5880 District Blvd Suite 17.`,
        action: "none",
      };
    }

    // 8. Payment Methods
    if (q.includes("payment") || q.includes("card") || q.includes("pay") || q.includes("cash") || q.includes("invoice")) {
      return {
        reply: `**Accepted Payment Methods:**\n- Visa, MasterCard, American Express, Discover\n- Apple Pay & Google Pay online\n- Cash & Card at warehouse pickup counter\n- Commercial net terms / invoicing available for qualified volume wholesale accounts.`,
        action: "none",
      };
    }

    // 9. Technical Specs (Microwave, Freezer, BPA)
    if (q.includes("microwave") || q.includes("heat") || q.includes("safe") || q.includes("freezer") || q.includes("temperature") || q.includes("bpa")) {
      const wantsContainers = q.includes("box") || q.includes("container") || q.includes("which") || q.includes("what");
      return {
        reply: `**Technical Specifications:**\n- **Microwave Safe:** Polypropylene (PP) and MFPP containers are rated safe up to **+110°C / 230°F** without melting or harmful leeching.\n- **Freezer Safe:** Certified down to **-20°C / -4°F** for meal prep and frozen inventory.\n- **100% Food-Safe:** BPA-free, FDA 21 CFR compliant with leak-resistant perimeter locks.`,
        suggestedProducts: wantsContainers ? await this.findRelevantProducts("hinged") : undefined,
        action: "none",
      };
    }

    // 10. Product Inquiries (Only return products when asked about products)
    if (q.includes("hinged") || q.includes("clamshell") || q.includes("3 comp") || q.includes("9x9") || q.includes("8x8") || q.includes("6x6") || q.includes("burger box")) {
      const prods = await this.findRelevantProducts("hinged");
      return {
        reply: `**Hinged Takeout Containers:**\nWe stock heavy-duty mineral-filled polypropylene (MFPP) hinged containers in:\n- **Sizes:** 9"x9", 8"x8", and 6"x6"\n- **Compartments:** 1-Compartment and 3-Compartment\n- **Colors:** Crisp White and Premium Black\n\nAll hinged containers feature secure perimeter double-locks and are certified microwave-safe up to 230°F.`,
        suggestedProducts: prods,
        action: "catalog",
      };
    }

    if (q.includes("deli") || q.includes("sauce") || q.includes("portion") || q.includes("dip") || (q.includes("cup") && q.includes("clear"))) {
      const prods = await this.findRelevantProducts("deli");
      return {
        reply: `**Clear Deli Containers & Portion Cups:**\n- **Deli Cups:** 8oz, 12oz, 16oz, 24oz, 32oz heavy-duty clear PP with universal tight snap lids.\n- **Portion Cups:** 2oz, 3.25oz, 4oz clear sauce/dressing cups with leak-proof lids.`,
        suggestedProducts: prods,
        action: "catalog",
      };
    }

    if (q.includes("bowl") || q.includes("soup") || q.includes("noodle") || q.includes("ramen") || q.includes("curry")) {
      const prods = await this.findRelevantProducts("bowl");
      return {
        reply: `**Soup & Noodle Bowls:**\nWe carry heavy-duty round microwaveable bowls (24oz, 32oz, 48oz) engineered with tight, leak-resistant lids for hot soups, noodles, curries, and stews.`,
        suggestedProducts: prods,
        action: "catalog",
      };
    }

    if (q.includes("bagasse") || q.includes("compost") || q.includes("eco") || q.includes("sugarcane") || q.includes("biodegradable") || q.includes("plate")) {
      const prods = await this.findRelevantProducts("bagasse");
      return {
        reply: `**Eco-Friendly Sugarcane Bagasse Dinnerware:**\n100% natural compostable sugarcane dinnerware:\n- 7", 9", and 10" round plates\n- Sugarcane soup bowls and hinged clamshells\n- PFAS-free certified, microwave and freezer safe.`,
        suggestedProducts: prods,
        action: "catalog",
      };
    }

    if (q.includes("drink") || q.includes("cold cup") || q.includes("coffee") || q.includes("boba") || q.includes("smoothie") || q.includes("iced")) {
      const prods = await this.findRelevantProducts("cup");
      return {
        reply: `**Commercial Drink Cups & Lids:**\n- **PET Cold Cups:** 12oz, 16oz, 20oz, 24oz crystal-clear with flat and dome lids for smoothies, iced coffee, and boba.\n- **Hot Paper Cups:** 8oz, 12oz, 16oz double-wall insulated cups with secure sip lids.`,
        suggestedProducts: prods,
        action: "catalog",
      };
    }

    if (q.includes("cutlery") || q.includes("fork") || q.includes("spoon") || q.includes("knife") || q.includes("foil") || q.includes("steam") || q.includes("tray") || q.includes("pan")) {
      const prods = await this.findRelevantProducts(q.includes("foil") || q.includes("pan") ? "foil" : "cutlery");
      return {
        reply: `**Cutlery & Aluminum Catering Supplies:**\n- **Cutlery:** Heavy-duty forks, soup spoons, teaspoons, and wrapped sanitary combo kits with napkins.\n- **Aluminum Pans:** Half-size and full-size deep steam table catering pans with matching aluminum and clear lids.`,
        suggestedProducts: prods,
        action: "catalog",
      };
    }

    // 11. General/Generic Product Request
    if (this.shouldIncludeProducts(q)) {
      const prods = await this.findRelevantProducts(q);
      return {
        reply: `At **The Takeout Box**, we carry complete commercial packaging lines including heavy-duty takeout containers, deli cups, soup bowls, bagasse plates, drink cups, and aluminum catering trays at wholesale case pricing.`,
        suggestedProducts: prods.length > 0 ? prods : undefined,
        action: "catalog",
      };
    }

    // 12. Off-Topic / Unrelated query protection
    return {
      reply: `I am the packaging specialist for **The Takeout Box Restaurant Supply** in Bakersfield. I can only assist with our food packaging containers, restaurant supplies, wholesale pricing, and depot pickup.\n\nHow can I help you with your commercial packaging supplies today?`,
      action: "none",
    };
  }

  /**
   * Determine if the query is actually asking for products/containers/pricing
   */
  private static shouldIncludeProducts(query: string): boolean {
    const q = query.toLowerCase();
    const productWords = [
      "container", "box", "cup", "plate", "bowl", "cutlery", "fork", "spoon",
      "bag", "foil", "tray", "pan", "deli", "hinged", "clamshell", "napkin",
      "product", "catalog", "inventory", "buy", "order", "price", "size",
      "recommend", "carry", "have", "sell", "show me", "stock"
    ];
    return productWords.some((w) => q.includes(w));
  }

  /**
   * Search database for products strictly matching recognized category keywords
   */
  private static async findRelevantProducts(query: string): Promise<SuggestedProduct[]> {
    try {
      const q = query.toLowerCase();
      let searchKey = "";

      if (q.includes("hinged") || q.includes("clamshell") || q.includes("3 comp") || q.includes("9x9") || q.includes("8x8") || q.includes("6x6") || q.includes("burger")) {
        searchKey = "hinged";
      } else if (q.includes("deli") || q.includes("portion") || q.includes("sauce")) {
        searchKey = "deli";
      } else if (q.includes("bowl") || q.includes("soup") || q.includes("noodle") || q.includes("ramen")) {
        searchKey = "bowl";
      } else if (q.includes("bagasse") || q.includes("compost") || q.includes("eco") || q.includes("plate")) {
        searchKey = "bagasse";
      } else if (q.includes("cup") || q.includes("drink") || q.includes("coffee") || q.includes("pet") || q.includes("boba")) {
        searchKey = "cup";
      } else if (q.includes("cutlery") || q.includes("fork") || q.includes("spoon") || q.includes("knife")) {
        searchKey = "cutlery";
      } else if (q.includes("foil") || q.includes("tray") || q.includes("pan") || q.includes("steam")) {
        searchKey = "foil";
      }

      // If no recognized packaging keyword is found, return empty array (do NOT return random products!)
      if (!searchKey) {
        return [];
      }

      const { products } = await CatalogRepository.getProducts({
        search: searchKey,
        limit: 3,
      });

      if (products && products.length > 0) {
        return products.map((p) => {
          const firstSize = p.sizes?.[0];
          return {
            id: p.id,
            name: p.name,
            sku: p.sku || firstSize?.sku,
            price: Number(firstSize?.price || 0),
            image: p.image_url || "/images/product-placeholder.png",
            category: p.category_id,
            caseCount: firstSize?.case_count,
          };
        });
      }
    } catch (err: any) {
      console.warn("[ChatService] Product lookup error:", err.message);
    }

    return [];
  }

  /**
   * Determine primary follow-up action based on user query
   */
  private static determineAction(query: string): "whatsapp" | "quote" | "catalog" | "none" {
    const q = query.toLowerCase();
    if (q.includes("whatsapp") || q.includes("call") || q.includes("person") || q.includes("human")) {
      return "whatsapp";
    }
    if (q.includes("quote") || q.includes("bulk") || q.includes("pallet") || q.includes("wholesale")) {
      return "quote";
    }
    if (q.includes("catalog") || q.includes("browse") || q.includes("all products")) {
      return "catalog";
    }
    return "none";
  }
}
