import { pool } from "../config/db.js";

const CATEGORIES = [
  {
    "id": "hinged-containers",
    "slug": "hinged-containers",
    "name": "Hinged Containers",
    "description": "Durable, leak-resistant white & black MFPP clamshells, corner-lock & duo-colored boxes",
    "image_url": "/images/white_hinged_box.jpg",
    "display_order": 1
  },
  {
    "id": "deli-containers",
    "slug": "deli-containers",
    "name": "Deli Containers",
    "description": "PP deli container combo sets, individual heavy-duty bases, clear cups & universal lids",
    "image_url": "/images/pp-deli-container.jpg",
    "display_order": 2
  },
  {
    "id": "noodle-bowls",
    "slug": "noodle-bowls",
    "name": "Noodle Bowls",
    "description": "Microwaveable black & white noodle bowls with leak-proof lids and compartmental inserts",
    "image_url": "/images/microwaveable-noodle-bowl.jpg",
    "display_order": 3
  },
  {
    "id": "round-containers",
    "slug": "round-containers",
    "name": "Round Containers & Bowls",
    "description": "Heavy-duty microwaveable round food prep & thermoformed takeout containers with lids",
    "image_url": "/images/round_takeout_bowl.jpg",
    "display_order": 4
  },
  {
    "id": "rectangular-containers",
    "slug": "rectangular-containers",
    "name": "Rectangular Containers",
    "description": "Commercial microwaveable rectangular food containers & shallow meal prep trays with leak-resistant lids",
    "image_url": "/images/rectangular_takeout_box.jpg",
    "display_order": 5
  },
  {
    "id": "shallow-compartmental-containers",
    "slug": "shallow-compartmental-containers",
    "name": "Shallow / Compartmental Containers",
    "description": "Multi-compartment bento meal trays, square takeout containers & PP black trays with translucent lids",
    "image_url": "/images/cat_takeout_containers.jpg",
    "display_order": 6
  },
  {
    "id": "bagasse-plates-and-bowls",
    "slug": "bagasse-plates-and-bowls",
    "name": "Bagasse Plates & Bowls",
    "description": "100% compostable sugarcane bagasse round & 3-compartment plates, bowls & PET lids (PFAS Free)",
    "image_url": "/images/bagasse-round-plate.jpg",
    "display_order": 7
  },
  {
    "id": "bagasse-hinged-containers",
    "slug": "bagasse-hinged-containers",
    "name": "Bagasse Hinged Containers",
    "description": "100% compostable sugarcane bagasse hinged clamshell containers, PFAS-free & oil-resistant",
    "image_url": "/images/bagasse-hinged-container.jpg",
    "display_order": 8
  },
  {
    "id": "paper-take-out-boxes",
    "slug": "paper-take-out-boxes",
    "name": "Paper Take-Out Boxes",
    "description": "Leak-resistant white folded paper carryout food boxes & natural kraft bio boxes",
    "image_url": "/images/paper-take-out-box.jpg",
    "display_order": 9
  },
  {
    "id": "mfpp-hinged-containers-white",
    "slug": "mfpp-hinged-containers-white",
    "name": "MFPP Hinged Containers - White",
    "description": "Mineral-filled polypropylene white hinged clamshell containers, vented & 1/2/3 compartments",
    "image_url": "/images/white_hinged_box.jpg",
    "display_order": 10
  },
  {
    "id": "mfpp-hinged-containers-black",
    "slug": "mfpp-hinged-containers-black",
    "name": "MFPP Hinged Containers - Black",
    "description": "Premium mineral-filled PP black hinged clamshell containers, vented & compartment options",
    "image_url": "/images/black_hinged_box.jpg",
    "display_order": 11
  },
  {
    "id": "portion-cups",
    "slug": "portion-cups",
    "name": "Portion Cups",
    "description": "Polypropylene portion sauce cups from 0.75oz to 5.5oz for dips, dressings & condiments",
    "image_url": "/images/portion-cup.jpg",
    "display_order": 12
  },
  {
    "id": "portion-cup-lids",
    "slug": "portion-cup-lids",
    "name": "Portion Cup Lids",
    "description": "Ultra-clear PET flat snap lids matching standard commercial portion cups",
    "image_url": "/images/portion-cup-lids.jpg",
    "display_order": 13
  },
  {
    "id": "two-color-hinged-containers",
    "slug": "two-color-hinged-containers",
    "name": "Two-Color Hinged Containers",
    "description": "Hinged duo-colored PP containers and hoagie boxes with clear top presentation",
    "image_url": "/images/hinged-duo-colored-pp-container.jpg",
    "display_order": 14
  },
  {
    "id": "translucent-hinged-containers",
    "slug": "translucent-hinged-containers",
    "name": "Translucent Hinged Containers",
    "description": "See-through translucent PP hinged clamshell containers, vented & 1/2/3 compartments",
    "image_url": "/images/pp-hinged-container.jpg",
    "display_order": 15
  },
  {
    "id": "clear-polystyrene-containers",
    "slug": "clear-polystyrene-containers",
    "name": "Clear Polystyrene Containers",
    "description": "Crystal clear hinged PS containers in 2in and 3in depth for bakery, deli & salads",
    "image_url": "/images/clear-hinged-ps-container.jpg",
    "display_order": 16
  },
  {
    "id": "paper-cups",
    "slug": "paper-cups",
    "name": "Paper Cups",
    "description": "Single wall white & coffee print paper hot beverage cups in 4oz to 24oz sizes",
    "image_url": "/images/white-paper-cup.jpg",
    "display_order": 17
  },
  {
    "id": "paper-cup-lids-sleeves",
    "slug": "paper-cup-lids-sleeves",
    "name": "Paper Cup Lids & Sleeves",
    "description": "Black flat & reclosable hot cup lids and insulated kraft paper cup sleeves",
    "image_url": "/images/black-paper-cup-lid.jpg",
    "display_order": 18
  },
  {
    "id": "pet-cups",
    "slug": "pet-cups",
    "name": "PET Cups",
    "description": "Crystal clear 98mm & 107mm cold drink PET cups for smoothies, iced teas, boba & cold brews",
    "image_url": "/images/clear-pet-cup.jpg",
    "display_order": 19
  },
  {
    "id": "pet-cup-lids",
    "slug": "pet-cup-lids",
    "name": "PET Cup Lids",
    "description": "Commercial flat, dome, sip and wide-hole lids matching 78mm, 90mm, 98mm and 107mm PET cups",
    "image_url": "/images/flat-lid.jpg",
    "display_order": 20
  },
  {
    "id": "soup-containers",
    "slug": "soup-containers",
    "name": "Paper Soup Containers & Lids",
    "description": "Double-poly coated paper soup cups & plastic food soup tubs with matching leak-resistant lids",
    "image_url": "/images/cat_soup_containers.jpg",
    "display_order": 21
  },
  {
    "id": "cutlery",
    "slug": "cutlery",
    "name": "Cutlery & Kits",
    "description": "Heavy weight PP plastic forks, tea spoons, soup spoons, wrapped utensils & complete cutlery kits",
    "image_url": "/images/cat_cutlery.jpg",
    "display_order": 22
  },
  {
    "id": "straws",
    "slug": "straws",
    "name": "Straws & Stirrers",
    "description": "Commercial wrapped and bulk clear, black, and colored drinking straws",
    "image_url": "/images/black-straw.jpg",
    "display_order": 23
  },
  {
    "id": "napkins",
    "slug": "napkins",
    "name": "Napkins & Tabletop",
    "description": "Commercial 1-ply, 2-ply, 3-ply dinner napkins, dispenser interfold & beverage napkins",
    "image_url": "/images/cat_napkins.jpg",
    "display_order": 24
  },
  {
    "id": "bags",
    "slug": "bags",
    "name": "Bags & Sacks",
    "description": "Heavy-duty kraft handle shopping bags, brown grocery sacks, t-shirt thank you bags & LD roll bags",
    "image_url": "/images/cat_kraft_bags.jpg",
    "display_order": 25
  },
  {
    "id": "food-trays-plates",
    "slug": "food-trays-plates",
    "name": "Food Trays & Plates",
    "description": "Paper food trays (1LB to 3LB), salad plates, and compostable paper plates",
    "image_url": "/images/paper-food-tray.jpg",
    "display_order": 26
  },
  {
    "id": "aluminum-foil-and-pans",
    "slug": "aluminum-foil-and-pans",
    "name": "Aluminum Foil & Catering Pans",
    "description": "Half pan & full pan deep steam table pans, heavy-duty foil rolls and pop-up sheets",
    "image_url": "/images/cat_aluminum_trays.jpg",
    "display_order": 27
  },
  {
    "id": "food-paper-and-wraps",
    "slug": "food-paper-and-wraps",
    "name": "Food Paper & Butcher Wraps",
    "description": "Poly-coated freezer paper, checker basket liner sheets, butcher steak paper & cling film",
    "image_url": "/images/poster_catering_foil.jpeg",
    "display_order": 28
  },
  {
    "id": "janitorial-and-cleaning",
    "slug": "janitorial-and-cleaning",
    "name": "Janitorial & Cleaning Supplies",
    "description": "Commercial grill cleaner, dishwashing detergents, heavy-duty trash liners & nitrile gloves",
    "image_url": "/images/showcase_plastic.jpg",
    "display_order": 29
  }
];

const PRODUCTS: any[] = [
  {
    "id": "dlcu8",
    "sku": "DLCU8",
    "categoryId": "deli-containers",
    "subcategory": "Polypropylene (PP)",
    "name": "Clear Deli Container Cups 8 oz, Polypropylene, 500pc (50/10)",
    "slug": "dlcu8",
    "description": "Commercial food service packaging SKU DLCU8: Clear Deli Container Cups 8 oz, Polypropylene, 500pc (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/9 (72cs).",
    "palletTiHi": "8/9 (72cs)",
    "price": 21.89,
    "specialPrice": 21.89,
    "mrpPrice": 29.55,
    "bestSeller": true,
    "imageUrl": "/images/clear-deli-container.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 28,
    "sizes": [
      {
        "name": "500pc (50/10)",
        "sku": "DLCU8",
        "caseCount": 500,
        "price": 21.89,
        "dimensions": "8/9 (72cs)"
      }
    ]
  },
  {
    "id": "dlcu12",
    "sku": "DLCU12",
    "categoryId": "deli-containers",
    "subcategory": "Polypropylene (PP)",
    "name": "Clear Deli Container Cups 12 oz, Polypropylene, 500pc (50/10)",
    "slug": "dlcu12",
    "description": "Commercial food service packaging SKU DLCU12: Clear Deli Container Cups 12 oz, Polypropylene, 500pc (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/7 (56cs).",
    "palletTiHi": "8/7 (56cs)",
    "price": 24.49,
    "specialPrice": 24.49,
    "mrpPrice": 33.06,
    "bestSeller": false,
    "imageUrl": "/images/clear-deli-container.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 35,
    "sizes": [
      {
        "name": "500pc (50/10)",
        "sku": "DLCU12",
        "caseCount": 500,
        "price": 24.49,
        "dimensions": "8/7 (56cs)"
      }
    ]
  },
  {
    "id": "dlcu16",
    "sku": "DLCU16",
    "categoryId": "deli-containers",
    "subcategory": "Polypropylene (PP)",
    "name": "Clear Deli Container Cups 16 oz, Polypropylene, 500pc (50/10)",
    "slug": "dlcu16",
    "description": "Commercial food service packaging SKU DLCU16: Clear Deli Container Cups 16 oz, Polypropylene, 500pc (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/7 (56cs).",
    "palletTiHi": "8/7 (56cs)",
    "price": 27.08,
    "specialPrice": 27.08,
    "mrpPrice": 36.56,
    "bestSeller": false,
    "imageUrl": "/images/clear-deli-container.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.7,
    "reviewCount": 42,
    "sizes": [
      {
        "name": "500pc (50/10)",
        "sku": "DLCU16",
        "caseCount": 500,
        "price": 27.08,
        "dimensions": "8/7 (56cs)"
      }
    ]
  },
  {
    "id": "dlcu24",
    "sku": "DLCU24",
    "categoryId": "deli-containers",
    "subcategory": "Polypropylene (PP)",
    "name": "Clear Deli Container Cups 24 oz, Polypropylene, 500pc (25/20)",
    "slug": "dlcu24",
    "description": "Commercial food service packaging SKU DLCU24: Clear Deli Container Cups 24 oz, Polypropylene, 500pc (25/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/7 (56cs).",
    "palletTiHi": "8/7 (56cs)",
    "price": 36.17,
    "specialPrice": 36.17,
    "mrpPrice": 48.83,
    "bestSeller": false,
    "imageUrl": "/images/clear-deli-container.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 49,
    "sizes": [
      {
        "name": "500pc (25/20)",
        "sku": "DLCU24",
        "caseCount": 500,
        "price": 36.17,
        "dimensions": "8/7 (56cs)"
      }
    ]
  },
  {
    "id": "dlcu32",
    "sku": "DLCU32",
    "categoryId": "deli-containers",
    "subcategory": "Polypropylene (PP)",
    "name": "Clear Deli Container Cups 32 oz, Polypropylene, 500pc (25/20)",
    "slug": "dlcu32",
    "description": "Commercial food service packaging SKU DLCU32: Clear Deli Container Cups 32 oz, Polypropylene, 500pc (25/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/4 (32cs).",
    "palletTiHi": "8/4 (32cs)",
    "price": 40.05,
    "specialPrice": 40.05,
    "mrpPrice": 54.07,
    "bestSeller": false,
    "imageUrl": "/images/clear-deli-container.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 56,
    "sizes": [
      {
        "name": "500pc (25/20)",
        "sku": "DLCU32",
        "caseCount": 500,
        "price": 40.05,
        "dimensions": "8/4 (32cs)"
      }
    ]
  },
  {
    "id": "dlclu",
    "sku": "DLCLU",
    "categoryId": "deli-containers",
    "subcategory": "Polypropylene (PP)",
    "name": "Clear Deli Container Lids Only, Polypropylene, 500pc (50/10)",
    "slug": "dlclu",
    "description": "Commercial food service packaging SKU DLCLU: Clear Deli Container Lids Only, Polypropylene, 500pc (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/4 (32cs).",
    "palletTiHi": "8/4 (32cs)",
    "price": 19.31,
    "specialPrice": 19.31,
    "mrpPrice": 26.07,
    "bestSeller": true,
    "imageUrl": "/images/clear-deli-container.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 63,
    "sizes": [
      {
        "name": "500pc (50/10)",
        "sku": "DLCLU",
        "caseCount": 500,
        "price": 19.31,
        "dimensions": "8/4 (32cs)"
      }
    ]
  },
  {
    "id": "dlc24",
    "sku": "DLC24",
    "categoryId": "deli-containers",
    "subcategory": "Polypropylene (PP)",
    "name": "Clear Deli Container Cups 24 oz, Polypropylene, 500pc (25/20)",
    "slug": "dlc24",
    "description": "Commercial food service packaging SKU DLC24: Clear Deli Container Cups 24 oz, Polypropylene, 500pc (25/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/7 (56cs).",
    "palletTiHi": "8/7 (56cs)",
    "price": 36.17,
    "specialPrice": 36.17,
    "mrpPrice": 48.83,
    "bestSeller": false,
    "imageUrl": "/images/clear-deli-container.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 70,
    "sizes": [
      {
        "name": "500pc (25/20)",
        "sku": "DLC24",
        "caseCount": 500,
        "price": 36.17,
        "dimensions": "8/7 (56cs)"
      }
    ]
  },
  {
    "id": "dlc32",
    "sku": "DLC32",
    "categoryId": "deli-containers",
    "subcategory": "Polypropylene (PP)",
    "name": "Clear Deli Container Cups 32 oz, Polypropylene, 500pc (25/20)",
    "slug": "dlc32",
    "description": "Commercial food service packaging SKU DLC32: Clear Deli Container Cups 32 oz, Polypropylene, 500pc (25/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/4 (32cs).",
    "palletTiHi": "8/4 (32cs)",
    "price": 40.05,
    "specialPrice": 40.05,
    "mrpPrice": 54.07,
    "bestSeller": false,
    "imageUrl": "/images/clear-deli-container.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.7,
    "reviewCount": 77,
    "sizes": [
      {
        "name": "500pc (25/20)",
        "sku": "DLC32",
        "caseCount": 500,
        "price": 40.05,
        "dimensions": "8/4 (32cs)"
      }
    ]
  },
  {
    "id": "dlh8",
    "sku": "DLH8",
    "categoryId": "deli-containers",
    "subcategory": "Polypropylene (PP)",
    "name": "8oz PP Deli Container, 240 sets (24/20)",
    "slug": "dlh8",
    "description": "Commercial food service packaging SKU DLH8: 8oz PP Deli Container, 240 sets (24/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/8 (64cs).",
    "palletTiHi": "8/8 (64cs)",
    "price": 24.19,
    "specialPrice": 24.19,
    "mrpPrice": 32.66,
    "bestSeller": false,
    "imageUrl": "/images/pp-deli-container.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 84,
    "sizes": [
      {
        "name": "240 sets (24/20)",
        "sku": "DLH8",
        "caseCount": 240,
        "price": 24.19,
        "dimensions": "8/8 (64cs)"
      }
    ]
  },
  {
    "id": "dlh12",
    "sku": "DLH12",
    "categoryId": "deli-containers",
    "subcategory": "Polypropylene (PP)",
    "name": "12oz PP Deli Container, 240 sets (24/20)",
    "slug": "dlh12",
    "description": "Commercial food service packaging SKU DLH12: 12oz PP Deli Container, 240 sets (24/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/7 (56cs).",
    "palletTiHi": "8/7 (56cs)",
    "price": 26.9,
    "specialPrice": 26.9,
    "mrpPrice": 36.31,
    "bestSeller": false,
    "imageUrl": "/images/pp-deli-container.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 91,
    "sizes": [
      {
        "name": "240 sets (24/20)",
        "sku": "DLH12",
        "caseCount": 240,
        "price": 26.9,
        "dimensions": "8/7 (56cs)"
      }
    ]
  },
  {
    "id": "dlh16",
    "sku": "DLH16",
    "categoryId": "deli-containers",
    "subcategory": "Polypropylene (PP)",
    "name": "16oz PP Deli Container, 240 sets (24/20)",
    "slug": "dlh16",
    "description": "Commercial food service packaging SKU DLH16: 16oz PP Deli Container, 240 sets (24/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/7 (56cs).",
    "palletTiHi": "8/7 (56cs)",
    "price": 29.62,
    "specialPrice": 29.62,
    "mrpPrice": 39.99,
    "bestSeller": true,
    "imageUrl": "/images/pp-deli-container.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 98,
    "sizes": [
      {
        "name": "240 sets (24/20)",
        "sku": "DLH16",
        "caseCount": 240,
        "price": 29.62,
        "dimensions": "8/7 (56cs)"
      }
    ]
  },
  {
    "id": "dlh24",
    "sku": "DLH24",
    "categoryId": "deli-containers",
    "subcategory": "Polypropylene (PP)",
    "name": "24oz PP Deli Container, 240 sets (24/20)",
    "slug": "dlh24",
    "description": "Commercial food service packaging SKU DLH24: 24oz PP Deli Container, 240 sets (24/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 35.05,
    "specialPrice": 35.05,
    "mrpPrice": 47.32,
    "bestSeller": false,
    "imageUrl": "/images/pp-deli-container.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 105,
    "sizes": [
      {
        "name": "240 sets (24/20)",
        "sku": "DLH24",
        "caseCount": 240,
        "price": 35.05,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "dlh32",
    "sku": "DLH32",
    "categoryId": "deli-containers",
    "subcategory": "Polypropylene (PP)",
    "name": "32oz PP Deli Container, 240 sets (24/20)",
    "slug": "dlh32",
    "description": "Commercial food service packaging SKU DLH32: 32oz PP Deli Container, 240 sets (24/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/4 (32cs).",
    "palletTiHi": "8/4 (32cs)",
    "price": 38.44,
    "specialPrice": 38.44,
    "mrpPrice": 51.89,
    "bestSeller": false,
    "imageUrl": "/images/pp-deli-container.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.7,
    "reviewCount": 112,
    "sizes": [
      {
        "name": "240 sets (24/20)",
        "sku": "DLH32",
        "caseCount": 240,
        "price": 38.44,
        "dimensions": "8/4 (32cs)"
      }
    ]
  },
  {
    "id": "dlh64",
    "sku": "DLH64",
    "categoryId": "deli-containers",
    "subcategory": "Polypropylene (PP)",
    "name": "64oz PP Deli Container, 120 sets (12/20)",
    "slug": "dlh64",
    "description": "Commercial food service packaging SKU DLH64: 64oz PP Deli Container, 120 sets (12/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/6 (42cs).",
    "palletTiHi": "7/6 (42cs)",
    "price": 45.92,
    "specialPrice": 45.92,
    "mrpPrice": 61.99,
    "bestSeller": false,
    "imageUrl": "/images/pp-deli-container.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 119,
    "sizes": [
      {
        "name": "120 sets (12/20)",
        "sku": "DLH64",
        "caseCount": 120,
        "price": 45.92,
        "dimensions": "7/6 (42cs)"
      }
    ]
  },
  {
    "id": "dlh8-500",
    "sku": "DLH8-500",
    "categoryId": "deli-containers",
    "subcategory": "Polypropylene (PP)",
    "name": "8oz PP Deli Container Base, 500pc (50/10)",
    "slug": "dlh8-500",
    "description": "Commercial food service packaging SKU DLH8-500: 8oz PP Deli Container Base, 500pc (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/8 (64cs).",
    "palletTiHi": "8/8 (64cs)",
    "price": 21.89,
    "specialPrice": 21.89,
    "mrpPrice": 29.55,
    "bestSeller": false,
    "imageUrl": "/images/pp-deli-container-base.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 126,
    "sizes": [
      {
        "name": "500pc (50/10)",
        "sku": "DLH8-500",
        "caseCount": 500,
        "price": 21.89,
        "dimensions": "8/8 (64cs)"
      }
    ]
  },
  {
    "id": "dlh12-500",
    "sku": "DLH12-500",
    "categoryId": "deli-containers",
    "subcategory": "Polypropylene (PP)",
    "name": "12oz PP Deli Container Base, 500pc (50/10)",
    "slug": "dlh12-500",
    "description": "Commercial food service packaging SKU DLH12-500: 12oz PP Deli Container Base, 500pc (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/6 (48cs).",
    "palletTiHi": "8/6 (48cs)",
    "price": 24.49,
    "specialPrice": 24.49,
    "mrpPrice": 33.06,
    "bestSeller": true,
    "imageUrl": "/images/pp-deli-container-base.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 133,
    "sizes": [
      {
        "name": "500pc (50/10)",
        "sku": "DLH12-500",
        "caseCount": 500,
        "price": 24.49,
        "dimensions": "8/6 (48cs)"
      }
    ]
  },
  {
    "id": "dlh16-500",
    "sku": "DLH16-500",
    "categoryId": "deli-containers",
    "subcategory": "Polypropylene (PP)",
    "name": "16oz PP Deli Container Base, 500pc (50/10)",
    "slug": "dlh16-500",
    "description": "Commercial food service packaging SKU DLH16-500: 16oz PP Deli Container Base, 500pc (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/6 (48cs).",
    "palletTiHi": "8/6 (48cs)",
    "price": 27.08,
    "specialPrice": 27.08,
    "mrpPrice": 36.56,
    "bestSeller": false,
    "imageUrl": "/images/pp-deli-container-base.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 140,
    "sizes": [
      {
        "name": "500pc (50/10)",
        "sku": "DLH16-500",
        "caseCount": 500,
        "price": 27.08,
        "dimensions": "8/6 (48cs)"
      }
    ]
  },
  {
    "id": "dlh24-500",
    "sku": "DLH24-500",
    "categoryId": "deli-containers",
    "subcategory": "Polypropylene (PP)",
    "name": "24oz PP Deli Container Base, 500pc (25/20)",
    "slug": "dlh24-500",
    "description": "Commercial food service packaging SKU DLH24-500: 24oz PP Deli Container Base, 500pc (25/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 4/7 (28cs).",
    "palletTiHi": "4/7 (28cs)",
    "price": 36.17,
    "specialPrice": 36.17,
    "mrpPrice": 48.83,
    "bestSeller": false,
    "imageUrl": "/images/pp-deli-container-base.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.7,
    "reviewCount": 32,
    "sizes": [
      {
        "name": "500pc (25/20)",
        "sku": "DLH24-500",
        "caseCount": 500,
        "price": 36.17,
        "dimensions": "4/7 (28cs)"
      }
    ]
  },
  {
    "id": "dlh32-500",
    "sku": "DLH32-500",
    "categoryId": "deli-containers",
    "subcategory": "Polypropylene (PP)",
    "name": "32oz PP Deli Container Base, 500pc (25/20)",
    "slug": "dlh32-500",
    "description": "Commercial food service packaging SKU DLH32-500: 32oz PP Deli Container Base, 500pc (25/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 4/6 (24cs).",
    "palletTiHi": "4/6 (24cs)",
    "price": 40.05,
    "specialPrice": 40.05,
    "mrpPrice": 54.07,
    "bestSeller": false,
    "imageUrl": "/images/pp-deli-container-base.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 39,
    "sizes": [
      {
        "name": "500pc (25/20)",
        "sku": "DLH32-500",
        "caseCount": 500,
        "price": 40.05,
        "dimensions": "4/6 (24cs)"
      }
    ]
  },
  {
    "id": "lid-500",
    "sku": "LID-500",
    "categoryId": "deli-containers",
    "subcategory": "Polypropylene (PP)",
    "name": "Lids for 8-32oz Deli Container, 500pc (50/10)",
    "slug": "lid-500",
    "description": "Commercial food service packaging SKU LID-500: Lids for 8-32oz Deli Container, 500pc (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/8 (64cs).",
    "palletTiHi": "8/8 (64cs)",
    "price": 19.31,
    "specialPrice": 19.31,
    "mrpPrice": 26.07,
    "bestSeller": false,
    "imageUrl": "/images/pp-deli-container-base.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 46,
    "sizes": [
      {
        "name": "500pc (50/10)",
        "sku": "LID-500",
        "caseCount": 500,
        "price": 19.31,
        "dimensions": "8/8 (64cs)"
      }
    ]
  },
  {
    "id": "nbl36",
    "sku": "NBL36",
    "categoryId": "noodle-bowls",
    "subcategory": "PP Plastic · Black Base · 120 Sets",
    "name": "36oz Microwaveable Noodle Bowl with Lid, Black, 120 Sets (40/6)",
    "slug": "nbl36",
    "description": "Commercial food service packaging SKU NBL36: 36oz Microwaveable Noodle Bowl with Lid, Black, 120 Sets (40/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 45.92,
    "specialPrice": null,
    "mrpPrice": 61.99,
    "bestSeller": true,
    "imageUrl": "/images/microwaveable-noodle-bowl.jpg",
    "material": "PP Plastic · Black Base · 120 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 53,
    "sizes": [
      {
        "name": "Case (120 pcs)",
        "sku": "NBL36",
        "caseCount": 120,
        "price": 45.92,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "nbwh36",
    "sku": "NBWH36",
    "categoryId": "noodle-bowls",
    "subcategory": "PP Plastic · White Base · 120 Sets",
    "name": "36oz Microwaveable Noodle Bowl with Lid, White, 120 Sets (40/6)",
    "slug": "nbwh36",
    "description": "Commercial food service packaging SKU NBWH36: 36oz Microwaveable Noodle Bowl with Lid, White, 120 Sets (40/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/4 (32cs).",
    "palletTiHi": "8/4 (32cs)",
    "price": 21.89,
    "specialPrice": null,
    "mrpPrice": 29.55,
    "bestSeller": false,
    "imageUrl": "/images/microwaveable-noodle-bowl.jpg",
    "material": "PP Plastic · White Base · 120 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 60,
    "sizes": [
      {
        "name": "Case (120 pcs)",
        "sku": "NBWH36",
        "caseCount": 120,
        "price": 21.89,
        "dimensions": "8/4 (32cs)"
      }
    ]
  },
  {
    "id": "nbl42",
    "sku": "NBL42",
    "categoryId": "noodle-bowls",
    "subcategory": "PP Plastic · Black Base · 120 Sets",
    "name": "42oz Microwaveable Noodle Bowl with Lid, Black, 120 Sets (40/6)",
    "slug": "nbl42",
    "description": "Commercial food service packaging SKU NBL42: 42oz Microwaveable Noodle Bowl with Lid, Black, 120 Sets (40/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/4 (32cs).",
    "palletTiHi": "8/4 (32cs)",
    "price": 24.49,
    "specialPrice": null,
    "mrpPrice": 33.06,
    "bestSeller": false,
    "imageUrl": "/images/microwaveable-noodle-bowl.jpg",
    "material": "PP Plastic · Black Base · 120 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.7,
    "reviewCount": 67,
    "sizes": [
      {
        "name": "Case (120 pcs)",
        "sku": "NBL42",
        "caseCount": 120,
        "price": 24.49,
        "dimensions": "8/4 (32cs)"
      }
    ]
  },
  {
    "id": "nbwh42",
    "sku": "NBWH42",
    "categoryId": "noodle-bowls",
    "subcategory": "PP Plastic · White Base · 120 Sets",
    "name": "42oz Microwaveable Noodle Bowl with Lid, White, 120 Sets (40/6)",
    "slug": "nbwh42",
    "description": "Commercial food service packaging SKU NBWH42: 42oz Microwaveable Noodle Bowl with Lid, White, 120 Sets (40/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/7 (56cs).",
    "palletTiHi": "8/7 (56cs)",
    "price": 27.08,
    "specialPrice": null,
    "mrpPrice": 36.56,
    "bestSeller": false,
    "imageUrl": "/images/microwaveable-noodle-bowl.jpg",
    "material": "PP Plastic · White Base · 120 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 74,
    "sizes": [
      {
        "name": "Case (120 pcs)",
        "sku": "NBWH42",
        "caseCount": 120,
        "price": 27.08,
        "dimensions": "8/7 (56cs)"
      }
    ]
  },
  {
    "id": "nbl50",
    "sku": "NBL50",
    "categoryId": "noodle-bowls",
    "subcategory": "PP Plastic · Black Base · 120 Sets",
    "name": "50oz Microwaveable Noodle Bowl with Lid, Black, 120 Sets (40/6)",
    "slug": "nbl50",
    "description": "Commercial food service packaging SKU NBL50: 50oz Microwaveable Noodle Bowl with Lid, Black, 120 Sets (40/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/4 (32cs).",
    "palletTiHi": "8/4 (32cs)",
    "price": 36.17,
    "specialPrice": null,
    "mrpPrice": 48.83,
    "bestSeller": false,
    "imageUrl": "/images/microwaveable-noodle-bowl.jpg",
    "material": "PP Plastic · Black Base · 120 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 81,
    "sizes": [
      {
        "name": "Case (120 pcs)",
        "sku": "NBL50",
        "caseCount": 120,
        "price": 36.17,
        "dimensions": "8/4 (32cs)"
      }
    ]
  },
  {
    "id": "nbwh50",
    "sku": "NBWH50",
    "categoryId": "noodle-bowls",
    "subcategory": "PP Plastic · White Base · 120 Sets",
    "name": "50oz Microwaveable Noodle Bowl with Lid, White, 120 Sets (40/6)",
    "slug": "nbwh50",
    "description": "Commercial food service packaging SKU NBWH50: 50oz Microwaveable Noodle Bowl with Lid, White, 120 Sets (40/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 12/5 (60cs).",
    "palletTiHi": "12/5 (60cs)",
    "price": 40.05,
    "specialPrice": null,
    "mrpPrice": 54.07,
    "bestSeller": true,
    "imageUrl": "/images/microwaveable-noodle-bowl.jpg",
    "material": "PP Plastic · White Base · 120 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 88,
    "sizes": [
      {
        "name": "Case (120 pcs)",
        "sku": "NBWH50",
        "caseCount": 120,
        "price": 40.05,
        "dimensions": "12/5 (60cs)"
      }
    ]
  },
  {
    "id": "nbint501",
    "sku": "NBINT501",
    "categoryId": "noodle-bowls",
    "subcategory": "PP Plastic · 240pc Insert",
    "name": "Noodle Bowl Insert Compatible with NB-50, 240pc (40/6)",
    "slug": "nbint501",
    "description": "Commercial food service packaging SKU NBINT501: Noodle Bowl Insert Compatible with NB-50, 240pc (40/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 12/5 (60cs).",
    "palletTiHi": "12/5 (60cs)",
    "price": 19.31,
    "specialPrice": null,
    "mrpPrice": 26.07,
    "bestSeller": false,
    "imageUrl": "/images/microwaveable-noodle-bowl.jpg",
    "material": "PP Plastic · 240pc Insert",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 95,
    "sizes": [
      {
        "name": "Case (240 pcs)",
        "sku": "NBINT501",
        "caseCount": 240,
        "price": 19.31,
        "dimensions": "12/5 (60cs)"
      }
    ]
  },
  {
    "id": "ncb502",
    "sku": "NCB502",
    "categoryId": "noodle-bowls",
    "subcategory": "PP Plastic · Complete Combo · 90 Sets",
    "name": "50oz Microwaveable Noodle Bowl with Insert and Lid, 90 Sets (30/9)",
    "slug": "ncb502",
    "description": "Commercial food service packaging SKU NCB502: 50oz Microwaveable Noodle Bowl with Insert and Lid, 90 Sets (30/9). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 12/5 (60cs).",
    "palletTiHi": "12/5 (60cs)",
    "price": 21.89,
    "specialPrice": null,
    "mrpPrice": 29.55,
    "bestSeller": false,
    "imageUrl": "/images/microwaveable-noodle-bowl.jpg",
    "material": "PP Plastic · Complete Combo · 90 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.7,
    "reviewCount": 102,
    "sizes": [
      {
        "name": "Case (90 pcs)",
        "sku": "NCB502",
        "caseCount": 90,
        "price": 21.89,
        "dimensions": "12/5 (60cs)"
      }
    ]
  },
  {
    "id": "rd16",
    "sku": "RD16",
    "categoryId": "round-containers",
    "subcategory": "Polypropylene (PP) · 150 Sets",
    "name": "16oz Round Microwaveable Container with Lid, 150 Sets (50/6)",
    "slug": "rd16",
    "description": "Commercial food service packaging SKU RD16: 16oz Round Microwaveable Container with Lid, 150 Sets (50/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 14/7 (98cs).",
    "palletTiHi": "14/7 (98cs)",
    "price": 23.31,
    "specialPrice": null,
    "mrpPrice": 31.47,
    "bestSeller": false,
    "imageUrl": "/images/round_takeout_bowl.jpg",
    "material": "Polypropylene (PP) · 150 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 109,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "RD16",
        "caseCount": 150,
        "price": 23.31,
        "dimensions": "14/7 (98cs)"
      }
    ]
  },
  {
    "id": "rd24",
    "sku": "RD24",
    "categoryId": "round-containers",
    "subcategory": "Polypropylene (PP) · 150 Sets",
    "name": "24oz Round Microwaveable Container with Lid, 150 Sets (50/6)",
    "slug": "rd24",
    "description": "Commercial food service packaging SKU RD24: 24oz Round Microwaveable Container with Lid, 150 Sets (50/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/7 (70cs).",
    "palletTiHi": "10/7 (70cs)",
    "price": 27.76,
    "specialPrice": null,
    "mrpPrice": 37.48,
    "bestSeller": false,
    "imageUrl": "/images/round_takeout_bowl.jpg",
    "material": "Polypropylene (PP) · 150 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 116,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "RD24",
        "caseCount": 150,
        "price": 27.76,
        "dimensions": "10/7 (70cs)"
      }
    ]
  },
  {
    "id": "rdwh24",
    "sku": "RDWH24",
    "categoryId": "round-containers",
    "subcategory": "Polypropylene (PP) · White · 150 Sets",
    "name": "24oz Round Microwaveable Container with Lid, White, 150 Sets (50/6)",
    "slug": "rdwh24",
    "description": "Commercial food service packaging SKU RDWH24: 24oz Round Microwaveable Container with Lid, White, 150 Sets (50/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/7 (70cs).",
    "palletTiHi": "10/7 (70cs)",
    "price": 27.76,
    "specialPrice": null,
    "mrpPrice": 37.48,
    "bestSeller": true,
    "imageUrl": "/images/round_takeout_bowl.jpg",
    "material": "Polypropylene (PP) · White · 150 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 123,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "RDWH24",
        "caseCount": 150,
        "price": 27.76,
        "dimensions": "10/7 (70cs)"
      }
    ]
  },
  {
    "id": "rd32",
    "sku": "RD32",
    "categoryId": "round-containers",
    "subcategory": "Polypropylene (PP) · 150 Sets",
    "name": "32oz Round Microwaveable Container with Lid, 150 Sets (50/6)",
    "slug": "rd32",
    "description": "Commercial food service packaging SKU RD32: 32oz Round Microwaveable Container with Lid, 150 Sets (50/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/6 (60cs).",
    "palletTiHi": "10/6 (60cs)",
    "price": 29.97,
    "specialPrice": null,
    "mrpPrice": 40.46,
    "bestSeller": false,
    "imageUrl": "/images/round_takeout_bowl.jpg",
    "material": "Polypropylene (PP) · 150 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 130,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "RD32",
        "caseCount": 150,
        "price": 29.97,
        "dimensions": "10/6 (60cs)"
      }
    ]
  },
  {
    "id": "rd40",
    "sku": "RD40",
    "categoryId": "round-containers",
    "subcategory": "Polypropylene (PP) · 150 Sets",
    "name": "40oz Round Microwaveable Container with Lid, 150 Sets (50/6)",
    "slug": "rd40",
    "description": "Commercial food service packaging SKU RD40: 40oz Round Microwaveable Container with Lid, 150 Sets (50/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/6 (60cs).",
    "palletTiHi": "10/6 (60cs)",
    "price": 33.39,
    "specialPrice": null,
    "mrpPrice": 45.08,
    "bestSeller": false,
    "imageUrl": "/images/round_takeout_bowl.jpg",
    "material": "Polypropylene (PP) · 150 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.7,
    "reviewCount": 137,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "RD40",
        "caseCount": 150,
        "price": 33.39,
        "dimensions": "10/6 (60cs)"
      }
    ]
  },
  {
    "id": "rd48",
    "sku": "RD48",
    "categoryId": "round-containers",
    "subcategory": "Polypropylene (PP) · 150 Sets",
    "name": "48oz Round Microwaveable Container with Lid, 150 Sets (50/6)",
    "slug": "rd48",
    "description": "Commercial food service packaging SKU RD48: 48oz Round Microwaveable Container with Lid, 150 Sets (50/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/6 (36cs).",
    "palletTiHi": "6/6 (36cs)",
    "price": 45.55,
    "specialPrice": null,
    "mrpPrice": 61.49,
    "bestSeller": false,
    "imageUrl": "/images/round_takeout_bowl.jpg",
    "material": "Polypropylene (PP) · 150 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 29,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "RD48",
        "caseCount": 150,
        "price": 45.55,
        "dimensions": "6/6 (36cs)"
      }
    ]
  },
  {
    "id": "rdwh48",
    "sku": "RDWH48",
    "categoryId": "round-containers",
    "subcategory": "Polypropylene (PP) · White · 150 Sets",
    "name": "48oz Round Microwaveable Container with Lid, White, 150 Sets (50/6)",
    "slug": "rdwh48",
    "description": "Commercial food service packaging SKU RDWH48: 48oz Round Microwaveable Container with Lid, White, 150 Sets (50/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/6 (36cs).",
    "palletTiHi": "6/6 (36cs)",
    "price": 45.55,
    "specialPrice": null,
    "mrpPrice": 61.49,
    "bestSeller": false,
    "imageUrl": "/images/round_takeout_bowl.jpg",
    "material": "Polypropylene (PP) · White · 150 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 36,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "RDWH48",
        "caseCount": 150,
        "price": 45.55,
        "dimensions": "6/6 (36cs)"
      }
    ]
  },
  {
    "id": "w61",
    "sku": "W61",
    "categoryId": "shallow-compartmental-containers",
    "subcategory": "PP Black Tray · Translucent Lid · 240 Sets",
    "name": "PP Black Tray with Translucent Lid, 6\" x 6\", 240 Sets (60/8)",
    "slug": "w61",
    "description": "Commercial food service packaging SKU W61: PP Black Tray with Translucent Lid, 6\" x 6\", 240 Sets (60/8). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 55.36,
    "specialPrice": null,
    "mrpPrice": 74.74,
    "bestSeller": true,
    "imageUrl": "/images/cat_takeout_containers.jpg",
    "material": "PP Black Tray · Translucent Lid · 240 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 43,
    "sizes": [
      {
        "name": "Case (240 pcs)",
        "sku": "W61",
        "caseCount": 240,
        "price": 55.36,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "w81",
    "sku": "W81",
    "categoryId": "shallow-compartmental-containers",
    "subcategory": "PP Black Tray · Translucent Lid · 100 Sets",
    "name": "PP Black Tray with Translucent Lid, 8\" x 8\", 100 Sets (50/4)",
    "slug": "w81",
    "description": "Commercial food service packaging SKU W81: PP Black Tray with Translucent Lid, 8\" x 8\", 100 Sets (50/4). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 15/5 (75cs).",
    "palletTiHi": "15/5 (75cs)",
    "price": 43.58,
    "specialPrice": null,
    "mrpPrice": 58.83,
    "bestSeller": false,
    "imageUrl": "/images/cat_takeout_containers.jpg",
    "material": "PP Black Tray · Translucent Lid · 100 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 50,
    "sizes": [
      {
        "name": "Case (100 pcs)",
        "sku": "W81",
        "caseCount": 100,
        "price": 43.58,
        "dimensions": "15/5 (75cs)"
      }
    ]
  },
  {
    "id": "w91",
    "sku": "W91",
    "categoryId": "shallow-compartmental-containers",
    "subcategory": "PP Black Tray · Translucent Lid · 100 Sets",
    "name": "PP Black Tray with Translucent Lid, 9\" x 9\", 100 Sets (50/4)",
    "slug": "w91",
    "description": "Commercial food service packaging SKU W91: PP Black Tray with Translucent Lid, 9\" x 9\", 100 Sets (50/4). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/7 (70cs).",
    "palletTiHi": "10/7 (70cs)",
    "price": 36.54,
    "specialPrice": null,
    "mrpPrice": 49.33,
    "bestSeller": false,
    "imageUrl": "/images/cat_takeout_containers.jpg",
    "material": "PP Black Tray · Translucent Lid · 100 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.7,
    "reviewCount": 57,
    "sizes": [
      {
        "name": "Case (100 pcs)",
        "sku": "W91",
        "caseCount": 100,
        "price": 36.54,
        "dimensions": "10/7 (70cs)"
      }
    ]
  },
  {
    "id": "500ml",
    "sku": "500ML",
    "categoryId": "shallow-compartmental-containers",
    "subcategory": "Polypropylene (PP) · 250 Sets",
    "name": "Microwaveable PP Containers with Lids, 500ml, 250 Sets (50/10)",
    "slug": "500ml",
    "description": "Commercial food service packaging SKU 500ML: Microwaveable PP Containers with Lids, 500ml, 250 Sets (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/6 (60cs).",
    "palletTiHi": "10/6 (60cs)",
    "price": 47.92,
    "specialPrice": null,
    "mrpPrice": 64.69,
    "bestSeller": false,
    "imageUrl": "/images/cat_takeout_containers.jpg",
    "material": "Polypropylene (PP) · 250 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 64,
    "sizes": [
      {
        "name": "Case (250 pcs)",
        "sku": "500ML",
        "caseCount": 250,
        "price": 47.92,
        "dimensions": "10/6 (60cs)"
      }
    ]
  },
  {
    "id": "650ml",
    "sku": "650ML",
    "categoryId": "shallow-compartmental-containers",
    "subcategory": "Polypropylene (PP) · 250 Sets",
    "name": "Microwaveable PP Containers with Lids, 650ml, 250 Sets (50/10)",
    "slug": "650ml",
    "description": "Commercial food service packaging SKU 650ML: Microwaveable PP Containers with Lids, 650ml, 250 Sets (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/7 (56cs).",
    "palletTiHi": "8/7 (56cs)",
    "price": 33.91,
    "specialPrice": null,
    "mrpPrice": 45.78,
    "bestSeller": false,
    "imageUrl": "/images/cat_takeout_containers.jpg",
    "material": "Polypropylene (PP) · 250 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 71,
    "sizes": [
      {
        "name": "Case (250 pcs)",
        "sku": "650ML",
        "caseCount": 250,
        "price": 33.91,
        "dimensions": "8/7 (56cs)"
      }
    ]
  },
  {
    "id": "750ml",
    "sku": "750ML",
    "categoryId": "shallow-compartmental-containers",
    "subcategory": "Polypropylene (PP) · 250 Sets",
    "name": "Microwaveable PP Containers with Lids, 750ml, 250 Sets (50/10)",
    "slug": "750ml",
    "description": "Commercial food service packaging SKU 750ML: Microwaveable PP Containers with Lids, 750ml, 250 Sets (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 9/4 (36cs).",
    "palletTiHi": "9/4 (36cs)",
    "price": 33.91,
    "specialPrice": null,
    "mrpPrice": 45.78,
    "bestSeller": true,
    "imageUrl": "/images/cat_takeout_containers.jpg",
    "material": "Polypropylene (PP) · 250 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 78,
    "sizes": [
      {
        "name": "Case (250 pcs)",
        "sku": "750ML",
        "caseCount": 250,
        "price": 33.91,
        "dimensions": "9/4 (36cs)"
      }
    ]
  },
  {
    "id": "sq48",
    "sku": "SQ48",
    "categoryId": "shallow-compartmental-containers",
    "subcategory": "Polypropylene (PP) · 150 Sets",
    "name": "48oz Square Microwaveable Container with Lid, 150 Sets (50/6)",
    "slug": "sq48",
    "description": "Commercial food service packaging SKU SQ48: 48oz Square Microwaveable Container with Lid, 150 Sets (50/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 9/4 (36cs).",
    "palletTiHi": "9/4 (36cs)",
    "price": 42.49,
    "specialPrice": null,
    "mrpPrice": 57.36,
    "bestSeller": false,
    "imageUrl": "/images/cat_takeout_containers.jpg",
    "material": "Polypropylene (PP) · 150 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 85,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "SQ48",
        "caseCount": 150,
        "price": 42.49,
        "dimensions": "9/4 (36cs)"
      }
    ]
  },
  {
    "id": "sq348",
    "sku": "SQ348",
    "categoryId": "shallow-compartmental-containers",
    "subcategory": "Polypropylene (PP) · 3 Compartment · 100 Sets",
    "name": "48oz Square Microwaveable Container with Lid 3-compartment, 100 Sets (50/4)",
    "slug": "sq348",
    "description": "Commercial food service packaging SKU SQ348: 48oz Square Microwaveable Container with Lid 3-compartment, 100 Sets (50/4). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/6 (48cs).",
    "palletTiHi": "8/6 (48cs)",
    "price": 52.58,
    "specialPrice": null,
    "mrpPrice": 70.98,
    "bestSeller": false,
    "imageUrl": "/images/cat_takeout_containers.jpg",
    "material": "Polypropylene (PP) · 3 Compartment · 100 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.7,
    "reviewCount": 92,
    "sizes": [
      {
        "name": "Case (100 pcs)",
        "sku": "SQ348",
        "caseCount": 100,
        "price": 52.58,
        "dimensions": "8/6 (48cs)"
      }
    ]
  },
  {
    "id": "rct232",
    "sku": "RCT232",
    "categoryId": "shallow-compartmental-containers",
    "subcategory": "Polypropylene (PP) · 2 Compartment · 150 Sets",
    "name": "32oz Rectangular Microwaveable Container with Lid 2-compartment, 150 Sets (50/6)",
    "slug": "rct232",
    "description": "Commercial food service packaging SKU RCT232: 32oz Rectangular Microwaveable Container with Lid 2-compartment, 150 Sets (50/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/5 (30cs).",
    "palletTiHi": "6/5 (30cs)",
    "price": 25.85,
    "specialPrice": null,
    "mrpPrice": 34.9,
    "bestSeller": false,
    "imageUrl": "/images/rectangular_takeout_box.jpg",
    "material": "Polypropylene (PP) · 2 Compartment · 150 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 99,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "RCT232",
        "caseCount": 150,
        "price": 25.85,
        "dimensions": "6/5 (30cs)"
      }
    ]
  },
  {
    "id": "rct333",
    "sku": "RCT333",
    "categoryId": "shallow-compartmental-containers",
    "subcategory": "Polypropylene (PP) · 3 Compartment · 150 Sets",
    "name": "33oz Rectangular Microwaveable Container with Lid 3-compartment, 150 Sets (50/6)",
    "slug": "rct333",
    "description": "Commercial food service packaging SKU RCT333: 33oz Rectangular Microwaveable Container with Lid 3-compartment, 150 Sets (50/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/7 (42cs).",
    "palletTiHi": "6/7 (42cs)",
    "price": 20.65,
    "specialPrice": null,
    "mrpPrice": 27.88,
    "bestSeller": false,
    "imageUrl": "/images/rectangular_takeout_box.jpg",
    "material": "Polypropylene (PP) · 3 Compartment · 150 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 106,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "RCT333",
        "caseCount": 150,
        "price": 20.65,
        "dimensions": "6/7 (42cs)"
      }
    ]
  },
  {
    "id": "bgrpw7",
    "sku": "BGRPW7",
    "categoryId": "bagasse-plates-and-bowls",
    "subcategory": "Sugarcane Bagasse · PFAS FREE · 1000pc",
    "name": "Bagasse Round Plate, 7\", White, PFAS FREE, 1000pc (125/8)",
    "slug": "bgrpw7",
    "description": "Commercial food service packaging SKU BGRPW7: Bagasse Round Plate, 7\", White, PFAS FREE, 1000pc (125/8). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 9/6 (54cs).",
    "palletTiHi": "9/6 (54cs)",
    "price": 53.43,
    "specialPrice": null,
    "mrpPrice": 72.13,
    "bestSeller": true,
    "imageUrl": "/images/bagasse-round-plate.jpg",
    "material": "Sugarcane Bagasse · PFAS FREE · 1000pc",
    "color": "Standard",
    "bpiCertified": true,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 113,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "BGRPW7",
        "caseCount": 1000,
        "price": 53.43,
        "dimensions": "9/6 (54cs)"
      }
    ]
  },
  {
    "id": "bgrpw91",
    "sku": "BGRPW91",
    "categoryId": "bagasse-plates-and-bowls",
    "subcategory": "Sugarcane Bagasse · PFAS FREE · 500pc",
    "name": "Bagasse Round Plate, 9\", White, PFAS FREE, 500pc (125/4)",
    "slug": "bgrpw91",
    "description": "Commercial food service packaging SKU BGRPW91: Bagasse Round Plate, 9\", White, PFAS FREE, 500pc (125/4). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/8 (64cs).",
    "palletTiHi": "8/8 (64cs)",
    "price": 64.42,
    "specialPrice": null,
    "mrpPrice": 86.97,
    "bestSeller": false,
    "imageUrl": "/images/bagasse-round-plate.jpg",
    "material": "Sugarcane Bagasse · PFAS FREE · 500pc",
    "color": "Standard",
    "bpiCertified": true,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.9,
    "reviewCount": 120,
    "sizes": [
      {
        "name": "Case (500 pcs)",
        "sku": "BGRPW91",
        "caseCount": 500,
        "price": 64.42,
        "dimensions": "8/8 (64cs)"
      }
    ]
  },
  {
    "id": "bgrpw93",
    "sku": "BGRPW93",
    "categoryId": "bagasse-plates-and-bowls",
    "subcategory": "Sugarcane Bagasse · 3 Compartment · PFAS FREE · 500pc",
    "name": "Bagasse Round Plate 3-compartment, 9\", White, PFAS FREE, 500pc (125/4)",
    "slug": "bgrpw93",
    "description": "Commercial food service packaging SKU BGRPW93: Bagasse Round Plate 3-compartment, 9\", White, PFAS FREE, 500pc (125/4). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/9 (63cs).",
    "palletTiHi": "7/9 (63cs)",
    "price": 64.62,
    "specialPrice": null,
    "mrpPrice": 87.24,
    "bestSeller": false,
    "imageUrl": "/images/bagasse-round-plate.jpg",
    "material": "Sugarcane Bagasse · 3 Compartment · PFAS FREE · 500pc",
    "color": "Standard",
    "bpiCertified": true,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.7,
    "reviewCount": 127,
    "sizes": [
      {
        "name": "Case (500 pcs)",
        "sku": "BGRPW93",
        "caseCount": 500,
        "price": 64.62,
        "dimensions": "7/9 (63cs)"
      }
    ]
  },
  {
    "id": "bgrpw10",
    "sku": "BGRPW10",
    "categoryId": "bagasse-plates-and-bowls",
    "subcategory": "Sugarcane Bagasse · PFAS FREE · 500pc",
    "name": "Bagasse Round Plate, 10\", White, PFAS FREE, 500pc (125/4)",
    "slug": "bgrpw10",
    "description": "Commercial food service packaging SKU BGRPW10: Bagasse Round Plate, 10\", White, PFAS FREE, 500pc (125/4). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/8 (64cs).",
    "palletTiHi": "8/8 (64cs)",
    "price": 48.44,
    "specialPrice": null,
    "mrpPrice": 65.39,
    "bestSeller": false,
    "imageUrl": "/images/bagasse-round-plate.jpg",
    "material": "Sugarcane Bagasse · PFAS FREE · 500pc",
    "color": "Standard",
    "bpiCertified": true,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 134,
    "sizes": [
      {
        "name": "Case (500 pcs)",
        "sku": "BGRPW10",
        "caseCount": 500,
        "price": 48.44,
        "dimensions": "8/8 (64cs)"
      }
    ]
  },
  {
    "id": "bgrpw103",
    "sku": "BGRPW103",
    "categoryId": "bagasse-plates-and-bowls",
    "subcategory": "Sugarcane Bagasse · 3 Compartment · PFAS FREE · 500pc",
    "name": "Bagasse Round Plate 3-compartment, 10\", White, PFAS FREE, 500pc (125/4)",
    "slug": "bgrpw103",
    "description": "Commercial food service packaging SKU BGRPW103: Bagasse Round Plate 3-compartment, 10\", White, PFAS FREE, 500pc (125/4). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/8 (56cs).",
    "palletTiHi": "7/8 (56cs)",
    "price": 57.07,
    "specialPrice": null,
    "mrpPrice": 77.04,
    "bestSeller": false,
    "imageUrl": "/images/bagasse-round-plate.jpg",
    "material": "Sugarcane Bagasse · 3 Compartment · PFAS FREE · 500pc",
    "color": "Standard",
    "bpiCertified": true,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.9,
    "reviewCount": 141,
    "sizes": [
      {
        "name": "Case (500 pcs)",
        "sku": "BGRPW103",
        "caseCount": 500,
        "price": 57.07,
        "dimensions": "7/8 (56cs)"
      }
    ]
  },
  {
    "id": "bgbw12",
    "sku": "BGBW12",
    "categoryId": "bagasse-plates-and-bowls",
    "subcategory": "Sugarcane Bagasse · PFAS FREE · 1000pc",
    "name": "Bagasse 12oz Bowl, White, PFAS FREE, 1000pc (125/8)",
    "slug": "bgbw12",
    "description": "Commercial food service packaging SKU BGBW12: Bagasse 12oz Bowl, White, PFAS FREE, 1000pc (125/8). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/6 (42cs).",
    "palletTiHi": "7/6 (42cs)",
    "price": 45.75,
    "specialPrice": null,
    "mrpPrice": 61.76,
    "bestSeller": true,
    "imageUrl": "/images/bagasse-bowl.jpg",
    "material": "Sugarcane Bagasse · PFAS FREE · 1000pc",
    "color": "Standard",
    "bpiCertified": true,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 33,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "BGBW12",
        "caseCount": 1000,
        "price": 45.75,
        "dimensions": "7/6 (42cs)"
      }
    ]
  },
  {
    "id": "bgbw16",
    "sku": "BGBW16",
    "categoryId": "bagasse-plates-and-bowls",
    "subcategory": "Sugarcane Bagasse · PFAS FREE · 1000pc",
    "name": "Bagasse 16oz Bowl, White, PFAS FREE, 1000pc (125/8)",
    "slug": "bgbw16",
    "description": "Commercial food service packaging SKU BGBW16: Bagasse 16oz Bowl, White, PFAS FREE, 1000pc (125/8). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 5/6 (30cs).",
    "palletTiHi": "5/6 (30cs)",
    "price": 25.85,
    "specialPrice": null,
    "mrpPrice": 34.9,
    "bestSeller": false,
    "imageUrl": "/images/bagasse-bowl.jpg",
    "material": "Sugarcane Bagasse · PFAS FREE · 1000pc",
    "color": "Standard",
    "bpiCertified": true,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.9,
    "reviewCount": 40,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "BGBW16",
        "caseCount": 1000,
        "price": 25.85,
        "dimensions": "5/6 (30cs)"
      }
    ]
  },
  {
    "id": "bgbw32",
    "sku": "BGBW32",
    "categoryId": "bagasse-plates-and-bowls",
    "subcategory": "Sugarcane Bagasse · PFAS FREE · 500pc",
    "name": "Bagasse 32oz Bowl, White, PFAS FREE, 500pc (125/4)",
    "slug": "bgbw32",
    "description": "Commercial food service packaging SKU BGBW32: Bagasse 32oz Bowl, White, PFAS FREE, 500pc (125/4). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/5 (50cs).",
    "palletTiHi": "10/5 (50cs)",
    "price": 33.65,
    "specialPrice": null,
    "mrpPrice": 45.43,
    "bestSeller": false,
    "imageUrl": "/images/bagasse-bowl.jpg",
    "material": "Sugarcane Bagasse · PFAS FREE · 500pc",
    "color": "Standard",
    "bpiCertified": true,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.7,
    "reviewCount": 47,
    "sizes": [
      {
        "name": "Case (500 pcs)",
        "sku": "BGBW32",
        "caseCount": 500,
        "price": 33.65,
        "dimensions": "10/5 (50cs)"
      }
    ]
  },
  {
    "id": "bgl12",
    "sku": "BGL12",
    "categoryId": "bagasse-plates-and-bowls",
    "subcategory": "Ultra-Clear PET Plastic · 500pc Lid",
    "name": "PET Lid for Bagasse 12oz Bowl, 500pc (125/4)",
    "slug": "bgl12",
    "description": "Commercial food service packaging SKU BGL12: PET Lid for Bagasse 12oz Bowl, 500pc (125/4). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 5/6 (30cs).",
    "palletTiHi": "5/6 (30cs)",
    "price": 40.15,
    "specialPrice": null,
    "mrpPrice": 54.2,
    "bestSeller": false,
    "imageUrl": "/images/bagasse-bowl.jpg",
    "material": "Ultra-Clear PET Plastic · 500pc Lid",
    "color": "Standard",
    "bpiCertified": true,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 54,
    "sizes": [
      {
        "name": "Case (500 pcs)",
        "sku": "BGL12",
        "caseCount": 500,
        "price": 40.15,
        "dimensions": "5/6 (30cs)"
      }
    ]
  },
  {
    "id": "bgl16",
    "sku": "BGL16",
    "categoryId": "bagasse-plates-and-bowls",
    "subcategory": "Ultra-Clear PET Plastic · 500pc Lid",
    "name": "PET Lid for Bagasse 16oz Bowl, 500pc (125/4)",
    "slug": "bgl16",
    "description": "Commercial food service packaging SKU BGL16: PET Lid for Bagasse 16oz Bowl, 500pc (125/4). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 5/6 (30cs).",
    "palletTiHi": "5/6 (30cs)",
    "price": 47.95,
    "specialPrice": null,
    "mrpPrice": 64.73,
    "bestSeller": false,
    "imageUrl": "/images/bagasse-bowl.jpg",
    "material": "Ultra-Clear PET Plastic · 500pc Lid",
    "color": "Standard",
    "bpiCertified": true,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.9,
    "reviewCount": 61,
    "sizes": [
      {
        "name": "Case (500 pcs)",
        "sku": "BGL16",
        "caseCount": 500,
        "price": 47.95,
        "dimensions": "5/6 (30cs)"
      }
    ]
  },
  {
    "id": "bgl32",
    "sku": "BGL32",
    "categoryId": "bagasse-plates-and-bowls",
    "subcategory": "Ultra-Clear PET Plastic · 300pc Lid",
    "name": "PET Lid for Bagasse 32oz Bowl, 300pc (75/4)",
    "slug": "bgl32",
    "description": "Commercial food service packaging SKU BGL32: PET Lid for Bagasse 32oz Bowl, 300pc (75/4). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/5 (35cs).",
    "palletTiHi": "7/5 (35cs)",
    "price": 34.45,
    "specialPrice": null,
    "mrpPrice": 46.51,
    "bestSeller": true,
    "imageUrl": "/images/bagasse-bowl.jpg",
    "material": "Ultra-Clear PET Plastic · 300pc Lid",
    "color": "Standard",
    "bpiCertified": true,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 68,
    "sizes": [
      {
        "name": "Case (300 pcs)",
        "sku": "BGL32",
        "caseCount": 300,
        "price": 34.45,
        "dimensions": "7/5 (35cs)"
      }
    ]
  },
  {
    "id": "ptw08",
    "sku": "PTW08",
    "categoryId": "paper-take-out-boxes",
    "subcategory": "Poly-Coated White Paperboard · 500 pcs",
    "name": "8 oz Paper Take-Out Box, White, 500 pcs (50/10)",
    "slug": "ptw08",
    "description": "Commercial food service packaging SKU PTW08: 8 oz Paper Take-Out Box, White, 500 pcs (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/7 (70cs).",
    "palletTiHi": "10/7 (70cs)",
    "price": 30.59,
    "specialPrice": null,
    "mrpPrice": 41.3,
    "bestSeller": false,
    "imageUrl": "/images/paper-take-out-box.jpg",
    "material": "Poly-Coated White Paperboard · 500 pcs",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.9,
    "reviewCount": 75,
    "sizes": [
      {
        "name": "Case (500 pcs)",
        "sku": "PTW08",
        "caseCount": 500,
        "price": 30.59,
        "dimensions": "10/7 (70cs)"
      }
    ]
  },
  {
    "id": "ptw16",
    "sku": "PTW16",
    "categoryId": "paper-take-out-boxes",
    "subcategory": "Poly-Coated White Paperboard · 450 pcs",
    "name": "16 oz Paper Take-Out Box, White, 450 pcs (50/9)",
    "slug": "ptw16",
    "description": "Commercial food service packaging SKU PTW16: 16 oz Paper Take-Out Box, White, 450 pcs (50/9). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/6 (48cs).",
    "palletTiHi": "8/6 (48cs)",
    "price": 34.22,
    "specialPrice": null,
    "mrpPrice": 46.2,
    "bestSeller": false,
    "imageUrl": "/images/paper-take-out-box.jpg",
    "material": "Poly-Coated White Paperboard · 450 pcs",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.7,
    "reviewCount": 82,
    "sizes": [
      {
        "name": "Case (450 pcs)",
        "sku": "PTW16",
        "caseCount": 450,
        "price": 34.22,
        "dimensions": "8/6 (48cs)"
      }
    ]
  },
  {
    "id": "ptw26",
    "sku": "PTW26",
    "categoryId": "paper-take-out-boxes",
    "subcategory": "Poly-Coated White Paperboard · 450 pcs",
    "name": "26 oz Paper Take-Out Box, White, 450 pcs (50/9)",
    "slug": "ptw26",
    "description": "Commercial food service packaging SKU PTW26: 26 oz Paper Take-Out Box, White, 450 pcs (50/9). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/6 (36cs).",
    "palletTiHi": "6/6 (36cs)",
    "price": 30.85,
    "specialPrice": null,
    "mrpPrice": 41.65,
    "bestSeller": false,
    "imageUrl": "/images/paper-take-out-box.jpg",
    "material": "Poly-Coated White Paperboard · 450 pcs",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 89,
    "sizes": [
      {
        "name": "Case (450 pcs)",
        "sku": "PTW26",
        "caseCount": 450,
        "price": 30.85,
        "dimensions": "6/6 (36cs)"
      }
    ]
  },
  {
    "id": "ptw32",
    "sku": "PTW32",
    "categoryId": "paper-take-out-boxes",
    "subcategory": "Poly-Coated White Paperboard · 450 pcs",
    "name": "32 oz Paper Take-Out Box, White, 450 pcs (50/9)",
    "slug": "ptw32",
    "description": "Commercial food service packaging SKU PTW32: 32 oz Paper Take-Out Box, White, 450 pcs (50/9). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/5 (30cs).",
    "palletTiHi": "6/5 (30cs)",
    "price": 35.22,
    "specialPrice": null,
    "mrpPrice": 47.55,
    "bestSeller": false,
    "imageUrl": "/images/paper-take-out-box.jpg",
    "material": "Poly-Coated White Paperboard · 450 pcs",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.9,
    "reviewCount": 96,
    "sizes": [
      {
        "name": "Case (450 pcs)",
        "sku": "PTW32",
        "caseCount": 450,
        "price": 35.22,
        "dimensions": "6/5 (30cs)"
      }
    ]
  },
  {
    "id": "v61wh",
    "sku": "V61WH",
    "categoryId": "mfpp-hinged-containers-white",
    "subcategory": "Mineral-Filled Polypropylene (MFPP) · 250pc",
    "name": "MFPP Hinged Container, White, 6\" x 6\", 250pc (250/1)",
    "slug": "v61wh",
    "description": "Commercial food service packaging SKU V61WH: MFPP Hinged Container, White, 6\" x 6\", 250pc (250/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/7 (49cs).",
    "palletTiHi": "7/7 (49cs)",
    "price": 24.55,
    "specialPrice": null,
    "mrpPrice": 33.14,
    "bestSeller": true,
    "imageUrl": "/images/white_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP) · 250pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 103,
    "sizes": [
      {
        "name": "Case (250 pcs)",
        "sku": "V61WH",
        "caseCount": 250,
        "price": 24.55,
        "dimensions": "7/7 (49cs)"
      }
    ]
  },
  {
    "id": "v96wh",
    "sku": "V96WH",
    "categoryId": "mfpp-hinged-containers-white",
    "subcategory": "Mineral-Filled Polypropylene (MFPP) · 200pc",
    "name": "MFPP Hinged Container, Vented, White, 9\" x 6\", 200pc (200/1)",
    "slug": "v96wh",
    "description": "Commercial food service packaging SKU V96WH: MFPP Hinged Container, Vented, White, 9\" x 6\", 200pc (200/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/7 (38cs).",
    "palletTiHi": "6/7 (38cs)",
    "price": 31.05,
    "specialPrice": null,
    "mrpPrice": 41.92,
    "bestSeller": false,
    "imageUrl": "/images/white_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP) · 200pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 110,
    "sizes": [
      {
        "name": "Case (200 pcs)",
        "sku": "V96WH",
        "caseCount": 200,
        "price": 31.05,
        "dimensions": "6/7 (38cs)"
      }
    ]
  },
  {
    "id": "v96wh-150",
    "sku": "V96WH-150",
    "categoryId": "mfpp-hinged-containers-white",
    "subcategory": "Mineral-Filled Polypropylene (MFPP) · 150pc",
    "name": "MFPP Hinged Container, Vented, White, 9\" x 6\", 150pc (150/1)",
    "slug": "v96wh-150",
    "description": "Commercial food service packaging SKU V96WH-150: MFPP Hinged Container, Vented, White, 9\" x 6\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 13/6 (78cs).",
    "palletTiHi": "13/6 (78cs)",
    "price": 23.09,
    "specialPrice": null,
    "mrpPrice": 31.17,
    "bestSeller": false,
    "imageUrl": "/images/white_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP) · 150pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.7,
    "reviewCount": 117,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "V96WH-150",
        "caseCount": 150,
        "price": 23.09,
        "dimensions": "13/6 (78cs)"
      }
    ]
  },
  {
    "id": "v962wh",
    "sku": "V962WH",
    "categoryId": "mfpp-hinged-containers-white",
    "subcategory": "Mineral-Filled Polypropylene (MFPP) · 2-Comp · 200pc",
    "name": "MFPP Hinged Container, White, 2-compartment, 9\" x 6\", 200pc (200/1)",
    "slug": "v962wh",
    "description": "Commercial food service packaging SKU V962WH: MFPP Hinged Container, White, 2-compartment, 9\" x 6\", 200pc (200/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/7 (38cs).",
    "palletTiHi": "6/7 (38cs)",
    "price": 28.45,
    "specialPrice": null,
    "mrpPrice": 38.41,
    "bestSeller": false,
    "imageUrl": "/images/white_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP) · 2-Comp · 200pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 124,
    "sizes": [
      {
        "name": "Case (200 pcs)",
        "sku": "V962WH",
        "caseCount": 200,
        "price": 28.45,
        "dimensions": "6/7 (38cs)"
      }
    ]
  },
  {
    "id": "v71wh",
    "sku": "V71WH",
    "categoryId": "mfpp-hinged-containers-white",
    "subcategory": "Mineral-Filled Polypropylene (MFPP) · 150pc",
    "name": "MFPP Hinged Container, White, Vented, One Compartment, 7\" x 7\", 150pc (150/1)",
    "slug": "v71wh",
    "description": "Commercial food service packaging SKU V71WH: MFPP Hinged Container, White, Vented, One Compartment, 7\" x 7\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/10 (75cs).",
    "palletTiHi": "7/10 (75cs)",
    "price": 21.95,
    "specialPrice": null,
    "mrpPrice": 29.63,
    "bestSeller": false,
    "imageUrl": "/images/white_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP) · 150pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 131,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "V71WH",
        "caseCount": 150,
        "price": 21.95,
        "dimensions": "7/10 (75cs)"
      }
    ]
  },
  {
    "id": "v73wh",
    "sku": "V73WH",
    "categoryId": "mfpp-hinged-containers-white",
    "subcategory": "Mineral-Filled Polypropylene (MFPP) · 3-Comp · 150pc",
    "name": "MFPP Hinged Container, White, Vented, Three Compartment, 7\" x 7\", 150pc (150/1)",
    "slug": "v73wh",
    "description": "Commercial food service packaging SKU V73WH: MFPP Hinged Container, White, Vented, Three Compartment, 7\" x 7\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/10 (75cs).",
    "palletTiHi": "7/10 (75cs)",
    "price": 21.95,
    "specialPrice": null,
    "mrpPrice": 29.63,
    "bestSeller": true,
    "imageUrl": "/images/white_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP) · 3-Comp · 150pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 138,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "V73WH",
        "caseCount": 150,
        "price": 21.95,
        "dimensions": "7/10 (75cs)"
      }
    ]
  },
  {
    "id": "v81wh",
    "sku": "V81WH",
    "categoryId": "mfpp-hinged-containers-white",
    "subcategory": "Mineral-Filled Polypropylene (MFPP) · 150pc",
    "name": "MFPP Hinged Container, White, Vented, One Compartment, 8\" x 8\", 150pc (150/1)",
    "slug": "v81wh",
    "description": "Commercial food service packaging SKU V81WH: MFPP Hinged Container, White, Vented, One Compartment, 8\" x 8\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/9 (54cs).",
    "palletTiHi": "6/9 (54cs)",
    "price": 24.55,
    "specialPrice": null,
    "mrpPrice": 33.14,
    "bestSeller": false,
    "imageUrl": "/images/white_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP) · 150pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 30,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "V81WH",
        "caseCount": 150,
        "price": 24.55,
        "dimensions": "6/9 (54cs)"
      }
    ]
  },
  {
    "id": "v83wh",
    "sku": "V83WH",
    "categoryId": "mfpp-hinged-containers-white",
    "subcategory": "Mineral-Filled Polypropylene (MFPP) · 3-Comp · 150pc",
    "name": "MFPP Hinged Container, White, Vented, Three Compartment, 8\" x 8\", 150pc (150/1)",
    "slug": "v83wh",
    "description": "Commercial food service packaging SKU V83WH: MFPP Hinged Container, White, Vented, Three Compartment, 8\" x 8\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/9 (54cs).",
    "palletTiHi": "6/9 (54cs)",
    "price": 24.55,
    "specialPrice": null,
    "mrpPrice": 33.14,
    "bestSeller": false,
    "imageUrl": "/images/white_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP) · 3-Comp · 150pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.7,
    "reviewCount": 37,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "V83WH",
        "caseCount": 150,
        "price": 24.55,
        "dimensions": "6/9 (54cs)"
      }
    ]
  },
  {
    "id": "v91wh",
    "sku": "V91WH",
    "categoryId": "mfpp-hinged-containers-white",
    "subcategory": "Mineral-Filled Polypropylene (MFPP) · 150pc",
    "name": "MFPP Hinged Container, White, Vented, One Compartment, 9\" x 9\", 150pc (150/1)",
    "slug": "v91wh",
    "description": "Commercial food service packaging SKU V91WH: MFPP Hinged Container, White, Vented, One Compartment, 9\" x 9\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 5/9 (44cs).",
    "palletTiHi": "5/9 (44cs)",
    "price": 28.45,
    "specialPrice": null,
    "mrpPrice": 38.41,
    "bestSeller": false,
    "imageUrl": "/images/white_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP) · 150pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 44,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "V91WH",
        "caseCount": 150,
        "price": 28.45,
        "dimensions": "5/9 (44cs)"
      }
    ]
  },
  {
    "id": "v93wh",
    "sku": "V93WH",
    "categoryId": "mfpp-hinged-containers-white",
    "subcategory": "Mineral-Filled Polypropylene (MFPP) · 3-Comp · 150pc",
    "name": "MFPP Hinged Container, White, Vented, Three Compartment, 9\" x 9\", 150pc (150/1)",
    "slug": "v93wh",
    "description": "Commercial food service packaging SKU V93WH: MFPP Hinged Container, White, Vented, Three Compartment, 9\" x 9\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 5/9 (44cs).",
    "palletTiHi": "5/9 (44cs)",
    "price": 28.45,
    "specialPrice": null,
    "mrpPrice": 38.41,
    "bestSeller": false,
    "imageUrl": "/images/white_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP) · 3-Comp · 150pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 51,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "V93WH",
        "caseCount": 150,
        "price": 28.45,
        "dimensions": "5/9 (44cs)"
      }
    ]
  },
  {
    "id": "v61bl",
    "sku": "V61BL",
    "categoryId": "mfpp-hinged-containers-black",
    "subcategory": "Mineral-Filled Polypropylene (MFPP) · Black · 250pc",
    "name": "MFPP Hinged Container, Black, 6\" x 6\", 250pc (250/1)",
    "slug": "v61bl",
    "description": "Commercial food service packaging SKU V61BL: MFPP Hinged Container, Black, 6\" x 6\", 250pc (250/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/7 (49cs).",
    "palletTiHi": "7/7 (49cs)",
    "price": 24.55,
    "specialPrice": null,
    "mrpPrice": 33.14,
    "bestSeller": true,
    "imageUrl": "/images/black_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP) · Black · 250pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 58,
    "sizes": [
      {
        "name": "Case (250 pcs)",
        "sku": "V61BL",
        "caseCount": 250,
        "price": 24.55,
        "dimensions": "7/7 (49cs)"
      }
    ]
  },
  {
    "id": "v96bl",
    "sku": "V96BL",
    "categoryId": "mfpp-hinged-containers-black",
    "subcategory": "Mineral-Filled Polypropylene (MFPP) · Black · 200pc",
    "name": "MFPP Hinged Container, Vented, Black, 9\" x 6\", 200pc (200/1)",
    "slug": "v96bl",
    "description": "Commercial food service packaging SKU V96BL: MFPP Hinged Container, Vented, Black, 9\" x 6\", 200pc (200/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/7 (38cs).",
    "palletTiHi": "6/7 (38cs)",
    "price": 31.05,
    "specialPrice": null,
    "mrpPrice": 41.92,
    "bestSeller": false,
    "imageUrl": "/images/black_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP) · Black · 200pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 65,
    "sizes": [
      {
        "name": "Case (200 pcs)",
        "sku": "V96BL",
        "caseCount": 200,
        "price": 31.05,
        "dimensions": "6/7 (38cs)"
      }
    ]
  },
  {
    "id": "v96bl-150",
    "sku": "V96BL-150",
    "categoryId": "mfpp-hinged-containers-black",
    "subcategory": "Mineral-Filled Polypropylene (MFPP) · Black · 150pc",
    "name": "MFPP Hinged Container, Vented, Black, 9\" x 6\", 150pc (150/1)",
    "slug": "v96bl-150",
    "description": "Commercial food service packaging SKU V96BL-150: MFPP Hinged Container, Vented, Black, 9\" x 6\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 13/6 (78cs).",
    "palletTiHi": "13/6 (78cs)",
    "price": 23.09,
    "specialPrice": null,
    "mrpPrice": 31.17,
    "bestSeller": false,
    "imageUrl": "/images/black_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP) · Black · 150pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.7,
    "reviewCount": 72,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "V96BL-150",
        "caseCount": 150,
        "price": 23.09,
        "dimensions": "13/6 (78cs)"
      }
    ]
  },
  {
    "id": "v962bl",
    "sku": "V962BL",
    "categoryId": "mfpp-hinged-containers-black",
    "subcategory": "Mineral-Filled Polypropylene (MFPP) · Black · 2-Comp · 200pc",
    "name": "MFPP Hinged Container, Black, 2-compartment, 9\" x 6\", 200pc (200/1)",
    "slug": "v962bl",
    "description": "Commercial food service packaging SKU V962BL: MFPP Hinged Container, Black, 2-compartment, 9\" x 6\", 200pc (200/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/7 (38cs).",
    "palletTiHi": "6/7 (38cs)",
    "price": 28.45,
    "specialPrice": null,
    "mrpPrice": 38.41,
    "bestSeller": false,
    "imageUrl": "/images/black_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP) · Black · 2-Comp · 200pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 79,
    "sizes": [
      {
        "name": "Case (200 pcs)",
        "sku": "V962BL",
        "caseCount": 200,
        "price": 28.45,
        "dimensions": "6/7 (38cs)"
      }
    ]
  },
  {
    "id": "v71bl",
    "sku": "V71BL",
    "categoryId": "mfpp-hinged-containers-black",
    "subcategory": "Mineral-Filled Polypropylene (MFPP) · Black · 150pc",
    "name": "MFPP Hinged Container, Black, Vented, One Compartment, 7\" x 7\", 150pc (150/1)",
    "slug": "v71bl",
    "description": "Commercial food service packaging SKU V71BL: MFPP Hinged Container, Black, Vented, One Compartment, 7\" x 7\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/10 (75cs).",
    "palletTiHi": "7/10 (75cs)",
    "price": 21.95,
    "specialPrice": null,
    "mrpPrice": 29.63,
    "bestSeller": false,
    "imageUrl": "/images/black_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP) · Black · 150pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 86,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "V71BL",
        "caseCount": 150,
        "price": 21.95,
        "dimensions": "7/10 (75cs)"
      }
    ]
  },
  {
    "id": "v73bl",
    "sku": "V73BL",
    "categoryId": "mfpp-hinged-containers-black",
    "subcategory": "Mineral-Filled Polypropylene (MFPP) · Black · 3-Comp · 150pc",
    "name": "MFPP Hinged Container, Black, Vented, Three Compartment, 7\" x 7\", 150pc (150/1)",
    "slug": "v73bl",
    "description": "Commercial food service packaging SKU V73BL: MFPP Hinged Container, Black, Vented, Three Compartment, 7\" x 7\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/10 (75cs).",
    "palletTiHi": "7/10 (75cs)",
    "price": 21.95,
    "specialPrice": null,
    "mrpPrice": 29.63,
    "bestSeller": true,
    "imageUrl": "/images/black_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP) · Black · 3-Comp · 150pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 93,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "V73BL",
        "caseCount": 150,
        "price": 21.95,
        "dimensions": "7/10 (75cs)"
      }
    ]
  },
  {
    "id": "v81bl",
    "sku": "V81BL",
    "categoryId": "mfpp-hinged-containers-black",
    "subcategory": "Mineral-Filled Polypropylene (MFPP) · Black · 150pc",
    "name": "MFPP Hinged Container, Black, Vented, One Compartment, 8\" x 8\", 150pc (150/1)",
    "slug": "v81bl",
    "description": "Commercial food service packaging SKU V81BL: MFPP Hinged Container, Black, Vented, One Compartment, 8\" x 8\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/9 (54cs).",
    "palletTiHi": "6/9 (54cs)",
    "price": 24.55,
    "specialPrice": null,
    "mrpPrice": 33.14,
    "bestSeller": false,
    "imageUrl": "/images/black_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP) · Black · 150pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 100,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "V81BL",
        "caseCount": 150,
        "price": 24.55,
        "dimensions": "6/9 (54cs)"
      }
    ]
  },
  {
    "id": "v83bl",
    "sku": "V83BL",
    "categoryId": "mfpp-hinged-containers-black",
    "subcategory": "Mineral-Filled Polypropylene (MFPP) · Black · 3-Comp · 150pc",
    "name": "MFPP Hinged Container, Black, Vented, Three Compartment, 8\" x 8\", 150pc (150/1)",
    "slug": "v83bl",
    "description": "Commercial food service packaging SKU V83BL: MFPP Hinged Container, Black, Vented, Three Compartment, 8\" x 8\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/9 (54cs).",
    "palletTiHi": "6/9 (54cs)",
    "price": 24.55,
    "specialPrice": null,
    "mrpPrice": 33.14,
    "bestSeller": false,
    "imageUrl": "/images/black_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP) · Black · 3-Comp · 150pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.7,
    "reviewCount": 107,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "V83BL",
        "caseCount": 150,
        "price": 24.55,
        "dimensions": "6/9 (54cs)"
      }
    ]
  },
  {
    "id": "v91bl",
    "sku": "V91BL",
    "categoryId": "mfpp-hinged-containers-black",
    "subcategory": "Mineral-Filled Polypropylene (MFPP) · Black · 150pc",
    "name": "MFPP Hinged Container, Black, Vented, One Compartment, 9\" x 9\", 150pc (150/1)",
    "slug": "v91bl",
    "description": "Commercial food service packaging SKU V91BL: MFPP Hinged Container, Black, Vented, One Compartment, 9\" x 9\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 5/9 (44cs).",
    "palletTiHi": "5/9 (44cs)",
    "price": 28.45,
    "specialPrice": null,
    "mrpPrice": 38.41,
    "bestSeller": false,
    "imageUrl": "/images/black_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP) · Black · 150pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 114,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "V91BL",
        "caseCount": 150,
        "price": 28.45,
        "dimensions": "5/9 (44cs)"
      }
    ]
  },
  {
    "id": "v93bl",
    "sku": "V93BL",
    "categoryId": "mfpp-hinged-containers-black",
    "subcategory": "Mineral-Filled Polypropylene (MFPP) · Black · 3-Comp · 150pc",
    "name": "MFPP Hinged Container, Black, Vented, Three Compartment, 9\" x 9\", 150pc (150/1)",
    "slug": "v93bl",
    "description": "Commercial food service packaging SKU V93BL: MFPP Hinged Container, Black, Vented, Three Compartment, 9\" x 9\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 5/9 (44cs).",
    "palletTiHi": "5/9 (44cs)",
    "price": 28.45,
    "specialPrice": null,
    "mrpPrice": 38.41,
    "bestSeller": false,
    "imageUrl": "/images/black_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP) · Black · 3-Comp · 150pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 121,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "V93BL",
        "caseCount": 150,
        "price": 28.45,
        "dimensions": "5/9 (44cs)"
      }
    ]
  },
  {
    "id": "pc075",
    "sku": "PC075",
    "categoryId": "portion-cups",
    "subcategory": "Polypropylene (PP) · 2500pc",
    "name": "0.75oz Portion Cups, PP, 2500pc (100/25)",
    "slug": "pc075",
    "description": "Commercial food service packaging SKU PC075: 0.75oz Portion Cups, PP, 2500pc (100/25). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 36.6,
    "specialPrice": null,
    "mrpPrice": 49.41,
    "bestSeller": true,
    "imageUrl": "/images/portion-cup.jpg",
    "material": "Polypropylene (PP) · 2500pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 128,
    "sizes": [
      {
        "name": "Case (2500 pcs)",
        "sku": "PC075",
        "caseCount": 2500,
        "price": 36.6,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "pc100",
    "sku": "PC100",
    "categoryId": "portion-cups",
    "subcategory": "Polypropylene (PP) · 2500pc",
    "name": "1oz Portion Cups, PP, 2500pc (100/25)",
    "slug": "pc100",
    "description": "Commercial food service packaging SKU PC100: 1oz Portion Cups, PP, 2500pc (100/25). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 41.45,
    "specialPrice": null,
    "mrpPrice": 55.96,
    "bestSeller": false,
    "imageUrl": "/images/portion-cup.jpg",
    "material": "Polypropylene (PP) · 2500pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 135,
    "sizes": [
      {
        "name": "Case (2500 pcs)",
        "sku": "PC100",
        "caseCount": 2500,
        "price": 41.45,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "pc150",
    "sku": "PC150",
    "categoryId": "portion-cups",
    "subcategory": "Polypropylene (PP) · 2500pc",
    "name": "1.5oz Portion Cups, PP, 2500pc (100/25)",
    "slug": "pc150",
    "description": "Commercial food service packaging SKU PC150: 1.5oz Portion Cups, PP, 2500pc (100/25). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/5 (30cs).",
    "palletTiHi": "6/5 (30cs)",
    "price": 33.31,
    "specialPrice": null,
    "mrpPrice": 44.97,
    "bestSeller": false,
    "imageUrl": "/images/portion-cup.jpg",
    "material": "Polypropylene (PP) · 2500pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.7,
    "reviewCount": 142,
    "sizes": [
      {
        "name": "Case (2500 pcs)",
        "sku": "PC150",
        "caseCount": 2500,
        "price": 33.31,
        "dimensions": "6/5 (30cs)"
      }
    ]
  },
  {
    "id": "pc200",
    "sku": "PC200",
    "categoryId": "portion-cups",
    "subcategory": "Polypropylene (PP) · 2500pc",
    "name": "2oz Portion Cups, PP, 2500pc (100/25)",
    "slug": "pc200",
    "description": "Commercial food service packaging SKU PC200: 2oz Portion Cups, PP, 2500pc (100/25). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/5 (30cs).",
    "palletTiHi": "6/5 (30cs)",
    "price": 34.5,
    "specialPrice": null,
    "mrpPrice": 46.58,
    "bestSeller": false,
    "imageUrl": "/images/portion-cup.jpg",
    "material": "Polypropylene (PP) · 2500pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 34,
    "sizes": [
      {
        "name": "Case (2500 pcs)",
        "sku": "PC200",
        "caseCount": 2500,
        "price": 34.5,
        "dimensions": "6/5 (30cs)"
      }
    ]
  },
  {
    "id": "pc325",
    "sku": "PC325",
    "categoryId": "portion-cups",
    "subcategory": "Polypropylene (PP) · 2500pc",
    "name": "3.25oz Portion Cups, PP, 2500pc (100/25)",
    "slug": "pc325",
    "description": "Commercial food service packaging SKU PC325: 3.25oz Portion Cups, PP, 2500pc (100/25). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/7 (49cs).",
    "palletTiHi": "7/7 (49cs)",
    "price": 22.21,
    "specialPrice": null,
    "mrpPrice": 29.98,
    "bestSeller": false,
    "imageUrl": "/images/portion-cup.jpg",
    "material": "Polypropylene (PP) · 2500pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 41,
    "sizes": [
      {
        "name": "Case (2500 pcs)",
        "sku": "PC325",
        "caseCount": 2500,
        "price": 22.21,
        "dimensions": "7/7 (49cs)"
      }
    ]
  },
  {
    "id": "pc400",
    "sku": "PC400",
    "categoryId": "portion-cups",
    "subcategory": "Polypropylene (PP) · 2500pc",
    "name": "4oz Portion Cups, PP, 2500pc (100/25)",
    "slug": "pc400",
    "description": "Commercial food service packaging SKU PC400: 4oz Portion Cups, PP, 2500pc (100/25). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/6 (42cs).",
    "palletTiHi": "7/6 (42cs)",
    "price": 41.6,
    "specialPrice": null,
    "mrpPrice": 56.16,
    "bestSeller": true,
    "imageUrl": "/images/portion-cup.jpg",
    "material": "Polypropylene (PP) · 2500pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 48,
    "sizes": [
      {
        "name": "Case (2500 pcs)",
        "sku": "PC400",
        "caseCount": 2500,
        "price": 41.6,
        "dimensions": "7/6 (42cs)"
      }
    ]
  },
  {
    "id": "pc550",
    "sku": "PC550",
    "categoryId": "portion-cups",
    "subcategory": "Polypropylene (PP) · 2500pc",
    "name": "5.5oz Portion Cups, PP, 2500pc (100/25)",
    "slug": "pc550",
    "description": "Commercial food service packaging SKU PC550: 5.5oz Portion Cups, PP, 2500pc (100/25). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 5/10 (50cs).",
    "palletTiHi": "5/10 (50cs)",
    "price": 33.65,
    "specialPrice": null,
    "mrpPrice": 45.43,
    "bestSeller": false,
    "imageUrl": "/images/portion-cup.jpg",
    "material": "Polypropylene (PP) · 2500pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 55,
    "sizes": [
      {
        "name": "Case (2500 pcs)",
        "sku": "PC550",
        "caseCount": 2500,
        "price": 33.65,
        "dimensions": "5/10 (50cs)"
      }
    ]
  },
  {
    "id": "pc075100l",
    "sku": "PC075100L",
    "categoryId": "portion-cup-lids",
    "subcategory": "Ultra-Clear PET · 2500pc",
    "name": "Lid Flat PET for 0.75oz and 1oz, 2500pc (100/25)",
    "slug": "pc075100l",
    "description": "Commercial food service packaging SKU PC075100L: Lid Flat PET for 0.75oz and 1oz, 2500pc (100/25). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 4/10 (40cs).",
    "palletTiHi": "4/10 (40cs)",
    "price": 41.97,
    "specialPrice": null,
    "mrpPrice": 56.66,
    "bestSeller": false,
    "imageUrl": "/images/portion-cup-lids.jpg",
    "material": "Ultra-Clear PET · 2500pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.7,
    "reviewCount": 62,
    "sizes": [
      {
        "name": "Case (2500 pcs)",
        "sku": "PC075100L",
        "caseCount": 2500,
        "price": 41.97,
        "dimensions": "4/10 (40cs)"
      }
    ]
  },
  {
    "id": "pc150250l",
    "sku": "PC150250L",
    "categoryId": "portion-cup-lids",
    "subcategory": "Ultra-Clear PET · 2500pc",
    "name": "Lid Flat PET for 1.5oz and 2oz, 2500pc (125/20)",
    "slug": "pc150250l",
    "description": "Commercial food service packaging SKU PC150250L: Lid Flat PET for 1.5oz and 2oz, 2500pc (125/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/10 (60cs).",
    "palletTiHi": "6/10 (60cs)",
    "price": 41.97,
    "specialPrice": null,
    "mrpPrice": 56.66,
    "bestSeller": false,
    "imageUrl": "/images/portion-cup-lids.jpg",
    "material": "Ultra-Clear PET · 2500pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 69,
    "sizes": [
      {
        "name": "Case (2500 pcs)",
        "sku": "PC150250L",
        "caseCount": 2500,
        "price": 41.97,
        "dimensions": "6/10 (60cs)"
      }
    ]
  },
  {
    "id": "pc325550l",
    "sku": "PC325550L",
    "categoryId": "portion-cup-lids",
    "subcategory": "Ultra-Clear PET · 2500pc",
    "name": "Lid Flat PET for 3.25oz, 4oz, and 5.5oz, 2500pc (100/25)",
    "slug": "pc325550l",
    "description": "Commercial food service packaging SKU PC325550L: Lid Flat PET for 3.25oz, 4oz, and 5.5oz, 2500pc (100/25). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 5/8 (40cs).",
    "palletTiHi": "5/8 (40cs)",
    "price": 29.91,
    "specialPrice": null,
    "mrpPrice": 40.38,
    "bestSeller": false,
    "imageUrl": "/images/portion-cup-lids.jpg",
    "material": "Ultra-Clear PET · 2500pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.9,
    "reviewCount": 76,
    "sizes": [
      {
        "name": "Case (2500 pcs)",
        "sku": "PC325550L",
        "caseCount": 2500,
        "price": 29.91,
        "dimensions": "5/8 (40cs)"
      }
    ]
  },
  {
    "id": "tc61",
    "sku": "TC61",
    "categoryId": "two-color-hinged-containers",
    "subcategory": "Duo-Colored Polypropylene (PP) · 200pc",
    "name": "Hinged Duo-Colored PP Container, 6\" x 6\", 200pc (100/2)",
    "slug": "tc61",
    "description": "Commercial food service packaging SKU TC61: Hinged Duo-Colored PP Container, 6\" x 6\", 200pc (100/2). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/7 (56cs).",
    "palletTiHi": "8/7 (56cs)",
    "price": 38.02,
    "specialPrice": null,
    "mrpPrice": 51.33,
    "bestSeller": true,
    "imageUrl": "/images/hinged-duo-colored-pp-container.jpg",
    "material": "Duo-Colored Polypropylene (PP) · 200pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 83,
    "sizes": [
      {
        "name": "Case (200 pcs)",
        "sku": "TC61",
        "caseCount": 200,
        "price": 38.02,
        "dimensions": "8/7 (56cs)"
      }
    ]
  },
  {
    "id": "tc96",
    "sku": "TC96",
    "categoryId": "two-color-hinged-containers",
    "subcategory": "Duo-Colored Polypropylene (PP) · 150pc",
    "name": "Hinged Duo-Colored PP Hoagie Container, 9\" x 6\", 150pc (75/2)",
    "slug": "tc96",
    "description": "Commercial food service packaging SKU TC96: Hinged Duo-Colored PP Hoagie Container, 9\" x 6\", 150pc (75/2). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/5 (30cs).",
    "palletTiHi": "6/5 (30cs)",
    "price": 34.04,
    "specialPrice": null,
    "mrpPrice": 45.95,
    "bestSeller": false,
    "imageUrl": "/images/hinged-duo-colored-pp-container.jpg",
    "material": "Duo-Colored Polypropylene (PP) · 150pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 90,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "TC96",
        "caseCount": 150,
        "price": 34.04,
        "dimensions": "6/5 (30cs)"
      }
    ]
  },
  {
    "id": "tc81m",
    "sku": "TC81M",
    "categoryId": "two-color-hinged-containers",
    "subcategory": "Duo-Colored Polypropylene (PP) · 100pc",
    "name": "Hinged Duo-Colored PP Container, 8\" x 8\", 100pc (100/1)",
    "slug": "tc81m",
    "description": "Commercial food service packaging SKU TC81M: Hinged Duo-Colored PP Container, 8\" x 8\", 100pc (100/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/7 (42cs).",
    "palletTiHi": "6/7 (42cs)",
    "price": 23.51,
    "specialPrice": null,
    "mrpPrice": 31.74,
    "bestSeller": false,
    "imageUrl": "/images/hinged-duo-colored-pp-container.jpg",
    "material": "Duo-Colored Polypropylene (PP) · 100pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.7,
    "reviewCount": 97,
    "sizes": [
      {
        "name": "Case (100 pcs)",
        "sku": "TC81M",
        "caseCount": 100,
        "price": 23.51,
        "dimensions": "6/7 (42cs)"
      }
    ]
  },
  {
    "id": "tc83",
    "sku": "TC83",
    "categoryId": "two-color-hinged-containers",
    "subcategory": "Duo-Colored PP · 3-Comp · 120pc",
    "name": "Hinged Duo-Colored PP Container 3-compartment, 8\" x 8\", 120pc (120/1)",
    "slug": "tc83",
    "description": "Commercial food service packaging SKU TC83: Hinged Duo-Colored PP Container 3-compartment, 8\" x 8\", 120pc (120/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/10 (75cs).",
    "palletTiHi": "7/10 (75cs)",
    "price": 23.51,
    "specialPrice": null,
    "mrpPrice": 31.74,
    "bestSeller": false,
    "imageUrl": "/images/hinged-duo-colored-pp-container.jpg",
    "material": "Duo-Colored PP · 3-Comp · 120pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 104,
    "sizes": [
      {
        "name": "Case (120 pcs)",
        "sku": "TC83",
        "caseCount": 120,
        "price": 23.51,
        "dimensions": "7/10 (75cs)"
      }
    ]
  },
  {
    "id": "tc83m",
    "sku": "TC83M",
    "categoryId": "two-color-hinged-containers",
    "subcategory": "Duo-Colored PP · 3-Comp · 100pc",
    "name": "Hinged Duo-Colored PP Container 3-compartment, 8\" x 8\", 100pc (100/1)",
    "slug": "tc83m",
    "description": "Commercial food service packaging SKU TC83M: Hinged Duo-Colored PP Container 3-compartment, 8\" x 8\", 100pc (100/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/10 (75cs).",
    "palletTiHi": "7/10 (75cs)",
    "price": 28.93,
    "specialPrice": null,
    "mrpPrice": 39.06,
    "bestSeller": false,
    "imageUrl": "/images/hinged-duo-colored-pp-container.jpg",
    "material": "Duo-Colored PP · 3-Comp · 100pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 111,
    "sizes": [
      {
        "name": "Case (100 pcs)",
        "sku": "TC83M",
        "caseCount": 100,
        "price": 28.93,
        "dimensions": "7/10 (75cs)"
      }
    ]
  },
  {
    "id": "tc91",
    "sku": "TC91",
    "categoryId": "two-color-hinged-containers",
    "subcategory": "Duo-Colored Polypropylene (PP) · 100pc",
    "name": "Hinged Duo-Colored PP Container, 9\" x 9\", 100pc (100/1)",
    "slug": "tc91",
    "description": "Commercial food service packaging SKU TC91: Hinged Duo-Colored PP Container, 9\" x 9\", 100pc (100/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/9 (54cs).",
    "palletTiHi": "6/9 (54cs)",
    "price": 28.93,
    "specialPrice": null,
    "mrpPrice": 39.06,
    "bestSeller": true,
    "imageUrl": "/images/hinged-duo-colored-pp-container.jpg",
    "material": "Duo-Colored Polypropylene (PP) · 100pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 118,
    "sizes": [
      {
        "name": "Case (100 pcs)",
        "sku": "TC91",
        "caseCount": 100,
        "price": 28.93,
        "dimensions": "6/9 (54cs)"
      }
    ]
  },
  {
    "id": "tc93",
    "sku": "TC93",
    "categoryId": "two-color-hinged-containers",
    "subcategory": "Duo-Colored PP · 3-Comp · 100pc",
    "name": "Hinged Duo-Colored PP Container 3-compartment, 9\" x 9\", 100pc (100/1)",
    "slug": "tc93",
    "description": "Commercial food service packaging SKU TC93: Hinged Duo-Colored PP Container 3-compartment, 9\" x 9\", 100pc (100/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/9 (54cs).",
    "palletTiHi": "6/9 (54cs)",
    "price": 35.27,
    "specialPrice": null,
    "mrpPrice": 47.61,
    "bestSeller": false,
    "imageUrl": "/images/hinged-duo-colored-pp-container.jpg",
    "material": "Duo-Colored PP · 3-Comp · 100pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 125,
    "sizes": [
      {
        "name": "Case (100 pcs)",
        "sku": "TC93",
        "caseCount": 100,
        "price": 35.27,
        "dimensions": "6/9 (54cs)"
      }
    ]
  },
  {
    "id": "tc100",
    "sku": "TC100",
    "categoryId": "two-color-hinged-containers",
    "subcategory": "Duo-Colored Polypropylene (PP) · 100pc",
    "name": "Hinged Duo-Colored PP Hoagie Container, 10\" x 10\", 100pc (100/1)",
    "slug": "tc100",
    "description": "Commercial food service packaging SKU TC100: Hinged Duo-Colored PP Hoagie Container, 10\" x 10\", 100pc (100/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/10 (75cs).",
    "palletTiHi": "7/10 (75cs)",
    "price": 35.27,
    "specialPrice": null,
    "mrpPrice": 47.61,
    "bestSeller": false,
    "imageUrl": "/images/hinged-duo-colored-pp-container.jpg",
    "material": "Duo-Colored Polypropylene (PP) · 100pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.7,
    "reviewCount": 132,
    "sizes": [
      {
        "name": "Case (100 pcs)",
        "sku": "TC100",
        "caseCount": 100,
        "price": 35.27,
        "dimensions": "7/10 (75cs)"
      }
    ]
  },
  {
    "id": "tc103",
    "sku": "TC103",
    "categoryId": "two-color-hinged-containers",
    "subcategory": "Duo-Colored PP · 3-Comp · 100pc",
    "name": "Hinged Duo-Colored PP Hoagie Container 3-compartment, 10\" x 10\", 100pc (100/1)",
    "slug": "tc103",
    "description": "Commercial food service packaging SKU TC103: Hinged Duo-Colored PP Hoagie Container 3-compartment, 10\" x 10\", 100pc (100/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/10 (75cs).",
    "palletTiHi": "7/10 (75cs)",
    "price": 52.92,
    "specialPrice": null,
    "mrpPrice": 71.44,
    "bestSeller": false,
    "imageUrl": "/images/hinged-duo-colored-pp-container.jpg",
    "material": "Duo-Colored PP · 3-Comp · 100pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 139,
    "sizes": [
      {
        "name": "Case (100 pcs)",
        "sku": "TC103",
        "caseCount": 100,
        "price": 52.92,
        "dimensions": "7/10 (75cs)"
      }
    ]
  },
  {
    "id": "v61c",
    "sku": "V61C",
    "categoryId": "translucent-hinged-containers",
    "subcategory": "Translucent Polypropylene (PP) · 250pc",
    "name": "PP Hinged Container, Translucent, 6\" x 6\", 250pc (250/1)",
    "slug": "v61c",
    "description": "Commercial food service packaging SKU V61C: PP Hinged Container, Translucent, 6\" x 6\", 250pc (250/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/10 (75cs).",
    "palletTiHi": "7/10 (75cs)",
    "price": 52.92,
    "specialPrice": null,
    "mrpPrice": 71.44,
    "bestSeller": false,
    "imageUrl": "/images/pp-hinged-container.jpg",
    "material": "Translucent Polypropylene (PP) · 250pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 31,
    "sizes": [
      {
        "name": "Case (250 pcs)",
        "sku": "V61C",
        "caseCount": 250,
        "price": 52.92,
        "dimensions": "7/10 (75cs)"
      }
    ]
  },
  {
    "id": "v96c",
    "sku": "V96C",
    "categoryId": "translucent-hinged-containers",
    "subcategory": "Translucent Polypropylene (PP) · 200pc",
    "name": "PP Hinged Container, Translucent, 9\" x 6\", 200pc (200/1)",
    "slug": "v96c",
    "description": "Commercial food service packaging SKU V96C: PP Hinged Container, Translucent, 9\" x 6\", 200pc (200/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/10 (75cs).",
    "palletTiHi": "7/10 (75cs)",
    "price": 51.14,
    "specialPrice": null,
    "mrpPrice": 69.04,
    "bestSeller": true,
    "imageUrl": "/images/pp-hinged-container.jpg",
    "material": "Translucent Polypropylene (PP) · 200pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 38,
    "sizes": [
      {
        "name": "Case (200 pcs)",
        "sku": "V96C",
        "caseCount": 200,
        "price": 51.14,
        "dimensions": "7/10 (75cs)"
      }
    ]
  },
  {
    "id": "v962c",
    "sku": "V962C",
    "categoryId": "translucent-hinged-containers",
    "subcategory": "Translucent PP · 2-Comp · 200pc",
    "name": "PP Hinged Container, Translucent, 2-compartment, 9\" x 6\", 200pc (200/1)",
    "slug": "v962c",
    "description": "Commercial food service packaging SKU V962C: PP Hinged Container, Translucent, 2-compartment, 9\" x 6\", 200pc (200/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/9 (54cs).",
    "palletTiHi": "6/9 (54cs)",
    "price": 63.31,
    "specialPrice": null,
    "mrpPrice": 85.47,
    "bestSeller": false,
    "imageUrl": "/images/pp-hinged-container.jpg",
    "material": "Translucent PP · 2-Comp · 200pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 45,
    "sizes": [
      {
        "name": "Case (200 pcs)",
        "sku": "V962C",
        "caseCount": 200,
        "price": 63.31,
        "dimensions": "6/9 (54cs)"
      }
    ]
  },
  {
    "id": "v71c",
    "sku": "V71C",
    "categoryId": "translucent-hinged-containers",
    "subcategory": "Translucent Polypropylene (PP) · 150pc",
    "name": "PP Hinged Container, Translucent, Vented, One Compartment, 7\" x 7\", 150pc (150/1)",
    "slug": "v71c",
    "description": "Commercial food service packaging SKU V71C: PP Hinged Container, Translucent, Vented, One Compartment, 7\" x 7\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/9 (54cs).",
    "palletTiHi": "6/9 (54cs)",
    "price": 63.31,
    "specialPrice": null,
    "mrpPrice": 85.47,
    "bestSeller": false,
    "imageUrl": "/images/pp-hinged-container.jpg",
    "material": "Translucent Polypropylene (PP) · 150pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.7,
    "reviewCount": 52,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "V71C",
        "caseCount": 150,
        "price": 63.31,
        "dimensions": "6/9 (54cs)"
      }
    ]
  },
  {
    "id": "v73c",
    "sku": "V73C",
    "categoryId": "translucent-hinged-containers",
    "subcategory": "Translucent PP · 3-Comp · 150pc",
    "name": "PP Hinged Container, Translucent, Vented, Three Compartment, 7\" x 7\", 150pc (150/1)",
    "slug": "v73c",
    "description": "Commercial food service packaging SKU V73C: PP Hinged Container, Translucent, Vented, Three Compartment, 7\" x 7\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/6 (36cs).",
    "palletTiHi": "6/6 (36cs)",
    "price": 16.42,
    "specialPrice": null,
    "mrpPrice": 22.17,
    "bestSeller": false,
    "imageUrl": "/images/pp-hinged-container.jpg",
    "material": "Translucent PP · 3-Comp · 150pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 59,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "V73C",
        "caseCount": 150,
        "price": 16.42,
        "dimensions": "6/6 (36cs)"
      }
    ]
  },
  {
    "id": "v81c",
    "sku": "V81C",
    "categoryId": "translucent-hinged-containers",
    "subcategory": "Translucent Polypropylene (PP) · 150pc",
    "name": "PP Hinged Container, Translucent, Vented, One Compartment, 8\" x 8\", 150pc (150/1)",
    "slug": "v81c",
    "description": "Commercial food service packaging SKU V81C: PP Hinged Container, Translucent, Vented, One Compartment, 8\" x 8\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/7 (42cs).",
    "palletTiHi": "6/7 (42cs)",
    "price": 19.03,
    "specialPrice": null,
    "mrpPrice": 25.69,
    "bestSeller": false,
    "imageUrl": "/images/pp-hinged-container.jpg",
    "material": "Translucent Polypropylene (PP) · 150pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 66,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "V81C",
        "caseCount": 150,
        "price": 19.03,
        "dimensions": "6/7 (42cs)"
      }
    ]
  },
  {
    "id": "v83c",
    "sku": "V83C",
    "categoryId": "translucent-hinged-containers",
    "subcategory": "Translucent PP · 3-Comp · 150pc",
    "name": "PP Hinged Container, Translucent, Vented, Three Compartment, 8\" x 8\", 150pc (150/1)",
    "slug": "v83c",
    "description": "Commercial food service packaging SKU V83C: PP Hinged Container, Translucent, Vented, Three Compartment, 8\" x 8\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 16/9 (144cs).",
    "palletTiHi": "16/9 (144cs)",
    "price": 23.34,
    "specialPrice": null,
    "mrpPrice": 31.51,
    "bestSeller": true,
    "imageUrl": "/images/pp-hinged-container.jpg",
    "material": "Translucent PP · 3-Comp · 150pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 73,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "V83C",
        "caseCount": 150,
        "price": 23.34,
        "dimensions": "16/9 (144cs)"
      }
    ]
  },
  {
    "id": "v91c",
    "sku": "V91C",
    "categoryId": "translucent-hinged-containers",
    "subcategory": "Translucent Polypropylene (PP) · 150pc",
    "name": "PP Hinged Container, Translucent, Vented, One Compartment, 9\" x 9\", 150pc (150/1)",
    "slug": "v91c",
    "description": "Commercial food service packaging SKU V91C: PP Hinged Container, Translucent, Vented, One Compartment, 9\" x 9\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 16/9 (144cs).",
    "palletTiHi": "16/9 (144cs)",
    "price": 25.39,
    "specialPrice": null,
    "mrpPrice": 34.28,
    "bestSeller": false,
    "imageUrl": "/images/pp-hinged-container.jpg",
    "material": "Translucent Polypropylene (PP) · 150pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 80,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "V91C",
        "caseCount": 150,
        "price": 25.39,
        "dimensions": "16/9 (144cs)"
      }
    ]
  },
  {
    "id": "v93c",
    "sku": "V93C",
    "categoryId": "translucent-hinged-containers",
    "subcategory": "Translucent PP · 3-Comp · 150pc",
    "name": "PP Hinged Container, Translucent, Vented, Three Compartment, 9\" x 9\", 150pc (150/1)",
    "slug": "v93c",
    "description": "Commercial food service packaging SKU V93C: PP Hinged Container, Translucent, Vented, Three Compartment, 9\" x 9\", 150pc (150/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 12/7 (84cs).",
    "palletTiHi": "12/7 (84cs)",
    "price": 37.45,
    "specialPrice": null,
    "mrpPrice": 50.56,
    "bestSeller": false,
    "imageUrl": "/images/pp-hinged-container.jpg",
    "material": "Translucent PP · 3-Comp · 150pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.7,
    "reviewCount": 87,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "V93C",
        "caseCount": 150,
        "price": 37.45,
        "dimensions": "12/7 (84cs)"
      }
    ]
  },
  {
    "id": "pshcl61x2",
    "sku": "PSHCL61X2",
    "categoryId": "clear-polystyrene-containers",
    "subcategory": "Crystal Clear Polystyrene (PS) · 400pc",
    "name": "Clear Hinged PS Container, 6\" x 6\" 2in Tall, 400pc (200/2)",
    "slug": "pshcl61x2",
    "description": "Commercial food service packaging SKU PSHCL61X2: Clear Hinged PS Container, 6\" x 6\" 2in Tall, 400pc (200/2). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/7 (56cs).",
    "palletTiHi": "8/7 (56cs)",
    "price": 16.42,
    "specialPrice": null,
    "mrpPrice": 22.17,
    "bestSeller": false,
    "imageUrl": "/images/clear-hinged-ps-container.jpg",
    "material": "Crystal Clear Polystyrene (PS) · 400pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 94,
    "sizes": [
      {
        "name": "Case (400 pcs)",
        "sku": "PSHCL61X2",
        "caseCount": 400,
        "price": 16.42,
        "dimensions": "8/7 (56cs)"
      }
    ]
  },
  {
    "id": "pshcl61",
    "sku": "PSHCL61",
    "categoryId": "clear-polystyrene-containers",
    "subcategory": "Crystal Clear Polystyrene (PS) · 400pc",
    "name": "Clear Hinged PS Container, 6\" x 6\" 3in Tall, 400pc (200/2)",
    "slug": "pshcl61",
    "description": "Commercial food service packaging SKU PSHCL61: Clear Hinged PS Container, 6\" x 6\" 3in Tall, 400pc (200/2). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/7 (56cs).",
    "palletTiHi": "8/7 (56cs)",
    "price": 19.03,
    "specialPrice": null,
    "mrpPrice": 25.69,
    "bestSeller": false,
    "imageUrl": "/images/clear-hinged-ps-container.jpg",
    "material": "Crystal Clear Polystyrene (PS) · 400pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.9,
    "reviewCount": 101,
    "sizes": [
      {
        "name": "Case (400 pcs)",
        "sku": "PSHCL61",
        "caseCount": 400,
        "price": 19.03,
        "dimensions": "8/7 (56cs)"
      }
    ]
  },
  {
    "id": "pshcl81x2",
    "sku": "PSHCL81X2",
    "categoryId": "clear-polystyrene-containers",
    "subcategory": "Crystal Clear Polystyrene (PS) · 200pc",
    "name": "Clear Hinged PS Container, 8\" x 8\" 2in Tall, 200pc (200/1)",
    "slug": "pshcl81x2",
    "description": "Commercial food service packaging SKU PSHCL81X2: Clear Hinged PS Container, 8\" x 8\" 2in Tall, 200pc (200/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/7 (42cs).",
    "palletTiHi": "6/7 (42cs)",
    "price": 23.34,
    "specialPrice": null,
    "mrpPrice": 31.51,
    "bestSeller": true,
    "imageUrl": "/images/clear-hinged-ps-container.jpg",
    "material": "Crystal Clear Polystyrene (PS) · 200pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 108,
    "sizes": [
      {
        "name": "Case (200 pcs)",
        "sku": "PSHCL81X2",
        "caseCount": 200,
        "price": 23.34,
        "dimensions": "6/7 (42cs)"
      }
    ]
  },
  {
    "id": "pshcl81",
    "sku": "PSHCL81",
    "categoryId": "clear-polystyrene-containers",
    "subcategory": "Crystal Clear Polystyrene (PS) · 200pc",
    "name": "Clear Hinged PS Container, 8\" x 8\" 3in Tall, 200pc (200/1)",
    "slug": "pshcl81",
    "description": "Commercial food service packaging SKU PSHCL81: Clear Hinged PS Container, 8\" x 8\" 3in Tall, 200pc (200/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/10 (75cs).",
    "palletTiHi": "7/10 (75cs)",
    "price": 25.39,
    "specialPrice": null,
    "mrpPrice": 34.28,
    "bestSeller": false,
    "imageUrl": "/images/clear-hinged-ps-container.jpg",
    "material": "Crystal Clear Polystyrene (PS) · 200pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.9,
    "reviewCount": 115,
    "sizes": [
      {
        "name": "Case (200 pcs)",
        "sku": "PSHCL81",
        "caseCount": 200,
        "price": 25.39,
        "dimensions": "7/10 (75cs)"
      }
    ]
  },
  {
    "id": "pshcl83",
    "sku": "PSHCL83",
    "categoryId": "clear-polystyrene-containers",
    "subcategory": "Crystal Clear PS · 3-Comp · 200pc",
    "name": "Clear Hinged PS Container 3-compartment, 8\" x 8\" 3in Tall, 200pc (200/1)",
    "slug": "pshcl83",
    "description": "Commercial food service packaging SKU PSHCL83: Clear Hinged PS Container 3-compartment, 8\" x 8\" 3in Tall, 200pc (200/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/10 (75cs).",
    "palletTiHi": "7/10 (75cs)",
    "price": 37.45,
    "specialPrice": null,
    "mrpPrice": 50.56,
    "bestSeller": false,
    "imageUrl": "/images/clear-hinged-ps-container.jpg",
    "material": "Crystal Clear PS · 3-Comp · 200pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.7,
    "reviewCount": 122,
    "sizes": [
      {
        "name": "Case (200 pcs)",
        "sku": "PSHCL83",
        "caseCount": 200,
        "price": 37.45,
        "dimensions": "7/10 (75cs)"
      }
    ]
  },
  {
    "id": "pshcl91",
    "sku": "PSHCL91",
    "categoryId": "clear-polystyrene-containers",
    "subcategory": "Crystal Clear Polystyrene (PS) · 200pc",
    "name": "Clear Hinged PS Container, 9\" x 9\" 3in Tall, 200pc (200/1)",
    "slug": "pshcl91",
    "description": "Commercial food service packaging SKU PSHCL91: Clear Hinged PS Container, 9\" x 9\" 3in Tall, 200pc (200/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 7/10 (75cs).",
    "palletTiHi": "7/10 (75cs)",
    "price": 40.7,
    "specialPrice": null,
    "mrpPrice": 54.95,
    "bestSeller": false,
    "imageUrl": "/images/clear-hinged-ps-container.jpg",
    "material": "Crystal Clear Polystyrene (PS) · 200pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 129,
    "sizes": [
      {
        "name": "Case (200 pcs)",
        "sku": "PSHCL91",
        "caseCount": 200,
        "price": 40.7,
        "dimensions": "7/10 (75cs)"
      }
    ]
  },
  {
    "id": "pshcl93",
    "sku": "PSHCL93",
    "categoryId": "clear-polystyrene-containers",
    "subcategory": "Crystal Clear PS · 3-Comp · 200pc",
    "name": "Clear Hinged PS Container 3-compartment, 9\" x 9\" 3in Tall, 200pc (200/1)",
    "slug": "pshcl93",
    "description": "Commercial food service packaging SKU PSHCL93: Clear Hinged PS Container 3-compartment, 9\" x 9\" 3in Tall, 200pc (200/1). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/9 (54cs).",
    "palletTiHi": "6/9 (54cs)",
    "price": 43.94,
    "specialPrice": null,
    "mrpPrice": 59.32,
    "bestSeller": false,
    "imageUrl": "/images/clear-hinged-ps-container.jpg",
    "material": "Crystal Clear PS · 3-Comp · 200pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.9,
    "reviewCount": 136,
    "sizes": [
      {
        "name": "Case (200 pcs)",
        "sku": "PSHCL93",
        "caseCount": 200,
        "price": 43.94,
        "dimensions": "6/9 (54cs)"
      }
    ]
  },
  {
    "id": "pasw8w",
    "sku": "PASW8W",
    "categoryId": "paper-cups",
    "subcategory": "Single Wall Paperboard · 80mm · 1000pc",
    "name": "8oz Paper Cup, Single wall, 80mm, White, 1000pc (50/20)",
    "slug": "pasw8w",
    "description": "Commercial food service packaging SKU PASW8W: 8oz Paper Cup, Single wall, 80mm, White, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 9/5 (45cs).",
    "palletTiHi": "9/5 (45cs)",
    "price": 38.36,
    "specialPrice": null,
    "mrpPrice": 51.79,
    "bestSeller": true,
    "imageUrl": "/images/white-paper-cup.jpg",
    "material": "Single Wall Paperboard · 80mm · 1000pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 28,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "PASW8W",
        "caseCount": 1000,
        "price": 38.36,
        "dimensions": "9/5 (45cs)"
      }
    ]
  },
  {
    "id": "pasw10w",
    "sku": "PASW10W",
    "categoryId": "paper-cups",
    "subcategory": "Single Wall Paperboard · 90mm · 1000pc",
    "name": "10oz Paper Cup, Single Wall, 90mm, White, 1000pc (50/20)",
    "slug": "pasw10w",
    "description": "Commercial food service packaging SKU PASW10W: 10oz Paper Cup, Single Wall, 90mm, White, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/5 (30cs).",
    "palletTiHi": "6/5 (30cs)",
    "price": 45.9,
    "specialPrice": null,
    "mrpPrice": 61.97,
    "bestSeller": false,
    "imageUrl": "/images/white-paper-cup.jpg",
    "material": "Single Wall Paperboard · 90mm · 1000pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.9,
    "reviewCount": 35,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "PASW10W",
        "caseCount": 1000,
        "price": 45.9,
        "dimensions": "6/5 (30cs)"
      }
    ]
  },
  {
    "id": "pasw12w",
    "sku": "PASW12W",
    "categoryId": "paper-cups",
    "subcategory": "Single Wall Paperboard · 90mm · 1000pc",
    "name": "12oz Paper Cup, Single Wall, 90mm, White, 1000pc (50/20)",
    "slug": "pasw12w",
    "description": "Commercial food service packaging SKU PASW12W: 12oz Paper Cup, Single Wall, 90mm, White, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/4 (24cs).",
    "palletTiHi": "6/4 (24cs)",
    "price": 49.99,
    "specialPrice": null,
    "mrpPrice": 67.49,
    "bestSeller": false,
    "imageUrl": "/images/white-paper-cup.jpg",
    "material": "Single Wall Paperboard · 90mm · 1000pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.7,
    "reviewCount": 42,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "PASW12W",
        "caseCount": 1000,
        "price": 49.99,
        "dimensions": "6/4 (24cs)"
      }
    ]
  },
  {
    "id": "pasw16w",
    "sku": "PASW16W",
    "categoryId": "paper-cups",
    "subcategory": "Single Wall Paperboard · 90mm · 1000pc",
    "name": "16oz Paper Cup, Single Wall, 90mm, White, 1000pc (50/20)",
    "slug": "pasw16w",
    "description": "Commercial food service packaging SKU PASW16W: 16oz Paper Cup, Single Wall, 90mm, White, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/4 (24cs).",
    "palletTiHi": "6/4 (24cs)",
    "price": 58.14,
    "specialPrice": null,
    "mrpPrice": 78.49,
    "bestSeller": false,
    "imageUrl": "/images/white-paper-cup.jpg",
    "material": "Single Wall Paperboard · 90mm · 1000pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 49,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "PASW16W",
        "caseCount": 1000,
        "price": 58.14,
        "dimensions": "6/4 (24cs)"
      }
    ]
  },
  {
    "id": "pasw20w",
    "sku": "PASW20W",
    "categoryId": "paper-cups",
    "subcategory": "Single Wall Paperboard · 90mm · 1000pc",
    "name": "20oz Paper Cup, Single Wall, 90mm, White, 1000pc (50/20)",
    "slug": "pasw20w",
    "description": "Commercial food service packaging SKU PASW20W: 20oz Paper Cup, Single Wall, 90mm, White, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/3 (18cs).",
    "palletTiHi": "6/3 (18cs)",
    "price": 72.15,
    "specialPrice": null,
    "mrpPrice": 97.4,
    "bestSeller": false,
    "imageUrl": "/images/white-paper-cup.jpg",
    "material": "Single Wall Paperboard · 90mm · 1000pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.9,
    "reviewCount": 56,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "PASW20W",
        "caseCount": 1000,
        "price": 72.15,
        "dimensions": "6/3 (18cs)"
      }
    ]
  },
  {
    "id": "pasw24w",
    "sku": "PASW24W",
    "categoryId": "paper-cups",
    "subcategory": "Single Wall Paperboard · 90mm · 500pc",
    "name": "24oz Paper Cup, Single Wall, 90mm, White, 500pc (25/20)",
    "slug": "pasw24w",
    "description": "Commercial food service packaging SKU PASW24W: 24oz Paper Cup, Single Wall, 90mm, White, 500pc (25/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/5 (30cs).",
    "palletTiHi": "6/5 (30cs)",
    "price": 36.25,
    "specialPrice": null,
    "mrpPrice": 48.94,
    "bestSeller": true,
    "imageUrl": "/images/white-paper-cup.jpg",
    "material": "Single Wall Paperboard · 90mm · 500pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 63,
    "sizes": [
      {
        "name": "Case (500 pcs)",
        "sku": "PASW24W",
        "caseCount": 500,
        "price": 36.25,
        "dimensions": "6/5 (30cs)"
      }
    ]
  },
  {
    "id": "flpa80b",
    "sku": "FLPA80B",
    "categoryId": "paper-cup-lids-sleeves",
    "subcategory": "Polypropylene (PP) · 80mm · Black",
    "name": "Flat Lid for 8oz Paper Cup, 80mm, PP, Black, 1000pc (100/10)",
    "slug": "flpa80b",
    "description": "Commercial food service packaging SKU FLPA80B: Flat Lid for 8oz Paper Cup, 80mm, PP, Black, 1000pc (100/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 14/5 (70cs).",
    "palletTiHi": "14/5 (70cs)",
    "price": 26.78,
    "specialPrice": null,
    "mrpPrice": 36.15,
    "bestSeller": false,
    "imageUrl": "/images/black-paper-cup-lid.jpg",
    "material": "Polypropylene (PP) · 80mm · Black",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 70,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "FLPA80B",
        "caseCount": 1000,
        "price": 26.78,
        "dimensions": "14/5 (70cs)"
      }
    ]
  },
  {
    "id": "flpa90b",
    "sku": "FLPA90B",
    "categoryId": "paper-cup-lids-sleeves",
    "subcategory": "Polypropylene (PP) · 90mm · Black",
    "name": "Flat Lid for 10-24oz Paper Cup, 90mm, PP, Black, 1000pc (50/20)",
    "slug": "flpa90b",
    "description": "Commercial food service packaging SKU FLPA90B: Flat Lid for 10-24oz Paper Cup, 90mm, PP, Black, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 12/4 (48cs).",
    "palletTiHi": "12/4 (48cs)",
    "price": 31.71,
    "specialPrice": null,
    "mrpPrice": 42.81,
    "bestSeller": false,
    "imageUrl": "/images/black-paper-cup-lid.jpg",
    "material": "Polypropylene (PP) · 90mm · Black",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.7,
    "reviewCount": 77,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "FLPA90B",
        "caseCount": 1000,
        "price": 31.71,
        "dimensions": "12/4 (48cs)"
      }
    ]
  },
  {
    "id": "rlpa80b",
    "sku": "RLPA80B",
    "categoryId": "paper-cup-lids-sleeves",
    "subcategory": "Polypropylene (PP) · Reclosable · 80mm · Black",
    "name": "Reclosable Lid for 8oz Paper Cup, 80mm, PP, Black, 1000pc (50/20)",
    "slug": "rlpa80b",
    "description": "Commercial food service packaging SKU RLPA80B: Reclosable Lid for 8oz Paper Cup, 80mm, PP, Black, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 4/13 (52cs).",
    "palletTiHi": "4/13 (52cs)",
    "price": 26.87,
    "specialPrice": null,
    "mrpPrice": 36.27,
    "bestSeller": false,
    "imageUrl": "/images/black-paper-cup-lid.jpg",
    "material": "Polypropylene (PP) · Reclosable · 80mm · Black",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 84,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "RLPA80B",
        "caseCount": 1000,
        "price": 26.87,
        "dimensions": "4/13 (52cs)"
      }
    ]
  },
  {
    "id": "rlpa90b",
    "sku": "RLPA90B",
    "categoryId": "paper-cup-lids-sleeves",
    "subcategory": "Polypropylene (PP) · Reclosable · 90mm · Black",
    "name": "Reclosable Lid for 10-24oz Paper Cup, 90mm, PP, Black, 1000pc (50/20)",
    "slug": "rlpa90b",
    "description": "Commercial food service packaging SKU RLPA90B: Reclosable Lid for 10-24oz Paper Cup, 90mm, PP, Black, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 4/12 (48cs).",
    "palletTiHi": "4/12 (48cs)",
    "price": 31.75,
    "specialPrice": null,
    "mrpPrice": 42.86,
    "bestSeller": false,
    "imageUrl": "/images/black-paper-cup-lid.jpg",
    "material": "Polypropylene (PP) · Reclosable · 90mm · Black",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.9,
    "reviewCount": 91,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "RLPA90B",
        "caseCount": 1000,
        "price": 31.75,
        "dimensions": "4/12 (48cs)"
      }
    ]
  },
  {
    "id": "pacs",
    "sku": "PACS",
    "categoryId": "paper-cup-lids-sleeves",
    "subcategory": "Insulated Kraft Corrugated · 1000pc",
    "name": "Paper cup sleeve, 1000pc (50/20)",
    "slug": "pacs",
    "description": "Commercial food service packaging SKU PACS: Paper cup sleeve, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/6 (60cs).",
    "palletTiHi": "10/6 (60cs)",
    "price": 41.97,
    "specialPrice": null,
    "mrpPrice": 56.66,
    "bestSeller": true,
    "imageUrl": "/images/paper-cup-sleeve.jpg",
    "material": "Insulated Kraft Corrugated · 1000pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 98,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "PACS",
        "caseCount": 1000,
        "price": 41.97,
        "dimensions": "10/6 (60cs)"
      }
    ]
  },
  {
    "id": "c12pet98",
    "sku": "C12PET98",
    "categoryId": "pet-cups",
    "subcategory": "Ultra-Clear PET · 98mm · 1000pc",
    "name": "12oz Clear PET Cup, 98mm, 1000pc (50/20)",
    "slug": "c12pet98",
    "description": "Commercial food service packaging SKU C12PET98: 12oz Clear PET Cup, 98mm, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/5 (30cs).",
    "palletTiHi": "6/5 (30cs)",
    "price": 51.73,
    "specialPrice": null,
    "mrpPrice": 69.84,
    "bestSeller": false,
    "imageUrl": "/images/clear-pet-cup.jpg",
    "material": "Ultra-Clear PET · 98mm · 1000pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.9,
    "reviewCount": 105,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "C12PET98",
        "caseCount": 1000,
        "price": 51.73,
        "dimensions": "6/5 (30cs)"
      }
    ]
  },
  {
    "id": "c16pet98",
    "sku": "C16PET98",
    "categoryId": "pet-cups",
    "subcategory": "Ultra-Clear PET · 98mm · 1000pc",
    "name": "16oz Clear PET Cup, 98mm, 1000pc (50/20)",
    "slug": "c16pet98",
    "description": "Commercial food service packaging SKU C16PET98: 16oz Clear PET Cup, 98mm, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/4 (24cs).",
    "palletTiHi": "6/4 (24cs)",
    "price": 54.32,
    "specialPrice": null,
    "mrpPrice": 73.33,
    "bestSeller": false,
    "imageUrl": "/images/clear-pet-cup.jpg",
    "material": "Ultra-Clear PET · 98mm · 1000pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.7,
    "reviewCount": 112,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "C16PET98",
        "caseCount": 1000,
        "price": 54.32,
        "dimensions": "6/4 (24cs)"
      }
    ]
  },
  {
    "id": "c20pet98",
    "sku": "C20PET98",
    "categoryId": "pet-cups",
    "subcategory": "Ultra-Clear PET · 98mm · 1000pc",
    "name": "20oz Clear PET Cup, 98mm, 1000pc (50/20)",
    "slug": "c20pet98",
    "description": "Commercial food service packaging SKU C20PET98: 20oz Clear PET Cup, 98mm, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/4 (24cs).",
    "palletTiHi": "6/4 (24cs)",
    "price": 67.29,
    "specialPrice": null,
    "mrpPrice": 90.84,
    "bestSeller": false,
    "imageUrl": "/images/clear-pet-cup.jpg",
    "material": "Ultra-Clear PET · 98mm · 1000pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 119,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "C20PET98",
        "caseCount": 1000,
        "price": 67.29,
        "dimensions": "6/4 (24cs)"
      }
    ]
  },
  {
    "id": "c24pet98",
    "sku": "C24PET98",
    "categoryId": "pet-cups",
    "subcategory": "Ultra-Clear PET · 98mm · 1000pc",
    "name": "24oz Clear PET Cup, 98mm, 1000pc (50/20)",
    "slug": "c24pet98",
    "description": "Commercial food service packaging SKU C24PET98: 24oz Clear PET Cup, 98mm, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/4 (24cs).",
    "palletTiHi": "6/4 (24cs)",
    "price": 71.18,
    "specialPrice": null,
    "mrpPrice": 96.09,
    "bestSeller": false,
    "imageUrl": "/images/clear-pet-cup.jpg",
    "material": "Ultra-Clear PET · 98mm · 1000pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.9,
    "reviewCount": 126,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "C24PET98",
        "caseCount": 1000,
        "price": 71.18,
        "dimensions": "6/4 (24cs)"
      }
    ]
  },
  {
    "id": "c24pet98m",
    "sku": "C24PET98M",
    "categoryId": "pet-cups",
    "subcategory": "Ultra-Clear PET · 98mm · 600pc",
    "name": "24oz Clear PET Cup, 98mm, 600pc (50/12)",
    "slug": "c24pet98m",
    "description": "Commercial food service packaging SKU C24PET98M: 24oz Clear PET Cup, 98mm, 600pc (50/12). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/5 (50cs).",
    "palletTiHi": "10/5 (50cs)",
    "price": 58.99,
    "specialPrice": null,
    "mrpPrice": 79.64,
    "bestSeller": true,
    "imageUrl": "/images/clear-pet-cup.jpg",
    "material": "Ultra-Clear PET · 98mm · 600pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 133,
    "sizes": [
      {
        "name": "Case (600 pcs)",
        "sku": "C24PET98M",
        "caseCount": 600,
        "price": 58.99,
        "dimensions": "10/5 (50cs)"
      }
    ]
  },
  {
    "id": "flpet98",
    "sku": "FLPET98",
    "categoryId": "pet-cups",
    "subcategory": "Ultra-Clear PET · Straw Slot · 98mm",
    "name": "Flat Lids for 12-24oz PET Cups, 98mm, 1000pc (100/10)",
    "slug": "flpet98",
    "description": "Commercial food service packaging SKU FLPET98: Flat Lids for 12-24oz PET Cups, 98mm, 1000pc (100/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 15/4 (60cs).",
    "palletTiHi": "15/4 (60cs)",
    "price": 20.61,
    "specialPrice": null,
    "mrpPrice": 27.82,
    "bestSeller": false,
    "imageUrl": "/images/flat-lid.jpg",
    "material": "Ultra-Clear PET · Straw Slot · 98mm",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.9,
    "reviewCount": 140,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "FLPET98",
        "caseCount": 1000,
        "price": 20.61,
        "dimensions": "15/4 (60cs)"
      }
    ]
  },
  {
    "id": "dlpet98",
    "sku": "DLPET98",
    "categoryId": "pet-cups",
    "subcategory": "Ultra-Clear PET · Elevated Dome · 98mm",
    "name": "Dome Lids for 12-24oz PET Cups, 98mm, 1000pc (100/10)",
    "slug": "dlpet98",
    "description": "Commercial food service packaging SKU DLPET98: Dome Lids for 12-24oz PET Cups, 98mm, 1000pc (100/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 11/4 (44cs).",
    "palletTiHi": "11/4 (44cs)",
    "price": 28.38,
    "specialPrice": null,
    "mrpPrice": 38.31,
    "bestSeller": false,
    "imageUrl": "/images/dome-lid.jpg",
    "material": "Ultra-Clear PET · Elevated Dome · 98mm",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.7,
    "reviewCount": 32,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "DLPET98",
        "caseCount": 1000,
        "price": 28.38,
        "dimensions": "11/4 (44cs)"
      }
    ]
  },
  {
    "id": "c32pet107",
    "sku": "C32PET107",
    "categoryId": "pet-cups",
    "subcategory": "Ultra-Clear PET · 107mm · 500pc",
    "name": "32oz Clear PET Cup, 107mm, 500pc (50/10)",
    "slug": "c32pet107",
    "description": "Commercial food service packaging SKU C32PET107: 32oz Clear PET Cup, 107mm, 500pc (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 9/4 (36cs).",
    "palletTiHi": "9/4 (36cs)",
    "price": 49.13,
    "specialPrice": null,
    "mrpPrice": 66.33,
    "bestSeller": false,
    "imageUrl": "/images/clear-pet-cup.jpg",
    "material": "Ultra-Clear PET · 107mm · 500pc",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 39,
    "sizes": [
      {
        "name": "Case (500 pcs)",
        "sku": "C32PET107",
        "caseCount": 500,
        "price": 49.13,
        "dimensions": "9/4 (36cs)"
      }
    ]
  },
  {
    "id": "flpet107",
    "sku": "FLPET107",
    "categoryId": "pet-cups",
    "subcategory": "Ultra-Clear PET · 107mm Flat",
    "name": "Flat Lid for 32oz PET Cup, 107mm, 500pc (50/10)",
    "slug": "flpet107",
    "description": "Commercial food service packaging SKU FLPET107: Flat Lid for 32oz PET Cup, 107mm, 500pc (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 9/10 (90cs).",
    "palletTiHi": "9/10 (90cs)",
    "price": 16.71,
    "specialPrice": null,
    "mrpPrice": 22.56,
    "bestSeller": false,
    "imageUrl": "/images/flat-lid.jpg",
    "material": "Ultra-Clear PET · 107mm Flat",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.9,
    "reviewCount": 46,
    "sizes": [
      {
        "name": "Case (500 pcs)",
        "sku": "FLPET107",
        "caseCount": 500,
        "price": 16.71,
        "dimensions": "9/10 (90cs)"
      }
    ]
  },
  {
    "id": "dlpet107",
    "sku": "DLPET107",
    "categoryId": "pet-cups",
    "subcategory": "Ultra-Clear PET · 107mm Dome",
    "name": "Dome Lid for 32oz PET Cup, 107mm, 500pc (50/10)",
    "slug": "dlpet107",
    "description": "Commercial food service packaging SKU DLPET107: Dome Lid for 32oz PET Cup, 107mm, 500pc (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/9 (72cs).",
    "palletTiHi": "8/9 (72cs)",
    "price": 19.31,
    "specialPrice": null,
    "mrpPrice": 26.07,
    "bestSeller": true,
    "imageUrl": "/images/dome-lid.jpg",
    "material": "Ultra-Clear PET · 107mm Dome",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 53,
    "sizes": [
      {
        "name": "Case (500 pcs)",
        "sku": "DLPET107",
        "caseCount": 500,
        "price": 19.31,
        "dimensions": "8/9 (72cs)"
      }
    ]
  },
  {
    "id": "tcbl61",
    "sku": "TCBL61",
    "categoryId": "hinged-containers",
    "subcategory": "Polypropylene (PP)",
    "name": "Hinged Black PP Container - 6x6, 200pc (100/2)",
    "slug": "tcbl61",
    "description": "Hinged Black PP Container - 6x6, 200pc (100/2). Status: Discontinuing stock from commercial catalog.",
    "palletTiHi": "6/8 (48cs)",
    "price": 24.5,
    "specialPrice": null,
    "imageUrl": "/images/black_hinged_box.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "6\" x 6\"",
        "sku": "TCBL61",
        "caseCount": 200,
        "price": 24.5,
        "dimensions": "6/8 (48cs)"
      }
    ]
  },
  {
    "id": "tcbl81",
    "sku": "TCBL81",
    "categoryId": "hinged-containers",
    "subcategory": "Polypropylene (PP)",
    "name": "Hinged Black PP Container - 8x8, 120pc (120/1)",
    "slug": "tcbl81",
    "description": "Hinged Black PP Container - 8x8, 120pc (120/1). Status: Discontinuing stock from commercial catalog.",
    "palletTiHi": "6/8 (48cs)",
    "price": 25.8,
    "specialPrice": null,
    "imageUrl": "/images/black_hinged_box.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "8\" x 8\"",
        "sku": "TCBL81",
        "caseCount": 120,
        "price": 25.8,
        "dimensions": "6/8 (48cs)"
      }
    ]
  },
  {
    "id": "tcbl96",
    "sku": "TCBL96",
    "categoryId": "hinged-containers",
    "subcategory": "Polypropylene (PP)",
    "name": "Hinged Black PP Hoagie Container - 9x6, 150pc (75/2)",
    "slug": "tcbl96",
    "description": "Hinged Black PP Hoagie Container - 9x6, 150pc (75/2). Status: Discontinuing stock from commercial catalog.",
    "palletTiHi": "6/7 (42cs)",
    "price": 26.2,
    "specialPrice": null,
    "imageUrl": "/images/black_hinged_box.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "9\" x 6\"",
        "sku": "TCBL96",
        "caseCount": 150,
        "price": 26.2,
        "dimensions": "6/7 (42cs)"
      }
    ]
  },
  {
    "id": "bghw61",
    "sku": "BGHW61",
    "categoryId": "bagasse-hinged-containers",
    "subcategory": "100% Sugarcane Bagasse (PFAS FREE)",
    "name": "Bagasse Hinged Container - White - PFAS FREE - 6x6, 500pc (125/4)",
    "slug": "bghw61",
    "description": "Compostable Bagasse Hinged Container - White - PFAS FREE - 6x6, 500pc (125/4). Certified commercial eco-packaging.",
    "palletTiHi": "6/6 (36cs)",
    "price": 36.5,
    "specialPrice": null,
    "imageUrl": "/images/bagasse-hinged-container.jpg",
    "material": "100% Sugarcane Bagasse (PFAS FREE)",
    "color": "Standard",
    "bpiCertified": true,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "6\" x 6\"",
        "sku": "BGHW61",
        "caseCount": 500,
        "price": 36.5,
        "dimensions": "6/6 (36cs)"
      }
    ]
  },
  {
    "id": "bghw96",
    "sku": "BGHW96",
    "categoryId": "bagasse-hinged-containers",
    "subcategory": "100% Sugarcane Bagasse (PFAS FREE)",
    "name": "Bagasse Hinged Container - White - PFAS FREE - 9x6, 250pc (125/2)",
    "slug": "bghw96",
    "description": "Compostable Bagasse Hinged Container - White - PFAS FREE - 9x6, 250pc (125/2). Ideal for hoagies and combo entrees.",
    "palletTiHi": "6/7 (42cs)",
    "price": 32.8,
    "specialPrice": null,
    "imageUrl": "/images/bagasse-hinged-container.jpg",
    "material": "100% Sugarcane Bagasse (PFAS FREE)",
    "color": "Standard",
    "bpiCertified": true,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "9\" x 6\"",
        "sku": "BGHW96",
        "caseCount": 250,
        "price": 32.8,
        "dimensions": "6/7 (42cs)"
      }
    ]
  },
  {
    "id": "bghw81",
    "sku": "BGHW81",
    "categoryId": "bagasse-hinged-containers",
    "subcategory": "100% Sugarcane Bagasse (PFAS FREE)",
    "name": "Bagasse Hinged Container - White - PFAS FREE - 8x8, 200pc (100/2)",
    "slug": "bghw81",
    "description": "Compostable Bagasse Hinged Container - White - PFAS FREE - 8x8 1-Compartment, 200pc (100/2). Certified food-contact safe.",
    "palletTiHi": "6/8 (48cs)",
    "price": 34.2,
    "specialPrice": null,
    "imageUrl": "/images/bagasse-hinged-container.jpg",
    "material": "100% Sugarcane Bagasse (PFAS FREE)",
    "color": "Standard",
    "bpiCertified": true,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "8\" x 8\"",
        "sku": "BGHW81",
        "caseCount": 200,
        "price": 34.2,
        "dimensions": "6/8 (48cs)"
      }
    ]
  },
  {
    "id": "bghw83",
    "sku": "BGHW83",
    "categoryId": "bagasse-hinged-containers",
    "subcategory": "100% Sugarcane Bagasse (PFAS FREE)",
    "name": "Bagasse Hinged Container - 3 Compartment - White - PFAS FREE - 8x8, 200pc (100/2)",
    "slug": "bghw83",
    "description": "Compostable Bagasse Hinged Container - 3 Compartment - White - PFAS FREE - 8x8, 200pc (100/2). Keeps sides and entrees separated.",
    "palletTiHi": "6/8 (48cs)",
    "price": 35.5,
    "specialPrice": null,
    "imageUrl": "/images/bagasse-hinged-container.jpg",
    "material": "100% Sugarcane Bagasse (PFAS FREE)",
    "color": "Standard",
    "bpiCertified": true,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "8\" x 8\"",
        "sku": "BGHW83",
        "caseCount": 200,
        "price": 35.5,
        "dimensions": "6/8 (48cs)"
      }
    ]
  },
  {
    "id": "bghw91",
    "sku": "BGHW91",
    "categoryId": "bagasse-hinged-containers",
    "subcategory": "100% Sugarcane Bagasse (PFAS FREE)",
    "name": "Bagasse Hinged Container - White - PFAS FREE - 9x9, 200pc (100/2)",
    "slug": "bghw91",
    "description": "Compostable Bagasse Hinged Container - White - PFAS FREE - 9x9 1-Compartment, 200pc (100/2). Heavy-duty restaurant grade.",
    "palletTiHi": "6/8 (48cs)",
    "price": 38.9,
    "specialPrice": null,
    "imageUrl": "/images/bagasse-hinged-container.jpg",
    "material": "100% Sugarcane Bagasse (PFAS FREE)",
    "color": "Standard",
    "bpiCertified": true,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "9\" x 9\"",
        "sku": "BGHW91",
        "caseCount": 200,
        "price": 38.9,
        "dimensions": "6/8 (48cs)"
      }
    ]
  },
  {
    "id": "bghw93",
    "sku": "BGHW93",
    "categoryId": "bagasse-hinged-containers",
    "subcategory": "100% Sugarcane Bagasse (PFAS FREE)",
    "name": "Bagasse Hinged Container - 3 Compartment - White - PFAS FREE - 9x9, 200pc (100/2)",
    "slug": "bghw93",
    "description": "Compostable Bagasse Hinged Container - 3 Compartment - White - PFAS FREE - 9x9, 200pc (100/2). Large portion entree packaging.",
    "palletTiHi": "6/8 (48cs)",
    "price": 39.8,
    "specialPrice": null,
    "imageUrl": "/images/bagasse-hinged-container.jpg",
    "material": "100% Sugarcane Bagasse (PFAS FREE)",
    "color": "Standard",
    "bpiCertified": true,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "9\" x 9\"",
        "sku": "BGHW93",
        "caseCount": 200,
        "price": 39.8,
        "dimensions": "6/8 (48cs)"
      }
    ]
  },
  {
    "id": "wh61",
    "sku": "WH61",
    "categoryId": "hinged-containers",
    "subcategory": "Mineral-Filled Polypropylene (MFPP)",
    "name": "Clamshell MFPP Container - Corner Lock - 6x6, 250pc (250/1)",
    "slug": "wh61",
    "description": "Clamshell MFPP Container - Corner Lock - 6x6, 250pc (250/1). Secure corner-lock tab closure for burger & sandwich delivery.",
    "palletTiHi": "7/7 (49cs)",
    "price": 24.55,
    "specialPrice": null,
    "imageUrl": "/images/white_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "6\" x 6\"",
        "sku": "WH61",
        "caseCount": 250,
        "price": 24.55,
        "dimensions": "7/7 (49cs)"
      }
    ]
  },
  {
    "id": "wh96",
    "sku": "WH96",
    "categoryId": "hinged-containers",
    "subcategory": "Mineral-Filled Polypropylene (MFPP)",
    "name": "Clamshell MFPP Hoagie Container - Corner Lock - 9x6, 200pc (100/2)",
    "slug": "wh96",
    "description": "Clamshell MFPP Hoagie Container - Corner Lock - 9x6, 200pc (100/2). Corner-locking tabs prevent transit spills.",
    "palletTiHi": "6/7 (42cs)",
    "price": 29.8,
    "specialPrice": null,
    "imageUrl": "/images/white_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "9\" x 6\"",
        "sku": "WH96",
        "caseCount": 200,
        "price": 29.8,
        "dimensions": "6/7 (42cs)"
      }
    ]
  },
  {
    "id": "wh96t",
    "sku": "WH96T",
    "categoryId": "hinged-containers",
    "subcategory": "Mineral-Filled Polypropylene (MFPP)",
    "name": "Clamshell MFPP Hoagie Container - Corner Lock - 9x6 - Tall, 200pc (100/2)",
    "slug": "wh96t",
    "description": "Clamshell MFPP Hoagie Container - Corner Lock - 9x6 - Tall Depth, 200pc (100/2). Extra vertical clearance for stacked sandwiches.",
    "palletTiHi": "6/6 (36cs)",
    "price": 31.5,
    "specialPrice": null,
    "imageUrl": "/images/white_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "9\" x 6\"",
        "sku": "WH96T",
        "caseCount": 200,
        "price": 31.5,
        "dimensions": "6/6 (36cs)"
      }
    ]
  },
  {
    "id": "wh81",
    "sku": "WH81",
    "categoryId": "hinged-containers",
    "subcategory": "Mineral-Filled Polypropylene (MFPP)",
    "name": "Clamshell MFPP Container - Corner Lock - 8x8, 150pc (150/1)",
    "slug": "wh81",
    "description": "Clamshell MFPP Container - Corner Lock - 8x8 1-Compartment, 150pc (150/1). Standard commercial dinner carryout box.",
    "palletTiHi": "6/9 (54cs)",
    "price": 24.55,
    "specialPrice": null,
    "imageUrl": "/images/white_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "8\" x 8\"",
        "sku": "WH81",
        "caseCount": 150,
        "price": 24.55,
        "dimensions": "6/9 (54cs)"
      }
    ]
  },
  {
    "id": "wh83",
    "sku": "WH83",
    "categoryId": "hinged-containers",
    "subcategory": "Mineral-Filled Polypropylene (MFPP)",
    "name": "Clamshell MFPP Container - 3 Compartment - Corner Lock - 8x8, 150pc (150/1)",
    "slug": "wh83",
    "description": "Clamshell MFPP Container - 3 Compartment - Corner Lock - 8x8, 150pc (150/1). Ribbed sidewalls and secure locks.",
    "palletTiHi": "6/9 (54cs)",
    "price": 24.55,
    "specialPrice": null,
    "imageUrl": "/images/white_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "8\" x 8\"",
        "sku": "WH83",
        "caseCount": 150,
        "price": 24.55,
        "dimensions": "6/9 (54cs)"
      }
    ]
  },
  {
    "id": "wh91",
    "sku": "WH91",
    "categoryId": "hinged-containers",
    "subcategory": "Mineral-Filled Polypropylene (MFPP)",
    "name": "Clamshell MFPP Container - Corner Lock - 9x9, 150pc (150/1)",
    "slug": "wh91",
    "description": "Clamshell MFPP Container - Corner Lock - 9x9 1-Compartment, 150pc (150/1). Maximum entree volume with corner closure.",
    "palletTiHi": "6/7 (42cs)",
    "price": 28.5,
    "specialPrice": null,
    "imageUrl": "/images/white_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "9\" x 9\"",
        "sku": "WH91",
        "caseCount": 150,
        "price": 28.5,
        "dimensions": "6/7 (42cs)"
      }
    ]
  },
  {
    "id": "wh93",
    "sku": "WH93",
    "categoryId": "hinged-containers",
    "subcategory": "Mineral-Filled Polypropylene (MFPP)",
    "name": "Clamshell MFPP Container - 3 Compartment - Corner Lock - 9x9, 150pc (150/1)",
    "slug": "wh93",
    "description": "Clamshell MFPP Container - 3 Compartment - Corner Lock - 9x9, 150pc (150/1). Three food cavities with positive locking.",
    "palletTiHi": "6/7 (42cs)",
    "price": 28.5,
    "specialPrice": null,
    "imageUrl": "/images/white_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "9\" x 9\"",
        "sku": "WH93",
        "caseCount": 150,
        "price": 28.5,
        "dimensions": "6/7 (42cs)"
      }
    ]
  },
  {
    "id": "cs501",
    "sku": "CS501",
    "categoryId": "hinged-containers",
    "subcategory": "Mineral-Filled Polypropylene (MFPP)",
    "name": "Clamshell MFPP Container - Center Slide - 4.5x5, 250pc (125/2)",
    "slug": "cs501",
    "description": "Clamshell MFPP Container - Center Slide - 4.5x5, 250pc (125/2). Patented center sliding tab lock for quick packing.",
    "palletTiHi": "8/8 (64cs)",
    "price": 22.5,
    "specialPrice": null,
    "imageUrl": "/images/white_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "4.5\" x 5\"",
        "sku": "CS501",
        "caseCount": 250,
        "price": 22.5,
        "dimensions": "8/8 (64cs)"
      }
    ]
  },
  {
    "id": "cs601",
    "sku": "CS601",
    "categoryId": "hinged-containers",
    "subcategory": "Mineral-Filled Polypropylene (MFPP)",
    "name": "Clamshell MFPP Container - Center Slide - 5.25x5.25, 250pc (125/2)",
    "slug": "cs601",
    "description": "Clamshell MFPP Container - Center Slide - 5.25x5.25, 250pc (125/2). Perfect size for sandwiches, desserts, and sides.",
    "palletTiHi": "7/8 (56cs)",
    "price": 23.8,
    "specialPrice": null,
    "imageUrl": "/images/white_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "5.25\" x 5.25\"",
        "sku": "CS601",
        "caseCount": 250,
        "price": 23.8,
        "dimensions": "7/8 (56cs)"
      }
    ]
  },
  {
    "id": "cs801",
    "sku": "CS801",
    "categoryId": "hinged-containers",
    "subcategory": "Mineral-Filled Polypropylene (MFPP)",
    "name": "Clamshell MFPP Container - Center Slide - 7.8x7.8, 150pc (150/1)",
    "slug": "cs801",
    "description": "Clamshell MFPP Container - Center Slide - 7.8x7.8 1-Compartment, 150pc (150/1). Center slide tab system.",
    "palletTiHi": "6/9 (54cs)",
    "price": 24.55,
    "specialPrice": null,
    "imageUrl": "/images/white_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "7.8\" x 7.8\"",
        "sku": "CS801",
        "caseCount": 150,
        "price": 24.55,
        "dimensions": "6/9 (54cs)"
      }
    ]
  },
  {
    "id": "cs803",
    "sku": "CS803",
    "categoryId": "hinged-containers",
    "subcategory": "Mineral-Filled Polypropylene (MFPP)",
    "name": "Clamshell MFPP Container - 3 Compartment - Center Slide - 7.8x7.8, 150pc (150/1)",
    "slug": "cs803",
    "description": "Clamshell MFPP Container - 3 Compartment - Center Slide - 7.8x7.8, 150pc (150/1). Reliable center slide lock.",
    "palletTiHi": "6/9 (54cs)",
    "price": 24.55,
    "specialPrice": null,
    "imageUrl": "/images/white_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "7.8\" x 7.8\"",
        "sku": "CS803",
        "caseCount": 150,
        "price": 24.55,
        "dimensions": "6/9 (54cs)"
      }
    ]
  },
  {
    "id": "cs2400",
    "sku": "CS2400",
    "categoryId": "hinged-containers",
    "subcategory": "Mineral-Filled Polypropylene (MFPP)",
    "name": "Clamshell MFPP Container - Center Slide - 8.25x7.55, 150pc (150/1)",
    "slug": "cs2400",
    "description": "Clamshell MFPP Container - Center Slide - 8.25x7.55, 150pc (150/1). Wide profile meal box.",
    "palletTiHi": "6/8 (48cs)",
    "price": 25.2,
    "specialPrice": null,
    "imageUrl": "/images/white_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "8.25\" x 7.55\"",
        "sku": "CS2400",
        "caseCount": 150,
        "price": 25.2,
        "dimensions": "6/8 (48cs)"
      }
    ]
  },
  {
    "id": "cs2430",
    "sku": "CS2430",
    "categoryId": "hinged-containers",
    "subcategory": "Mineral-Filled Polypropylene (MFPP)",
    "name": "Clamshell MFPP Container - 3 Compartment - Center Slide - 8.25x7.55, 150pc (150/1)",
    "slug": "cs2430",
    "description": "Clamshell MFPP Container - 3 Compartment - Center Slide - 8.25x7.55, 150pc (150/1). Center locking tabs.",
    "palletTiHi": "6/8 (48cs)",
    "price": 25.2,
    "specialPrice": null,
    "imageUrl": "/images/white_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "8.25\" x 7.55\"",
        "sku": "CS2430",
        "caseCount": 150,
        "price": 25.2,
        "dimensions": "6/8 (48cs)"
      }
    ]
  },
  {
    "id": "cs8001",
    "sku": "CS8001",
    "categoryId": "hinged-containers",
    "subcategory": "Mineral-Filled Polypropylene (MFPP)",
    "name": "Clamshell MFPP Container - Center Slide - 9x8.2, 150pc (150/1)",
    "slug": "cs8001",
    "description": "Clamshell MFPP Container - Center Slide - 9x8.2, 150pc (150/1). Large format dinner container.",
    "palletTiHi": "6/7 (42cs)",
    "price": 28.5,
    "specialPrice": null,
    "imageUrl": "/images/white_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "9\" x 8.2\"",
        "sku": "CS8001",
        "caseCount": 150,
        "price": 28.5,
        "dimensions": "6/7 (42cs)"
      }
    ]
  },
  {
    "id": "cs8003",
    "sku": "CS8003",
    "categoryId": "hinged-containers",
    "subcategory": "Mineral-Filled Polypropylene (MFPP)",
    "name": "Clamshell MFPP Container - 3 Compartment - Center Slide - 9x8.2, 150pc (150/1)",
    "slug": "cs8003",
    "description": "Clamshell MFPP Container - 3 Compartment - Center Slide - 9x8.2, 150pc (150/1). Multi-section meal packaging.",
    "palletTiHi": "6/7 (42cs)",
    "price": 28.5,
    "specialPrice": null,
    "imageUrl": "/images/white_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "9\" x 8.2\"",
        "sku": "CS8003",
        "caseCount": 150,
        "price": 28.5,
        "dimensions": "6/7 (42cs)"
      }
    ]
  },
  {
    "id": "cs901",
    "sku": "CS901",
    "categoryId": "hinged-containers",
    "subcategory": "Mineral-Filled Polypropylene (MFPP)",
    "name": "Clamshell MFPP Container - Center Slide - 9.5x9.25, 150pc (150/1)",
    "slug": "cs901",
    "description": "Clamshell MFPP Container - Center Slide - 9.5x9.25, 150pc (150/1). Extra large entree takeout container.",
    "palletTiHi": "6/7 (42cs)",
    "price": 29.8,
    "specialPrice": null,
    "imageUrl": "/images/white_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "9.5\" x 9.25\"",
        "sku": "CS901",
        "caseCount": 150,
        "price": 29.8,
        "dimensions": "6/7 (42cs)"
      }
    ]
  },
  {
    "id": "cs903",
    "sku": "CS903",
    "categoryId": "hinged-containers",
    "subcategory": "Mineral-Filled Polypropylene (MFPP)",
    "name": "Clamshell MFPP Container - 3 Compartment - Center Slide - 9.5x9.25, 150pc (150/1)",
    "slug": "cs903",
    "description": "Clamshell MFPP Container - 3 Compartment - Center Slide - 9.5x9.25, 150pc (150/1). Full-size dinner box.",
    "palletTiHi": "6/7 (42cs)",
    "price": 29.8,
    "specialPrice": null,
    "imageUrl": "/images/white_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "9.5\" x 9.25\"",
        "sku": "CS903",
        "caseCount": 150,
        "price": 29.8,
        "dimensions": "6/7 (42cs)"
      }
    ]
  },
  {
    "id": "cs905",
    "sku": "CS905",
    "categoryId": "hinged-containers",
    "subcategory": "Mineral-Filled Polypropylene (MFPP)",
    "name": "Clamshell MFPP Container - Center Slide - 8.8x5.3, 200pc (200/1)",
    "slug": "cs905",
    "description": "Clamshell MFPP Container - Center Slide - 8.8x5.3, 200pc (200/1). Rectangular hoagie format with center tab.",
    "palletTiHi": "6/7 (42cs)",
    "price": 27.5,
    "specialPrice": null,
    "imageUrl": "/images/white_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "8.8\" x 5.3\"",
        "sku": "CS905",
        "caseCount": 200,
        "price": 27.5,
        "dimensions": "6/7 (42cs)"
      }
    ]
  },
  {
    "id": "cs906",
    "sku": "CS906",
    "categoryId": "hinged-containers",
    "subcategory": "Mineral-Filled Polypropylene (MFPP)",
    "name": "Clamshell MFPP Container - Center Slide - 9.25x6.5, 150pc (150/1)",
    "slug": "cs906",
    "description": "Clamshell MFPP Container - Center Slide - 9.25x6.5, 150pc (150/1). Center locking tab system.",
    "palletTiHi": "6/7 (42cs)",
    "price": 28.2,
    "specialPrice": null,
    "imageUrl": "/images/white_hinged_box.jpg",
    "material": "Mineral-Filled Polypropylene (MFPP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "9.25\" x 6.5\"",
        "sku": "CS906",
        "caseCount": 150,
        "price": 28.2,
        "dimensions": "6/7 (42cs)"
      }
    ]
  },
  {
    "id": "bp01k",
    "sku": "BP01K",
    "categoryId": "paper-take-out-boxes",
    "subcategory": "Poly-Coated Kraft Paperboard",
    "name": "Bio Box #1 - Kraft, 450pc (50/9)",
    "slug": "bp01k",
    "description": "Bio Box #1 - Kraft Paperboard, 450pc (50/9). Poly-lined leak-proof construction for Asian cuisine, pasta and salads.",
    "palletTiHi": "8/6 (48cs)",
    "price": 36.8,
    "specialPrice": null,
    "imageUrl": "/images/paper-bio-box.jpg",
    "material": "Poly-Coated Kraft Paperboard",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "#1 Kraft",
        "sku": "BP01K",
        "caseCount": 450,
        "price": 36.8,
        "dimensions": "8/6 (48cs)"
      }
    ]
  },
  {
    "id": "bp02k",
    "sku": "BP02K",
    "categoryId": "paper-take-out-boxes",
    "subcategory": "Poly-Coated Kraft Paperboard",
    "name": "Bio Box #2 - Kraft, 200pc (50/4)",
    "slug": "bp02k",
    "description": "Bio Box #2 - Kraft Paperboard, 200pc (50/4). Heavy-duty natural kraft takeout carryout box.",
    "palletTiHi": "8/6 (48cs)",
    "price": 29.5,
    "specialPrice": null,
    "imageUrl": "/images/paper-bio-box.jpg",
    "material": "Poly-Coated Kraft Paperboard",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "#2 Kraft",
        "sku": "BP02K",
        "caseCount": 200,
        "price": 29.5,
        "dimensions": "8/6 (48cs)"
      }
    ]
  },
  {
    "id": "bp03k",
    "sku": "BP03K",
    "categoryId": "paper-take-out-boxes",
    "subcategory": "Poly-Coated Kraft Paperboard",
    "name": "Bio Box #3 - Kraft, 200pc (50/4)",
    "slug": "bp03k",
    "description": "Bio Box #3 - Kraft Paperboard, 200pc (50/4). Large dinner capacity with folding tab top.",
    "palletTiHi": "6/6 (36cs)",
    "price": 32.4,
    "specialPrice": null,
    "imageUrl": "/images/paper-bio-box.jpg",
    "material": "Poly-Coated Kraft Paperboard",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "#3 Kraft",
        "sku": "BP03K",
        "caseCount": 200,
        "price": 32.4,
        "dimensions": "6/6 (36cs)"
      }
    ]
  },
  {
    "id": "bp04k",
    "sku": "BP04K",
    "categoryId": "paper-take-out-boxes",
    "subcategory": "Poly-Coated Kraft Paperboard",
    "name": "Bio Box #4 - Kraft, 160pc (40/4)",
    "slug": "bp04k",
    "description": "Bio Box #4 - Kraft Paperboard, 160pc (40/4). Deep takeout container for entrees and combos.",
    "palletTiHi": "6/6 (36cs)",
    "price": 31.2,
    "specialPrice": null,
    "imageUrl": "/images/paper-bio-box.jpg",
    "material": "Poly-Coated Kraft Paperboard",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "#4 Kraft",
        "sku": "BP04K",
        "caseCount": 160,
        "price": 31.2,
        "dimensions": "6/6 (36cs)"
      }
    ]
  },
  {
    "id": "bp08k",
    "sku": "BP08K",
    "categoryId": "paper-take-out-boxes",
    "subcategory": "Poly-Coated Kraft Paperboard",
    "name": "Bio Box #8 - Kraft, 300pc (50/6)",
    "slug": "bp08k",
    "description": "Bio Box #8 - Kraft Paperboard, 300pc (50/6). Traditional carryout food box with grease-resistant lining.",
    "palletTiHi": "6/7 (42cs)",
    "price": 34.9,
    "specialPrice": null,
    "imageUrl": "/images/paper-bio-box.jpg",
    "material": "Poly-Coated Kraft Paperboard",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "#8 Kraft",
        "sku": "BP08K",
        "caseCount": 300,
        "price": 34.9,
        "dimensions": "6/7 (42cs)"
      }
    ]
  },
  {
    "id": "bag-5",
    "sku": "BAG#5",
    "categoryId": "bags",
    "subcategory": "Heavy-Duty Natural Kraft Paper",
    "name": "#5 Kraft Paper Bag - 10x7x12, 500pc",
    "slug": "bag-5",
    "description": "#5 Kraft Paper Bag - 10x7x12, 500pc. Self-opening thumb notch design for fast service packing.",
    "palletTiHi": "8/6 (48cs)",
    "price": 28.5,
    "specialPrice": null,
    "imageUrl": "/images/cat_kraft_bags.jpg",
    "material": "Heavy-Duty Natural Kraft Paper",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "#5 Bag",
        "sku": "BAG#5",
        "caseCount": 500,
        "price": 28.5,
        "dimensions": "8/6 (48cs)"
      }
    ]
  },
  {
    "id": "bag-10",
    "sku": "BAG#10",
    "categoryId": "bags",
    "subcategory": "Heavy-Duty Natural Kraft Paper",
    "name": "#10 Kraft Paper Bag - 13x7x17, 500pc",
    "slug": "bag-10",
    "description": "#10 Kraft Paper Bag - 13x7x17, 500pc. High capacity takeout carryout bag for multiple container orders.",
    "palletTiHi": "6/6 (36cs)",
    "price": 34.2,
    "specialPrice": null,
    "imageUrl": "/images/cat_kraft_bags.jpg",
    "material": "Heavy-Duty Natural Kraft Paper",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "#10 Bag",
        "sku": "BAG#10",
        "caseCount": 500,
        "price": 34.2,
        "dimensions": "6/6 (36cs)"
      }
    ]
  },
  {
    "id": "strawb1",
    "sku": "STRAWB1",
    "categoryId": "straws",
    "subcategory": "Polypropylene (PP)",
    "name": "8x6mm Black Straw, 500*6 Bags",
    "slug": "strawb1",
    "description": "8x6mm Black Drinking Straw, 500*6 Bags (3,000 count). Standard beverage straw for dining service.",
    "palletTiHi": "8/8 (64cs)",
    "price": 19.8,
    "specialPrice": null,
    "imageUrl": "/images/black-straw.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "8 x 6mm",
        "sku": "STRAWB1",
        "caseCount": 3000,
        "price": 19.8,
        "dimensions": "8/8 (64cs)"
      }
    ]
  },
  {
    "id": "strawb2",
    "sku": "STRAWB2",
    "categoryId": "straws",
    "subcategory": "Polypropylene (PP)",
    "name": "9x12mm Color Straw, 200*8 Bags",
    "slug": "strawb2",
    "description": "9x12mm Jumbo Color Smoothie Straw, 200*8 Bags (1,600 count). Wide diameter for boba, smoothies and milkshakes.",
    "palletTiHi": "8/8 (64cs)",
    "price": 21.5,
    "specialPrice": null,
    "imageUrl": "/images/black-straw.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "9 x 12mm",
        "sku": "STRAWB2",
        "caseCount": 1600,
        "price": 21.5,
        "dimensions": "8/8 (64cs)"
      }
    ]
  },
  {
    "id": "strawb3",
    "sku": "STRAWB3",
    "categoryId": "straws",
    "subcategory": "Polypropylene (PP)",
    "name": "9x12mm Black Straw, 200*8 Bags",
    "slug": "strawb3",
    "description": "9x12mm Jumbo Black Smoothie Straw, 200*8 Bags (1,600 count). Extra wide diameter for thick beverages.",
    "palletTiHi": "8/8 (64cs)",
    "price": 21.5,
    "specialPrice": null,
    "imageUrl": "/images/black-straw.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "9 x 12mm",
        "sku": "STRAWB3",
        "caseCount": 1600,
        "price": 21.5,
        "dimensions": "8/8 (64cs)"
      }
    ]
  },
  {
    "id": "strawcbox",
    "sku": "STRAWCBOX",
    "categoryId": "straws",
    "subcategory": "Polypropylene (PP)",
    "name": "7.75x6mm Clear Straw (Box), 12000pc (500x24)",
    "slug": "strawcbox",
    "description": "7.75x6mm Clear Drinking Straw (Box), 12,000 count (500x24). Commercial beverage straw for food service & takeout dining.",
    "palletTiHi": "8/8 (64cs)",
    "price": 22.8,
    "specialPrice": null,
    "imageUrl": "/images/clear-straw.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "10.25 x 7.4mm",
        "sku": "STRAWCBOX",
        "caseCount": 1200,
        "price": 22.8,
        "dimensions": "8/8 (64cs)"
      }
    ]
  },
  {
    "id": "pp5-4g-blk-fork",
    "sku": "PP5.4G-BLK-FORK",
    "categoryId": "cutlery",
    "subcategory": "Heavy-Duty Polypropylene (PP)",
    "name": "PP5.4g Black Plastic Fork - Heavy Weight, 1000 Bulk",
    "slug": "pp5-4g-blk-fork",
    "description": "PP5.4g Black Plastic Fork - Heavy Weight Commercial Dining Cutlery, 1000 Bulk. Break-resistant rigid tines.",
    "palletTiHi": "8/8 (64cs)",
    "price": 18.5,
    "specialPrice": null,
    "imageUrl": "/images/cat_cutlery.jpg",
    "material": "Heavy-Duty Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "5.4g Heavy",
        "sku": "PP5.4G-BLK-FORK",
        "caseCount": 1000,
        "price": 18.5,
        "dimensions": "8/8 (64cs)"
      }
    ]
  },
  {
    "id": "pp5-4g-wht-fork",
    "sku": "PP5.4G-WHT-FORK",
    "categoryId": "cutlery",
    "subcategory": "Heavy-Duty Polypropylene (PP)",
    "name": "PP5.4g White Plastic Fork - Heavy Weight, 1000 Bulk",
    "slug": "pp5-4g-wht-fork",
    "description": "PP5.4g White Plastic Fork - Heavy Weight Commercial Dining Cutlery, 1000 Bulk. Clean white restaurant grade.",
    "palletTiHi": "8/8 (64cs)",
    "price": 18.5,
    "specialPrice": null,
    "imageUrl": "/images/cat_cutlery.jpg",
    "material": "Heavy-Duty Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "5.4g Heavy",
        "sku": "PP5.4G-WHT-FORK",
        "caseCount": 1000,
        "price": 18.5,
        "dimensions": "8/8 (64cs)"
      }
    ]
  },
  {
    "id": "pp5-4g-blk-spoon",
    "sku": "PP5.4G-BLK-SPOON",
    "categoryId": "cutlery",
    "subcategory": "Heavy-Duty Polypropylene (PP)",
    "name": "PP5.4g Black Plastic Tea Spoon - Heavy Weight, 1000 Bulk",
    "slug": "pp5-4g-blk-spoon",
    "description": "PP5.4g Black Plastic Tea Spoon - Heavy Weight Commercial Cutlery, 1000 Bulk. Deep bowl for hot and cold foods.",
    "palletTiHi": "8/8 (64cs)",
    "price": 18.5,
    "specialPrice": null,
    "imageUrl": "/images/cat_cutlery.jpg",
    "material": "Heavy-Duty Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "5.4g Heavy",
        "sku": "PP5.4G-BLK-SPOON",
        "caseCount": 1000,
        "price": 18.5,
        "dimensions": "8/8 (64cs)"
      }
    ]
  },
  {
    "id": "pp5-4g-wht-spoon",
    "sku": "PP5.4G-WHT-SPOON",
    "categoryId": "cutlery",
    "subcategory": "Heavy-Duty Polypropylene (PP)",
    "name": "PP5.4g White Plastic Tea Spoon - Heavy Weight, 1000 Bulk",
    "slug": "pp5-4g-wht-spoon",
    "description": "PP5.4g White Plastic Tea Spoon - Heavy Weight Commercial Cutlery, 1000 Bulk. Professional food service quality.",
    "palletTiHi": "8/8 (64cs)",
    "price": 18.5,
    "specialPrice": null,
    "imageUrl": "/images/cat_cutlery.jpg",
    "material": "Heavy-Duty Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "5.4g Heavy",
        "sku": "PP5.4G-WHT-SPOON",
        "caseCount": 1000,
        "price": 18.5,
        "dimensions": "8/8 (64cs)"
      }
    ]
  },
  {
    "id": "pp5-0g-wht-soup",
    "sku": "PP5.0G-WHT-SOUP",
    "categoryId": "cutlery",
    "subcategory": "Heavy-Duty Polypropylene (PP)",
    "name": "PP5.0g White Plastic Soup Spoon - Extra Heavy, 1000 Bulk",
    "slug": "pp5-0g-wht-soup",
    "description": "PP5.0g White Plastic Soup Spoon - Extra Heavy Weight Asian & Broth Spoon, 1000 Bulk. Flat bottom for ramen and pho.",
    "palletTiHi": "8/8 (64cs)",
    "price": 19.9,
    "specialPrice": null,
    "imageUrl": "/images/cat_cutlery.jpg",
    "material": "Heavy-Duty Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "5.0g Extra Heavy",
        "sku": "PP5.0G-WHT-SOUP",
        "caseCount": 1000,
        "price": 19.9,
        "dimensions": "8/8 (64cs)"
      }
    ]
  },
  {
    "id": "pp5-0g-blk-soup",
    "sku": "PP5.0G-BLK-SOUP",
    "categoryId": "cutlery",
    "subcategory": "Heavy-Duty Polypropylene (PP)",
    "name": "PP5.0g Black Plastic Soup Spoon - Extra Heavy, 1000 Bulk",
    "slug": "pp5-0g-blk-soup",
    "description": "PP5.0g Black Plastic Soup Spoon - Extra Heavy Weight Asian & Broth Spoon, 1000 Bulk. Deep ladle bowl.",
    "palletTiHi": "8/8 (64cs)",
    "price": 19.9,
    "specialPrice": null,
    "imageUrl": "/images/cat_cutlery.jpg",
    "material": "Heavy-Duty Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "5.0g Extra Heavy",
        "sku": "PP5.0G-BLK-SOUP",
        "caseCount": 1000,
        "price": 19.9,
        "dimensions": "8/8 (64cs)"
      }
    ]
  },
  {
    "id": "kit-3in1-blk",
    "sku": "KIT-3IN1-BLK",
    "categoryId": "cutlery",
    "subcategory": "Heavy Duty Polypropylene + 1-ply Napkin",
    "name": "3 In 1 Cutlery Kit (BLACK) - Fork + Knife + Napkin, 250 Sets",
    "slug": "kit-3in1-blk",
    "description": "3 In 1 Cutlery Kit (BLACK): Heavy Duty Black Fork + Knife + Salt + Pepper + Napkin individually wrapped in clear film.",
    "palletTiHi": "8/6 (48cs)",
    "price": 24.5,
    "specialPrice": null,
    "imageUrl": "/images/cat_cutlery.jpg",
    "material": "Heavy Duty Polypropylene + 1-ply Napkin",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "3-in-1 Kit",
        "sku": "KIT-3IN1-BLK",
        "caseCount": 250,
        "price": 24.5,
        "dimensions": "8/6 (48cs)"
      }
    ]
  },
  {
    "id": "kit-5in1-blk",
    "sku": "KIT-5IN1-BLK",
    "categoryId": "cutlery",
    "subcategory": "Heavy Duty Polypropylene + Seasoning + Napkin",
    "name": "5 In 1 Cutlery Kit (BLACK) - Fork + Spoon + Knife + Salt + Pepper + Napkin, 250 Sets",
    "slug": "kit-5in1-blk",
    "description": "5 In 1 Cutlery Kit (BLACK): Heavy Duty Black Fork + Spoon + Knife + Salt + Pepper + Napkin individually sealed for delivery orders.",
    "palletTiHi": "8/6 (48cs)",
    "price": 28.5,
    "specialPrice": null,
    "imageUrl": "/images/cat_cutlery.jpg",
    "material": "Heavy Duty Polypropylene + Seasoning + Napkin",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "5-in-1 Kit",
        "sku": "KIT-5IN1-BLK",
        "caseCount": 250,
        "price": 28.5,
        "dimensions": "8/6 (48cs)"
      }
    ]
  },
  {
    "id": "kit-6in1-blk",
    "sku": "KIT-6IN1-BLK",
    "categoryId": "cutlery",
    "subcategory": "Heavy Duty Polypropylene + Seasoning + Napkin",
    "name": "6 In 1 Cutlery Kit (BLACK) - Fork + Spoon + Knife + Salt + Pepper + Napkin, 250 Sets",
    "slug": "kit-6in1-blk",
    "description": "6 In 1 Cutlery Kit (BLACK): Complete Heavy Duty Black Fork + Spoon + Knife + Salt + Pepper + Napkin wrapped set.",
    "palletTiHi": "8/6 (48cs)",
    "price": 29.9,
    "specialPrice": null,
    "imageUrl": "/images/cat_cutlery.jpg",
    "material": "Heavy Duty Polypropylene + Seasoning + Napkin",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "6-in-1 Kit",
        "sku": "KIT-6IN1-BLK",
        "caseCount": 250,
        "price": 29.9,
        "dimensions": "8/6 (48cs)"
      }
    ]
  },
  {
    "id": "kit-6in1-wht",
    "sku": "KIT-6IN1-WHT",
    "categoryId": "cutlery",
    "subcategory": "Heavy Duty Polypropylene + Seasoning + Napkin",
    "name": "6 In 1 Cutlery Kit (WHITE) - Fork + Spoon + Knife + Salt + Pepper + Napkin, 250 Sets",
    "slug": "kit-6in1-wht",
    "description": "6 In 1 Cutlery Kit (WHITE): Complete Heavy Duty White Fork + Spoon + Knife + Salt + Pepper + Napkin wrapped set.",
    "palletTiHi": "8/6 (48cs)",
    "price": 29.9,
    "specialPrice": null,
    "imageUrl": "/images/cat_cutlery.jpg",
    "material": "Heavy Duty Polypropylene + Seasoning + Napkin",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "6-in-1 Kit",
        "sku": "KIT-6IN1-WHT",
        "caseCount": 250,
        "price": 29.9,
        "dimensions": "8/6 (48cs)"
      }
    ]
  },
  {
    "id": "napkin-7x13",
    "sku": "NAPKIN-7X13",
    "categoryId": "napkins",
    "subcategory": "Virgin Soft Tissue Paper",
    "name": "7x13 Single Layer Napkins, 1000 Bulk",
    "slug": "napkin-7x13",
    "description": "7x13 Single Layer Food Service Napkins, 1000 Bulk. Absorbent embossed paper for quick-service dining.",
    "palletTiHi": "8/8 (64cs)",
    "price": 16.5,
    "specialPrice": null,
    "imageUrl": "/images/cat_napkins.jpg",
    "material": "Virgin Soft Tissue Paper",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "7\" x 13\"",
        "sku": "NAPKIN-7X13",
        "caseCount": 1000,
        "price": 16.5,
        "dimensions": "8/8 (64cs)"
      }
    ]
  },
  {
    "id": "napkin-15x17",
    "sku": "NAPKIN-15X17",
    "categoryId": "napkins",
    "subcategory": "2-Ply Soft White Tissue",
    "name": "15x17 Double Layer 1/8 Fold Napkins, 1000 Bulk",
    "slug": "napkin-15x17",
    "description": "15x17 Double Layer 1/8 Fold Dinner Napkins, 1000 Bulk. High absorbency for sit-down restaurants and catering.",
    "palletTiHi": "6/6 (36cs)",
    "price": 24.8,
    "specialPrice": null,
    "imageUrl": "/images/cat_napkins.jpg",
    "material": "2-Ply Soft White Tissue",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "15\" x 17\"",
        "sku": "NAPKIN-15X17",
        "caseCount": 1000,
        "price": 24.8,
        "dimensions": "6/6 (36cs)"
      }
    ]
  },
  {
    "id": "tray-100",
    "sku": "TRAY-100",
    "categoryId": "food-trays-plates",
    "subcategory": "Clay-Coated Paperboard",
    "name": "Paper Food Tray - 1LB (100g), 1000pc",
    "slug": "tray-100",
    "description": "Paper Food Tray - 1LB (100g) capacity, 1000pc. Grease-resistant open top tray for fries, nachos and finger food.",
    "palletTiHi": "8/6 (48cs)",
    "price": 21.5,
    "specialPrice": null,
    "imageUrl": "/images/paper-food-tray.jpg",
    "material": "Clay-Coated Paperboard",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "1 LB",
        "sku": "TRAY-100",
        "caseCount": 1000,
        "price": 21.5,
        "dimensions": "8/6 (48cs)"
      }
    ]
  },
  {
    "id": "tray-200",
    "sku": "TRAY-200",
    "categoryId": "food-trays-plates",
    "subcategory": "Clay-Coated Paperboard",
    "name": "Paper Food Tray - 2LB (200g), 1000pc",
    "slug": "tray-200",
    "description": "Paper Food Tray - 2LB (200g) capacity, 1000pc. High rim prevents grease spills at concession stands and food trucks.",
    "palletTiHi": "8/6 (48cs)",
    "price": 25.8,
    "specialPrice": null,
    "imageUrl": "/images/paper-food-tray.jpg",
    "material": "Clay-Coated Paperboard",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "2 LB",
        "sku": "TRAY-200",
        "caseCount": 1000,
        "price": 25.8,
        "dimensions": "8/6 (48cs)"
      }
    ]
  },
  {
    "id": "tray-250",
    "sku": "TRAY-250",
    "categoryId": "food-trays-plates",
    "subcategory": "Clay-Coated Paperboard",
    "name": "Paper Food Tray - 2.5LB (250g), 500pc",
    "slug": "tray-250",
    "description": "Paper Food Tray - 2.5LB (250g) capacity, 500pc. Heavy paperboard construction for loaded entrees.",
    "palletTiHi": "8/6 (48cs)",
    "price": 22.9,
    "specialPrice": null,
    "imageUrl": "/images/paper-food-tray.jpg",
    "material": "Clay-Coated Paperboard",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "2.5 LB",
        "sku": "TRAY-250",
        "caseCount": 500,
        "price": 22.9,
        "dimensions": "8/6 (48cs)"
      }
    ]
  },
  {
    "id": "tray-300",
    "sku": "TRAY-300",
    "categoryId": "food-trays-plates",
    "subcategory": "Clay-Coated Paperboard",
    "name": "Paper Food Tray - 3LB (300g), 500pc",
    "slug": "tray-300",
    "description": "Paper Food Tray - 3LB (300g) capacity, 500pc. Maximum capacity serving boats.",
    "palletTiHi": "8/6 (48cs)",
    "price": 24.5,
    "specialPrice": null,
    "imageUrl": "/images/paper-food-tray.jpg",
    "material": "Clay-Coated Paperboard",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "3 LB",
        "sku": "TRAY-300",
        "caseCount": 500,
        "price": 24.5,
        "dimensions": "8/6 (48cs)"
      }
    ]
  },
  {
    "id": "plate6",
    "sku": "PLATE6",
    "categoryId": "food-trays-plates",
    "subcategory": "Compostable Sugarcane Bagasse / Paper",
    "name": "Compostable Paper Plate - 6 inch, 1000pc",
    "slug": "plate6",
    "description": "Compostable Paper Plate - 6 inch, 1000pc. Biodegradable appetizer and dessert serving plates.",
    "palletTiHi": "8/8 (64cs)",
    "price": 22.8,
    "specialPrice": null,
    "imageUrl": "/images/compostable-paper-plate.jpg",
    "material": "Compostable Sugarcane Bagasse / Paper",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "sizes": [
      {
        "name": "6\"",
        "sku": "PLATE6",
        "caseCount": 1000,
        "price": 22.8,
        "dimensions": "8/8 (64cs)"
      }
    ]
  },
  {
    "id": "tfrdb16",
    "sku": "TFRDB16",
    "categoryId": "round-containers",
    "subcategory": "PP Plastic · Microwaveable · 120 Sets",
    "name": "16oz Round Black Microwaveable Bowl with Vented Clear Lid, 120 Sets (40/6)",
    "slug": "tfrdb16",
    "description": "Commercial food service packaging SKU TFRDB16: 16oz Round Black Microwaveable Bowl with Vented Clear Lid, 120 Sets (40/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 14/4 (56cs).",
    "palletTiHi": "14/4 (56cs)",
    "price": 18.05,
    "specialPrice": 18.05,
    "mrpPrice": 24.37,
    "bestSeller": true,
    "imageUrl": "/images/round_takeout_bowl.jpg",
    "material": "PP Plastic · Microwaveable · 120 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 43,
    "sizes": [
      {
        "name": "Case (120 pcs)",
        "sku": "TFRDB16",
        "caseCount": 120,
        "price": 18.05,
        "dimensions": "14/4 (56cs)"
      }
    ]
  },
  {
    "id": "tfrdb20",
    "sku": "TFRDB20",
    "categoryId": "round-containers",
    "subcategory": "PP Plastic · Microwaveable · 120 Sets",
    "name": "20oz Round Black Microwaveable Bowl with Vented Clear Lid, 120 Sets (40/6)",
    "slug": "tfrdb20",
    "description": "Commercial food service packaging SKU TFRDB20: 20oz Round Black Microwaveable Bowl with Vented Clear Lid, 120 Sets (40/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 14/4 (56cs).",
    "palletTiHi": "14/4 (56cs)",
    "price": 19.35,
    "specialPrice": 19.35,
    "mrpPrice": 26.12,
    "bestSeller": true,
    "imageUrl": "/images/round_takeout_bowl.jpg",
    "material": "PP Plastic · Microwaveable · 120 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 43,
    "sizes": [
      {
        "name": "Case (120 pcs)",
        "sku": "TFRDB20",
        "caseCount": 120,
        "price": 19.35,
        "dimensions": "14/4 (56cs)"
      }
    ]
  },
  {
    "id": "tfrdb24",
    "sku": "TFRDB24",
    "categoryId": "round-containers",
    "subcategory": "PP Plastic · Microwaveable · 120 Sets",
    "name": "24oz Round Black Microwaveable Bowl with Vented Clear Lid, 120 Sets (40/6)",
    "slug": "tfrdb24",
    "description": "Commercial food service packaging SKU TFRDB24: 24oz Round Black Microwaveable Bowl with Vented Clear Lid, 120 Sets (40/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 14/4 (56cs).",
    "palletTiHi": "14/4 (56cs)",
    "price": 20.65,
    "specialPrice": 20.65,
    "mrpPrice": 27.88,
    "bestSeller": true,
    "imageUrl": "/images/round_takeout_bowl.jpg",
    "material": "PP Plastic · Microwaveable · 120 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 43,
    "sizes": [
      {
        "name": "Case (120 pcs)",
        "sku": "TFRDB24",
        "caseCount": 120,
        "price": 20.65,
        "dimensions": "14/4 (56cs)"
      }
    ]
  },
  {
    "id": "m24bl",
    "sku": "M24BL",
    "categoryId": "round-containers",
    "subcategory": "Heavy Duty PP · Microwaveable · 120 Sets",
    "name": "24oz Heavy Duty Black Round Microwaveable Bowl with Clear Vented Lid, 120 Sets (40/6)",
    "slug": "m24bl",
    "description": "Commercial food service packaging SKU M24BL: 24oz Heavy Duty Black Round Microwaveable Bowl with Clear Vented Lid, 120 Sets (40/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 14/3 (50cs).",
    "palletTiHi": "14/3 (50cs)",
    "price": 23.25,
    "specialPrice": null,
    "mrpPrice": 31.39,
    "bestSeller": false,
    "imageUrl": "/images/round_takeout_bowl.jpg",
    "material": "Heavy Duty PP · Microwaveable · 120 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 97,
    "sizes": [
      {
        "name": "Case (120 pcs)",
        "sku": "M24BL",
        "caseCount": 120,
        "price": 23.25,
        "dimensions": "14/3 (50cs)"
      }
    ]
  },
  {
    "id": "sdlh8",
    "sku": "SDLH8",
    "categoryId": "deli-containers",
    "subcategory": "Polypropylene (PP)",
    "name": "8oz PP Deli Container, 240 Sets (24/20)",
    "slug": "sdlh8",
    "description": "Commercial food service packaging SKU SDLH8: 8oz PP Deli Container, 240 Sets (24/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/8 (64cs).",
    "palletTiHi": "8/8 (64cs)",
    "price": 19.35,
    "specialPrice": 19.35,
    "mrpPrice": 26.12,
    "bestSeller": true,
    "imageUrl": "/images/pp-deli-container.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 97,
    "sizes": [
      {
        "name": "Case (240 pcs)",
        "sku": "SDLH8",
        "caseCount": 240,
        "price": 19.35,
        "dimensions": "8/8 (64cs)"
      }
    ]
  },
  {
    "id": "sdlh16",
    "sku": "SDLH16",
    "categoryId": "deli-containers",
    "subcategory": "Polypropylene (PP)",
    "name": "16oz PP Deli Container, 240 Sets (24/20)",
    "slug": "sdlh16",
    "description": "Commercial food service packaging SKU SDLH16: 16oz PP Deli Container, 240 Sets (24/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/7 (56cs).",
    "palletTiHi": "8/7 (56cs)",
    "price": 21.95,
    "specialPrice": 21.95,
    "mrpPrice": 29.63,
    "bestSeller": true,
    "imageUrl": "/images/pp-deli-container.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 110,
    "sizes": [
      {
        "name": "Case (240 pcs)",
        "sku": "SDLH16",
        "caseCount": 240,
        "price": 21.95,
        "dimensions": "8/7 (56cs)"
      }
    ]
  },
  {
    "id": "sdlh32",
    "sku": "SDLH32",
    "categoryId": "deli-containers",
    "subcategory": "Polypropylene (PP)",
    "name": "32oz PP Deli Container, 240 Sets (24/20)",
    "slug": "sdlh32",
    "description": "Commercial food service packaging SKU SDLH32: 32oz PP Deli Container, 240 Sets (24/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 28.45,
    "specialPrice": 28.45,
    "mrpPrice": 38.41,
    "bestSeller": true,
    "imageUrl": "/images/pp-deli-container.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 110,
    "sizes": [
      {
        "name": "Case (240 pcs)",
        "sku": "SDLH32",
        "caseCount": 240,
        "price": 28.45,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "rc16",
    "sku": "RC16",
    "categoryId": "rectangular-containers",
    "subcategory": "Polypropylene (PP) · 150 Sets",
    "name": "16oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6)",
    "slug": "rc16",
    "description": "Commercial food service packaging SKU RC16: 16oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 15/6 (90cs).",
    "palletTiHi": "15/6 (90cs)",
    "price": 26.85,
    "specialPrice": null,
    "mrpPrice": 36.25,
    "bestSeller": false,
    "imageUrl": "/images/rectangular_takeout_box.jpg",
    "material": "Polypropylene (PP) · 150 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 84,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "RC16",
        "caseCount": 150,
        "price": 26.85,
        "dimensions": "15/6 (90cs)"
      }
    ]
  },
  {
    "id": "rc24",
    "sku": "RC24",
    "categoryId": "rectangular-containers",
    "subcategory": "Polypropylene (PP) · 150 Sets",
    "name": "24oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6)",
    "slug": "rc24",
    "description": "Commercial food service packaging SKU RC24: 24oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 15/5 (75cs).",
    "palletTiHi": "15/5 (75cs)",
    "price": 28.73,
    "specialPrice": null,
    "mrpPrice": 38.79,
    "bestSeller": false,
    "imageUrl": "/images/rectangular_takeout_box.jpg",
    "material": "Polypropylene (PP) · 150 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 84,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "RC24",
        "caseCount": 150,
        "price": 28.73,
        "dimensions": "15/5 (75cs)"
      }
    ]
  },
  {
    "id": "rc28",
    "sku": "RC28",
    "categoryId": "rectangular-containers",
    "subcategory": "Polypropylene (PP) · 150 Sets",
    "name": "28oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6)",
    "slug": "rc28",
    "description": "Commercial food service packaging SKU RC28: 28oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/5 (50cs).",
    "palletTiHi": "10/5 (50cs)",
    "price": 36.91,
    "specialPrice": null,
    "mrpPrice": 49.83,
    "bestSeller": false,
    "imageUrl": "/images/rectangular_takeout_box.jpg",
    "material": "Polypropylene (PP) · 150 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 84,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "RC28",
        "caseCount": 150,
        "price": 36.91,
        "dimensions": "10/5 (50cs)"
      }
    ]
  },
  {
    "id": "rc32",
    "sku": "RC32",
    "categoryId": "rectangular-containers",
    "subcategory": "Polypropylene (PP) · 150 Sets",
    "name": "32oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6)",
    "slug": "rc32",
    "description": "Commercial food service packaging SKU RC32: 32oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/4 (40cs).",
    "palletTiHi": "10/4 (40cs)",
    "price": 39.72,
    "specialPrice": null,
    "mrpPrice": 53.62,
    "bestSeller": false,
    "imageUrl": "/images/rectangular_takeout_box.jpg",
    "material": "Polypropylene (PP) · 150 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 84,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "RC32",
        "caseCount": 150,
        "price": 39.72,
        "dimensions": "10/4 (40cs)"
      }
    ]
  },
  {
    "id": "rc38",
    "sku": "RC38",
    "categoryId": "rectangular-containers",
    "subcategory": "Polypropylene (PP) · 150 Sets",
    "name": "38oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6)",
    "slug": "rc38",
    "description": "Commercial food service packaging SKU RC38: 38oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/4 (40cs).",
    "palletTiHi": "10/4 (40cs)",
    "price": 40.6,
    "specialPrice": null,
    "mrpPrice": 54.81,
    "bestSeller": false,
    "imageUrl": "/images/rectangular_takeout_box.jpg",
    "material": "Polypropylene (PP) · 150 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 84,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "RC38",
        "caseCount": 150,
        "price": 40.6,
        "dimensions": "10/4 (40cs)"
      }
    ]
  },
  {
    "id": "src12",
    "sku": "SRC12",
    "categoryId": "rectangular-containers",
    "subcategory": "Polypropylene (PP) · 150 Sets",
    "name": "12oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6)",
    "slug": "src12",
    "description": "Commercial food service packaging SKU SRC12: 12oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 20/8 (160cs).",
    "palletTiHi": "20/8 (160cs)",
    "price": 18.61,
    "specialPrice": null,
    "mrpPrice": 25.12,
    "bestSeller": false,
    "imageUrl": "/images/rectangular_takeout_box.jpg",
    "material": "Polypropylene (PP) · 150 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 97,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "SRC12",
        "caseCount": 150,
        "price": 18.61,
        "dimensions": "20/8 (160cs)"
      }
    ]
  },
  {
    "id": "src16",
    "sku": "SRC16",
    "categoryId": "rectangular-containers",
    "subcategory": "Polypropylene (PP) · 150 Sets",
    "name": "16oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6)",
    "slug": "src16",
    "description": "Commercial food service packaging SKU SRC16: 16oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 15/7 (105cs).",
    "palletTiHi": "15/7 (105cs)",
    "price": 23.56,
    "specialPrice": null,
    "mrpPrice": 31.81,
    "bestSeller": false,
    "imageUrl": "/images/rectangular_takeout_box.jpg",
    "material": "Polypropylene (PP) · 150 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 97,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "SRC16",
        "caseCount": 150,
        "price": 23.56,
        "dimensions": "15/7 (105cs)"
      }
    ]
  },
  {
    "id": "src24",
    "sku": "SRC24",
    "categoryId": "rectangular-containers",
    "subcategory": "Polypropylene (PP) · 150 Sets",
    "name": "24oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6)",
    "slug": "src24",
    "description": "Commercial food service packaging SKU SRC24: 24oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 15/7 (105cs).",
    "palletTiHi": "15/7 (105cs)",
    "price": 26.86,
    "specialPrice": null,
    "mrpPrice": 36.26,
    "bestSeller": false,
    "imageUrl": "/images/rectangular_takeout_box.jpg",
    "material": "Polypropylene (PP) · 150 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 97,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "SRC24",
        "caseCount": 150,
        "price": 26.86,
        "dimensions": "15/7 (105cs)"
      }
    ]
  },
  {
    "id": "src28",
    "sku": "SRC28",
    "categoryId": "rectangular-containers",
    "subcategory": "Polypropylene (PP) · 150 Sets",
    "name": "28oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6), Lids Compatible with SRC32 and SRC38T",
    "slug": "src28",
    "description": "Commercial food service packaging SKU SRC28: 28oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6), Lids Compatible with SRC32 and SRC38T. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/7 (70cs).",
    "palletTiHi": "10/7 (70cs)",
    "price": 28.69,
    "specialPrice": null,
    "mrpPrice": 38.73,
    "bestSeller": false,
    "imageUrl": "/images/rectangular_takeout_box.jpg",
    "material": "Polypropylene (PP) · 150 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 97,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "SRC28",
        "caseCount": 150,
        "price": 28.69,
        "dimensions": "10/7 (70cs)"
      }
    ]
  },
  {
    "id": "src32",
    "sku": "SRC32",
    "categoryId": "rectangular-containers",
    "subcategory": "Polypropylene (PP) · 150 Sets",
    "name": "32oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6), Lids Compatible with SRC28 and SRC38T",
    "slug": "src32",
    "description": "Commercial food service packaging SKU SRC32: 32oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6), Lids Compatible with SRC28 and SRC38T. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/7 (70cs).",
    "palletTiHi": "10/7 (70cs)",
    "price": 29.21,
    "specialPrice": null,
    "mrpPrice": 39.43,
    "bestSeller": false,
    "imageUrl": "/images/rectangular_takeout_box.jpg",
    "material": "Polypropylene (PP) · 150 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 97,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "SRC32",
        "caseCount": 150,
        "price": 29.21,
        "dimensions": "10/7 (70cs)"
      }
    ]
  },
  {
    "id": "src38t",
    "sku": "SRC38T",
    "categoryId": "rectangular-containers",
    "subcategory": "Polypropylene (PP) · 150 Sets",
    "name": "38oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6), Lids Compatible with SRC28 and SRC32",
    "slug": "src38t",
    "description": "Commercial food service packaging SKU SRC38T: 38oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6), Lids Compatible with SRC28 and SRC32. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/7 (70cs).",
    "palletTiHi": "10/7 (70cs)",
    "price": 36.01,
    "specialPrice": null,
    "mrpPrice": 48.61,
    "bestSeller": false,
    "imageUrl": "/images/rectangular_takeout_box.jpg",
    "material": "Polypropylene (PP) · 150 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 110,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "SRC38T",
        "caseCount": 150,
        "price": 36.01,
        "dimensions": "10/7 (70cs)"
      }
    ]
  },
  {
    "id": "src38",
    "sku": "SRC38",
    "categoryId": "rectangular-containers",
    "subcategory": "Polypropylene (PP) · 150 Sets",
    "name": "38oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6)",
    "slug": "src38",
    "description": "Commercial food service packaging SKU SRC38: 38oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/7 (70cs).",
    "palletTiHi": "10/7 (70cs)",
    "price": 36.01,
    "specialPrice": null,
    "mrpPrice": 48.61,
    "bestSeller": false,
    "imageUrl": "/images/rectangular_takeout_box.jpg",
    "material": "Polypropylene (PP) · 150 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 97,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "SRC38",
        "caseCount": 150,
        "price": 36.01,
        "dimensions": "10/7 (70cs)"
      }
    ]
  },
  {
    "id": "src58",
    "sku": "SRC58",
    "categoryId": "rectangular-containers",
    "subcategory": "Polypropylene (PP) · 150 Sets",
    "name": "58oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6)",
    "slug": "src58",
    "description": "Commercial food service packaging SKU SRC58: 58oz Rectangular Microwaveable Container with Lid, 150 Sets (50/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/6 (36cs).",
    "palletTiHi": "6/6 (36cs)",
    "price": 62.97,
    "specialPrice": null,
    "mrpPrice": 85.01,
    "bestSeller": false,
    "imageUrl": "/images/rectangular_takeout_box.jpg",
    "material": "Polypropylene (PP) · 150 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 97,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "SRC58",
        "caseCount": 150,
        "price": 62.97,
        "dimensions": "6/6 (36cs)"
      }
    ]
  },
  {
    "id": "w203",
    "sku": "W203",
    "categoryId": "shallow-compartmental-containers",
    "subcategory": "PP Black Tray with Translucent Lid",
    "name": "2-pc Black PP Container with Translucent Lid, 9.5\" x 7.5\", 3-Compartment, 150 Sets (50/6)",
    "slug": "w203",
    "description": "Commercial food service packaging SKU W203: 2-pc Black PP Container with Translucent Lid, 9.5\" x 7.5\", 3-Compartment, 150 Sets (50/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/7 (56cs).",
    "palletTiHi": "8/7 (56cs)",
    "price": 33.91,
    "specialPrice": null,
    "mrpPrice": 45.78,
    "bestSeller": false,
    "imageUrl": "/images/cat_takeout_containers.jpg",
    "material": "PP Black Tray with Translucent Lid",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 84,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "W203",
        "caseCount": 150,
        "price": 33.91,
        "dimensions": "8/7 (56cs)"
      }
    ]
  },
  {
    "id": "w204",
    "sku": "W204",
    "categoryId": "shallow-compartmental-containers",
    "subcategory": "PP Black Tray with Translucent Lid",
    "name": "2-pc Black PP Container, 10.5\" x 8\", 4-Compartment, 100 Sets (50/4)",
    "slug": "w204",
    "description": "Commercial food service packaging SKU W204: 2-pc Black PP Container, 10.5\" x 8\", 4-Compartment, 100 Sets (50/4). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 9/4 (36cs).",
    "palletTiHi": "9/4 (36cs)",
    "price": 33.91,
    "specialPrice": null,
    "mrpPrice": 45.78,
    "bestSeller": false,
    "imageUrl": "/images/cat_takeout_containers.jpg",
    "material": "PP Black Tray with Translucent Lid",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 84,
    "sizes": [
      {
        "name": "Case (100 pcs)",
        "sku": "W204",
        "caseCount": 100,
        "price": 33.91,
        "dimensions": "9/4 (36cs)"
      }
    ]
  },
  {
    "id": "w205",
    "sku": "W205",
    "categoryId": "shallow-compartmental-containers",
    "subcategory": "PP Black Tray with Translucent Lid",
    "name": "2-pc Black PP Container, 10.5\" x 8\", 5-Compartment, 100 Sets (50/4)",
    "slug": "w205",
    "description": "Commercial food service packaging SKU W205: 2-pc Black PP Container, 10.5\" x 8\", 5-Compartment, 100 Sets (50/4). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 9/4 (36cs).",
    "palletTiHi": "9/4 (36cs)",
    "price": 42.49,
    "specialPrice": null,
    "mrpPrice": 57.36,
    "bestSeller": false,
    "imageUrl": "/images/cat_takeout_containers.jpg",
    "material": "PP Black Tray with Translucent Lid",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 84,
    "sizes": [
      {
        "name": "Case (100 pcs)",
        "sku": "W205",
        "caseCount": 100,
        "price": 42.49,
        "dimensions": "9/4 (36cs)"
      }
    ]
  },
  {
    "id": "rct339",
    "sku": "RCT339",
    "categoryId": "shallow-compartmental-containers",
    "subcategory": "Polypropylene (PP)",
    "name": "39oz Rectangular Microwaveable Container with Lid 3-compartment, 150 Sets (50/6)",
    "slug": "rct339",
    "description": "Commercial food service packaging SKU RCT339: 39oz Rectangular Microwaveable Container with Lid 3-compartment, 150 Sets (50/6). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/6 (48cs).",
    "palletTiHi": "8/6 (48cs)",
    "price": 52.58,
    "specialPrice": null,
    "mrpPrice": 70.98,
    "bestSeller": false,
    "imageUrl": "/images/rectangular_takeout_box.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 110,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "RCT339",
        "caseCount": 150,
        "price": 52.58,
        "dimensions": "8/6 (48cs)"
      }
    ]
  },
  {
    "id": "ty-r345",
    "sku": "TY-R345",
    "categoryId": "shallow-compartmental-containers",
    "subcategory": "Polypropylene (PP)",
    "name": "45oz Round Microwaveable Container with Lid 3-compartment, 150 Sets (50/6) **Discontinuing",
    "slug": "ty-r345",
    "description": "Commercial food service packaging SKU TY-R345: 45oz Round Microwaveable Container with Lid 3-compartment, 150 Sets (50/6) **Discontinuing. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/5 (30cs).",
    "palletTiHi": "6/5 (30cs)",
    "price": 25.85,
    "specialPrice": 25.85,
    "mrpPrice": 34.9,
    "bestSeller": true,
    "imageUrl": "/images/round_takeout_bowl.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 43,
    "sizes": [
      {
        "name": "Case (150 pcs)",
        "sku": "TY-R345",
        "caseCount": 150,
        "price": 25.85,
        "dimensions": "6/5 (30cs)"
      }
    ]
  },
  {
    "id": "salad-as",
    "sku": "SALAD-AS",
    "categoryId": "food-trays-plates",
    "subcategory": "Clear Rigid Plastic · 100 Sets",
    "name": "Salad Plate 230mm AS, 100 Sets",
    "slug": "salad-as",
    "description": "Commercial food service packaging SKU SALAD-AS: Salad Plate 230mm AS, 100 Sets. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/6 (48cs).",
    "palletTiHi": "8/6 (48cs)",
    "price": 27.3,
    "specialPrice": null,
    "mrpPrice": 36.86,
    "bestSeller": false,
    "imageUrl": "/images/salad-plate.jpg",
    "material": "Clear Rigid Plastic · 100 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 56,
    "sizes": [
      {
        "name": "Case (100 pcs)",
        "sku": "SALAD-AS",
        "caseCount": 100,
        "price": 27.3,
        "dimensions": "8/6 (48cs)"
      }
    ]
  },
  {
    "id": "salad-bl",
    "sku": "SALAD-BL",
    "categoryId": "food-trays-plates",
    "subcategory": "Black Rigid Plastic · 100 Sets",
    "name": "Salad Plate 230mm BL, 100 Sets",
    "slug": "salad-bl",
    "description": "Commercial food service packaging SKU SALAD-BL: Salad Plate 230mm BL, 100 Sets. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/6 (48cs).",
    "palletTiHi": "8/6 (48cs)",
    "price": 29.9,
    "specialPrice": null,
    "mrpPrice": 40.37,
    "bestSeller": false,
    "imageUrl": "/images/salad-plate.jpg",
    "material": "Black Rigid Plastic · 100 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 56,
    "sizes": [
      {
        "name": "Case (100 pcs)",
        "sku": "SALAD-BL",
        "caseCount": 100,
        "price": 29.9,
        "dimensions": "8/6 (48cs)"
      }
    ]
  },
  {
    "id": "da-8oz",
    "sku": "DA-8OZ",
    "categoryId": "soup-containers",
    "subcategory": "PP Plastic · 240 Sets",
    "name": "8 OZ Plastic Food Container with Lid (Soup Cup), 240 Sets",
    "slug": "da-8oz",
    "description": "Commercial food service packaging SKU DA-8OZ: 8 OZ Plastic Food Container with Lid (Soup Cup), 240 Sets. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/6 (48cs).",
    "palletTiHi": "8/6 (48cs)",
    "price": 22.1,
    "specialPrice": null,
    "mrpPrice": 29.84,
    "bestSeller": false,
    "imageUrl": "/images/cat_soup_containers.jpg",
    "material": "PP Plastic · 240 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 110,
    "sizes": [
      {
        "name": "Case (240 pcs)",
        "sku": "DA-8OZ",
        "caseCount": 240,
        "price": 22.1,
        "dimensions": "8/6 (48cs)"
      }
    ]
  },
  {
    "id": "da-12oz",
    "sku": "DA-12OZ",
    "categoryId": "soup-containers",
    "subcategory": "PP Plastic · 240 Sets",
    "name": "12 OZ Plastic Food Container with Lid (Soup Cup), 240 Sets",
    "slug": "da-12oz",
    "description": "Commercial food service packaging SKU DA-12OZ: 12 OZ Plastic Food Container with Lid (Soup Cup), 240 Sets. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/6 (48cs).",
    "palletTiHi": "8/6 (48cs)",
    "price": 23.4,
    "specialPrice": null,
    "mrpPrice": 31.59,
    "bestSeller": false,
    "imageUrl": "/images/cat_soup_containers.jpg",
    "material": "PP Plastic · 240 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 43,
    "sizes": [
      {
        "name": "Case (240 pcs)",
        "sku": "DA-12OZ",
        "caseCount": 240,
        "price": 23.4,
        "dimensions": "8/6 (48cs)"
      }
    ]
  },
  {
    "id": "da-16oz",
    "sku": "DA-16OZ",
    "categoryId": "soup-containers",
    "subcategory": "PP Plastic · 240 Sets",
    "name": "16 OZ Plastic Food Container with Lid (Soup Cup), 240 Sets",
    "slug": "da-16oz",
    "description": "Commercial food service packaging SKU DA-16OZ: 16 OZ Plastic Food Container with Lid (Soup Cup), 240 Sets. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/6 (48cs).",
    "palletTiHi": "8/6 (48cs)",
    "price": 24.7,
    "specialPrice": null,
    "mrpPrice": 33.34,
    "bestSeller": false,
    "imageUrl": "/images/cat_soup_containers.jpg",
    "material": "PP Plastic · 240 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 43,
    "sizes": [
      {
        "name": "Case (240 pcs)",
        "sku": "DA-16OZ",
        "caseCount": 240,
        "price": 24.7,
        "dimensions": "8/6 (48cs)"
      }
    ]
  },
  {
    "id": "da-24oz",
    "sku": "DA-24OZ",
    "categoryId": "soup-containers",
    "subcategory": "PP Plastic · 240 Sets",
    "name": "24 OZ Plastic Food Container with Lid (Soup Cup), 240 Sets",
    "slug": "da-24oz",
    "description": "Commercial food service packaging SKU DA-24OZ: 24 OZ Plastic Food Container with Lid (Soup Cup), 240 Sets. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 28.6,
    "specialPrice": null,
    "mrpPrice": 38.61,
    "bestSeller": false,
    "imageUrl": "/images/cat_soup_containers.jpg",
    "material": "PP Plastic · 240 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 43,
    "sizes": [
      {
        "name": "Case (240 pcs)",
        "sku": "DA-24OZ",
        "caseCount": 240,
        "price": 28.6,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "da-32oz",
    "sku": "DA-32OZ",
    "categoryId": "soup-containers",
    "subcategory": "PP Plastic · 240 Sets",
    "name": "32 OZ Plastic Food Container with Lid (Soup Cup), 240 Sets",
    "slug": "da-32oz",
    "description": "Commercial food service packaging SKU DA-32OZ: 32 OZ Plastic Food Container with Lid (Soup Cup), 240 Sets. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 34.45,
    "specialPrice": null,
    "mrpPrice": 46.51,
    "bestSeller": false,
    "imageUrl": "/images/cat_soup_containers.jpg",
    "material": "PP Plastic · 240 Sets",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 43,
    "sizes": [
      {
        "name": "Case (240 pcs)",
        "sku": "DA-32OZ",
        "caseCount": 240,
        "price": 34.45,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "cda05",
    "sku": "CDA05",
    "categoryId": "soup-containers",
    "subcategory": "Poly-Coated White Paperboard",
    "name": "5 OZ White Paper Soup Container, 500pc (50/10)",
    "slug": "cda05",
    "description": "Commercial food service packaging SKU CDA05: 5 OZ White Paper Soup Container, 500pc (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/6 (48cs).",
    "palletTiHi": "8/6 (48cs)",
    "price": 23.4,
    "specialPrice": null,
    "mrpPrice": 31.59,
    "bestSeller": false,
    "imageUrl": "/images/white-paper-soup-container.jpg",
    "material": "Poly-Coated White Paperboard",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 97,
    "sizes": [
      {
        "name": "Case (500 pcs)",
        "sku": "CDA05",
        "caseCount": 500,
        "price": 23.4,
        "dimensions": "8/6 (48cs)"
      }
    ]
  },
  {
    "id": "cda08",
    "sku": "CDA08",
    "categoryId": "soup-containers",
    "subcategory": "Poly-Coated White Paperboard",
    "name": "8 OZ White Paper Soup Container, 500pc (50/10)",
    "slug": "cda08",
    "description": "Commercial food service packaging SKU CDA08: 8 OZ White Paper Soup Container, 500pc (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/6 (48cs).",
    "palletTiHi": "8/6 (48cs)",
    "price": 24.99,
    "specialPrice": null,
    "mrpPrice": 33.74,
    "bestSeller": false,
    "imageUrl": "/images/white-paper-soup-container.jpg",
    "material": "Poly-Coated White Paperboard",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 97,
    "sizes": [
      {
        "name": "Case (500 pcs)",
        "sku": "CDA08",
        "caseCount": 500,
        "price": 24.99,
        "dimensions": "8/6 (48cs)"
      }
    ]
  },
  {
    "id": "cda12",
    "sku": "CDA12",
    "categoryId": "soup-containers",
    "subcategory": "Poly-Coated White Paperboard",
    "name": "12 OZ White Paper Soup Container, 500pc (50/10)",
    "slug": "cda12",
    "description": "Commercial food service packaging SKU CDA12: 12 OZ White Paper Soup Container, 500pc (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 27.3,
    "specialPrice": null,
    "mrpPrice": 36.86,
    "bestSeller": false,
    "imageUrl": "/images/white-paper-soup-container.jpg",
    "material": "Poly-Coated White Paperboard",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 97,
    "sizes": [
      {
        "name": "Case (500 pcs)",
        "sku": "CDA12",
        "caseCount": 500,
        "price": 27.3,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "cda16",
    "sku": "CDA16",
    "categoryId": "soup-containers",
    "subcategory": "Poly-Coated White Paperboard",
    "name": "16 OZ White Paper Soup Container, 500pc (50/10)",
    "slug": "cda16",
    "description": "Commercial food service packaging SKU CDA16: 16 OZ White Paper Soup Container, 500pc (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 29.9,
    "specialPrice": null,
    "mrpPrice": 40.37,
    "bestSeller": false,
    "imageUrl": "/images/white-paper-soup-container.jpg",
    "material": "Poly-Coated White Paperboard",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 97,
    "sizes": [
      {
        "name": "Case (500 pcs)",
        "sku": "CDA16",
        "caseCount": 500,
        "price": 29.9,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "cda32",
    "sku": "CDA32",
    "categoryId": "soup-containers",
    "subcategory": "Poly-Coated White Paperboard",
    "name": "32 OZ White Paper Soup Container, 500pc (50/10)",
    "slug": "cda32",
    "description": "Commercial food service packaging SKU CDA32: 32 OZ White Paper Soup Container, 500pc (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/5 (30cs).",
    "palletTiHi": "6/5 (30cs)",
    "price": 48.1,
    "specialPrice": null,
    "mrpPrice": 64.94,
    "bestSeller": false,
    "imageUrl": "/images/white-paper-soup-container.jpg",
    "material": "Poly-Coated White Paperboard",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 97,
    "sizes": [
      {
        "name": "Case (500 pcs)",
        "sku": "CDA32",
        "caseCount": 500,
        "price": 48.1,
        "dimensions": "6/5 (30cs)"
      }
    ]
  },
  {
    "id": "cda98",
    "sku": "CDA98",
    "categoryId": "soup-containers",
    "subcategory": "Vented Paperboard Lid",
    "name": "98mm Paper Vented Lid (Fit 8oz-16oz), 500pc (50/10)",
    "slug": "cda98",
    "description": "Commercial food service packaging SKU CDA98: 98mm Paper Vented Lid (Fit 8oz-16oz), 500pc (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/8 (64cs).",
    "palletTiHi": "8/8 (64cs)",
    "price": 27.3,
    "specialPrice": null,
    "mrpPrice": 36.86,
    "bestSeller": false,
    "imageUrl": "/images/paper-vented-soup-lid.jpg",
    "material": "Vented Paperboard Lid",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 97,
    "sizes": [
      {
        "name": "Case (500 pcs)",
        "sku": "CDA98",
        "caseCount": 500,
        "price": 27.3,
        "dimensions": "8/8 (64cs)"
      }
    ]
  },
  {
    "id": "cda115",
    "sku": "CDA115",
    "categoryId": "soup-containers",
    "subcategory": "Vented Paperboard Lid",
    "name": "115mm Paper Vented Lid (Fit 32oz), 500pc (50/10)",
    "slug": "cda115",
    "description": "Commercial food service packaging SKU CDA115: 115mm Paper Vented Lid (Fit 32oz), 500pc (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/7 (56cs).",
    "palletTiHi": "8/7 (56cs)",
    "price": 33.8,
    "specialPrice": null,
    "mrpPrice": 45.63,
    "bestSeller": false,
    "imageUrl": "/images/paper-vented-soup-lid.jpg",
    "material": "Vented Paperboard Lid",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 110,
    "sizes": [
      {
        "name": "Case (500 pcs)",
        "sku": "CDA115",
        "caseCount": 500,
        "price": 33.8,
        "dimensions": "8/7 (56cs)"
      }
    ]
  },
  {
    "id": "cda98pp",
    "sku": "CDA98PP",
    "categoryId": "soup-containers",
    "subcategory": "Clear Polypropylene (PP)",
    "name": "98mm PP Flat Lid (Fit 8oz-16oz), 500pc (50/10)",
    "slug": "cda98pp",
    "description": "Commercial food service packaging SKU CDA98PP: 98mm PP Flat Lid (Fit 8oz-16oz), 500pc (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/8 (64cs).",
    "palletTiHi": "8/8 (64cs)",
    "price": 20.8,
    "specialPrice": null,
    "mrpPrice": 28.08,
    "bestSeller": false,
    "imageUrl": "/images/flat-lid.jpg",
    "material": "Clear Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 43,
    "sizes": [
      {
        "name": "Case (500 pcs)",
        "sku": "CDA98PP",
        "caseCount": 500,
        "price": 20.8,
        "dimensions": "8/8 (64cs)"
      }
    ]
  },
  {
    "id": "pp2-5g-wht-fork",
    "sku": "PP2.5G-WHT-FORK",
    "categoryId": "cutlery",
    "subcategory": "Polypropylene (PP)",
    "name": "PP2.5g White Fork, 1000 Bulk (100x10)",
    "slug": "pp2-5g-wht-fork",
    "description": "Commercial food service packaging SKU PP2.5G-WHT-FORK: PP2.5g White Fork, 1000 Bulk (100x10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/8 (80cs).",
    "palletTiHi": "10/8 (80cs)",
    "price": 8.12,
    "specialPrice": null,
    "mrpPrice": 10.96,
    "bestSeller": false,
    "imageUrl": "/images/cat_cutlery.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 67,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "PP2.5G-WHT-FORK",
        "caseCount": 1000,
        "price": 8.12,
        "dimensions": "10/8 (80cs)"
      }
    ]
  },
  {
    "id": "pp2-5g-wht-tspoon",
    "sku": "PP2.5G-WHT-TSPOON",
    "categoryId": "cutlery",
    "subcategory": "Polypropylene (PP)",
    "name": "PP2.5g White Tea Spoon, 1000 Bulk (100x10)",
    "slug": "pp2-5g-wht-tspoon",
    "description": "Commercial food service packaging SKU PP2.5G-WHT-TSPOON: PP2.5g White Tea Spoon, 1000 Bulk (100x10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/8 (80cs).",
    "palletTiHi": "10/8 (80cs)",
    "price": 8.12,
    "specialPrice": null,
    "mrpPrice": 10.96,
    "bestSeller": false,
    "imageUrl": "/images/cat_cutlery.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 93,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "PP2.5G-WHT-TSPOON",
        "caseCount": 1000,
        "price": 8.12,
        "dimensions": "10/8 (80cs)"
      }
    ]
  },
  {
    "id": "pp2-5g-wht-spoon",
    "sku": "PP2.5G-WHT-SPOON",
    "categoryId": "cutlery",
    "subcategory": "Polypropylene (PP)",
    "name": "PP2.5g White Soup Spoon, 1000 Bulk (100x10)",
    "slug": "pp2-5g-wht-spoon",
    "description": "Commercial food service packaging SKU PP2.5G-WHT-SPOON: PP2.5g White Soup Spoon, 1000 Bulk (100x10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/8 (80cs).",
    "palletTiHi": "10/8 (80cs)",
    "price": 8.12,
    "specialPrice": null,
    "mrpPrice": 10.96,
    "bestSeller": false,
    "imageUrl": "/images/cat_cutlery.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 80,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "PP2.5G-WHT-SPOON",
        "caseCount": 1000,
        "price": 8.12,
        "dimensions": "10/8 (80cs)"
      }
    ]
  },
  {
    "id": "pp5-4g-wrp-blk",
    "sku": "PP5.4G-WRP-BLK",
    "categoryId": "cutlery",
    "subcategory": "Heavy Weight PP Plastic",
    "name": "PP5.4g Individually Wrapped Black Plastic Fork (Heavy Weight), 500 Pcs",
    "slug": "pp5-4g-wrp-blk",
    "description": "Commercial food service packaging SKU PP5.4G-WRP-BLK: PP5.4g Individually Wrapped Black Plastic Fork (Heavy Weight), 500 Pcs. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/6 (60cs).",
    "palletTiHi": "10/6 (60cs)",
    "price": 19,
    "specialPrice": null,
    "mrpPrice": 25.65,
    "bestSeller": false,
    "imageUrl": "/images/cat_cutlery.jpg",
    "material": "Heavy Weight PP Plastic",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 54,
    "sizes": [
      {
        "name": "Case (500 pcs)",
        "sku": "PP5.4G-WRP-BLK",
        "caseCount": 500,
        "price": 19,
        "dimensions": "10/6 (60cs)"
      }
    ]
  },
  {
    "id": "pp5-4g-wrp-blk-1000",
    "sku": "PP5.4G-WRP-BLK-1000",
    "categoryId": "cutlery",
    "subcategory": "Heavy Weight PP Plastic",
    "name": "PP5.4g Individually Wrapped Black Plastic Fork (Heavy Weight), 1000 Pcs",
    "slug": "pp5-4g-wrp-blk-1000",
    "description": "Commercial food service packaging SKU PP5.4G-WRP-BLK-1000: PP5.4g Individually Wrapped Black Plastic Fork (Heavy Weight), 1000 Pcs. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/6 (48cs).",
    "palletTiHi": "8/6 (48cs)",
    "price": 20.15,
    "specialPrice": null,
    "mrpPrice": 27.2,
    "bestSeller": false,
    "imageUrl": "/images/cat_cutlery.jpg",
    "material": "Heavy Weight PP Plastic",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 39,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "PP5.4G-WRP-BLK-1000",
        "caseCount": 1000,
        "price": 20.15,
        "dimensions": "8/6 (48cs)"
      }
    ]
  },
  {
    "id": "pp5-4g-wrp-wht-1000",
    "sku": "PP5.4G-WRP-WHT-1000",
    "categoryId": "cutlery",
    "subcategory": "Heavy Weight PP Plastic",
    "name": "PP5.4g Individually Wrapped White Plastic Fork (Heavy Weight), 1000 Pcs",
    "slug": "pp5-4g-wrp-wht-1000",
    "description": "Commercial food service packaging SKU PP5.4G-WRP-WHT-1000: PP5.4g Individually Wrapped White Plastic Fork (Heavy Weight), 1000 Pcs. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/6 (48cs).",
    "palletTiHi": "8/6 (48cs)",
    "price": 20.15,
    "specialPrice": null,
    "mrpPrice": 27.2,
    "bestSeller": false,
    "imageUrl": "/images/cat_cutlery.jpg",
    "material": "Heavy Weight PP Plastic",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 39,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "PP5.4G-WRP-WHT-1000",
        "caseCount": 1000,
        "price": 20.15,
        "dimensions": "8/6 (48cs)"
      }
    ]
  },
  {
    "id": "rc08cup",
    "sku": "RC08CUP",
    "categoryId": "pet-cups",
    "subcategory": "Rigid Plastic",
    "name": "RC08 Cup Only, 12.2g, 500 Cups",
    "slug": "rc08cup",
    "description": "Commercial food service packaging SKU RC08CUP: RC08 Cup Only, 12.2g, 500 Cups. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/6 (48cs).",
    "palletTiHi": "8/6 (48cs)",
    "price": 22.1,
    "specialPrice": null,
    "mrpPrice": 29.84,
    "bestSeller": false,
    "imageUrl": "/images/clear-pet-cup.jpg",
    "material": "Rigid Plastic",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 43,
    "sizes": [
      {
        "name": "Case (500 pcs)",
        "sku": "RC08CUP",
        "caseCount": 500,
        "price": 22.1,
        "dimensions": "8/6 (48cs)"
      }
    ]
  },
  {
    "id": "rc16cup",
    "sku": "RC16CUP",
    "categoryId": "pet-cups",
    "subcategory": "Rigid Plastic",
    "name": "RC16 Cup Only, 16g, 500 Cups",
    "slug": "rc16cup",
    "description": "Commercial food service packaging SKU RC16CUP: RC16 Cup Only, 16g, 500 Cups. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/6 (48cs).",
    "palletTiHi": "8/6 (48cs)",
    "price": 23.4,
    "specialPrice": null,
    "mrpPrice": 31.59,
    "bestSeller": false,
    "imageUrl": "/images/clear-pet-cup.jpg",
    "material": "Rigid Plastic",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 43,
    "sizes": [
      {
        "name": "Case (500 pcs)",
        "sku": "RC16CUP",
        "caseCount": 500,
        "price": 23.4,
        "dimensions": "8/6 (48cs)"
      }
    ]
  },
  {
    "id": "rclids",
    "sku": "RCLIDS",
    "categoryId": "pet-cup-lids",
    "subcategory": "Clear Plastic",
    "name": "RC Lids Matching RC08 and RC16, 500 Lids",
    "slug": "rclids",
    "description": "Commercial food service packaging SKU RCLIDS: RC Lids Matching RC08 and RC16, 500 Lids. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/8 (80cs).",
    "palletTiHi": "10/8 (80cs)",
    "price": 13,
    "specialPrice": null,
    "mrpPrice": 17.55,
    "bestSeller": false,
    "imageUrl": "/images/flat-lid.jpg",
    "material": "Clear Plastic",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 110,
    "sizes": [
      {
        "name": "Case (500 pcs)",
        "sku": "RCLIDS",
        "caseCount": 500,
        "price": 13,
        "dimensions": "10/8 (80cs)"
      }
    ]
  },
  {
    "id": "pet7",
    "sku": "PET7",
    "categoryId": "pet-cups",
    "subcategory": "Crystal Clear PET · 78mm",
    "name": "78mm 7oz Clear PET Cup, 1000pc (50/20)",
    "slug": "pet7",
    "description": "Commercial food service packaging SKU PET7: 78mm 7oz Clear PET Cup, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 27.3,
    "specialPrice": null,
    "mrpPrice": 36.86,
    "bestSeller": false,
    "imageUrl": "/images/clear-pet-cup.jpg",
    "material": "Crystal Clear PET · 78mm",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 84,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "PET7",
        "caseCount": 1000,
        "price": 27.3,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "pet9",
    "sku": "PET9",
    "categoryId": "pet-cups",
    "subcategory": "Crystal Clear PET · 90mm",
    "name": "90mm 9oz Clear PET Cup, 1000pc (50/20)",
    "slug": "pet9",
    "description": "Commercial food service packaging SKU PET9: 90mm 9oz Clear PET Cup, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 35.1,
    "specialPrice": null,
    "mrpPrice": 47.39,
    "bestSeller": false,
    "imageUrl": "/images/clear-pet-cup.jpg",
    "material": "Crystal Clear PET · 90mm",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 84,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "PET9",
        "caseCount": 1000,
        "price": 35.1,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "pet-u12",
    "sku": "PET-U12",
    "categoryId": "pet-cups",
    "subcategory": "Crystal Clear PET · 90mm U-Shape",
    "name": "90mm 12oz U-Shape PET Cup, 1000pc (50/20)",
    "slug": "pet-u12",
    "description": "Commercial food service packaging SKU PET-U12: 90mm 12oz U-Shape PET Cup, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 35.1,
    "specialPrice": null,
    "mrpPrice": 47.39,
    "bestSeller": false,
    "imageUrl": "/images/u-shape-pet-cup.jpg",
    "material": "Crystal Clear PET · 90mm U-Shape",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 43,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "PET-U12",
        "caseCount": 1000,
        "price": 35.1,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "pet-u16",
    "sku": "PET-U16",
    "categoryId": "pet-cups",
    "subcategory": "Crystal Clear PET · 90mm U-Shape",
    "name": "90mm 16oz U-Shape PET Cup, 1000pc (50/20)",
    "slug": "pet-u16",
    "description": "Commercial food service packaging SKU PET-U16: 90mm 16oz U-Shape PET Cup, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 37.7,
    "specialPrice": null,
    "mrpPrice": 50.9,
    "bestSeller": false,
    "imageUrl": "/images/u-shape-pet-cup.jpg",
    "material": "Crystal Clear PET · 90mm U-Shape",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 43,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "PET-U16",
        "caseCount": 1000,
        "price": 37.7,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "pet-16col",
    "sku": "PET-16COL",
    "categoryId": "pet-cups",
    "subcategory": "Vibrant Colored PET · 98mm",
    "name": "98mm 16oz Assorted Color PET Cups (Yellow, Green, Blue, Pink, Orange, Red), 1000pc (50/20)",
    "slug": "pet-16col",
    "description": "Commercial food service packaging SKU PET-16COL: 98mm 16oz Assorted Color PET Cups (Yellow, Green, Blue, Pink, Orange, Red), 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/4 (24cs).",
    "palletTiHi": "6/4 (24cs)",
    "price": 62.4,
    "specialPrice": null,
    "mrpPrice": 84.24,
    "bestSeller": false,
    "imageUrl": "/images/color-pet-cup.jpg",
    "material": "Vibrant Colored PET · 98mm",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 69,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "PET-16COL",
        "caseCount": 1000,
        "price": 62.4,
        "dimensions": "6/4 (24cs)"
      }
    ]
  },
  {
    "id": "petnodome",
    "sku": "PETNODOME",
    "categoryId": "pet-cup-lids",
    "subcategory": "Crystal Clear PET · 78mm",
    "name": "78mm No Hole Dome Lid, 1000pc (50/20)",
    "slug": "petnodome",
    "description": "Commercial food service packaging SKU PETNODOME: 78mm No Hole Dome Lid, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 12/5 (60cs).",
    "palletTiHi": "12/5 (60cs)",
    "price": 24.99,
    "specialPrice": null,
    "mrpPrice": 33.74,
    "bestSeller": false,
    "imageUrl": "/images/dome-lid.jpg",
    "material": "Crystal Clear PET · 78mm",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 69,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "PETNODOME",
        "caseCount": 1000,
        "price": 24.99,
        "dimensions": "12/5 (60cs)"
      }
    ]
  },
  {
    "id": "pet-uflat",
    "sku": "PET-UFLAT",
    "categoryId": "pet-cup-lids",
    "subcategory": "Crystal Clear PET · 90mm",
    "name": "90mm Flat Lid, 1000pc (50/20)",
    "slug": "pet-uflat",
    "description": "Commercial food service packaging SKU PET-UFLAT: 90mm Flat Lid, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 12/5 (60cs).",
    "palletTiHi": "12/5 (60cs)",
    "price": 24.99,
    "specialPrice": null,
    "mrpPrice": 33.74,
    "bestSeller": false,
    "imageUrl": "/images/flat-lid.jpg",
    "material": "Crystal Clear PET · 90mm",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 69,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "PET-UFLAT",
        "caseCount": 1000,
        "price": 24.99,
        "dimensions": "12/5 (60cs)"
      }
    ]
  },
  {
    "id": "pet-uno",
    "sku": "PET-UNO",
    "categoryId": "pet-cup-lids",
    "subcategory": "Crystal Clear PET · 90mm",
    "name": "90mm Flat No Hole Lid, 1000pc (50/20)",
    "slug": "pet-uno",
    "description": "Commercial food service packaging SKU PET-UNO: 90mm Flat No Hole Lid, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 12/5 (60cs).",
    "palletTiHi": "12/5 (60cs)",
    "price": 24.99,
    "specialPrice": null,
    "mrpPrice": 33.74,
    "bestSeller": false,
    "imageUrl": "/images/flat-lid.jpg",
    "material": "Crystal Clear PET · 90mm",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 43,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "PET-UNO",
        "caseCount": 1000,
        "price": 24.99,
        "dimensions": "12/5 (60cs)"
      }
    ]
  },
  {
    "id": "petwdome",
    "sku": "PETWDOME",
    "categoryId": "pet-cup-lids",
    "subcategory": "Crystal Clear PET · 98mm",
    "name": "98mm Wide Hole Dome Lid, 1000pc (50/20)",
    "slug": "petwdome",
    "description": "Commercial food service packaging SKU PETWDOME: 98mm Wide Hole Dome Lid, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 11/4 (44cs).",
    "palletTiHi": "11/4 (44cs)",
    "price": 24.99,
    "specialPrice": null,
    "mrpPrice": 33.74,
    "bestSeller": false,
    "imageUrl": "/images/dome-lid.jpg",
    "material": "Crystal Clear PET · 98mm",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 56,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "PETWDOME",
        "caseCount": 1000,
        "price": 24.99,
        "dimensions": "11/4 (44cs)"
      }
    ]
  },
  {
    "id": "petsip",
    "sku": "PETSIP",
    "categoryId": "pet-cup-lids",
    "subcategory": "Crystal Clear PET · 98mm Sip",
    "name": "98mm Sip Lid, 1000pc (100/10)",
    "slug": "petsip",
    "description": "Commercial food service packaging SKU PETSIP: 98mm Sip Lid, 1000pc (100/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/6 (60cs).",
    "palletTiHi": "10/6 (60cs)",
    "price": 39.99,
    "specialPrice": null,
    "mrpPrice": 53.99,
    "bestSeller": false,
    "imageUrl": "/images/flat-lid.jpg",
    "material": "Crystal Clear PET · 98mm Sip",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 110,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "PETSIP",
        "caseCount": 1000,
        "price": 39.99,
        "dimensions": "10/6 (60cs)"
      }
    ]
  },
  {
    "id": "strawc",
    "sku": "STRAWC",
    "categoryId": "straws",
    "subcategory": "Food Grade Polypropylene",
    "name": "7.75x6mm Clear Straw, 12000pc (500x24)",
    "slug": "strawc",
    "description": "Commercial food service packaging SKU STRAWC: 7.75x6mm Clear Straw, 12000pc (500x24). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 39,
    "specialPrice": null,
    "mrpPrice": 52.65,
    "bestSeller": false,
    "imageUrl": "/images/clear-straw.jpg",
    "material": "Food Grade Polypropylene",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 110,
    "sizes": [
      {
        "name": "Case (12000 pcs)",
        "sku": "STRAWC",
        "caseCount": 12000,
        "price": 39,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "strawb3-clr",
    "sku": "STRAWB3-CLR",
    "categoryId": "straws",
    "subcategory": "Food Grade Polypropylene",
    "name": "9x12mm Color Giant Straw, 1600pc (200x8)",
    "slug": "strawb3-clr",
    "description": "Commercial food service packaging SKU STRAWB3-CLR: 9x12mm Color Giant Straw, 1600pc (200x8). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/6 (48cs).",
    "palletTiHi": "8/6 (48cs)",
    "price": 27.3,
    "specialPrice": null,
    "mrpPrice": 36.86,
    "bestSeller": false,
    "imageUrl": "/images/color-straw.jpg",
    "material": "Food Grade Polypropylene",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 95,
    "sizes": [
      {
        "name": "Case (1600 pcs)",
        "sku": "STRAWB3-CLR",
        "caseCount": 1600,
        "price": 27.3,
        "dimensions": "8/6 (48cs)"
      }
    ]
  },
  {
    "id": "paper04",
    "sku": "PAPER04",
    "categoryId": "paper-cups",
    "subcategory": "Insulated Paperboard",
    "name": "4oz Single Wall Paper Cup, White, 1000pc (50/20)",
    "slug": "paper04",
    "description": "Commercial food service packaging SKU PAPER04: 4oz Single Wall Paper Cup, White, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/6 (60cs).",
    "palletTiHi": "10/6 (60cs)",
    "price": 27.3,
    "specialPrice": null,
    "mrpPrice": 36.86,
    "bestSeller": false,
    "imageUrl": "/images/white-paper-cup.jpg",
    "material": "Insulated Paperboard",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 43,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "PAPER04",
        "caseCount": 1000,
        "price": 27.3,
        "dimensions": "10/6 (60cs)"
      }
    ]
  },
  {
    "id": "paper06",
    "sku": "PAPER06",
    "categoryId": "paper-cups",
    "subcategory": "Insulated Paperboard",
    "name": "6oz Single Wall Paper Cup, White, 1000pc (50/20)",
    "slug": "paper06",
    "description": "Commercial food service packaging SKU PAPER06: 6oz Single Wall Paper Cup, White, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/5 (50cs).",
    "palletTiHi": "10/5 (50cs)",
    "price": 31.2,
    "specialPrice": null,
    "mrpPrice": 42.12,
    "bestSeller": false,
    "imageUrl": "/images/white-paper-cup.jpg",
    "material": "Insulated Paperboard",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 43,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "PAPER06",
        "caseCount": 1000,
        "price": 31.2,
        "dimensions": "10/5 (50cs)"
      }
    ]
  },
  {
    "id": "pasw12-coffee",
    "sku": "PASW12-COFFEE",
    "categoryId": "paper-cups",
    "subcategory": "Premium Printed Paperboard",
    "name": "Coffee Print Paper Cup 12oz, 1000pc (50/20)",
    "slug": "pasw12-coffee",
    "description": "Commercial food service packaging SKU PASW12-COFFEE: Coffee Print Paper Cup 12oz, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/4 (24cs).",
    "palletTiHi": "6/4 (24cs)",
    "price": 45.5,
    "specialPrice": null,
    "mrpPrice": 61.43,
    "bestSeller": false,
    "imageUrl": "/images/coffee-print-paper-cup.jpg",
    "material": "Premium Printed Paperboard",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 41,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "PASW12-COFFEE",
        "caseCount": 1000,
        "price": 45.5,
        "dimensions": "6/4 (24cs)"
      }
    ]
  },
  {
    "id": "pasw16-coffee",
    "sku": "PASW16-COFFEE",
    "categoryId": "paper-cups",
    "subcategory": "Premium Printed Paperboard",
    "name": "Coffee Print Paper Cup 16oz, 1000pc (50/20)",
    "slug": "pasw16-coffee",
    "description": "Commercial food service packaging SKU PASW16-COFFEE: Coffee Print Paper Cup 16oz, 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/4 (24cs).",
    "palletTiHi": "6/4 (24cs)",
    "price": 49.4,
    "specialPrice": null,
    "mrpPrice": 66.69,
    "bestSeller": false,
    "imageUrl": "/images/coffee-print-paper-cup.jpg",
    "material": "Premium Printed Paperboard",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 41,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "PASW16-COFFEE",
        "caseCount": 1000,
        "price": 49.4,
        "dimensions": "6/4 (24cs)"
      }
    ]
  },
  {
    "id": "pasw20-coffee",
    "sku": "PASW20-COFFEE",
    "categoryId": "paper-cups",
    "subcategory": "Premium Printed Paperboard",
    "name": "Coffee Print Paper Cup 20oz, 500pc (50/10)",
    "slug": "pasw20-coffee",
    "description": "Commercial food service packaging SKU PASW20-COFFEE: Coffee Print Paper Cup 20oz, 500pc (50/10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/4 (24cs).",
    "palletTiHi": "6/4 (24cs)",
    "price": 36.4,
    "specialPrice": null,
    "mrpPrice": 49.14,
    "bestSeller": false,
    "imageUrl": "/images/coffee-print-paper-cup.jpg",
    "material": "Premium Printed Paperboard",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 41,
    "sizes": [
      {
        "name": "Case (500 pcs)",
        "sku": "PASW20-COFFEE",
        "caseCount": 500,
        "price": 36.4,
        "dimensions": "6/4 (24cs)"
      }
    ]
  },
  {
    "id": "papercuplid80",
    "sku": "PAPERCUPLID80",
    "categoryId": "paper-cup-lids-sleeves",
    "subcategory": "Polypropylene (PP)",
    "name": "80mm Black Paper Cup Lid (Fit 8oz), 1000pc (50/20)",
    "slug": "papercuplid80",
    "description": "Commercial food service packaging SKU PAPERCUPLID80: 80mm Black Paper Cup Lid (Fit 8oz), 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 12/5 (60cs).",
    "palletTiHi": "12/5 (60cs)",
    "price": 24.7,
    "specialPrice": null,
    "mrpPrice": 33.34,
    "bestSeller": false,
    "imageUrl": "/images/black-paper-cup-lid.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 41,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "PAPERCUPLID80",
        "caseCount": 1000,
        "price": 24.7,
        "dimensions": "12/5 (60cs)"
      }
    ]
  },
  {
    "id": "papercuplid90",
    "sku": "PAPERCUPLID90",
    "categoryId": "paper-cup-lids-sleeves",
    "subcategory": "Polypropylene (PP)",
    "name": "90mm Black Paper Cup Lid (Fit 10-20oz), 1000pc (50/20)",
    "slug": "papercuplid90",
    "description": "Commercial food service packaging SKU PAPERCUPLID90: 90mm Black Paper Cup Lid (Fit 10-20oz), 1000pc (50/20). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 12/4 (48cs).",
    "palletTiHi": "12/4 (48cs)",
    "price": 27.3,
    "specialPrice": null,
    "mrpPrice": 36.86,
    "bestSeller": false,
    "imageUrl": "/images/black-paper-cup-lid.jpg",
    "material": "Polypropylene (PP)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": true,
    "ratingAvg": 4.8,
    "reviewCount": 41,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "PAPERCUPLID90",
        "caseCount": 1000,
        "price": 27.3,
        "dimensions": "12/4 (48cs)"
      }
    ]
  },
  {
    "id": "napkin-3ply",
    "sku": "NAPKIN-3PLY",
    "categoryId": "napkins",
    "subcategory": "100% Virgin Fiber Paper",
    "name": "Bright White 3-Ply Dinner Napkins, 15\" x 17\", Premium Case",
    "slug": "napkin-3ply",
    "description": "Commercial food service packaging SKU NAPKIN-3PLY: Bright White 3-Ply Dinner Napkins, 15\" x 17\", Premium Case. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/4 (32cs).",
    "palletTiHi": "8/4 (32cs)",
    "price": 54,
    "specialPrice": null,
    "mrpPrice": 72.9,
    "bestSeller": false,
    "imageUrl": "/images/cat_napkins.jpg",
    "material": "100% Virgin Fiber Paper",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 95,
    "sizes": [
      {
        "name": "Case (2000 pcs)",
        "sku": "NAPKIN-3PLY",
        "caseCount": 2000,
        "price": 54,
        "dimensions": "8/4 (32cs)"
      }
    ]
  },
  {
    "id": "cp-dn3000",
    "sku": "CP-DN3000",
    "categoryId": "napkins",
    "subcategory": "Soft Absorbent Paper",
    "name": "Dinner Napkin 2-Ply 16.35\" x 13.86\", 3000pc",
    "slug": "cp-dn3000",
    "description": "Commercial food service packaging SKU CP-DN3000: Dinner Napkin 2-Ply 16.35\" x 13.86\", 3000pc. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/4 (32cs).",
    "palletTiHi": "8/4 (32cs)",
    "price": 40.76,
    "specialPrice": null,
    "mrpPrice": 55.03,
    "bestSeller": false,
    "imageUrl": "/images/cat_napkins.jpg",
    "material": "Soft Absorbent Paper",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 69,
    "sizes": [
      {
        "name": "Case (3000 pcs)",
        "sku": "CP-DN3000",
        "caseCount": 3000,
        "price": 40.76,
        "dimensions": "8/4 (32cs)"
      }
    ]
  },
  {
    "id": "dn-3000-1517",
    "sku": "DN-3000-1517",
    "categoryId": "napkins",
    "subcategory": "Soft Absorbent Paper",
    "name": "Dinner Napkin 2-Ply 15\" x 17\", 3000pc",
    "slug": "dn-3000-1517",
    "description": "Commercial food service packaging SKU DN-3000-1517: Dinner Napkin 2-Ply 15\" x 17\", 3000pc. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/4 (32cs).",
    "palletTiHi": "8/4 (32cs)",
    "price": 46.17,
    "specialPrice": null,
    "mrpPrice": 62.33,
    "bestSeller": false,
    "imageUrl": "/images/cat_napkins.jpg",
    "material": "Soft Absorbent Paper",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 108,
    "sizes": [
      {
        "name": "Case (3000 pcs)",
        "sku": "DN-3000-1517",
        "caseCount": 3000,
        "price": 46.17,
        "dimensions": "8/4 (32cs)"
      }
    ]
  },
  {
    "id": "napkin-interfold",
    "sku": "NAPKIN-INTERFOLD",
    "categoryId": "napkins",
    "subcategory": "Dispenser Paper Napkin",
    "name": "Dispenser Interfold Napkins 1/2 2-Ply 6.3\" x 8.3\"",
    "slug": "napkin-interfold",
    "description": "Commercial food service packaging SKU NAPKIN-INTERFOLD: Dispenser Interfold Napkins 1/2 2-Ply 6.3\" x 8.3\". Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 30.99,
    "specialPrice": null,
    "mrpPrice": 41.84,
    "bestSeller": false,
    "imageUrl": "/images/cat_napkins.jpg",
    "material": "Dispenser Paper Napkin",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 80,
    "sizes": [
      {
        "name": "Case (6000 pcs)",
        "sku": "NAPKIN-INTERFOLD",
        "caseCount": 6000,
        "price": 30.99,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "napkin-bev",
    "sku": "NAPKIN-BEV",
    "categoryId": "napkins",
    "subcategory": "Embossed Paper",
    "name": "White Beverage Napkin 1-Ply 9.05\" x 9.05\"",
    "slug": "napkin-bev",
    "description": "Commercial food service packaging SKU NAPKIN-BEV: White Beverage Napkin 1-Ply 9.05\" x 9.05\". Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/6 (48cs).",
    "palletTiHi": "8/6 (48cs)",
    "price": 20,
    "specialPrice": null,
    "mrpPrice": 27,
    "bestSeller": false,
    "imageUrl": "/images/cat_napkins.jpg",
    "material": "Embossed Paper",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 82,
    "sizes": [
      {
        "name": "Case (4000 pcs)",
        "sku": "NAPKIN-BEV",
        "caseCount": 4000,
        "price": 20,
        "dimensions": "8/6 (48cs)"
      }
    ]
  },
  {
    "id": "tfn-10000",
    "sku": "TFN-10000",
    "categoryId": "napkins",
    "subcategory": "Dispenser Paper Napkin",
    "name": "TFN-10000 Tall Fold Napkin 1-Ply 13.11\" x 6.38\", 10,000pc",
    "slug": "tfn-10000",
    "description": "Commercial food service packaging SKU TFN-10000: TFN-10000 Tall Fold Napkin 1-Ply 13.11\" x 6.38\", 10,000pc. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/5 (30cs).",
    "palletTiHi": "6/5 (30cs)",
    "price": 29.7,
    "specialPrice": null,
    "mrpPrice": 40.09,
    "bestSeller": false,
    "imageUrl": "/images/cat_napkins.jpg",
    "material": "Dispenser Paper Napkin",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 69,
    "sizes": [
      {
        "name": "Case (10000 pcs)",
        "sku": "TFN-10000",
        "caseCount": 10000,
        "price": 29.7,
        "dimensions": "6/5 (30cs)"
      }
    ]
  },
  {
    "id": "bag-14",
    "sku": "BAG#14",
    "categoryId": "bags",
    "subcategory": "Heavy Natural Kraft Paper",
    "name": "#14 Kraft Paper Bag with Handles - 14x10x15.5, 250pcs",
    "slug": "bag-14",
    "description": "Commercial food service packaging SKU BAG#14: #14 Kraft Paper Bag with Handles - 14x10x15.5, 250pcs. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/4 (32cs).",
    "palletTiHi": "8/4 (32cs)",
    "price": 39.99,
    "specialPrice": null,
    "mrpPrice": 53.99,
    "bestSeller": false,
    "imageUrl": "/images/cat_kraft_bags.jpg",
    "material": "Heavy Natural Kraft Paper",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 110,
    "sizes": [
      {
        "name": "Case (250 pcs)",
        "sku": "BAG#14",
        "caseCount": 250,
        "price": 39.99,
        "dimensions": "8/4 (32cs)"
      }
    ]
  },
  {
    "id": "bag-brn-2",
    "sku": "BAG-BRN-2",
    "categoryId": "bags",
    "subcategory": "Natural Brown Kraft Paper",
    "name": "#2 Brown Paper Grocery Bag - 4x8, 500pc",
    "slug": "bag-brn-2",
    "description": "Commercial food service packaging SKU BAG-BRN-2: #2 Brown Paper Grocery Bag - 4x8, 500pc. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 12/6 (72cs).",
    "palletTiHi": "12/6 (72cs)",
    "price": 13.99,
    "specialPrice": null,
    "mrpPrice": 18.89,
    "bestSeller": false,
    "imageUrl": "/images/cat_kraft_bags.jpg",
    "material": "Natural Brown Kraft Paper",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 69,
    "sizes": [
      {
        "name": "Case (500 pcs)",
        "sku": "BAG-BRN-2",
        "caseCount": 500,
        "price": 13.99,
        "dimensions": "12/6 (72cs)"
      }
    ]
  },
  {
    "id": "bag-brn-4",
    "sku": "BAG-BRN-4",
    "categoryId": "bags",
    "subcategory": "Natural Brown Kraft Paper",
    "name": "#4 Brown Paper Grocery Bag - 5x9, 500pc",
    "slug": "bag-brn-4",
    "description": "Commercial food service packaging SKU BAG-BRN-4: #4 Brown Paper Grocery Bag - 5x9, 500pc. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 12/6 (72cs).",
    "palletTiHi": "12/6 (72cs)",
    "price": 14.99,
    "specialPrice": null,
    "mrpPrice": 20.24,
    "bestSeller": false,
    "imageUrl": "/images/cat_kraft_bags.jpg",
    "material": "Natural Brown Kraft Paper",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 69,
    "sizes": [
      {
        "name": "Case (500 pcs)",
        "sku": "BAG-BRN-4",
        "caseCount": 500,
        "price": 14.99,
        "dimensions": "12/6 (72cs)"
      }
    ]
  },
  {
    "id": "bag-brn-6",
    "sku": "BAG-BRN-6",
    "categoryId": "bags",
    "subcategory": "Natural Brown Kraft Paper",
    "name": "#6 Brown Paper Grocery Bag - 6x11, 500pc",
    "slug": "bag-brn-6",
    "description": "Commercial food service packaging SKU BAG-BRN-6: #6 Brown Paper Grocery Bag - 6x11, 500pc. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/5 (50cs).",
    "palletTiHi": "10/5 (50cs)",
    "price": 15.99,
    "specialPrice": null,
    "mrpPrice": 21.59,
    "bestSeller": false,
    "imageUrl": "/images/cat_kraft_bags.jpg",
    "material": "Natural Brown Kraft Paper",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 69,
    "sizes": [
      {
        "name": "Case (500 pcs)",
        "sku": "BAG-BRN-6",
        "caseCount": 500,
        "price": 15.99,
        "dimensions": "10/5 (50cs)"
      }
    ]
  },
  {
    "id": "bag-brn-12",
    "sku": "BAG-BRN-12",
    "categoryId": "bags",
    "subcategory": "Natural Brown Kraft Paper",
    "name": "#12 Brown Paper Grocery Bag - 7x14, 500pc",
    "slug": "bag-brn-12",
    "description": "Commercial food service packaging SKU BAG-BRN-12: #12 Brown Paper Grocery Bag - 7x14, 500pc. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 25.99,
    "specialPrice": null,
    "mrpPrice": 35.09,
    "bestSeller": false,
    "imageUrl": "/images/cat_kraft_bags.jpg",
    "material": "Natural Brown Kraft Paper",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 82,
    "sizes": [
      {
        "name": "Case (500 pcs)",
        "sku": "BAG-BRN-12",
        "caseCount": 500,
        "price": 25.99,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "bag-brn-420",
    "sku": "BAG-BRN-420",
    "categoryId": "bags",
    "subcategory": "Natural Brown Kraft Paper",
    "name": "#420 Brown Paper Grocery Bag - 8x16, 500pc",
    "slug": "bag-brn-420",
    "description": "Commercial food service packaging SKU BAG-BRN-420: #420 Brown Paper Grocery Bag - 8x16, 500pc. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/4 (32cs).",
    "palletTiHi": "8/4 (32cs)",
    "price": 31.99,
    "specialPrice": null,
    "mrpPrice": 43.19,
    "bestSeller": false,
    "imageUrl": "/images/cat_kraft_bags.jpg",
    "material": "Natural Brown Kraft Paper",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 95,
    "sizes": [
      {
        "name": "Case (500 pcs)",
        "sku": "BAG-BRN-420",
        "caseCount": 500,
        "price": 31.99,
        "dimensions": "8/4 (32cs)"
      }
    ]
  },
  {
    "id": "bag-ty-10x5x19",
    "sku": "BAG-TY-10X5X19",
    "categoryId": "bags",
    "subcategory": "HDPE Plastic",
    "name": "10x5x19 White Plastic Thank You Bag, 740 PC",
    "slug": "bag-ty-10x5x19",
    "description": "Commercial food service packaging SKU BAG-TY-10X5X19: 10x5x19 White Plastic Thank You Bag, 740 PC. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/6 (60cs).",
    "palletTiHi": "10/6 (60cs)",
    "price": 16.99,
    "specialPrice": null,
    "mrpPrice": 22.94,
    "bestSeller": false,
    "imageUrl": "/images/cat_kraft_bags.jpg",
    "material": "HDPE Plastic",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 54,
    "sizes": [
      {
        "name": "Case (740 pcs)",
        "sku": "BAG-TY-10X5X19",
        "caseCount": 740,
        "price": 16.99,
        "dimensions": "10/6 (60cs)"
      }
    ]
  },
  {
    "id": "bag-ty-10-5x6x20",
    "sku": "BAG-TY-10.5X6X20",
    "categoryId": "bags",
    "subcategory": "HDPE Plastic",
    "name": "10.5x6x20 White Plastic Thank You Bag, 740 PC",
    "slug": "bag-ty-10-5x6x20",
    "description": "Commercial food service packaging SKU BAG-TY-10.5X6X20: 10.5x6x20 White Plastic Thank You Bag, 740 PC. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/6 (60cs).",
    "palletTiHi": "10/6 (60cs)",
    "price": 17.99,
    "specialPrice": null,
    "mrpPrice": 24.29,
    "bestSeller": false,
    "imageUrl": "/images/cat_kraft_bags.jpg",
    "material": "HDPE Plastic",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 80,
    "sizes": [
      {
        "name": "Case (740 pcs)",
        "sku": "BAG-TY-10.5X6X20",
        "caseCount": 740,
        "price": 17.99,
        "dimensions": "10/6 (60cs)"
      }
    ]
  },
  {
    "id": "bag-ty-12x7x22-1000",
    "sku": "BAG-TY-12X7X22-1000",
    "categoryId": "bags",
    "subcategory": "HDPE Plastic",
    "name": "12x7x22 White Plastic Thank You Bag, 1000 PC",
    "slug": "bag-ty-12x7x22-1000",
    "description": "Commercial food service packaging SKU BAG-TY-12X7X22-1000: 12x7x22 White Plastic Thank You Bag, 1000 PC. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 26.99,
    "specialPrice": null,
    "mrpPrice": 36.44,
    "bestSeller": false,
    "imageUrl": "/images/cat_kraft_bags.jpg",
    "material": "HDPE Plastic",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 39,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "BAG-TY-12X7X22-1000",
        "caseCount": 1000,
        "price": 26.99,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "bag-ty-12x7x22-400",
    "sku": "BAG-TY-12X7X22-400",
    "categoryId": "bags",
    "subcategory": "HDPE Plastic · 17 MIC",
    "name": "12x7x22 White Plastic Thank You Bag, 400 PC 17 MIC",
    "slug": "bag-ty-12x7x22-400",
    "description": "Commercial food service packaging SKU BAG-TY-12X7X22-400: 12x7x22 White Plastic Thank You Bag, 400 PC 17 MIC. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 12/6 (72cs).",
    "palletTiHi": "12/6 (72cs)",
    "price": 11.99,
    "specialPrice": null,
    "mrpPrice": 16.19,
    "bestSeller": false,
    "imageUrl": "/images/cat_kraft_bags.jpg",
    "material": "HDPE Plastic · 17 MIC",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 106,
    "sizes": [
      {
        "name": "Case (400 pcs)",
        "sku": "BAG-TY-12X7X22-400",
        "caseCount": 400,
        "price": 11.99,
        "dimensions": "12/6 (72cs)"
      }
    ]
  },
  {
    "id": "bag-ty-12x7x22-300",
    "sku": "BAG-TY-12X7X22-300",
    "categoryId": "bags",
    "subcategory": "HDPE Plastic · 23 MIC",
    "name": "12x7x22 White Plastic Thank You Bag, 300 PC 23 MIC",
    "slug": "bag-ty-12x7x22-300",
    "description": "Commercial food service packaging SKU BAG-TY-12X7X22-300: 12x7x22 White Plastic Thank You Bag, 300 PC 23 MIC. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 12/6 (72cs).",
    "palletTiHi": "12/6 (72cs)",
    "price": 10.99,
    "specialPrice": null,
    "mrpPrice": 14.84,
    "bestSeller": false,
    "imageUrl": "/images/cat_kraft_bags.jpg",
    "material": "HDPE Plastic · 23 MIC",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 106,
    "sizes": [
      {
        "name": "Case (300 pcs)",
        "sku": "BAG-TY-12X7X22-300",
        "caseCount": 300,
        "price": 10.99,
        "dimensions": "12/6 (72cs)"
      }
    ]
  },
  {
    "id": "bag-ty-11-5x6-5x21-5",
    "sku": "BAG-TY-11.5X6.5X21.5",
    "categoryId": "bags",
    "subcategory": "HDPE Plastic · 13 MIC",
    "name": "11.5x6.5x21.5 White Plastic Thank You Bag, 1000 PC 13 MIC",
    "slug": "bag-ty-11-5x6-5x21-5",
    "description": "Commercial food service packaging SKU BAG-TY-11.5X6.5X21.5: 11.5x6.5x21.5 White Plastic Thank You Bag, 1000 PC 13 MIC. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 20.99,
    "specialPrice": null,
    "mrpPrice": 28.34,
    "bestSeller": false,
    "imageUrl": "/images/cat_kraft_bags.jpg",
    "material": "HDPE Plastic · 13 MIC",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 52,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "BAG-TY-11.5X6.5X21.5",
        "caseCount": 1000,
        "price": 20.99,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "bag-ty-6x4x15",
    "sku": "BAG-TY-6X4X15",
    "categoryId": "bags",
    "subcategory": "HDPE Plastic",
    "name": "6x4x15 White Plastic Thank You Bag, 1000 PC",
    "slug": "bag-ty-6x4x15",
    "description": "Commercial food service packaging SKU BAG-TY-6X4X15: 6x4x15 White Plastic Thank You Bag, 1000 PC. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 12/6 (72cs).",
    "palletTiHi": "12/6 (72cs)",
    "price": 9.99,
    "specialPrice": null,
    "mrpPrice": 13.49,
    "bestSeller": false,
    "imageUrl": "/images/cat_kraft_bags.jpg",
    "material": "HDPE Plastic",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 41,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "BAG-TY-6X4X15",
        "caseCount": 1000,
        "price": 9.99,
        "dimensions": "12/6 (72cs)"
      }
    ]
  },
  {
    "id": "bag-ty-6x4x15-warn",
    "sku": "BAG-TY-6X4X15-WARN",
    "categoryId": "bags",
    "subcategory": "HDPE Plastic",
    "name": "6x4x15 White Plastic Thank You Bag (Warning Print), 1000 PC",
    "slug": "bag-ty-6x4x15-warn",
    "description": "Commercial food service packaging SKU BAG-TY-6X4X15-WARN: 6x4x15 White Plastic Thank You Bag (Warning Print), 1000 PC. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 12/6 (72cs).",
    "palletTiHi": "12/6 (72cs)",
    "price": 8.99,
    "specialPrice": null,
    "mrpPrice": 12.14,
    "bestSeller": false,
    "imageUrl": "/images/cat_kraft_bags.jpg",
    "material": "HDPE Plastic",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 106,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "BAG-TY-6X4X15-WARN",
        "caseCount": 1000,
        "price": 8.99,
        "dimensions": "12/6 (72cs)"
      }
    ]
  },
  {
    "id": "bag-ld-18x24-12",
    "sku": "BAG-LD-18X24-12",
    "categoryId": "bags",
    "subcategory": "Low-Density Polyethylene (LDPE)",
    "name": "LD Clear Bag 18x24, 400 PC, 1.2 MIL",
    "slug": "bag-ld-18x24-12",
    "description": "Commercial food service packaging SKU BAG-LD-18X24-12: LD Clear Bag 18x24, 400 PC, 1.2 MIL. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 28.35,
    "specialPrice": null,
    "mrpPrice": 38.27,
    "bestSeller": false,
    "imageUrl": "/images/cat_kraft_bags.jpg",
    "material": "Low-Density Polyethylene (LDPE)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 67,
    "sizes": [
      {
        "name": "Case (400 pcs)",
        "sku": "BAG-LD-18X24-12",
        "caseCount": 400,
        "price": 28.35,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "bag-ld-18x24-14",
    "sku": "BAG-LD-18X24-14",
    "categoryId": "bags",
    "subcategory": "Low-Density Polyethylene (LDPE)",
    "name": "LD Clear Bag 18x24, 400 PC, 1.4 MIL",
    "slug": "bag-ld-18x24-14",
    "description": "Commercial food service packaging SKU BAG-LD-18X24-14: LD Clear Bag 18x24, 400 PC, 1.4 MIL. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 35.99,
    "specialPrice": null,
    "mrpPrice": 48.59,
    "bestSeller": false,
    "imageUrl": "/images/cat_kraft_bags.jpg",
    "material": "Low-Density Polyethylene (LDPE)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 67,
    "sizes": [
      {
        "name": "Case (400 pcs)",
        "sku": "BAG-LD-18X24-14",
        "caseCount": 400,
        "price": 35.99,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "bag-ld-19x29",
    "sku": "BAG-LD-19X29",
    "categoryId": "bags",
    "subcategory": "Low-Density Polyethylene (LDPE)",
    "name": "LD Clear Bag 19x29, Heavy Duty Clear LD",
    "slug": "bag-ld-19x29",
    "description": "Commercial food service packaging SKU BAG-LD-19X29: LD Clear Bag 19x29, Heavy Duty Clear LD. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/5 (30cs).",
    "palletTiHi": "6/5 (30cs)",
    "price": 45.99,
    "specialPrice": null,
    "mrpPrice": 62.09,
    "bestSeller": false,
    "imageUrl": "/images/cat_kraft_bags.jpg",
    "material": "Low-Density Polyethylene (LDPE)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 108,
    "sizes": [
      {
        "name": "Case (400 pcs)",
        "sku": "BAG-LD-19X29",
        "caseCount": 400,
        "price": 45.99,
        "dimensions": "6/5 (30cs)"
      }
    ]
  },
  {
    "id": "bag-roll-11x19",
    "sku": "BAG-ROLL-11X19",
    "categoryId": "bags",
    "subcategory": "LDPE Plastic",
    "name": "11x19 LDPE Continuous Roll Bag",
    "slug": "bag-roll-11x19",
    "description": "Commercial food service packaging SKU BAG-ROLL-11X19: 11x19 LDPE Continuous Roll Bag. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/6 (48cs).",
    "palletTiHi": "8/6 (48cs)",
    "price": 26,
    "specialPrice": null,
    "mrpPrice": 35.1,
    "bestSeller": false,
    "imageUrl": "/images/cat_kraft_bags.jpg",
    "material": "LDPE Plastic",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 54,
    "sizes": [
      {
        "name": "Case (1500 pcs)",
        "sku": "BAG-ROLL-11X19",
        "caseCount": 1500,
        "price": 26,
        "dimensions": "8/6 (48cs)"
      }
    ]
  },
  {
    "id": "bag-roll-11x14",
    "sku": "BAG-ROLL-11X14",
    "categoryId": "bags",
    "subcategory": "LDPE Plastic",
    "name": "11x14 LDPE Roll Bag, Produce & Foodservice",
    "slug": "bag-roll-11x14",
    "description": "Commercial food service packaging SKU BAG-ROLL-11X14: 11x14 LDPE Roll Bag, Produce & Foodservice. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/6 (48cs).",
    "palletTiHi": "8/6 (48cs)",
    "price": 19.99,
    "specialPrice": null,
    "mrpPrice": 26.99,
    "bestSeller": false,
    "imageUrl": "/images/cat_kraft_bags.jpg",
    "material": "LDPE Plastic",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 54,
    "sizes": [
      {
        "name": "Case (2000 pcs)",
        "sku": "BAG-ROLL-11X14",
        "caseCount": 2000,
        "price": 19.99,
        "dimensions": "8/6 (48cs)"
      }
    ]
  },
  {
    "id": "bag-poly-red",
    "sku": "BAG-POLY-RED",
    "categoryId": "bags",
    "subcategory": "Heavy Duty Red Polyethylene",
    "name": "Red Poly Bag for Meat Packaging, 4 Rolls/Case",
    "slug": "bag-poly-red",
    "description": "Commercial food service packaging SKU BAG-POLY-RED: Red Poly Bag for Meat Packaging, 4 Rolls/Case. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 24,
    "specialPrice": null,
    "mrpPrice": 32.4,
    "bestSeller": false,
    "imageUrl": "/images/cat_kraft_bags.jpg",
    "material": "Heavy Duty Red Polyethylene",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 108,
    "sizes": [
      {
        "name": "Case (4 pcs)",
        "sku": "BAG-POLY-RED",
        "caseCount": 4,
        "price": 24,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "alum-half-deep",
    "sku": "ALUM-HALF-DEEP",
    "categoryId": "aluminum-foil-and-pans",
    "subcategory": "Heavy-Gauge Recyclable Aluminum",
    "name": "Half Pan - Deep Depth Aluminum Foil Steam Table Pan, 100/Case",
    "slug": "alum-half-deep",
    "description": "Commercial food service packaging SKU ALUM-HALF-DEEP: Half Pan - Deep Depth Aluminum Foil Steam Table Pan, 100/Case. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/4 (32cs).",
    "palletTiHi": "8/4 (32cs)",
    "price": 52,
    "specialPrice": null,
    "mrpPrice": 70.2,
    "bestSeller": false,
    "imageUrl": "/images/cat_aluminum_trays.jpg",
    "material": "Heavy-Gauge Recyclable Aluminum",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 54,
    "sizes": [
      {
        "name": "Case (100 pcs)",
        "sku": "ALUM-HALF-DEEP",
        "caseCount": 100,
        "price": 52,
        "dimensions": "8/4 (32cs)"
      }
    ]
  },
  {
    "id": "alum-full-deep",
    "sku": "ALUM-FULL-DEEP",
    "categoryId": "aluminum-foil-and-pans",
    "subcategory": "Heavy-Gauge Recyclable Aluminum",
    "name": "Full Pan - Deep Depth Aluminum Foil Steam Table Pan, 50/Case",
    "slug": "alum-full-deep",
    "description": "Commercial food service packaging SKU ALUM-FULL-DEEP: Full Pan - Deep Depth Aluminum Foil Steam Table Pan, 50/Case. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/4 (32cs).",
    "palletTiHi": "8/4 (32cs)",
    "price": 58,
    "specialPrice": null,
    "mrpPrice": 78.3,
    "bestSeller": false,
    "imageUrl": "/images/cat_aluminum_trays.jpg",
    "material": "Heavy-Gauge Recyclable Aluminum",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 54,
    "sizes": [
      {
        "name": "Case (50 pcs)",
        "sku": "ALUM-FULL-DEEP",
        "caseCount": 50,
        "price": 58,
        "dimensions": "8/4 (32cs)"
      }
    ]
  },
  {
    "id": "alum-roll-18x500",
    "sku": "ALUM-ROLL-18X500",
    "categoryId": "aluminum-foil-and-pans",
    "subcategory": "Commercial Aluminum Foil",
    "name": "18\" x 500' Commercial Aluminum Foil Roll with Cutter Box",
    "slug": "alum-roll-18x500",
    "description": "Commercial food service packaging SKU ALUM-ROLL-18X500: 18\" x 500' Commercial Aluminum Foil Roll with Cutter Box. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 12/4 (48cs).",
    "palletTiHi": "12/4 (48cs)",
    "price": 39.99,
    "specialPrice": null,
    "mrpPrice": 53.99,
    "bestSeller": false,
    "imageUrl": "/images/cat_aluminum_trays.jpg",
    "material": "Commercial Aluminum Foil",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 80,
    "sizes": [
      {
        "name": "Case (1 pcs)",
        "sku": "ALUM-ROLL-18X500",
        "caseCount": 1,
        "price": 39.99,
        "dimensions": "12/4 (48cs)"
      }
    ]
  },
  {
    "id": "alum-roll-18x500-hd",
    "sku": "ALUM-ROLL-18X500-HD",
    "categoryId": "aluminum-foil-and-pans",
    "subcategory": "Heavy Duty 21 MIC Aluminum Foil",
    "name": "18\" x 500' Heavy Duty 21 MIC Aluminum Foil Roll with Cutter Box",
    "slug": "alum-roll-18x500-hd",
    "description": "Commercial food service packaging SKU ALUM-ROLL-18X500-HD: 18\" x 500' Heavy Duty 21 MIC Aluminum Foil Roll with Cutter Box. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 12/4 (48cs).",
    "palletTiHi": "12/4 (48cs)",
    "price": 36.45,
    "specialPrice": null,
    "mrpPrice": 49.21,
    "bestSeller": false,
    "imageUrl": "/images/cat_aluminum_trays.jpg",
    "material": "Heavy Duty 21 MIC Aluminum Foil",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 39,
    "sizes": [
      {
        "name": "Case (1 pcs)",
        "sku": "ALUM-ROLL-18X500-HD",
        "caseCount": 1,
        "price": 36.45,
        "dimensions": "12/4 (48cs)"
      }
    ]
  },
  {
    "id": "alum-sheet-9x10-75",
    "sku": "ALUM-SHEET-9X10.75",
    "categoryId": "aluminum-foil-and-pans",
    "subcategory": "Pop-Up Interfolded Aluminum Foil",
    "name": "9\" x 10.75\" Aluminum Foil Pop-Up Interfolded Sheets, 500 Sheets",
    "slug": "alum-sheet-9x10-75",
    "description": "Commercial food service packaging SKU ALUM-SHEET-9X10.75: 9\" x 10.75\" Aluminum Foil Pop-Up Interfolded Sheets, 500 Sheets. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/5 (50cs).",
    "palletTiHi": "10/5 (50cs)",
    "price": 63.99,
    "specialPrice": null,
    "mrpPrice": 86.39,
    "bestSeller": false,
    "imageUrl": "/images/cat_aluminum_trays.jpg",
    "material": "Pop-Up Interfolded Aluminum Foil",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 106,
    "sizes": [
      {
        "name": "Case (500 pcs)",
        "sku": "ALUM-SHEET-9X10.75",
        "caseCount": 500,
        "price": 63.99,
        "dimensions": "10/5 (50cs)"
      }
    ]
  },
  {
    "id": "alum-sheet-12x10-75",
    "sku": "ALUM-SHEET-12X10.75",
    "categoryId": "aluminum-foil-and-pans",
    "subcategory": "Pop-Up Interfolded Aluminum Foil",
    "name": "12\" x 10.75\" Aluminum Foil Pop-Up Interfolded Sheets, 500 Sheets",
    "slug": "alum-sheet-12x10-75",
    "description": "Commercial food service packaging SKU ALUM-SHEET-12X10.75: 12\" x 10.75\" Aluminum Foil Pop-Up Interfolded Sheets, 500 Sheets. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/5 (50cs).",
    "palletTiHi": "10/5 (50cs)",
    "price": 76.99,
    "specialPrice": null,
    "mrpPrice": 103.94,
    "bestSeller": false,
    "imageUrl": "/images/cat_aluminum_trays.jpg",
    "material": "Pop-Up Interfolded Aluminum Foil",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 39,
    "sizes": [
      {
        "name": "Case (500 pcs)",
        "sku": "ALUM-SHEET-12X10.75",
        "caseCount": 500,
        "price": 76.99,
        "dimensions": "10/5 (50cs)"
      }
    ]
  },
  {
    "id": "ef151000",
    "sku": "EF151000",
    "categoryId": "food-paper-and-wraps",
    "subcategory": "Poly-Coated Moisture-Barrier Paper",
    "name": "15\" White Poly-Coated Freezer Paper Roll, 1000 ft",
    "slug": "ef151000",
    "description": "Commercial food service packaging SKU EF151000: 15\" White Poly-Coated Freezer Paper Roll, 1000 ft. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 31.49,
    "specialPrice": null,
    "mrpPrice": 42.51,
    "bestSeller": false,
    "imageUrl": "/images/poster_catering_foil.jpeg",
    "material": "Poly-Coated Moisture-Barrier Paper",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 56,
    "sizes": [
      {
        "name": "Case (1 pcs)",
        "sku": "EF151000",
        "caseCount": 1,
        "price": 31.49,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "ef181000",
    "sku": "EF181000",
    "categoryId": "food-paper-and-wraps",
    "subcategory": "Poly-Coated Moisture-Barrier Paper",
    "name": "18\" White Poly-Coated Freezer Paper Roll, 1000 ft",
    "slug": "ef181000",
    "description": "Commercial food service packaging SKU EF181000: 18\" White Poly-Coated Freezer Paper Roll, 1000 ft. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 37.59,
    "specialPrice": null,
    "mrpPrice": 50.75,
    "bestSeller": false,
    "imageUrl": "/images/poster_catering_foil.jpeg",
    "material": "Poly-Coated Moisture-Barrier Paper",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 56,
    "sizes": [
      {
        "name": "Case (1 pcs)",
        "sku": "EF181000",
        "caseCount": 1,
        "price": 37.59,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "ef301000",
    "sku": "EF301000",
    "categoryId": "food-paper-and-wraps",
    "subcategory": "Poly-Coated Moisture-Barrier Paper",
    "name": "30\" White Poly-Coated Freezer Paper Roll, 1000 ft",
    "slug": "ef301000",
    "description": "Commercial food service packaging SKU EF301000: 30\" White Poly-Coated Freezer Paper Roll, 1000 ft. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/4 (24cs).",
    "palletTiHi": "6/4 (24cs)",
    "price": 62.66,
    "specialPrice": null,
    "mrpPrice": 84.59,
    "bestSeller": false,
    "imageUrl": "/images/poster_catering_foil.jpeg",
    "material": "Poly-Coated Moisture-Barrier Paper",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 56,
    "sizes": [
      {
        "name": "Case (1 pcs)",
        "sku": "EF301000",
        "caseCount": 1,
        "price": 62.66,
        "dimensions": "6/4 (24cs)"
      }
    ]
  },
  {
    "id": "deli-wrap-10",
    "sku": "DELI-WRAP-10",
    "categoryId": "food-paper-and-wraps",
    "subcategory": "Dry Wax Treated Paper",
    "name": "10\" x 10-3/4\" Wax Treated Interfolded Deli Wrap Paper Case",
    "slug": "deli-wrap-10",
    "description": "Commercial food service packaging SKU DELI-WRAP-10: 10\" x 10-3/4\" Wax Treated Interfolded Deli Wrap Paper Case. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 76.74,
    "specialPrice": null,
    "mrpPrice": 103.6,
    "bestSeller": false,
    "imageUrl": "/images/poster_catering_foil.jpeg",
    "material": "Dry Wax Treated Paper",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 108,
    "sizes": [
      {
        "name": "Case (3000 pcs)",
        "sku": "DELI-WRAP-10",
        "caseCount": 3000,
        "price": 76.74,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "paper-chk-blk",
    "sku": "PAPER-CHK-BLK",
    "categoryId": "food-paper-and-wraps",
    "subcategory": "Grease-Resistant Printed Kraft Paper",
    "name": "12\" x 12\" Black & White Checker Food Basket Liner Paper Case",
    "slug": "paper-chk-blk",
    "description": "Commercial food service packaging SKU PAPER-CHK-BLK: 12\" x 12\" Black & White Checker Food Basket Liner Paper Case. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 120.15,
    "specialPrice": null,
    "mrpPrice": 162.2,
    "bestSeller": false,
    "imageUrl": "/images/white-paper-cup.jpg",
    "material": "Grease-Resistant Printed Kraft Paper",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 41,
    "sizes": [
      {
        "name": "Case (5000 pcs)",
        "sku": "PAPER-CHK-BLK",
        "caseCount": 5000,
        "price": 120.15,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "paper-chk-red",
    "sku": "PAPER-CHK-RED",
    "categoryId": "food-paper-and-wraps",
    "subcategory": "Grease-Resistant Printed Kraft Paper",
    "name": "12\" x 12\" Red & White Checker Food Basket Liner Paper Case",
    "slug": "paper-chk-red",
    "description": "Commercial food service packaging SKU PAPER-CHK-RED: 12\" x 12\" Red & White Checker Food Basket Liner Paper Case. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 120.15,
    "specialPrice": null,
    "mrpPrice": 162.2,
    "bestSeller": false,
    "imageUrl": "/images/white-paper-cup.jpg",
    "material": "Grease-Resistant Printed Kraft Paper",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 41,
    "sizes": [
      {
        "name": "Case (5000 pcs)",
        "sku": "PAPER-CHK-RED",
        "caseCount": 5000,
        "price": 120.15,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "steak-blk-6x30",
    "sku": "STEAK-BLK-6X30",
    "categoryId": "food-paper-and-wraps",
    "subcategory": "Heavy Duty Meat Display Paper",
    "name": "6\" x 30\" Black Butcher Steak Paper Roll / Sheets",
    "slug": "steak-blk-6x30",
    "description": "Commercial food service packaging SKU STEAK-BLK-6X30: 6\" x 30\" Black Butcher Steak Paper Roll / Sheets. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 45,
    "specialPrice": null,
    "mrpPrice": 60.75,
    "bestSeller": false,
    "imageUrl": "/images/poster_catering_foil.jpeg",
    "material": "Heavy Duty Meat Display Paper",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 54,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "STEAK-BLK-6X30",
        "caseCount": 1000,
        "price": 45,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "steak-pnk-6x30",
    "sku": "STEAK-PNK-6X30",
    "categoryId": "food-paper-and-wraps",
    "subcategory": "Unwaxed Peach / Pink Butcher Paper",
    "name": "6\" x 30\" Pink Butcher Steak Paper Roll / Sheets",
    "slug": "steak-pnk-6x30",
    "description": "Commercial food service packaging SKU STEAK-PNK-6X30: 6\" x 30\" Pink Butcher Steak Paper Roll / Sheets. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 35.5,
    "specialPrice": null,
    "mrpPrice": 47.93,
    "bestSeller": false,
    "imageUrl": "/images/poster_catering_foil.jpeg",
    "material": "Unwaxed Peach / Pink Butcher Paper",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 54,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "STEAK-PNK-6X30",
        "caseCount": 1000,
        "price": 35.5,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "steak-blk-8x30",
    "sku": "STEAK-BLK-8X30",
    "categoryId": "food-paper-and-wraps",
    "subcategory": "Heavy Duty Meat Display Paper",
    "name": "8\" x 30\" Black Butcher Steak Paper",
    "slug": "steak-blk-8x30",
    "description": "Commercial food service packaging SKU STEAK-BLK-8X30: 8\" x 30\" Black Butcher Steak Paper. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 54.35,
    "specialPrice": null,
    "mrpPrice": 73.37,
    "bestSeller": false,
    "imageUrl": "/images/poster_catering_foil.jpeg",
    "material": "Heavy Duty Meat Display Paper",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 54,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "STEAK-BLK-8X30",
        "caseCount": 1000,
        "price": 54.35,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "steak-pnk-8x30",
    "sku": "STEAK-PNK-8X30",
    "categoryId": "food-paper-and-wraps",
    "subcategory": "Unwaxed Peach / Pink Butcher Paper",
    "name": "8\" x 30\" Pink Butcher Steak Paper",
    "slug": "steak-pnk-8x30",
    "description": "Commercial food service packaging SKU STEAK-PNK-8X30: 8\" x 30\" Pink Butcher Steak Paper. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 47.47,
    "specialPrice": null,
    "mrpPrice": 64.08,
    "bestSeller": false,
    "imageUrl": "/images/poster_catering_foil.jpeg",
    "material": "Unwaxed Peach / Pink Butcher Paper",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 54,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "STEAK-PNK-8X30",
        "caseCount": 1000,
        "price": 47.47,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "steak-pnk-10x30",
    "sku": "STEAK-PNK-10X30",
    "categoryId": "food-paper-and-wraps",
    "subcategory": "Unwaxed Peach / Pink Butcher Paper",
    "name": "10\" x 30\" Pink Butcher Steak Paper",
    "slug": "steak-pnk-10x30",
    "description": "Commercial food service packaging SKU STEAK-PNK-10X30: 10\" x 30\" Pink Butcher Steak Paper. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 59.45,
    "specialPrice": null,
    "mrpPrice": 80.26,
    "bestSeller": false,
    "imageUrl": "/images/poster_catering_foil.jpeg",
    "material": "Unwaxed Peach / Pink Butcher Paper",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 67,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "STEAK-PNK-10X30",
        "caseCount": 1000,
        "price": 59.45,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "steak-blk-10x30",
    "sku": "STEAK-BLK-10X30",
    "categoryId": "food-paper-and-wraps",
    "subcategory": "Heavy Duty Meat Display Paper",
    "name": "10\" x 30\" Black Butcher Steak Paper",
    "slug": "steak-blk-10x30",
    "description": "Commercial food service packaging SKU STEAK-BLK-10X30: 10\" x 30\" Black Butcher Steak Paper. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 69.99,
    "specialPrice": null,
    "mrpPrice": 94.49,
    "bestSeller": false,
    "imageUrl": "/images/poster_catering_foil.jpeg",
    "material": "Heavy Duty Meat Display Paper",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 67,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "STEAK-BLK-10X30",
        "caseCount": 1000,
        "price": 69.99,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "film-18x4000",
    "sku": "FILM-18X4000",
    "categoryId": "food-paper-and-wraps",
    "subcategory": "PVC Food Cling Film",
    "name": "18\" x 4000' Heavy Duty Commercial Foodservice Cling Film with Cutter",
    "slug": "film-18x4000",
    "description": "Commercial food service packaging SKU FILM-18X4000: 18\" x 4000' Heavy Duty Commercial Foodservice Cling Film with Cutter. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 12/4 (48cs).",
    "palletTiHi": "12/4 (48cs)",
    "price": 44.99,
    "specialPrice": null,
    "mrpPrice": 60.74,
    "bestSeller": false,
    "imageUrl": "/images/poster_catering_foil.jpeg",
    "material": "PVC Food Cling Film",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 108,
    "sizes": [
      {
        "name": "Case (1 pcs)",
        "sku": "FILM-18X4000",
        "caseCount": 1,
        "price": 44.99,
        "dimensions": "12/4 (48cs)"
      }
    ]
  },
  {
    "id": "chem-63101",
    "sku": "CHEM-63101",
    "categoryId": "janitorial-and-cleaning",
    "subcategory": "Commercial Degreaser Chemical",
    "name": "Oven & Grill Cleaner Non-Ammoniated, 4x1 Gallon Case (63101)",
    "slug": "chem-63101",
    "description": "Commercial food service packaging SKU CHEM-63101: Oven & Grill Cleaner Non-Ammoniated, 4x1 Gallon Case (63101). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/4 (40cs).",
    "palletTiHi": "10/4 (40cs)",
    "price": 26.99,
    "specialPrice": null,
    "mrpPrice": 36.44,
    "bestSeller": false,
    "imageUrl": "/images/showcase_plastic.jpg",
    "material": "Commercial Degreaser Chemical",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 82,
    "sizes": [
      {
        "name": "Case (4 pcs)",
        "sku": "CHEM-63101",
        "caseCount": 4,
        "price": 26.99,
        "dimensions": "10/4 (40cs)"
      }
    ]
  },
  {
    "id": "chem-60001",
    "sku": "CHEM-60001",
    "categoryId": "janitorial-and-cleaning",
    "subcategory": "Concentrated Dishwashing Liquid",
    "name": "Dishwash Green Commercial Manual Dish Detergent, 4x1 Gallon Case (60001)",
    "slug": "chem-60001",
    "description": "Commercial food service packaging SKU CHEM-60001: Dishwash Green Commercial Manual Dish Detergent, 4x1 Gallon Case (60001). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/4 (40cs).",
    "palletTiHi": "10/4 (40cs)",
    "price": 23.17,
    "specialPrice": null,
    "mrpPrice": 31.28,
    "bestSeller": false,
    "imageUrl": "/images/showcase_plastic.jpg",
    "material": "Concentrated Dishwashing Liquid",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 82,
    "sizes": [
      {
        "name": "Case (4 pcs)",
        "sku": "CHEM-60001",
        "caseCount": 4,
        "price": 23.17,
        "dimensions": "10/4 (40cs)"
      }
    ]
  },
  {
    "id": "chem-60005",
    "sku": "CHEM-60005",
    "categoryId": "janitorial-and-cleaning",
    "subcategory": "Concentrated Dishwashing Liquid",
    "name": "Dishwash Green Commercial Manual Dish Detergent, 5 Gallon Pail (60005)",
    "slug": "chem-60005",
    "description": "Commercial food service packaging SKU CHEM-60005: Dishwash Green Commercial Manual Dish Detergent, 5 Gallon Pail (60005). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 12/3 (36cs).",
    "palletTiHi": "12/3 (36cs)",
    "price": 31.99,
    "specialPrice": null,
    "mrpPrice": 43.19,
    "bestSeller": false,
    "imageUrl": "/images/showcase_plastic.jpg",
    "material": "Concentrated Dishwashing Liquid",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 82,
    "sizes": [
      {
        "name": "Case (1 pcs)",
        "sku": "CHEM-60005",
        "caseCount": 1,
        "price": 31.99,
        "dimensions": "12/3 (36cs)"
      }
    ]
  },
  {
    "id": "chem-80201",
    "sku": "CHEM-80201",
    "categoryId": "janitorial-and-cleaning",
    "subcategory": "Industrial All-Purpose Cleaner",
    "name": "Workforce Heavy Duty Industrial Degreaser, 4x1 Gallon Case (80201)",
    "slug": "chem-80201",
    "description": "Commercial food service packaging SKU CHEM-80201: Workforce Heavy Duty Industrial Degreaser, 4x1 Gallon Case (80201). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/4 (40cs).",
    "palletTiHi": "10/4 (40cs)",
    "price": 25.99,
    "specialPrice": null,
    "mrpPrice": 35.09,
    "bestSeller": false,
    "imageUrl": "/images/showcase_plastic.jpg",
    "material": "Industrial All-Purpose Cleaner",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 82,
    "sizes": [
      {
        "name": "Case (4 pcs)",
        "sku": "CHEM-80201",
        "caseCount": 4,
        "price": 25.99,
        "dimensions": "10/4 (40cs)"
      }
    ]
  },
  {
    "id": "chem-80205",
    "sku": "CHEM-80205",
    "categoryId": "janitorial-and-cleaning",
    "subcategory": "Industrial All-Purpose Cleaner",
    "name": "Workforce Heavy Duty Industrial Degreaser, 5 Gallon Pail (80205)",
    "slug": "chem-80205",
    "description": "Commercial food service packaging SKU CHEM-80205: Workforce Heavy Duty Industrial Degreaser, 5 Gallon Pail (80205). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 12/3 (36cs).",
    "palletTiHi": "12/3 (36cs)",
    "price": 32.99,
    "specialPrice": null,
    "mrpPrice": 44.54,
    "bestSeller": false,
    "imageUrl": "/images/showcase_plastic.jpg",
    "material": "Industrial All-Purpose Cleaner",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 82,
    "sizes": [
      {
        "name": "Case (1 pcs)",
        "sku": "CHEM-80205",
        "caseCount": 1,
        "price": 32.99,
        "dimensions": "12/3 (36cs)"
      }
    ]
  },
  {
    "id": "towel-centerpull",
    "sku": "TOWEL-CENTERPULL",
    "categoryId": "janitorial-and-cleaning",
    "subcategory": "2-Ply Perforated Towel Paper",
    "name": "Center-Pull White Paper Towel Rolls, High Capacity Foodservice Case",
    "slug": "towel-centerpull",
    "description": "Commercial food service packaging SKU TOWEL-CENTERPULL: Center-Pull White Paper Towel Rolls, High Capacity Foodservice Case. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 6/5 (30cs).",
    "palletTiHi": "6/5 (30cs)",
    "price": 28.99,
    "specialPrice": null,
    "mrpPrice": 39.14,
    "bestSeller": false,
    "imageUrl": "/images/showcase_plastic.jpg",
    "material": "2-Ply Perforated Towel Paper",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 80,
    "sizes": [
      {
        "name": "Case (6 pcs)",
        "sku": "TOWEL-CENTERPULL",
        "caseCount": 6,
        "price": 28.99,
        "dimensions": "6/5 (30cs)"
      }
    ]
  },
  {
    "id": "gloves-nitrile",
    "sku": "GLOVES-NITRILE",
    "categoryId": "janitorial-and-cleaning",
    "subcategory": "Powder-Free Food-Safe Nitrile",
    "name": "Blue Nitrile Examination & Food Service Gloves (Assorted Sizes: S, M, L, XL), 1000pc (100x10)",
    "slug": "gloves-nitrile",
    "description": "Commercial food service packaging SKU GLOVES-NITRILE: Blue Nitrile Examination & Food Service Gloves (Assorted Sizes: S, M, L, XL), 1000pc (100x10). Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/6 (60cs).",
    "palletTiHi": "10/6 (60cs)",
    "price": 42.99,
    "specialPrice": null,
    "mrpPrice": 58.04,
    "bestSeller": false,
    "imageUrl": "/images/showcase_plastic.jpg",
    "material": "Powder-Free Food-Safe Nitrile",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 54,
    "sizes": [
      {
        "name": "Case (1000 pcs)",
        "sku": "GLOVES-NITRILE",
        "caseCount": 1000,
        "price": 42.99,
        "dimensions": "10/6 (60cs)"
      }
    ]
  },
  {
    "id": "trash-33hd-clr",
    "sku": "TRASH-33HD-CLR",
    "categoryId": "janitorial-and-cleaning",
    "subcategory": "High Density Clear Polyethylene",
    "name": "33 Gallon HD Clear Trash Can Liners, 200 PC, 1.5 MIC",
    "slug": "trash-33hd-clr",
    "description": "Commercial food service packaging SKU TRASH-33HD-CLR: 33 Gallon HD Clear Trash Can Liners, 200 PC, 1.5 MIC. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/6 (60cs).",
    "palletTiHi": "10/6 (60cs)",
    "price": 24.99,
    "specialPrice": null,
    "mrpPrice": 33.74,
    "bestSeller": false,
    "imageUrl": "/images/showcase_plastic.jpg",
    "material": "High Density Clear Polyethylene",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 54,
    "sizes": [
      {
        "name": "Case (200 pcs)",
        "sku": "TRASH-33HD-CLR",
        "caseCount": 200,
        "price": 24.99,
        "dimensions": "10/6 (60cs)"
      }
    ]
  },
  {
    "id": "trash-33hd-blk",
    "sku": "TRASH-33HD-BLK",
    "categoryId": "janitorial-and-cleaning",
    "subcategory": "High Density Black Polyethylene",
    "name": "33 Gallon HD Black Trash Can Liners, 200 PC, 1.5 MIC",
    "slug": "trash-33hd-blk",
    "description": "Commercial food service packaging SKU TRASH-33HD-BLK: 33 Gallon HD Black Trash Can Liners, 200 PC, 1.5 MIC. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/6 (60cs).",
    "palletTiHi": "10/6 (60cs)",
    "price": 24.99,
    "specialPrice": null,
    "mrpPrice": 33.74,
    "bestSeller": false,
    "imageUrl": "/images/showcase_plastic.jpg",
    "material": "High Density Black Polyethylene",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 54,
    "sizes": [
      {
        "name": "Case (200 pcs)",
        "sku": "TRASH-33HD-BLK",
        "caseCount": 200,
        "price": 24.99,
        "dimensions": "10/6 (60cs)"
      }
    ]
  },
  {
    "id": "trash-33ld-blk-12",
    "sku": "TRASH-33LD-BLK-12",
    "categoryId": "janitorial-and-cleaning",
    "subcategory": "Low Density Heavy Black Polyethylene",
    "name": "33 Gallon LD Black Trash Can Liners, 100 PC, 1.2 MIL",
    "slug": "trash-33ld-blk-12",
    "description": "Commercial food service packaging SKU TRASH-33LD-BLK-12: 33 Gallon LD Black Trash Can Liners, 100 PC, 1.2 MIL. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/6 (60cs).",
    "palletTiHi": "10/6 (60cs)",
    "price": 24.99,
    "specialPrice": null,
    "mrpPrice": 33.74,
    "bestSeller": false,
    "imageUrl": "/images/showcase_plastic.jpg",
    "material": "Low Density Heavy Black Polyethylene",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 93,
    "sizes": [
      {
        "name": "Case (100 pcs)",
        "sku": "TRASH-33LD-BLK-12",
        "caseCount": 100,
        "price": 24.99,
        "dimensions": "10/6 (60cs)"
      }
    ]
  },
  {
    "id": "trash-33ld-blk-15",
    "sku": "TRASH-33LD-BLK-15",
    "categoryId": "janitorial-and-cleaning",
    "subcategory": "Low Density Heavy Black Polyethylene",
    "name": "33 Gallon LD Black Trash Can Liners, 100 PC, 1.5 MIL",
    "slug": "trash-33ld-blk-15",
    "description": "Commercial food service packaging SKU TRASH-33LD-BLK-15: 33 Gallon LD Black Trash Can Liners, 100 PC, 1.5 MIL. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/6 (60cs).",
    "palletTiHi": "10/6 (60cs)",
    "price": 24.99,
    "specialPrice": null,
    "mrpPrice": 33.74,
    "bestSeller": false,
    "imageUrl": "/images/showcase_plastic.jpg",
    "material": "Low Density Heavy Black Polyethylene",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 93,
    "sizes": [
      {
        "name": "Case (100 pcs)",
        "sku": "TRASH-33LD-BLK-15",
        "caseCount": 100,
        "price": 24.99,
        "dimensions": "10/6 (60cs)"
      }
    ]
  },
  {
    "id": "trash-58ld-blk-14",
    "sku": "TRASH-58LD-BLK-14",
    "categoryId": "janitorial-and-cleaning",
    "subcategory": "Low Density Heavy Black Polyethylene",
    "name": "58 Gallon LD Black Heavy Duty Can Liners, 100 PC, 1.4 MIL",
    "slug": "trash-58ld-blk-14",
    "description": "Commercial food service packaging SKU TRASH-58LD-BLK-14: 58 Gallon LD Black Heavy Duty Can Liners, 100 PC, 1.4 MIL. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 29.99,
    "specialPrice": null,
    "mrpPrice": 40.49,
    "bestSeller": false,
    "imageUrl": "/images/cat_takeout_containers.jpg",
    "material": "Low Density Heavy Black Polyethylene",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 93,
    "sizes": [
      {
        "name": "Case (100 pcs)",
        "sku": "TRASH-58LD-BLK-14",
        "caseCount": 100,
        "price": 29.99,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "trash-24x32-blk",
    "sku": "TRASH-24X32-BLK",
    "categoryId": "janitorial-and-cleaning",
    "subcategory": "Black Polyethylene",
    "name": "Gallon Trash Bag (24x32), 250 PC, BLACK",
    "slug": "trash-24x32-blk",
    "description": "Commercial food service packaging SKU TRASH-24X32-BLK: Gallon Trash Bag (24x32), 250 PC, BLACK. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 12/6 (72cs).",
    "palletTiHi": "12/6 (72cs)",
    "price": 10.99,
    "specialPrice": null,
    "mrpPrice": 14.84,
    "bestSeller": false,
    "imageUrl": "/images/cat_kraft_bags.jpg",
    "material": "Black Polyethylene",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 67,
    "sizes": [
      {
        "name": "Case (250 pcs)",
        "sku": "TRASH-24X32-BLK",
        "caseCount": 250,
        "price": 10.99,
        "dimensions": "12/6 (72cs)"
      }
    ]
  },
  {
    "id": "trash-58gal",
    "sku": "TRASH-58GAL",
    "categoryId": "janitorial-and-cleaning",
    "subcategory": "Black Polyethylene",
    "name": "58 Gallon Heavy Duty Black Trash Bags, Commercial Case",
    "slug": "trash-58gal",
    "description": "Commercial food service packaging SKU TRASH-58GAL: 58 Gallon Heavy Duty Black Trash Bags, Commercial Case. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 25.65,
    "specialPrice": null,
    "mrpPrice": 34.63,
    "bestSeller": false,
    "imageUrl": "/images/cat_kraft_bags.jpg",
    "material": "Black Polyethylene",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 95,
    "sizes": [
      {
        "name": "Case (100 pcs)",
        "sku": "TRASH-58GAL",
        "caseCount": 100,
        "price": 25.65,
        "dimensions": "8/5 (40cs)"
      }
    ]
  },
  {
    "id": "fmtb-4046",
    "sku": "FMTB-4046",
    "categoryId": "janitorial-and-cleaning",
    "subcategory": "High Density Polyethylene (HDPE)",
    "name": "FMTB-4046 40-45 Gallon HDPE Trash Bag 40\" x 46\", Commercial Case",
    "slug": "fmtb-4046",
    "description": "Commercial food service packaging SKU FMTB-4046: FMTB-4046 40-45 Gallon HDPE Trash Bag 40\" x 46\", Commercial Case. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 10/5 (50cs).",
    "palletTiHi": "10/5 (50cs)",
    "price": 26.99,
    "specialPrice": null,
    "mrpPrice": 36.44,
    "bestSeller": false,
    "imageUrl": "/images/cat_kraft_bags.jpg",
    "material": "High Density Polyethylene (HDPE)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 69,
    "sizes": [
      {
        "name": "Case (250 pcs)",
        "sku": "FMTB-4046",
        "caseCount": 250,
        "price": 26.99,
        "dimensions": "10/5 (50cs)"
      }
    ]
  },
  {
    "id": "tb-3956",
    "sku": "TB-3956",
    "categoryId": "janitorial-and-cleaning",
    "subcategory": "High Density Polyethylene (HDPE)",
    "name": "TB-3956 55-60 Gallon HDPE Trash Bag 39\" x 56\", Commercial Case",
    "slug": "tb-3956",
    "description": "Commercial food service packaging SKU TB-3956: TB-3956 55-60 Gallon HDPE Trash Bag 39\" x 56\", Commercial Case. Engineered for commercial kitchens, high-volume prep, and food delivery. Pallet Configuration TI/HI: 8/5 (40cs).",
    "palletTiHi": "8/5 (40cs)",
    "price": 26.99,
    "specialPrice": null,
    "mrpPrice": 36.44,
    "bestSeller": false,
    "imageUrl": "/images/cat_kraft_bags.jpg",
    "material": "High Density Polyethylene (HDPE)",
    "color": "Standard",
    "bpiCertified": false,
    "fdaApproved": true,
    "microwaveSafe": false,
    "ratingAvg": 4.8,
    "reviewCount": 43,
    "sizes": [
      {
        "name": "Case (200 pcs)",
        "sku": "TB-3956",
        "caseCount": 200,
        "price": 26.99,
        "dimensions": "8/5 (40cs)"
      }
    ]
  }
];

export async function seedDatabase() {
  try {
    console.log("[Seed] Starting database seed for The Takeout Box catalog...");

    // 1. Seed Categories
    for (const cat of CATEGORIES) {
      await pool.execute(
        `INSERT INTO categories (id, slug, name, description, image_url, display_order, is_active)
         VALUES (?, ?, ?, ?, ?, ?, TRUE)
         ON DUPLICATE KEY UPDATE
           name = VALUES(name),
           description = VALUES(description),
           image_url = VALUES(image_url),
           display_order = VALUES(display_order)`,
        [cat.id, cat.slug, cat.name, cat.description, cat.image_url, cat.display_order]
      );
    }

    // 2. Seed Products & Sizes
    for (const prod of PRODUCTS) {
      await pool.execute(
        `INSERT INTO products (
          id, category_id, sku, name, slug, description, pallet_ti_hi, price, mrp_price, image_url, material, color,
          bpi_certified, fda_approved, microwave_safe, rating_avg, review_count
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          sku = VALUES(sku),
          name = VALUES(name),
          description = VALUES(description),
          pallet_ti_hi = VALUES(pallet_ti_hi),
          price = VALUES(price),
          mrp_price = VALUES(mrp_price),
          image_url = VALUES(image_url),
          material = VALUES(material),
          rating_avg = VALUES(rating_avg),
          review_count = VALUES(review_count)`,
        [
          prod.id,
          prod.categoryId,
          prod.sku || null,
          prod.name,
          prod.slug,
          prod.description,
          prod.palletTiHi || null,
          prod.price || 0,
          prod.mrpPrice || null,
          prod.imageUrl,
          prod.material,
          prod.color,
          prod.bpiCertified ? 1 : 0,
          prod.fdaApproved ? 1 : 0,
          prod.microwaveSafe ? 1 : 0,
          prod.ratingAvg,
          prod.reviewCount,
        ]
      );

      // Delete existing sizes and re-insert
      await pool.execute("DELETE FROM product_sizes WHERE product_id = ?", [prod.id]);
      for (const sz of prod.sizes) {
        await pool.execute(
          `INSERT INTO product_sizes (product_id, name, sku, case_count, price, stock_status)
           VALUES (?, ?, ?, ?, ?, 'in_stock')`,
          [prod.id, sz.name, sz.sku, sz.caseCount, sz.price]
        );
      }
    }

    console.log("[Seed] Database seed completed successfully.");
  } catch (error: any) {
    console.warn(`[Seed Warning] Could not complete seed: ${error.message}`);
  }
}

if (process.argv[1]?.includes("seed")) {
  seedDatabase().then(() => process.exit(0));
}
