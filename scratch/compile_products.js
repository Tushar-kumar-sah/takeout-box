const fs = require('fs');
const path = require('path');
const { resolveProductImage, CATEGORIES, MAIN_CATEGORIES } = require('../scripts/generate_full_catalog.js');
const headData = require('../scratch/head_products.js');

const existingProducts = headData.PRODUCTS;
const existingSkus = new Set(existingProducts.map(p => p.sku.toUpperCase()));

console.log('Existing base products count:', existingProducts.length);

const DELI_ITEMS_MAP = {
  // Combo Sets (9 items) - Image: /images/pp-deli-container.jpg
  "SDLH8": {
    name: "8oz PP Deli Container, 240 Sets (24/20)",
    price: 19.35,
    specialPrice: 19.35,
    palletTiHi: "8/8 (64cs)",
    caseCount: 240,
    packaging: "240 Sets (24/20)",
    category: "deli-containers",
    familyCategory: "deli-containers",
    productType: "Combo Set",
    image: "/images/pp-deli-container.jpg",
    sizeBadge: "8 oz",
    material: "Polypropylene (PP)",
    color: "Translucent",
  },
  "SDLH16": {
    name: "16oz PP Deli Container, 240 Sets (24/20)",
    price: 21.95,
    specialPrice: 21.95,
    palletTiHi: "8/7 (56cs)",
    caseCount: 240,
    packaging: "240 Sets (24/20)",
    category: "deli-containers",
    familyCategory: "deli-containers",
    productType: "Combo Set",
    image: "/images/pp-deli-container.jpg",
    sizeBadge: "16 oz",
    material: "Polypropylene (PP)",
    color: "Translucent",
  },
  "SDLH32": {
    name: "32oz PP Deli Container, 240 Sets (24/20)",
    price: 28.45,
    specialPrice: 28.45,
    palletTiHi: "8/5 (40cs)",
    caseCount: 240,
    packaging: "240 Sets (24/20)",
    category: "deli-containers",
    familyCategory: "deli-containers",
    productType: "Combo Set",
    image: "/images/pp-deli-container.jpg",
    sizeBadge: "32 oz",
    material: "Polypropylene (PP)",
    color: "Translucent",
  },
  "DLH8": {
    name: "8oz PP Deli Container, 240 sets (24/20)",
    price: 24.19,
    specialPrice: 24.19,
    palletTiHi: "8/8 (64cs)",
    caseCount: 240,
    packaging: "240 sets (24/20)",
    category: "deli-containers",
    familyCategory: "deli-containers",
    productType: "Combo Set",
    image: "/images/pp-deli-container.jpg",
    sizeBadge: "8 oz",
    material: "Polypropylene (PP)",
    color: "Translucent",
  },
  "DLH12": {
    name: "12oz PP Deli Container, 240 sets (24/20)",
    price: 26.90,
    specialPrice: 26.90,
    palletTiHi: "8/7 (56cs)",
    caseCount: 240,
    packaging: "240 sets (24/20)",
    category: "deli-containers",
    familyCategory: "deli-containers",
    productType: "Combo Set",
    image: "/images/pp-deli-container.jpg",
    sizeBadge: "12 oz",
    material: "Polypropylene (PP)",
    color: "Translucent",
  },
  "DLH16": {
    name: "16oz PP Deli Container, 240 sets (24/20)",
    price: 29.62,
    specialPrice: 29.62,
    palletTiHi: "8/7 (56cs)",
    caseCount: 240,
    packaging: "240 sets (24/20)",
    category: "deli-containers",
    familyCategory: "deli-containers",
    productType: "Combo Set",
    image: "/images/pp-deli-container.jpg",
    sizeBadge: "16 oz",
    material: "Polypropylene (PP)",
    color: "Translucent",
  },
  "DLH24": {
    name: "24oz PP Deli Container, 240 sets (24/20)",
    price: 35.05,
    specialPrice: 35.05,
    palletTiHi: "8/5 (40cs)",
    caseCount: 240,
    packaging: "240 sets (24/20)",
    category: "deli-containers",
    familyCategory: "deli-containers",
    productType: "Combo Set",
    image: "/images/pp-deli-container.jpg",
    sizeBadge: "24 oz",
    material: "Polypropylene (PP)",
    color: "Translucent",
  },
  "DLH32": {
    name: "32oz PP Deli Container, 240 sets (24/20)",
    price: 38.44,
    specialPrice: 38.44,
    palletTiHi: "8/4 (32cs)",
    caseCount: 240,
    packaging: "240 sets (24/20)",
    category: "deli-containers",
    familyCategory: "deli-containers",
    productType: "Combo Set",
    image: "/images/pp-deli-container.jpg",
    sizeBadge: "32 oz",
    material: "Polypropylene (PP)",
    color: "Translucent",
  },
  "DLH64": {
    name: "64oz PP Deli Container, 120 sets (12/20)",
    price: 45.92,
    specialPrice: 45.92,
    palletTiHi: "7/6 (42cs)",
    caseCount: 120,
    packaging: "120 sets (12/20)",
    category: "deli-containers",
    familyCategory: "deli-containers",
    productType: "Combo Set",
    image: "/images/pp-deli-container.jpg",
    sizeBadge: "64 oz",
    material: "Polypropylene (PP)",
    color: "Translucent",
  },

  // Regular Bulk (6 items) - Image: /images/pp-deli-container-base.jpg
  "DLH8-500": {
    name: "8oz PP Deli Container Base, 500pc (50/10)",
    price: 21.89,
    specialPrice: 21.89,
    palletTiHi: "8/8 (64cs)",
    caseCount: 500,
    packaging: "500pc (50/10)",
    category: "deli-containers",
    familyCategory: "deli-containers",
    productType: "Regular Bulk Base",
    image: "/images/pp-deli-container-base.jpg",
    sizeBadge: "8 oz",
    material: "Polypropylene (PP)",
    color: "Translucent",
  },
  "DLH12-500": {
    name: "12oz PP Deli Container Base, 500pc (50/10)",
    price: 24.49,
    specialPrice: 24.49,
    palletTiHi: "8/6 (48cs)",
    caseCount: 500,
    packaging: "500pc (50/10)",
    category: "deli-containers",
    familyCategory: "deli-containers",
    productType: "Regular Bulk Base",
    image: "/images/pp-deli-container-base.jpg",
    sizeBadge: "12 oz",
    material: "Polypropylene (PP)",
    color: "Translucent",
  },
  "DLH16-500": {
    name: "16oz PP Deli Container Base, 500pc (50/10)",
    price: 27.08,
    specialPrice: 27.08,
    palletTiHi: "8/6 (48cs)",
    caseCount: 500,
    packaging: "500pc (50/10)",
    category: "deli-containers",
    familyCategory: "deli-containers",
    productType: "Regular Bulk Base",
    image: "/images/pp-deli-container-base.jpg",
    sizeBadge: "16 oz",
    material: "Polypropylene (PP)",
    color: "Translucent",
  },
  "DLH24-500": {
    name: "24oz PP Deli Container Base, 500pc (25/20)",
    price: 36.17,
    specialPrice: 36.17,
    palletTiHi: "4/7 (28cs)",
    caseCount: 500,
    packaging: "500pc (25/20)",
    category: "deli-containers",
    familyCategory: "deli-containers",
    productType: "Regular Bulk Base",
    image: "/images/pp-deli-container-base.jpg",
    sizeBadge: "24 oz",
    material: "Polypropylene (PP)",
    color: "Translucent",
  },
  "DLH32-500": {
    name: "32oz PP Deli Container Base, 500pc (25/20)",
    price: 40.05,
    specialPrice: 40.05,
    palletTiHi: "4/6 (24cs)",
    caseCount: 500,
    packaging: "500pc (25/20)",
    category: "deli-containers",
    familyCategory: "deli-containers",
    productType: "Regular Bulk Base",
    image: "/images/pp-deli-container-base.jpg",
    sizeBadge: "32 oz",
    material: "Polypropylene (PP)",
    color: "Translucent",
  },
  "LID-500": {
    name: "Lids for 8-32oz Deli Container, 500pc (50/10)",
    price: 19.31,
    specialPrice: 19.31,
    palletTiHi: "8/8 (64cs)",
    caseCount: 500,
    packaging: "500pc (50/10)",
    category: "deli-containers",
    familyCategory: "deli-containers",
    productType: "Lid",
    image: "/images/pp-deli-container-base.jpg",
    sizeBadge: "8-32 oz",
    material: "Polypropylene (PP)",
    color: "Translucent",
  },

  // Thin/Clear (8 items) - Image: /images/clear-deli-container.jpg
  "DLCU8": {
    name: "Clear Deli Container Cups 8 oz, Polypropylene, 500pc (50/10)",
    price: 21.89,
    specialPrice: 21.89,
    palletTiHi: "8/9 (72cs)",
    caseCount: 500,
    packaging: "500pc (50/10)",
    category: "deli-containers",
    familyCategory: "deli-containers",
    productType: "Thin Clear Cup",
    image: "/images/clear-deli-container.jpg",
    sizeBadge: "8 oz",
    material: "Polypropylene (PP)",
    color: "Clear",
  },
  "DLCU12": {
    name: "Clear Deli Container Cups 12 oz, Polypropylene, 500pc (50/10)",
    price: 24.49,
    specialPrice: 24.49,
    palletTiHi: "8/7 (56cs)",
    caseCount: 500,
    packaging: "500pc (50/10)",
    category: "deli-containers",
    familyCategory: "deli-containers",
    productType: "Thin Clear Cup",
    image: "/images/clear-deli-container.jpg",
    sizeBadge: "12 oz",
    material: "Polypropylene (PP)",
    color: "Clear",
  },
  "DLCU16": {
    name: "Clear Deli Container Cups 16 oz, Polypropylene, 500pc (50/10)",
    price: 27.08,
    specialPrice: 27.08,
    palletTiHi: "8/7 (56cs)",
    caseCount: 500,
    packaging: "500pc (50/10)",
    category: "deli-containers",
    familyCategory: "deli-containers",
    productType: "Thin Clear Cup",
    image: "/images/clear-deli-container.jpg",
    sizeBadge: "16 oz",
    material: "Polypropylene (PP)",
    color: "Clear",
  },
  "DLCU24": {
    name: "Clear Deli Container Cups 24 oz, Polypropylene, 500pc (25/20)",
    price: 36.17,
    specialPrice: 36.17,
    palletTiHi: "8/7 (56cs)",
    caseCount: 500,
    packaging: "500pc (25/20)",
    category: "deli-containers",
    familyCategory: "deli-containers",
    productType: "Thin Clear Cup",
    image: "/images/clear-deli-container.jpg",
    sizeBadge: "24 oz",
    material: "Polypropylene (PP)",
    color: "Clear",
  },
  "DLCU32": {
    name: "Clear Deli Container Cups 32 oz, Polypropylene, 500pc (25/20)",
    price: 40.05,
    specialPrice: 40.05,
    palletTiHi: "8/4 (32cs)",
    caseCount: 500,
    packaging: "500pc (25/20)",
    category: "deli-containers",
    familyCategory: "deli-containers",
    productType: "Thin Clear Cup",
    image: "/images/clear-deli-container.jpg",
    sizeBadge: "32 oz",
    material: "Polypropylene (PP)",
    color: "Clear",
  },
  "DLCLU": {
    name: "Clear Deli Container Lids Only, Polypropylene, 500pc (50/10)",
    price: 19.31,
    specialPrice: 19.31,
    palletTiHi: "8/4 (32cs)",
    caseCount: 500,
    packaging: "500pc (50/10)",
    category: "deli-containers",
    familyCategory: "deli-containers",
    productType: "Thin Clear Lid",
    image: "/images/clear-deli-container.jpg",
    sizeBadge: "Universal Lid",
    material: "Polypropylene (PP)",
    color: "Clear",
  },
  "DLC24": {
    name: "Clear Deli Container Cups 24 oz, Polypropylene, 500pc (25/20)",
    price: 36.17,
    specialPrice: 36.17,
    palletTiHi: "8/7 (56cs)",
    caseCount: 500,
    packaging: "500pc (25/20)",
    category: "deli-containers",
    familyCategory: "deli-containers",
    productType: "Thin Clear Cup",
    image: "/images/clear-deli-container.jpg",
    sizeBadge: "24 oz",
    material: "Polypropylene (PP)",
    color: "Clear",
  },
  "DLC32": {
    name: "Clear Deli Container Cups 32 oz, Polypropylene, 500pc (25/20)",
    price: 40.05,
    specialPrice: 40.05,
    palletTiHi: "8/4 (32cs)",
    caseCount: 500,
    packaging: "500pc (25/20)",
    category: "deli-containers",
    familyCategory: "deli-containers",
    productType: "Thin Clear Cup",
    image: "/images/clear-deli-container.jpg",
    sizeBadge: "32 oz",
    material: "Polypropylene (PP)",
    color: "Clear",
  }
};

// Update images and family categories on existing products
const updatedBaseProducts = existingProducts.map(p => {
  const deliOverride = DELI_ITEMS_MAP[p.sku];
  if (deliOverride) {
    const unitPrice = parseFloat((deliOverride.price / (deliOverride.caseCount || 500)).toFixed(3));
    const mrpPrice = parseFloat((deliOverride.price * 1.35).toFixed(2));
    return {
      ...p,
      name: deliOverride.name,
      category: "deli-containers",
      familyCategory: "deli-containers",
      productType: deliOverride.productType,
      sizeBadge: deliOverride.sizeBadge,
      image: deliOverride.image,
      price: deliOverride.price,
      specialPrice: deliOverride.specialPrice,
      mrpPrice,
      palletTiHi: deliOverride.palletTiHi,
      caseCount: deliOverride.caseCount,
      packaging: deliOverride.packaging,
      material: deliOverride.material,
      color: deliOverride.color,
      priceLabel: `$${deliOverride.price.toFixed(2)}`,
      description: `Commercial food service packaging SKU ${p.sku}: ${deliOverride.name}. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: ${deliOverride.palletTiHi}.`,
      features: [
        `Commercial case pack: ${deliOverride.packaging}`,
        `Pallet TI/HI: ${deliOverride.palletTiHi}`,
        `Material: ${deliOverride.material}`,
        `Restaurant wholesale direct pricing: $${deliOverride.price.toFixed(2)}/case`
      ],
      sizes: [
        {
          name: deliOverride.packaging,
          sku: p.sku,
          price: deliOverride.price,
          caseCount: deliOverride.caseCount,
          unitPrice,
          palletTiHi: deliOverride.palletTiHi,
          stockStatus: 'in_stock',
          image: deliOverride.image,
        }
      ]
    };
  }

  if (p.sku === 'STRAWCBOX') {
    const clearImage = '/images/clear-straw.jpg';
    return {
      ...p,
      name: '7.75x6mm Clear Straw (Box), 12000pc (500x24)',
      color: 'Clear',
      category: 'straws',
      familyCategory: 'straws',
      tags: ['straws', 'Clear Straw', 'Clear'],
      image: clearImage,
      description: '7.75x6mm Clear Drinking Straw (Box), 12,000 count (500x24). Commercial beverage straw for food service & takeout dining.',
      sizes: p.sizes ? p.sizes.map(s => ({
        ...s,
        image: clearImage,
      })) : [
        {
          name: '7.75x6mm Clear Straw (Box)',
          sku: 'STRAWCBOX',
          price: p.price,
          caseCount: 12000,
          unitPrice: parseFloat((p.price / 12000).toFixed(4)),
          palletTiHi: p.palletTiHi,
          stockStatus: 'in_stock',
          image: clearImage,
        }
      ]
    };
  }

  if (p.sku.startsWith('BGHW')) {
    const bagasseImage = '/images/bagasse-hinged-container.jpg';
    return {
      ...p,
      category: 'bagasse-hinged-containers',
      familyCategory: 'hinged-containers',
      productType: 'Bagasse',
      image: bagasseImage,
      sizes: p.sizes ? p.sizes.map(s => ({
        ...s,
        image: bagasseImage,
      })) : [
        {
          name: p.packaging || 'Standard Case',
          sku: p.sku,
          price: p.price,
          caseCount: p.sizes?.[0]?.caseCount || 200,
          unitPrice: parseFloat((p.price / (p.sizes?.[0]?.caseCount || 200)).toFixed(3)),
          palletTiHi: p.palletTiHi,
          stockStatus: 'in_stock',
          image: bagasseImage,
        }
      ]
    };
  }

  const updatedImage = resolveProductImage(p);
  return {
    ...p,
    image: updatedImage,
    sizes: p.sizes ? p.sizes.map(s => ({
      ...s,
      image: updatedImage,
    })) : [
      {
        name: p.packaging || 'Standard Case',
        sku: p.sku,
        price: p.price,
        caseCount: p.sizes?.[0]?.caseCount || 500,
        unitPrice: parseFloat((p.price / (p.sizes?.[0]?.caseCount || 500)).toFixed(3)),
        palletTiHi: p.palletTiHi,
        stockStatus: 'in_stock',
        image: updatedImage,
      }
    ]
  };
});

// Helper to create product object
function makeProduct(item) {
  const id = item.sku.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
  const unitPrice = parseFloat((item.price / (item.caseCount || 500)).toFixed(3));
  const mrpPrice = parseFloat((item.price * 1.35).toFixed(2));
  const img = item.image || resolveProductImage(item);
  const tags = ["Wholesale", "Commercial Grade", "Bakersfield Stock"];
  
  if (item.material && (item.material.includes("PP") || item.material.includes("Polypropylene"))) {
    tags.push("PP Plastic", "Microwave Safe");
  }
  if (item.material && item.material.includes("PET")) {
    tags.push("Crystal Clear PET", "Cold Ready");
  }
  if (item.material && item.material.includes("Bagasse")) {
    tags.push("PFAS Free", "Compostable", "Sugarcane");
  }
  if (item.material && item.material.includes("Paper")) {
    tags.push("Paperboard", "Insulated");
  }
  if (item.material && item.material.includes("Aluminum")) {
    tags.push("Oven Safe", "Aluminum Foil", "Catering");
  }

  return {
    id,
    sku: item.sku,
    name: item.name,
    category: item.category,
    familyCategory: item.familyCategory || item.category,
    subcategory: item.subcategory || item.material || "Standard",
    productType: item.productType || "Standard",
    sizeBadge: item.sizeBadge || (item.name.match(/\b\d+(\.\d+)?(oz|\"|x\d+|g)\b/i)?.[0] || ""),
    packaging: item.packaging || `${item.caseCount || 500}pc`,
    color: item.color || "Standard",
    compartments: item.compartments || (item.name.toLowerCase().includes("3-compartment") ? "3-Compartment" : item.name.toLowerCase().includes("2-compartment") ? "2-Compartment" : "1-Compartment"),
    discontinuing: !!item.discontinuing,
    priceLabel: `$${item.price.toFixed(2)}`,
    status: item.discontinuing ? "Discontinuing" : "Active",
    image: img,
    inStock: true,
    stockCount: 180 + ((item.sku.length * 37) % 300),
    rating: 4.8,
    reviewsCount: 32 + ((item.sku.length * 13) % 80),
    featured: false,
    bestSeller: !!item.specialPrice,
    ecoFriendly: !!(item.category.includes('bagasse') || (item.material && item.material.includes('Compostable'))),
    tags,
    description: `Commercial food service packaging SKU ${item.sku}: ${item.name}. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: ${item.palletTiHi}.`,
    features: [
      `Commercial case pack: ${item.packaging || `${item.caseCount}pc`}`,
      `Pallet TI/HI: ${item.palletTiHi}`,
      `Material: ${item.material || 'Commercial Foodservice Grade'}`,
      `Restaurant wholesale direct pricing: $${item.price.toFixed(2)}/case`
    ],
    material: item.material || "Commercial Grade Polypropylene",
    palletTiHi: item.palletTiHi,
    price: item.price,
    specialPrice: item.specialPrice || null,
    mrpPrice,
    sizes: [
      {
        name: `Case (${item.caseCount || 500} pcs)`,
        sku: item.sku,
        price: item.price,
        caseCount: item.caseCount || 500,
        unitPrice,
        palletTiHi: item.palletTiHi,
        stockStatus: "in_stock",
        image: img,
      }
    ],
    relatedProductIds: []
  };
}

// 3. New missing products from PDF 2 and PDF 1
const newProductsData = [
  // PDF 2 Page 1: Thermoformed Round Bowls
  {
    sku: "TFRDB16",
    name: '16oz Round Black Microwaveable Bowl with Vented Clear Lid, 120 Sets (40/6)',
    category: "round-containers",
    familyCategory: "round-containers",
    price: 18.05,
    specialPrice: 18.05,
    palletTiHi: "14/4 (56cs)",
    caseCount: 120,
    packaging: "120 Sets (40/6)",
    material: "PP Plastic · Microwaveable · 120 Sets",
    color: "Black"
  },
  {
    sku: "TFRDB20",
    name: '20oz Round Black Microwaveable Bowl with Vented Clear Lid, 120 Sets (40/6)',
    category: "round-containers",
    familyCategory: "round-containers",
    price: 19.35,
    specialPrice: 19.35,
    palletTiHi: "14/4 (56cs)",
    caseCount: 120,
    packaging: "120 Sets (40/6)",
    material: "PP Plastic · Microwaveable · 120 Sets",
    color: "Black"
  },
  {
    sku: "TFRDB24",
    name: '24oz Round Black Microwaveable Bowl with Vented Clear Lid, 120 Sets (40/6)',
    category: "round-containers",
    familyCategory: "round-containers",
    price: 20.65,
    specialPrice: 20.65,
    palletTiHi: "14/4 (56cs)",
    caseCount: 120,
    packaging: "120 Sets (40/6)",
    material: "PP Plastic · Microwaveable · 120 Sets",
    color: "Black"
  },
  {
    sku: "M24BL",
    name: '24oz Heavy Duty Black Round Microwaveable Bowl with Clear Vented Lid, 120 Sets (40/6)',
    category: "round-containers",
    familyCategory: "round-containers",
    price: 23.25,
    palletTiHi: "14/3 (50cs)",
    caseCount: 120,
    packaging: "120 Sets (40/6)",
    material: "Heavy Duty PP · Microwaveable · 120 Sets",
    color: "Black"
  },

  // PDF 2 Page 1: Combo Deli Containers
  {
    sku: "SDLH8",
    name: '8oz PP Deli Container, 240 Sets (24/20)',
    category: "deli-containers",
    familyCategory: "deli-containers",
    productType: "Combo Set",
    image: "/images/pp-deli-container.jpg",
    price: 19.35,
    specialPrice: 19.35,
    palletTiHi: "8/8 (64cs)",
    caseCount: 240,
    packaging: "240 Sets (24/20)",
    material: "Polypropylene (PP)",
    color: "Translucent"
  },
  {
    sku: "SDLH16",
    name: '16oz PP Deli Container, 240 Sets (24/20)',
    category: "deli-containers",
    familyCategory: "deli-containers",
    productType: "Combo Set",
    image: "/images/pp-deli-container.jpg",
    price: 21.95,
    specialPrice: 21.95,
    palletTiHi: "8/7 (56cs)",
    caseCount: 240,
    packaging: "240 Sets (24/20)",
    material: "Polypropylene (PP)",
    color: "Translucent"
  },
  {
    sku: "SDLH32",
    name: '32oz PP Deli Container, 240 Sets (24/20)',
    category: "deli-containers",
    familyCategory: "deli-containers",
    productType: "Combo Set",
    image: "/images/pp-deli-container.jpg",
    price: 28.45,
    specialPrice: 28.45,
    palletTiHi: "8/5 (40cs)",
    caseCount: 240,
    packaging: "240 Sets (24/20)",
    material: "Polypropylene (PP)",
    color: "Translucent"
  },

  // PDF 2 Page 2: Rectangular Containers Regular
  {
    sku: "RC16",
    name: '16oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6)',
    category: "rectangular-containers",
    familyCategory: "rectangular-containers",
    price: 26.85,
    palletTiHi: "15/6 (90cs)",
    caseCount: 150,
    packaging: "150 Sets (50/6)",
    material: "Polypropylene (PP) · 150 Sets",
    color: "Black with Clear Lid"
  },
  {
    sku: "RC24",
    name: '24oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6)',
    category: "rectangular-containers",
    familyCategory: "rectangular-containers",
    price: 28.73,
    palletTiHi: "15/5 (75cs)",
    caseCount: 150,
    packaging: "150 Sets (50/6)",
    material: "Polypropylene (PP) · 150 Sets",
    color: "Black with Clear Lid"
  },
  {
    sku: "RC28",
    name: '28oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6)',
    category: "rectangular-containers",
    familyCategory: "rectangular-containers",
    price: 36.91,
    palletTiHi: "10/5 (50cs)",
    caseCount: 150,
    packaging: "150 Sets (50/6)",
    material: "Polypropylene (PP) · 150 Sets",
    color: "Black with Clear Lid"
  },
  {
    sku: "RC32",
    name: '32oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6)',
    category: "rectangular-containers",
    familyCategory: "rectangular-containers",
    price: 39.72,
    palletTiHi: "10/4 (40cs)",
    caseCount: 150,
    packaging: "150 Sets (50/6)",
    material: "Polypropylene (PP) · 150 Sets",
    color: "Black with Clear Lid"
  },
  {
    sku: "RC38",
    name: '38oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6)',
    category: "rectangular-containers",
    familyCategory: "rectangular-containers",
    price: 40.60,
    palletTiHi: "10/4 (40cs)",
    caseCount: 150,
    packaging: "150 Sets (50/6)",
    material: "Polypropylene (PP) · 150 Sets",
    color: "Black with Clear Lid"
  },

  // PDF 2 Page 2: Rectangular Containers Shallow
  {
    sku: "SRC12",
    name: '12oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6)',
    category: "rectangular-containers",
    familyCategory: "rectangular-containers",
    price: 18.61,
    palletTiHi: "20/8 (160cs)",
    caseCount: 150,
    packaging: "150 Sets (50/6)",
    material: "Polypropylene (PP) · 150 Sets",
    color: "Black with Clear Lid"
  },
  {
    sku: "SRC16",
    name: '16oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6)',
    category: "rectangular-containers",
    familyCategory: "rectangular-containers",
    price: 23.56,
    palletTiHi: "15/7 (105cs)",
    caseCount: 150,
    packaging: "150 Sets (50/6)",
    material: "Polypropylene (PP) · 150 Sets",
    color: "Black with Clear Lid"
  },
  {
    sku: "SRC24",
    name: '24oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6)',
    category: "rectangular-containers",
    familyCategory: "rectangular-containers",
    price: 26.86,
    palletTiHi: "15/7 (105cs)",
    caseCount: 150,
    packaging: "150 Sets (50/6)",
    material: "Polypropylene (PP) · 150 Sets",
    color: "Black with Clear Lid"
  },
  {
    sku: "SRC28",
    name: '28oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6), Lids Compatible with SRC32 and SRC38T',
    category: "rectangular-containers",
    familyCategory: "rectangular-containers",
    price: 28.69,
    palletTiHi: "10/7 (70cs)",
    caseCount: 150,
    packaging: "150 Sets (50/6)",
    material: "Polypropylene (PP) · 150 Sets",
    color: "Black with Clear Lid"
  },
  {
    sku: "SRC32",
    name: '32oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6), Lids Compatible with SRC28 and SRC38T',
    category: "rectangular-containers",
    familyCategory: "rectangular-containers",
    price: 29.21,
    palletTiHi: "10/7 (70cs)",
    caseCount: 150,
    packaging: "150 Sets (50/6)",
    material: "Polypropylene (PP) · 150 Sets",
    color: "Black with Clear Lid"
  },
  {
    sku: "SRC38T",
    name: '38oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6), Lids Compatible with SRC28 and SRC32',
    category: "rectangular-containers",
    familyCategory: "rectangular-containers",
    price: 36.01,
    palletTiHi: "10/7 (70cs)",
    caseCount: 150,
    packaging: "150 Sets (50/6)",
    material: "Polypropylene (PP) · 150 Sets",
    color: "Black with Clear Lid"
  },
  {
    sku: "SRC38",
    name: '38oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6)',
    category: "rectangular-containers",
    familyCategory: "rectangular-containers",
    price: 36.01,
    palletTiHi: "10/7 (70cs)",
    caseCount: 150,
    packaging: "150 Sets (50/6)",
    material: "Polypropylene (PP) · 150 Sets",
    color: "Black with Clear Lid"
  },
  {
    sku: "SRC58",
    name: '58oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6)',
    category: "rectangular-containers",
    familyCategory: "rectangular-containers",
    price: 62.97,
    palletTiHi: "6/6 (36cs)",
    caseCount: 150,
    packaging: "150 Sets (50/6)",
    material: "Polypropylene (PP) · 150 Sets",
    color: "Black with Clear Lid"
  },

  // PDF 2 Page 2: Compartmental Containers
  {
    sku: "W203",
    name: '2-pc Black PP Container with Translucent Lid, 9.5" x 7.5", 3-Compartment, 150 Sets (50/6)',
    category: "shallow-compartmental-containers",
    familyCategory: "shallow-compartmental-containers",
    price: 33.91,
    palletTiHi: "8/7 (56cs)",
    caseCount: 150,
    packaging: "150 Sets (50/6)",
    material: "PP Black Tray with Translucent Lid",
    color: "Black / Translucent",
    compartments: "3-Compartment"
  },
  {
    sku: "W204",
    name: '2-pc Black PP Container, 10.5" x 8", 4-Compartment, 100 Sets (50/4)',
    category: "shallow-compartmental-containers",
    familyCategory: "shallow-compartmental-containers",
    price: 33.91,
    palletTiHi: "9/4 (36cs)",
    caseCount: 100,
    packaging: "100 Sets (50/4)",
    material: "PP Black Tray with Translucent Lid",
    color: "Black / Translucent",
    compartments: "4-Compartment"
  },
  {
    sku: "W205",
    name: '2-pc Black PP Container, 10.5" x 8", 5-Compartment, 100 Sets (50/4)',
    category: "shallow-compartmental-containers",
    familyCategory: "shallow-compartmental-containers",
    price: 42.49,
    palletTiHi: "9/4 (36cs)",
    caseCount: 100,
    packaging: "100 Sets (50/4)",
    material: "PP Black Tray with Translucent Lid",
    color: "Black / Translucent",
    compartments: "5-Compartment"
  },
  {
    sku: "RCT339",
    name: '39oz Rectangular Microwaveable Container with Lid 3-compartment, 150 Sets (50/6)',
    category: "shallow-compartmental-containers",
    familyCategory: "shallow-compartmental-containers",
    price: 52.58,
    palletTiHi: "8/6 (48cs)",
    caseCount: 150,
    packaging: "150 Sets (50/6)",
    material: "Polypropylene (PP)",
    color: "Black with Clear Lid",
    compartments: "3-Compartment"
  },
  {
    sku: "TY-R345",
    name: '45oz Round Microwaveable Container with Lid 3-compartment, 150 Sets (50/6) **Discontinuing',
    category: "shallow-compartmental-containers",
    familyCategory: "shallow-compartmental-containers",
    price: 25.85,
    specialPrice: 25.85,
    palletTiHi: "6/5 (30cs)",
    caseCount: 150,
    packaging: "150 Sets (50/6)",
    material: "Polypropylene (PP)",
    color: "Black with Clear Lid",
    compartments: "3-Compartment",
    discontinuing: true
  },

  // PDF 1 Page 3: Salad Plates
  {
    sku: "SALAD-AS",
    name: 'Salad Plate 230mm AS, 100 Sets',
    category: "food-trays-plates",
    familyCategory: "food-trays-plates",
    price: 27.30,
    palletTiHi: "8/6 (48cs)",
    caseCount: 100,
    packaging: "100 Sets",
    material: "Clear Rigid Plastic · 100 Sets",
    color: "Clear"
  },
  {
    sku: "SALAD-BL",
    name: 'Salad Plate 230mm BL, 100 Sets',
    category: "food-trays-plates",
    familyCategory: "food-trays-plates",
    price: 29.90,
    palletTiHi: "8/6 (48cs)",
    caseCount: 100,
    packaging: "100 Sets",
    material: "Black Rigid Plastic · 100 Sets",
    color: "Black"
  },

  // PDF 1 Page 3: Plastic Soup Cups & Lids (DA series)
  {
    sku: "DA-8OZ",
    name: '8 OZ Plastic Food Container with Lid (Soup Cup), 240 Sets',
    category: "soup-containers",
    familyCategory: "soup-containers",
    price: 22.10,
    palletTiHi: "8/6 (48cs)",
    caseCount: 240,
    packaging: "240 Sets / CTN",
    material: "PP Plastic · 240 Sets",
    color: "Translucent"
  },
  {
    sku: "DA-12OZ",
    name: '12 OZ Plastic Food Container with Lid (Soup Cup), 240 Sets',
    category: "soup-containers",
    familyCategory: "soup-containers",
    price: 23.40,
    palletTiHi: "8/6 (48cs)",
    caseCount: 240,
    packaging: "240 Sets / CTN",
    material: "PP Plastic · 240 Sets",
    color: "Translucent"
  },
  {
    sku: "DA-16OZ",
    name: '16 OZ Plastic Food Container with Lid (Soup Cup), 240 Sets',
    category: "soup-containers",
    familyCategory: "soup-containers",
    price: 24.70,
    palletTiHi: "8/6 (48cs)",
    caseCount: 240,
    packaging: "240 Sets / CTN",
    material: "PP Plastic · 240 Sets",
    color: "Translucent"
  },
  {
    sku: "DA-24OZ",
    name: '24 OZ Plastic Food Container with Lid (Soup Cup), 240 Sets',
    category: "soup-containers",
    familyCategory: "soup-containers",
    price: 28.60,
    palletTiHi: "8/5 (40cs)",
    caseCount: 240,
    packaging: "240 Sets / CTN",
    material: "PP Plastic · 240 Sets",
    color: "Translucent"
  },
  {
    sku: "DA-32OZ",
    name: '32 OZ Plastic Food Container with Lid (Soup Cup), 240 Sets',
    category: "soup-containers",
    familyCategory: "soup-containers",
    price: 34.45,
    palletTiHi: "8/5 (40cs)",
    caseCount: 240,
    packaging: "240 Sets / CTN",
    material: "PP Plastic · 240 Sets",
    color: "Translucent"
  },

  // PDF 1 Page 8 & 9: Paper Soup Containers & Lids (CDA series)
  {
    sku: "CDA05",
    name: '5 OZ White Paper Soup Container, 500pc (50/10)',
    category: "soup-containers",
    familyCategory: "soup-containers",
    price: 23.40,
    palletTiHi: "8/6 (48cs)",
    caseCount: 500,
    packaging: "500pc (50/10)",
    material: "Poly-Coated White Paperboard"
  },
  {
    sku: "CDA08",
    name: '8 OZ White Paper Soup Container, 500pc (50/10)',
    category: "soup-containers",
    familyCategory: "soup-containers",
    price: 24.99,
    palletTiHi: "8/6 (48cs)",
    caseCount: 500,
    packaging: "500pc (50/10)",
    material: "Poly-Coated White Paperboard"
  },
  {
    sku: "CDA12",
    name: '12 OZ White Paper Soup Container, 500pc (50/10)',
    category: "soup-containers",
    familyCategory: "soup-containers",
    price: 27.30,
    palletTiHi: "8/5 (40cs)",
    caseCount: 500,
    packaging: "500pc (50/10)",
    material: "Poly-Coated White Paperboard"
  },
  {
    sku: "CDA16",
    name: '16 OZ White Paper Soup Container, 500pc (50/10)',
    category: "soup-containers",
    familyCategory: "soup-containers",
    price: 29.90,
    palletTiHi: "8/5 (40cs)",
    caseCount: 500,
    packaging: "500pc (50/10)",
    material: "Poly-Coated White Paperboard"
  },
  {
    sku: "CDA32",
    name: '32 OZ White Paper Soup Container, 500pc (50/10)',
    category: "soup-containers",
    familyCategory: "soup-containers",
    price: 48.10,
    palletTiHi: "6/5 (30cs)",
    caseCount: 500,
    packaging: "500pc (50/10)",
    material: "Poly-Coated White Paperboard"
  },
  {
    sku: "CDA98",
    name: '98mm Paper Vented Lid (Fit 8oz-16oz), 500pc (50/10)',
    category: "soup-containers",
    familyCategory: "soup-containers",
    price: 27.30,
    palletTiHi: "8/8 (64cs)",
    caseCount: 500,
    packaging: "500pc (50/10)",
    material: "Vented Paperboard Lid"
  },
  {
    sku: "CDA115",
    name: '115mm Paper Vented Lid (Fit 32oz), 500pc (50/10)',
    category: "soup-containers",
    familyCategory: "soup-containers",
    price: 33.80,
    palletTiHi: "8/7 (56cs)",
    caseCount: 500,
    packaging: "500pc (50/10)",
    material: "Vented Paperboard Lid"
  },
  {
    sku: "CDA98PP",
    name: '98mm PP Flat Lid (Fit 8oz-16oz), 500pc (50/10)',
    category: "soup-containers",
    familyCategory: "soup-containers",
    price: 20.80,
    palletTiHi: "8/8 (64cs)",
    caseCount: 500,
    packaging: "500pc (50/10)",
    material: "Clear Polypropylene (PP)"
  },

  // PDF 1 Page 4 & 5: Cutlery
  {
    sku: "PP2.5G-WHT-FORK",
    name: 'PP2.5g White Fork, 1000 Bulk (100x10)',
    category: "cutlery",
    familyCategory: "cutlery",
    price: 8.12,
    palletTiHi: "10/8 (80cs)",
    caseCount: 1000,
    packaging: "1000pc (100/10)",
    material: "Polypropylene (PP)",
    color: "White"
  },
  {
    sku: "PP2.5G-WHT-TSPOON",
    name: 'PP2.5g White Tea Spoon, 1000 Bulk (100x10)',
    category: "cutlery",
    familyCategory: "cutlery",
    price: 8.12,
    palletTiHi: "10/8 (80cs)",
    caseCount: 1000,
    packaging: "1000pc (100/10)",
    material: "Polypropylene (PP)",
    color: "White"
  },
  {
    sku: "PP2.5G-WHT-SPOON",
    name: 'PP2.5g White Soup Spoon, 1000 Bulk (100x10)',
    category: "cutlery",
    familyCategory: "cutlery",
    price: 8.12,
    palletTiHi: "10/8 (80cs)",
    caseCount: 1000,
    packaging: "1000pc (100/10)",
    material: "Polypropylene (PP)",
    color: "White"
  },
  {
    sku: "PP5.4G-WRP-BLK",
    name: 'PP5.4g Individually Wrapped Black Plastic Fork (Heavy Weight), 500 Pcs',
    category: "cutlery",
    familyCategory: "cutlery",
    price: 19.00,
    palletTiHi: "10/6 (60cs)",
    caseCount: 500,
    packaging: "500 Pcs",
    material: "Heavy Weight PP Plastic",
    color: "Black"
  },
  {
    sku: "PP5.4G-WRP-BLK-1000",
    name: 'PP5.4g Individually Wrapped Black Plastic Fork (Heavy Weight), 1000 Pcs',
    category: "cutlery",
    familyCategory: "cutlery",
    price: 20.15,
    palletTiHi: "8/6 (48cs)",
    caseCount: 1000,
    packaging: "1000 Pcs",
    material: "Heavy Weight PP Plastic",
    color: "Black"
  },
  {
    sku: "PP5.4G-WRP-WHT-1000",
    name: 'PP5.4g Individually Wrapped White Plastic Fork (Heavy Weight), 1000 Pcs',
    category: "cutlery",
    familyCategory: "cutlery",
    price: 20.15,
    palletTiHi: "8/6 (48cs)",
    caseCount: 1000,
    packaging: "1000 Pcs",
    material: "Heavy Weight PP Plastic",
    color: "White"
  },

  // PDF 1 Page 5: Round Plastic Cups (RC)
  {
    sku: "RC08CUP",
    name: 'RC08 Cup Only, 12.2g, 500 Cups',
    category: "pet-cups",
    familyCategory: "pet-cups",
    price: 22.10,
    palletTiHi: "8/6 (48cs)",
    caseCount: 500,
    packaging: "500 Cups",
    material: "Rigid Plastic"
  },
  {
    sku: "RC16CUP",
    name: 'RC16 Cup Only, 16g, 500 Cups',
    category: "pet-cups",
    familyCategory: "pet-cups",
    price: 23.40,
    palletTiHi: "8/6 (48cs)",
    caseCount: 500,
    packaging: "500 Cups",
    material: "Rigid Plastic"
  },
  {
    sku: "RCLIDS",
    name: 'RC Lids Matching RC08 and RC16, 500 Lids',
    category: "pet-cup-lids",
    familyCategory: "pet-cup-lids",
    price: 13.00,
    palletTiHi: "10/8 (80cs)",
    caseCount: 500,
    packaging: "500 Lids",
    material: "Clear Plastic"
  },

  // PDF 1 Page 5 & 6: Additional Cold PET Cups & Lids
  {
    sku: "PET7",
    name: '78mm 7oz Clear PET Cup, 1000pc (50/20)',
    category: "pet-cups",
    familyCategory: "pet-cups",
    price: 27.30,
    palletTiHi: "8/5 (40cs)",
    caseCount: 1000,
    packaging: "1000pc (50/20)",
    material: "Crystal Clear PET · 78mm"
  },
  {
    sku: "PET9",
    name: '90mm 9oz Clear PET Cup, 1000pc (50/20)',
    category: "pet-cups",
    familyCategory: "pet-cups",
    price: 35.10,
    palletTiHi: "8/5 (40cs)",
    caseCount: 1000,
    packaging: "1000pc (50/20)",
    material: "Crystal Clear PET · 90mm"
  },
  {
    sku: "PET-U12",
    name: '90mm 12oz U-Shape PET Cup, 1000pc (50/20)',
    category: "pet-cups",
    familyCategory: "pet-cups",
    price: 35.10,
    palletTiHi: "8/5 (40cs)",
    caseCount: 1000,
    packaging: "1000pc (50/20)",
    material: "Crystal Clear PET · 90mm U-Shape"
  },
  {
    sku: "PET-U16",
    name: '90mm 16oz U-Shape PET Cup, 1000pc (50/20)',
    category: "pet-cups",
    familyCategory: "pet-cups",
    price: 37.70,
    palletTiHi: "8/5 (40cs)",
    caseCount: 1000,
    packaging: "1000pc (50/20)",
    material: "Crystal Clear PET · 90mm U-Shape"
  },
  {
    sku: "PET-16COL",
    name: '98mm 16oz Assorted Color PET Cups (Yellow, Green, Blue, Pink, Orange, Red), 1000pc (50/20)',
    category: "pet-cups",
    familyCategory: "pet-cups",
    price: 62.40,
    palletTiHi: "6/4 (24cs)",
    caseCount: 1000,
    packaging: "1000pc (50/20)",
    material: "Vibrant Colored PET · 98mm"
  },
  {
    sku: "PETNODOME",
    name: '78mm No Hole Dome Lid, 1000pc (50/20)',
    category: "pet-cup-lids",
    familyCategory: "pet-cup-lids",
    price: 24.99,
    palletTiHi: "12/5 (60cs)",
    caseCount: 1000,
    packaging: "1000pc (50/20)",
    material: "Crystal Clear PET · 78mm"
  },
  {
    sku: "PET-UFLAT",
    name: '90mm Flat Lid, 1000pc (50/20)',
    category: "pet-cup-lids",
    familyCategory: "pet-cup-lids",
    price: 24.99,
    palletTiHi: "12/5 (60cs)",
    caseCount: 1000,
    packaging: "1000pc (50/20)",
    material: "Crystal Clear PET · 90mm"
  },
  {
    sku: "PET-UNO",
    name: '90mm Flat No Hole Lid, 1000pc (50/20)',
    category: "pet-cup-lids",
    familyCategory: "pet-cup-lids",
    price: 24.99,
    palletTiHi: "12/5 (60cs)",
    caseCount: 1000,
    packaging: "1000pc (50/20)",
    material: "Crystal Clear PET · 90mm"
  },
  {
    sku: "PETWDOME",
    name: '98mm Wide Hole Dome Lid, 1000pc (50/20)',
    category: "pet-cup-lids",
    familyCategory: "pet-cup-lids",
    price: 24.99,
    palletTiHi: "11/4 (44cs)",
    caseCount: 1000,
    packaging: "1000pc (50/20)",
    material: "Crystal Clear PET · 98mm"
  },
  {
    sku: "PETSIP",
    name: '98mm Sip Lid, 1000pc (100/10)',
    category: "pet-cup-lids",
    familyCategory: "pet-cup-lids",
    price: 39.99,
    palletTiHi: "10/6 (60cs)",
    caseCount: 1000,
    packaging: "1000pc (100/10)",
    material: "Crystal Clear PET · 98mm Sip"
  },

  // PDF 1 Page 7: Straws
  {
    sku: "STRAWC",
    name: '7.75x6mm Clear Straw, 12000pc (500x24)',
    category: "straws",
    familyCategory: "straws",
    price: 39.00,
    palletTiHi: "8/5 (40cs)",
    caseCount: 12000,
    packaging: "12000pc (500/24)",
    material: "Food Grade Polypropylene",
    color: "Clear",
    image: "/images/clear-straw.jpg"
  },
  {
    sku: "STRAWB3-CLR",
    name: '9x12mm Color Giant Straw, 1600pc (200x8)',
    category: "straws",
    familyCategory: "straws",
    price: 27.30,
    palletTiHi: "8/6 (48cs)",
    caseCount: 1600,
    packaging: "1600pc (200/8)",
    material: "Food Grade Polypropylene",
    color: "Assorted Colors",
    image: "/images/color-straw.jpg"
  },

  // PDF 1 Page 7 & 8: Hot Paper Cups & Lids
  {
    sku: "PAPER04",
    name: '4oz Single Wall Paper Cup, White, 1000pc (50/20)',
    category: "paper-cups",
    familyCategory: "paper-cups",
    price: 27.30,
    palletTiHi: "10/6 (60cs)",
    caseCount: 1000,
    packaging: "1000pc (50/20)",
    material: "Insulated Paperboard"
  },
  {
    sku: "PAPER06",
    name: '6oz Single Wall Paper Cup, White, 1000pc (50/20)',
    category: "paper-cups",
    familyCategory: "paper-cups",
    price: 31.20,
    palletTiHi: "10/5 (50cs)",
    caseCount: 1000,
    packaging: "1000pc (50/20)",
    material: "Insulated Paperboard"
  },
  {
    sku: "PASW12-COFFEE",
    name: 'Coffee Print Paper Cup 12oz, 1000pc (50/20)',
    category: "paper-cups",
    familyCategory: "paper-cups",
    price: 45.50,
    palletTiHi: "6/4 (24cs)",
    caseCount: 1000,
    packaging: "1000pc (50/20)",
    material: "Premium Printed Paperboard"
  },
  {
    sku: "PASW16-COFFEE",
    name: 'Coffee Print Paper Cup 16oz, 1000pc (50/20)',
    category: "paper-cups",
    familyCategory: "paper-cups",
    price: 49.40,
    palletTiHi: "6/4 (24cs)",
    caseCount: 1000,
    packaging: "1000pc (50/20)",
    material: "Premium Printed Paperboard"
  },
  {
    sku: "PASW20-COFFEE",
    name: 'Coffee Print Paper Cup 20oz, 500pc (50/10)',
    category: "paper-cups",
    familyCategory: "paper-cups",
    price: 36.40,
    palletTiHi: "6/4 (24cs)",
    caseCount: 500,
    packaging: "500pc (50/10)",
    material: "Premium Printed Paperboard"
  },
  {
    sku: "PAPERCUPLID80",
    name: '80mm Black Paper Cup Lid (Fit 8oz), 1000pc (50/20)',
    category: "paper-cup-lids-sleeves",
    familyCategory: "paper-cup-lids-sleeves",
    price: 24.70,
    palletTiHi: "12/5 (60cs)",
    caseCount: 1000,
    packaging: "1000pc (50/20)",
    material: "Polypropylene (PP)"
  },
  {
    sku: "PAPERCUPLID90",
    name: '90mm Black Paper Cup Lid (Fit 10-20oz), 1000pc (50/20)',
    category: "paper-cup-lids-sleeves",
    familyCategory: "paper-cup-lids-sleeves",
    price: 27.30,
    palletTiHi: "12/4 (48cs)",
    caseCount: 1000,
    packaging: "1000pc (50/20)",
    material: "Polypropylene (PP)"
  },

  // PDF 1 Page 13 & 15: Napkins
  {
    sku: "NAPKIN-3PLY",
    name: 'Bright White 3-Ply Dinner Napkins, 15" x 17", Premium Case',
    category: "napkins",
    familyCategory: "napkins",
    price: 54.00,
    palletTiHi: "8/4 (32cs)",
    caseCount: 2000,
    packaging: '3-Ply 15"x17"',
    material: "100% Virgin Fiber Paper"
  },
  {
    sku: "CP-DN3000",
    name: 'Dinner Napkin 2-Ply 16.35" x 13.86", 3000pc',
    category: "napkins",
    familyCategory: "napkins",
    price: 40.76,
    palletTiHi: "8/4 (32cs)",
    caseCount: 3000,
    packaging: '2-Ply 16.35"x13.86"',
    material: "Soft Absorbent Paper"
  },
  {
    sku: "DN-3000-1517",
    name: 'Dinner Napkin 2-Ply 15" x 17", 3000pc',
    category: "napkins",
    familyCategory: "napkins",
    price: 46.17,
    palletTiHi: "8/4 (32cs)",
    caseCount: 3000,
    packaging: '2-Ply 15"x17"',
    material: "Soft Absorbent Paper"
  },
  {
    sku: "NAPKIN-INTERFOLD",
    name: 'Dispenser Interfold Napkins 1/2 2-Ply 6.3" x 8.3"',
    category: "napkins",
    familyCategory: "napkins",
    price: 30.99,
    palletTiHi: "8/5 (40cs)",
    caseCount: 6000,
    packaging: '2-Ply 6.3"x8.3"',
    material: "Dispenser Paper Napkin"
  },
  {
    sku: "NAPKIN-BEV",
    name: 'White Beverage Napkin 1-Ply 9.05" x 9.05"',
    category: "napkins",
    familyCategory: "napkins",
    price: 20.00,
    palletTiHi: "8/6 (48cs)",
    caseCount: 4000,
    packaging: '1-Ply 9.05"x9.05"',
    material: "Embossed Paper"
  },
  {
    sku: "TFN-10000",
    name: 'TFN-10000 Tall Fold Napkin 1-Ply 13.11" x 6.38", 10,000pc',
    category: "napkins",
    familyCategory: "napkins",
    price: 29.70,
    palletTiHi: "6/5 (30cs)",
    caseCount: 10000,
    packaging: "10,000pc Case",
    material: "Dispenser Paper Napkin"
  },

  // PDF 1 Page 11, 12, 13, 15: Bags (Kraft, Brown & Plastic)
  {
    sku: "BAG#14",
    name: '#14 Kraft Paper Bag with Handles - 14x10x15.5, 250pcs',
    category: "bags",
    familyCategory: "bags",
    price: 39.99,
    palletTiHi: "8/4 (32cs)",
    caseCount: 250,
    packaging: "250pcs",
    material: "Heavy Natural Kraft Paper"
  },
  {
    sku: "BAG-BRN-2",
    name: '#2 Brown Paper Grocery Bag - 4x8, 500pc',
    category: "bags",
    familyCategory: "bags",
    price: 13.99,
    palletTiHi: "12/6 (72cs)",
    caseCount: 500,
    packaging: "500pc",
    material: "Natural Brown Kraft Paper"
  },
  {
    sku: "BAG-BRN-4",
    name: '#4 Brown Paper Grocery Bag - 5x9, 500pc',
    category: "bags",
    familyCategory: "bags",
    price: 14.99,
    palletTiHi: "12/6 (72cs)",
    caseCount: 500,
    packaging: "500pc",
    material: "Natural Brown Kraft Paper"
  },
  {
    sku: "BAG-BRN-6",
    name: '#6 Brown Paper Grocery Bag - 6x11, 500pc',
    category: "bags",
    familyCategory: "bags",
    price: 15.99,
    palletTiHi: "10/5 (50cs)",
    caseCount: 500,
    packaging: "500pc",
    material: "Natural Brown Kraft Paper"
  },
  {
    sku: "BAG-BRN-12",
    name: '#12 Brown Paper Grocery Bag - 7x14, 500pc',
    category: "bags",
    familyCategory: "bags",
    price: 25.99,
    palletTiHi: "8/5 (40cs)",
    caseCount: 500,
    packaging: "500pc",
    material: "Natural Brown Kraft Paper"
  },
  {
    sku: "BAG-BRN-420",
    name: '#420 Brown Paper Grocery Bag - 8x16, 500pc',
    category: "bags",
    familyCategory: "bags",
    price: 31.99,
    palletTiHi: "8/4 (32cs)",
    caseCount: 500,
    packaging: "500pc",
    material: "Natural Brown Kraft Paper"
  },
  {
    sku: "BAG-TY-10X5X19",
    name: '10x5x19 White Plastic Thank You Bag, 740 PC',
    category: "bags",
    familyCategory: "bags",
    price: 16.99,
    palletTiHi: "10/6 (60cs)",
    caseCount: 740,
    packaging: "740 PC",
    material: "HDPE Plastic"
  },
  {
    sku: "BAG-TY-10.5X6X20",
    name: '10.5x6x20 White Plastic Thank You Bag, 740 PC',
    category: "bags",
    familyCategory: "bags",
    price: 17.99,
    palletTiHi: "10/6 (60cs)",
    caseCount: 740,
    packaging: "740 PC",
    material: "HDPE Plastic"
  },
  {
    sku: "BAG-TY-12X7X22-1000",
    name: '12x7x22 White Plastic Thank You Bag, 1000 PC',
    category: "bags",
    familyCategory: "bags",
    price: 26.99,
    palletTiHi: "8/5 (40cs)",
    caseCount: 1000,
    packaging: "1000 PC",
    material: "HDPE Plastic"
  },
  {
    sku: "BAG-TY-12X7X22-400",
    name: '12x7x22 White Plastic Thank You Bag, 400 PC 17 MIC',
    category: "bags",
    familyCategory: "bags",
    price: 11.99,
    palletTiHi: "12/6 (72cs)",
    caseCount: 400,
    packaging: "400 PC 17 MIC",
    material: "HDPE Plastic · 17 MIC"
  },
  {
    sku: "BAG-TY-12X7X22-300",
    name: '12x7x22 White Plastic Thank You Bag, 300 PC 23 MIC',
    category: "bags",
    familyCategory: "bags",
    price: 10.99,
    palletTiHi: "12/6 (72cs)",
    caseCount: 300,
    packaging: "300 PC 23 MIC",
    material: "HDPE Plastic · 23 MIC"
  },
  {
    sku: "BAG-TY-11.5X6.5X21.5",
    name: '11.5x6.5x21.5 White Plastic Thank You Bag, 1000 PC 13 MIC',
    category: "bags",
    familyCategory: "bags",
    price: 20.99,
    palletTiHi: "8/5 (40cs)",
    caseCount: 1000,
    packaging: "1000 PC 13 MIC",
    material: "HDPE Plastic · 13 MIC"
  },
  {
    sku: "BAG-TY-6X4X15",
    name: '6x4x15 White Plastic Thank You Bag, 1000 PC',
    category: "bags",
    familyCategory: "bags",
    price: 9.99,
    palletTiHi: "12/6 (72cs)",
    caseCount: 1000,
    packaging: "1000 PC",
    material: "HDPE Plastic"
  },
  {
    sku: "BAG-TY-6X4X15-WARN",
    name: '6x4x15 White Plastic Thank You Bag (Warning Print), 1000 PC',
    category: "bags",
    familyCategory: "bags",
    price: 8.99,
    palletTiHi: "12/6 (72cs)",
    caseCount: 1000,
    packaging: "1000 PC",
    material: "HDPE Plastic"
  },
  {
    sku: "BAG-LD-18X24-12",
    name: 'LD Clear Bag 18x24, 400 PC, 1.2 MIL',
    category: "bags",
    familyCategory: "bags",
    price: 28.35,
    palletTiHi: "8/5 (40cs)",
    caseCount: 400,
    packaging: "400 PC 1.2 MIL",
    material: "Low-Density Polyethylene (LDPE)"
  },
  {
    sku: "BAG-LD-18X24-14",
    name: 'LD Clear Bag 18x24, 400 PC, 1.4 MIL',
    category: "bags",
    familyCategory: "bags",
    price: 35.99,
    palletTiHi: "8/5 (40cs)",
    caseCount: 400,
    packaging: "400 PC 1.4 MIL",
    material: "Low-Density Polyethylene (LDPE)"
  },
  {
    sku: "BAG-LD-19X29",
    name: 'LD Clear Bag 19x29, Heavy Duty Clear LD',
    category: "bags",
    familyCategory: "bags",
    price: 45.99,
    palletTiHi: "6/5 (30cs)",
    caseCount: 400,
    packaging: "400 PC",
    material: "Low-Density Polyethylene (LDPE)"
  },
  {
    sku: "BAG-ROLL-11X19",
    name: '11x19 LDPE Continuous Roll Bag',
    category: "bags",
    familyCategory: "bags",
    price: 26.00,
    palletTiHi: "8/6 (48cs)",
    caseCount: 1500,
    packaging: "Continuous Roll",
    material: "LDPE Plastic"
  },
  {
    sku: "BAG-ROLL-11X14",
    name: '11x14 LDPE Roll Bag, Produce & Foodservice',
    category: "bags",
    familyCategory: "bags",
    price: 19.99,
    palletTiHi: "8/6 (48cs)",
    caseCount: 2000,
    packaging: "Continuous Roll",
    material: "LDPE Plastic"
  },
  {
    sku: "BAG-POLY-RED",
    name: 'Red Poly Bag for Meat Packaging, 4 Rolls/Case',
    category: "bags",
    familyCategory: "bags",
    price: 24.00,
    palletTiHi: "8/5 (40cs)",
    caseCount: 4,
    packaging: "4 Rolls / Case",
    material: "Heavy Duty Red Polyethylene"
  },

  // PDF 1 Page 13 & 14: Aluminum Foil & Catering Steam Table Pans
  {
    sku: "ALUM-HALF-DEEP",
    name: 'Half Pan - Deep Depth Aluminum Foil Steam Table Pan, 100/Case',
    category: "aluminum-foil-and-pans",
    familyCategory: "aluminum-foil-and-pans",
    price: 52.00,
    palletTiHi: "8/4 (32cs)",
    caseCount: 100,
    packaging: "100 / Case",
    material: "Heavy-Gauge Recyclable Aluminum"
  },
  {
    sku: "ALUM-FULL-DEEP",
    name: 'Full Pan - Deep Depth Aluminum Foil Steam Table Pan, 50/Case',
    category: "aluminum-foil-and-pans",
    familyCategory: "aluminum-foil-and-pans",
    price: 58.00,
    palletTiHi: "8/4 (32cs)",
    caseCount: 50,
    packaging: "50 / Case",
    material: "Heavy-Gauge Recyclable Aluminum"
  },
  {
    sku: "ALUM-ROLL-18X500",
    name: '18" x 500\' Commercial Aluminum Foil Roll with Cutter Box',
    category: "aluminum-foil-and-pans",
    familyCategory: "aluminum-foil-and-pans",
    price: 39.99,
    palletTiHi: "12/4 (48cs)",
    caseCount: 1,
    packaging: "18\" x 500 ft Roll",
    material: "Commercial Aluminum Foil"
  },
  {
    sku: "ALUM-ROLL-18X500-HD",
    name: '18" x 500\' Heavy Duty 21 MIC Aluminum Foil Roll with Cutter Box',
    category: "aluminum-foil-and-pans",
    familyCategory: "aluminum-foil-and-pans",
    price: 36.45,
    palletTiHi: "12/4 (48cs)",
    caseCount: 1,
    packaging: "18\" x 500 ft Roll (21 MIC)",
    material: "Heavy Duty 21 MIC Aluminum Foil"
  },
  {
    sku: "ALUM-SHEET-9X10.75",
    name: '9" x 10.75" Aluminum Foil Pop-Up Interfolded Sheets, 500 Sheets',
    category: "aluminum-foil-and-pans",
    familyCategory: "aluminum-foil-and-pans",
    price: 63.99,
    palletTiHi: "10/5 (50cs)",
    caseCount: 500,
    packaging: "500 Sheets / Box",
    material: "Pop-Up Interfolded Aluminum Foil"
  },
  {
    sku: "ALUM-SHEET-12X10.75",
    name: '12" x 10.75" Aluminum Foil Pop-Up Interfolded Sheets, 500 Sheets',
    category: "aluminum-foil-and-pans",
    familyCategory: "aluminum-foil-and-pans",
    price: 76.99,
    palletTiHi: "10/5 (50cs)",
    caseCount: 500,
    packaging: "500 Sheets / Box",
    material: "Pop-Up Interfolded Aluminum Foil"
  },

  // PDF 1 Page 10 & 11: Food Paper & Butcher Wraps
  {
    sku: "EF151000",
    name: '15" White Poly-Coated Freezer Paper Roll, 1000 ft',
    category: "food-paper-and-wraps",
    familyCategory: "food-paper-and-wraps",
    price: 31.49,
    palletTiHi: "8/5 (40cs)",
    caseCount: 1,
    packaging: "15\" x 1000 ft Roll",
    material: "Poly-Coated Moisture-Barrier Paper"
  },
  {
    sku: "EF181000",
    name: '18" White Poly-Coated Freezer Paper Roll, 1000 ft',
    category: "food-paper-and-wraps",
    familyCategory: "food-paper-and-wraps",
    price: 37.59,
    palletTiHi: "8/5 (40cs)",
    caseCount: 1,
    packaging: "18\" x 1000 ft Roll",
    material: "Poly-Coated Moisture-Barrier Paper"
  },
  {
    sku: "EF301000",
    name: '30" White Poly-Coated Freezer Paper Roll, 1000 ft',
    category: "food-paper-and-wraps",
    familyCategory: "food-paper-and-wraps",
    price: 62.66,
    palletTiHi: "6/4 (24cs)",
    caseCount: 1,
    packaging: "30\" x 1000 ft Roll",
    material: "Poly-Coated Moisture-Barrier Paper"
  },
  {
    sku: "DELI-WRAP-10",
    name: '10" x 10-3/4" Wax Treated Interfolded Deli Wrap Paper Case',
    category: "food-paper-and-wraps",
    familyCategory: "food-paper-and-wraps",
    price: 76.74,
    palletTiHi: "8/5 (40cs)",
    caseCount: 3000,
    packaging: "Interfolded Sheets Case",
    material: "Dry Wax Treated Paper"
  },
  {
    sku: "PAPER-CHK-BLK",
    name: '12" x 12" Black & White Checker Food Basket Liner Paper Case',
    category: "food-paper-and-wraps",
    familyCategory: "food-paper-and-wraps",
    price: 120.15,
    palletTiHi: "8/5 (40cs)",
    caseCount: 5000,
    packaging: "5000 Sheets / Case",
    material: "Grease-Resistant Printed Kraft Paper"
  },
  {
    sku: "PAPER-CHK-RED",
    name: '12" x 12" Red & White Checker Food Basket Liner Paper Case',
    category: "food-paper-and-wraps",
    familyCategory: "food-paper-and-wraps",
    price: 120.15,
    palletTiHi: "8/5 (40cs)",
    caseCount: 5000,
    packaging: "5000 Sheets / Case",
    material: "Grease-Resistant Printed Kraft Paper"
  },
  {
    sku: "STEAK-BLK-6X30",
    name: '6" x 30" Black Butcher Steak Paper Roll / Sheets',
    category: "food-paper-and-wraps",
    familyCategory: "food-paper-and-wraps",
    price: 45.00,
    palletTiHi: "8/5 (40cs)",
    caseCount: 1000,
    packaging: "1000 Sheets",
    material: "Heavy Duty Meat Display Paper"
  },
  {
    sku: "STEAK-PNK-6X30",
    name: '6" x 30" Pink Butcher Steak Paper Roll / Sheets',
    category: "food-paper-and-wraps",
    familyCategory: "food-paper-and-wraps",
    price: 35.50,
    palletTiHi: "8/5 (40cs)",
    caseCount: 1000,
    packaging: "1000 Sheets",
    material: "Unwaxed Peach / Pink Butcher Paper"
  },
  {
    sku: "STEAK-BLK-8X30",
    name: '8" x 30" Black Butcher Steak Paper',
    category: "food-paper-and-wraps",
    familyCategory: "food-paper-and-wraps",
    price: 54.35,
    palletTiHi: "8/5 (40cs)",
    caseCount: 1000,
    packaging: "1000 Sheets",
    material: "Heavy Duty Meat Display Paper"
  },
  {
    sku: "STEAK-PNK-8X30",
    name: '8" x 30" Pink Butcher Steak Paper',
    category: "food-paper-and-wraps",
    familyCategory: "food-paper-and-wraps",
    price: 47.47,
    palletTiHi: "8/5 (40cs)",
    caseCount: 1000,
    packaging: "1000 Sheets",
    material: "Unwaxed Peach / Pink Butcher Paper"
  },
  {
    sku: "STEAK-PNK-10X30",
    name: '10" x 30" Pink Butcher Steak Paper',
    category: "food-paper-and-wraps",
    familyCategory: "food-paper-and-wraps",
    price: 59.45,
    palletTiHi: "8/5 (40cs)",
    caseCount: 1000,
    packaging: "1000 Sheets",
    material: "Unwaxed Peach / Pink Butcher Paper"
  },
  {
    sku: "STEAK-BLK-10X30",
    name: '10" x 30" Black Butcher Steak Paper',
    category: "food-paper-and-wraps",
    familyCategory: "food-paper-and-wraps",
    price: 69.99,
    palletTiHi: "8/5 (40cs)",
    caseCount: 1000,
    packaging: "1000 Sheets",
    material: "Heavy Duty Meat Display Paper"
  },
  {
    sku: "FILM-18X4000",
    name: '18" x 4000\' Heavy Duty Commercial Foodservice Cling Film with Cutter',
    category: "food-paper-and-wraps",
    familyCategory: "food-paper-and-wraps",
    price: 44.99,
    palletTiHi: "12/4 (48cs)",
    caseCount: 1,
    packaging: "18\" x 4000 ft Roll",
    material: "PVC Food Cling Film"
  },

  // PDF 1 Page 10, 11, 13: Janitorial & Cleaning Supplies
  {
    sku: "CHEM-63101",
    name: 'Oven & Grill Cleaner Non-Ammoniated, 4x1 Gallon Case (63101)',
    category: "janitorial-and-cleaning",
    familyCategory: "janitorial-and-cleaning",
    price: 26.99,
    palletTiHi: "10/4 (40cs)",
    caseCount: 4,
    packaging: "4 x 1 Gallon Case",
    material: "Commercial Degreaser Chemical"
  },
  {
    sku: "CHEM-60001",
    name: 'Dishwash Green Commercial Manual Dish Detergent, 4x1 Gallon Case (60001)',
    category: "janitorial-and-cleaning",
    familyCategory: "janitorial-and-cleaning",
    price: 23.17,
    palletTiHi: "10/4 (40cs)",
    caseCount: 4,
    packaging: "4 x 1 Gallon Case",
    material: "Concentrated Dishwashing Liquid"
  },
  {
    sku: "CHEM-60005",
    name: 'Dishwash Green Commercial Manual Dish Detergent, 5 Gallon Pail (60005)',
    category: "janitorial-and-cleaning",
    familyCategory: "janitorial-and-cleaning",
    price: 31.99,
    palletTiHi: "12/3 (36cs)",
    caseCount: 1,
    packaging: "5 Gallon Pail",
    material: "Concentrated Dishwashing Liquid"
  },
  {
    sku: "CHEM-80201",
    name: 'Workforce Heavy Duty Industrial Degreaser, 4x1 Gallon Case (80201)',
    category: "janitorial-and-cleaning",
    familyCategory: "janitorial-and-cleaning",
    price: 25.99,
    palletTiHi: "10/4 (40cs)",
    caseCount: 4,
    packaging: "4 x 1 Gallon Case",
    material: "Industrial All-Purpose Cleaner"
  },
  {
    sku: "CHEM-80205",
    name: 'Workforce Heavy Duty Industrial Degreaser, 5 Gallon Pail (80205)',
    category: "janitorial-and-cleaning",
    familyCategory: "janitorial-and-cleaning",
    price: 32.99,
    palletTiHi: "12/3 (36cs)",
    caseCount: 1,
    packaging: "5 Gallon Pail",
    material: "Industrial All-Purpose Cleaner"
  },
  {
    sku: "TOWEL-CENTERPULL",
    name: 'Center-Pull White Paper Towel Rolls, High Capacity Foodservice Case',
    category: "janitorial-and-cleaning",
    familyCategory: "janitorial-and-cleaning",
    price: 28.99,
    palletTiHi: "6/5 (30cs)",
    caseCount: 6,
    packaging: "6 Rolls / Case",
    material: "2-Ply Perforated Towel Paper"
  },
  {
    sku: "GLOVES-NITRILE",
    name: 'Blue Nitrile Examination & Food Service Gloves (Assorted Sizes: S, M, L, XL), 1000pc (100x10)',
    category: "janitorial-and-cleaning",
    familyCategory: "janitorial-and-cleaning",
    price: 42.99,
    palletTiHi: "10/6 (60cs)",
    caseCount: 1000,
    packaging: "1000pc (100/10)",
    material: "Powder-Free Food-Safe Nitrile"
  },
  {
    sku: "TRASH-33HD-CLR",
    name: '33 Gallon HD Clear Trash Can Liners, 200 PC, 1.5 MIC',
    category: "janitorial-and-cleaning",
    familyCategory: "janitorial-and-cleaning",
    price: 24.99,
    palletTiHi: "10/6 (60cs)",
    caseCount: 200,
    packaging: "200 PC (1.5 MIC)",
    material: "High Density Clear Polyethylene"
  },
  {
    sku: "TRASH-33HD-BLK",
    name: '33 Gallon HD Black Trash Can Liners, 200 PC, 1.5 MIC',
    category: "janitorial-and-cleaning",
    familyCategory: "janitorial-and-cleaning",
    price: 24.99,
    palletTiHi: "10/6 (60cs)",
    caseCount: 200,
    packaging: "200 PC (1.5 MIC)",
    material: "High Density Black Polyethylene"
  },
  {
    sku: "TRASH-33LD-BLK-12",
    name: '33 Gallon LD Black Trash Can Liners, 100 PC, 1.2 MIL',
    category: "janitorial-and-cleaning",
    familyCategory: "janitorial-and-cleaning",
    price: 24.99,
    palletTiHi: "10/6 (60cs)",
    caseCount: 100,
    packaging: "100 PC (1.2 MIL)",
    material: "Low Density Heavy Black Polyethylene"
  },
  {
    sku: "TRASH-33LD-BLK-15",
    name: '33 Gallon LD Black Trash Can Liners, 100 PC, 1.5 MIL',
    category: "janitorial-and-cleaning",
    familyCategory: "janitorial-and-cleaning",
    price: 24.99,
    palletTiHi: "10/6 (60cs)",
    caseCount: 100,
    packaging: "100 PC (1.5 MIL)",
    material: "Low Density Heavy Black Polyethylene"
  },
  {
    sku: "TRASH-58LD-BLK-14",
    name: '58 Gallon LD Black Heavy Duty Can Liners, 100 PC, 1.4 MIL',
    category: "janitorial-and-cleaning",
    familyCategory: "janitorial-and-cleaning",
    price: 29.99,
    palletTiHi: "8/5 (40cs)",
    caseCount: 100,
    packaging: "100 PC (1.4 MIL)",
    material: "Low Density Heavy Black Polyethylene"
  },
  {
    sku: "TRASH-24X32-BLK",
    name: 'Gallon Trash Bag (24x32), 250 PC, BLACK',
    category: "janitorial-and-cleaning",
    familyCategory: "janitorial-and-cleaning",
    price: 10.99,
    palletTiHi: "12/6 (72cs)",
    caseCount: 250,
    packaging: "250 PC",
    material: "Black Polyethylene"
  },
  {
    sku: "TRASH-58GAL",
    name: '58 Gallon Heavy Duty Black Trash Bags, Commercial Case',
    category: "janitorial-and-cleaning",
    familyCategory: "janitorial-and-cleaning",
    price: 25.65,
    palletTiHi: "8/5 (40cs)",
    caseCount: 100,
    packaging: "100 PC Case",
    material: "Black Polyethylene"
  },
  {
    sku: "FMTB-4046",
    name: 'FMTB-4046 40-45 Gallon HDPE Trash Bag 40" x 46", Commercial Case',
    category: "janitorial-and-cleaning",
    familyCategory: "janitorial-and-cleaning",
    price: 26.99,
    palletTiHi: "10/5 (50cs)",
    caseCount: 250,
    packaging: "250 PC Case",
    material: "High Density Polyethylene (HDPE)"
  },
  {
    sku: "TB-3956",
    name: 'TB-3956 55-60 Gallon HDPE Trash Bag 39" x 56", Commercial Case',
    category: "janitorial-and-cleaning",
    familyCategory: "janitorial-and-cleaning",
    price: 26.99,
    palletTiHi: "8/5 (40cs)",
    caseCount: 200,
    packaging: "200 PC Case",
    material: "High Density Polyethylene (HDPE)"
  }
];

const newProducts = [];
for (const item of newProductsData) {
  if (!existingSkus.has(item.sku.toUpperCase())) {
    newProducts.push(makeProduct(item));
    existingSkus.add(item.sku.toUpperCase());
  }
}

console.log('New products added:', newProducts.length);

const allProducts = [...updatedBaseProducts, ...newProducts];
console.log('Total combined products:', allProducts.length);

// Verify image distributions
const imgCounts = {};
allProducts.forEach(p => {
  imgCounts[p.image] = (imgCounts[p.image] || 0) + 1;
});
console.log('Final image distributions:', imgCounts);

// Export compiled data
module.exports = {
  CATEGORIES,
  MAIN_CATEGORIES,
  PRODUCTS: allProducts
};

