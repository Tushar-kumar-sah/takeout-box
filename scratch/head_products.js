"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRODUCTS = exports.INDUSTRIES = exports.POSTER_SLIDES = exports.HERO_SLIDES = exports.CATEGORIES = exports.MAIN_CATEGORIES = void 0;
exports.MAIN_CATEGORIES = [
    {
        "id": "hinged-containers",
        "name": "Hinged Containers",
        "slug": "hinged-containers",
        "description": "Durable, leak-resistant and available in multiple sizes, colors and compartment options.",
        "image": "/images/white_hinged_box.jpg",
        "iconName": "Archive",
        "badge": "Popular"
    },
    {
        "id": "deli-containers",
        "name": "Deli Containers",
        "slug": "deli-containers",
        "description": "Clear polypropylene deli container cups & matching leak-proof lids for food prep & takeout.",
        "image": "/images/clear_deli_cup.jpg",
        "iconName": "Package",
        "badge": "Commercial"
    },
    {
        "id": "two-piece-containers",
        "name": "Two-Piece Containers",
        "slug": "two-piece-containers",
        "description": "PP deli container combo sets, individual heavy-duty bases and universal leak-resistant lids.",
        "image": "/images/clear_deli_cup.jpg",
        "iconName": "Layers"
    },
    {
        "id": "noodle-bowls",
        "name": "Noodle Bowls",
        "slug": "noodle-bowls",
        "description": "Microwaveable black & white noodle bowls with leak-proof lids and compartmental inserts.",
        "image": "/images/round_takeout_bowl.jpg",
        "iconName": "Soup",
        "badge": "Best Seller"
    },
    {
        "id": "round-containers",
        "name": "Round Containers & Bowls",
        "slug": "round-containers",
        "description": "Heavy-duty microwaveable round food prep and takeout containers with clear lids.",
        "image": "/images/round_takeout_bowl.jpg",
        "iconName": "CircleDot"
    },
    {
        "id": "rectangular-containers",
        "name": "Rectangular Containers",
        "slug": "rectangular-containers",
        "description": "Space-saving rectangular microwaveable meal prep containers with tight-seal lids.",
        "image": "/images/rectangular_takeout_box.jpg",
        "iconName": "Square"
    },
    {
        "id": "shallow-compartmental-containers",
        "name": "Shallow / Compartmental Containers",
        "slug": "shallow-compartmental-containers",
        "description": "Multi-compartment bento meal trays and shallow takeout food containers.",
        "image": "/images/rectangular_takeout_box.jpg",
        "iconName": "Grid"
    },
    {
        "id": "bagasse-products",
        "name": "Bagasse Plates & Bowls",
        "slug": "bagasse-products",
        "description": "100% compostable sugarcane bagasse round & compartment plates, bowls and matching lids (PFAS-Free).",
        "image": "/images/cat_paper_plates.jpg",
        "iconName": "Leaf",
        "badge": "PFAS-Free"
    },
    {
        "id": "paper-take-out-boxes",
        "name": "Paper Take-Out Boxes",
        "slug": "paper-take-out-boxes",
        "description": "Folded kraft bio boxes and white paper carryout takeout food containers.",
        "image": "/images/cat_takeout_containers.jpg",
        "iconName": "Box"
    },
    {
        "id": "portion-cups",
        "name": "Portion Cups",
        "slug": "portion-cups",
        "description": "Polypropylene portion sauce cups from 0.75oz to 5.5oz for dips, dressings and condiments.",
        "image": "/images/clear_deli_cup.jpg",
        "iconName": "CupSoda"
    },
    {
        "id": "portion-cup-lids",
        "name": "Portion Cup Lids",
        "slug": "portion-cup-lids",
        "description": "Clear flat PET snap lids matching standard commercial portion cups.",
        "image": "/images/clear_deli_cup.jpg",
        "iconName": "Disc"
    },
    {
        "id": "pet-cups",
        "name": "PET Cups",
        "slug": "pet-cups",
        "description": "Crystal clear 98mm and 107mm cold beverage PET drink cups for smoothies, teas and sodas.",
        "image": "/images/clear_deli_cup.jpg",
        "iconName": "Wine"
    },
    {
        "id": "pet-cup-lids",
        "name": "PET Cup Lids",
        "slug": "pet-cup-lids",
        "description": "Commercial flat, dome, sip and wide-hole lids for PET cold beverage cups.",
        "image": "/images/clear_deli_cup.jpg",
        "iconName": "Disc"
    },
    {
        "id": "paper-cups",
        "name": "Paper Cups",
        "slug": "paper-cups",
        "description": "Single wall white and coffee paper hot beverage cups in 4oz to 24oz sizes.",
        "image": "/images/cat_cups_lids.jpg",
        "iconName": "Coffee"
    },
    {
        "id": "paper-cup-lids-sleeves",
        "name": "Paper Cup Lids & Sleeves",
        "slug": "paper-cup-lids-sleeves",
        "description": "Flat and reclosable hot beverage cup lids and insulating kraft paper cup sleeves.",
        "image": "/images/cat_cups_lids.jpg",
        "iconName": "Shield"
    },
    {
        "id": "soup-containers",
        "name": "Paper Soup Containers",
        "slug": "soup-containers",
        "description": "Double-poly coated paper soup and hot food containers with matching vented lids.",
        "image": "/images/cat_soup_containers.jpg",
        "iconName": "Flame"
    },
    {
        "id": "cutlery",
        "name": "Cutlery & Kits",
        "slug": "cutlery",
        "description": "Heavy weight forks, spoons, soup spoons, wrapped cutlery and 3-in-1 / 6-in-1 complete kits.",
        "image": "/images/cat_cutlery.jpg",
        "iconName": "Utensils"
    },
    {
        "id": "straws",
        "name": "Straws",
        "slug": "straws",
        "description": "Individually wrapped and bulk black, color, and clear beverage drinking straws.",
        "image": "/images/cat_cups_lids.jpg",
        "iconName": "Minus"
    },
    {
        "id": "napkins",
        "name": "Napkins",
        "slug": "napkins",
        "description": "Commercial dispenser, dinner and beverage paper napkins for food service.",
        "image": "/images/cat_napkins.jpg",
        "iconName": "FileText"
    },
    {
        "id": "bags",
        "name": "Bags",
        "slug": "bags",
        "description": "Heavy-duty #5 and #10 self-opening kraft paper grocery and restaurant takeout bags.",
        "image": "/images/cat_kraft_bags.jpg",
        "iconName": "ShoppingBag"
    },
    {
        "id": "food-trays-plates",
        "name": "Food Trays & Plates",
        "slug": "food-trays-plates",
        "description": "Paper food trays (1LB to 3LB) and compostable paper plates for casual dining and takeout.",
        "image": "/images/cat_aluminum_trays.jpg",
        "iconName": "Columns"
    }
];
exports.CATEGORIES = __spreadArray([
    {
        id: "all",
        name: "All Products",
        slug: "all",
        description: "Browse our complete commercial food packaging & restaurant supply catalog",
        image: "/images/white_hinged_box.jpg",
        iconName: "Boxes"
    }
], exports.MAIN_CATEGORIES, true);
exports.HERO_SLIDES = [
    {
        id: "slide-1",
        image: "/images/hero_black_containers.jpg",
        title: "Premium Takeout Containers & Meal Prep Packaging",
        subtitle: "Heavy-duty, leak-proof microwaveable containers for professional kitchens",
        badge: "Bakersfield Depot",
        ctaText: "Shop Hinged Containers",
        ctaCategory: "hinged-containers",
        objectPosition: "center 55%"
    },
    {
        id: "slide-2",
        image: "/images/hero_eco_disposables.jpg",
        title: "Eco-Friendly Bagasse & Compostable Dinnerware",
        subtitle: "PFAS-free sugarcane plates, bowls and biodegradable takeout packaging",
        badge: "100% Certified Eco-Friendly",
        ctaText: "Shop Bagasse Products",
        ctaCategory: "bagasse-products",
        objectPosition: "center 60%"
    },
    {
        id: "slide-3",
        image: "/images/hero_packaging_handshake.jpg",
        title: "Direct Wholesale Restaurant Supply & Fast Local Delivery",
        subtitle: "Supplying Bakersfield and Central Valley restaurants with tiered volume pricing",
        badge: "Commercial Bulk Savings",
        ctaText: "Browse Full Catalog",
        ctaCategory: "all",
        objectPosition: "center 45%"
    },
    {
        id: "slide-4",
        image: "/images/hero_aluminum_foil.jpg",
        title: "Heavy-Gauge Aluminum Foil Pans & Catering Trays",
        subtitle: "Steam table pans, half pans and full pans for banquets and high-heat baking",
        badge: "Commercial Catering Grade",
        ctaText: "Shop Food Trays",
        ctaCategory: "food-trays-plates",
        objectPosition: "center 60%"
    }
];
exports.POSTER_SLIDES = [
    {
        id: "poster-1",
        image: "/images/poster_black_containers.jpeg",
        title: "Food Stays Better In The Right Containers",
        subtitle: "Leak-proof, fresh, safe always. Heavy-duty microwave-safe (-20°C to +110°C) BPA-free commercial PP containers.",
        category: "hinged-containers",
        tag: "Bakersfield Depot Direct"
    },
    {
        id: "poster-2",
        image: "/images/poster_bagasse_eco.jpeg",
        title: "Sustainable Packaging For A Greener Tomorrow",
        subtitle: "100% compostable sugarcane bagasse plates, bowls, 3-compartment clamshells & kraft bags. PFAS-Free certified.",
        category: "bagasse-products",
        tag: "100% Eco-Friendly"
    },
    {
        id: "poster-3",
        image: "/images/poster_drinkware_cups.jpeg",
        title: "Sip In Style. Serve With Confidence.",
        subtitle: "Crystal-clear PET cold cups with dome & flat lids, plus double-wall insulated hot coffee cups with snug sip lids.",
        category: "pet-cups",
        tag: "Commercial Drinkware"
    },
    {
        id: "poster-4",
        image: "/images/poster_catering_foil.jpeg",
        title: "Heavy-Duty Catering & Steam Table Pans",
        subtitle: "Heavy-gauge aluminum half & full steam table pans with matching lids and wrapped sanitary cutlery kits.",
        category: "food-trays-plates",
        tag: "Commercial Catering"
    }
];
exports.INDUSTRIES = [
    {
        id: "restaurants",
        name: "Full-Service Restaurants & Diners",
        tagline: "Leak-Proof Dine-In to Carryout",
        description: "Reliable, presentable containers that preserve temperature, integrity and sauce viscosity during transit.",
        iconName: "UtensilsCrossed",
        popularItems: ["Hinged Containers", "Rectangular PP Bowls", "Lidded Portion Cups", "Dinner Napkins"]
    },
    {
        id: "food-trucks",
        name: "Food Trucks & Street Carts",
        tagline: "Speed, Durability & Easy Hand-off",
        description: "Fast-loading clamshells, durable paper food trays, and heavy-weight cutlery built for high-volume service.",
        iconName: "Truck",
        popularItems: ["MFPP Clamshells", "Paper Food Trays", "Wrapped Cutlery Kits", "Kraft Carryout Bags"]
    },
    {
        id: "cloud-kitchens",
        name: "Ghost Kitchens & Delivery Brands",
        tagline: "Engineered For 30+ Minute Delivery",
        description: "Vented and anti-fog lids ensure fried food stays crispy and hot entrees never leak in courier bags.",
        iconName: "Building2",
        popularItems: ["Vented Hinged Boxes", "Noodle Bowls with Lids", "PET Drink Cups", "Tamper-Evident Bags"]
    },
    {
        id: "caterers",
        name: "Caterers & Banquet Services",
        tagline: "High-Volume Bulk Presentation",
        description: "Large capacity multi-compartment containers, eco dinnerware and heavy foil trays for elegant service.",
        iconName: "ChefHat",
        popularItems: ["Bagasse 3-Comp Plates", "Compartment Trays", "Serving Spoons", "Bio Take-Out Boxes"]
    },
    {
        id: "noodle-bars",
        name: "Asian Dining & Noodle Bars",
        tagline: "Deep Bowls & Broth-Separated Inserts",
        description: "Microwaveable noodle bowls with leak-proof lids and separate tray inserts to keep ramen and pho noodles firm.",
        iconName: "Soup",
        popularItems: ["36oz/42oz/50oz Noodle Bowls", "Noodle Bowl Inserts", "Deep Soup Spoons", "Soup Containers"]
    },
    {
        id: "bakeries",
        name: "Bakeries, Cafés & Delis",
        tagline: "Crystal-Clear Product Showcase",
        description: "Ultra-clear PET cups, portion cups for sauces and dressings, and deli tubs that highlight freshness.",
        iconName: "Store",
        popularItems: ["Clear Deli Cups & Lids", "PET Cold Cups & Dome Lids", "Paper Coffee Cups", "Dispenser Napkins"]
    }
];
exports.PRODUCTS = [
    {
        "id": "dlcu8",
        "sku": "DLCU8",
        "name": "Clear Deli Container Cups 8 oz, Polypropylene, 500pc (50/10)",
        "category": "deli-containers",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 150,
        "rating": 4.8,
        "reviewsCount": 28,
        "featured": true,
        "bestSeller": true,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU DLCU8: Clear Deli Container Cups 8 oz, Polypropylene, 500pc (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/8 (64cs).",
        "features": [
            "Commercial case pack: 500pc (50/10)",
            "Pallet TI/HI: 8/8 (64cs)",
            "Material: Polypropylene (PP)",
            "Restaurant wholesale direct pricing: $28.83/case"
        ],
        "material": "Polypropylene (PP)",
        "palletTiHi": "8/8 (64cs)",
        "price": 28.83,
        "mrpPrice": 38.92,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (500 pcs)",
                "sku": "DLCU8",
                "price": 28.83,
                "caseCount": 500,
                "unitPrice": 0.058,
                "palletTiHi": "8/8 (64cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "dlcu12",
            "dlcu16",
            "dlcu24",
            "dlcu32",
            "dlclu"
        ],
        "familyCategory": "deli-containers",
        "productType": "Standard",
        "sizeBadge": "8 oz",
        "packaging": "500pc (50/10)",
        "color": "Clear",
        "priceLabel": "$28.83",
        "discontinuing": false
    },
    {
        "id": "dlcu12",
        "sku": "DLCU12",
        "name": "Clear Deli Container Cups 12 oz, Polypropylene, 500pc (50/10)",
        "category": "deli-containers",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 173,
        "rating": 4.9,
        "reviewsCount": 35,
        "featured": true,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU DLCU12: Clear Deli Container Cups 12 oz, Polypropylene, 500pc (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/7 (56cs).",
        "features": [
            "Commercial case pack: 500pc (50/10)",
            "Pallet TI/HI: 8/7 (56cs)",
            "Material: Polypropylene (PP)",
            "Restaurant wholesale direct pricing: $28.83/case"
        ],
        "material": "Polypropylene (PP)",
        "palletTiHi": "8/7 (56cs)",
        "price": 28.83,
        "mrpPrice": 38.92,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (500 pcs)",
                "sku": "DLCU12",
                "price": 28.83,
                "caseCount": 500,
                "unitPrice": 0.058,
                "palletTiHi": "8/7 (56cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "dlcu8",
            "dlcu16",
            "dlcu24",
            "dlcu32",
            "dlclu"
        ],
        "familyCategory": "deli-containers",
        "productType": "Standard",
        "sizeBadge": "2 oz",
        "packaging": "500pc (50/10)",
        "color": "Clear",
        "priceLabel": "$28.83",
        "discontinuing": false
    },
    {
        "id": "dlcu16",
        "sku": "DLCU16",
        "name": "Clear Deli Container Cups 16 oz, Polypropylene, 500pc (50/10)",
        "category": "deli-containers",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 196,
        "rating": 4.7,
        "reviewsCount": 42,
        "featured": true,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU DLCU16: Clear Deli Container Cups 16 oz, Polypropylene, 500pc (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
        "features": [
            "Commercial case pack: 500pc (50/10)",
            "Pallet TI/HI: 8/5 (40cs)",
            "Material: Polypropylene (PP)",
            "Restaurant wholesale direct pricing: $30.53/case"
        ],
        "material": "Polypropylene (PP)",
        "palletTiHi": "8/5 (40cs)",
        "price": 30.53,
        "mrpPrice": 41.22,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (500 pcs)",
                "sku": "DLCU16",
                "price": 30.53,
                "caseCount": 500,
                "unitPrice": 0.061,
                "palletTiHi": "8/5 (40cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "dlcu8",
            "dlcu12",
            "dlcu24",
            "dlcu32",
            "dlclu"
        ],
        "familyCategory": "deli-containers",
        "productType": "Standard",
        "sizeBadge": "16 oz",
        "packaging": "500pc (50/10)",
        "color": "Clear",
        "priceLabel": "$30.53",
        "discontinuing": false
    },
    {
        "id": "dlcu24",
        "sku": "DLCU24",
        "name": "Clear Deli Container Cups 24 oz, Polypropylene, 500pc (25/20)",
        "category": "deli-containers",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 219,
        "rating": 4.8,
        "reviewsCount": 49,
        "featured": true,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU DLCU24: Clear Deli Container Cups 24 oz, Polypropylene, 500pc (25/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/8 (64cs).",
        "features": [
            "Commercial case pack: 500pc (25/20)",
            "Pallet TI/HI: 8/8 (64cs)",
            "Material: Polypropylene (PP)",
            "Restaurant wholesale direct pricing: $30.53/case"
        ],
        "material": "Polypropylene (PP)",
        "palletTiHi": "8/8 (64cs)",
        "price": 30.53,
        "mrpPrice": 41.22,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (500 pcs)",
                "sku": "DLCU24",
                "price": 30.53,
                "caseCount": 500,
                "unitPrice": 0.061,
                "palletTiHi": "8/8 (64cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "dlcu8",
            "dlcu12",
            "dlcu16",
            "dlcu32",
            "dlclu",
            "dlc24"
        ],
        "familyCategory": "deli-containers",
        "productType": "Standard",
        "sizeBadge": "4 oz",
        "packaging": "500pc (25/20)",
        "color": "Clear",
        "priceLabel": "$30.53",
        "discontinuing": false
    },
    {
        "id": "dlcu32",
        "sku": "DLCU32",
        "name": "Clear Deli Container Cups 32 oz, Polypropylene, 500pc (25/20)",
        "category": "deli-containers",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 242,
        "rating": 4.9,
        "reviewsCount": 56,
        "featured": true,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU DLCU32: Clear Deli Container Cups 32 oz, Polypropylene, 500pc (25/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/7 (56cs).",
        "features": [
            "Commercial case pack: 500pc (25/20)",
            "Pallet TI/HI: 8/7 (56cs)",
            "Material: Polypropylene (PP)",
            "Restaurant wholesale direct pricing: $34.33/case"
        ],
        "material": "Polypropylene (PP)",
        "palletTiHi": "8/7 (56cs)",
        "price": 34.33,
        "mrpPrice": 46.35,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (500 pcs)",
                "sku": "DLCU32",
                "price": 34.33,
                "caseCount": 500,
                "unitPrice": 0.069,
                "palletTiHi": "8/7 (56cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "dlcu8",
            "dlcu12",
            "dlcu16",
            "dlcu24",
            "dlclu",
            "dlc32"
        ],
        "familyCategory": "deli-containers",
        "productType": "Standard",
        "sizeBadge": "2 oz",
        "packaging": "500pc (25/20)",
        "color": "Clear",
        "priceLabel": "$34.33",
        "discontinuing": false
    },
    {
        "id": "dlclu",
        "sku": "DLCLU",
        "name": "Clear Deli Container Lids Only, Polypropylene, 500pc (50/10)",
        "category": "deli-containers",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 265,
        "rating": 4.8,
        "reviewsCount": 63,
        "featured": true,
        "bestSeller": true,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU DLCLU: Clear Deli Container Lids Only, Polypropylene, 500pc (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/7 (56cs).",
        "features": [
            "Commercial case pack: 500pc (50/10)",
            "Pallet TI/HI: 8/7 (56cs)",
            "Material: Polypropylene (PP)",
            "Restaurant wholesale direct pricing: $34.33/case"
        ],
        "material": "Polypropylene (PP)",
        "palletTiHi": "8/7 (56cs)",
        "price": 34.33,
        "mrpPrice": 46.35,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (500 pcs)",
                "sku": "DLCLU",
                "price": 34.33,
                "caseCount": 500,
                "unitPrice": 0.069,
                "palletTiHi": "8/7 (56cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "dlcu8",
            "dlcu12",
            "dlcu16",
            "dlcu24",
            "dlcu32"
        ],
        "familyCategory": "deli-containers",
        "productType": "Standard",
        "sizeBadge": "Universal Lid",
        "packaging": "500pc (50/10)",
        "color": "Clear",
        "priceLabel": "$34.33",
        "discontinuing": false
    },
    {
        "id": "dlc24",
        "sku": "DLC24",
        "name": "Clear Deli Container Cups 24 oz, Polypropylene, 500pc (25/20)",
        "category": "deli-containers",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 288,
        "rating": 4.9,
        "reviewsCount": 70,
        "featured": true,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU DLC24: Clear Deli Container Cups 24 oz, Polypropylene, 500pc (25/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
        "features": [
            "Commercial case pack: 500pc (25/20)",
            "Pallet TI/HI: 8/5 (40cs)",
            "Material: Polypropylene (PP)",
            "Restaurant wholesale direct pricing: $21.03/case"
        ],
        "material": "Polypropylene (PP)",
        "palletTiHi": "8/5 (40cs)",
        "price": 21.03,
        "mrpPrice": 28.39,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (500 pcs)",
                "sku": "DLC24",
                "price": 21.03,
                "caseCount": 500,
                "unitPrice": 0.042,
                "palletTiHi": "8/5 (40cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "dlc32",
            "dlcu24",
            "dlclu"
        ],
        "familyCategory": "deli-containers",
        "productType": "Standard",
        "sizeBadge": "4 oz",
        "packaging": "500pc (25/20)",
        "color": "Clear",
        "priceLabel": "$21.03",
        "discontinuing": false
    },
    {
        "id": "dlc32",
        "sku": "DLC32",
        "name": "Clear Deli Container Cups 32 oz, Polypropylene, 500pc (25/20)",
        "category": "deli-containers",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 311,
        "rating": 4.7,
        "reviewsCount": 77,
        "featured": true,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU DLC32: Clear Deli Container Cups 32 oz, Polypropylene, 500pc (25/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
        "features": [
            "Commercial case pack: 500pc (25/20)",
            "Pallet TI/HI: 8/5 (40cs)",
            "Material: Polypropylene (PP)",
            "Restaurant wholesale direct pricing: $40.63/case"
        ],
        "material": "Polypropylene (PP)",
        "palletTiHi": "8/5 (40cs)",
        "price": 40.63,
        "mrpPrice": 54.85,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (500 pcs)",
                "sku": "DLC32",
                "price": 40.63,
                "caseCount": 500,
                "unitPrice": 0.081,
                "palletTiHi": "8/5 (40cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "dlc24",
            "dlcu32",
            "dlclu"
        ],
        "familyCategory": "deli-containers",
        "productType": "Standard",
        "sizeBadge": "2 oz",
        "packaging": "500pc (25/20)",
        "color": "Clear",
        "priceLabel": "$40.63",
        "discontinuing": false
    },
    {
        "id": "dlh8",
        "sku": "DLH8",
        "name": "8oz PP Deli Container, 240 Sets (24/20)",
        "category": "deli-containers-two-piece",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 334,
        "rating": 4.8,
        "reviewsCount": 84,
        "featured": true,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU DLH8: 8oz PP Deli Container, 240 Sets (24/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/8 (64cs).",
        "features": [
            "Commercial case pack: 240 Sets (24/20)",
            "Pallet TI/HI: 8/8 (64cs)",
            "Material: PP Plastic · 240 Sets",
            "Restaurant wholesale direct pricing: $18.05/case"
        ],
        "material": "PP Plastic · 240 Sets",
        "palletTiHi": "8/8 (64cs)",
        "price": 18.05,
        "mrpPrice": 24.37,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (240 pcs)",
                "sku": "DLH8",
                "price": 18.05,
                "caseCount": 240,
                "unitPrice": 0.075,
                "palletTiHi": "8/8 (64cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "dlh12",
            "dlh16",
            "dlh24",
            "dlh32",
            "dlh64"
        ],
        "familyCategory": "two-piece-containers",
        "productType": "Standard",
        "sizeBadge": "8 oz",
        "packaging": "240 Sets (24/20)",
        "priceLabel": "$18.05",
        "discontinuing": false
    },
    {
        "id": "dlh12",
        "sku": "DLH12",
        "name": "12oz PP Deli Container, 240 sets (24/20)",
        "category": "deli-containers-two-piece",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 357,
        "rating": 4.9,
        "reviewsCount": 91,
        "featured": true,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU DLH12: 12oz PP Deli Container, 240 sets (24/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/7 (56cs).",
        "features": [
            "Commercial case pack: 240 sets (24/20)",
            "Pallet TI/HI: 8/7 (56cs)",
            "Material: PP Plastic · 240 Sets",
            "Restaurant wholesale direct pricing: $19.35/case"
        ],
        "material": "PP Plastic · 240 Sets",
        "palletTiHi": "8/7 (56cs)",
        "price": 19.35,
        "mrpPrice": 26.12,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (240 pcs)",
                "sku": "DLH12",
                "price": 19.35,
                "caseCount": 240,
                "unitPrice": 0.081,
                "palletTiHi": "8/7 (56cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "dlh8",
            "dlh16",
            "dlh24",
            "dlh32",
            "dlh64"
        ],
        "familyCategory": "two-piece-containers",
        "productType": "Standard",
        "sizeBadge": "2 oz",
        "packaging": "240 sets (24/20)",
        "priceLabel": "$19.35",
        "discontinuing": false
    },
    {
        "id": "dlh16",
        "sku": "DLH16",
        "name": "16oz PP Deli Container, 240 sets (24/20)",
        "category": "deli-containers-two-piece",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 380,
        "rating": 4.8,
        "reviewsCount": 98,
        "featured": true,
        "bestSeller": true,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU DLH16: 16oz PP Deli Container, 240 sets (24/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
        "features": [
            "Commercial case pack: 240 sets (24/20)",
            "Pallet TI/HI: 8/5 (40cs)",
            "Material: PP Plastic · 240 Sets",
            "Restaurant wholesale direct pricing: $20.65/case"
        ],
        "material": "PP Plastic · 240 Sets",
        "palletTiHi": "8/5 (40cs)",
        "price": 20.65,
        "mrpPrice": 27.88,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (240 pcs)",
                "sku": "DLH16",
                "price": 20.65,
                "caseCount": 240,
                "unitPrice": 0.086,
                "palletTiHi": "8/5 (40cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "dlh8",
            "dlh12",
            "dlh24",
            "dlh32",
            "dlh64"
        ],
        "familyCategory": "two-piece-containers",
        "productType": "Standard",
        "sizeBadge": "16 oz",
        "packaging": "240 sets (24/20)",
        "priceLabel": "$20.65",
        "discontinuing": false
    },
    {
        "id": "dlh24",
        "sku": "DLH24",
        "name": "24oz PP Deli Container, 240 sets (24/20)",
        "category": "deli-containers-two-piece",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 403,
        "rating": 4.9,
        "reviewsCount": 105,
        "featured": true,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU DLH24: 24oz PP Deli Container, 240 sets (24/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/8 (64cs).",
        "features": [
            "Commercial case pack: 240 sets (24/20)",
            "Pallet TI/HI: 8/8 (64cs)",
            "Material: PP Plastic · 240 Sets",
            "Restaurant wholesale direct pricing: $23.25/case"
        ],
        "material": "PP Plastic · 240 Sets",
        "palletTiHi": "8/8 (64cs)",
        "price": 23.25,
        "mrpPrice": 31.39,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (240 pcs)",
                "sku": "DLH24",
                "price": 23.25,
                "caseCount": 240,
                "unitPrice": 0.097,
                "palletTiHi": "8/8 (64cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "dlh8",
            "dlh12",
            "dlh16",
            "dlh32",
            "dlh64"
        ],
        "familyCategory": "two-piece-containers",
        "productType": "Standard",
        "sizeBadge": "4 oz",
        "packaging": "240 sets (24/20)",
        "priceLabel": "$23.25",
        "discontinuing": false
    },
    {
        "id": "dlh32",
        "sku": "DLH32",
        "name": "32oz PP Deli Container, 240 sets (24/20)",
        "category": "deli-containers-two-piece",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 426,
        "rating": 4.7,
        "reviewsCount": 112,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU DLH32: 32oz PP Deli Container, 240 sets (24/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/7 (56cs).",
        "features": [
            "Commercial case pack: 240 sets (24/20)",
            "Pallet TI/HI: 8/7 (56cs)",
            "Material: PP Plastic · 240 Sets",
            "Restaurant wholesale direct pricing: $19.35/case"
        ],
        "material": "PP Plastic · 240 Sets",
        "palletTiHi": "8/7 (56cs)",
        "price": 19.35,
        "mrpPrice": 26.12,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (240 pcs)",
                "sku": "DLH32",
                "price": 19.35,
                "caseCount": 240,
                "unitPrice": 0.081,
                "palletTiHi": "8/7 (56cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "dlh8",
            "dlh12",
            "dlh16",
            "dlh24",
            "dlh64"
        ],
        "familyCategory": "two-piece-containers",
        "productType": "Standard",
        "sizeBadge": "2 oz",
        "packaging": "240 sets (24/20)",
        "priceLabel": "$19.35",
        "discontinuing": false
    },
    {
        "id": "dlh64",
        "sku": "DLH64",
        "name": "64oz PP Deli Container, 120 sets (12/20)",
        "category": "deli-containers-two-piece",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 449,
        "rating": 4.8,
        "reviewsCount": 119,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU DLH64: 64oz PP Deli Container, 120 sets (12/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/7 (56cs).",
        "features": [
            "Commercial case pack: 120 sets (12/20)",
            "Pallet TI/HI: 8/7 (56cs)",
            "Material: PP Plastic · 120 Sets",
            "Restaurant wholesale direct pricing: $21.95/case"
        ],
        "material": "PP Plastic · 120 Sets",
        "palletTiHi": "8/7 (56cs)",
        "price": 21.95,
        "mrpPrice": 29.63,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (120 pcs)",
                "sku": "DLH64",
                "price": 21.95,
                "caseCount": 120,
                "unitPrice": 0.183,
                "palletTiHi": "8/7 (56cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "dlh16",
            "dlh24",
            "dlh32"
        ],
        "familyCategory": "two-piece-containers",
        "productType": "Standard",
        "sizeBadge": "4 oz",
        "packaging": "120 sets (12/20)",
        "priceLabel": "$21.95",
        "discontinuing": false
    },
    {
        "id": "dlh8-500",
        "sku": "DLH8-500",
        "name": "8oz PP Deli Container Base, 500pc (50/10)",
        "category": "deli-containers-two-piece",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 472,
        "rating": 4.9,
        "reviewsCount": 126,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU DLH8-500: 8oz PP Deli Container Base, 500pc (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
        "features": [
            "Commercial case pack: 500pc (50/10)",
            "Pallet TI/HI: 8/5 (40cs)",
            "Material: PP Plastic · 500pc Base",
            "Restaurant wholesale direct pricing: $28.45/case"
        ],
        "material": "PP Plastic · 500pc Base",
        "palletTiHi": "8/5 (40cs)",
        "price": 28.45,
        "mrpPrice": 38.41,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (500 pcs)",
                "sku": "DLH8-500",
                "price": 28.45,
                "caseCount": 500,
                "unitPrice": 0.057,
                "palletTiHi": "8/5 (40cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "lid-500",
            "dlh12-500",
            "dlh16-500",
            "dlh24-500",
            "dlh32-500"
        ],
        "familyCategory": "two-piece-containers",
        "productType": "Standard",
        "sizeBadge": "8 oz",
        "packaging": "500pc (50/10)",
        "priceLabel": "$28.45",
        "discontinuing": false
    },
    {
        "id": "dlh12-500",
        "sku": "DLH12-500",
        "name": "12oz PP Deli Container Base, 500pc (50/10)",
        "category": "deli-containers-two-piece",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 495,
        "rating": 4.8,
        "reviewsCount": 133,
        "featured": false,
        "bestSeller": true,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU DLH12-500: 12oz PP Deli Container Base, 500pc (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/4 (32cs).",
        "features": [
            "Commercial case pack: 500pc (50/10)",
            "Pallet TI/HI: 8/4 (32cs)",
            "Material: PP Plastic · 500pc Base",
            "Restaurant wholesale direct pricing: $24.19/case"
        ],
        "material": "PP Plastic · 500pc Base",
        "palletTiHi": "8/4 (32cs)",
        "price": 24.19,
        "mrpPrice": 32.66,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (500 pcs)",
                "sku": "DLH12-500",
                "price": 24.19,
                "caseCount": 500,
                "unitPrice": 0.048,
                "palletTiHi": "8/4 (32cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "lid-500",
            "dlh8-500",
            "dlh16-500",
            "dlh24-500",
            "dlh32-500"
        ],
        "familyCategory": "two-piece-containers",
        "productType": "Standard",
        "sizeBadge": "2 oz",
        "packaging": "500pc (50/10)",
        "priceLabel": "$24.19",
        "discontinuing": false
    },
    {
        "id": "dlh16-500",
        "sku": "DLH16-500",
        "name": "16oz PP Deli Container Base, 500pc (50/10)",
        "category": "deli-containers-two-piece",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 518,
        "rating": 4.9,
        "reviewsCount": 140,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU DLH16-500: 16oz PP Deli Container Base, 500pc (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/6 (42cs).",
        "features": [
            "Commercial case pack: 500pc (50/10)",
            "Pallet TI/HI: 7/6 (42cs)",
            "Material: PP Plastic · 500pc Base",
            "Restaurant wholesale direct pricing: $26.90/case"
        ],
        "material": "PP Plastic · 500pc Base",
        "palletTiHi": "7/6 (42cs)",
        "price": 26.9,
        "mrpPrice": 36.31,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (500 pcs)",
                "sku": "DLH16-500",
                "price": 26.9,
                "caseCount": 500,
                "unitPrice": 0.054,
                "palletTiHi": "7/6 (42cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "lid-500",
            "dlh8-500",
            "dlh12-500",
            "dlh24-500",
            "dlh32-500"
        ],
        "familyCategory": "two-piece-containers",
        "productType": "Standard",
        "sizeBadge": "16 oz",
        "packaging": "500pc (50/10)",
        "priceLabel": "$26.90",
        "discontinuing": false
    },
    {
        "id": "dlh24-500",
        "sku": "DLH24-500",
        "name": "24oz PP Deli Container Base, 500pc (25/20)",
        "category": "deli-containers-two-piece",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 541,
        "rating": 4.7,
        "reviewsCount": 32,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU DLH24-500: 24oz PP Deli Container Base, 500pc (25/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/8 (64cs).",
        "features": [
            "Commercial case pack: 500pc (25/20)",
            "Pallet TI/HI: 8/8 (64cs)",
            "Material: PP Plastic · 500pc Base",
            "Restaurant wholesale direct pricing: $29.62/case"
        ],
        "material": "PP Plastic · 500pc Base",
        "palletTiHi": "8/8 (64cs)",
        "price": 29.62,
        "mrpPrice": 39.99,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (500 pcs)",
                "sku": "DLH24-500",
                "price": 29.62,
                "caseCount": 500,
                "unitPrice": 0.059,
                "palletTiHi": "8/8 (64cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "lid-500",
            "dlh8-500",
            "dlh12-500",
            "dlh16-500",
            "dlh32-500"
        ],
        "familyCategory": "two-piece-containers",
        "productType": "Standard",
        "sizeBadge": "4 oz",
        "packaging": "500pc (25/20)",
        "priceLabel": "$29.62",
        "discontinuing": false
    },
    {
        "id": "dlh32-500",
        "sku": "DLH32-500",
        "name": "32oz PP Deli Container Base, 500pc (25/20)",
        "category": "deli-containers-two-piece",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 164,
        "rating": 4.8,
        "reviewsCount": 39,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU DLH32-500: 32oz PP Deli Container Base, 500pc (25/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/7 (56cs).",
        "features": [
            "Commercial case pack: 500pc (25/20)",
            "Pallet TI/HI: 8/7 (56cs)",
            "Material: PP Plastic · 500pc Base",
            "Restaurant wholesale direct pricing: $35.05/case"
        ],
        "material": "PP Plastic · 500pc Base",
        "palletTiHi": "8/7 (56cs)",
        "price": 35.05,
        "mrpPrice": 47.32,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (500 pcs)",
                "sku": "DLH32-500",
                "price": 35.05,
                "caseCount": 500,
                "unitPrice": 0.07,
                "palletTiHi": "8/7 (56cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "lid-500",
            "dlh8-500",
            "dlh12-500",
            "dlh16-500",
            "dlh24-500"
        ],
        "familyCategory": "two-piece-containers",
        "productType": "Standard",
        "sizeBadge": "2 oz",
        "packaging": "500pc (25/20)",
        "priceLabel": "$35.05",
        "discontinuing": false
    },
    {
        "id": "lid-500",
        "sku": "LID-500",
        "name": "Lids for 8-32oz Deli Container, 500pc (50/10)",
        "category": "deli-containers-two-piece",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 187,
        "rating": 4.9,
        "reviewsCount": 46,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU LID-500: Lids for 8-32oz Deli Container, 500pc (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/7 (56cs).",
        "features": [
            "Commercial case pack: 500pc (50/10)",
            "Pallet TI/HI: 8/7 (56cs)",
            "Material: Polypropylene (PP)",
            "Restaurant wholesale direct pricing: $38.44/case"
        ],
        "material": "Polypropylene (PP)",
        "palletTiHi": "8/7 (56cs)",
        "price": 38.44,
        "mrpPrice": 51.89,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (500 pcs)",
                "sku": "LID-500",
                "price": 38.44,
                "caseCount": 500,
                "unitPrice": 0.077,
                "palletTiHi": "8/7 (56cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "dlh8-500",
            "dlh12-500",
            "dlh16-500",
            "dlh24-500",
            "dlh32-500"
        ],
        "familyCategory": "two-piece-containers",
        "productType": "Standard",
        "sizeBadge": "2 oz",
        "packaging": "500pc (50/10)",
        "priceLabel": "$38.44",
        "discontinuing": false
    },
    {
        "id": "nbl36",
        "sku": "NBL36",
        "name": "36oz Microwaveable Noodle Bowl with Lid, Black, 120 Sets (40/6)",
        "category": "noodle-bowls",
        "image": "/images/round_takeout_bowl.jpg",
        "inStock": true,
        "stockCount": 210,
        "rating": 4.8,
        "reviewsCount": 53,
        "featured": false,
        "bestSeller": true,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU NBL36: 36oz Microwaveable Noodle Bowl with Lid, Black, 120 Sets (40/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
        "features": [
            "Commercial case pack: 120 Sets (40/6)",
            "Pallet TI/HI: 8/5 (40cs)",
            "Material: PP Plastic · Black Base · 120 Sets",
            "Restaurant wholesale direct pricing: $45.92/case"
        ],
        "material": "PP Plastic · Black Base · 120 Sets",
        "palletTiHi": "8/5 (40cs)",
        "price": 45.92,
        "mrpPrice": 61.99,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (120 pcs)",
                "sku": "NBL36",
                "price": 45.92,
                "caseCount": 120,
                "unitPrice": 0.383,
                "palletTiHi": "8/5 (40cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "nbwh36",
            "nbl42",
            "nbl50",
            "nbint501",
            "ncb502"
        ],
        "familyCategory": "noodle-bowls",
        "productType": "Standard",
        "sizeBadge": "36 oz",
        "packaging": "120 Sets (40/6)",
        "color": "Black",
        "priceLabel": "$45.92",
        "discontinuing": false
    },
    {
        "id": "nbwh36",
        "sku": "NBWH36",
        "name": "36oz Microwaveable Noodle Bowl with Lid, White, 120 Sets (40/6)",
        "category": "noodle-bowls",
        "image": "/images/round_takeout_bowl.jpg",
        "inStock": true,
        "stockCount": 233,
        "rating": 4.9,
        "reviewsCount": 60,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU NBWH36: 36oz Microwaveable Noodle Bowl with Lid, White, 120 Sets (40/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/4 (32cs).",
        "features": [
            "Commercial case pack: 120 Sets (40/6)",
            "Pallet TI/HI: 8/4 (32cs)",
            "Material: PP Plastic · White Base · 120 Sets",
            "Restaurant wholesale direct pricing: $21.89/case"
        ],
        "material": "PP Plastic · White Base · 120 Sets",
        "palletTiHi": "8/4 (32cs)",
        "price": 21.89,
        "mrpPrice": 29.55,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (120 pcs)",
                "sku": "NBWH36",
                "price": 21.89,
                "caseCount": 120,
                "unitPrice": 0.182,
                "palletTiHi": "8/4 (32cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "nbl36",
            "nbwh42",
            "nbwh50",
            "nbint501",
            "ncb502"
        ],
        "familyCategory": "noodle-bowls",
        "productType": "Standard",
        "sizeBadge": "36 oz",
        "packaging": "120 Sets (40/6)",
        "color": "White",
        "priceLabel": "$21.89",
        "discontinuing": false
    },
    {
        "id": "nbl42",
        "sku": "NBL42",
        "name": "42oz Microwaveable Noodle Bowl with Lid, Black, 120 Sets (40/6)",
        "category": "noodle-bowls",
        "image": "/images/round_takeout_bowl.jpg",
        "inStock": true,
        "stockCount": 256,
        "rating": 4.7,
        "reviewsCount": 67,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU NBL42: 42oz Microwaveable Noodle Bowl with Lid, Black, 120 Sets (40/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/4 (32cs).",
        "features": [
            "Commercial case pack: 120 Sets (40/6)",
            "Pallet TI/HI: 8/4 (32cs)",
            "Material: PP Plastic · Black Base · 120 Sets",
            "Restaurant wholesale direct pricing: $24.49/case"
        ],
        "material": "PP Plastic · Black Base · 120 Sets",
        "palletTiHi": "8/4 (32cs)",
        "price": 24.49,
        "mrpPrice": 33.06,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (120 pcs)",
                "sku": "NBL42",
                "price": 24.49,
                "caseCount": 120,
                "unitPrice": 0.204,
                "palletTiHi": "8/4 (32cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "nbl36",
            "nbwh42",
            "nbl50",
            "nbint501",
            "ncb502"
        ],
        "familyCategory": "noodle-bowls",
        "productType": "Standard",
        "sizeBadge": "2 oz",
        "packaging": "120 Sets (40/6)",
        "color": "Black",
        "priceLabel": "$24.49",
        "discontinuing": false
    },
    {
        "id": "nbwh42",
        "sku": "NBWH42",
        "name": "42oz Microwaveable Noodle Bowl with Lid, White, 120 Sets (40/6)",
        "category": "noodle-bowls",
        "image": "/images/round_takeout_bowl.jpg",
        "inStock": true,
        "stockCount": 279,
        "rating": 4.8,
        "reviewsCount": 74,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU NBWH42: 42oz Microwaveable Noodle Bowl with Lid, White, 120 Sets (40/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/7 (56cs).",
        "features": [
            "Commercial case pack: 120 Sets (40/6)",
            "Pallet TI/HI: 8/7 (56cs)",
            "Material: PP Plastic · White Base · 120 Sets",
            "Restaurant wholesale direct pricing: $27.08/case"
        ],
        "material": "PP Plastic · White Base · 120 Sets",
        "palletTiHi": "8/7 (56cs)",
        "price": 27.08,
        "mrpPrice": 36.56,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (120 pcs)",
                "sku": "NBWH42",
                "price": 27.08,
                "caseCount": 120,
                "unitPrice": 0.226,
                "palletTiHi": "8/7 (56cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "nbl42",
            "nbwh36",
            "nbwh50",
            "nbint501",
            "ncb502"
        ],
        "familyCategory": "noodle-bowls",
        "productType": "Standard",
        "sizeBadge": "2 oz",
        "packaging": "120 Sets (40/6)",
        "color": "White",
        "priceLabel": "$27.08",
        "discontinuing": false
    },
    {
        "id": "nbl50",
        "sku": "NBL50",
        "name": "50oz Microwaveable Noodle Bowl with Lid, Black, 120 Sets (40/6)",
        "category": "noodle-bowls",
        "image": "/images/round_takeout_bowl.jpg",
        "inStock": true,
        "stockCount": 302,
        "rating": 4.9,
        "reviewsCount": 81,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU NBL50: 50oz Microwaveable Noodle Bowl with Lid, Black, 120 Sets (40/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/4 (32cs).",
        "features": [
            "Commercial case pack: 120 Sets (40/6)",
            "Pallet TI/HI: 8/4 (32cs)",
            "Material: PP Plastic · Black Base · 120 Sets",
            "Restaurant wholesale direct pricing: $36.17/case"
        ],
        "material": "PP Plastic · Black Base · 120 Sets",
        "palletTiHi": "8/4 (32cs)",
        "price": 36.17,
        "mrpPrice": 48.83,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (120 pcs)",
                "sku": "NBL50",
                "price": 36.17,
                "caseCount": 120,
                "unitPrice": 0.301,
                "palletTiHi": "8/4 (32cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "nbwh50",
            "nbl36",
            "nbl42",
            "nbint501",
            "ncb502"
        ],
        "familyCategory": "noodle-bowls",
        "productType": "Standard",
        "sizeBadge": "50 oz",
        "packaging": "120 Sets (40/6)",
        "color": "Black",
        "priceLabel": "$36.17",
        "discontinuing": false
    },
    {
        "id": "nbwh50",
        "sku": "NBWH50",
        "name": "50oz Microwaveable Noodle Bowl with Lid, White, 120 Sets (40/6)",
        "category": "noodle-bowls",
        "image": "/images/round_takeout_bowl.jpg",
        "inStock": true,
        "stockCount": 325,
        "rating": 4.8,
        "reviewsCount": 88,
        "featured": false,
        "bestSeller": true,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU NBWH50: 50oz Microwaveable Noodle Bowl with Lid, White, 120 Sets (40/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 12/5 (60cs).",
        "features": [
            "Commercial case pack: 120 Sets (40/6)",
            "Pallet TI/HI: 12/5 (60cs)",
            "Material: PP Plastic · White Base · 120 Sets",
            "Restaurant wholesale direct pricing: $40.05/case"
        ],
        "material": "PP Plastic · White Base · 120 Sets",
        "palletTiHi": "12/5 (60cs)",
        "price": 40.05,
        "mrpPrice": 54.07,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (120 pcs)",
                "sku": "NBWH50",
                "price": 40.05,
                "caseCount": 120,
                "unitPrice": 0.334,
                "palletTiHi": "12/5 (60cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "nbl50",
            "nbwh36",
            "nbwh42",
            "nbint501",
            "ncb502"
        ],
        "familyCategory": "noodle-bowls",
        "productType": "Standard",
        "sizeBadge": "50 oz",
        "packaging": "120 Sets (40/6)",
        "color": "White",
        "priceLabel": "$40.05",
        "discontinuing": false
    },
    {
        "id": "nbint501",
        "sku": "NBINT501",
        "name": "Noodle Bowl Insert Compatible with NB-50, 240pc (40/6)",
        "category": "noodle-bowls",
        "image": "/images/round_takeout_bowl.jpg",
        "inStock": true,
        "stockCount": 348,
        "rating": 4.9,
        "reviewsCount": 95,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU NBINT501: Noodle Bowl Insert Compatible with NB-50, 240pc (40/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 12/5 (60cs).",
        "features": [
            "Commercial case pack: 240pc (40/6)",
            "Pallet TI/HI: 12/5 (60cs)",
            "Material: PP Plastic · 240pc Insert",
            "Restaurant wholesale direct pricing: $19.31/case"
        ],
        "material": "PP Plastic · 240pc Insert",
        "palletTiHi": "12/5 (60cs)",
        "price": 19.31,
        "mrpPrice": 26.07,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (240 pcs)",
                "sku": "NBINT501",
                "price": 19.31,
                "caseCount": 240,
                "unitPrice": 0.08,
                "palletTiHi": "12/5 (60cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "nbl50",
            "nbwh50",
            "ncb502"
        ],
        "familyCategory": "noodle-bowls",
        "productType": "Standard",
        "sizeBadge": "Insert",
        "packaging": "240pc (40/6)",
        "color": "Black",
        "priceLabel": "$19.31",
        "discontinuing": false
    },
    {
        "id": "ncb502",
        "sku": "NCB502",
        "name": "50oz Microwaveable Noodle Bowl with Insert and Lid, 90 Sets (30/9)",
        "category": "noodle-bowls",
        "image": "/images/round_takeout_bowl.jpg",
        "inStock": true,
        "stockCount": 371,
        "rating": 4.7,
        "reviewsCount": 102,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU NCB502: 50oz Microwaveable Noodle Bowl with Insert and Lid, 90 Sets (30/9). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 12/5 (60cs).",
        "features": [
            "Commercial case pack: 90 Sets (30/9)",
            "Pallet TI/HI: 12/5 (60cs)",
            "Material: PP Plastic · Complete Combo · 90 Sets",
            "Restaurant wholesale direct pricing: $21.89/case"
        ],
        "material": "PP Plastic · Complete Combo · 90 Sets",
        "palletTiHi": "12/5 (60cs)",
        "price": 21.89,
        "mrpPrice": 29.55,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (90 pcs)",
                "sku": "NCB502",
                "price": 21.89,
                "caseCount": 90,
                "unitPrice": 0.243,
                "palletTiHi": "12/5 (60cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "nbint501",
            "nbl50",
            "nbwh50"
        ],
        "familyCategory": "noodle-bowls",
        "productType": "Standard",
        "sizeBadge": "50 oz",
        "packaging": "90 Sets (30/9)",
        "color": "Black",
        "priceLabel": "$21.89",
        "discontinuing": false
    },
    {
        "id": "rd16",
        "sku": "RD16",
        "name": "16oz Round Microwaveable Container with Lid, 150 Sets (50/6)",
        "category": "round-containers",
        "image": "/images/round_takeout_bowl.jpg",
        "inStock": true,
        "stockCount": 394,
        "rating": 4.8,
        "reviewsCount": 109,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU RD16: 16oz Round Microwaveable Container with Lid, 150 Sets (50/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 14/7 (98cs).",
        "features": [
            "Commercial case pack: 150 Sets (50/6)",
            "Pallet TI/HI: 14/7 (98cs)",
            "Material: Polypropylene (PP) · 150 Sets",
            "Restaurant wholesale direct pricing: $23.31/case"
        ],
        "material": "Polypropylene (PP) · 150 Sets",
        "palletTiHi": "14/7 (98cs)",
        "price": 23.31,
        "mrpPrice": 31.47,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (150 pcs)",
                "sku": "RD16",
                "price": 23.31,
                "caseCount": 150,
                "unitPrice": 0.155,
                "palletTiHi": "14/7 (98cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "rd24",
            "rdwh24",
            "rd32",
            "rd40",
            "rd48"
        ],
        "familyCategory": "round-containers",
        "productType": "Standard",
        "sizeBadge": "16 oz",
        "packaging": "150 Sets (50/6)",
        "color": "Black",
        "priceLabel": "$23.31",
        "discontinuing": false
    },
    {
        "id": "rd24",
        "sku": "RD24",
        "name": "24oz Round Microwaveable Container with Lid, 150 Sets (50/6)",
        "category": "round-containers",
        "image": "/images/round_takeout_bowl.jpg",
        "inStock": true,
        "stockCount": 417,
        "rating": 4.9,
        "reviewsCount": 116,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU RD24: 24oz Round Microwaveable Container with Lid, 150 Sets (50/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/7 (70cs).",
        "features": [
            "Commercial case pack: 150 Sets (50/6)",
            "Pallet TI/HI: 10/7 (70cs)",
            "Material: Polypropylene (PP) · 150 Sets",
            "Restaurant wholesale direct pricing: $27.76/case"
        ],
        "material": "Polypropylene (PP) · 150 Sets",
        "palletTiHi": "10/7 (70cs)",
        "price": 27.76,
        "mrpPrice": 37.48,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (150 pcs)",
                "sku": "RD24",
                "price": 27.76,
                "caseCount": 150,
                "unitPrice": 0.185,
                "palletTiHi": "10/7 (70cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "rd16",
            "rdwh24",
            "rd32",
            "rd40",
            "rd48"
        ],
        "familyCategory": "round-containers",
        "productType": "Standard",
        "sizeBadge": "4 oz",
        "packaging": "150 Sets (50/6)",
        "color": "Black",
        "priceLabel": "$27.76",
        "discontinuing": false
    },
    {
        "id": "rdwh24",
        "sku": "RDWH24",
        "name": "24oz Round Microwaveable Container with Lid, White, 150 Sets (50/6)",
        "category": "round-containers",
        "image": "/images/round_takeout_bowl.jpg",
        "inStock": true,
        "stockCount": 440,
        "rating": 4.8,
        "reviewsCount": 123,
        "featured": false,
        "bestSeller": true,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU RDWH24: 24oz Round Microwaveable Container with Lid, White, 150 Sets (50/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/7 (70cs).",
        "features": [
            "Commercial case pack: 150 Sets (50/6)",
            "Pallet TI/HI: 10/7 (70cs)",
            "Material: Polypropylene (PP) · White · 150 Sets",
            "Restaurant wholesale direct pricing: $27.76/case"
        ],
        "material": "Polypropylene (PP) · White · 150 Sets",
        "palletTiHi": "10/7 (70cs)",
        "price": 27.76,
        "mrpPrice": 37.48,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (150 pcs)",
                "sku": "RDWH24",
                "price": 27.76,
                "caseCount": 150,
                "unitPrice": 0.185,
                "palletTiHi": "10/7 (70cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "rd24",
            "rd16",
            "rd32",
            "rd40",
            "rdwh48"
        ],
        "familyCategory": "round-containers",
        "productType": "Standard",
        "sizeBadge": "4 oz",
        "packaging": "150 Sets (50/6)",
        "color": "White",
        "priceLabel": "$27.76",
        "discontinuing": false
    },
    {
        "id": "rd32",
        "sku": "RD32",
        "name": "32oz Round Microwaveable Container with Lid, 150 Sets (50/6)",
        "category": "round-containers",
        "image": "/images/round_takeout_bowl.jpg",
        "inStock": true,
        "stockCount": 463,
        "rating": 4.9,
        "reviewsCount": 130,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU RD32: 32oz Round Microwaveable Container with Lid, 150 Sets (50/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/6 (60cs).",
        "features": [
            "Commercial case pack: 150 Sets (50/6)",
            "Pallet TI/HI: 10/6 (60cs)",
            "Material: Polypropylene (PP) · 150 Sets",
            "Restaurant wholesale direct pricing: $29.97/case"
        ],
        "material": "Polypropylene (PP) · 150 Sets",
        "palletTiHi": "10/6 (60cs)",
        "price": 29.97,
        "mrpPrice": 40.46,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (150 pcs)",
                "sku": "RD32",
                "price": 29.97,
                "caseCount": 150,
                "unitPrice": 0.2,
                "palletTiHi": "10/6 (60cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "rd16",
            "rd24",
            "rd40",
            "rd48",
            "rdwh48"
        ],
        "familyCategory": "round-containers",
        "productType": "Standard",
        "sizeBadge": "2 oz",
        "packaging": "150 Sets (50/6)",
        "color": "Black",
        "priceLabel": "$29.97",
        "discontinuing": false
    },
    {
        "id": "rd40",
        "sku": "RD40",
        "name": "40oz Round Microwaveable Container with Lid, 150 Sets (50/6)",
        "category": "round-containers",
        "image": "/images/round_takeout_bowl.jpg",
        "inStock": true,
        "stockCount": 486,
        "rating": 4.7,
        "reviewsCount": 137,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU RD40: 40oz Round Microwaveable Container with Lid, 150 Sets (50/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/6 (60cs).",
        "features": [
            "Commercial case pack: 150 Sets (50/6)",
            "Pallet TI/HI: 10/6 (60cs)",
            "Material: Polypropylene (PP) · 150 Sets",
            "Restaurant wholesale direct pricing: $33.39/case"
        ],
        "material": "Polypropylene (PP) · 150 Sets",
        "palletTiHi": "10/6 (60cs)",
        "price": 33.39,
        "mrpPrice": 45.08,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (150 pcs)",
                "sku": "RD40",
                "price": 33.39,
                "caseCount": 150,
                "unitPrice": 0.223,
                "palletTiHi": "10/6 (60cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "rd24",
            "rd32",
            "rd48",
            "rdwh48"
        ],
        "familyCategory": "round-containers",
        "productType": "Standard",
        "sizeBadge": "40 oz",
        "packaging": "150 Sets (50/6)",
        "color": "Black",
        "priceLabel": "$33.39",
        "discontinuing": false
    },
    {
        "id": "rd48",
        "sku": "RD48",
        "name": "48oz Round Microwaveable Container with Lid, 150 Sets (50/6)",
        "category": "round-containers",
        "image": "/images/round_takeout_bowl.jpg",
        "inStock": true,
        "stockCount": 509,
        "rating": 4.8,
        "reviewsCount": 29,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU RD48: 48oz Round Microwaveable Container with Lid, 150 Sets (50/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/6 (36cs).",
        "features": [
            "Commercial case pack: 150 Sets (50/6)",
            "Pallet TI/HI: 6/6 (36cs)",
            "Material: Polypropylene (PP) · 150 Sets",
            "Restaurant wholesale direct pricing: $45.55/case"
        ],
        "material": "Polypropylene (PP) · 150 Sets",
        "palletTiHi": "6/6 (36cs)",
        "price": 45.55,
        "mrpPrice": 61.49,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (150 pcs)",
                "sku": "RD48",
                "price": 45.55,
                "caseCount": 150,
                "unitPrice": 0.304,
                "palletTiHi": "6/6 (36cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "rdwh48",
            "rd32",
            "rd40",
            "sq48"
        ],
        "familyCategory": "round-containers",
        "productType": "Standard",
        "sizeBadge": "8 oz",
        "packaging": "150 Sets (50/6)",
        "color": "Black",
        "priceLabel": "$45.55",
        "discontinuing": false
    },
    {
        "id": "rdwh48",
        "sku": "RDWH48",
        "name": "48oz Round Microwaveable Container with Lid, White, 150 Sets (50/6)",
        "category": "round-containers",
        "image": "/images/round_takeout_bowl.jpg",
        "inStock": true,
        "stockCount": 532,
        "rating": 4.9,
        "reviewsCount": 36,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU RDWH48: 48oz Round Microwaveable Container with Lid, White, 150 Sets (50/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/6 (36cs).",
        "features": [
            "Commercial case pack: 150 Sets (50/6)",
            "Pallet TI/HI: 6/6 (36cs)",
            "Material: Polypropylene (PP) · White · 150 Sets",
            "Restaurant wholesale direct pricing: $45.55/case"
        ],
        "material": "Polypropylene (PP) · White · 150 Sets",
        "palletTiHi": "6/6 (36cs)",
        "price": 45.55,
        "mrpPrice": 61.49,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (150 pcs)",
                "sku": "RDWH48",
                "price": 45.55,
                "caseCount": 150,
                "unitPrice": 0.304,
                "palletTiHi": "6/6 (36cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "rd48",
            "rd32",
            "rd40",
            "rdwh24"
        ],
        "familyCategory": "round-containers",
        "productType": "Standard",
        "sizeBadge": "8 oz",
        "packaging": "150 Sets (50/6)",
        "color": "White",
        "priceLabel": "$45.55",
        "discontinuing": false
    },
    {
        "id": "w61",
        "sku": "W61",
        "name": "PP Black Tray with Translucent Lid, 6\" x 6\", 240 Sets (60/8)",
        "category": "shallow-compartmental-containers",
        "image": "/images/rectangular_takeout_box.jpg",
        "inStock": true,
        "stockCount": 155,
        "rating": 4.8,
        "reviewsCount": 43,
        "featured": false,
        "bestSeller": true,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU W61: PP Black Tray with Translucent Lid, 6\" x 6\", 240 Sets (60/8). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
        "features": [
            "Commercial case pack: 240 Sets (60/8)",
            "Pallet TI/HI: 8/5 (40cs)",
            "Material: PP Black Tray · Translucent Lid · 240 Sets",
            "Restaurant wholesale direct pricing: $55.36/case"
        ],
        "material": "PP Black Tray · Translucent Lid · 240 Sets",
        "palletTiHi": "8/5 (40cs)",
        "price": 55.36,
        "mrpPrice": 74.74,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (240 pcs)",
                "sku": "W61",
                "price": 55.36,
                "caseCount": 240,
                "unitPrice": 0.231,
                "palletTiHi": "8/5 (40cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "w81",
            "w91",
            "rct232",
            "rct333"
        ],
        "familyCategory": "shallow-compartmental-containers",
        "productType": "Standard",
        "sizeBadge": "6\" x 6\"",
        "packaging": "240 Sets (60/8)",
        "color": "Black",
        "priceLabel": "$55.36",
        "discontinuing": false
    },
    {
        "id": "w81",
        "sku": "W81",
        "name": "PP Black Tray with Translucent Lid, 8\" x 8\", 100 Sets (50/4)",
        "category": "shallow-compartmental-containers",
        "image": "/images/rectangular_takeout_box.jpg",
        "inStock": true,
        "stockCount": 178,
        "rating": 4.9,
        "reviewsCount": 50,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU W81: PP Black Tray with Translucent Lid, 8\" x 8\", 100 Sets (50/4). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 15/5 (75cs).",
        "features": [
            "Commercial case pack: 100 Sets (50/4)",
            "Pallet TI/HI: 15/5 (75cs)",
            "Material: PP Black Tray · Translucent Lid · 100 Sets",
            "Restaurant wholesale direct pricing: $43.58/case"
        ],
        "material": "PP Black Tray · Translucent Lid · 100 Sets",
        "palletTiHi": "15/5 (75cs)",
        "price": 43.58,
        "mrpPrice": 58.83,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (100 pcs)",
                "sku": "W81",
                "price": 43.58,
                "caseCount": 100,
                "unitPrice": 0.436,
                "palletTiHi": "15/5 (75cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "w61",
            "w91",
            "sq48",
            "sq348"
        ],
        "familyCategory": "shallow-compartmental-containers",
        "productType": "Standard",
        "sizeBadge": "8\" x 8\"",
        "packaging": "100 Sets (50/4)",
        "color": "Black",
        "priceLabel": "$43.58",
        "discontinuing": false
    },
    {
        "id": "w91",
        "sku": "W91",
        "name": "PP Black Tray with Translucent Lid, 9\" x 9\", 100 Sets (50/4)",
        "category": "shallow-compartmental-containers",
        "image": "/images/rectangular_takeout_box.jpg",
        "inStock": true,
        "stockCount": 201,
        "rating": 4.7,
        "reviewsCount": 57,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU W91: PP Black Tray with Translucent Lid, 9\" x 9\", 100 Sets (50/4). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/7 (70cs).",
        "features": [
            "Commercial case pack: 100 Sets (50/4)",
            "Pallet TI/HI: 10/7 (70cs)",
            "Material: PP Black Tray · Translucent Lid · 100 Sets",
            "Restaurant wholesale direct pricing: $36.54/case"
        ],
        "material": "PP Black Tray · Translucent Lid · 100 Sets",
        "palletTiHi": "10/7 (70cs)",
        "price": 36.54,
        "mrpPrice": 49.33,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (100 pcs)",
                "sku": "W91",
                "price": 36.54,
                "caseCount": 100,
                "unitPrice": 0.365,
                "palletTiHi": "10/7 (70cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "w81",
            "w61",
            "sq48",
            "sq348"
        ],
        "familyCategory": "shallow-compartmental-containers",
        "productType": "Standard",
        "sizeBadge": "9\" x 9\"",
        "packaging": "100 Sets (50/4)",
        "color": "Black",
        "priceLabel": "$36.54",
        "discontinuing": false
    },
    {
        "id": "500ml",
        "sku": "500ML",
        "name": "Microwaveable PP Containers with Lids, 500ml, 250 Sets (50/10)",
        "category": "shallow-compartmental-containers",
        "image": "/images/rectangular_takeout_box.jpg",
        "inStock": true,
        "stockCount": 224,
        "rating": 4.8,
        "reviewsCount": 64,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU 500ML: Microwaveable PP Containers with Lids, 500ml, 250 Sets (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/6 (60cs).",
        "features": [
            "Commercial case pack: 250 Sets (50/10)",
            "Pallet TI/HI: 10/6 (60cs)",
            "Material: Polypropylene (PP) · 250 Sets",
            "Restaurant wholesale direct pricing: $47.92/case"
        ],
        "material": "Polypropylene (PP) · 250 Sets",
        "palletTiHi": "10/6 (60cs)",
        "price": 47.92,
        "mrpPrice": 64.69,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (250 pcs)",
                "sku": "500ML",
                "price": 47.92,
                "caseCount": 250,
                "unitPrice": 0.192,
                "palletTiHi": "10/6 (60cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "650ml",
            "750ml",
            "rct232"
        ],
        "familyCategory": "shallow-compartmental-containers",
        "productType": "Standard",
        "sizeBadge": "500 ml",
        "packaging": "250 Sets (50/10)",
        "color": "Black",
        "priceLabel": "$47.92",
        "discontinuing": false
    },
    {
        "id": "650ml",
        "sku": "650ML",
        "name": "Microwaveable PP Containers with Lids, 650ml, 250 Sets (50/10)",
        "category": "shallow-compartmental-containers",
        "image": "/images/rectangular_takeout_box.jpg",
        "inStock": true,
        "stockCount": 247,
        "rating": 4.9,
        "reviewsCount": 71,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU 650ML: Microwaveable PP Containers with Lids, 650ml, 250 Sets (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/7 (56cs).",
        "features": [
            "Commercial case pack: 250 Sets (50/10)",
            "Pallet TI/HI: 8/7 (56cs)",
            "Material: Polypropylene (PP) · 250 Sets",
            "Restaurant wholesale direct pricing: $33.91/case"
        ],
        "material": "Polypropylene (PP) · 250 Sets",
        "palletTiHi": "8/7 (56cs)",
        "price": 33.91,
        "mrpPrice": 45.78,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (250 pcs)",
                "sku": "650ML",
                "price": 33.91,
                "caseCount": 250,
                "unitPrice": 0.136,
                "palletTiHi": "8/7 (56cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "500ml",
            "750ml",
            "rct232"
        ],
        "familyCategory": "shallow-compartmental-containers",
        "productType": "Standard",
        "sizeBadge": "650 ml",
        "packaging": "250 Sets (50/10)",
        "color": "Black",
        "priceLabel": "$33.91",
        "discontinuing": false
    },
    {
        "id": "750ml",
        "sku": "750ML",
        "name": "Microwaveable PP Containers with Lids, 750ml, 250 Sets (50/10)",
        "category": "shallow-compartmental-containers",
        "image": "/images/rectangular_takeout_box.jpg",
        "inStock": true,
        "stockCount": 270,
        "rating": 4.8,
        "reviewsCount": 78,
        "featured": false,
        "bestSeller": true,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU 750ML: Microwaveable PP Containers with Lids, 750ml, 250 Sets (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 9/4 (36cs).",
        "features": [
            "Commercial case pack: 250 Sets (50/10)",
            "Pallet TI/HI: 9/4 (36cs)",
            "Material: Polypropylene (PP) · 250 Sets",
            "Restaurant wholesale direct pricing: $33.91/case"
        ],
        "material": "Polypropylene (PP) · 250 Sets",
        "palletTiHi": "9/4 (36cs)",
        "price": 33.91,
        "mrpPrice": 45.78,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (250 pcs)",
                "sku": "750ML",
                "price": 33.91,
                "caseCount": 250,
                "unitPrice": 0.136,
                "palletTiHi": "9/4 (36cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "500ml",
            "650ml",
            "rct232"
        ],
        "familyCategory": "shallow-compartmental-containers",
        "productType": "Standard",
        "sizeBadge": "750 ml",
        "packaging": "250 Sets (50/10)",
        "color": "Black",
        "priceLabel": "$33.91",
        "discontinuing": false
    },
    {
        "id": "sq48",
        "sku": "SQ48",
        "name": "48oz Square Microwaveable Container with Lid, 150 Sets (50/6)",
        "category": "shallow-compartmental-containers",
        "image": "/images/rectangular_takeout_box.jpg",
        "inStock": true,
        "stockCount": 293,
        "rating": 4.9,
        "reviewsCount": 85,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU SQ48: 48oz Square Microwaveable Container with Lid, 150 Sets (50/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 9/4 (36cs).",
        "features": [
            "Commercial case pack: 150 Sets (50/6)",
            "Pallet TI/HI: 9/4 (36cs)",
            "Material: Polypropylene (PP) · 150 Sets",
            "Restaurant wholesale direct pricing: $42.49/case"
        ],
        "material": "Polypropylene (PP) · 150 Sets",
        "palletTiHi": "9/4 (36cs)",
        "price": 42.49,
        "mrpPrice": 57.36,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (150 pcs)",
                "sku": "SQ48",
                "price": 42.49,
                "caseCount": 150,
                "unitPrice": 0.283,
                "palletTiHi": "9/4 (36cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "sq348",
            "rct232",
            "rct333",
            "w81"
        ],
        "familyCategory": "shallow-compartmental-containers",
        "productType": "Standard",
        "sizeBadge": "8 oz",
        "packaging": "150 Sets (50/6)",
        "color": "Black",
        "priceLabel": "$42.49",
        "discontinuing": false
    },
    {
        "id": "sq348",
        "sku": "SQ348",
        "name": "48oz Square Microwaveable Container with Lid 3-compartment, 100 Sets (50/4)",
        "category": "shallow-compartmental-containers",
        "image": "/images/rectangular_takeout_box.jpg",
        "inStock": true,
        "stockCount": 316,
        "rating": 4.7,
        "reviewsCount": 92,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU SQ348: 48oz Square Microwaveable Container with Lid 3-compartment, 100 Sets (50/4). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/6 (48cs).",
        "features": [
            "Commercial case pack: 100 Sets (50/4)",
            "Pallet TI/HI: 8/6 (48cs)",
            "Material: Polypropylene (PP) · 3 Compartment · 100 Sets",
            "Restaurant wholesale direct pricing: $52.58/case"
        ],
        "material": "Polypropylene (PP) · 3 Compartment · 100 Sets",
        "palletTiHi": "8/6 (48cs)",
        "price": 52.58,
        "mrpPrice": 70.98,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (100 pcs)",
                "sku": "SQ348",
                "price": 52.58,
                "caseCount": 100,
                "unitPrice": 0.526,
                "palletTiHi": "8/6 (48cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "sq48",
            "rct333",
            "w91"
        ],
        "familyCategory": "shallow-compartmental-containers",
        "productType": "Standard",
        "sizeBadge": "8 oz",
        "packaging": "100 Sets (50/4)",
        "color": "Black",
        "compartments": "3 Compartment",
        "priceLabel": "$52.58",
        "discontinuing": false
    },
    {
        "id": "rct232",
        "sku": "RCT232",
        "name": "32oz Rectangular Microwaveable Container with Lid 2-compartment, 150 Sets (50/6)",
        "category": "shallow-compartmental-containers",
        "image": "/images/round_takeout_bowl.jpg",
        "inStock": true,
        "stockCount": 339,
        "rating": 4.8,
        "reviewsCount": 99,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU RCT232: 32oz Rectangular Microwaveable Container with Lid 2-compartment, 150 Sets (50/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/5 (30cs).",
        "features": [
            "Commercial case pack: 150 Sets (50/6)",
            "Pallet TI/HI: 6/5 (30cs)",
            "Material: Polypropylene (PP) · 2 Compartment · 150 Sets",
            "Restaurant wholesale direct pricing: $25.85/case"
        ],
        "material": "Polypropylene (PP) · 2 Compartment · 150 Sets",
        "palletTiHi": "6/5 (30cs)",
        "price": 25.85,
        "mrpPrice": 34.9,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (150 pcs)",
                "sku": "RCT232",
                "price": 25.85,
                "caseCount": 150,
                "unitPrice": 0.172,
                "palletTiHi": "6/5 (30cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "rct333",
            "sq48",
            "650ml"
        ],
        "familyCategory": "round-containers",
        "productType": "Standard",
        "sizeBadge": "2 oz",
        "packaging": "150 Sets (50/6)",
        "color": "Black",
        "compartments": "2 Compartment",
        "priceLabel": "$25.85",
        "discontinuing": false
    },
    {
        "id": "rct333",
        "sku": "RCT333",
        "name": "33oz Rectangular Microwaveable Container with Lid 3-compartment, 150 Sets (50/6)",
        "category": "shallow-compartmental-containers",
        "image": "/images/round_takeout_bowl.jpg",
        "inStock": true,
        "stockCount": 362,
        "rating": 4.9,
        "reviewsCount": 106,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU RCT333: 33oz Rectangular Microwaveable Container with Lid 3-compartment, 150 Sets (50/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/7 (42cs).",
        "features": [
            "Commercial case pack: 150 Sets (50/6)",
            "Pallet TI/HI: 6/7 (42cs)",
            "Material: Polypropylene (PP) · 3 Compartment · 150 Sets",
            "Restaurant wholesale direct pricing: $20.65/case"
        ],
        "material": "Polypropylene (PP) · 3 Compartment · 150 Sets",
        "palletTiHi": "6/7 (42cs)",
        "price": 20.65,
        "mrpPrice": 27.88,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (150 pcs)",
                "sku": "RCT333",
                "price": 20.65,
                "caseCount": 150,
                "unitPrice": 0.138,
                "palletTiHi": "6/7 (42cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "rct232",
            "sq348",
            "w81"
        ],
        "familyCategory": "round-containers",
        "productType": "Standard",
        "sizeBadge": "33 oz",
        "packaging": "150 Sets (50/6)",
        "color": "Black",
        "compartments": "3 Compartment",
        "priceLabel": "$20.65",
        "discontinuing": false
    },
    {
        "id": "bgrpw7",
        "sku": "BGRPW7",
        "name": "Bagasse Round Plate, 7\", White, PFAS FREE, 1000pc (125/8)",
        "category": "bagasse-plates-and-bowls",
        "image": "/images/cat_paper_plates.jpg",
        "inStock": true,
        "stockCount": 385,
        "rating": 4.8,
        "reviewsCount": 113,
        "featured": false,
        "bestSeller": true,
        "ecoFriendly": true,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PFAS Free",
            "Compostable",
            "Sugarcane"
        ],
        "description": "Commercial food service packaging SKU BGRPW7: Bagasse Round Plate, 7\", White, PFAS FREE, 1000pc (125/8). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 9/6 (54cs).",
        "features": [
            "Commercial case pack: 1000pc (125/8)",
            "Pallet TI/HI: 9/6 (54cs)",
            "Material: Sugarcane Bagasse · PFAS FREE · 1000pc",
            "Restaurant wholesale direct pricing: $53.43/case"
        ],
        "material": "Sugarcane Bagasse · PFAS FREE · 1000pc",
        "palletTiHi": "9/6 (54cs)",
        "price": 53.43,
        "mrpPrice": 72.13,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (1000 pcs)",
                "sku": "BGRPW7",
                "price": 53.43,
                "caseCount": 1000,
                "unitPrice": 0.053,
                "palletTiHi": "9/6 (54cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "bgrpw91",
            "bgrpw93",
            "bgrpw10",
            "bgrpw103"
        ],
        "familyCategory": "bagasse-products",
        "productType": "Standard",
        "sizeBadge": "7\"",
        "packaging": "1000pc (125/8)",
        "color": "White",
        "priceLabel": "$53.43",
        "discontinuing": false
    },
    {
        "id": "bgrpw91",
        "sku": "BGRPW91",
        "name": "Bagasse Round Plate, 9\", White, PFAS FREE, 500pc (125/4)",
        "category": "bagasse-plates-and-bowls",
        "image": "/images/cat_paper_plates.jpg",
        "inStock": true,
        "stockCount": 408,
        "rating": 4.9,
        "reviewsCount": 120,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": true,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PFAS Free",
            "Compostable",
            "Sugarcane"
        ],
        "description": "Commercial food service packaging SKU BGRPW91: Bagasse Round Plate, 9\", White, PFAS FREE, 500pc (125/4). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/8 (64cs).",
        "features": [
            "Commercial case pack: 500pc (125/4)",
            "Pallet TI/HI: 8/8 (64cs)",
            "Material: Sugarcane Bagasse · PFAS FREE · 500pc",
            "Restaurant wholesale direct pricing: $64.42/case"
        ],
        "material": "Sugarcane Bagasse · PFAS FREE · 500pc",
        "palletTiHi": "8/8 (64cs)",
        "price": 64.42,
        "mrpPrice": 86.97,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (500 pcs)",
                "sku": "BGRPW91",
                "price": 64.42,
                "caseCount": 500,
                "unitPrice": 0.129,
                "palletTiHi": "8/8 (64cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "bgrpw7",
            "bgrpw93",
            "bgrpw10",
            "bgrpw103"
        ],
        "familyCategory": "bagasse-products",
        "productType": "Standard",
        "sizeBadge": "9\"",
        "packaging": "500pc (125/4)",
        "color": "White",
        "priceLabel": "$64.42",
        "discontinuing": false
    },
    {
        "id": "bgrpw93",
        "sku": "BGRPW93",
        "name": "Bagasse Round Plate 3-compartment, 9\", White, PFAS FREE, 500pc (125/4)",
        "category": "bagasse-plates-and-bowls",
        "image": "/images/cat_paper_plates.jpg",
        "inStock": true,
        "stockCount": 431,
        "rating": 4.7,
        "reviewsCount": 127,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": true,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PFAS Free",
            "Compostable",
            "Sugarcane"
        ],
        "description": "Commercial food service packaging SKU BGRPW93: Bagasse Round Plate 3-compartment, 9\", White, PFAS FREE, 500pc (125/4). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/9 (63cs).",
        "features": [
            "Commercial case pack: 500pc (125/4)",
            "Pallet TI/HI: 7/9 (63cs)",
            "Material: Sugarcane Bagasse · 3 Compartment · PFAS FREE · 500pc",
            "Restaurant wholesale direct pricing: $64.62/case"
        ],
        "material": "Sugarcane Bagasse · 3 Compartment · PFAS FREE · 500pc",
        "palletTiHi": "7/9 (63cs)",
        "price": 64.62,
        "mrpPrice": 87.24,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (500 pcs)",
                "sku": "BGRPW93",
                "price": 64.62,
                "caseCount": 500,
                "unitPrice": 0.129,
                "palletTiHi": "7/9 (63cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "bgrpw91",
            "bgrpw103",
            "bgrpw10"
        ],
        "familyCategory": "bagasse-products",
        "productType": "Standard",
        "sizeBadge": "9\"",
        "packaging": "500pc (125/4)",
        "color": "White",
        "compartments": "3 Compartment",
        "priceLabel": "$64.62",
        "discontinuing": false
    },
    {
        "id": "bgrpw10",
        "sku": "BGRPW10",
        "name": "Bagasse Round Plate, 10\", White, PFAS FREE, 500pc (125/4)",
        "category": "bagasse-plates-and-bowls",
        "image": "/images/cat_paper_plates.jpg",
        "inStock": true,
        "stockCount": 454,
        "rating": 4.8,
        "reviewsCount": 134,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": true,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PFAS Free",
            "Compostable",
            "Sugarcane"
        ],
        "description": "Commercial food service packaging SKU BGRPW10: Bagasse Round Plate, 10\", White, PFAS FREE, 500pc (125/4). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/8 (64cs).",
        "features": [
            "Commercial case pack: 500pc (125/4)",
            "Pallet TI/HI: 8/8 (64cs)",
            "Material: Sugarcane Bagasse · PFAS FREE · 500pc",
            "Restaurant wholesale direct pricing: $48.44/case"
        ],
        "material": "Sugarcane Bagasse · PFAS FREE · 500pc",
        "palletTiHi": "8/8 (64cs)",
        "price": 48.44,
        "mrpPrice": 65.39,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (500 pcs)",
                "sku": "BGRPW10",
                "price": 48.44,
                "caseCount": 500,
                "unitPrice": 0.097,
                "palletTiHi": "8/8 (64cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "bgrpw103",
            "bgrpw91",
            "bgrpw7"
        ],
        "familyCategory": "bagasse-products",
        "productType": "Standard",
        "sizeBadge": "10\"",
        "packaging": "500pc (125/4)",
        "color": "White",
        "priceLabel": "$48.44",
        "discontinuing": false
    },
    {
        "id": "bgrpw103",
        "sku": "BGRPW103",
        "name": "Bagasse Round Plate 3-compartment, 10\", White, PFAS FREE, 500pc (125/4)",
        "category": "bagasse-plates-and-bowls",
        "image": "/images/cat_paper_plates.jpg",
        "inStock": true,
        "stockCount": 477,
        "rating": 4.9,
        "reviewsCount": 141,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": true,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PFAS Free",
            "Compostable",
            "Sugarcane"
        ],
        "description": "Commercial food service packaging SKU BGRPW103: Bagasse Round Plate 3-compartment, 10\", White, PFAS FREE, 500pc (125/4). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/8 (56cs).",
        "features": [
            "Commercial case pack: 500pc (125/4)",
            "Pallet TI/HI: 7/8 (56cs)",
            "Material: Sugarcane Bagasse · 3 Compartment · PFAS FREE · 500pc",
            "Restaurant wholesale direct pricing: $57.07/case"
        ],
        "material": "Sugarcane Bagasse · 3 Compartment · PFAS FREE · 500pc",
        "palletTiHi": "7/8 (56cs)",
        "price": 57.07,
        "mrpPrice": 77.04,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (500 pcs)",
                "sku": "BGRPW103",
                "price": 57.07,
                "caseCount": 500,
                "unitPrice": 0.114,
                "palletTiHi": "7/8 (56cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "bgrpw10",
            "bgrpw93",
            "bgrpw91"
        ],
        "familyCategory": "bagasse-products",
        "productType": "Standard",
        "sizeBadge": "10\"",
        "packaging": "500pc (125/4)",
        "color": "White",
        "compartments": "3 Compartment",
        "priceLabel": "$57.07",
        "discontinuing": false
    },
    {
        "id": "bgbw12",
        "sku": "BGBW12",
        "name": "Bagasse 12oz Bowl, White, PFAS FREE, 1000pc (125/8)",
        "category": "bagasse-plates-and-bowls",
        "image": "/images/cat_paper_plates.jpg",
        "inStock": true,
        "stockCount": 500,
        "rating": 4.8,
        "reviewsCount": 33,
        "featured": false,
        "bestSeller": true,
        "ecoFriendly": true,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PFAS Free",
            "Compostable",
            "Sugarcane"
        ],
        "description": "Commercial food service packaging SKU BGBW12: Bagasse 12oz Bowl, White, PFAS FREE, 1000pc (125/8). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/6 (42cs).",
        "features": [
            "Commercial case pack: 1000pc (125/8)",
            "Pallet TI/HI: 7/6 (42cs)",
            "Material: Sugarcane Bagasse · PFAS FREE · 1000pc",
            "Restaurant wholesale direct pricing: $45.75/case"
        ],
        "material": "Sugarcane Bagasse · PFAS FREE · 1000pc",
        "palletTiHi": "7/6 (42cs)",
        "price": 45.75,
        "mrpPrice": 61.76,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (1000 pcs)",
                "sku": "BGBW12",
                "price": 45.75,
                "caseCount": 1000,
                "unitPrice": 0.046,
                "palletTiHi": "7/6 (42cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "bgl12",
            "bgbw16",
            "bgbw32"
        ],
        "familyCategory": "bagasse-products",
        "productType": "Standard",
        "sizeBadge": "2 oz",
        "packaging": "1000pc (125/8)",
        "color": "White",
        "priceLabel": "$45.75",
        "discontinuing": false
    },
    {
        "id": "bgbw16",
        "sku": "BGBW16",
        "name": "Bagasse 16oz Bowl, White, PFAS FREE, 1000pc (125/8)",
        "category": "bagasse-plates-and-bowls",
        "image": "/images/cat_paper_plates.jpg",
        "inStock": true,
        "stockCount": 523,
        "rating": 4.9,
        "reviewsCount": 40,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": true,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PFAS Free",
            "Compostable",
            "Sugarcane"
        ],
        "description": "Commercial food service packaging SKU BGBW16: Bagasse 16oz Bowl, White, PFAS FREE, 1000pc (125/8). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 5/6 (30cs).",
        "features": [
            "Commercial case pack: 1000pc (125/8)",
            "Pallet TI/HI: 5/6 (30cs)",
            "Material: Sugarcane Bagasse · PFAS FREE · 1000pc",
            "Restaurant wholesale direct pricing: $25.85/case"
        ],
        "material": "Sugarcane Bagasse · PFAS FREE · 1000pc",
        "palletTiHi": "5/6 (30cs)",
        "price": 25.85,
        "mrpPrice": 34.9,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (1000 pcs)",
                "sku": "BGBW16",
                "price": 25.85,
                "caseCount": 1000,
                "unitPrice": 0.026,
                "palletTiHi": "5/6 (30cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "bgl16",
            "bgbw12",
            "bgbw32"
        ],
        "familyCategory": "bagasse-products",
        "productType": "Standard",
        "sizeBadge": "16 oz",
        "packaging": "1000pc (125/8)",
        "color": "White",
        "priceLabel": "$25.85",
        "discontinuing": false
    },
    {
        "id": "bgbw32",
        "sku": "BGBW32",
        "name": "Bagasse 32oz Bowl, White, PFAS FREE, 500pc (125/4)",
        "category": "bagasse-plates-and-bowls",
        "image": "/images/cat_paper_plates.jpg",
        "inStock": true,
        "stockCount": 546,
        "rating": 4.7,
        "reviewsCount": 47,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": true,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PFAS Free",
            "Compostable",
            "Sugarcane"
        ],
        "description": "Commercial food service packaging SKU BGBW32: Bagasse 32oz Bowl, White, PFAS FREE, 500pc (125/4). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/5 (50cs).",
        "features": [
            "Commercial case pack: 500pc (125/4)",
            "Pallet TI/HI: 10/5 (50cs)",
            "Material: Sugarcane Bagasse · PFAS FREE · 500pc",
            "Restaurant wholesale direct pricing: $33.65/case"
        ],
        "material": "Sugarcane Bagasse · PFAS FREE · 500pc",
        "palletTiHi": "10/5 (50cs)",
        "price": 33.65,
        "mrpPrice": 45.43,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (500 pcs)",
                "sku": "BGBW32",
                "price": 33.65,
                "caseCount": 500,
                "unitPrice": 0.067,
                "palletTiHi": "10/5 (50cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "bgl32",
            "bgbw16",
            "bgbw12"
        ],
        "familyCategory": "bagasse-products",
        "productType": "Standard",
        "sizeBadge": "2 oz",
        "packaging": "500pc (125/4)",
        "color": "White",
        "priceLabel": "$33.65",
        "discontinuing": false
    },
    {
        "id": "bgl12",
        "sku": "BGL12",
        "name": "PET Lid for Bagasse 12oz Bowl, 500pc (125/4)",
        "category": "bagasse-plates-and-bowls",
        "image": "/images/cat_paper_plates.jpg",
        "inStock": true,
        "stockCount": 169,
        "rating": 4.8,
        "reviewsCount": 54,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": true,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "Crystal Clear PET",
            "Cold Ready"
        ],
        "description": "Commercial food service packaging SKU BGL12: PET Lid for Bagasse 12oz Bowl, 500pc (125/4). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 5/6 (30cs).",
        "features": [
            "Commercial case pack: 500pc (125/4)",
            "Pallet TI/HI: 5/6 (30cs)",
            "Material: Ultra-Clear PET Plastic · 500pc Lid",
            "Restaurant wholesale direct pricing: $40.15/case"
        ],
        "material": "Ultra-Clear PET Plastic · 500pc Lid",
        "palletTiHi": "5/6 (30cs)",
        "price": 40.15,
        "mrpPrice": 54.2,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (500 pcs)",
                "sku": "BGL12",
                "price": 40.15,
                "caseCount": 500,
                "unitPrice": 0.08,
                "palletTiHi": "5/6 (30cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "bgbw12",
            "bgl16",
            "bgl32"
        ],
        "familyCategory": "bagasse-products",
        "productType": "Standard",
        "sizeBadge": "2 oz",
        "packaging": "500pc (125/4)",
        "priceLabel": "$40.15",
        "discontinuing": false
    },
    {
        "id": "bgl16",
        "sku": "BGL16",
        "name": "PET Lid for Bagasse 16oz Bowl, 500pc (125/4)",
        "category": "bagasse-plates-and-bowls",
        "image": "/images/cat_paper_plates.jpg",
        "inStock": true,
        "stockCount": 192,
        "rating": 4.9,
        "reviewsCount": 61,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": true,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "Crystal Clear PET",
            "Cold Ready"
        ],
        "description": "Commercial food service packaging SKU BGL16: PET Lid for Bagasse 16oz Bowl, 500pc (125/4). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 5/6 (30cs).",
        "features": [
            "Commercial case pack: 500pc (125/4)",
            "Pallet TI/HI: 5/6 (30cs)",
            "Material: Ultra-Clear PET Plastic · 500pc Lid",
            "Restaurant wholesale direct pricing: $47.95/case"
        ],
        "material": "Ultra-Clear PET Plastic · 500pc Lid",
        "palletTiHi": "5/6 (30cs)",
        "price": 47.95,
        "mrpPrice": 64.73,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (500 pcs)",
                "sku": "BGL16",
                "price": 47.95,
                "caseCount": 500,
                "unitPrice": 0.096,
                "palletTiHi": "5/6 (30cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "bgbw16",
            "bgl12",
            "bgl32"
        ],
        "familyCategory": "bagasse-products",
        "productType": "Standard",
        "sizeBadge": "16 oz",
        "packaging": "500pc (125/4)",
        "priceLabel": "$47.95",
        "discontinuing": false
    },
    {
        "id": "bgl32",
        "sku": "BGL32",
        "name": "PET Lid for Bagasse 32oz Bowl, 300pc (75/4)",
        "category": "bagasse-plates-and-bowls",
        "image": "/images/cat_paper_plates.jpg",
        "inStock": true,
        "stockCount": 215,
        "rating": 4.8,
        "reviewsCount": 68,
        "featured": false,
        "bestSeller": true,
        "ecoFriendly": true,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "Crystal Clear PET",
            "Cold Ready"
        ],
        "description": "Commercial food service packaging SKU BGL32: PET Lid for Bagasse 32oz Bowl, 300pc (75/4). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/5 (35cs).",
        "features": [
            "Commercial case pack: 300pc (75/4)",
            "Pallet TI/HI: 7/5 (35cs)",
            "Material: Ultra-Clear PET Plastic · 300pc Lid",
            "Restaurant wholesale direct pricing: $34.45/case"
        ],
        "material": "Ultra-Clear PET Plastic · 300pc Lid",
        "palletTiHi": "7/5 (35cs)",
        "price": 34.45,
        "mrpPrice": 46.51,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (300 pcs)",
                "sku": "BGL32",
                "price": 34.45,
                "caseCount": 300,
                "unitPrice": 0.115,
                "palletTiHi": "7/5 (35cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "bgbw32",
            "bgl16",
            "bgl12"
        ],
        "familyCategory": "bagasse-products",
        "productType": "Standard",
        "sizeBadge": "2 oz",
        "packaging": "300pc (75/4)",
        "priceLabel": "$34.45",
        "discontinuing": false
    },
    {
        "id": "ptw08",
        "sku": "PTW08",
        "name": "8 oz Paper Take-Out Box, White, 500 pcs (50/10)",
        "category": "paper-take-out-boxes",
        "image": "/images/product-placeholder.png",
        "inStock": true,
        "stockCount": 238,
        "rating": 4.9,
        "reviewsCount": 75,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "Paperboard",
            "Insulated"
        ],
        "description": "Commercial food service packaging SKU PTW08: 8 oz Paper Take-Out Box, White, 500 pcs (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/7 (70cs).",
        "features": [
            "Commercial case pack: 500 pcs (50/10)",
            "Pallet TI/HI: 10/7 (70cs)",
            "Material: Poly-Coated White Paperboard · 500 pcs",
            "Restaurant wholesale direct pricing: $30.59/case"
        ],
        "material": "Poly-Coated White Paperboard · 500 pcs",
        "palletTiHi": "10/7 (70cs)",
        "price": 30.59,
        "mrpPrice": 41.3,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (500 pcs)",
                "sku": "PTW08",
                "price": 30.59,
                "caseCount": 500,
                "unitPrice": 0.061,
                "palletTiHi": "10/7 (70cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "ptw16",
            "ptw26",
            "ptw32"
        ],
        "familyCategory": "paper-take-out-boxes",
        "productType": "Standard",
        "sizeBadge": "8 oz",
        "packaging": "500 pcs (50/10)",
        "color": "White",
        "priceLabel": "$30.59",
        "discontinuing": false
    },
    {
        "id": "ptw16",
        "sku": "PTW16",
        "name": "16 oz Paper Take-Out Box, White, 450 pcs (50/9)",
        "category": "paper-take-out-boxes",
        "image": "/images/product-placeholder.png",
        "inStock": true,
        "stockCount": 261,
        "rating": 4.7,
        "reviewsCount": 82,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "Paperboard",
            "Insulated"
        ],
        "description": "Commercial food service packaging SKU PTW16: 16 oz Paper Take-Out Box, White, 450 pcs (50/9). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/6 (48cs).",
        "features": [
            "Commercial case pack: 450 pcs (50/9)",
            "Pallet TI/HI: 8/6 (48cs)",
            "Material: Poly-Coated White Paperboard · 450 pcs",
            "Restaurant wholesale direct pricing: $34.22/case"
        ],
        "material": "Poly-Coated White Paperboard · 450 pcs",
        "palletTiHi": "8/6 (48cs)",
        "price": 34.22,
        "mrpPrice": 46.2,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (450 pcs)",
                "sku": "PTW16",
                "price": 34.22,
                "caseCount": 450,
                "unitPrice": 0.076,
                "palletTiHi": "8/6 (48cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "ptw08",
            "ptw26",
            "ptw32"
        ],
        "familyCategory": "paper-take-out-boxes",
        "productType": "Standard",
        "sizeBadge": "16 oz",
        "packaging": "450 pcs (50/9)",
        "color": "White",
        "priceLabel": "$34.22",
        "discontinuing": false
    },
    {
        "id": "ptw26",
        "sku": "PTW26",
        "name": "26 oz Paper Take-Out Box, White, 450 pcs (50/9)",
        "category": "paper-take-out-boxes",
        "image": "/images/product-placeholder.png",
        "inStock": true,
        "stockCount": 284,
        "rating": 4.8,
        "reviewsCount": 89,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "Paperboard",
            "Insulated"
        ],
        "description": "Commercial food service packaging SKU PTW26: 26 oz Paper Take-Out Box, White, 450 pcs (50/9). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/6 (36cs).",
        "features": [
            "Commercial case pack: 450 pcs (50/9)",
            "Pallet TI/HI: 6/6 (36cs)",
            "Material: Poly-Coated White Paperboard · 450 pcs",
            "Restaurant wholesale direct pricing: $30.85/case"
        ],
        "material": "Poly-Coated White Paperboard · 450 pcs",
        "palletTiHi": "6/6 (36cs)",
        "price": 30.85,
        "mrpPrice": 41.65,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (450 pcs)",
                "sku": "PTW26",
                "price": 30.85,
                "caseCount": 450,
                "unitPrice": 0.069,
                "palletTiHi": "6/6 (36cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "ptw16",
            "ptw08",
            "ptw32"
        ],
        "familyCategory": "paper-take-out-boxes",
        "productType": "Standard",
        "sizeBadge": "26 oz",
        "packaging": "450 pcs (50/9)",
        "color": "White",
        "priceLabel": "$30.85",
        "discontinuing": false
    },
    {
        "id": "ptw32",
        "sku": "PTW32",
        "name": "32 oz Paper Take-Out Box, White, 450 pcs (50/9)",
        "category": "paper-take-out-boxes",
        "image": "/images/product-placeholder.png",
        "inStock": true,
        "stockCount": 307,
        "rating": 4.9,
        "reviewsCount": 96,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "Paperboard",
            "Insulated"
        ],
        "description": "Commercial food service packaging SKU PTW32: 32 oz Paper Take-Out Box, White, 450 pcs (50/9). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/5 (30cs).",
        "features": [
            "Commercial case pack: 450 pcs (50/9)",
            "Pallet TI/HI: 6/5 (30cs)",
            "Material: Poly-Coated White Paperboard · 450 pcs",
            "Restaurant wholesale direct pricing: $35.22/case"
        ],
        "material": "Poly-Coated White Paperboard · 450 pcs",
        "palletTiHi": "6/5 (30cs)",
        "price": 35.22,
        "mrpPrice": 47.55,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (450 pcs)",
                "sku": "PTW32",
                "price": 35.22,
                "caseCount": 450,
                "unitPrice": 0.078,
                "palletTiHi": "6/5 (30cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "ptw26",
            "ptw16",
            "ptw08"
        ],
        "familyCategory": "paper-take-out-boxes",
        "productType": "Standard",
        "sizeBadge": "2 oz",
        "packaging": "450 pcs (50/9)",
        "color": "White",
        "priceLabel": "$35.22",
        "discontinuing": false
    },
    {
        "id": "v61wh",
        "sku": "V61WH",
        "name": "MFPP Hinged Container, White, 6\" x 6\", 250pc (250/1)",
        "category": "mfpp-hinged-containers-white",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 330,
        "rating": 4.8,
        "reviewsCount": 103,
        "featured": false,
        "bestSeller": true,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU V61WH: MFPP Hinged Container, White, 6\" x 6\", 250pc (250/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/7 (49cs).",
        "features": [
            "Commercial case pack: 250pc (250/1)",
            "Pallet TI/HI: 7/7 (49cs)",
            "Material: Mineral-Filled Polypropylene (MFPP) · 250pc",
            "Restaurant wholesale direct pricing: $24.55/case"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP) · 250pc",
        "palletTiHi": "7/7 (49cs)",
        "price": 24.55,
        "mrpPrice": 33.14,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (250 pcs)",
                "sku": "V61WH",
                "price": 24.55,
                "caseCount": 250,
                "unitPrice": 0.098,
                "palletTiHi": "7/7 (49cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "v96wh",
            "v71wh",
            "v81wh",
            "v91wh",
            "v61bl"
        ],
        "familyCategory": "hinged-containers",
        "productType": "MFPP White",
        "sizeBadge": "6\" x 6\"",
        "packaging": "250pc (250/1)",
        "color": "White",
        "compartments": "1 Compartment",
        "priceLabel": "$24.55",
        "discontinuing": false
    },
    {
        "id": "v96wh",
        "sku": "V96WH",
        "name": "MFPP Hinged Container, Vented, White, 9\" x 6\", 200pc (200/1)",
        "category": "mfpp-hinged-containers-white",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 353,
        "rating": 4.9,
        "reviewsCount": 110,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU V96WH: MFPP Hinged Container, Vented, White, 9\" x 6\", 200pc (200/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/7 (38cs).",
        "features": [
            "Commercial case pack: 200pc (200/1)",
            "Pallet TI/HI: 6/7 (38cs)",
            "Material: Mineral-Filled Polypropylene (MFPP) · 200pc",
            "Restaurant wholesale direct pricing: $31.05/case"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP) · 200pc",
        "palletTiHi": "6/7 (38cs)",
        "price": 31.05,
        "mrpPrice": 41.92,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (200 pcs)",
                "sku": "V96WH",
                "price": 31.05,
                "caseCount": 200,
                "unitPrice": 0.155,
                "palletTiHi": "6/7 (38cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "v96wh-150",
            "v962wh",
            "v96bl",
            "v81wh"
        ],
        "familyCategory": "hinged-containers",
        "productType": "MFPP White",
        "sizeBadge": "9\" x 6\"",
        "packaging": "200pc (200/1)",
        "color": "White",
        "priceLabel": "$31.05",
        "discontinuing": false
    },
    {
        "id": "v96wh-150",
        "sku": "V96WH-150",
        "name": "MFPP Hinged Container, Vented, White, 9\" x 6\", 150pc (150/1)",
        "category": "mfpp-hinged-containers-white",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 376,
        "rating": 4.7,
        "reviewsCount": 117,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU V96WH-150: MFPP Hinged Container, Vented, White, 9\" x 6\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 13/6 (78cs).",
        "features": [
            "Commercial case pack: 150pc (150/1)",
            "Pallet TI/HI: 13/6 (78cs)",
            "Material: Mineral-Filled Polypropylene (MFPP) · 150pc",
            "Restaurant wholesale direct pricing: $23.09/case"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP) · 150pc",
        "palletTiHi": "13/6 (78cs)",
        "price": 23.09,
        "mrpPrice": 31.17,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (150 pcs)",
                "sku": "V96WH-150",
                "price": 23.09,
                "caseCount": 150,
                "unitPrice": 0.154,
                "palletTiHi": "13/6 (78cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "v96wh",
            "v96bl-150",
            "v71wh"
        ],
        "familyCategory": "hinged-containers",
        "productType": "MFPP White",
        "sizeBadge": "9\" x 6\"",
        "packaging": "150pc (150/1)",
        "color": "White",
        "priceLabel": "$23.09",
        "discontinuing": false
    },
    {
        "id": "v962wh",
        "sku": "V962WH",
        "name": "MFPP Hinged Container, White, 2-compartment, 9\" x 6\", 200pc (200/1)",
        "category": "mfpp-hinged-containers-white",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 399,
        "rating": 4.8,
        "reviewsCount": 124,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU V962WH: MFPP Hinged Container, White, 2-compartment, 9\" x 6\", 200pc (200/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/7 (38cs).",
        "features": [
            "Commercial case pack: 200pc (200/1)",
            "Pallet TI/HI: 6/7 (38cs)",
            "Material: Mineral-Filled Polypropylene (MFPP) · 2-Comp · 200pc",
            "Restaurant wholesale direct pricing: $28.45/case"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP) · 2-Comp · 200pc",
        "palletTiHi": "6/7 (38cs)",
        "price": 28.45,
        "mrpPrice": 38.41,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (200 pcs)",
                "sku": "V962WH",
                "price": 28.45,
                "caseCount": 200,
                "unitPrice": 0.142,
                "palletTiHi": "6/7 (38cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "v96wh",
            "v962bl",
            "v73wh",
            "v83wh"
        ],
        "familyCategory": "hinged-containers",
        "productType": "MFPP White",
        "sizeBadge": "9\" x 6\"",
        "packaging": "200pc (200/1)",
        "color": "White",
        "compartments": "2 Compartment",
        "priceLabel": "$28.45",
        "discontinuing": false
    },
    {
        "id": "v71wh",
        "sku": "V71WH",
        "name": "MFPP Hinged Container, White, Vented, One Compartment, 7\" x 7\", 150pc (150/1)",
        "category": "mfpp-hinged-containers-white",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 422,
        "rating": 4.9,
        "reviewsCount": 131,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU V71WH: MFPP Hinged Container, White, Vented, One Compartment, 7\" x 7\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/10 (75cs).",
        "features": [
            "Commercial case pack: 150pc (150/1)",
            "Pallet TI/HI: 7/10 (75cs)",
            "Material: Mineral-Filled Polypropylene (MFPP) · 150pc",
            "Restaurant wholesale direct pricing: $21.95/case"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP) · 150pc",
        "palletTiHi": "7/10 (75cs)",
        "price": 21.95,
        "mrpPrice": 29.63,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (150 pcs)",
                "sku": "V71WH",
                "price": 21.95,
                "caseCount": 150,
                "unitPrice": 0.146,
                "palletTiHi": "7/10 (75cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "v73wh",
            "v71bl",
            "v81wh",
            "v61wh"
        ],
        "familyCategory": "hinged-containers",
        "productType": "MFPP White",
        "sizeBadge": "7\" x 7\"",
        "packaging": "150pc (150/1)",
        "color": "White",
        "compartments": "1 Compartment",
        "priceLabel": "$21.95",
        "discontinuing": false
    },
    {
        "id": "v73wh",
        "sku": "V73WH",
        "name": "MFPP Hinged Container, White, Vented, Three Compartment, 7\" x 7\", 150pc (150/1)",
        "category": "mfpp-hinged-containers-white",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 445,
        "rating": 4.8,
        "reviewsCount": 138,
        "featured": false,
        "bestSeller": true,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU V73WH: MFPP Hinged Container, White, Vented, Three Compartment, 7\" x 7\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/10 (75cs).",
        "features": [
            "Commercial case pack: 150pc (150/1)",
            "Pallet TI/HI: 7/10 (75cs)",
            "Material: Mineral-Filled Polypropylene (MFPP) · 3-Comp · 150pc",
            "Restaurant wholesale direct pricing: $21.95/case"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP) · 3-Comp · 150pc",
        "palletTiHi": "7/10 (75cs)",
        "price": 21.95,
        "mrpPrice": 29.63,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (150 pcs)",
                "sku": "V73WH",
                "price": 21.95,
                "caseCount": 150,
                "unitPrice": 0.146,
                "palletTiHi": "7/10 (75cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "v71wh",
            "v73bl",
            "v83wh"
        ],
        "familyCategory": "hinged-containers",
        "productType": "MFPP White",
        "sizeBadge": "7\" x 7\"",
        "packaging": "150pc (150/1)",
        "color": "White",
        "compartments": "3 Compartment",
        "priceLabel": "$21.95",
        "discontinuing": false
    },
    {
        "id": "v81wh",
        "sku": "V81WH",
        "name": "MFPP Hinged Container, White, Vented, One Compartment, 8\" x 8\", 150pc (150/1)",
        "category": "mfpp-hinged-containers-white",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 468,
        "rating": 4.9,
        "reviewsCount": 30,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU V81WH: MFPP Hinged Container, White, Vented, One Compartment, 8\" x 8\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/9 (54cs).",
        "features": [
            "Commercial case pack: 150pc (150/1)",
            "Pallet TI/HI: 6/9 (54cs)",
            "Material: Mineral-Filled Polypropylene (MFPP) · 150pc",
            "Restaurant wholesale direct pricing: $24.55/case"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP) · 150pc",
        "palletTiHi": "6/9 (54cs)",
        "price": 24.55,
        "mrpPrice": 33.14,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (150 pcs)",
                "sku": "V81WH",
                "price": 24.55,
                "caseCount": 150,
                "unitPrice": 0.164,
                "palletTiHi": "6/9 (54cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "v83wh",
            "v81bl",
            "v91wh",
            "v71wh"
        ],
        "familyCategory": "hinged-containers",
        "productType": "MFPP White",
        "sizeBadge": "8\" x 8\"",
        "packaging": "150pc (150/1)",
        "color": "White",
        "compartments": "1 Compartment",
        "priceLabel": "$24.55",
        "discontinuing": false
    },
    {
        "id": "v83wh",
        "sku": "V83WH",
        "name": "MFPP Hinged Container, White, Vented, Three Compartment, 8\" x 8\", 150pc (150/1)",
        "category": "mfpp-hinged-containers-white",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 491,
        "rating": 4.7,
        "reviewsCount": 37,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU V83WH: MFPP Hinged Container, White, Vented, Three Compartment, 8\" x 8\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/9 (54cs).",
        "features": [
            "Commercial case pack: 150pc (150/1)",
            "Pallet TI/HI: 6/9 (54cs)",
            "Material: Mineral-Filled Polypropylene (MFPP) · 3-Comp · 150pc",
            "Restaurant wholesale direct pricing: $24.55/case"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP) · 3-Comp · 150pc",
        "palletTiHi": "6/9 (54cs)",
        "price": 24.55,
        "mrpPrice": 33.14,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (150 pcs)",
                "sku": "V83WH",
                "price": 24.55,
                "caseCount": 150,
                "unitPrice": 0.164,
                "palletTiHi": "6/9 (54cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "v81wh",
            "v83bl",
            "v93wh"
        ],
        "familyCategory": "hinged-containers",
        "productType": "MFPP White",
        "sizeBadge": "8\" x 8\"",
        "packaging": "150pc (150/1)",
        "color": "White",
        "compartments": "3 Compartment",
        "priceLabel": "$24.55",
        "discontinuing": false
    },
    {
        "id": "v91wh",
        "sku": "V91WH",
        "name": "MFPP Hinged Container, White, Vented, One Compartment, 9\" x 9\", 150pc (150/1)",
        "category": "mfpp-hinged-containers-white",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 514,
        "rating": 4.8,
        "reviewsCount": 44,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU V91WH: MFPP Hinged Container, White, Vented, One Compartment, 9\" x 9\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 5/9 (44cs).",
        "features": [
            "Commercial case pack: 150pc (150/1)",
            "Pallet TI/HI: 5/9 (44cs)",
            "Material: Mineral-Filled Polypropylene (MFPP) · 150pc",
            "Restaurant wholesale direct pricing: $28.45/case"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP) · 150pc",
        "palletTiHi": "5/9 (44cs)",
        "price": 28.45,
        "mrpPrice": 38.41,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (150 pcs)",
                "sku": "V91WH",
                "price": 28.45,
                "caseCount": 150,
                "unitPrice": 0.19,
                "palletTiHi": "5/9 (44cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "v93wh",
            "v91bl",
            "v81wh"
        ],
        "familyCategory": "hinged-containers",
        "productType": "MFPP White",
        "sizeBadge": "9\" x 9\"",
        "packaging": "150pc (150/1)",
        "color": "White",
        "compartments": "1 Compartment",
        "priceLabel": "$28.45",
        "discontinuing": false
    },
    {
        "id": "v93wh",
        "sku": "V93WH",
        "name": "MFPP Hinged Container, White, Vented, Three Compartment, 9\" x 9\", 150pc (150/1)",
        "category": "mfpp-hinged-containers-white",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 537,
        "rating": 4.9,
        "reviewsCount": 51,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU V93WH: MFPP Hinged Container, White, Vented, Three Compartment, 9\" x 9\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 5/9 (44cs).",
        "features": [
            "Commercial case pack: 150pc (150/1)",
            "Pallet TI/HI: 5/9 (44cs)",
            "Material: Mineral-Filled Polypropylene (MFPP) · 3-Comp · 150pc",
            "Restaurant wholesale direct pricing: $28.45/case"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP) · 3-Comp · 150pc",
        "palletTiHi": "5/9 (44cs)",
        "price": 28.45,
        "mrpPrice": 38.41,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (150 pcs)",
                "sku": "V93WH",
                "price": 28.45,
                "caseCount": 150,
                "unitPrice": 0.19,
                "palletTiHi": "5/9 (44cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "v91wh",
            "v93bl",
            "v83wh"
        ],
        "familyCategory": "hinged-containers",
        "productType": "MFPP White",
        "sizeBadge": "9\" x 9\"",
        "packaging": "150pc (150/1)",
        "color": "White",
        "compartments": "3 Compartment",
        "priceLabel": "$28.45",
        "discontinuing": false
    },
    {
        "id": "v61bl",
        "sku": "V61BL",
        "name": "MFPP Hinged Container, Black, 6\" x 6\", 250pc (250/1)",
        "category": "mfpp-hinged-containers-black",
        "image": "/images/black_hinged_box.jpg",
        "inStock": true,
        "stockCount": 160,
        "rating": 4.8,
        "reviewsCount": 58,
        "featured": false,
        "bestSeller": true,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU V61BL: MFPP Hinged Container, Black, 6\" x 6\", 250pc (250/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/7 (49cs).",
        "features": [
            "Commercial case pack: 250pc (250/1)",
            "Pallet TI/HI: 7/7 (49cs)",
            "Material: Mineral-Filled Polypropylene (MFPP) · Black · 250pc",
            "Restaurant wholesale direct pricing: $24.55/case"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP) · Black · 250pc",
        "palletTiHi": "7/7 (49cs)",
        "price": 24.55,
        "mrpPrice": 33.14,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (250 pcs)",
                "sku": "V61BL",
                "price": 24.55,
                "caseCount": 250,
                "unitPrice": 0.098,
                "palletTiHi": "7/7 (49cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "v61wh",
            "v96bl",
            "v71bl",
            "v81bl"
        ],
        "familyCategory": "hinged-containers",
        "productType": "MFPP Black",
        "sizeBadge": "6\" x 6\"",
        "packaging": "250pc (250/1)",
        "color": "Black",
        "compartments": "1 Compartment",
        "priceLabel": "$24.55",
        "discontinuing": false
    },
    {
        "id": "v96bl",
        "sku": "V96BL",
        "name": "MFPP Hinged Container, Vented, Black, 9\" x 6\", 200pc (200/1)",
        "category": "mfpp-hinged-containers-black",
        "image": "/images/black_hinged_box.jpg",
        "inStock": true,
        "stockCount": 183,
        "rating": 4.9,
        "reviewsCount": 65,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU V96BL: MFPP Hinged Container, Vented, Black, 9\" x 6\", 200pc (200/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/7 (38cs).",
        "features": [
            "Commercial case pack: 200pc (200/1)",
            "Pallet TI/HI: 6/7 (38cs)",
            "Material: Mineral-Filled Polypropylene (MFPP) · Black · 200pc",
            "Restaurant wholesale direct pricing: $31.05/case"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP) · Black · 200pc",
        "palletTiHi": "6/7 (38cs)",
        "price": 31.05,
        "mrpPrice": 41.92,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (200 pcs)",
                "sku": "V96BL",
                "price": 31.05,
                "caseCount": 200,
                "unitPrice": 0.155,
                "palletTiHi": "6/7 (38cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "v96bl-150",
            "v962bl",
            "v96wh",
            "v81bl"
        ],
        "familyCategory": "hinged-containers",
        "productType": "MFPP Black",
        "sizeBadge": "9\" x 6\"",
        "packaging": "200pc (200/1)",
        "color": "Black",
        "priceLabel": "$31.05",
        "discontinuing": false
    },
    {
        "id": "v96bl-150",
        "sku": "V96BL-150",
        "name": "MFPP Hinged Container, Vented, Black, 9\" x 6\", 150pc (150/1)",
        "category": "mfpp-hinged-containers-black",
        "image": "/images/black_hinged_box.jpg",
        "inStock": true,
        "stockCount": 206,
        "rating": 4.7,
        "reviewsCount": 72,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU V96BL-150: MFPP Hinged Container, Vented, Black, 9\" x 6\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 13/6 (78cs).",
        "features": [
            "Commercial case pack: 150pc (150/1)",
            "Pallet TI/HI: 13/6 (78cs)",
            "Material: Mineral-Filled Polypropylene (MFPP) · Black · 150pc",
            "Restaurant wholesale direct pricing: $23.09/case"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP) · Black · 150pc",
        "palletTiHi": "13/6 (78cs)",
        "price": 23.09,
        "mrpPrice": 31.17,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (150 pcs)",
                "sku": "V96BL-150",
                "price": 23.09,
                "caseCount": 150,
                "unitPrice": 0.154,
                "palletTiHi": "13/6 (78cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "v96bl",
            "v96wh-150",
            "v71bl"
        ],
        "familyCategory": "hinged-containers",
        "productType": "MFPP Black",
        "sizeBadge": "9\" x 6\"",
        "packaging": "150pc (150/1)",
        "color": "Black",
        "priceLabel": "$23.09",
        "discontinuing": false
    },
    {
        "id": "v962bl",
        "sku": "V962BL",
        "name": "MFPP Hinged Container, Black, 2-compartment, 9\" x 6\", 200pc (200/1)",
        "category": "mfpp-hinged-containers-black",
        "image": "/images/black_hinged_box.jpg",
        "inStock": true,
        "stockCount": 229,
        "rating": 4.8,
        "reviewsCount": 79,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU V962BL: MFPP Hinged Container, Black, 2-compartment, 9\" x 6\", 200pc (200/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/7 (38cs).",
        "features": [
            "Commercial case pack: 200pc (200/1)",
            "Pallet TI/HI: 6/7 (38cs)",
            "Material: Mineral-Filled Polypropylene (MFPP) · Black · 2-Comp · 200pc",
            "Restaurant wholesale direct pricing: $28.45/case"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP) · Black · 2-Comp · 200pc",
        "palletTiHi": "6/7 (38cs)",
        "price": 28.45,
        "mrpPrice": 38.41,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (200 pcs)",
                "sku": "V962BL",
                "price": 28.45,
                "caseCount": 200,
                "unitPrice": 0.142,
                "palletTiHi": "6/7 (38cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "v96bl",
            "v962wh",
            "v73bl",
            "v83bl"
        ],
        "familyCategory": "hinged-containers",
        "productType": "MFPP Black",
        "sizeBadge": "9\" x 6\"",
        "packaging": "200pc (200/1)",
        "color": "Black",
        "compartments": "2 Compartment",
        "priceLabel": "$28.45",
        "discontinuing": false
    },
    {
        "id": "v71bl",
        "sku": "V71BL",
        "name": "MFPP Hinged Container, Black, Vented, One Compartment, 7\" x 7\", 150pc (150/1)",
        "category": "mfpp-hinged-containers-black",
        "image": "/images/black_hinged_box.jpg",
        "inStock": true,
        "stockCount": 252,
        "rating": 4.9,
        "reviewsCount": 86,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU V71BL: MFPP Hinged Container, Black, Vented, One Compartment, 7\" x 7\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/10 (75cs).",
        "features": [
            "Commercial case pack: 150pc (150/1)",
            "Pallet TI/HI: 7/10 (75cs)",
            "Material: Mineral-Filled Polypropylene (MFPP) · Black · 150pc",
            "Restaurant wholesale direct pricing: $21.95/case"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP) · Black · 150pc",
        "palletTiHi": "7/10 (75cs)",
        "price": 21.95,
        "mrpPrice": 29.63,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (150 pcs)",
                "sku": "V71BL",
                "price": 21.95,
                "caseCount": 150,
                "unitPrice": 0.146,
                "palletTiHi": "7/10 (75cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "v73bl",
            "v71wh",
            "v81bl",
            "v61bl"
        ],
        "familyCategory": "hinged-containers",
        "productType": "MFPP Black",
        "sizeBadge": "7\" x 7\"",
        "packaging": "150pc (150/1)",
        "color": "Black",
        "compartments": "1 Compartment",
        "priceLabel": "$21.95",
        "discontinuing": false
    },
    {
        "id": "v73bl",
        "sku": "V73BL",
        "name": "MFPP Hinged Container, Black, Vented, Three Compartment, 7\" x 7\", 150pc (150/1)",
        "category": "mfpp-hinged-containers-black",
        "image": "/images/black_hinged_box.jpg",
        "inStock": true,
        "stockCount": 275,
        "rating": 4.8,
        "reviewsCount": 93,
        "featured": false,
        "bestSeller": true,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU V73BL: MFPP Hinged Container, Black, Vented, Three Compartment, 7\" x 7\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/10 (75cs).",
        "features": [
            "Commercial case pack: 150pc (150/1)",
            "Pallet TI/HI: 7/10 (75cs)",
            "Material: Mineral-Filled Polypropylene (MFPP) · Black · 3-Comp · 150pc",
            "Restaurant wholesale direct pricing: $21.95/case"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP) · Black · 3-Comp · 150pc",
        "palletTiHi": "7/10 (75cs)",
        "price": 21.95,
        "mrpPrice": 29.63,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (150 pcs)",
                "sku": "V73BL",
                "price": 21.95,
                "caseCount": 150,
                "unitPrice": 0.146,
                "palletTiHi": "7/10 (75cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "v71bl",
            "v73wh",
            "v83bl"
        ],
        "familyCategory": "hinged-containers",
        "productType": "MFPP Black",
        "sizeBadge": "7\" x 7\"",
        "packaging": "150pc (150/1)",
        "color": "Black",
        "compartments": "3 Compartment",
        "priceLabel": "$21.95",
        "discontinuing": false
    },
    {
        "id": "v81bl",
        "sku": "V81BL",
        "name": "MFPP Hinged Container, Black, Vented, One Compartment, 8\" x 8\", 150pc (150/1)",
        "category": "mfpp-hinged-containers-black",
        "image": "/images/black_hinged_box.jpg",
        "inStock": true,
        "stockCount": 298,
        "rating": 4.9,
        "reviewsCount": 100,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU V81BL: MFPP Hinged Container, Black, Vented, One Compartment, 8\" x 8\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/9 (54cs).",
        "features": [
            "Commercial case pack: 150pc (150/1)",
            "Pallet TI/HI: 6/9 (54cs)",
            "Material: Mineral-Filled Polypropylene (MFPP) · Black · 150pc",
            "Restaurant wholesale direct pricing: $24.55/case"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP) · Black · 150pc",
        "palletTiHi": "6/9 (54cs)",
        "price": 24.55,
        "mrpPrice": 33.14,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (150 pcs)",
                "sku": "V81BL",
                "price": 24.55,
                "caseCount": 150,
                "unitPrice": 0.164,
                "palletTiHi": "6/9 (54cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "v83bl",
            "v81wh",
            "v91bl",
            "v71bl"
        ],
        "familyCategory": "hinged-containers",
        "productType": "MFPP Black",
        "sizeBadge": "8\" x 8\"",
        "packaging": "150pc (150/1)",
        "color": "Black",
        "compartments": "1 Compartment",
        "priceLabel": "$24.55",
        "discontinuing": false
    },
    {
        "id": "v83bl",
        "sku": "V83BL",
        "name": "MFPP Hinged Container, Black, Vented, Three Compartment, 8\" x 8\", 150pc (150/1)",
        "category": "mfpp-hinged-containers-black",
        "image": "/images/black_hinged_box.jpg",
        "inStock": true,
        "stockCount": 321,
        "rating": 4.7,
        "reviewsCount": 107,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU V83BL: MFPP Hinged Container, Black, Vented, Three Compartment, 8\" x 8\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/9 (54cs).",
        "features": [
            "Commercial case pack: 150pc (150/1)",
            "Pallet TI/HI: 6/9 (54cs)",
            "Material: Mineral-Filled Polypropylene (MFPP) · Black · 3-Comp · 150pc",
            "Restaurant wholesale direct pricing: $24.55/case"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP) · Black · 3-Comp · 150pc",
        "palletTiHi": "6/9 (54cs)",
        "price": 24.55,
        "mrpPrice": 33.14,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (150 pcs)",
                "sku": "V83BL",
                "price": 24.55,
                "caseCount": 150,
                "unitPrice": 0.164,
                "palletTiHi": "6/9 (54cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "v81bl",
            "v83wh",
            "v93bl"
        ],
        "familyCategory": "hinged-containers",
        "productType": "MFPP Black",
        "sizeBadge": "8\" x 8\"",
        "packaging": "150pc (150/1)",
        "color": "Black",
        "compartments": "3 Compartment",
        "priceLabel": "$24.55",
        "discontinuing": false
    },
    {
        "id": "v91bl",
        "sku": "V91BL",
        "name": "MFPP Hinged Container, Black, Vented, One Compartment, 9\" x 9\", 150pc (150/1)",
        "category": "mfpp-hinged-containers-black",
        "image": "/images/black_hinged_box.jpg",
        "inStock": true,
        "stockCount": 344,
        "rating": 4.8,
        "reviewsCount": 114,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU V91BL: MFPP Hinged Container, Black, Vented, One Compartment, 9\" x 9\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 5/9 (44cs).",
        "features": [
            "Commercial case pack: 150pc (150/1)",
            "Pallet TI/HI: 5/9 (44cs)",
            "Material: Mineral-Filled Polypropylene (MFPP) · Black · 150pc",
            "Restaurant wholesale direct pricing: $28.45/case"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP) · Black · 150pc",
        "palletTiHi": "5/9 (44cs)",
        "price": 28.45,
        "mrpPrice": 38.41,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (150 pcs)",
                "sku": "V91BL",
                "price": 28.45,
                "caseCount": 150,
                "unitPrice": 0.19,
                "palletTiHi": "5/9 (44cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "v93bl",
            "v91wh",
            "v81bl"
        ],
        "familyCategory": "hinged-containers",
        "productType": "MFPP Black",
        "sizeBadge": "9\" x 9\"",
        "packaging": "150pc (150/1)",
        "color": "Black",
        "compartments": "1 Compartment",
        "priceLabel": "$28.45",
        "discontinuing": false
    },
    {
        "id": "v93bl",
        "sku": "V93BL",
        "name": "MFPP Hinged Container, Black, Vented, Three Compartment, 9\" x 9\", 150pc (150/1)",
        "category": "mfpp-hinged-containers-black",
        "image": "/images/black_hinged_box.jpg",
        "inStock": true,
        "stockCount": 367,
        "rating": 4.9,
        "reviewsCount": 121,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU V93BL: MFPP Hinged Container, Black, Vented, Three Compartment, 9\" x 9\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 5/9 (44cs).",
        "features": [
            "Commercial case pack: 150pc (150/1)",
            "Pallet TI/HI: 5/9 (44cs)",
            "Material: Mineral-Filled Polypropylene (MFPP) · Black · 3-Comp · 150pc",
            "Restaurant wholesale direct pricing: $28.45/case"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP) · Black · 3-Comp · 150pc",
        "palletTiHi": "5/9 (44cs)",
        "price": 28.45,
        "mrpPrice": 38.41,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (150 pcs)",
                "sku": "V93BL",
                "price": 28.45,
                "caseCount": 150,
                "unitPrice": 0.19,
                "palletTiHi": "5/9 (44cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "v91bl",
            "v93wh",
            "v83bl"
        ],
        "familyCategory": "hinged-containers",
        "productType": "MFPP Black",
        "sizeBadge": "9\" x 9\"",
        "packaging": "150pc (150/1)",
        "color": "Black",
        "compartments": "3 Compartment",
        "priceLabel": "$28.45",
        "discontinuing": false
    },
    {
        "id": "pc075",
        "sku": "PC075",
        "name": "0.75oz Portion Cups, PP, 2500pc (100/25)",
        "category": "portion-cups",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 390,
        "rating": 4.8,
        "reviewsCount": 128,
        "featured": false,
        "bestSeller": true,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU PC075: 0.75oz Portion Cups, PP, 2500pc (100/25). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
        "features": [
            "Commercial case pack: 2500pc (100/25)",
            "Pallet TI/HI: 8/5 (40cs)",
            "Material: Polypropylene (PP) · 2500pc",
            "Restaurant wholesale direct pricing: $36.60/case"
        ],
        "material": "Polypropylene (PP) · 2500pc",
        "palletTiHi": "8/5 (40cs)",
        "price": 36.6,
        "mrpPrice": 49.41,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (2500 pcs)",
                "sku": "PC075",
                "price": 36.6,
                "caseCount": 2500,
                "unitPrice": 0.015,
                "palletTiHi": "8/5 (40cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "pc075100l",
            "pc100",
            "pc150",
            "pc200"
        ],
        "familyCategory": "portion-cups",
        "productType": "Standard",
        "sizeBadge": "0.75 oz",
        "packaging": "2500pc (100/25)",
        "priceLabel": "$36.60",
        "discontinuing": false
    },
    {
        "id": "pc100",
        "sku": "PC100",
        "name": "1oz Portion Cups, PP, 2500pc (100/25)",
        "category": "portion-cups",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 413,
        "rating": 4.9,
        "reviewsCount": 135,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU PC100: 1oz Portion Cups, PP, 2500pc (100/25). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
        "features": [
            "Commercial case pack: 2500pc (100/25)",
            "Pallet TI/HI: 8/5 (40cs)",
            "Material: Polypropylene (PP) · 2500pc",
            "Restaurant wholesale direct pricing: $41.45/case"
        ],
        "material": "Polypropylene (PP) · 2500pc",
        "palletTiHi": "8/5 (40cs)",
        "price": 41.45,
        "mrpPrice": 55.96,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (2500 pcs)",
                "sku": "PC100",
                "price": 41.45,
                "caseCount": 2500,
                "unitPrice": 0.017,
                "palletTiHi": "8/5 (40cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "pc075100l",
            "pc075",
            "pc150",
            "pc200"
        ],
        "familyCategory": "portion-cups",
        "productType": "Standard",
        "sizeBadge": "1 oz",
        "packaging": "2500pc (100/25)",
        "priceLabel": "$41.45",
        "discontinuing": false
    },
    {
        "id": "pc150",
        "sku": "PC150",
        "name": "1.5oz Portion Cups, PP, 2500pc (100/25)",
        "category": "portion-cups",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 436,
        "rating": 4.7,
        "reviewsCount": 142,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU PC150: 1.5oz Portion Cups, PP, 2500pc (100/25). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/5 (30cs).",
        "features": [
            "Commercial case pack: 2500pc (100/25)",
            "Pallet TI/HI: 6/5 (30cs)",
            "Material: Polypropylene (PP) · 2500pc",
            "Restaurant wholesale direct pricing: $33.31/case"
        ],
        "material": "Polypropylene (PP) · 2500pc",
        "palletTiHi": "6/5 (30cs)",
        "price": 33.31,
        "mrpPrice": 44.97,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (2500 pcs)",
                "sku": "PC150",
                "price": 33.31,
                "caseCount": 2500,
                "unitPrice": 0.013,
                "palletTiHi": "6/5 (30cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "pc150250l",
            "pc200",
            "pc100",
            "pc325"
        ],
        "familyCategory": "portion-cups",
        "productType": "Standard",
        "sizeBadge": "1.5 oz",
        "packaging": "2500pc (100/25)",
        "priceLabel": "$33.31",
        "discontinuing": false
    },
    {
        "id": "pc200",
        "sku": "PC200",
        "name": "2oz Portion Cups, PP, 2500pc (100/25)",
        "category": "portion-cups",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 459,
        "rating": 4.8,
        "reviewsCount": 34,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU PC200: 2oz Portion Cups, PP, 2500pc (100/25). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/5 (30cs).",
        "features": [
            "Commercial case pack: 2500pc (100/25)",
            "Pallet TI/HI: 6/5 (30cs)",
            "Material: Polypropylene (PP) · 2500pc",
            "Restaurant wholesale direct pricing: $34.50/case"
        ],
        "material": "Polypropylene (PP) · 2500pc",
        "palletTiHi": "6/5 (30cs)",
        "price": 34.5,
        "mrpPrice": 46.58,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (2500 pcs)",
                "sku": "PC200",
                "price": 34.5,
                "caseCount": 2500,
                "unitPrice": 0.014,
                "palletTiHi": "6/5 (30cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "pc150250l",
            "pc150",
            "pc325",
            "pc400"
        ],
        "familyCategory": "portion-cups",
        "productType": "Standard",
        "sizeBadge": "2 oz",
        "packaging": "2500pc (100/25)",
        "priceLabel": "$34.50",
        "discontinuing": false
    },
    {
        "id": "pc325",
        "sku": "PC325",
        "name": "3.25oz Portion Cups, PP, 2500pc (100/25)",
        "category": "portion-cups",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 482,
        "rating": 4.9,
        "reviewsCount": 41,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU PC325: 3.25oz Portion Cups, PP, 2500pc (100/25). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/7 (49cs).",
        "features": [
            "Commercial case pack: 2500pc (100/25)",
            "Pallet TI/HI: 7/7 (49cs)",
            "Material: Polypropylene (PP) · 2500pc",
            "Restaurant wholesale direct pricing: $22.21/case"
        ],
        "material": "Polypropylene (PP) · 2500pc",
        "palletTiHi": "7/7 (49cs)",
        "price": 22.21,
        "mrpPrice": 29.98,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (2500 pcs)",
                "sku": "PC325",
                "price": 22.21,
                "caseCount": 2500,
                "unitPrice": 0.009,
                "palletTiHi": "7/7 (49cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "pc325550l",
            "pc400",
            "pc550",
            "pc200"
        ],
        "familyCategory": "portion-cups",
        "productType": "Standard",
        "sizeBadge": "3.25 oz",
        "packaging": "2500pc (100/25)",
        "priceLabel": "$22.21",
        "discontinuing": false
    },
    {
        "id": "pc400",
        "sku": "PC400",
        "name": "4oz Portion Cups, PP, 2500pc (100/25)",
        "category": "portion-cups",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 505,
        "rating": 4.8,
        "reviewsCount": 48,
        "featured": false,
        "bestSeller": true,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU PC400: 4oz Portion Cups, PP, 2500pc (100/25). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/6 (42cs).",
        "features": [
            "Commercial case pack: 2500pc (100/25)",
            "Pallet TI/HI: 7/6 (42cs)",
            "Material: Polypropylene (PP) · 2500pc",
            "Restaurant wholesale direct pricing: $41.60/case"
        ],
        "material": "Polypropylene (PP) · 2500pc",
        "palletTiHi": "7/6 (42cs)",
        "price": 41.6,
        "mrpPrice": 56.16,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (2500 pcs)",
                "sku": "PC400",
                "price": 41.6,
                "caseCount": 2500,
                "unitPrice": 0.017,
                "palletTiHi": "7/6 (42cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "pc325550l",
            "pc325",
            "pc550",
            "pc200"
        ],
        "familyCategory": "portion-cups",
        "productType": "Standard",
        "sizeBadge": "4 oz",
        "packaging": "2500pc (100/25)",
        "priceLabel": "$41.60",
        "discontinuing": false
    },
    {
        "id": "pc550",
        "sku": "PC550",
        "name": "5.5oz Portion Cups, PP, 2500pc (100/25)",
        "category": "portion-cups",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 528,
        "rating": 4.9,
        "reviewsCount": 55,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU PC550: 5.5oz Portion Cups, PP, 2500pc (100/25). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 5/10 (50cs).",
        "features": [
            "Commercial case pack: 2500pc (100/25)",
            "Pallet TI/HI: 5/10 (50cs)",
            "Material: Polypropylene (PP) · 2500pc",
            "Restaurant wholesale direct pricing: $33.65/case"
        ],
        "material": "Polypropylene (PP) · 2500pc",
        "palletTiHi": "5/10 (50cs)",
        "price": 33.65,
        "mrpPrice": 45.43,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (2500 pcs)",
                "sku": "PC550",
                "price": 33.65,
                "caseCount": 2500,
                "unitPrice": 0.013,
                "palletTiHi": "5/10 (50cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "pc325550l",
            "pc400",
            "pc325"
        ],
        "familyCategory": "portion-cups",
        "productType": "Standard",
        "sizeBadge": "5.5 oz",
        "packaging": "2500pc (100/25)",
        "priceLabel": "$33.65",
        "discontinuing": false
    },
    {
        "id": "pc075100l",
        "sku": "PC075100L",
        "name": "Lid Flat PET for 0.75oz and 1oz, 2500pc (100/25)",
        "category": "portion-cup-lids",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 151,
        "rating": 4.7,
        "reviewsCount": 62,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "Crystal Clear PET",
            "Cold Ready"
        ],
        "description": "Commercial food service packaging SKU PC075100L: Lid Flat PET for 0.75oz and 1oz, 2500pc (100/25). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 4/10 (40cs).",
        "features": [
            "Commercial case pack: 2500pc (100/25)",
            "Pallet TI/HI: 4/10 (40cs)",
            "Material: Ultra-Clear PET · 2500pc",
            "Restaurant wholesale direct pricing: $41.97/case"
        ],
        "material": "Ultra-Clear PET · 2500pc",
        "palletTiHi": "4/10 (40cs)",
        "price": 41.97,
        "mrpPrice": 56.66,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (2500 pcs)",
                "sku": "PC075100L",
                "price": 41.97,
                "caseCount": 2500,
                "unitPrice": 0.017,
                "palletTiHi": "4/10 (40cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "pc075",
            "pc100"
        ],
        "familyCategory": "portion-cup-lids",
        "productType": "Standard",
        "sizeBadge": "0.75 oz",
        "packaging": "2500pc (100/25)",
        "priceLabel": "$41.97",
        "discontinuing": false
    },
    {
        "id": "pc150250l",
        "sku": "PC150250L",
        "name": "Lid Flat PET for 1.5oz and 2oz, 2500pc (125/20)",
        "category": "portion-cup-lids",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 174,
        "rating": 4.8,
        "reviewsCount": 69,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "Crystal Clear PET",
            "Cold Ready"
        ],
        "description": "Commercial food service packaging SKU PC150250L: Lid Flat PET for 1.5oz and 2oz, 2500pc (125/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/10 (60cs).",
        "features": [
            "Commercial case pack: 2500pc (125/20)",
            "Pallet TI/HI: 6/10 (60cs)",
            "Material: Ultra-Clear PET · 2500pc",
            "Restaurant wholesale direct pricing: $41.97/case"
        ],
        "material": "Ultra-Clear PET · 2500pc",
        "palletTiHi": "6/10 (60cs)",
        "price": 41.97,
        "mrpPrice": 56.66,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (2500 pcs)",
                "sku": "PC150250L",
                "price": 41.97,
                "caseCount": 2500,
                "unitPrice": 0.017,
                "palletTiHi": "6/10 (60cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "pc150",
            "pc200"
        ],
        "familyCategory": "portion-cup-lids",
        "productType": "Standard",
        "sizeBadge": "1.5 oz",
        "packaging": "2500pc (125/20)",
        "priceLabel": "$41.97",
        "discontinuing": false
    },
    {
        "id": "pc325550l",
        "sku": "PC325550L",
        "name": "Lid Flat PET for 3.25oz, 4oz, and 5.5oz, 2500pc (100/25)",
        "category": "portion-cup-lids",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 197,
        "rating": 4.9,
        "reviewsCount": 76,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "Crystal Clear PET",
            "Cold Ready"
        ],
        "description": "Commercial food service packaging SKU PC325550L: Lid Flat PET for 3.25oz, 4oz, and 5.5oz, 2500pc (100/25). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 5/8 (40cs).",
        "features": [
            "Commercial case pack: 2500pc (100/25)",
            "Pallet TI/HI: 5/8 (40cs)",
            "Material: Ultra-Clear PET · 2500pc",
            "Restaurant wholesale direct pricing: $29.91/case"
        ],
        "material": "Ultra-Clear PET · 2500pc",
        "palletTiHi": "5/8 (40cs)",
        "price": 29.91,
        "mrpPrice": 40.38,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (2500 pcs)",
                "sku": "PC325550L",
                "price": 29.91,
                "caseCount": 2500,
                "unitPrice": 0.012,
                "palletTiHi": "5/8 (40cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "pc325",
            "pc400",
            "pc550"
        ],
        "familyCategory": "portion-cup-lids",
        "productType": "Standard",
        "sizeBadge": "3.25 oz",
        "packaging": "2500pc (100/25)",
        "priceLabel": "$29.91",
        "discontinuing": false
    },
    {
        "id": "tc61",
        "sku": "TC61",
        "name": "Hinged Duo-Colored PP Container, 6\" x 6\", 200pc (100/2)",
        "category": "two-color-hinged-containers",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 220,
        "rating": 4.8,
        "reviewsCount": 83,
        "featured": false,
        "bestSeller": true,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU TC61: Hinged Duo-Colored PP Container, 6\" x 6\", 200pc (100/2). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/7 (56cs).",
        "features": [
            "Commercial case pack: 200pc (100/2)",
            "Pallet TI/HI: 8/7 (56cs)",
            "Material: Duo-Colored Polypropylene (PP) · 200pc",
            "Restaurant wholesale direct pricing: $38.02/case"
        ],
        "material": "Duo-Colored Polypropylene (PP) · 200pc",
        "palletTiHi": "8/7 (56cs)",
        "price": 38.02,
        "mrpPrice": 51.33,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (200 pcs)",
                "sku": "TC61",
                "price": 38.02,
                "caseCount": 200,
                "unitPrice": 0.19,
                "palletTiHi": "8/7 (56cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "tc96",
            "tc81m",
            "tc91",
            "v61c"
        ],
        "familyCategory": "hinged-containers",
        "productType": "Two-Color",
        "sizeBadge": "6\" x 6\"",
        "packaging": "200pc (100/2)",
        "color": "Two-Color",
        "priceLabel": "$38.02",
        "discontinuing": false
    },
    {
        "id": "tc96",
        "sku": "TC96",
        "name": "Hinged Duo-Colored PP Hoagie Container, 9\" x 6\", 150pc (75/2)",
        "category": "two-color-hinged-containers",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 243,
        "rating": 4.9,
        "reviewsCount": 90,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU TC96: Hinged Duo-Colored PP Hoagie Container, 9\" x 6\", 150pc (75/2). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/5 (30cs).",
        "features": [
            "Commercial case pack: 150pc (75/2)",
            "Pallet TI/HI: 6/5 (30cs)",
            "Material: Duo-Colored Polypropylene (PP) · 150pc",
            "Restaurant wholesale direct pricing: $34.04/case"
        ],
        "material": "Duo-Colored Polypropylene (PP) · 150pc",
        "palletTiHi": "6/5 (30cs)",
        "price": 34.04,
        "mrpPrice": 45.95,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (150 pcs)",
                "sku": "TC96",
                "price": 34.04,
                "caseCount": 150,
                "unitPrice": 0.227,
                "palletTiHi": "6/5 (30cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "tc61",
            "tc100",
            "tc81m",
            "v96c"
        ],
        "familyCategory": "hinged-containers",
        "productType": "Two-Color",
        "sizeBadge": "9\" x 6\"",
        "packaging": "150pc (75/2)",
        "color": "Two-Color",
        "priceLabel": "$34.04",
        "discontinuing": false
    },
    {
        "id": "tc81m",
        "sku": "TC81M",
        "name": "Hinged Duo-Colored PP Container, 8\" x 8\", 100pc (100/1)",
        "category": "two-color-hinged-containers",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 266,
        "rating": 4.7,
        "reviewsCount": 97,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU TC81M: Hinged Duo-Colored PP Container, 8\" x 8\", 100pc (100/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/7 (42cs).",
        "features": [
            "Commercial case pack: 100pc (100/1)",
            "Pallet TI/HI: 6/7 (42cs)",
            "Material: Duo-Colored Polypropylene (PP) · 100pc",
            "Restaurant wholesale direct pricing: $23.51/case"
        ],
        "material": "Duo-Colored Polypropylene (PP) · 100pc",
        "palletTiHi": "6/7 (42cs)",
        "price": 23.51,
        "mrpPrice": 31.74,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (100 pcs)",
                "sku": "TC81M",
                "price": 23.51,
                "caseCount": 100,
                "unitPrice": 0.235,
                "palletTiHi": "6/7 (42cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "tc83",
            "tc83m",
            "tc91",
            "tc61"
        ],
        "familyCategory": "hinged-containers",
        "productType": "Two-Color",
        "sizeBadge": "8\" x 8\"",
        "packaging": "100pc (100/1)",
        "color": "Two-Color",
        "priceLabel": "$23.51",
        "discontinuing": false
    },
    {
        "id": "tc83",
        "sku": "TC83",
        "name": "Hinged Duo-Colored PP Container 3-compartment, 8\" x 8\", 120pc (120/1)",
        "category": "two-color-hinged-containers",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 289,
        "rating": 4.8,
        "reviewsCount": 104,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU TC83: Hinged Duo-Colored PP Container 3-compartment, 8\" x 8\", 120pc (120/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/10 (75cs).",
        "features": [
            "Commercial case pack: 120pc (120/1)",
            "Pallet TI/HI: 7/10 (75cs)",
            "Material: Duo-Colored PP · 3-Comp · 120pc",
            "Restaurant wholesale direct pricing: $23.51/case"
        ],
        "material": "Duo-Colored PP · 3-Comp · 120pc",
        "palletTiHi": "7/10 (75cs)",
        "price": 23.51,
        "mrpPrice": 31.74,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (120 pcs)",
                "sku": "TC83",
                "price": 23.51,
                "caseCount": 120,
                "unitPrice": 0.196,
                "palletTiHi": "7/10 (75cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "tc81m",
            "tc83m",
            "tc93"
        ],
        "familyCategory": "hinged-containers",
        "productType": "Two-Color",
        "sizeBadge": "8\" x 8\"",
        "packaging": "120pc (120/1)",
        "color": "Two-Color",
        "compartments": "3 Compartment",
        "priceLabel": "$23.51",
        "discontinuing": false
    },
    {
        "id": "tc83m",
        "sku": "TC83M",
        "name": "Hinged Duo-Colored PP Container 3-compartment, 8\" x 8\", 100pc (100/1)",
        "category": "two-color-hinged-containers",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 312,
        "rating": 4.9,
        "reviewsCount": 111,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU TC83M: Hinged Duo-Colored PP Container 3-compartment, 8\" x 8\", 100pc (100/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/10 (75cs).",
        "features": [
            "Commercial case pack: 100pc (100/1)",
            "Pallet TI/HI: 7/10 (75cs)",
            "Material: Duo-Colored PP · 3-Comp · 100pc",
            "Restaurant wholesale direct pricing: $28.93/case"
        ],
        "material": "Duo-Colored PP · 3-Comp · 100pc",
        "palletTiHi": "7/10 (75cs)",
        "price": 28.93,
        "mrpPrice": 39.06,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (100 pcs)",
                "sku": "TC83M",
                "price": 28.93,
                "caseCount": 100,
                "unitPrice": 0.289,
                "palletTiHi": "7/10 (75cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "tc83",
            "tc81m",
            "tc93"
        ],
        "familyCategory": "hinged-containers",
        "productType": "Two-Color",
        "sizeBadge": "8\" x 8\"",
        "packaging": "100pc (100/1)",
        "color": "Two-Color",
        "compartments": "3 Compartment",
        "priceLabel": "$28.93",
        "discontinuing": false
    },
    {
        "id": "tc91",
        "sku": "TC91",
        "name": "Hinged Duo-Colored PP Container, 9\" x 9\", 100pc (100/1)",
        "category": "two-color-hinged-containers",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 335,
        "rating": 4.8,
        "reviewsCount": 118,
        "featured": false,
        "bestSeller": true,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU TC91: Hinged Duo-Colored PP Container, 9\" x 9\", 100pc (100/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/9 (54cs).",
        "features": [
            "Commercial case pack: 100pc (100/1)",
            "Pallet TI/HI: 6/9 (54cs)",
            "Material: Duo-Colored Polypropylene (PP) · 100pc",
            "Restaurant wholesale direct pricing: $28.93/case"
        ],
        "material": "Duo-Colored Polypropylene (PP) · 100pc",
        "palletTiHi": "6/9 (54cs)",
        "price": 28.93,
        "mrpPrice": 39.06,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (100 pcs)",
                "sku": "TC91",
                "price": 28.93,
                "caseCount": 100,
                "unitPrice": 0.289,
                "palletTiHi": "6/9 (54cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "tc93",
            "tc81m",
            "tc100"
        ],
        "familyCategory": "hinged-containers",
        "productType": "Two-Color",
        "sizeBadge": "9\" x 9\"",
        "packaging": "100pc (100/1)",
        "color": "Two-Color",
        "priceLabel": "$28.93",
        "discontinuing": false
    },
    {
        "id": "tc93",
        "sku": "TC93",
        "name": "Hinged Duo-Colored PP Container 3-compartment, 9\" x 9\", 100pc (100/1)",
        "category": "two-color-hinged-containers",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 358,
        "rating": 4.9,
        "reviewsCount": 125,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU TC93: Hinged Duo-Colored PP Container 3-compartment, 9\" x 9\", 100pc (100/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/9 (54cs).",
        "features": [
            "Commercial case pack: 100pc (100/1)",
            "Pallet TI/HI: 6/9 (54cs)",
            "Material: Duo-Colored PP · 3-Comp · 100pc",
            "Restaurant wholesale direct pricing: $35.27/case"
        ],
        "material": "Duo-Colored PP · 3-Comp · 100pc",
        "palletTiHi": "6/9 (54cs)",
        "price": 35.27,
        "mrpPrice": 47.61,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (100 pcs)",
                "sku": "TC93",
                "price": 35.27,
                "caseCount": 100,
                "unitPrice": 0.353,
                "palletTiHi": "6/9 (54cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "tc91",
            "tc83m",
            "tc103"
        ],
        "familyCategory": "hinged-containers",
        "productType": "Two-Color",
        "sizeBadge": "9\" x 9\"",
        "packaging": "100pc (100/1)",
        "color": "Two-Color",
        "compartments": "3 Compartment",
        "priceLabel": "$35.27",
        "discontinuing": false
    },
    {
        "id": "tc100",
        "sku": "TC100",
        "name": "Hinged Duo-Colored PP Hoagie Container, 10\" x 10\", 100pc (100/1)",
        "category": "two-color-hinged-containers",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 381,
        "rating": 4.7,
        "reviewsCount": 132,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU TC100: Hinged Duo-Colored PP Hoagie Container, 10\" x 10\", 100pc (100/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/10 (75cs).",
        "features": [
            "Commercial case pack: 100pc (100/1)",
            "Pallet TI/HI: 7/10 (75cs)",
            "Material: Duo-Colored Polypropylene (PP) · 100pc",
            "Restaurant wholesale direct pricing: $35.27/case"
        ],
        "material": "Duo-Colored Polypropylene (PP) · 100pc",
        "palletTiHi": "7/10 (75cs)",
        "price": 35.27,
        "mrpPrice": 47.61,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (100 pcs)",
                "sku": "TC100",
                "price": 35.27,
                "caseCount": 100,
                "unitPrice": 0.353,
                "palletTiHi": "7/10 (75cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "tc103",
            "tc91",
            "tc96"
        ],
        "familyCategory": "hinged-containers",
        "productType": "Two-Color",
        "sizeBadge": "10\" x 10\"",
        "packaging": "100pc (100/1)",
        "color": "Two-Color",
        "priceLabel": "$35.27",
        "discontinuing": false
    },
    {
        "id": "tc103",
        "sku": "TC103",
        "name": "Hinged Duo-Colored PP Hoagie Container 3-compartment, 10\" x 10\", 100pc (100/1)",
        "category": "two-color-hinged-containers",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 404,
        "rating": 4.8,
        "reviewsCount": 139,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU TC103: Hinged Duo-Colored PP Hoagie Container 3-compartment, 10\" x 10\", 100pc (100/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/10 (75cs).",
        "features": [
            "Commercial case pack: 100pc (100/1)",
            "Pallet TI/HI: 7/10 (75cs)",
            "Material: Duo-Colored PP · 3-Comp · 100pc",
            "Restaurant wholesale direct pricing: $52.92/case"
        ],
        "material": "Duo-Colored PP · 3-Comp · 100pc",
        "palletTiHi": "7/10 (75cs)",
        "price": 52.92,
        "mrpPrice": 71.44,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (100 pcs)",
                "sku": "TC103",
                "price": 52.92,
                "caseCount": 100,
                "unitPrice": 0.529,
                "palletTiHi": "7/10 (75cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "tc100",
            "tc93",
            "tc83m"
        ],
        "familyCategory": "hinged-containers",
        "productType": "Two-Color",
        "sizeBadge": "10\" x 10\"",
        "packaging": "100pc (100/1)",
        "color": "Two-Color",
        "compartments": "3 Compartment",
        "priceLabel": "$52.92",
        "discontinuing": false
    },
    {
        "id": "v61c",
        "sku": "V61C",
        "name": "PP Hinged Container, Translucent, 6\" x 6\", 250pc (250/1)",
        "category": "translucent-hinged-containers",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 427,
        "rating": 4.9,
        "reviewsCount": 31,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU V61C: PP Hinged Container, Translucent, 6\" x 6\", 250pc (250/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/10 (75cs).",
        "features": [
            "Commercial case pack: 250pc (250/1)",
            "Pallet TI/HI: 7/10 (75cs)",
            "Material: Translucent Polypropylene (PP) · 250pc",
            "Restaurant wholesale direct pricing: $52.92/case"
        ],
        "material": "Translucent Polypropylene (PP) · 250pc",
        "palletTiHi": "7/10 (75cs)",
        "price": 52.92,
        "mrpPrice": 71.44,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (250 pcs)",
                "sku": "V61C",
                "price": 52.92,
                "caseCount": 250,
                "unitPrice": 0.212,
                "palletTiHi": "7/10 (75cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "v96c",
            "v71c",
            "v81c",
            "v91c"
        ],
        "familyCategory": "hinged-containers",
        "productType": "Translucent",
        "sizeBadge": "6\" x 6\"",
        "packaging": "250pc (250/1)",
        "color": "Translucent",
        "compartments": "1 Compartment",
        "priceLabel": "$52.92",
        "discontinuing": false
    },
    {
        "id": "v96c",
        "sku": "V96C",
        "name": "PP Hinged Container, Translucent, 9\" x 6\", 200pc (200/1)",
        "category": "translucent-hinged-containers",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 450,
        "rating": 4.8,
        "reviewsCount": 38,
        "featured": false,
        "bestSeller": true,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU V96C: PP Hinged Container, Translucent, 9\" x 6\", 200pc (200/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/10 (75cs).",
        "features": [
            "Commercial case pack: 200pc (200/1)",
            "Pallet TI/HI: 7/10 (75cs)",
            "Material: Translucent Polypropylene (PP) · 200pc",
            "Restaurant wholesale direct pricing: $51.14/case"
        ],
        "material": "Translucent Polypropylene (PP) · 200pc",
        "palletTiHi": "7/10 (75cs)",
        "price": 51.14,
        "mrpPrice": 69.04,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (200 pcs)",
                "sku": "V96C",
                "price": 51.14,
                "caseCount": 200,
                "unitPrice": 0.256,
                "palletTiHi": "7/10 (75cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "v962c",
            "v61c",
            "v81c"
        ],
        "familyCategory": "hinged-containers",
        "productType": "Translucent",
        "sizeBadge": "9\" x 6\"",
        "packaging": "200pc (200/1)",
        "color": "Translucent",
        "priceLabel": "$51.14",
        "discontinuing": false
    },
    {
        "id": "v962c",
        "sku": "V962C",
        "name": "PP Hinged Container, Translucent, 2-compartment, 9\" x 6\", 200pc (200/1)",
        "category": "translucent-hinged-containers",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 473,
        "rating": 4.9,
        "reviewsCount": 45,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU V962C: PP Hinged Container, Translucent, 2-compartment, 9\" x 6\", 200pc (200/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/9 (54cs).",
        "features": [
            "Commercial case pack: 200pc (200/1)",
            "Pallet TI/HI: 6/9 (54cs)",
            "Material: Translucent PP · 2-Comp · 200pc",
            "Restaurant wholesale direct pricing: $63.31/case"
        ],
        "material": "Translucent PP · 2-Comp · 200pc",
        "palletTiHi": "6/9 (54cs)",
        "price": 63.31,
        "mrpPrice": 85.47,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (200 pcs)",
                "sku": "V962C",
                "price": 63.31,
                "caseCount": 200,
                "unitPrice": 0.317,
                "palletTiHi": "6/9 (54cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "v96c",
            "v73c",
            "v83c"
        ],
        "familyCategory": "hinged-containers",
        "productType": "Translucent",
        "sizeBadge": "9\" x 6\"",
        "packaging": "200pc (200/1)",
        "color": "Translucent",
        "compartments": "2 Compartment",
        "priceLabel": "$63.31",
        "discontinuing": false
    },
    {
        "id": "v71c",
        "sku": "V71C",
        "name": "PP Hinged Container, Translucent, Vented, One Compartment, 7\" x 7\", 150pc (150/1)",
        "category": "translucent-hinged-containers",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 496,
        "rating": 4.7,
        "reviewsCount": 52,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU V71C: PP Hinged Container, Translucent, Vented, One Compartment, 7\" x 7\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/9 (54cs).",
        "features": [
            "Commercial case pack: 150pc (150/1)",
            "Pallet TI/HI: 6/9 (54cs)",
            "Material: Translucent Polypropylene (PP) · 150pc",
            "Restaurant wholesale direct pricing: $63.31/case"
        ],
        "material": "Translucent Polypropylene (PP) · 150pc",
        "palletTiHi": "6/9 (54cs)",
        "price": 63.31,
        "mrpPrice": 85.47,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (150 pcs)",
                "sku": "V71C",
                "price": 63.31,
                "caseCount": 150,
                "unitPrice": 0.422,
                "palletTiHi": "6/9 (54cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "v73c",
            "v81c",
            "v61c"
        ],
        "familyCategory": "hinged-containers",
        "productType": "Translucent",
        "sizeBadge": "7\" x 7\"",
        "packaging": "150pc (150/1)",
        "color": "Translucent",
        "compartments": "1 Compartment",
        "priceLabel": "$63.31",
        "discontinuing": false
    },
    {
        "id": "v73c",
        "sku": "V73C",
        "name": "PP Hinged Container, Translucent, Vented, Three Compartment, 7\" x 7\", 150pc (150/1)",
        "category": "translucent-hinged-containers",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 519,
        "rating": 4.8,
        "reviewsCount": 59,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU V73C: PP Hinged Container, Translucent, Vented, Three Compartment, 7\" x 7\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/6 (36cs).",
        "features": [
            "Commercial case pack: 150pc (150/1)",
            "Pallet TI/HI: 6/6 (36cs)",
            "Material: Translucent PP · 3-Comp · 150pc",
            "Restaurant wholesale direct pricing: $16.42/case"
        ],
        "material": "Translucent PP · 3-Comp · 150pc",
        "palletTiHi": "6/6 (36cs)",
        "price": 16.42,
        "mrpPrice": 22.17,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (150 pcs)",
                "sku": "V73C",
                "price": 16.42,
                "caseCount": 150,
                "unitPrice": 0.109,
                "palletTiHi": "6/6 (36cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "v71c",
            "v83c",
            "v93c"
        ],
        "familyCategory": "hinged-containers",
        "productType": "Translucent",
        "sizeBadge": "7\" x 7\"",
        "packaging": "150pc (150/1)",
        "color": "Translucent",
        "compartments": "3 Compartment",
        "priceLabel": "$16.42",
        "discontinuing": false
    },
    {
        "id": "v81c",
        "sku": "V81C",
        "name": "PP Hinged Container, Translucent, Vented, One Compartment, 8\" x 8\", 150pc (150/1)",
        "category": "translucent-hinged-containers",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 542,
        "rating": 4.9,
        "reviewsCount": 66,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU V81C: PP Hinged Container, Translucent, Vented, One Compartment, 8\" x 8\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/7 (42cs).",
        "features": [
            "Commercial case pack: 150pc (150/1)",
            "Pallet TI/HI: 6/7 (42cs)",
            "Material: Translucent Polypropylene (PP) · 150pc",
            "Restaurant wholesale direct pricing: $19.03/case"
        ],
        "material": "Translucent Polypropylene (PP) · 150pc",
        "palletTiHi": "6/7 (42cs)",
        "price": 19.03,
        "mrpPrice": 25.69,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (150 pcs)",
                "sku": "V81C",
                "price": 19.03,
                "caseCount": 150,
                "unitPrice": 0.127,
                "palletTiHi": "6/7 (42cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "v83c",
            "v91c",
            "v71c"
        ],
        "familyCategory": "hinged-containers",
        "productType": "Translucent",
        "sizeBadge": "8\" x 8\"",
        "packaging": "150pc (150/1)",
        "color": "Translucent",
        "compartments": "1 Compartment",
        "priceLabel": "$19.03",
        "discontinuing": false
    },
    {
        "id": "v83c",
        "sku": "V83C",
        "name": "PP Hinged Container, Translucent, Vented, Three Compartment, 8\" x 8\", 150pc (150/1)",
        "category": "translucent-hinged-containers",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 165,
        "rating": 4.8,
        "reviewsCount": 73,
        "featured": false,
        "bestSeller": true,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU V83C: PP Hinged Container, Translucent, Vented, Three Compartment, 8\" x 8\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 16/9 (144cs).",
        "features": [
            "Commercial case pack: 150pc (150/1)",
            "Pallet TI/HI: 16/9 (144cs)",
            "Material: Translucent PP · 3-Comp · 150pc",
            "Restaurant wholesale direct pricing: $23.34/case"
        ],
        "material": "Translucent PP · 3-Comp · 150pc",
        "palletTiHi": "16/9 (144cs)",
        "price": 23.34,
        "mrpPrice": 31.51,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (150 pcs)",
                "sku": "V83C",
                "price": 23.34,
                "caseCount": 150,
                "unitPrice": 0.156,
                "palletTiHi": "16/9 (144cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "v81c",
            "v93c",
            "v73c"
        ],
        "familyCategory": "hinged-containers",
        "productType": "Translucent",
        "sizeBadge": "8\" x 8\"",
        "packaging": "150pc (150/1)",
        "color": "Translucent",
        "compartments": "3 Compartment",
        "priceLabel": "$23.34",
        "discontinuing": false
    },
    {
        "id": "v91c",
        "sku": "V91C",
        "name": "PP Hinged Container, Translucent, Vented, One Compartment, 9\" x 9\", 150pc (150/1)",
        "category": "translucent-hinged-containers",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 188,
        "rating": 4.9,
        "reviewsCount": 80,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU V91C: PP Hinged Container, Translucent, Vented, One Compartment, 9\" x 9\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 16/9 (144cs).",
        "features": [
            "Commercial case pack: 150pc (150/1)",
            "Pallet TI/HI: 16/9 (144cs)",
            "Material: Translucent Polypropylene (PP) · 150pc",
            "Restaurant wholesale direct pricing: $25.39/case"
        ],
        "material": "Translucent Polypropylene (PP) · 150pc",
        "palletTiHi": "16/9 (144cs)",
        "price": 25.39,
        "mrpPrice": 34.28,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (150 pcs)",
                "sku": "V91C",
                "price": 25.39,
                "caseCount": 150,
                "unitPrice": 0.169,
                "palletTiHi": "16/9 (144cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "v93c",
            "v81c",
            "v61c"
        ],
        "familyCategory": "hinged-containers",
        "productType": "Translucent",
        "sizeBadge": "9\" x 9\"",
        "packaging": "150pc (150/1)",
        "color": "Translucent",
        "compartments": "1 Compartment",
        "priceLabel": "$25.39",
        "discontinuing": false
    },
    {
        "id": "v93c",
        "sku": "V93C",
        "name": "PP Hinged Container, Translucent, Vented, Three Compartment, 9\" x 9\", 150pc (150/1)",
        "category": "translucent-hinged-containers",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 211,
        "rating": 4.7,
        "reviewsCount": 87,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU V93C: PP Hinged Container, Translucent, Vented, Three Compartment, 9\" x 9\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 12/7 (84cs).",
        "features": [
            "Commercial case pack: 150pc (150/1)",
            "Pallet TI/HI: 12/7 (84cs)",
            "Material: Translucent PP · 3-Comp · 150pc",
            "Restaurant wholesale direct pricing: $37.45/case"
        ],
        "material": "Translucent PP · 3-Comp · 150pc",
        "palletTiHi": "12/7 (84cs)",
        "price": 37.45,
        "mrpPrice": 50.56,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (150 pcs)",
                "sku": "V93C",
                "price": 37.45,
                "caseCount": 150,
                "unitPrice": 0.25,
                "palletTiHi": "12/7 (84cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "v91c",
            "v83c",
            "v73c"
        ],
        "familyCategory": "hinged-containers",
        "productType": "Translucent",
        "sizeBadge": "9\" x 9\"",
        "packaging": "150pc (150/1)",
        "color": "Translucent",
        "compartments": "3 Compartment",
        "priceLabel": "$37.45",
        "discontinuing": false
    },
    {
        "id": "pshcl61x2",
        "sku": "PSHCL61X2",
        "name": "Clear Hinged PS Container, 6\" x 6\" 2in Tall, 400pc (200/2)",
        "category": "clear-polystyrene-containers",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 234,
        "rating": 4.8,
        "reviewsCount": 94,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock"
        ],
        "description": "Commercial food service packaging SKU PSHCL61X2: Clear Hinged PS Container, 6\" x 6\" 2in Tall, 400pc (200/2). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/7 (56cs).",
        "features": [
            "Commercial case pack: 400pc (200/2)",
            "Pallet TI/HI: 8/7 (56cs)",
            "Material: Crystal Clear Polystyrene (PS) · 400pc",
            "Restaurant wholesale direct pricing: $16.42/case"
        ],
        "material": "Crystal Clear Polystyrene (PS) · 400pc",
        "palletTiHi": "8/7 (56cs)",
        "price": 16.42,
        "mrpPrice": 22.17,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (400 pcs)",
                "sku": "PSHCL61X2",
                "price": 16.42,
                "caseCount": 400,
                "unitPrice": 0.041,
                "palletTiHi": "8/7 (56cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "pshcl61",
            "pshcl81x2",
            "pshcl81"
        ],
        "familyCategory": "hinged-containers",
        "productType": "Clear PS",
        "sizeBadge": "6\" x 6\"",
        "packaging": "400pc (200/2)",
        "color": "Clear",
        "priceLabel": "$16.42",
        "discontinuing": false
    },
    {
        "id": "pshcl61",
        "sku": "PSHCL61",
        "name": "Clear Hinged PS Container, 6\" x 6\" 3in Tall, 400pc (200/2)",
        "category": "clear-polystyrene-containers",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 257,
        "rating": 4.9,
        "reviewsCount": 101,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock"
        ],
        "description": "Commercial food service packaging SKU PSHCL61: Clear Hinged PS Container, 6\" x 6\" 3in Tall, 400pc (200/2). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/7 (56cs).",
        "features": [
            "Commercial case pack: 400pc (200/2)",
            "Pallet TI/HI: 8/7 (56cs)",
            "Material: Crystal Clear Polystyrene (PS) · 400pc",
            "Restaurant wholesale direct pricing: $19.03/case"
        ],
        "material": "Crystal Clear Polystyrene (PS) · 400pc",
        "palletTiHi": "8/7 (56cs)",
        "price": 19.03,
        "mrpPrice": 25.69,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (400 pcs)",
                "sku": "PSHCL61",
                "price": 19.03,
                "caseCount": 400,
                "unitPrice": 0.048,
                "palletTiHi": "8/7 (56cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "pshcl61x2",
            "pshcl81",
            "pshcl91"
        ],
        "familyCategory": "hinged-containers",
        "productType": "Clear PS",
        "sizeBadge": "6\" x 6\"",
        "packaging": "400pc (200/2)",
        "color": "Clear",
        "priceLabel": "$19.03",
        "discontinuing": false
    },
    {
        "id": "pshcl81x2",
        "sku": "PSHCL81X2",
        "name": "Clear Hinged PS Container, 8\" x 8\" 2in Tall, 200pc (200/1)",
        "category": "clear-polystyrene-containers",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 280,
        "rating": 4.8,
        "reviewsCount": 108,
        "featured": false,
        "bestSeller": true,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock"
        ],
        "description": "Commercial food service packaging SKU PSHCL81X2: Clear Hinged PS Container, 8\" x 8\" 2in Tall, 200pc (200/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/7 (42cs).",
        "features": [
            "Commercial case pack: 200pc (200/1)",
            "Pallet TI/HI: 6/7 (42cs)",
            "Material: Crystal Clear Polystyrene (PS) · 200pc",
            "Restaurant wholesale direct pricing: $23.34/case"
        ],
        "material": "Crystal Clear Polystyrene (PS) · 200pc",
        "palletTiHi": "6/7 (42cs)",
        "price": 23.34,
        "mrpPrice": 31.51,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (200 pcs)",
                "sku": "PSHCL81X2",
                "price": 23.34,
                "caseCount": 200,
                "unitPrice": 0.117,
                "palletTiHi": "6/7 (42cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "pshcl81",
            "pshcl83",
            "pshcl61x2"
        ],
        "familyCategory": "hinged-containers",
        "productType": "Clear PS",
        "sizeBadge": "8\" x 8\"",
        "packaging": "200pc (200/1)",
        "color": "Clear",
        "priceLabel": "$23.34",
        "discontinuing": false
    },
    {
        "id": "pshcl81",
        "sku": "PSHCL81",
        "name": "Clear Hinged PS Container, 8\" x 8\" 3in Tall, 200pc (200/1)",
        "category": "clear-polystyrene-containers",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 303,
        "rating": 4.9,
        "reviewsCount": 115,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock"
        ],
        "description": "Commercial food service packaging SKU PSHCL81: Clear Hinged PS Container, 8\" x 8\" 3in Tall, 200pc (200/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/10 (75cs).",
        "features": [
            "Commercial case pack: 200pc (200/1)",
            "Pallet TI/HI: 7/10 (75cs)",
            "Material: Crystal Clear Polystyrene (PS) · 200pc",
            "Restaurant wholesale direct pricing: $25.39/case"
        ],
        "material": "Crystal Clear Polystyrene (PS) · 200pc",
        "palletTiHi": "7/10 (75cs)",
        "price": 25.39,
        "mrpPrice": 34.28,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (200 pcs)",
                "sku": "PSHCL81",
                "price": 25.39,
                "caseCount": 200,
                "unitPrice": 0.127,
                "palletTiHi": "7/10 (75cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "pshcl81x2",
            "pshcl83",
            "pshcl91"
        ],
        "familyCategory": "hinged-containers",
        "productType": "Clear PS",
        "sizeBadge": "8\" x 8\"",
        "packaging": "200pc (200/1)",
        "color": "Clear",
        "priceLabel": "$25.39",
        "discontinuing": false
    },
    {
        "id": "pshcl83",
        "sku": "PSHCL83",
        "name": "Clear Hinged PS Container 3-compartment, 8\" x 8\" 3in Tall, 200pc (200/1)",
        "category": "clear-polystyrene-containers",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 326,
        "rating": 4.7,
        "reviewsCount": 122,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock"
        ],
        "description": "Commercial food service packaging SKU PSHCL83: Clear Hinged PS Container 3-compartment, 8\" x 8\" 3in Tall, 200pc (200/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/10 (75cs).",
        "features": [
            "Commercial case pack: 200pc (200/1)",
            "Pallet TI/HI: 7/10 (75cs)",
            "Material: Crystal Clear PS · 3-Comp · 200pc",
            "Restaurant wholesale direct pricing: $37.45/case"
        ],
        "material": "Crystal Clear PS · 3-Comp · 200pc",
        "palletTiHi": "7/10 (75cs)",
        "price": 37.45,
        "mrpPrice": 50.56,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (200 pcs)",
                "sku": "PSHCL83",
                "price": 37.45,
                "caseCount": 200,
                "unitPrice": 0.187,
                "palletTiHi": "7/10 (75cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "pshcl81",
            "pshcl93",
            "pshcl81x2"
        ],
        "familyCategory": "hinged-containers",
        "productType": "Clear PS",
        "sizeBadge": "8\" x 8\"",
        "packaging": "200pc (200/1)",
        "color": "Clear",
        "compartments": "3 Compartment",
        "priceLabel": "$37.45",
        "discontinuing": false
    },
    {
        "id": "pshcl91",
        "sku": "PSHCL91",
        "name": "Clear Hinged PS Container, 9\" x 9\" 3in Tall, 200pc (200/1)",
        "category": "clear-polystyrene-containers",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 349,
        "rating": 4.8,
        "reviewsCount": 129,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock"
        ],
        "description": "Commercial food service packaging SKU PSHCL91: Clear Hinged PS Container, 9\" x 9\" 3in Tall, 200pc (200/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/10 (75cs).",
        "features": [
            "Commercial case pack: 200pc (200/1)",
            "Pallet TI/HI: 7/10 (75cs)",
            "Material: Crystal Clear Polystyrene (PS) · 200pc",
            "Restaurant wholesale direct pricing: $40.70/case"
        ],
        "material": "Crystal Clear Polystyrene (PS) · 200pc",
        "palletTiHi": "7/10 (75cs)",
        "price": 40.7,
        "mrpPrice": 54.95,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (200 pcs)",
                "sku": "PSHCL91",
                "price": 40.7,
                "caseCount": 200,
                "unitPrice": 0.204,
                "palletTiHi": "7/10 (75cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "pshcl93",
            "pshcl81",
            "pshcl61"
        ],
        "familyCategory": "hinged-containers",
        "productType": "Clear PS",
        "sizeBadge": "9\" x 9\"",
        "packaging": "200pc (200/1)",
        "color": "Clear",
        "priceLabel": "$40.70",
        "discontinuing": false
    },
    {
        "id": "pshcl93",
        "sku": "PSHCL93",
        "name": "Clear Hinged PS Container 3-compartment, 9\" x 9\" 3in Tall, 200pc (200/1)",
        "category": "clear-polystyrene-containers",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 372,
        "rating": 4.9,
        "reviewsCount": 136,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock"
        ],
        "description": "Commercial food service packaging SKU PSHCL93: Clear Hinged PS Container 3-compartment, 9\" x 9\" 3in Tall, 200pc (200/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/9 (54cs).",
        "features": [
            "Commercial case pack: 200pc (200/1)",
            "Pallet TI/HI: 6/9 (54cs)",
            "Material: Crystal Clear PS · 3-Comp · 200pc",
            "Restaurant wholesale direct pricing: $43.94/case"
        ],
        "material": "Crystal Clear PS · 3-Comp · 200pc",
        "palletTiHi": "6/9 (54cs)",
        "price": 43.94,
        "mrpPrice": 59.32,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (200 pcs)",
                "sku": "PSHCL93",
                "price": 43.94,
                "caseCount": 200,
                "unitPrice": 0.22,
                "palletTiHi": "6/9 (54cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "pshcl91",
            "pshcl83",
            "pshcl81"
        ],
        "familyCategory": "hinged-containers",
        "productType": "Clear PS",
        "sizeBadge": "9\" x 9\"",
        "packaging": "200pc (200/1)",
        "color": "Clear",
        "compartments": "3 Compartment",
        "priceLabel": "$43.94",
        "discontinuing": false
    },
    {
        "id": "pasw8w",
        "sku": "PASW8W",
        "name": "8oz Paper Cup, Single wall, 80mm, White, 1000pc (50/20)",
        "category": "paper-cups",
        "image": "/images/product-placeholder.png",
        "inStock": true,
        "stockCount": 395,
        "rating": 4.8,
        "reviewsCount": 28,
        "featured": false,
        "bestSeller": true,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "Paperboard",
            "Insulated"
        ],
        "description": "Commercial food service packaging SKU PASW8W: 8oz Paper Cup, Single wall, 80mm, White, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 9/5 (45cs).",
        "features": [
            "Commercial case pack: 1000pc (50/20)",
            "Pallet TI/HI: 9/5 (45cs)",
            "Material: Single Wall Paperboard · 80mm · 1000pc",
            "Restaurant wholesale direct pricing: $38.36/case"
        ],
        "material": "Single Wall Paperboard · 80mm · 1000pc",
        "palletTiHi": "9/5 (45cs)",
        "price": 38.36,
        "mrpPrice": 51.79,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (1000 pcs)",
                "sku": "PASW8W",
                "price": 38.36,
                "caseCount": 1000,
                "unitPrice": 0.038,
                "palletTiHi": "9/5 (45cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "flpa80b",
            "rlpa80b",
            "pacs",
            "pasw10w",
            "pasw12w"
        ],
        "familyCategory": "paper-cups",
        "productType": "Standard",
        "sizeBadge": "8 oz",
        "packaging": "1000pc (50/20)",
        "color": "White",
        "priceLabel": "$38.36",
        "discontinuing": false
    },
    {
        "id": "pasw10w",
        "sku": "PASW10W",
        "name": "10oz Paper Cup, Single Wall, 90mm, White, 1000pc (50/20)",
        "category": "paper-cups",
        "image": "/images/product-placeholder.png",
        "inStock": true,
        "stockCount": 418,
        "rating": 4.9,
        "reviewsCount": 35,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "Paperboard",
            "Insulated"
        ],
        "description": "Commercial food service packaging SKU PASW10W: 10oz Paper Cup, Single Wall, 90mm, White, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/5 (30cs).",
        "features": [
            "Commercial case pack: 1000pc (50/20)",
            "Pallet TI/HI: 6/5 (30cs)",
            "Material: Single Wall Paperboard · 90mm · 1000pc",
            "Restaurant wholesale direct pricing: $45.90/case"
        ],
        "material": "Single Wall Paperboard · 90mm · 1000pc",
        "palletTiHi": "6/5 (30cs)",
        "price": 45.9,
        "mrpPrice": 61.97,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (1000 pcs)",
                "sku": "PASW10W",
                "price": 45.9,
                "caseCount": 1000,
                "unitPrice": 0.046,
                "palletTiHi": "6/5 (30cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "flpa90b",
            "rlpa90b",
            "pacs",
            "pasw8w",
            "pasw12w",
            "pasw16w"
        ],
        "familyCategory": "paper-cups",
        "productType": "Standard",
        "sizeBadge": "10 oz",
        "packaging": "1000pc (50/20)",
        "color": "White",
        "priceLabel": "$45.90",
        "discontinuing": false
    },
    {
        "id": "pasw12w",
        "sku": "PASW12W",
        "name": "12oz Paper Cup, Single Wall, 90mm, White, 1000pc (50/20)",
        "category": "paper-cups",
        "image": "/images/product-placeholder.png",
        "inStock": true,
        "stockCount": 441,
        "rating": 4.7,
        "reviewsCount": 42,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "Paperboard",
            "Insulated"
        ],
        "description": "Commercial food service packaging SKU PASW12W: 12oz Paper Cup, Single Wall, 90mm, White, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/4 (24cs).",
        "features": [
            "Commercial case pack: 1000pc (50/20)",
            "Pallet TI/HI: 6/4 (24cs)",
            "Material: Single Wall Paperboard · 90mm · 1000pc",
            "Restaurant wholesale direct pricing: $49.99/case"
        ],
        "material": "Single Wall Paperboard · 90mm · 1000pc",
        "palletTiHi": "6/4 (24cs)",
        "price": 49.99,
        "mrpPrice": 67.49,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (1000 pcs)",
                "sku": "PASW12W",
                "price": 49.99,
                "caseCount": 1000,
                "unitPrice": 0.05,
                "palletTiHi": "6/4 (24cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "flpa90b",
            "rlpa90b",
            "pacs",
            "pasw10w",
            "pasw16w",
            "pasw20w"
        ],
        "familyCategory": "paper-cups",
        "productType": "Standard",
        "sizeBadge": "2 oz",
        "packaging": "1000pc (50/20)",
        "color": "White",
        "priceLabel": "$49.99",
        "discontinuing": false
    },
    {
        "id": "pasw16w",
        "sku": "PASW16W",
        "name": "16oz Paper Cup, Single Wall, 90mm, White, 1000pc (50/20)",
        "category": "paper-cups",
        "image": "/images/product-placeholder.png",
        "inStock": true,
        "stockCount": 464,
        "rating": 4.8,
        "reviewsCount": 49,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "Paperboard",
            "Insulated"
        ],
        "description": "Commercial food service packaging SKU PASW16W: 16oz Paper Cup, Single Wall, 90mm, White, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/4 (24cs).",
        "features": [
            "Commercial case pack: 1000pc (50/20)",
            "Pallet TI/HI: 6/4 (24cs)",
            "Material: Single Wall Paperboard · 90mm · 1000pc",
            "Restaurant wholesale direct pricing: $58.14/case"
        ],
        "material": "Single Wall Paperboard · 90mm · 1000pc",
        "palletTiHi": "6/4 (24cs)",
        "price": 58.14,
        "mrpPrice": 78.49,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (1000 pcs)",
                "sku": "PASW16W",
                "price": 58.14,
                "caseCount": 1000,
                "unitPrice": 0.058,
                "palletTiHi": "6/4 (24cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "flpa90b",
            "rlpa90b",
            "pacs",
            "pasw12w",
            "pasw20w",
            "pasw24w"
        ],
        "familyCategory": "paper-cups",
        "productType": "Standard",
        "sizeBadge": "16 oz",
        "packaging": "1000pc (50/20)",
        "color": "White",
        "priceLabel": "$58.14",
        "discontinuing": false
    },
    {
        "id": "pasw20w",
        "sku": "PASW20W",
        "name": "20oz Paper Cup, Single Wall, 90mm, White, 1000pc (50/20)",
        "category": "paper-cups",
        "image": "/images/product-placeholder.png",
        "inStock": true,
        "stockCount": 487,
        "rating": 4.9,
        "reviewsCount": 56,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "Paperboard",
            "Insulated"
        ],
        "description": "Commercial food service packaging SKU PASW20W: 20oz Paper Cup, Single Wall, 90mm, White, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/3 (18cs).",
        "features": [
            "Commercial case pack: 1000pc (50/20)",
            "Pallet TI/HI: 6/3 (18cs)",
            "Material: Single Wall Paperboard · 90mm · 1000pc",
            "Restaurant wholesale direct pricing: $72.15/case"
        ],
        "material": "Single Wall Paperboard · 90mm · 1000pc",
        "palletTiHi": "6/3 (18cs)",
        "price": 72.15,
        "mrpPrice": 97.4,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (1000 pcs)",
                "sku": "PASW20W",
                "price": 72.15,
                "caseCount": 1000,
                "unitPrice": 0.072,
                "palletTiHi": "6/3 (18cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "flpa90b",
            "rlpa90b",
            "pacs",
            "pasw16w",
            "pasw24w"
        ],
        "familyCategory": "paper-cups",
        "productType": "Standard",
        "sizeBadge": "20 oz",
        "packaging": "1000pc (50/20)",
        "color": "White",
        "priceLabel": "$72.15",
        "discontinuing": false
    },
    {
        "id": "pasw24w",
        "sku": "PASW24W",
        "name": "24oz Paper Cup, Single Wall, 90mm, White, 500pc (25/20)",
        "category": "paper-cups",
        "image": "/images/product-placeholder.png",
        "inStock": true,
        "stockCount": 510,
        "rating": 4.8,
        "reviewsCount": 63,
        "featured": false,
        "bestSeller": true,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "Paperboard",
            "Insulated"
        ],
        "description": "Commercial food service packaging SKU PASW24W: 24oz Paper Cup, Single Wall, 90mm, White, 500pc (25/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/5 (30cs).",
        "features": [
            "Commercial case pack: 500pc (25/20)",
            "Pallet TI/HI: 6/5 (30cs)",
            "Material: Single Wall Paperboard · 90mm · 500pc",
            "Restaurant wholesale direct pricing: $36.25/case"
        ],
        "material": "Single Wall Paperboard · 90mm · 500pc",
        "palletTiHi": "6/5 (30cs)",
        "price": 36.25,
        "mrpPrice": 48.94,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (500 pcs)",
                "sku": "PASW24W",
                "price": 36.25,
                "caseCount": 500,
                "unitPrice": 0.072,
                "palletTiHi": "6/5 (30cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "flpa90b",
            "rlpa90b",
            "pacs",
            "pasw16w",
            "pasw20w"
        ],
        "familyCategory": "paper-cups",
        "productType": "Standard",
        "sizeBadge": "4 oz",
        "packaging": "500pc (25/20)",
        "color": "White",
        "priceLabel": "$36.25",
        "discontinuing": false
    },
    {
        "id": "flpa80b",
        "sku": "FLPA80B",
        "name": "Flat Lid for 8oz Paper Cup, 80mm, PP, Black, 1000pc (100/10)",
        "category": "paper-cup-lids-sleeves",
        "image": "/images/product-placeholder.png",
        "inStock": true,
        "stockCount": 533,
        "rating": 4.9,
        "reviewsCount": 70,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU FLPA80B: Flat Lid for 8oz Paper Cup, 80mm, PP, Black, 1000pc (100/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 14/5 (70cs).",
        "features": [
            "Commercial case pack: 1000pc (100/10)",
            "Pallet TI/HI: 14/5 (70cs)",
            "Material: Polypropylene (PP) · 80mm · Black",
            "Restaurant wholesale direct pricing: $26.78/case"
        ],
        "material": "Polypropylene (PP) · 80mm · Black",
        "palletTiHi": "14/5 (70cs)",
        "price": 26.78,
        "mrpPrice": 36.15,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (1000 pcs)",
                "sku": "FLPA80B",
                "price": 26.78,
                "caseCount": 1000,
                "unitPrice": 0.027,
                "palletTiHi": "14/5 (70cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "pasw8w",
            "rlpa80b",
            "pacs"
        ],
        "familyCategory": "paper-cup-lids-sleeves",
        "productType": "Standard",
        "sizeBadge": "8 oz",
        "packaging": "1000pc (100/10)",
        "color": "Black",
        "priceLabel": "$26.78",
        "discontinuing": false
    },
    {
        "id": "flpa90b",
        "sku": "FLPA90B",
        "name": "Flat Lid for 10-24oz Paper Cup, 90mm, PP, Black, 1000pc (50/20)",
        "category": "paper-cup-lids-sleeves",
        "image": "/images/product-placeholder.png",
        "inStock": true,
        "stockCount": 156,
        "rating": 4.7,
        "reviewsCount": 77,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU FLPA90B: Flat Lid for 10-24oz Paper Cup, 90mm, PP, Black, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 12/4 (48cs).",
        "features": [
            "Commercial case pack: 1000pc (50/20)",
            "Pallet TI/HI: 12/4 (48cs)",
            "Material: Polypropylene (PP) · 90mm · Black",
            "Restaurant wholesale direct pricing: $31.71/case"
        ],
        "material": "Polypropylene (PP) · 90mm · Black",
        "palletTiHi": "12/4 (48cs)",
        "price": 31.71,
        "mrpPrice": 42.81,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (1000 pcs)",
                "sku": "FLPA90B",
                "price": 31.71,
                "caseCount": 1000,
                "unitPrice": 0.032,
                "palletTiHi": "12/4 (48cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "pasw10w",
            "pasw12w",
            "pasw16w",
            "pasw20w",
            "pasw24w",
            "rlpa90b",
            "pacs"
        ],
        "familyCategory": "paper-cup-lids-sleeves",
        "productType": "Standard",
        "sizeBadge": "4 oz",
        "packaging": "1000pc (50/20)",
        "color": "Black",
        "priceLabel": "$31.71",
        "discontinuing": false
    },
    {
        "id": "rlpa80b",
        "sku": "RLPA80B",
        "name": "Reclosable Lid for 8oz Paper Cup, 80mm, PP, Black, 1000pc (50/20)",
        "category": "paper-cup-lids-sleeves",
        "image": "/images/product-placeholder.png",
        "inStock": true,
        "stockCount": 179,
        "rating": 4.8,
        "reviewsCount": 84,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU RLPA80B: Reclosable Lid for 8oz Paper Cup, 80mm, PP, Black, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 4/13 (52cs).",
        "features": [
            "Commercial case pack: 1000pc (50/20)",
            "Pallet TI/HI: 4/13 (52cs)",
            "Material: Polypropylene (PP) · Reclosable · 80mm · Black",
            "Restaurant wholesale direct pricing: $26.87/case"
        ],
        "material": "Polypropylene (PP) · Reclosable · 80mm · Black",
        "palletTiHi": "4/13 (52cs)",
        "price": 26.87,
        "mrpPrice": 36.27,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (1000 pcs)",
                "sku": "RLPA80B",
                "price": 26.87,
                "caseCount": 1000,
                "unitPrice": 0.027,
                "palletTiHi": "4/13 (52cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "pasw8w",
            "flpa80b",
            "pacs"
        ],
        "familyCategory": "paper-cup-lids-sleeves",
        "productType": "Standard",
        "sizeBadge": "8 oz",
        "packaging": "1000pc (50/20)",
        "color": "Black",
        "priceLabel": "$26.87",
        "discontinuing": false
    },
    {
        "id": "rlpa90b",
        "sku": "RLPA90B",
        "name": "Reclosable Lid for 10-24oz Paper Cup, 90mm, PP, Black, 1000pc (50/20)",
        "category": "paper-cup-lids-sleeves",
        "image": "/images/product-placeholder.png",
        "inStock": true,
        "stockCount": 202,
        "rating": 4.9,
        "reviewsCount": 91,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "PP Plastic",
            "Microwave Safe"
        ],
        "description": "Commercial food service packaging SKU RLPA90B: Reclosable Lid for 10-24oz Paper Cup, 90mm, PP, Black, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 4/12 (48cs).",
        "features": [
            "Commercial case pack: 1000pc (50/20)",
            "Pallet TI/HI: 4/12 (48cs)",
            "Material: Polypropylene (PP) · Reclosable · 90mm · Black",
            "Restaurant wholesale direct pricing: $31.75/case"
        ],
        "material": "Polypropylene (PP) · Reclosable · 90mm · Black",
        "palletTiHi": "4/12 (48cs)",
        "price": 31.75,
        "mrpPrice": 42.86,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (1000 pcs)",
                "sku": "RLPA90B",
                "price": 31.75,
                "caseCount": 1000,
                "unitPrice": 0.032,
                "palletTiHi": "4/12 (48cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "pasw10w",
            "pasw12w",
            "pasw16w",
            "pasw20w",
            "pasw24w",
            "flpa90b",
            "pacs"
        ],
        "familyCategory": "paper-cup-lids-sleeves",
        "productType": "Standard",
        "sizeBadge": "4 oz",
        "packaging": "1000pc (50/20)",
        "color": "Black",
        "priceLabel": "$31.75",
        "discontinuing": false
    },
    {
        "id": "pacs",
        "sku": "PACS",
        "name": "Paper cup sleeve, 1000pc (50/20)",
        "category": "paper-cup-lids-sleeves",
        "image": "/images/product-placeholder.png",
        "inStock": true,
        "stockCount": 225,
        "rating": 4.8,
        "reviewsCount": 98,
        "featured": false,
        "bestSeller": true,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock"
        ],
        "description": "Commercial food service packaging SKU PACS: Paper cup sleeve, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/6 (60cs).",
        "features": [
            "Commercial case pack: 1000pc (50/20)",
            "Pallet TI/HI: 10/6 (60cs)",
            "Material: Insulated Kraft Corrugated · 1000pc",
            "Restaurant wholesale direct pricing: $41.97/case"
        ],
        "material": "Insulated Kraft Corrugated · 1000pc",
        "palletTiHi": "10/6 (60cs)",
        "price": 41.97,
        "mrpPrice": 56.66,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (1000 pcs)",
                "sku": "PACS",
                "price": 41.97,
                "caseCount": 1000,
                "unitPrice": 0.042,
                "palletTiHi": "10/6 (60cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "pasw8w",
            "pasw10w",
            "pasw12w",
            "pasw16w",
            "pasw20w",
            "pasw24w"
        ],
        "familyCategory": "paper-cup-lids-sleeves",
        "productType": "Standard",
        "sizeBadge": "Standard",
        "packaging": "1000pc (50/20)",
        "priceLabel": "$41.97",
        "discontinuing": false
    },
    {
        "id": "c12pet98",
        "sku": "C12PET98",
        "name": "12oz Clear PET Cup, 98mm, 1000pc (50/20)",
        "category": "pet-cups",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 248,
        "rating": 4.9,
        "reviewsCount": 105,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "Crystal Clear PET",
            "Cold Ready"
        ],
        "description": "Commercial food service packaging SKU C12PET98: 12oz Clear PET Cup, 98mm, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/5 (30cs).",
        "features": [
            "Commercial case pack: 1000pc (50/20)",
            "Pallet TI/HI: 6/5 (30cs)",
            "Material: Ultra-Clear PET · 98mm · 1000pc",
            "Restaurant wholesale direct pricing: $51.73/case"
        ],
        "material": "Ultra-Clear PET · 98mm · 1000pc",
        "palletTiHi": "6/5 (30cs)",
        "price": 51.73,
        "mrpPrice": 69.84,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (1000 pcs)",
                "sku": "C12PET98",
                "price": 51.73,
                "caseCount": 1000,
                "unitPrice": 0.052,
                "palletTiHi": "6/5 (30cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "flpet98",
            "dlpet98",
            "c16pet98",
            "c20pet98",
            "c24pet98"
        ],
        "familyCategory": "pet-cups",
        "productType": "Standard",
        "sizeBadge": "2 oz",
        "packaging": "1000pc (50/20)",
        "color": "Clear",
        "priceLabel": "$51.73",
        "discontinuing": false
    },
    {
        "id": "c16pet98",
        "sku": "C16PET98",
        "name": "16oz Clear PET Cup, 98mm, 1000pc (50/20)",
        "category": "pet-cups",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 271,
        "rating": 4.7,
        "reviewsCount": 112,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "Crystal Clear PET",
            "Cold Ready"
        ],
        "description": "Commercial food service packaging SKU C16PET98: 16oz Clear PET Cup, 98mm, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/4 (24cs).",
        "features": [
            "Commercial case pack: 1000pc (50/20)",
            "Pallet TI/HI: 6/4 (24cs)",
            "Material: Ultra-Clear PET · 98mm · 1000pc",
            "Restaurant wholesale direct pricing: $54.32/case"
        ],
        "material": "Ultra-Clear PET · 98mm · 1000pc",
        "palletTiHi": "6/4 (24cs)",
        "price": 54.32,
        "mrpPrice": 73.33,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (1000 pcs)",
                "sku": "C16PET98",
                "price": 54.32,
                "caseCount": 1000,
                "unitPrice": 0.054,
                "palletTiHi": "6/4 (24cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "flpet98",
            "dlpet98",
            "c12pet98",
            "c20pet98",
            "c24pet98"
        ],
        "familyCategory": "pet-cups",
        "productType": "Standard",
        "sizeBadge": "16 oz",
        "packaging": "1000pc (50/20)",
        "color": "Clear",
        "priceLabel": "$54.32",
        "discontinuing": false
    },
    {
        "id": "c20pet98",
        "sku": "C20PET98",
        "name": "20oz Clear PET Cup, 98mm, 1000pc (50/20)",
        "category": "pet-cups",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 294,
        "rating": 4.8,
        "reviewsCount": 119,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "Crystal Clear PET",
            "Cold Ready"
        ],
        "description": "Commercial food service packaging SKU C20PET98: 20oz Clear PET Cup, 98mm, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/4 (24cs).",
        "features": [
            "Commercial case pack: 1000pc (50/20)",
            "Pallet TI/HI: 6/4 (24cs)",
            "Material: Ultra-Clear PET · 98mm · 1000pc",
            "Restaurant wholesale direct pricing: $67.29/case"
        ],
        "material": "Ultra-Clear PET · 98mm · 1000pc",
        "palletTiHi": "6/4 (24cs)",
        "price": 67.29,
        "mrpPrice": 90.84,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (1000 pcs)",
                "sku": "C20PET98",
                "price": 67.29,
                "caseCount": 1000,
                "unitPrice": 0.067,
                "palletTiHi": "6/4 (24cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "flpet98",
            "dlpet98",
            "c16pet98",
            "c24pet98",
            "c12pet98"
        ],
        "familyCategory": "pet-cups",
        "productType": "Standard",
        "sizeBadge": "20 oz",
        "packaging": "1000pc (50/20)",
        "color": "Clear",
        "priceLabel": "$67.29",
        "discontinuing": false
    },
    {
        "id": "c24pet98",
        "sku": "C24PET98",
        "name": "24oz Clear PET Cup, 98mm, 1000pc (50/20)",
        "category": "pet-cups",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 317,
        "rating": 4.9,
        "reviewsCount": 126,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "Crystal Clear PET",
            "Cold Ready"
        ],
        "description": "Commercial food service packaging SKU C24PET98: 24oz Clear PET Cup, 98mm, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/4 (24cs).",
        "features": [
            "Commercial case pack: 1000pc (50/20)",
            "Pallet TI/HI: 6/4 (24cs)",
            "Material: Ultra-Clear PET · 98mm · 1000pc",
            "Restaurant wholesale direct pricing: $71.18/case"
        ],
        "material": "Ultra-Clear PET · 98mm · 1000pc",
        "palletTiHi": "6/4 (24cs)",
        "price": 71.18,
        "mrpPrice": 96.09,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (1000 pcs)",
                "sku": "C24PET98",
                "price": 71.18,
                "caseCount": 1000,
                "unitPrice": 0.071,
                "palletTiHi": "6/4 (24cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "flpet98",
            "dlpet98",
            "c24pet98m",
            "c20pet98",
            "c16pet98"
        ],
        "familyCategory": "pet-cups",
        "productType": "Standard",
        "sizeBadge": "4 oz",
        "packaging": "1000pc (50/20)",
        "color": "Clear",
        "priceLabel": "$71.18",
        "discontinuing": false
    },
    {
        "id": "c24pet98m",
        "sku": "C24PET98M",
        "name": "24oz Clear PET Cup, 98mm, 600pc (50/12)",
        "category": "pet-cups",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 340,
        "rating": 4.8,
        "reviewsCount": 133,
        "featured": false,
        "bestSeller": true,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "Crystal Clear PET",
            "Cold Ready"
        ],
        "description": "Commercial food service packaging SKU C24PET98M: 24oz Clear PET Cup, 98mm, 600pc (50/12). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/5 (50cs).",
        "features": [
            "Commercial case pack: 600pc (50/12)",
            "Pallet TI/HI: 10/5 (50cs)",
            "Material: Ultra-Clear PET · 98mm · 600pc",
            "Restaurant wholesale direct pricing: $58.99/case"
        ],
        "material": "Ultra-Clear PET · 98mm · 600pc",
        "palletTiHi": "10/5 (50cs)",
        "price": 58.99,
        "mrpPrice": 79.64,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (600 pcs)",
                "sku": "C24PET98M",
                "price": 58.99,
                "caseCount": 600,
                "unitPrice": 0.098,
                "palletTiHi": "10/5 (50cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "flpet98",
            "dlpet98",
            "c24pet98",
            "c20pet98"
        ],
        "familyCategory": "pet-cups",
        "productType": "Standard",
        "sizeBadge": "4 oz",
        "packaging": "600pc (50/12)",
        "color": "Clear",
        "priceLabel": "$58.99",
        "discontinuing": false
    },
    {
        "id": "flpet98",
        "sku": "FLPET98",
        "name": "Flat Lids for 12-24oz PET Cups, 98mm, 1000pc (100/10)",
        "category": "pet-cups",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 363,
        "rating": 4.9,
        "reviewsCount": 140,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "Crystal Clear PET",
            "Cold Ready"
        ],
        "description": "Commercial food service packaging SKU FLPET98: Flat Lids for 12-24oz PET Cups, 98mm, 1000pc (100/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 15/4 (60cs).",
        "features": [
            "Commercial case pack: 1000pc (100/10)",
            "Pallet TI/HI: 15/4 (60cs)",
            "Material: Ultra-Clear PET · Straw Slot · 98mm",
            "Restaurant wholesale direct pricing: $20.61/case"
        ],
        "material": "Ultra-Clear PET · Straw Slot · 98mm",
        "palletTiHi": "15/4 (60cs)",
        "price": 20.61,
        "mrpPrice": 27.82,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (1000 pcs)",
                "sku": "FLPET98",
                "price": 20.61,
                "caseCount": 1000,
                "unitPrice": 0.021,
                "palletTiHi": "15/4 (60cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "c12pet98",
            "c16pet98",
            "c20pet98",
            "c24pet98",
            "dlpet98"
        ],
        "familyCategory": "pet-cups",
        "productType": "Standard",
        "sizeBadge": "4 oz",
        "packaging": "1000pc (100/10)",
        "priceLabel": "$20.61",
        "discontinuing": false
    },
    {
        "id": "dlpet98",
        "sku": "DLPET98",
        "name": "Dome Lids for 12-24oz PET Cups, 98mm, 1000pc (100/10)",
        "category": "pet-cups",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 386,
        "rating": 4.7,
        "reviewsCount": 32,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "Crystal Clear PET",
            "Cold Ready"
        ],
        "description": "Commercial food service packaging SKU DLPET98: Dome Lids for 12-24oz PET Cups, 98mm, 1000pc (100/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 11/4 (44cs).",
        "features": [
            "Commercial case pack: 1000pc (100/10)",
            "Pallet TI/HI: 11/4 (44cs)",
            "Material: Ultra-Clear PET · Elevated Dome · 98mm",
            "Restaurant wholesale direct pricing: $28.38/case"
        ],
        "material": "Ultra-Clear PET · Elevated Dome · 98mm",
        "palletTiHi": "11/4 (44cs)",
        "price": 28.38,
        "mrpPrice": 38.31,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (1000 pcs)",
                "sku": "DLPET98",
                "price": 28.38,
                "caseCount": 1000,
                "unitPrice": 0.028,
                "palletTiHi": "11/4 (44cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "c12pet98",
            "c16pet98",
            "c20pet98",
            "c24pet98",
            "flpet98"
        ],
        "familyCategory": "pet-cups",
        "productType": "Standard",
        "sizeBadge": "4 oz",
        "packaging": "1000pc (100/10)",
        "priceLabel": "$28.38",
        "discontinuing": false
    },
    {
        "id": "c32pet107",
        "sku": "C32PET107",
        "name": "32oz Clear PET Cup, 107mm, 500pc (50/10)",
        "category": "pet-cups",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 409,
        "rating": 4.8,
        "reviewsCount": 39,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "Crystal Clear PET",
            "Cold Ready"
        ],
        "description": "Commercial food service packaging SKU C32PET107: 32oz Clear PET Cup, 107mm, 500pc (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 9/4 (36cs).",
        "features": [
            "Commercial case pack: 500pc (50/10)",
            "Pallet TI/HI: 9/4 (36cs)",
            "Material: Ultra-Clear PET · 107mm · 500pc",
            "Restaurant wholesale direct pricing: $49.13/case"
        ],
        "material": "Ultra-Clear PET · 107mm · 500pc",
        "palletTiHi": "9/4 (36cs)",
        "price": 49.13,
        "mrpPrice": 66.33,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (500 pcs)",
                "sku": "C32PET107",
                "price": 49.13,
                "caseCount": 500,
                "unitPrice": 0.098,
                "palletTiHi": "9/4 (36cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "flpet107",
            "dlpet107",
            "c24pet98"
        ],
        "familyCategory": "pet-cups",
        "productType": "Standard",
        "sizeBadge": "2 oz",
        "packaging": "500pc (50/10)",
        "color": "Clear",
        "priceLabel": "$49.13",
        "discontinuing": false
    },
    {
        "id": "flpet107",
        "sku": "FLPET107",
        "name": "Flat Lid for 32oz PET Cup, 107mm, 500pc (50/10)",
        "category": "pet-cups",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 432,
        "rating": 4.9,
        "reviewsCount": 46,
        "featured": false,
        "bestSeller": false,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "Crystal Clear PET",
            "Cold Ready"
        ],
        "description": "Commercial food service packaging SKU FLPET107: Flat Lid for 32oz PET Cup, 107mm, 500pc (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 9/10 (90cs).",
        "features": [
            "Commercial case pack: 500pc (50/10)",
            "Pallet TI/HI: 9/10 (90cs)",
            "Material: Ultra-Clear PET · 107mm Flat",
            "Restaurant wholesale direct pricing: $16.71/case"
        ],
        "material": "Ultra-Clear PET · 107mm Flat",
        "palletTiHi": "9/10 (90cs)",
        "price": 16.71,
        "mrpPrice": 22.56,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (500 pcs)",
                "sku": "FLPET107",
                "price": 16.71,
                "caseCount": 500,
                "unitPrice": 0.033,
                "palletTiHi": "9/10 (90cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "c32pet107",
            "dlpet107"
        ],
        "familyCategory": "pet-cups",
        "productType": "Standard",
        "sizeBadge": "2 oz",
        "packaging": "500pc (50/10)",
        "priceLabel": "$16.71",
        "discontinuing": false
    },
    {
        "id": "dlpet107",
        "sku": "DLPET107",
        "name": "Dome Lid for 32oz PET Cup, 107mm, 500pc (50/10)",
        "category": "pet-cups",
        "image": "/images/clear_deli_cup.jpg",
        "inStock": true,
        "stockCount": 455,
        "rating": 4.8,
        "reviewsCount": 53,
        "featured": false,
        "bestSeller": true,
        "ecoFriendly": false,
        "tags": [
            "Wholesale",
            "Commercial Grade",
            "Bakersfield Stock",
            "Crystal Clear PET",
            "Cold Ready"
        ],
        "description": "Commercial food service packaging SKU DLPET107: Dome Lid for 32oz PET Cup, 107mm, 500pc (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/9 (72cs).",
        "features": [
            "Commercial case pack: 500pc (50/10)",
            "Pallet TI/HI: 8/9 (72cs)",
            "Material: Ultra-Clear PET · 107mm Dome",
            "Restaurant wholesale direct pricing: $19.31/case"
        ],
        "material": "Ultra-Clear PET · 107mm Dome",
        "palletTiHi": "8/9 (72cs)",
        "price": 19.31,
        "mrpPrice": 26.07,
        "specialPrice": null,
        "sizes": [
            {
                "name": "Case (500 pcs)",
                "sku": "DLPET107",
                "price": 19.31,
                "caseCount": 500,
                "unitPrice": 0.039,
                "palletTiHi": "8/9 (72cs)",
                "stockStatus": "in_stock"
            }
        ],
        "relatedProductIds": [
            "c32pet107",
            "flpet107"
        ],
        "familyCategory": "pet-cups",
        "productType": "Standard",
        "sizeBadge": "2 oz",
        "packaging": "500pc (50/10)",
        "priceLabel": "$19.31",
        "discontinuing": false
    },
    {
        "id": "tcbl61",
        "sku": "TCBL61",
        "name": "Hinged Black PP Container - 6x6, 200pc (100/2)",
        "category": "hinged-containers",
        "familyCategory": "hinged-containers",
        "productType": "Discontinuing Black PP",
        "sizeBadge": "6\" x 6\"",
        "packaging": "200pc (100/2)",
        "color": "Black",
        "compartments": "1 Compartment",
        "image": "/images/black_hinged_box.jpg",
        "inStock": false,
        "stockCount": 15,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "hinged-containers",
            "Discontinuing Black PP",
            "Black"
        ],
        "description": "Hinged Black PP Container - 6x6, 200pc (100/2). Status: Discontinuing stock from commercial catalog.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 200pc (100/2)",
            "Pallet TI/HI: 6/8 (48cs)"
        ],
        "material": "Polypropylene (PP)",
        "palletTiHi": "6/8 (48cs)",
        "price": 24.5,
        "priceLabel": "$24.50",
        "discontinuing": true,
        "sizes": [
            {
                "name": "6\" x 6\"",
                "sku": "TCBL61",
                "price": 24.5,
                "caseCount": 200,
                "unitPrice": 0.1225,
                "palletTiHi": "6/8 (48cs)",
                "stockStatus": "Discontinuing Stock"
            }
        ]
    },
    {
        "id": "tcbl81",
        "sku": "TCBL81",
        "name": "Hinged Black PP Container - 8x8, 120pc (120/1)",
        "category": "hinged-containers",
        "familyCategory": "hinged-containers",
        "productType": "Discontinuing Black PP",
        "sizeBadge": "8\" x 8\"",
        "packaging": "120pc (120/1)",
        "color": "Black",
        "compartments": "1 Compartment",
        "image": "/images/black_hinged_box.jpg",
        "inStock": false,
        "stockCount": 15,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "hinged-containers",
            "Discontinuing Black PP",
            "Black"
        ],
        "description": "Hinged Black PP Container - 8x8, 120pc (120/1). Status: Discontinuing stock from commercial catalog.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 120pc (120/1)",
            "Pallet TI/HI: 6/8 (48cs)"
        ],
        "material": "Polypropylene (PP)",
        "palletTiHi": "6/8 (48cs)",
        "price": 25.8,
        "priceLabel": "$25.80",
        "discontinuing": true,
        "sizes": [
            {
                "name": "8\" x 8\"",
                "sku": "TCBL81",
                "price": 25.8,
                "caseCount": 120,
                "unitPrice": 0.215,
                "palletTiHi": "6/8 (48cs)",
                "stockStatus": "Discontinuing Stock"
            }
        ]
    },
    {
        "id": "tcbl96",
        "sku": "TCBL96",
        "name": "Hinged Black PP Hoagie Container - 9x6, 150pc (75/2)",
        "category": "hinged-containers",
        "familyCategory": "hinged-containers",
        "productType": "Discontinuing Black PP",
        "sizeBadge": "9\" x 6\"",
        "packaging": "150pc (75/2)",
        "color": "Black",
        "compartments": "1 Compartment",
        "image": "/images/black_hinged_box.jpg",
        "inStock": false,
        "stockCount": 15,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "hinged-containers",
            "Discontinuing Black PP",
            "Black"
        ],
        "description": "Hinged Black PP Hoagie Container - 9x6, 150pc (75/2). Status: Discontinuing stock from commercial catalog.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 150pc (75/2)",
            "Pallet TI/HI: 6/7 (42cs)"
        ],
        "material": "Polypropylene (PP)",
        "palletTiHi": "6/7 (42cs)",
        "price": 26.2,
        "priceLabel": "$26.20",
        "discontinuing": true,
        "sizes": [
            {
                "name": "9\" x 6\"",
                "sku": "TCBL96",
                "price": 26.2,
                "caseCount": 150,
                "unitPrice": 0.17466666666666666,
                "palletTiHi": "6/7 (42cs)",
                "stockStatus": "Discontinuing Stock"
            }
        ]
    },
    {
        "id": "bghw61",
        "sku": "BGHW61",
        "name": "Bagasse Hinged Container - White - PFAS FREE - 6x6, 500pc (125/4)",
        "category": "hinged-containers",
        "familyCategory": "hinged-containers",
        "productType": "Bagasse",
        "sizeBadge": "6\" x 6\"",
        "packaging": "500pc (125/4)",
        "color": "White",
        "compartments": "1 Compartment",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "hinged-containers",
            "Bagasse",
            "White"
        ],
        "description": "Compostable Bagasse Hinged Container - White - PFAS FREE - 6x6, 500pc (125/4). Certified commercial eco-packaging.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 500pc (125/4)",
            "Pallet TI/HI: 6/6 (36cs)"
        ],
        "material": "100% Sugarcane Bagasse (PFAS FREE)",
        "palletTiHi": "6/6 (36cs)",
        "price": 36.5,
        "priceLabel": "$36.50",
        "discontinuing": false,
        "sizes": [
            {
                "name": "6\" x 6\"",
                "sku": "BGHW61",
                "price": 36.5,
                "caseCount": 500,
                "unitPrice": 0.073,
                "palletTiHi": "6/6 (36cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "bghw96",
        "sku": "BGHW96",
        "name": "Bagasse Hinged Container - White - PFAS FREE - 9x6, 250pc (125/2)",
        "category": "hinged-containers",
        "familyCategory": "hinged-containers",
        "productType": "Bagasse",
        "sizeBadge": "9\" x 6\"",
        "packaging": "250pc (125/2)",
        "color": "White",
        "compartments": "1 Compartment",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "hinged-containers",
            "Bagasse",
            "White"
        ],
        "description": "Compostable Bagasse Hinged Container - White - PFAS FREE - 9x6, 250pc (125/2). Ideal for hoagies and combo entrees.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 250pc (125/2)",
            "Pallet TI/HI: 6/7 (42cs)"
        ],
        "material": "100% Sugarcane Bagasse (PFAS FREE)",
        "palletTiHi": "6/7 (42cs)",
        "price": 32.8,
        "priceLabel": "$32.80",
        "discontinuing": false,
        "sizes": [
            {
                "name": "9\" x 6\"",
                "sku": "BGHW96",
                "price": 32.8,
                "caseCount": 250,
                "unitPrice": 0.13119999999999998,
                "palletTiHi": "6/7 (42cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "bghw81",
        "sku": "BGHW81",
        "name": "Bagasse Hinged Container - White - PFAS FREE - 8x8, 200pc (100/2)",
        "category": "hinged-containers",
        "familyCategory": "hinged-containers",
        "productType": "Bagasse",
        "sizeBadge": "8\" x 8\"",
        "packaging": "200pc (100/2)",
        "color": "White",
        "compartments": "1 Compartment",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "hinged-containers",
            "Bagasse",
            "White"
        ],
        "description": "Compostable Bagasse Hinged Container - White - PFAS FREE - 8x8 1-Compartment, 200pc (100/2). Certified food-contact safe.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 200pc (100/2)",
            "Pallet TI/HI: 6/8 (48cs)"
        ],
        "material": "100% Sugarcane Bagasse (PFAS FREE)",
        "palletTiHi": "6/8 (48cs)",
        "price": 34.2,
        "priceLabel": "$34.20",
        "discontinuing": false,
        "sizes": [
            {
                "name": "8\" x 8\"",
                "sku": "BGHW81",
                "price": 34.2,
                "caseCount": 200,
                "unitPrice": 0.171,
                "palletTiHi": "6/8 (48cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "bghw83",
        "sku": "BGHW83",
        "name": "Bagasse Hinged Container - 3 Compartment - White - PFAS FREE - 8x8, 200pc (100/2)",
        "category": "hinged-containers",
        "familyCategory": "hinged-containers",
        "productType": "Bagasse",
        "sizeBadge": "8\" x 8\"",
        "packaging": "200pc (100/2)",
        "color": "White",
        "compartments": "3 Compartment",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "hinged-containers",
            "Bagasse",
            "White"
        ],
        "description": "Compostable Bagasse Hinged Container - 3 Compartment - White - PFAS FREE - 8x8, 200pc (100/2). Keeps sides and entrees separated.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 200pc (100/2)",
            "Pallet TI/HI: 6/8 (48cs)"
        ],
        "material": "100% Sugarcane Bagasse (PFAS FREE)",
        "palletTiHi": "6/8 (48cs)",
        "price": 35.5,
        "priceLabel": "$35.50",
        "discontinuing": false,
        "sizes": [
            {
                "name": "8\" x 8\"",
                "sku": "BGHW83",
                "price": 35.5,
                "caseCount": 200,
                "unitPrice": 0.1775,
                "palletTiHi": "6/8 (48cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "bghw91",
        "sku": "BGHW91",
        "name": "Bagasse Hinged Container - White - PFAS FREE - 9x9, 200pc (100/2)",
        "category": "hinged-containers",
        "familyCategory": "hinged-containers",
        "productType": "Bagasse",
        "sizeBadge": "9\" x 9\"",
        "packaging": "200pc (100/2)",
        "color": "White",
        "compartments": "1 Compartment",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "hinged-containers",
            "Bagasse",
            "White"
        ],
        "description": "Compostable Bagasse Hinged Container - White - PFAS FREE - 9x9 1-Compartment, 200pc (100/2). Heavy-duty restaurant grade.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 200pc (100/2)",
            "Pallet TI/HI: 6/8 (48cs)"
        ],
        "material": "100% Sugarcane Bagasse (PFAS FREE)",
        "palletTiHi": "6/8 (48cs)",
        "price": 38.9,
        "priceLabel": "$38.90",
        "discontinuing": false,
        "sizes": [
            {
                "name": "9\" x 9\"",
                "sku": "BGHW91",
                "price": 38.9,
                "caseCount": 200,
                "unitPrice": 0.1945,
                "palletTiHi": "6/8 (48cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "bghw93",
        "sku": "BGHW93",
        "name": "Bagasse Hinged Container - 3 Compartment - White - PFAS FREE - 9x9, 200pc (100/2)",
        "category": "hinged-containers",
        "familyCategory": "hinged-containers",
        "productType": "Bagasse",
        "sizeBadge": "9\" x 9\"",
        "packaging": "200pc (100/2)",
        "color": "White",
        "compartments": "3 Compartment",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "hinged-containers",
            "Bagasse",
            "White"
        ],
        "description": "Compostable Bagasse Hinged Container - 3 Compartment - White - PFAS FREE - 9x9, 200pc (100/2). Large portion entree packaging.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 200pc (100/2)",
            "Pallet TI/HI: 6/8 (48cs)"
        ],
        "material": "100% Sugarcane Bagasse (PFAS FREE)",
        "palletTiHi": "6/8 (48cs)",
        "price": 39.8,
        "priceLabel": "$39.80",
        "discontinuing": false,
        "sizes": [
            {
                "name": "9\" x 9\"",
                "sku": "BGHW93",
                "price": 39.8,
                "caseCount": 200,
                "unitPrice": 0.19899999999999998,
                "palletTiHi": "6/8 (48cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "wh61",
        "sku": "WH61",
        "name": "Clamshell MFPP Container - Corner Lock - 6x6, 250pc (250/1)",
        "category": "hinged-containers",
        "familyCategory": "hinged-containers",
        "productType": "Corner Lock",
        "sizeBadge": "6\" x 6\"",
        "packaging": "250pc (250/1)",
        "color": "White",
        "compartments": "1 Compartment",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "hinged-containers",
            "Corner Lock",
            "White"
        ],
        "description": "Clamshell MFPP Container - Corner Lock - 6x6, 250pc (250/1). Secure corner-lock tab closure for burger & sandwich delivery.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 250pc (250/1)",
            "Pallet TI/HI: 7/7 (49cs)"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP)",
        "palletTiHi": "7/7 (49cs)",
        "price": 24.55,
        "priceLabel": "$24.55",
        "discontinuing": false,
        "sizes": [
            {
                "name": "6\" x 6\"",
                "sku": "WH61",
                "price": 24.55,
                "caseCount": 250,
                "unitPrice": 0.09820000000000001,
                "palletTiHi": "7/7 (49cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "wh96",
        "sku": "WH96",
        "name": "Clamshell MFPP Hoagie Container - Corner Lock - 9x6, 200pc (100/2)",
        "category": "hinged-containers",
        "familyCategory": "hinged-containers",
        "productType": "Corner Lock",
        "sizeBadge": "9\" x 6\"",
        "packaging": "200pc (100/2)",
        "color": "White",
        "compartments": "1 Compartment",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "hinged-containers",
            "Corner Lock",
            "White"
        ],
        "description": "Clamshell MFPP Hoagie Container - Corner Lock - 9x6, 200pc (100/2). Corner-locking tabs prevent transit spills.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 200pc (100/2)",
            "Pallet TI/HI: 6/7 (42cs)"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP)",
        "palletTiHi": "6/7 (42cs)",
        "price": 29.8,
        "priceLabel": "$29.80",
        "discontinuing": false,
        "sizes": [
            {
                "name": "9\" x 6\"",
                "sku": "WH96",
                "price": 29.8,
                "caseCount": 200,
                "unitPrice": 0.149,
                "palletTiHi": "6/7 (42cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "wh96t",
        "sku": "WH96T",
        "name": "Clamshell MFPP Hoagie Container - Corner Lock - 9x6 - Tall, 200pc (100/2)",
        "category": "hinged-containers",
        "familyCategory": "hinged-containers",
        "productType": "Corner Lock",
        "sizeBadge": "9\" x 6\"",
        "packaging": "200pc (100/2)",
        "color": "White",
        "compartments": "1 Compartment",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "hinged-containers",
            "Corner Lock",
            "White"
        ],
        "description": "Clamshell MFPP Hoagie Container - Corner Lock - 9x6 - Tall Depth, 200pc (100/2). Extra vertical clearance for stacked sandwiches.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 200pc (100/2)",
            "Pallet TI/HI: 6/6 (36cs)"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP)",
        "palletTiHi": "6/6 (36cs)",
        "price": 31.5,
        "priceLabel": "$31.50",
        "discontinuing": false,
        "sizes": [
            {
                "name": "9\" x 6\"",
                "sku": "WH96T",
                "price": 31.5,
                "caseCount": 200,
                "unitPrice": 0.1575,
                "palletTiHi": "6/6 (36cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "wh81",
        "sku": "WH81",
        "name": "Clamshell MFPP Container - Corner Lock - 8x8, 150pc (150/1)",
        "category": "hinged-containers",
        "familyCategory": "hinged-containers",
        "productType": "Corner Lock",
        "sizeBadge": "8\" x 8\"",
        "packaging": "150pc (150/1)",
        "color": "White",
        "compartments": "1 Compartment",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "hinged-containers",
            "Corner Lock",
            "White"
        ],
        "description": "Clamshell MFPP Container - Corner Lock - 8x8 1-Compartment, 150pc (150/1). Standard commercial dinner carryout box.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 150pc (150/1)",
            "Pallet TI/HI: 6/9 (54cs)"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP)",
        "palletTiHi": "6/9 (54cs)",
        "price": 24.55,
        "priceLabel": "$24.55",
        "discontinuing": false,
        "sizes": [
            {
                "name": "8\" x 8\"",
                "sku": "WH81",
                "price": 24.55,
                "caseCount": 150,
                "unitPrice": 0.16366666666666668,
                "palletTiHi": "6/9 (54cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "wh83",
        "sku": "WH83",
        "name": "Clamshell MFPP Container - 3 Compartment - Corner Lock - 8x8, 150pc (150/1)",
        "category": "hinged-containers",
        "familyCategory": "hinged-containers",
        "productType": "Corner Lock",
        "sizeBadge": "8\" x 8\"",
        "packaging": "150pc (150/1)",
        "color": "White",
        "compartments": "3 Compartment",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "hinged-containers",
            "Corner Lock",
            "White"
        ],
        "description": "Clamshell MFPP Container - 3 Compartment - Corner Lock - 8x8, 150pc (150/1). Ribbed sidewalls and secure locks.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 150pc (150/1)",
            "Pallet TI/HI: 6/9 (54cs)"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP)",
        "palletTiHi": "6/9 (54cs)",
        "price": 24.55,
        "priceLabel": "$24.55",
        "discontinuing": false,
        "sizes": [
            {
                "name": "8\" x 8\"",
                "sku": "WH83",
                "price": 24.55,
                "caseCount": 150,
                "unitPrice": 0.16366666666666668,
                "palletTiHi": "6/9 (54cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "wh91",
        "sku": "WH91",
        "name": "Clamshell MFPP Container - Corner Lock - 9x9, 150pc (150/1)",
        "category": "hinged-containers",
        "familyCategory": "hinged-containers",
        "productType": "Corner Lock",
        "sizeBadge": "9\" x 9\"",
        "packaging": "150pc (150/1)",
        "color": "White",
        "compartments": "1 Compartment",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "hinged-containers",
            "Corner Lock",
            "White"
        ],
        "description": "Clamshell MFPP Container - Corner Lock - 9x9 1-Compartment, 150pc (150/1). Maximum entree volume with corner closure.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 150pc (150/1)",
            "Pallet TI/HI: 6/7 (42cs)"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP)",
        "palletTiHi": "6/7 (42cs)",
        "price": 28.5,
        "priceLabel": "$28.50",
        "discontinuing": false,
        "sizes": [
            {
                "name": "9\" x 9\"",
                "sku": "WH91",
                "price": 28.5,
                "caseCount": 150,
                "unitPrice": 0.19,
                "palletTiHi": "6/7 (42cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "wh93",
        "sku": "WH93",
        "name": "Clamshell MFPP Container - 3 Compartment - Corner Lock - 9x9, 150pc (150/1)",
        "category": "hinged-containers",
        "familyCategory": "hinged-containers",
        "productType": "Corner Lock",
        "sizeBadge": "9\" x 9\"",
        "packaging": "150pc (150/1)",
        "color": "White",
        "compartments": "3 Compartment",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "hinged-containers",
            "Corner Lock",
            "White"
        ],
        "description": "Clamshell MFPP Container - 3 Compartment - Corner Lock - 9x9, 150pc (150/1). Three food cavities with positive locking.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 150pc (150/1)",
            "Pallet TI/HI: 6/7 (42cs)"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP)",
        "palletTiHi": "6/7 (42cs)",
        "price": 28.5,
        "priceLabel": "$28.50",
        "discontinuing": false,
        "sizes": [
            {
                "name": "9\" x 9\"",
                "sku": "WH93",
                "price": 28.5,
                "caseCount": 150,
                "unitPrice": 0.19,
                "palletTiHi": "6/7 (42cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "cs501",
        "sku": "CS501",
        "name": "Clamshell MFPP Container - Center Slide - 4.5x5, 250pc (125/2)",
        "category": "hinged-containers",
        "familyCategory": "hinged-containers",
        "productType": "Center Slide",
        "sizeBadge": "4.5\" x 5\"",
        "packaging": "250pc (125/2)",
        "color": "White",
        "compartments": "1 Compartment",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "hinged-containers",
            "Center Slide",
            "White"
        ],
        "description": "Clamshell MFPP Container - Center Slide - 4.5x5, 250pc (125/2). Patented center sliding tab lock for quick packing.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 250pc (125/2)",
            "Pallet TI/HI: 8/8 (64cs)"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP)",
        "palletTiHi": "8/8 (64cs)",
        "price": 22.5,
        "priceLabel": "$22.50",
        "discontinuing": false,
        "sizes": [
            {
                "name": "4.5\" x 5\"",
                "sku": "CS501",
                "price": 22.5,
                "caseCount": 250,
                "unitPrice": 0.09,
                "palletTiHi": "8/8 (64cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "cs601",
        "sku": "CS601",
        "name": "Clamshell MFPP Container - Center Slide - 5.25x5.25, 250pc (125/2)",
        "category": "hinged-containers",
        "familyCategory": "hinged-containers",
        "productType": "Center Slide",
        "sizeBadge": "5.25\" x 5.25\"",
        "packaging": "250pc (125/2)",
        "color": "White",
        "compartments": "1 Compartment",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "hinged-containers",
            "Center Slide",
            "White"
        ],
        "description": "Clamshell MFPP Container - Center Slide - 5.25x5.25, 250pc (125/2). Perfect size for sandwiches, desserts, and sides.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 250pc (125/2)",
            "Pallet TI/HI: 7/8 (56cs)"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP)",
        "palletTiHi": "7/8 (56cs)",
        "price": 23.8,
        "priceLabel": "$23.80",
        "discontinuing": false,
        "sizes": [
            {
                "name": "5.25\" x 5.25\"",
                "sku": "CS601",
                "price": 23.8,
                "caseCount": 250,
                "unitPrice": 0.0952,
                "palletTiHi": "7/8 (56cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "cs801",
        "sku": "CS801",
        "name": "Clamshell MFPP Container - Center Slide - 7.8x7.8, 150pc (150/1)",
        "category": "hinged-containers",
        "familyCategory": "hinged-containers",
        "productType": "Center Slide",
        "sizeBadge": "7.8\" x 7.8\"",
        "packaging": "150pc (150/1)",
        "color": "White",
        "compartments": "1 Compartment",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "hinged-containers",
            "Center Slide",
            "White"
        ],
        "description": "Clamshell MFPP Container - Center Slide - 7.8x7.8 1-Compartment, 150pc (150/1). Center slide tab system.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 150pc (150/1)",
            "Pallet TI/HI: 6/9 (54cs)"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP)",
        "palletTiHi": "6/9 (54cs)",
        "price": 24.55,
        "priceLabel": "$24.55",
        "discontinuing": false,
        "sizes": [
            {
                "name": "7.8\" x 7.8\"",
                "sku": "CS801",
                "price": 24.55,
                "caseCount": 150,
                "unitPrice": 0.16366666666666668,
                "palletTiHi": "6/9 (54cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "cs803",
        "sku": "CS803",
        "name": "Clamshell MFPP Container - 3 Compartment - Center Slide - 7.8x7.8, 150pc (150/1)",
        "category": "hinged-containers",
        "familyCategory": "hinged-containers",
        "productType": "Center Slide",
        "sizeBadge": "7.8\" x 7.8\"",
        "packaging": "150pc (150/1)",
        "color": "White",
        "compartments": "3 Compartment",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "hinged-containers",
            "Center Slide",
            "White"
        ],
        "description": "Clamshell MFPP Container - 3 Compartment - Center Slide - 7.8x7.8, 150pc (150/1). Reliable center slide lock.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 150pc (150/1)",
            "Pallet TI/HI: 6/9 (54cs)"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP)",
        "palletTiHi": "6/9 (54cs)",
        "price": 24.55,
        "priceLabel": "$24.55",
        "discontinuing": false,
        "sizes": [
            {
                "name": "7.8\" x 7.8\"",
                "sku": "CS803",
                "price": 24.55,
                "caseCount": 150,
                "unitPrice": 0.16366666666666668,
                "palletTiHi": "6/9 (54cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "cs2400",
        "sku": "CS2400",
        "name": "Clamshell MFPP Container - Center Slide - 8.25x7.55, 150pc (150/1)",
        "category": "hinged-containers",
        "familyCategory": "hinged-containers",
        "productType": "Center Slide",
        "sizeBadge": "8.25\" x 7.55\"",
        "packaging": "150pc (150/1)",
        "color": "White",
        "compartments": "1 Compartment",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "hinged-containers",
            "Center Slide",
            "White"
        ],
        "description": "Clamshell MFPP Container - Center Slide - 8.25x7.55, 150pc (150/1). Wide profile meal box.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 150pc (150/1)",
            "Pallet TI/HI: 6/8 (48cs)"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP)",
        "palletTiHi": "6/8 (48cs)",
        "price": 25.2,
        "priceLabel": "$25.20",
        "discontinuing": false,
        "sizes": [
            {
                "name": "8.25\" x 7.55\"",
                "sku": "CS2400",
                "price": 25.2,
                "caseCount": 150,
                "unitPrice": 0.16799999999999998,
                "palletTiHi": "6/8 (48cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "cs2430",
        "sku": "CS2430",
        "name": "Clamshell MFPP Container - 3 Compartment - Center Slide - 8.25x7.55, 150pc (150/1)",
        "category": "hinged-containers",
        "familyCategory": "hinged-containers",
        "productType": "Center Slide",
        "sizeBadge": "8.25\" x 7.55\"",
        "packaging": "150pc (150/1)",
        "color": "White",
        "compartments": "3 Compartment",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "hinged-containers",
            "Center Slide",
            "White"
        ],
        "description": "Clamshell MFPP Container - 3 Compartment - Center Slide - 8.25x7.55, 150pc (150/1). Center locking tabs.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 150pc (150/1)",
            "Pallet TI/HI: 6/8 (48cs)"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP)",
        "palletTiHi": "6/8 (48cs)",
        "price": 25.2,
        "priceLabel": "$25.20",
        "discontinuing": false,
        "sizes": [
            {
                "name": "8.25\" x 7.55\"",
                "sku": "CS2430",
                "price": 25.2,
                "caseCount": 150,
                "unitPrice": 0.16799999999999998,
                "palletTiHi": "6/8 (48cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "cs8001",
        "sku": "CS8001",
        "name": "Clamshell MFPP Container - Center Slide - 9x8.2, 150pc (150/1)",
        "category": "hinged-containers",
        "familyCategory": "hinged-containers",
        "productType": "Center Slide",
        "sizeBadge": "9\" x 8.2\"",
        "packaging": "150pc (150/1)",
        "color": "White",
        "compartments": "1 Compartment",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "hinged-containers",
            "Center Slide",
            "White"
        ],
        "description": "Clamshell MFPP Container - Center Slide - 9x8.2, 150pc (150/1). Large format dinner container.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 150pc (150/1)",
            "Pallet TI/HI: 6/7 (42cs)"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP)",
        "palletTiHi": "6/7 (42cs)",
        "price": 28.5,
        "priceLabel": "$28.50",
        "discontinuing": false,
        "sizes": [
            {
                "name": "9\" x 8.2\"",
                "sku": "CS8001",
                "price": 28.5,
                "caseCount": 150,
                "unitPrice": 0.19,
                "palletTiHi": "6/7 (42cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "cs8003",
        "sku": "CS8003",
        "name": "Clamshell MFPP Container - 3 Compartment - Center Slide - 9x8.2, 150pc (150/1)",
        "category": "hinged-containers",
        "familyCategory": "hinged-containers",
        "productType": "Center Slide",
        "sizeBadge": "9\" x 8.2\"",
        "packaging": "150pc (150/1)",
        "color": "White",
        "compartments": "3 Compartment",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "hinged-containers",
            "Center Slide",
            "White"
        ],
        "description": "Clamshell MFPP Container - 3 Compartment - Center Slide - 9x8.2, 150pc (150/1). Multi-section meal packaging.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 150pc (150/1)",
            "Pallet TI/HI: 6/7 (42cs)"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP)",
        "palletTiHi": "6/7 (42cs)",
        "price": 28.5,
        "priceLabel": "$28.50",
        "discontinuing": false,
        "sizes": [
            {
                "name": "9\" x 8.2\"",
                "sku": "CS8003",
                "price": 28.5,
                "caseCount": 150,
                "unitPrice": 0.19,
                "palletTiHi": "6/7 (42cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "cs901",
        "sku": "CS901",
        "name": "Clamshell MFPP Container - Center Slide - 9.5x9.25, 150pc (150/1)",
        "category": "hinged-containers",
        "familyCategory": "hinged-containers",
        "productType": "Center Slide",
        "sizeBadge": "9.5\" x 9.25\"",
        "packaging": "150pc (150/1)",
        "color": "White",
        "compartments": "1 Compartment",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "hinged-containers",
            "Center Slide",
            "White"
        ],
        "description": "Clamshell MFPP Container - Center Slide - 9.5x9.25, 150pc (150/1). Extra large entree takeout container.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 150pc (150/1)",
            "Pallet TI/HI: 6/7 (42cs)"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP)",
        "palletTiHi": "6/7 (42cs)",
        "price": 29.8,
        "priceLabel": "$29.80",
        "discontinuing": false,
        "sizes": [
            {
                "name": "9.5\" x 9.25\"",
                "sku": "CS901",
                "price": 29.8,
                "caseCount": 150,
                "unitPrice": 0.19866666666666666,
                "palletTiHi": "6/7 (42cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "cs903",
        "sku": "CS903",
        "name": "Clamshell MFPP Container - 3 Compartment - Center Slide - 9.5x9.25, 150pc (150/1)",
        "category": "hinged-containers",
        "familyCategory": "hinged-containers",
        "productType": "Center Slide",
        "sizeBadge": "9.5\" x 9.25\"",
        "packaging": "150pc (150/1)",
        "color": "White",
        "compartments": "3 Compartment",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "hinged-containers",
            "Center Slide",
            "White"
        ],
        "description": "Clamshell MFPP Container - 3 Compartment - Center Slide - 9.5x9.25, 150pc (150/1). Full-size dinner box.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 150pc (150/1)",
            "Pallet TI/HI: 6/7 (42cs)"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP)",
        "palletTiHi": "6/7 (42cs)",
        "price": 29.8,
        "priceLabel": "$29.80",
        "discontinuing": false,
        "sizes": [
            {
                "name": "9.5\" x 9.25\"",
                "sku": "CS903",
                "price": 29.8,
                "caseCount": 150,
                "unitPrice": 0.19866666666666666,
                "palletTiHi": "6/7 (42cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "cs905",
        "sku": "CS905",
        "name": "Clamshell MFPP Container - Center Slide - 8.8x5.3, 200pc (200/1)",
        "category": "hinged-containers",
        "familyCategory": "hinged-containers",
        "productType": "Center Slide",
        "sizeBadge": "8.8\" x 5.3\"",
        "packaging": "200pc (200/1)",
        "color": "White",
        "compartments": "1 Compartment",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "hinged-containers",
            "Center Slide",
            "White"
        ],
        "description": "Clamshell MFPP Container - Center Slide - 8.8x5.3, 200pc (200/1). Rectangular hoagie format with center tab.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 200pc (200/1)",
            "Pallet TI/HI: 6/7 (42cs)"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP)",
        "palletTiHi": "6/7 (42cs)",
        "price": 27.5,
        "priceLabel": "$27.50",
        "discontinuing": false,
        "sizes": [
            {
                "name": "8.8\" x 5.3\"",
                "sku": "CS905",
                "price": 27.5,
                "caseCount": 200,
                "unitPrice": 0.1375,
                "palletTiHi": "6/7 (42cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "cs906",
        "sku": "CS906",
        "name": "Clamshell MFPP Container - Center Slide - 9.25x6.5, 150pc (150/1)",
        "category": "hinged-containers",
        "familyCategory": "hinged-containers",
        "productType": "Center Slide",
        "sizeBadge": "9.25\" x 6.5\"",
        "packaging": "150pc (150/1)",
        "color": "White",
        "compartments": "1 Compartment",
        "image": "/images/white_hinged_box.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "hinged-containers",
            "Center Slide",
            "White"
        ],
        "description": "Clamshell MFPP Container - Center Slide - 9.25x6.5, 150pc (150/1). Center locking tab system.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 150pc (150/1)",
            "Pallet TI/HI: 6/7 (42cs)"
        ],
        "material": "Mineral-Filled Polypropylene (MFPP)",
        "palletTiHi": "6/7 (42cs)",
        "price": 28.2,
        "priceLabel": "$28.20",
        "discontinuing": false,
        "sizes": [
            {
                "name": "9.25\" x 6.5\"",
                "sku": "CS906",
                "price": 28.2,
                "caseCount": 150,
                "unitPrice": 0.188,
                "palletTiHi": "6/7 (42cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "bp01k",
        "sku": "BP01K",
        "name": "Bio Box #1 - Kraft, 450pc (50/9)",
        "category": "paper-take-out-boxes",
        "familyCategory": "paper-take-out-boxes",
        "productType": "Standard",
        "sizeBadge": "Standard",
        "packaging": "450pc (50/9)",
        "color": "Kraft",
        "image": "/images/cat_takeout_containers.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "paper-take-out-boxes",
            "Bio Box Kraft",
            "Kraft"
        ],
        "description": "Bio Box #1 - Kraft Paperboard, 450pc (50/9). Poly-lined leak-proof construction for Asian cuisine, pasta and salads.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 450pc (50/9)",
            "Pallet TI/HI: 8/6 (48cs)"
        ],
        "material": "Poly-Coated Kraft Paperboard",
        "palletTiHi": "8/6 (48cs)",
        "price": 36.8,
        "priceLabel": "$36.80",
        "discontinuing": false,
        "sizes": [
            {
                "name": "#1 Kraft",
                "sku": "BP01K",
                "price": 36.8,
                "caseCount": 450,
                "unitPrice": 0.08177777777777777,
                "palletTiHi": "8/6 (48cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "bp02k",
        "sku": "BP02K",
        "name": "Bio Box #2 - Kraft, 200pc (50/4)",
        "category": "paper-take-out-boxes",
        "familyCategory": "paper-take-out-boxes",
        "productType": "Standard",
        "sizeBadge": "Standard",
        "packaging": "200pc (50/4)",
        "color": "Kraft",
        "image": "/images/cat_takeout_containers.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "paper-take-out-boxes",
            "Bio Box Kraft",
            "Kraft"
        ],
        "description": "Bio Box #2 - Kraft Paperboard, 200pc (50/4). Heavy-duty natural kraft takeout carryout box.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 200pc (50/4)",
            "Pallet TI/HI: 8/6 (48cs)"
        ],
        "material": "Poly-Coated Kraft Paperboard",
        "palletTiHi": "8/6 (48cs)",
        "price": 29.5,
        "priceLabel": "$29.50",
        "discontinuing": false,
        "sizes": [
            {
                "name": "#2 Kraft",
                "sku": "BP02K",
                "price": 29.5,
                "caseCount": 200,
                "unitPrice": 0.1475,
                "palletTiHi": "8/6 (48cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "bp03k",
        "sku": "BP03K",
        "name": "Bio Box #3 - Kraft, 200pc (50/4)",
        "category": "paper-take-out-boxes",
        "familyCategory": "paper-take-out-boxes",
        "productType": "Standard",
        "sizeBadge": "Standard",
        "packaging": "200pc (50/4)",
        "color": "Kraft",
        "image": "/images/cat_takeout_containers.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "paper-take-out-boxes",
            "Bio Box Kraft",
            "Kraft"
        ],
        "description": "Bio Box #3 - Kraft Paperboard, 200pc (50/4). Large dinner capacity with folding tab top.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 200pc (50/4)",
            "Pallet TI/HI: 6/6 (36cs)"
        ],
        "material": "Poly-Coated Kraft Paperboard",
        "palletTiHi": "6/6 (36cs)",
        "price": 32.4,
        "priceLabel": "$32.40",
        "discontinuing": false,
        "sizes": [
            {
                "name": "#3 Kraft",
                "sku": "BP03K",
                "price": 32.4,
                "caseCount": 200,
                "unitPrice": 0.162,
                "palletTiHi": "6/6 (36cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "bp04k",
        "sku": "BP04K",
        "name": "Bio Box #4 - Kraft, 160pc (40/4)",
        "category": "paper-take-out-boxes",
        "familyCategory": "paper-take-out-boxes",
        "productType": "Standard",
        "sizeBadge": "Standard",
        "packaging": "160pc (40/4)",
        "color": "Kraft",
        "image": "/images/cat_takeout_containers.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "paper-take-out-boxes",
            "Bio Box Kraft",
            "Kraft"
        ],
        "description": "Bio Box #4 - Kraft Paperboard, 160pc (40/4). Deep takeout container for entrees and combos.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 160pc (40/4)",
            "Pallet TI/HI: 6/6 (36cs)"
        ],
        "material": "Poly-Coated Kraft Paperboard",
        "palletTiHi": "6/6 (36cs)",
        "price": 31.2,
        "priceLabel": "$31.20",
        "discontinuing": false,
        "sizes": [
            {
                "name": "#4 Kraft",
                "sku": "BP04K",
                "price": 31.2,
                "caseCount": 160,
                "unitPrice": 0.195,
                "palletTiHi": "6/6 (36cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "bp08k",
        "sku": "BP08K",
        "name": "Bio Box #8 - Kraft, 300pc (50/6)",
        "category": "paper-take-out-boxes",
        "familyCategory": "paper-take-out-boxes",
        "productType": "Standard",
        "sizeBadge": "Standard",
        "packaging": "300pc (50/6)",
        "color": "Kraft",
        "image": "/images/cat_takeout_containers.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "paper-take-out-boxes",
            "Bio Box Kraft",
            "Kraft"
        ],
        "description": "Bio Box #8 - Kraft Paperboard, 300pc (50/6). Traditional carryout food box with grease-resistant lining.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 300pc (50/6)",
            "Pallet TI/HI: 6/7 (42cs)"
        ],
        "material": "Poly-Coated Kraft Paperboard",
        "palletTiHi": "6/7 (42cs)",
        "price": 34.9,
        "priceLabel": "$34.90",
        "discontinuing": false,
        "sizes": [
            {
                "name": "#8 Kraft",
                "sku": "BP08K",
                "price": 34.9,
                "caseCount": 300,
                "unitPrice": 0.11633333333333333,
                "palletTiHi": "6/7 (42cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "bag-5",
        "sku": "BAG#5",
        "name": "#5 Kraft Paper Bag - 10x7x12, 500pc",
        "category": "bags",
        "familyCategory": "bags",
        "productType": "Standard",
        "sizeBadge": "#5",
        "packaging": "500pc",
        "color": "Kraft",
        "image": "/images/cat_kraft_bags.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "bags",
            "Kraft Bag",
            "Kraft"
        ],
        "description": "#5 Kraft Paper Bag - 10x7x12, 500pc. Self-opening thumb notch design for fast service packing.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 500pc",
            "Pallet TI/HI: 8/6 (48cs)"
        ],
        "material": "Heavy-Duty Natural Kraft Paper",
        "palletTiHi": "8/6 (48cs)",
        "price": 28.5,
        "priceLabel": "$28.50",
        "discontinuing": false,
        "sizes": [
            {
                "name": "#5 Bag",
                "sku": "BAG#5",
                "price": 28.5,
                "caseCount": 500,
                "unitPrice": 0.057,
                "palletTiHi": "8/6 (48cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "bag-10",
        "sku": "BAG#10",
        "name": "#10 Kraft Paper Bag - 13x7x17, 500pc",
        "category": "bags",
        "familyCategory": "bags",
        "productType": "Standard",
        "sizeBadge": "#10",
        "packaging": "500pc",
        "color": "Kraft",
        "image": "/images/cat_kraft_bags.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "bags",
            "Kraft Bag",
            "Kraft"
        ],
        "description": "#10 Kraft Paper Bag - 13x7x17, 500pc. High capacity takeout carryout bag for multiple container orders.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 500pc",
            "Pallet TI/HI: 6/6 (36cs)"
        ],
        "material": "Heavy-Duty Natural Kraft Paper",
        "palletTiHi": "6/6 (36cs)",
        "price": 34.2,
        "priceLabel": "$34.20",
        "discontinuing": false,
        "sizes": [
            {
                "name": "#10 Bag",
                "sku": "BAG#10",
                "price": 34.2,
                "caseCount": 500,
                "unitPrice": 0.0684,
                "palletTiHi": "6/6 (36cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "strawb1",
        "sku": "STRAWB1",
        "name": "8x6mm Black Straw, 500*6 Bags",
        "category": "straws",
        "familyCategory": "straws",
        "productType": "Standard",
        "sizeBadge": "Standard",
        "packaging": "3000pc (500*6)",
        "color": "Black",
        "image": "/images/cat_cups_lids.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "straws",
            "Black Straw",
            "Black"
        ],
        "description": "8x6mm Black Drinking Straw, 500*6 Bags (3,000 count). Standard beverage straw for dining service.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 3000pc (500*6)",
            "Pallet TI/HI: 8/8 (64cs)"
        ],
        "material": "Polypropylene (PP)",
        "palletTiHi": "8/8 (64cs)",
        "price": 19.8,
        "priceLabel": "$19.80",
        "discontinuing": false,
        "sizes": [
            {
                "name": "8 x 6mm",
                "sku": "STRAWB1",
                "price": 19.8,
                "caseCount": 3000,
                "unitPrice": 0.0066,
                "palletTiHi": "8/8 (64cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "strawb2",
        "sku": "STRAWB2",
        "name": "9x12mm Color Straw, 200*8 Bags",
        "category": "straws",
        "familyCategory": "straws",
        "productType": "Standard",
        "sizeBadge": "Standard",
        "packaging": "1600pc (200*8)",
        "color": "Multi-Color",
        "image": "/images/cat_cups_lids.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "straws",
            "Color Straw",
            "Multi-Color"
        ],
        "description": "9x12mm Jumbo Color Smoothie Straw, 200*8 Bags (1,600 count). Wide diameter for boba, smoothies and milkshakes.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 1600pc (200*8)",
            "Pallet TI/HI: 8/8 (64cs)"
        ],
        "material": "Polypropylene (PP)",
        "palletTiHi": "8/8 (64cs)",
        "price": 21.5,
        "priceLabel": "$21.50",
        "discontinuing": false,
        "sizes": [
            {
                "name": "9 x 12mm",
                "sku": "STRAWB2",
                "price": 21.5,
                "caseCount": 1600,
                "unitPrice": 0.0134375,
                "palletTiHi": "8/8 (64cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "strawb3",
        "sku": "STRAWB3",
        "name": "9x12mm Black Straw, 200*8 Bags",
        "category": "straws",
        "familyCategory": "straws",
        "productType": "Standard",
        "sizeBadge": "Standard",
        "packaging": "1600pc (200*8)",
        "color": "Black",
        "image": "/images/cat_cups_lids.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "straws",
            "Black Straw",
            "Black"
        ],
        "description": "9x12mm Jumbo Black Smoothie Straw, 200*8 Bags (1,600 count). Extra wide diameter for thick beverages.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 1600pc (200*8)",
            "Pallet TI/HI: 8/8 (64cs)"
        ],
        "material": "Polypropylene (PP)",
        "palletTiHi": "8/8 (64cs)",
        "price": 21.5,
        "priceLabel": "$21.50",
        "discontinuing": false,
        "sizes": [
            {
                "name": "9 x 12mm",
                "sku": "STRAWB3",
                "price": 21.5,
                "caseCount": 1600,
                "unitPrice": 0.0134375,
                "palletTiHi": "8/8 (64cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "strawcbox",
        "sku": "STRAWCBOX",
        "name": "10.25x7.4mm Black Straw, 100*12 Bags",
        "category": "straws",
        "familyCategory": "straws",
        "productType": "Standard",
        "sizeBadge": "Standard",
        "packaging": "1200pc (100*12)",
        "color": "Black",
        "image": "/images/cat_cups_lids.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "straws",
            "Black Straw",
            "Black"
        ],
        "description": "10.25x7.4mm Long Black Straw, 100*12 Bags (1,200 count). Boxed packaging for tall drink cups.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 1200pc (100*12)",
            "Pallet TI/HI: 8/8 (64cs)"
        ],
        "material": "Polypropylene (PP)",
        "palletTiHi": "8/8 (64cs)",
        "price": 22.8,
        "priceLabel": "$22.80",
        "discontinuing": false,
        "sizes": [
            {
                "name": "10.25 x 7.4mm",
                "sku": "STRAWCBOX",
                "price": 22.8,
                "caseCount": 1200,
                "unitPrice": 0.019,
                "palletTiHi": "8/8 (64cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "pp5-4g-blk-fork",
        "sku": "PP5.4G-BLK-FORK",
        "name": "PP5.4g Black Plastic Fork - Heavy Weight, 1000 Bulk",
        "category": "cutlery",
        "familyCategory": "cutlery",
        "productType": "Standard",
        "sizeBadge": "Standard",
        "packaging": "1000 Bulk",
        "color": "Black",
        "image": "/images/cat_cutlery.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "cutlery",
            "Fork",
            "Black"
        ],
        "description": "PP5.4g Black Plastic Fork - Heavy Weight Commercial Dining Cutlery, 1000 Bulk. Break-resistant rigid tines.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 1000 Bulk",
            "Pallet TI/HI: 8/8 (64cs)"
        ],
        "material": "Heavy-Duty Polypropylene (PP)",
        "palletTiHi": "8/8 (64cs)",
        "price": 18.5,
        "priceLabel": "$18.50",
        "discontinuing": false,
        "sizes": [
            {
                "name": "5.4g Heavy",
                "sku": "PP5.4G-BLK-FORK",
                "price": 18.5,
                "caseCount": 1000,
                "unitPrice": 0.0185,
                "palletTiHi": "8/8 (64cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "pp5-4g-wht-fork",
        "sku": "PP5.4G-WHT-FORK",
        "name": "PP5.4g White Plastic Fork - Heavy Weight, 1000 Bulk",
        "category": "cutlery",
        "familyCategory": "cutlery",
        "productType": "Standard",
        "sizeBadge": "Standard",
        "packaging": "1000 Bulk",
        "color": "White",
        "image": "/images/cat_cutlery.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "cutlery",
            "Fork",
            "White"
        ],
        "description": "PP5.4g White Plastic Fork - Heavy Weight Commercial Dining Cutlery, 1000 Bulk. Clean white restaurant grade.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 1000 Bulk",
            "Pallet TI/HI: 8/8 (64cs)"
        ],
        "material": "Heavy-Duty Polypropylene (PP)",
        "palletTiHi": "8/8 (64cs)",
        "price": 18.5,
        "priceLabel": "$18.50",
        "discontinuing": false,
        "sizes": [
            {
                "name": "5.4g Heavy",
                "sku": "PP5.4G-WHT-FORK",
                "price": 18.5,
                "caseCount": 1000,
                "unitPrice": 0.0185,
                "palletTiHi": "8/8 (64cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "pp5-4g-blk-spoon",
        "sku": "PP5.4G-BLK-SPOON",
        "name": "PP5.4g Black Plastic Tea Spoon - Heavy Weight, 1000 Bulk",
        "category": "cutlery",
        "familyCategory": "cutlery",
        "productType": "Standard",
        "sizeBadge": "Standard",
        "packaging": "1000 Bulk",
        "color": "Black",
        "image": "/images/cat_cutlery.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "cutlery",
            "Tea Spoon",
            "Black"
        ],
        "description": "PP5.4g Black Plastic Tea Spoon - Heavy Weight Commercial Cutlery, 1000 Bulk. Deep bowl for hot and cold foods.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 1000 Bulk",
            "Pallet TI/HI: 8/8 (64cs)"
        ],
        "material": "Heavy-Duty Polypropylene (PP)",
        "palletTiHi": "8/8 (64cs)",
        "price": 18.5,
        "priceLabel": "$18.50",
        "discontinuing": false,
        "sizes": [
            {
                "name": "5.4g Heavy",
                "sku": "PP5.4G-BLK-SPOON",
                "price": 18.5,
                "caseCount": 1000,
                "unitPrice": 0.0185,
                "palletTiHi": "8/8 (64cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "pp5-4g-wht-spoon",
        "sku": "PP5.4G-WHT-SPOON",
        "name": "PP5.4g White Plastic Tea Spoon - Heavy Weight, 1000 Bulk",
        "category": "cutlery",
        "familyCategory": "cutlery",
        "productType": "Standard",
        "sizeBadge": "Standard",
        "packaging": "1000 Bulk",
        "color": "White",
        "image": "/images/cat_cutlery.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "cutlery",
            "Tea Spoon",
            "White"
        ],
        "description": "PP5.4g White Plastic Tea Spoon - Heavy Weight Commercial Cutlery, 1000 Bulk. Professional food service quality.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 1000 Bulk",
            "Pallet TI/HI: 8/8 (64cs)"
        ],
        "material": "Heavy-Duty Polypropylene (PP)",
        "palletTiHi": "8/8 (64cs)",
        "price": 18.5,
        "priceLabel": "$18.50",
        "discontinuing": false,
        "sizes": [
            {
                "name": "5.4g Heavy",
                "sku": "PP5.4G-WHT-SPOON",
                "price": 18.5,
                "caseCount": 1000,
                "unitPrice": 0.0185,
                "palletTiHi": "8/8 (64cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "pp5-0g-wht-soup",
        "sku": "PP5.0G-WHT-SOUP",
        "name": "PP5.0g White Plastic Soup Spoon - Extra Heavy, 1000 Bulk",
        "category": "cutlery",
        "familyCategory": "cutlery",
        "productType": "Standard",
        "sizeBadge": "Standard",
        "packaging": "1000 Bulk",
        "color": "White",
        "image": "/images/cat_cutlery.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "cutlery",
            "Soup Spoon",
            "White"
        ],
        "description": "PP5.0g White Plastic Soup Spoon - Extra Heavy Weight Asian & Broth Spoon, 1000 Bulk. Flat bottom for ramen and pho.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 1000 Bulk",
            "Pallet TI/HI: 8/8 (64cs)"
        ],
        "material": "Heavy-Duty Polypropylene (PP)",
        "palletTiHi": "8/8 (64cs)",
        "price": 19.9,
        "priceLabel": "$19.90",
        "discontinuing": false,
        "sizes": [
            {
                "name": "5.0g Extra Heavy",
                "sku": "PP5.0G-WHT-SOUP",
                "price": 19.9,
                "caseCount": 1000,
                "unitPrice": 0.019899999999999998,
                "palletTiHi": "8/8 (64cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "pp5-0g-blk-soup",
        "sku": "PP5.0G-BLK-SOUP",
        "name": "PP5.0g Black Plastic Soup Spoon - Extra Heavy, 1000 Bulk",
        "category": "cutlery",
        "familyCategory": "cutlery",
        "productType": "Standard",
        "sizeBadge": "Standard",
        "packaging": "1000 Bulk",
        "color": "Black",
        "image": "/images/cat_cutlery.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "cutlery",
            "Soup Spoon",
            "Black"
        ],
        "description": "PP5.0g Black Plastic Soup Spoon - Extra Heavy Weight Asian & Broth Spoon, 1000 Bulk. Deep ladle bowl.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 1000 Bulk",
            "Pallet TI/HI: 8/8 (64cs)"
        ],
        "material": "Heavy-Duty Polypropylene (PP)",
        "palletTiHi": "8/8 (64cs)",
        "price": 19.9,
        "priceLabel": "$19.90",
        "discontinuing": false,
        "sizes": [
            {
                "name": "5.0g Extra Heavy",
                "sku": "PP5.0G-BLK-SOUP",
                "price": 19.9,
                "caseCount": 1000,
                "unitPrice": 0.019899999999999998,
                "palletTiHi": "8/8 (64cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "kit-3in1-blk",
        "sku": "KIT-3IN1-BLK",
        "name": "3 In 1 Cutlery Kit (BLACK) - Fork + Knife + Napkin, 250 Sets",
        "category": "cutlery",
        "familyCategory": "cutlery",
        "productType": "Standard",
        "sizeBadge": "Standard",
        "packaging": "250 Sets",
        "color": "Black",
        "image": "/images/cat_cutlery.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "cutlery",
            "Cutlery Kit",
            "Black"
        ],
        "description": "3 In 1 Cutlery Kit (BLACK): Heavy Duty Black Fork + Knife + Salt + Pepper + Napkin individually wrapped in clear film.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 250 Sets",
            "Pallet TI/HI: 8/6 (48cs)"
        ],
        "material": "Heavy Duty Polypropylene + 1-ply Napkin",
        "palletTiHi": "8/6 (48cs)",
        "price": 24.5,
        "priceLabel": "$24.50",
        "discontinuing": false,
        "sizes": [
            {
                "name": "3-in-1 Kit",
                "sku": "KIT-3IN1-BLK",
                "price": 24.5,
                "caseCount": 250,
                "unitPrice": 0.098,
                "palletTiHi": "8/6 (48cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "kit-5in1-blk",
        "sku": "KIT-5IN1-BLK",
        "name": "5 In 1 Cutlery Kit (BLACK) - Fork + Spoon + Knife + Salt + Pepper + Napkin, 250 Sets",
        "category": "cutlery",
        "familyCategory": "cutlery",
        "productType": "Standard",
        "sizeBadge": "Standard",
        "packaging": "250 Sets",
        "color": "Black",
        "image": "/images/cat_cutlery.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "cutlery",
            "Cutlery Kit",
            "Black"
        ],
        "description": "5 In 1 Cutlery Kit (BLACK): Heavy Duty Black Fork + Spoon + Knife + Salt + Pepper + Napkin individually sealed for delivery orders.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 250 Sets",
            "Pallet TI/HI: 8/6 (48cs)"
        ],
        "material": "Heavy Duty Polypropylene + Seasoning + Napkin",
        "palletTiHi": "8/6 (48cs)",
        "price": 28.5,
        "priceLabel": "$28.50",
        "discontinuing": false,
        "sizes": [
            {
                "name": "5-in-1 Kit",
                "sku": "KIT-5IN1-BLK",
                "price": 28.5,
                "caseCount": 250,
                "unitPrice": 0.114,
                "palletTiHi": "8/6 (48cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "kit-6in1-blk",
        "sku": "KIT-6IN1-BLK",
        "name": "6 In 1 Cutlery Kit (BLACK) - Fork + Spoon + Knife + Salt + Pepper + Napkin, 250 Sets",
        "category": "cutlery",
        "familyCategory": "cutlery",
        "productType": "Standard",
        "sizeBadge": "Standard",
        "packaging": "250 Sets",
        "color": "Black",
        "image": "/images/cat_cutlery.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "cutlery",
            "Cutlery Kit",
            "Black"
        ],
        "description": "6 In 1 Cutlery Kit (BLACK): Complete Heavy Duty Black Fork + Spoon + Knife + Salt + Pepper + Napkin wrapped set.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 250 Sets",
            "Pallet TI/HI: 8/6 (48cs)"
        ],
        "material": "Heavy Duty Polypropylene + Seasoning + Napkin",
        "palletTiHi": "8/6 (48cs)",
        "price": 29.9,
        "priceLabel": "$29.90",
        "discontinuing": false,
        "sizes": [
            {
                "name": "6-in-1 Kit",
                "sku": "KIT-6IN1-BLK",
                "price": 29.9,
                "caseCount": 250,
                "unitPrice": 0.1196,
                "palletTiHi": "8/6 (48cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "kit-6in1-wht",
        "sku": "KIT-6IN1-WHT",
        "name": "6 In 1 Cutlery Kit (WHITE) - Fork + Spoon + Knife + Salt + Pepper + Napkin, 250 Sets",
        "category": "cutlery",
        "familyCategory": "cutlery",
        "productType": "Standard",
        "sizeBadge": "Standard",
        "packaging": "250 Sets",
        "color": "White",
        "image": "/images/cat_cutlery.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "cutlery",
            "Cutlery Kit",
            "White"
        ],
        "description": "6 In 1 Cutlery Kit (WHITE): Complete Heavy Duty White Fork + Spoon + Knife + Salt + Pepper + Napkin wrapped set.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 250 Sets",
            "Pallet TI/HI: 8/6 (48cs)"
        ],
        "material": "Heavy Duty Polypropylene + Seasoning + Napkin",
        "palletTiHi": "8/6 (48cs)",
        "price": 29.9,
        "priceLabel": "$29.90",
        "discontinuing": false,
        "sizes": [
            {
                "name": "6-in-1 Kit",
                "sku": "KIT-6IN1-WHT",
                "price": 29.9,
                "caseCount": 250,
                "unitPrice": 0.1196,
                "palletTiHi": "8/6 (48cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "napkin-7x13",
        "sku": "NAPKIN-7X13",
        "name": "7x13 Single Layer Napkins, 1000 Bulk",
        "category": "napkins",
        "familyCategory": "napkins",
        "productType": "Standard",
        "sizeBadge": "7\" x 13\"",
        "packaging": "1000 Bulk",
        "color": "White",
        "image": "/images/cat_napkins.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "napkins",
            "Dispenser Napkin",
            "White"
        ],
        "description": "7x13 Single Layer Food Service Napkins, 1000 Bulk. Absorbent embossed paper for quick-service dining.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 1000 Bulk",
            "Pallet TI/HI: 8/8 (64cs)"
        ],
        "material": "Virgin Soft Tissue Paper",
        "palletTiHi": "8/8 (64cs)",
        "price": 16.5,
        "priceLabel": "$16.50",
        "discontinuing": false,
        "sizes": [
            {
                "name": "7\" x 13\"",
                "sku": "NAPKIN-7X13",
                "price": 16.5,
                "caseCount": 1000,
                "unitPrice": 0.0165,
                "palletTiHi": "8/8 (64cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "napkin-15x17",
        "sku": "NAPKIN-15X17",
        "name": "15x17 Double Layer 1/8 Fold Napkins, 1000 Bulk",
        "category": "napkins",
        "familyCategory": "napkins",
        "productType": "Standard",
        "sizeBadge": "15\" x 17\"",
        "packaging": "1000 Bulk",
        "color": "White",
        "image": "/images/cat_napkins.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "napkins",
            "Dinner Napkin",
            "White"
        ],
        "description": "15x17 Double Layer 1/8 Fold Dinner Napkins, 1000 Bulk. High absorbency for sit-down restaurants and catering.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 1000 Bulk",
            "Pallet TI/HI: 6/6 (36cs)"
        ],
        "material": "2-Ply Soft White Tissue",
        "palletTiHi": "6/6 (36cs)",
        "price": 24.8,
        "priceLabel": "$24.80",
        "discontinuing": false,
        "sizes": [
            {
                "name": "15\" x 17\"",
                "sku": "NAPKIN-15X17",
                "price": 24.8,
                "caseCount": 1000,
                "unitPrice": 0.0248,
                "palletTiHi": "6/6 (36cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "tray-100",
        "sku": "TRAY-100",
        "name": "Paper Food Tray - 1LB (100g), 1000pc",
        "category": "food-trays-plates",
        "familyCategory": "food-trays-plates",
        "productType": "Standard",
        "sizeBadge": "1 LB",
        "packaging": "1000pc",
        "color": "Red Plaid / Kraft",
        "image": "/images/cat_aluminum_trays.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "food-trays-plates",
            "Paper Tray",
            "Red Plaid / Kraft"
        ],
        "description": "Paper Food Tray - 1LB (100g) capacity, 1000pc. Grease-resistant open top tray for fries, nachos and finger food.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 1000pc",
            "Pallet TI/HI: 8/6 (48cs)"
        ],
        "material": "Clay-Coated Paperboard",
        "palletTiHi": "8/6 (48cs)",
        "price": 21.5,
        "priceLabel": "$21.50",
        "discontinuing": false,
        "sizes": [
            {
                "name": "1 LB",
                "sku": "TRAY-100",
                "price": 21.5,
                "caseCount": 1000,
                "unitPrice": 0.0215,
                "palletTiHi": "8/6 (48cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "tray-200",
        "sku": "TRAY-200",
        "name": "Paper Food Tray - 2LB (200g), 1000pc",
        "category": "food-trays-plates",
        "familyCategory": "food-trays-plates",
        "productType": "Standard",
        "sizeBadge": "2 LB",
        "packaging": "1000pc",
        "color": "Red Plaid / Kraft",
        "image": "/images/cat_aluminum_trays.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "food-trays-plates",
            "Paper Tray",
            "Red Plaid / Kraft"
        ],
        "description": "Paper Food Tray - 2LB (200g) capacity, 1000pc. High rim prevents grease spills at concession stands and food trucks.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 1000pc",
            "Pallet TI/HI: 8/6 (48cs)"
        ],
        "material": "Clay-Coated Paperboard",
        "palletTiHi": "8/6 (48cs)",
        "price": 25.8,
        "priceLabel": "$25.80",
        "discontinuing": false,
        "sizes": [
            {
                "name": "2 LB",
                "sku": "TRAY-200",
                "price": 25.8,
                "caseCount": 1000,
                "unitPrice": 0.0258,
                "palletTiHi": "8/6 (48cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "tray-250",
        "sku": "TRAY-250",
        "name": "Paper Food Tray - 2.5LB (250g), 500pc",
        "category": "food-trays-plates",
        "familyCategory": "food-trays-plates",
        "productType": "Standard",
        "sizeBadge": "2.5 LB",
        "packaging": "500pc",
        "color": "Red Plaid / Kraft",
        "image": "/images/cat_aluminum_trays.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "food-trays-plates",
            "Paper Tray",
            "Red Plaid / Kraft"
        ],
        "description": "Paper Food Tray - 2.5LB (250g) capacity, 500pc. Heavy paperboard construction for loaded entrees.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 500pc",
            "Pallet TI/HI: 8/6 (48cs)"
        ],
        "material": "Clay-Coated Paperboard",
        "palletTiHi": "8/6 (48cs)",
        "price": 22.9,
        "priceLabel": "$22.90",
        "discontinuing": false,
        "sizes": [
            {
                "name": "2.5 LB",
                "sku": "TRAY-250",
                "price": 22.9,
                "caseCount": 500,
                "unitPrice": 0.0458,
                "palletTiHi": "8/6 (48cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "tray-300",
        "sku": "TRAY-300",
        "name": "Paper Food Tray - 3LB (300g), 500pc",
        "category": "food-trays-plates",
        "familyCategory": "food-trays-plates",
        "productType": "Standard",
        "sizeBadge": "3 LB",
        "packaging": "500pc",
        "color": "Red Plaid / Kraft",
        "image": "/images/cat_aluminum_trays.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "food-trays-plates",
            "Paper Tray",
            "Red Plaid / Kraft"
        ],
        "description": "Paper Food Tray - 3LB (300g) capacity, 500pc. Maximum capacity serving boats.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 500pc",
            "Pallet TI/HI: 8/6 (48cs)"
        ],
        "material": "Clay-Coated Paperboard",
        "palletTiHi": "8/6 (48cs)",
        "price": 24.5,
        "priceLabel": "$24.50",
        "discontinuing": false,
        "sizes": [
            {
                "name": "3 LB",
                "sku": "TRAY-300",
                "price": 24.5,
                "caseCount": 500,
                "unitPrice": 0.049,
                "palletTiHi": "8/6 (48cs)",
                "stockStatus": "In Stock"
            }
        ]
    },
    {
        "id": "plate6",
        "sku": "PLATE6",
        "name": "Compostable Paper Plate - 6 inch, 1000pc",
        "category": "food-trays-plates",
        "familyCategory": "bagasse-products",
        "productType": "Standard",
        "sizeBadge": "6\"",
        "packaging": "1000pc",
        "color": "White",
        "image": "/images/cat_paper_plates.jpg",
        "inStock": true,
        "stockCount": 250,
        "rating": 4.8,
        "reviewsCount": 18,
        "featured": false,
        "tags": [
            "food-trays-plates",
            "Compostable Plate",
            "White"
        ],
        "description": "Compostable Paper Plate - 6 inch, 1000pc. Biodegradable appetizer and dessert serving plates.",
        "features": [
            "Commercial Food-Grade Quality",
            "FDA Food-Contact Safe",
            "Packaging: 1000pc",
            "Pallet TI/HI: 8/8 (64cs)"
        ],
        "material": "Compostable Sugarcane Bagasse / Paper",
        "palletTiHi": "8/8 (64cs)",
        "price": 22.8,
        "priceLabel": "$22.80",
        "discontinuing": false,
        "sizes": [
            {
                "name": "6\"",
                "sku": "PLATE6",
                "price": 22.8,
                "caseCount": 1000,
                "unitPrice": 0.0228,
                "palletTiHi": "8/8 (64cs)",
                "stockStatus": "In Stock"
            }
        ]
    }
];
