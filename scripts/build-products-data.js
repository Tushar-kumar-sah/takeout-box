const fs = require('fs');
const path = require('path');
const compiledData = require('../scratch/compile_products.js');

const { CATEGORIES, MAIN_CATEGORIES, PRODUCTS } = compiledData;

console.log(`Writing catalog with ${CATEGORIES.length} categories, ${MAIN_CATEGORIES.length} main categories, and ${PRODUCTS.length} products.`);

const HERO_SLIDES = [
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
    ctaCategory: "bagasse-plates-and-bowls",
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
    ctaText: "Shop Aluminum Pans",
    ctaCategory: "aluminum-foil-and-pans",
    objectPosition: "center 60%"
  }
];

const POSTER_SLIDES = [
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
    category: "bagasse-plates-and-bowls",
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
    category: "aluminum-foil-and-pans",
    tag: "Commercial Catering"
  }
];

const INDUSTRIES = [
  {
    id: "restaurants",
    name: "Restaurants & Cafés",
    tagline: "Dine-In, Curbside & Takeaway",
    description: "Premium meal prep containers, cup sleeves, grease-resistant kraft boxes, and portion cups designed for high-turnover kitchens.",
    iconName: "UtensilsCrossed",
    popularItems: ["Deli Containers", "MFPP Hinged Containers", "Paper Cups"],
  },
  {
    id: "food-trucks",
    name: "Food Trucks & Street Food",
    tagline: "Fast-Paced, Durable & Grease-Proof",
    description: "Heavy-duty clamshell containers, sauce cups, and leak-resistant takeaway bowls built for mobile kitchen workflows.",
    iconName: "Truck",
    popularItems: ["Hinged Containers", "Portion Cups", "Noodle Bowls"],
  },
  {
    id: "bars-beverage",
    name: "Bars, Juice Bars & Boba",
    tagline: "Ultra-Clear Cold Drinkware",
    description: "Crystal clear PET drink cups, dome lids with wide straw slots, and flat lids for cocktails, iced coffee, boba, and smoothies.",
    iconName: "Wine",
    popularItems: ["PET Cups & Lids", "Paper Cups & Sleeves"],
  },
  {
    id: "catering-events",
    name: "Catering, Banquets & Events",
    tagline: "PFAS-Free Sustainable Dinnerware",
    description: "BPI-certified bagasse plates, sugarcane bowls, and clear polystyrene bakery containers for elegant banquet service.",
    iconName: "Sparkles",
    popularItems: ["Bagasse Plates & Bowls", "Clear PS Containers"],
  },
];

const fileContent = `export interface ProductSize {
  name: string;
  sku: string;
  price: number;
  caseCount: number;
  unitPrice: number;
  palletTiHi?: string;
  specialPrice?: number | null;
  mrpPrice?: number;
  image?: string;
  stockStatus?: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  subcategory?: string;
  familyCategory?: string;
  productType?: string;
  sizeBadge?: string;
  packaging?: string;
  caseCount?: number;
  color?: string;
  compartments?: string;
  discontinuing?: boolean;
  priceLabel?: string;
  status?: string;
  image: string;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewsCount: number;
  featured?: boolean;
  bestSeller?: boolean;
  ecoFriendly?: boolean;
  tags: string[];
  description: string;
  features: string[];
  material: string;
  temperatureRange?: string;
  palletTiHi: string;
  price: number;
  specialPrice?: number | null;
  mrpPrice?: number;
  sizes: ProductSize[];
  relatedProductIds?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  iconName: string;
  badge?: string;
}

export const MAIN_CATEGORIES: Category[] = ${JSON.stringify(MAIN_CATEGORIES, null, 2)};

export const CATEGORIES: Category[] = ${JSON.stringify(CATEGORIES, null, 2)};

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  badge: string;
  ctaText: string;
  ctaCategory: string;
  objectPosition?: string;
}

export const HERO_SLIDES: HeroSlide[] = ${JSON.stringify(HERO_SLIDES, null, 2)};

export interface PosterSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  category: string;
  tag: string;
}

export const POSTER_SLIDES: PosterSlide[] = ${JSON.stringify(POSTER_SLIDES, null, 2)};

export interface IndustrySector {
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  popularItems: string[];
}

export const INDUSTRIES: IndustrySector[] = ${JSON.stringify(INDUSTRIES, null, 2)};

export const PRODUCTS: Product[] = ${JSON.stringify(PRODUCTS, null, 2)};
`;

const outputPath = path.join(__dirname, '../src/data/products.ts');
fs.writeFileSync(outputPath, fileContent, 'utf8');
console.log('Successfully written full catalog to src/data/products.ts!');

module.exports = {
  CATEGORIES,
  MAIN_CATEGORIES,
  PRODUCTS,
};
