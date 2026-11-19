"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Archive,
  Package,
  Layers,
  Soup,
  CircleDot,
  Square,
  Grid,
  Leaf,
  Box,
  CupSoda,
  Disc,
  Wine,
  Coffee,
  Shield,
  Flame,
  Utensils,
  Minus,
  Plus,
  FileText,
  ShoppingBag,
  Columns,
  Boxes,
  Sparkles,
  Search,
  X,
  ChevronRight,
  Filter,
  ShoppingCart,
  Warehouse,
  RotateCcw,
} from "lucide-react";

import styles from "./ProductsPage.module.css";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import {
  Product,
  MAIN_CATEGORIES,
  CATEGORIES,
  PRODUCTS,
} from "../../data/products";
import { useCart } from "../../context/CartContext";

// Icon lookup dictionary
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Archive: <Archive size={17} />,
  Package: <Package size={17} />,
  Layers: <Layers size={17} />,
  Soup: <Soup size={17} />,
  CircleDot: <CircleDot size={17} />,
  Square: <Square size={17} />,
  Grid: <Grid size={17} />,
  Leaf: <Leaf size={17} />,
  Box: <Box size={17} />,
  CupSoda: <CupSoda size={17} />,
  Disc: <Disc size={17} />,
  Wine: <Wine size={17} />,
  Coffee: <Coffee size={17} />,
  Shield: <Shield size={17} />,
  Flame: <Flame size={17} />,
  Utensils: <Utensils size={17} />,
  Minus: <Minus size={17} />,
  FileText: <FileText size={17} />,
  ShoppingBag: <ShoppingBag size={17} />,
  Columns: <Columns size={17} />,
  Boxes: <Boxes size={17} />,
  Sparkles: <Sparkles size={17} />,
};

// Sub-filter tabs definition for major categories
const CATEGORY_TABS: Record<string, { label: string; value: string }[]> = {
  "hinged-containers": [
    { label: "All", value: "all" },
    { label: "MFPP White", value: "MFPP White" },
    { label: "MFPP Black", value: "MFPP Black" },
    { label: "Two-Color", value: "Two-Color" },
    { label: "Translucent", value: "Translucent" },
    { label: "Clear PS", value: "Clear PS" },
    { label: "Bagasse", value: "Bagasse" },
    { label: "Corner Lock", value: "Corner Lock" },
    { label: "Center Slide", value: "Center Slide" },
    { label: "Discontinuing", value: "Discontinuing Black PP" },
  ],
  "deli-containers": [
    { label: "All", value: "all" },
    { label: "Combo Sets", value: "combo" },
    { label: "Regular Bulk Bases", value: "bulk" },
    { label: "Thin/Clear Cups", value: "thin-clear" },
    { label: "Lids", value: "lids" },
  ],
  "deli-containers-two-piece": [
    { label: "All", value: "all" },
    { label: "Combo Sets", value: "combo" },
    { label: "Regular Bulk Bases", value: "bulk" },
    { label: "Thin/Clear Cups", value: "thin-clear" },
    { label: "Lids", value: "lids" },
  ],
  "two-piece-containers": [
    { label: "All", value: "all" },
    { label: "Combo Sets", value: "combo" },
    { label: "Regular Bulk Bases", value: "bulk" },
    { label: "Thin/Clear Cups", value: "thin-clear" },
    { label: "Lids", value: "lids" },
  ],
  "noodle-bowls": [
    { label: "All", value: "all" },
    { label: "Black Bowls", value: "Black" },
    { label: "White Bowls", value: "White" },
    { label: "Inserts & Sets", value: "insert" },
  ],
  "bagasse-hinged-containers": [
    { label: "All", value: "all" },
    { label: "1-Compartment", value: "1-comp" },
    { label: "3-Compartment", value: "3-comp" },
  ],
  "bagasse-products": [
    { label: "All", value: "all" },
    { label: "Round Plates", value: "round-plate" },
    { label: "Compartment Plates", value: "comp-plate" },
    { label: "Bowls", value: "bowl" },
    { label: "PET Lids", value: "lid" },
  ],
  "portion-cups": [
    { label: "All", value: "all" },
    { label: "PP Cups", value: "pp" },
    { label: "Clear Cups", value: "clear" },
  ],
  "pet-cups": [
    { label: "All", value: "all" },
    { label: "98mm Cups", value: "98mm" },
    { label: "107mm Cups", value: "107mm" },
    { label: "Color Cups", value: "color" },
  ],
  "pet-cup-lids": [
    { label: "All", value: "all" },
    { label: "98mm Lids", value: "98mm" },
    { label: "107mm Lids", value: "107mm" },
    { label: "Flat Lids", value: "Flat" },
    { label: "Dome Lids", value: "Dome" },
  ],
  "paper-cups": [
    { label: "All", value: "all" },
    { label: "Single Wall White", value: "single-wall" },
    { label: "Coffee Cups", value: "coffee" },
  ],
  "cutlery": [
    { label: "All", value: "all" },
    { label: "Forks", value: "fork" },
    { label: "Tea Spoons", value: "tea-spoon" },
    { label: "Soup Spoons", value: "soup-spoon" },
    { label: "Cutlery Kits", value: "kit" },
  ],
  "paper-take-out-boxes": [
    { label: "All", value: "all" },
    { label: "Paper Take-Out Box", value: "white" },
    { label: "Bio Box", value: "kraft" },
  ],
  "rectangular-containers": [
    { label: "All", value: "all" },
    { label: "Standard Sets", value: "RC" },
    { label: "Shallow Sets", value: "SRC" },
  ],
  "aluminum-foil-and-pans": [
    { label: "All", value: "all" },
    { label: "Steam Table Pans", value: "Pan" },
    { label: "Foil Rolls", value: "Roll" },
    { label: "Pop-Up Sheets", value: "Sheet" },
  ],
  "food-paper-and-wraps": [
    { label: "All", value: "all" },
    { label: "Freezer Paper", value: "Freezer" },
    { label: "Checker Liners", value: "Checker" },
    { label: "Steak Paper", value: "Steak" },
    { label: "Cling Film", value: "Film" },
  ],
  "janitorial-and-cleaning": [
    { label: "All", value: "all" },
    { label: "Cleaners & Detergents", value: "Cleaner" },
    { label: "Can Liners", value: "Trash" },
    { label: "Gloves & Towels", value: "Gloves" },
  ],
  "bags": [
    { label: "All", value: "all" },
    { label: "Kraft Bags", value: "Kraft" },
    { label: "Brown Grocery Sacks", value: "Brown" },
    { label: "Thank You Bags", value: "Thank" },
    { label: "Roll & Poly Bags", value: "Roll" },
  ],
  "soup-containers": [
    { label: "All", value: "all" },
    { label: "Paper Soup Tubs", value: "Paper" },
    { label: "Plastic Soup Cups", value: "Plastic" },
    { label: "Soup Lids", value: "Lid" },
  ],
};

function ProductsCatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { items, addToCart, updateQuantity } = useCart();

  // URL state sync
  const initialCategory = searchParams.get("category") || "hinged-containers";
  const initialSearch = searchParams.get("search") || "";
  const initialType = searchParams.get("type") || "all";

  const [activeCategorySlug, setActiveCategorySlug] = useState<string>(initialCategory);
  const [activeTab, setActiveTab] = useState<string>(initialType);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedSize, setSelectedSize] = useState<string>("all");
  const [selectedCompartment, setSelectedCompartment] = useState<string>("all");
  const [selectedColor, setSelectedColor] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("price-asc");

  // Mobile drawer states
  const [isCategoriesDrawerOpen, setIsCategoriesDrawerOpen] = useState<boolean>(false);
  const [isFiltersDrawerOpen, setIsFiltersDrawerOpen] = useState<boolean>(false);

  // Keep state in sync with URL
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && cat !== activeCategorySlug) {
      setActiveCategorySlug(cat);
      setActiveTab("all");
      setSelectedSize("all");
      setSelectedCompartment("all");
      setSelectedColor("all");
    }
    const q = searchParams.get("search");
    if (q !== null && q !== searchQuery) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  // Instant back/forward browser navigation support
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("category") || "hinged-containers";
      setActiveCategorySlug(cat);
      setActiveTab(params.get("type") || "all");
      setSearchQuery(params.get("search") || "");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Current category metadata
  const currentCategory = useMemo(() => {
    if (activeCategorySlug === "all") {
      return {
        id: "all",
        name: "All Products",
        slug: "all",
        description: "Browse our complete commercial food packaging & restaurant supply catalog.",
        image: "/images/white_hinged_box.jpg",
        iconName: "Boxes",
      };
    }
    return (
      MAIN_CATEGORIES.find((c) => c.slug === activeCategorySlug) ||
      MAIN_CATEGORIES[0]
    );
  }, [activeCategorySlug]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    counts["all"] = PRODUCTS.length;
    CATEGORIES.forEach((c) => {
      if (c.slug === "all") return;
      const isDeli =
        c.slug === "deli-containers" ||
        c.slug === "deli-containers-two-piece" ||
        c.slug === "two-piece-containers";
      counts[c.slug] = PRODUCTS.filter((p) => {
        if (isDeli) {
          return (
            p.familyCategory === "deli-containers" ||
            p.category === "deli-containers" ||
            p.category === "deli-containers-two-piece" ||
            p.familyCategory === "two-piece-containers"
          );
        }
        const family = p.familyCategory || "hinged-containers";
        return family === c.slug || p.category === c.slug;
      }).length;
    });
    return counts;
  }, []);

  // Change category handler - Instant client state update
  const handleSelectCategory = (slug: string) => {
    setActiveCategorySlug(slug);
    setActiveTab("all");
    setSelectedSize("all");
    setSelectedCompartment("all");
    setSelectedColor("all");
    setIsCategoriesDrawerOpen(false);

    // Update URL query cleanly and instantly without waiting for network/flight payloads
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("category", slug);
      url.searchParams.delete("type");
      if (!searchQuery) url.searchParams.delete("search");
      window.history.replaceState(null, "", url.pathname + url.search);
    }
  };

  // Filter tabs for the active category
  const availableTabs = CATEGORY_TABS[activeCategorySlug] || [
    { label: "All", value: "all" },
  ];

  // Base products in the active category
  const categoryProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (activeCategorySlug === "all") return true;
      const isDeli =
        activeCategorySlug === "deli-containers" ||
        activeCategorySlug === "deli-containers-two-piece" ||
        activeCategorySlug === "two-piece-containers";
      if (isDeli) {
        return (
          p.familyCategory === "deli-containers" ||
          p.category === "deli-containers" ||
          p.category === "deli-containers-two-piece" ||
          p.familyCategory === "two-piece-containers"
        );
      }
      const family = p.familyCategory || "hinged-containers";
      return family === activeCategorySlug || p.category === activeCategorySlug;
    });
  }, [activeCategorySlug]);

  // Dynamic filter options based on products currently in this category
  const filterOptions = useMemo(() => {
    const sizes = new Set<string>();
    const compartments = new Set<string>();
    const colors = new Set<string>();

    categoryProducts.forEach((p) => {
      if (p.sizeBadge && p.sizeBadge !== "Standard") sizes.add(p.sizeBadge);
      if (p.compartments) compartments.add(p.compartments);
      if (p.color) colors.add(p.color);
    });

    return {
      sizes: Array.from(sizes).sort(),
      compartments: Array.from(compartments).sort(),
      colors: Array.from(colors).sort(),
    };
  }, [categoryProducts]);

  // Full filtered product list
  const filteredProducts = useMemo(() => {
    return categoryProducts.filter((p) => {
      // 1. Text Search Filter (supports SKU, Name, Description, Size)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchSku = p.sku.toLowerCase().includes(q);
        const matchName = p.name.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchSize = p.sizeBadge?.toLowerCase().includes(q) || false;
        const matchMaterial = p.material?.toLowerCase().includes(q) || false;
        if (!matchSku && !matchName && !matchDesc && !matchSize && !matchMaterial) {
          return false;
        }
      }

      // 2. Active Tab Sub-type Filter
      if (activeTab !== "all") {
        if (activeCategorySlug === "hinged-containers") {
          if (p.productType !== activeTab) return false;
        } else if (
          activeCategorySlug === "deli-containers" ||
          activeCategorySlug === "deli-containers-two-piece" ||
          activeCategorySlug === "two-piece-containers"
        ) {
          if (activeTab === "combo") {
            return (
              p.productType === "Combo Set" ||
              p.sku.startsWith("SDLH") ||
              (p.sku.startsWith("DLH") && !p.sku.includes("-500"))
            );
          }
          if (activeTab === "bulk") {
            return (
              p.productType === "Regular Bulk Base" ||
              (p.sku.startsWith("DLH") && p.sku.includes("-500"))
            );
          }
          if (activeTab === "thin-clear") {
            return (
              (p.sku.startsWith("DLC") && p.sku !== "DLCLU") ||
              p.productType === "Thin Clear Cup"
            );
          }
          if (activeTab === "lids") {
            return (
              p.sku === "LID-500" ||
              p.sku === "DLCLU" ||
              p.productType === "Lid" ||
              p.productType === "Thin Clear Lid" ||
              p.name.toLowerCase().includes("lid")
            );
          }
        } else if (activeCategorySlug === "noodle-bowls") {
          if (activeTab === "insert" && !p.sku.includes("INT") && !p.name.toLowerCase().includes("insert")) return false;
          if (activeTab === "Black" && (p.color !== "Black" || p.sku.includes("INT"))) return false;
          if (activeTab === "White" && (p.color !== "White" || p.sku.includes("INT"))) return false;
        } else if (activeCategorySlug === "bagasse-hinged-containers") {
          if (activeTab === "1-comp" && (p.sku.includes("83") || p.sku.includes("93") || p.name.includes("3 Compartment"))) return false;
          if (activeTab === "3-comp" && !p.sku.includes("83") && !p.sku.includes("93") && !p.name.includes("3 Compartment")) return false;
        } else if (activeCategorySlug === "bagasse-products") {
          if (activeTab === "lid" && !p.sku.startsWith("BGL")) return false;
          if (activeTab === "bowl" && !p.sku.startsWith("BGBW")) return false;
          if (activeTab === "comp-plate" && !p.sku.includes("93") && !p.sku.includes("103")) return false;
          if (activeTab === "round-plate" && (p.sku.includes("93") || p.sku.includes("103") || !p.sku.startsWith("BGRPW"))) return false;
        } else if (activeCategorySlug === "portion-cups") {
          if (activeTab === "pp" && !p.sku.startsWith("PC")) return false;
          if (activeTab === "clear" && p.sku.startsWith("PC")) return false;
        } else if (activeCategorySlug === "pet-cups") {
          if (activeTab === "98mm" && !p.name.includes("98mm") && !p.sku.includes("98")) return false;
          if (activeTab === "107mm" && !p.name.includes("107mm") && !p.sku.includes("107")) return false;
          if (activeTab === "color" && !p.sku.includes("U16")) return false;
        } else if (activeCategorySlug === "pet-cup-lids") {
          if (activeTab === "98mm" && !p.name.includes("98mm") && !p.sku.includes("98")) return false;
          if (activeTab === "107mm" && !p.name.includes("107mm") && !p.sku.includes("107")) return false;
          if (activeTab === "Flat" && p.productType !== "Flat") return false;
          if (activeTab === "Dome" && p.productType !== "Dome") return false;
        } else if (activeCategorySlug === "paper-cups") {
          if (activeTab === "coffee" && !p.sku.startsWith("PAPER")) return false;
          if (activeTab === "single-wall" && !p.sku.startsWith("PASW")) return false;
        } else if (activeCategorySlug === "cutlery") {
          if (activeTab === "fork" && !p.name.toLowerCase().includes("fork")) return false;
          if (activeTab === "tea-spoon" && !p.name.toLowerCase().includes("tea spoon")) return false;
          if (activeTab === "soup-spoon" && !p.name.toLowerCase().includes("soup spoon")) return false;
          if (activeTab === "kit" && !p.name.toLowerCase().includes("kit")) return false;
        } else if (activeCategorySlug === "paper-take-out-boxes") {
          if (activeTab === "white" && !p.sku.startsWith("PTW")) return false;
          if (activeTab === "kraft" && !p.sku.startsWith("BP")) return false;
        }
      }

      // 3. Size Filter
      if (selectedSize !== "all" && p.sizeBadge !== selectedSize) {
        return false;
      }

      // 4. Compartment Filter
      if (selectedCompartment !== "all" && p.compartments !== selectedCompartment) {
        return false;
      }

      // 5. Color Filter
      if (selectedColor !== "all" && p.color !== selectedColor) {
        return false;
      }

      return true;
    });
  }, [
    categoryProducts,
    searchQuery,
    activeTab,
    activeCategorySlug,
    selectedSize,
    selectedCompartment,
    selectedColor,
  ]);

  // Sorted product list
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "price-asc") {
      list.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === "sku-asc") {
      list.sort((a, b) => a.sku.localeCompare(b.sku));
    } else if (sortBy === "name-asc") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [filteredProducts, sortBy]);

  // Grouped products for Hinged Containers when "All" tab is active and no text search
  const isHingedContainerGrouped =
    activeCategorySlug === "hinged-containers" &&
    activeTab === "all" &&
    !searchQuery &&
    selectedSize === "all" &&
    selectedCompartment === "all" &&
    selectedColor === "all";

  const hingedGroups = useMemo(() => {
    if (!isHingedContainerGrouped) return [];

    const groups = [
      {
        title: "MFPP Hinged Containers - White",
        items: sortedProducts.filter((p) => p.productType === "MFPP White"),
      },
      {
        title: "MFPP Hinged Containers - Black",
        items: sortedProducts.filter((p) => p.productType === "MFPP Black"),
      },
      {
        title: "Two-Color Hinged Containers",
        items: sortedProducts.filter((p) => p.productType === "Two-Color"),
      },
      {
        title: "Translucent Hinged Containers",
        items: sortedProducts.filter((p) => p.productType === "Translucent"),
      },
      {
        title: "Clear Polystyrene Hinged Containers",
        items: sortedProducts.filter((p) => p.productType === "Clear PS"),
      },
      {
        title: "Corner Lock Clamshells",
        items: sortedProducts.filter((p) => p.productType === "Corner Lock"),
      },
      {
        title: "Center Slide Clamshells",
        items: sortedProducts.filter((p) => p.productType === "Center Slide"),
      },
      {
        title: "Bagasse Hinged Containers (PFAS FREE)",
        items: sortedProducts.filter((p) => p.productType === "Bagasse"),
      },
      {
        title: "Discontinuing Black PP Hinged Containers",
        items: sortedProducts.filter((p) => p.productType === "Discontinuing Black PP"),
      },
    ];

    return groups.filter((g) => g.items.length > 0);
  }, [isHingedContainerGrouped, sortedProducts]);

  const handleResetAllFilters = () => {
    setActiveTab("all");
    setSearchQuery("");
    setSelectedSize("all");
    setSelectedCompartment("all");
    setSelectedColor("all");
  };

  const hasActiveFilters =
    activeTab !== "all" ||
    searchQuery !== "" ||
    selectedSize !== "all" ||
    selectedCompartment !== "all" ||
    selectedColor !== "all";

  // Reusable Product Card Component with Add to Cart / [- Qty +] Stepper (Requirement 2)
  const renderProductCard = (product: Product) => {
    const defaultSize =
      product.sizes && product.sizes.length > 0
        ? product.sizes[0]
        : {
            name: product.sizeBadge || "Standard Case",
            sku: product.sku,
            price: product.price || 24.5,
            caseCount: parseInt(product.packaging || "150") || 150,
            unitPrice: (product.price || 24.5) / 150,
          };

    // Find if this product / SKU is currently in the cart
    const inCartItem = items.find(
      (item) => item.product.id === product.id || (item.size && item.size.sku === product.sku)
    );
    const inCartQty = inCartItem ? inCartItem.quantity : 0;
    const currentSizeName = inCartItem?.size.name || defaultSize.name;

    const handleAddClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      addToCart(product, defaultSize, 1);
    };

    const handleIncrement = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      updateQuantity(product.id, currentSizeName, inCartQty + 1);
    };

    const handleDecrement = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      updateQuantity(product.id, currentSizeName, inCartQty - 1);
    };

    return (
      <div key={product.id} className={styles.productCard}>
        {/* Top Product Image Box with Size Badge */}
        <div className={styles.imageWrapper}>
          <Link
            href={`/product/${product.id}`}
            style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image || "/images/white_hinged_box.jpg"}
              alt={product.name}
              className={styles.productImage}
              loading="lazy"
            />
          </Link>

          {/* Size Pill Badge on Top Right */}
          {product.sizeBadge && product.sizeBadge !== "Standard" && (
            <span className={styles.sizeBadge}>{product.sizeBadge}</span>
          )}

          {/* Discontinuing Status Badge */}
          {product.discontinuing && (
            <span className={styles.statusBadge}>Discontinuing</span>
          )}
        </div>

        {/* Card Body */}
        <div className={styles.cardBody}>
          <div className={styles.skuTag}>{product.sku}</div>

          <Link href={`/product/${product.id}`} className={styles.cardName} title={product.name}>
            {product.name}
          </Link>

          <div className={styles.metaInfo}>
            {product.packaging && (
              <span className={styles.packagingText}>{product.packaging}</span>
            )}
            {product.palletTiHi && (
              <span className={styles.palletInfo}>
                <Warehouse size={12} className={styles.palletIcon} />
                Pallet TI/HI: {product.palletTiHi}
              </span>
            )}
          </div>

          <div className={styles.priceRow}>
            {product.price > 0 ? (
              <span className={styles.price}>${product.price.toFixed(2)}</span>
            ) : (
              <span className={styles.priceUnavail}>Price: Contact Depot</span>
            )}
          </div>

          {/* Dynamic Action Area: [ Add to Cart ] vs [- Qty +] Stepper (Requirement 2) */}
          <div className={styles.actionContainer}>
            {inCartQty === 0 ? (
              <button
                type="button"
                className={styles.addToCartBtn}
                onClick={handleAddClick}
                aria-label={`Add ${product.sku} to Cart`}
              >
                <ShoppingCart size={15} />
                Add to Cart
              </button>
            ) : (
              <div className={styles.qtyController}>
                <button
                  type="button"
                  className={styles.qtyBtn}
                  onClick={handleDecrement}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className={styles.qtyNumber}>{inCartQty}</span>
                <button
                  type="button"
                  className={styles.qtyBtn}
                  onClick={handleIncrement}
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.pageContainer}>
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectCategory={handleSelectCategory}
      />

      {/* Mobile Sticky Action Bar */}
      <div className={styles.mobileActionBar}>
        <button
          type="button"
          className={styles.mobileActionBtn}
          onClick={() => setIsCategoriesDrawerOpen(true)}
        >
          <Filter size={16} />
          Categories ({MAIN_CATEGORIES.length})
        </button>

        <button
          type="button"
          className={styles.mobileActionBtn}
          onClick={() => setIsFiltersDrawerOpen(true)}
        >
          <Search size={16} />
          Filters &amp; Sort
        </button>
      </div>

      {/* Mobile Categories Drawer */}
      {isCategoriesDrawerOpen && (
        <div
          className={styles.drawerOverlay}
          onClick={() => setIsCategoriesDrawerOpen(false)}
        >
          <div
            className={styles.drawerContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.drawerHeader}>
              <h3 className={styles.sidebarTitle}>
                Product Categories
              </h3>
              <button
                type="button"
                className={styles.drawerCloseBtn}
                onClick={() => setIsCategoriesDrawerOpen(false)}
                aria-label="Close categories"
              >
                <X size={20} />
              </button>
            </div>

            <ul className={styles.categoryList}>
              {CATEGORIES.map((cat) => {
                const count = categoryCounts[cat.slug] || 0;
                const isActive = activeCategorySlug === cat.slug;
                return (
                  <li key={cat.id} className={styles.categoryItem}>
                    <button
                      type="button"
                      className={`${styles.categoryBtn} ${isActive ? styles.categoryBtnActive : ""}`}
                      onClick={() => handleSelectCategory(cat.slug)}
                    >
                      <div className={styles.categoryLeft}>
                        <span className={styles.categoryIcon}>
                          {CATEGORY_ICONS[cat.iconName] || <Package size={17} />}
                        </span>
                        <span className={styles.categoryName}>{cat.name}</span>
                      </div>
                      <div className={styles.categoryRight}>
                        <span className={styles.categoryCount}>({count})</span>
                        {!isActive && <ChevronRight size={14} className={styles.categoryChevron} />}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      {/* Main Content Layout */}
      <div className="container">
        <div className={styles.catalogLayout}>
          {/* ============================================================
              LEFT SIDEBAR - PRODUCT CATEGORIES
              With pinned sticky title that stays in place and never scrolls away!
             ============================================================ */}
          <aside className={styles.sidebar}>
            {/* Pinned Title Header (Requirement 3) */}
            <div className={styles.sidebarHeader}>
              <h2 className={styles.sidebarTitle}>Product Categories</h2>
              <span className={styles.sidebarCountPill}>{CATEGORIES.length}</span>
            </div>

            {/* Scrollable category list */}
            <ul className={styles.categoryList}>
              {CATEGORIES.map((cat) => {
                const count = categoryCounts[cat.slug] || 0;
                const isActive = activeCategorySlug === cat.slug;
                return (
                  <li key={cat.id} className={styles.categoryItem}>
                    <button
                      type="button"
                      className={`${styles.categoryBtn} ${isActive ? styles.categoryBtnActive : ""}`}
                      onClick={() => handleSelectCategory(cat.slug)}
                    >
                      <div className={styles.categoryLeft}>
                        <span className={styles.categoryIcon}>
                          {CATEGORY_ICONS[cat.iconName] || <Package size={17} />}
                        </span>
                        <span className={styles.categoryName}>{cat.name}</span>
                      </div>
                      <div className={styles.categoryRight}>
                        <span className={styles.categoryCount}>({count})</span>
                        {!isActive && (
                          <ChevronRight size={14} className={styles.categoryChevron} />
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* ============================================================
              CENTER MAIN CATALOG CONTENT
             ============================================================ */}
          <main className={styles.mainContent}>
            {/* STICKY CATEGORY HEADER BAR (Requirement 3: stays there when scrolling!) */}
            <div className={styles.stickyCategoryBar}>
              {/* Breadcrumb Navigation */}
              <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                <Link href="/" className={styles.breadcrumbLink}>
                  Home
                </Link>
                <ChevronRight size={12} color="#94A3B8" />
                <span className={styles.breadcrumbCurrent}>
                  {currentCategory.name}
                </span>
              </nav>

              {/* Title & Count Row */}
              <div className={styles.categoryTitleRow}>
                <h1 className={styles.categoryTitle}>{currentCategory.name}</h1>
                <span className={styles.categoryProductCount}>
                  {filteredProducts.length} {filteredProducts.length === 1 ? "Product" : "Products"}
                </span>
              </div>

              {/* Category Description */}
              <p className={styles.categoryDescription}>
                {currentCategory.description}
              </p>
            </div>

            {/* Primary Controls Row: Filter Tabs & Sort Dropdown */}
            <div className={styles.controlsRow}>
              {/* Category Filter Pills */}
              <div className={styles.filterTabsGroup}>
                {availableTabs.map((tab) => {
                  const isActive = activeTab === tab.value;
                  return (
                    <button
                      key={tab.value}
                      type="button"
                      className={`${styles.filterTabBtn} ${isActive ? styles.filterTabBtnActive : ""}`}
                      onClick={() => setActiveTab(tab.value)}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Sort by Dropdown */}
              <div className={styles.sortAndFilterGroup}>
                <select
                  className={styles.sortSelect}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort products by"
                >
                  <option value="price-asc">Sort: Price (Low to High)</option>
                  <option value="price-desc">Sort: Price (High to Low)</option>
                  <option value="sku-asc">Sort: SKU (A-Z)</option>
                  <option value="name-asc">Sort: Name (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Secondary Refinement Bar: Search, Size, Compartments & Color */}
            <div className={styles.secondaryControls}>
              {/* Keyword / SKU Search */}
              <div className={styles.searchInputWrapper}>
                <Search size={16} className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search SKU (e.g. V81WH), size (8x8)..."
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search within category"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className={styles.clearSearchBtn}
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* Dynamic Size Filter */}
              {filterOptions.sizes.length > 0 && (
                <select
                  className={styles.filterSelect}
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  aria-label="Filter by size"
                >
                  <option value="all">Size: All</option>
                  {filterOptions.sizes.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              )}

              {/* Dynamic Compartment Filter */}
              {filterOptions.compartments.length > 0 && (
                <select
                  className={styles.filterSelect}
                  value={selectedCompartment}
                  onChange={(e) => setSelectedCompartment(e.target.value)}
                  aria-label="Filter by compartments"
                >
                  <option value="all">Compartments: All</option>
                  {filterOptions.compartments.map((comp) => (
                    <option key={comp} value={comp}>
                      {comp}
                    </option>
                  ))}
                </select>
              )}

              {/* Dynamic Color Filter */}
              {filterOptions.colors.length > 0 && (
                <select
                  className={styles.filterSelect}
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  aria-label="Filter by color"
                >
                  <option value="all">Color: All</option>
                  {filterOptions.colors.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              )}

              {/* Reset Filters Button */}
              {hasActiveFilters && (
                <button
                  type="button"
                  className={styles.resetFiltersBtn}
                  onClick={handleResetAllFilters}
                >
                  <RotateCcw size={12} style={{ display: "inline", marginRight: 4 }} />
                  Reset Filters
                </button>
              )}
            </div>

            {/* Product Listing Area */}
            {sortedProducts.length === 0 ? (
              <div className={styles.emptyState}>
                <h3 className={styles.emptyStateTitle}>No products found</h3>
                <p className={styles.emptyStateText}>
                  We couldn&apos;t find any products matching your selected filters or search query.
                </p>
                <button
                  type="button"
                  className={styles.filterTabBtn}
                  onClick={handleResetAllFilters}
                >
                  Clear All Filters
                </button>
              </div>
            ) : isHingedContainerGrouped ? (
              /* Grouped View for Hinged Containers with Section Headings */
              <div>
                {hingedGroups.map((group) => (
                  <div key={group.title} className={styles.subSection}>
                    <h2 className={styles.subSectionTitle}>{group.title}</h2>
                    <div className={styles.productsGrid}>
                      {group.items.map((product) => renderProductCard(product))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Standard Grid View */
              <div className={styles.productsGrid}>
                {sortedProducts.map((product) => renderProductCard(product))}
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer onSelectCategory={handleSelectCategory} />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p>Loading Products Catalog...</p>
        </div>
      }
    >
      <ProductsCatalogContent />
    </Suspense>
  );
}
