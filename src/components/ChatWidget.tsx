"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Package,
  Star,
  Building2,
  Scale,
  Truck,
  ShoppingCart,
  Headphones,
  Minus,
  X,
  Send,
  ChevronRight,
  Phone,
  Building,
  ExternalLink,
  RotateCcw,
  ArrowUpRight,
} from "lucide-react";
import styles from "./ChatWidget.module.css";
import { ApiClient } from "../services/apiClient";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  isGreeting?: boolean;
  suggestedProducts?: Array<{
    id: string;
    name: string;
    sku?: string;
    price: number;
    image: string;
    category: string;
    caseCount?: number;
  }>;
  action?: "whatsapp" | "quote" | "catalog" | "checkout" | "phone" | "none";
  showCategories?: boolean;
}

const BITEY_OPTIONS = [
  { id: "browse", label: "Browse Products", icon: Package },
  { id: "recommend", label: "Recommend Products", icon: Star },
  { id: "wholesale", label: "Bulk / Wholesale Pricing", icon: Building2 },
  { id: "compare", label: "Compare Options", icon: Scale },
  { id: "availability", label: "Check Availability", icon: Truck },
  { id: "order_help", label: "Help with My Order", icon: ShoppingCart },
  { id: "support", label: "Account & Support", icon: Headphones },
];

const POPULAR_RECOMMENDATIONS = [
  {
    id: "9x9-hinged-container",
    name: "9x9 3-Compartment Hinged Container",
    price: 41.5,
    image: "/images/product-placeholder.png",
    category: "Containers",
    caseCount: 150,
  },
  {
    id: "dlcu16",
    name: "16 oz Round Deli Food Container & Lid",
    price: 34.12,
    image: "/images/product-placeholder.png",
    category: "Deli Containers",
    caseCount: 500,
  },
  {
    id: "kraft-salad-bowl-24oz",
    name: "24 oz Kraft Salad Bowl & PET Clear Lid",
    price: 48.2,
    image: "/images/product-placeholder.png",
    category: "Bowls",
    caseCount: 300,
  },
];

export const ChatWidget: React.FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const initialGreetingMsg: ChatMessage = {
    id: "welcome-bitey",
    role: "assistant",
    content: "Hi! I'm **Bitey** 👋\nYour Restaurant Supply Assistant.\nHow can I help you today?",
    isGreeting: true,
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialGreetingMsg]);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global listener to allow opening Bitey from any homepage banner or button
  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener("open-bitey-chat", handleOpenChat);
    return () => window.removeEventListener("open-bitey-chat", handleOpenChat);
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (messages.length > 1) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      } else if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = 0;
      }
      inputRef.current?.focus();
    }
  }, [isOpen, messages, isLoading]);

  // Handle clicking one of the 7 official Bitey options
  const handleSelectOption = (optionId: string, label: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: label,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    setTimeout(() => {
      let botResponse: ChatMessage;

      switch (optionId) {
        case "browse":
          botResponse = {
            id: `bot-${Date.now()}`,
            role: "assistant",
            content:
              "Here are our main packaging and restaurant supply categories! You can explore our full catalog or pick a category below to find exactly what your kitchen needs:",
            showCategories: true,
            action: "catalog",
          };
          break;

        case "recommend":
          botResponse = {
            id: `bot-${Date.now()}`,
            role: "assistant",
            content:
              "Here are our top-rated packaging essentials trusted by commercial kitchens and caterers throughout Kern County:",
            suggestedProducts: POPULAR_RECOMMENDATIONS,
            action: "catalog",
          };
          break;

        case "wholesale":
          botResponse = {
            id: `bot-${Date.now()}`,
            role: "assistant",
            content:
              "We provide Tier-1 volume wholesale pricing directly from our **Bakersfield Depot**:\n\n• **Tier 1 (5–24 cases)**: Wholesale volume discount\n• **Tier 2 (Pallet / 25+ cases)**: Extra 15%–25% savings\n• **Truckload Rates**: Dedicated contract pricing for heavy volume\n• **Tax-Free Orders**: Upload your CDTFA California Resale Certificate at checkout\n\nWould you like to request a custom pallet quote or speak directly with our depot dispatch?",
            action: "quote",
          };
          break;

        case "compare":
          botResponse = {
            id: `bot-${Date.now()}`,
            role: "assistant",
            content:
              "Here is a quick material guide to choose the ideal packaging for your menu:\n\n• **Polypropylene (PP)**: 100% leak-proof, microwave-safe up to 250°F, reusable & grease-resistant. Perfect for hot soups, curries, and heavy sauced entrees.\n• **Sugarcane Bagasse**: 100% compostable & eco-friendly. Great for burger joints, fried items, tacos, and dry takeout.\n• **Heavy Kraft Paper**: Modern natural artisan finish with greaseproof PE/PLA lining for salads and grain bowls.\n• **Clear PET**: Crystal-clear presentation for iced drinks, smoothies, parfaits, and cold salads (not microwaveable).",
            action: "catalog",
          };
          break;

        case "availability":
          botResponse = {
            id: `bot-${Date.now()}`,
            role: "assistant",
            content:
              "All products on our store are physically in stock and ready at our **Bakersfield Warehouse**:\n\n📍 **Depot Location**: 5880 District Blvd. Suite 17, Bakersfield, CA 93313\n🕒 **Hours**: Monday – Friday: 7:00 AM – 5:00 PM | Saturday: 8:00 AM – 2:00 PM\n⚡ **Same-Day Dock Pickup**: Orders prepared for loading in under 30 minutes!\n🚚 **Local Delivery**: Scheduled delivery across Bakersfield and Kern County.",
            action: "whatsapp",
          };
          break;

        case "order_help":
          botResponse = {
            id: `bot-${Date.now()}`,
            role: "assistant",
            content:
              "I'm here to assist with your order and checkout!\n\n• **Track Existing Order**: Type your Order Confirmation # (e.g. TOB-1042) or email.\n• **Proceeding to Checkout**: Need help reviewing your items or applying wholesale pallet rates?\n• **Direct Depot Help**: Call or text our dispatch team anytime for instant order modifications.",
            action: "checkout",
          };
          break;

        case "support":
          botResponse = {
            id: `bot-${Date.now()}`,
            role: "assistant",
            content:
              "The Takeout Box Customer Support is always here for your kitchen!\n\n• 📞 **Depot Phone**: +1 (661) 205-9667\n• 💬 **WhatsApp**: Direct chat with Bakersfield depot staff\n• 📋 **California Resale Exemption**: Submit your CDTFA form for tax-exempt invoicing\n• 🏢 **Dock Pickup**: 5880 District Blvd. Suite 17, Bakersfield CA\n\nHow else can I assist you today?",
            action: "whatsapp",
          };
          break;

        default:
          botResponse = {
            id: `bot-${Date.now()}`,
            role: "assistant",
            content: "How else can I assist you with your packaging today?",
          };
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 450);
  };

  // Handle free-form typed messages
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }));

      const [res] = await Promise.all([
        ApiClient.chat.sendMessage({
          message: text,
          conversationHistory: historyPayload,
        }),
        new Promise((resolve) => setTimeout(resolve, 600)),
      ]);

      if (res && res.reply) {
        const assistantMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content: res.reply,
          suggestedProducts: res.suggestedProducts,
          action: res.action,
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        throw new Error("No response reply");
      }
    } catch (err: any) {
      console.warn("[Bitey Chat] Fallback:", err?.message);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          content:
            "I'm here to help! For immediate stock confirmation, custom case pricing, or dock pickup at 5880 District Blvd. Suite 17, call our Bakersfield depot directly at **+1 (661) 205-9667** or message us on WhatsApp.",
          action: "whatsapp",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetConversation = () => {
    setMessages([initialGreetingMsg]);
  };

  const handleActionClick = (action: string) => {
    if (action === "whatsapp") {
      const waUrl =
        "https://wa.me/16612059667?text=" +
        encodeURIComponent(
          "Hello The Takeout Box Depot! I have a question regarding packaging supplies and bulk orders."
        );
      window.open(waUrl, "_blank", "noopener,noreferrer");
    } else if (action === "phone") {
      window.location.href = "tel:+16612059667";
    } else if (action === "quote") {
      setIsOpen(false);
      const quoteSection = document.getElementById("bulk-quote-section");
      if (quoteSection) {
        quoteSection.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push("/#bulk-quote-section");
      }
    } else if (action === "checkout") {
      setIsOpen(false);
      router.push("/checkout");
    } else if (action === "catalog") {
      setIsOpen(false);
      router.push("/products");
    }
  };

  // Helper to format bold text & bullets cleanly
  const renderFormattedText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      const isBullet = line.trim().startsWith("• ") || line.trim().startsWith("- ");
      const content = isBullet ? line.trim().substring(2) : line;

      const parts = content.split(/(\*\*.*?\*\*)/g);
      const parsed = parts.map((part, pIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (isBullet) {
        return (
          <div key={idx} style={{ display: "flex", gap: "7px", margin: "3px 0 3px 6px" }}>
            <span style={{ color: "#e11d24", fontWeight: "bold" }}>•</span>
            <div>{parsed}</div>
          </div>
        );
      }

      if (!line.trim()) {
        return <div key={idx} style={{ height: "6px" }} />;
      }

      return (
        <p key={idx} style={{ margin: "0 0 5px 0" }}>
          {parsed}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Chat Launcher (Large 78px button + "Ask Bitey Anything!" callout bubble) */}
      {!isOpen && (
        <aside aria-label="Bitey AI Assistant Launcher" className={styles.chatLauncherWrapper}>
          {/* Tilted Callout Badge: "Ask Bitey Anything!" */}
          <div
            className={styles.askBiteyBubble}
            onClick={() => setIsOpen(true)}
            role="button"
            tabIndex={0}
            aria-label="Open chat with Bitey"
          >
            <div className={styles.askBiteyText}>
              <span className={styles.askBiteyTitle}>Ask Bitey</span>
              <span className={styles.askBiteySubtitle}>Anything!</span>
            </div>
            <div className={styles.askBiteyArrow}>
              <ArrowUpRight size={14} />
            </div>
          </div>

          {/* Large Floating Launcher Button */}
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open Bitey AI Restaurant Supply Assistant"
            className={styles.launcherButton}
          >
            <img
              src="/images/bitey-avatar.png"
              alt="Bitey AI Assistant"
              className={styles.launcherAvatarImg}
              onError={(e) => {
                // Fallback to chatbot avatar if needed
                (e.target as HTMLImageElement).src = "/images/chatbot_avatar.jpg";
              }}
            />
            <span className={styles.onlineBadge} />
          </button>
        </aside>
      )}

      {/* Chat Window Dialog - Curved Red Device Design */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Bitey - AI Restaurant Supply Assistant"
          className={styles.chatWindow}
        >
          {/* Top Header: The Takeout Box Logo Pill + Bitey Title + Minimize/Close */}
          <div className={styles.chatHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.brandLogoPill}>
                <img
                  src="/images/takeout-logo.png"
                  alt="The Takeout Box"
                  className={styles.brandLogoImg}
                />
              </div>
              <div className={styles.headerText}>
                <div className={styles.headerTitle}>Bitey</div>
                <div className={styles.headerSubtitle}>AI Assistant</div>
              </div>
            </div>

            <div className={styles.headerActions}>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Minimize chat window"
                title="Minimize"
                className={styles.iconButton}
              >
                <Minus size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat window"
                title="Close"
                className={styles.iconButton}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div ref={messagesContainerRef} className={styles.messagesContainer}>
            {messages.map((msg, index) => (
              <div
                key={msg.id}
                className={`${styles.messageRow} ${
                  msg.role === "user" ? styles.userRow : styles.assistantRow
                }`}
              >
                {msg.role === "assistant" && (
                  <div className={styles.msgAvatarBox}>
                    <img
                      src="/images/bitey-chat-icon.png"
                      alt="Bitey"
                      className={styles.msgAvatarImg}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/bitey-avatar.png";
                      }}
                    />
                  </div>
                )}

                <div
                  className={`${styles.bubble} ${
                    msg.role === "user" ? styles.userBubble : styles.assistantBubble
                  }`}
                >
                  {msg.isGreeting ? (
                    <div>
                      <div className={styles.assistantGreetingTitle}>Hi! I&apos;m Bitey 👋</div>
                      <div className={styles.assistantGreetingSubtitle}>
                        Your Restaurant Supply Assistant.
                      </div>
                      <div className={styles.assistantGreetingPrompt}>
                        How can I help you today?
                      </div>

                      {/* The 7 Options directly from the reference image */}
                      <div className={styles.optionsList}>
                        {BITEY_OPTIONS.map((opt) => {
                          const IconComp = opt.icon;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              className={styles.optionCard}
                              onClick={() => handleSelectOption(opt.id, opt.label)}
                            >
                              <div className={styles.optionLeft}>
                                <div className={styles.optionIconWrapper}>
                                  <IconComp size={16} />
                                </div>
                                <span className={styles.optionLabel}>{opt.label}</span>
                              </div>
                              <ChevronRight size={16} className={styles.optionChevron} />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    renderFormattedText(msg.content)
                  )}

                  {/* Interactive Categories Grid for 'Browse Products' */}
                  {msg.showCategories && (
                    <div className={styles.categoryPillsGrid}>
                      <button
                        type="button"
                        className={styles.categoryPillBtn}
                        onClick={() => {
                          setIsOpen(false);
                          router.push("/products?category=containers");
                        }}
                      >
                        🍱 To-Go Containers
                      </button>
                      <button
                        type="button"
                        className={styles.categoryPillBtn}
                        onClick={() => {
                          setIsOpen(false);
                          router.push("/products?category=bowls");
                        }}
                      >
                        🥣 Paper Bowls & Lids
                      </button>
                      <button
                        type="button"
                        className={styles.categoryPillBtn}
                        onClick={() => {
                          setIsOpen(false);
                          router.push("/products?category=cups");
                        }}
                      >
                        🥤 Cups & Lids
                      </button>
                      <button
                        type="button"
                        className={styles.categoryPillBtn}
                        onClick={() => {
                          setIsOpen(false);
                          router.push("/products?category=bags");
                        }}
                      >
                        🛍️ Bags & Packaging
                      </button>
                    </div>
                  )}

                  {/* Product Cards for 'Recommend Products' */}
                  {msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
                    <div className={styles.productsContainer}>
                      {msg.suggestedProducts.map((prod) => (
                        <Link
                          key={prod.id}
                          href={`/product/${prod.id}`}
                          className={styles.productCard}
                          onClick={() => setIsOpen(false)}
                        >
                          <img
                            src={prod.image || "/images/product-placeholder.png"}
                            alt={prod.name}
                            className={styles.productThumb}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "/images/product-placeholder.png";
                            }}
                          />
                          <div className={styles.productDetails}>
                            <div className={styles.productName}>{prod.name}</div>
                            <div className={styles.productMeta}>
                              <span className={styles.productPrice}>
                                ${prod.price > 0 ? prod.price.toFixed(2) : "Wholesale"}
                              </span>
                              {prod.caseCount ? <span>· {prod.caseCount}/cs</span> : null}
                            </div>
                          </div>
                          <ChevronRight size={16} className={styles.productActionIcon} />
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Contextual Action CTAs */}
                  {msg.action && msg.action !== "none" && (
                    <div className={styles.actionBtnBox}>
                      {msg.action === "quote" && (
                        <button
                          type="button"
                          className={`${styles.actionBtn} ${styles.redActionBtn}`}
                          onClick={() => handleActionClick("quote")}
                        >
                          <Building size={14} />
                          <span>Request Wholesale Pallet Quote</span>
                        </button>
                      )}
                      {msg.action === "catalog" && (
                        <button
                          type="button"
                          className={`${styles.actionBtn} ${styles.darkActionBtn}`}
                          onClick={() => handleActionClick("catalog")}
                        >
                          <ExternalLink size={14} />
                          <span>View Full Wholesale Catalog</span>
                        </button>
                      )}
                      {msg.action === "checkout" && (
                        <button
                          type="button"
                          className={`${styles.actionBtn} ${styles.redActionBtn}`}
                          onClick={() => handleActionClick("checkout")}
                        >
                          <ShoppingCart size={14} />
                          <span>Proceed to Checkout</span>
                        </button>
                      )}
                      {msg.action === "whatsapp" && (
                        <button
                          type="button"
                          className={styles.actionBtn}
                          onClick={() => handleActionClick("whatsapp")}
                        >
                          <Phone size={14} />
                          <span>Chat on WhatsApp (+1 661-205-9667)</span>
                        </button>
                      )}
                    </div>
                  )}

                  {/* If user has chatted past initial greeting, show quick option to return to Bitey menu */}
                  {index === messages.length - 1 && index > 0 && !isLoading && (
                    <button
                      type="button"
                      className={styles.restartOptionsBtn}
                      onClick={handleResetConversation}
                    >
                      <RotateCcw size={12} />
                      <span>Back to All Bitey Options</span>
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Loading / Typing indicator */}
            {isLoading && (
              <div className={`${styles.messageRow} ${styles.assistantRow}`}>
                <div className={styles.msgAvatarBox}>
                  <img
                    src="/images/bitey-chat-icon.png"
                    alt="Bitey"
                    className={styles.msgAvatarImg}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/bitey-avatar.png";
                    }}
                  />
                </div>
                <div className={styles.typingRow}>
                  <div className={styles.typingDot} />
                  <div className={styles.typingDot} />
                  <div className={styles.typingDot} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Chat Input Form with Red Circular Send Button */}
          <div className={styles.chatFooter}>
            <form
              className={styles.inputForm}
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <input
                ref={inputRef}
                type="text"
                className={styles.chatInput}
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="submit"
                aria-label="Send message to Bitey"
                className={styles.sendBtn}
                disabled={isLoading || !inputMessage.trim()}
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
