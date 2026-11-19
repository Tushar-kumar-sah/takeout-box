const fs = require('fs');
const path = require('path');

// 1. Load the 192 base products from scratch/head_products.js
const headData = require('../scratch/head_products.js');
const baseProducts = headData.PRODUCTS;

console.log('Loaded base products:', baseProducts.length);

// Helper function to resolve the authentic image for any item by its name/type/material
function resolveProductImage(item) {
  const name = (item.desc || item.name || '').toLowerCase();
  const cat = (item.category || '').toLowerCase();
  const sku = (item.sku || '').toUpperCase();

  // 1. Black Hinged Containers
  if (
    (sku.startsWith('V') && sku.includes('BL')) ||
    sku.startsWith('TCBL') ||
    name.includes('hinged container (black)') ||
    name.includes('hinged container, black') ||
    name.includes('hinged container, vented, black') ||
    name.includes('hinged black pp') ||
    (name.includes('black') && name.includes('hinged'))
  ) {
    return '/images/black_hinged_box.jpg';
  }

  // 2. White Hinged Containers / Clamshells
  if (
    (sku.startsWith('V') && sku.includes('WH')) ||
    sku.startsWith('WH') ||
    sku.startsWith('CS') ||
    name.includes('hinged container (white)') ||
    name.includes('hinged container, white') ||
    name.includes('hinged container, vented, white') ||
    name.includes('clamshell mfpp') ||
    (name.includes('white') && name.includes('hinged'))
  ) {
    return '/images/white_hinged_box.jpg';
  }

  // 3. Bagasse Hinged Containers (BGHW61, BGHW96, BGHW81, BGHW83, BGHW91, BGHW93)
  if (
    sku.startsWith('BGHW') ||
    (name.includes('bagasse') && name.includes('hinged'))
  ) {
    return '/images/bagasse-hinged-container.jpg';
  }

  // 4a. Bagasse Round Plates
  if (
    sku.startsWith('BGRPW') ||
    name.includes('bagasse round plate')
  ) {
    return '/images/bagasse-round-plate.jpg';
  }

  // 4b. Bagasse Bowls & Matching Lids
  if (
    sku.startsWith('BGBW') ||
    sku.startsWith('BGL') ||
    name.includes('bagasse 12oz bowl') ||
    name.includes('bagasse 16oz bowl') ||
    name.includes('bagasse 32oz bowl') ||
    name.includes('lid for bagasse')
  ) {
    return '/images/bagasse-bowl.jpg';
  }

  // 4c. Compostable Paper Plates (PLATE6)
  if (
    sku === 'PLATE6' ||
    name.includes('compostable paper plate')
  ) {
    return '/images/compostable-paper-plate.jpg';
  }

  // 4d. Salad Plates (SALAD-AS, SALAD-BL)
  if (
    sku.startsWith('SALAD') ||
    name.includes('salad plate')
  ) {
    return '/images/salad-plate.jpg';
  }

  // 5a. Deli Containers - Combo Sets (SDLH, DLH 240-sets)
  if (
    sku.startsWith('SDLH') ||
    (sku.startsWith('DLH') && !sku.includes('-500'))
  ) {
    return '/images/pp-deli-container.jpg';
  }

  // 5b. Deli Containers - Regular Bulk Bases & Universal Lids
  if (
    (sku.startsWith('DLH') && sku.includes('-500')) ||
    sku === 'LID-500' ||
    name.includes('deli container base') ||
    name.includes('lids for 8-32oz deli')
  ) {
    return '/images/pp-deli-container-base.jpg';
  }

  // 5c. Deli Containers - Thin/Clear Cups & Lids
  if (
    sku.startsWith('DLCU') ||
    sku.startsWith('DLC') ||
    sku === 'DLCLU' ||
    name.includes('clear deli container')
  ) {
    return '/images/clear-deli-container.jpg';
  }

  // 5d. Portion Cups & Portion Cup Lids
  if (
    sku.startsWith('PC') ||
    name.includes('portion cup')
  ) {
    if (name.includes('lid') || sku.endsWith('L')) {
      return '/images/portion-cup-lids.jpg';
    }
    return '/images/portion-cup.jpg';
  }

  // 6a. Microwaveable Noodle Bowls & Inserts
  if (
    sku.startsWith('NBL') ||
    sku.startsWith('NBWH') ||
    sku.startsWith('NBINT') ||
    sku.startsWith('NCB') ||
    name.includes('noodle bowl')
  ) {
    return '/images/microwaveable-noodle-bowl.jpg';
  }

  // 6b. Round Containers & Thermoformed Bowls
  if (
    sku.startsWith('TFRDB') ||
    sku.startsWith('M24BL') ||
    sku.startsWith('RD') ||
    sku === 'TY-R345' ||
    name.includes('round microwaveable') ||
    name.includes('round container') ||
    name.includes('round bowl')
  ) {
    return '/images/round_takeout_bowl.jpg';
  }

  // 7. Paper Soup Containers & Soup Cups
  if (
    sku.startsWith('CDA') ||
    sku.startsWith('DA-') ||
    name.includes('soup container') ||
    name.includes('soup cup')
  ) {
    if (name.includes('vented lid') || name.includes('paper lid')) {
      return '/images/paper-vented-soup-lid.jpg';
    }
    if (name.includes('flat lid')) {
      return '/images/flat-lid.jpg';
    }
    if (name.includes('white paper soup container')) {
      return '/images/white-paper-soup-container.jpg';
    }
    return '/images/cat_soup_containers.jpg';
  }

  // 7b. Paper Food Trays (TRAY-100, TRAY-200, TRAY-250, TRAY-300 / T RAY 100, 200, 250, 300)
  if (
    sku.startsWith('TRAY') ||
    sku.startsWith('T RAY') ||
    sku.startsWith('T-RAY') ||
    name.includes('paper food tray')
  ) {
    return '/images/paper-food-tray.jpg';
  }

  // 7c. Paper Take-Out Boxes (PTW08, PTW16, PTW26, PTW32)
  if (
    sku.startsWith('PTW') ||
    name.includes('paper take-out box')
  ) {
    return '/images/paper-take-out-box.jpg';
  }

  // 7d. Paper Bio Boxes (BP01K, BP02K, BP03K, BP04K, BP08K)
  if (
    sku.startsWith('BP0') ||
    sku.startsWith('BP') ||
    name.includes('bio box')
  ) {
    return '/images/paper-bio-box.jpg';
  }

  // 8. Rectangular Microwaveable Containers
  if (
    (sku.startsWith('RC') && !sku.startsWith('RCL') && !sku.startsWith('RC08') && !sku.startsWith('RC16CUP')) ||
    sku.startsWith('SRC') ||
    name.includes('rectangular microwaveable')
  ) {
    return '/images/rectangular_takeout_box.jpg';
  }

  // 9. Two-Color Hinged Containers (TC61, TC96, TC81M, TC83, TC83M, TC91, TC93, TC100, TC103)
  if (
    (sku.startsWith('TC') && !sku.startsWith('TCBL')) ||
    name.includes('duo-colored') ||
    name.includes('two-color')
  ) {
    return '/images/hinged-duo-colored-pp-container.jpg';
  }

  // 10. Translucent PP Hinged Containers (V61C, V96C, V962C, V71C, V73C, V81C, V83C, V91C, V93C)
  if (
    (sku.startsWith('V') && sku.endsWith('C')) ||
    sku.startsWith('V962C') ||
    (name.includes('translucent') && name.includes('hinged'))
  ) {
    return '/images/pp-hinged-container.jpg';
  }

  // 11. Clear Polystyrene Containers (PSHCL61X2, PSHCL61, PSHCL81X2, PSHCL81, PSHCL83, PSHCL91, PSHCL93)
  if (
    sku.startsWith('PSHCL') ||
    name.includes('clear hinged ps')
  ) {
    return '/images/clear-hinged-ps-container.jpg';
  }

  // 12. Shallow Compartmental Trays (W61, W81, W91, 500ML, 650ML, 750ML, SQ48, RCT)
  if (
    sku.startsWith('W6') ||
    sku.startsWith('W8') ||
    sku.startsWith('W9') ||
    sku.startsWith('W20') ||
    sku.includes('ML') ||
    sku.startsWith('SQ') ||
    sku.startsWith('RCT') ||
    name.includes('tray with translucent lid') ||
    name.includes('compartment')
  ) {
    return '/images/cat_takeout_containers.jpg';
  }

  // 11. Cutlery & Kits
  if (
    name.includes('fork') ||
    name.includes('spoon') ||
    name.includes('knife') ||
    name.includes('cutlery') ||
    sku.includes('FORK') ||
    sku.includes('SPOON') ||
    sku.includes('KIT-')
  ) {
    return '/images/cat_cutlery.jpg';
  }

  // 12. Napkins
  if (
    name.includes('napkin') ||
    sku.includes('NAPKIN')
  ) {
    return '/images/cat_napkins.jpg';
  }

  // 13. Straws
  if (
    sku.startsWith('STRAW') ||
    name.includes('straw')
  ) {
    // 13a. Clear Straws (STRAWCBOX, STRAWC, STRAW-C-RAW)
    if (
      sku.startsWith('STRAWC') ||
      sku.includes('-C-') ||
      name.includes('clear straw') ||
      (item.color && item.color.toLowerCase().includes('clear'))
    ) {
      return '/images/clear-straw.jpg';
    }
    // 13b. Color Straws (STRAWB3-CLR, or color giant straw)
    if (
      sku.includes('CLR') ||
      sku === 'STRAWB3-CLR' ||
      name.includes('color giant straw')
    ) {
      return '/images/color-straw.jpg';
    }
    // 13c. Black Straws (STRAWB1, STRAWB2, STRAWB3, etc.)
    return '/images/black-straw.jpg';
  }

  // 14. Bags (Kraft, Brown, Plastic Thank You, Roll Bags)
  if (
    (name.includes('bag') && !name.includes('straw')) ||
    name.includes('t-shirt') ||
    name.includes('sack') ||
    sku.startsWith('BAG')
  ) {
    return '/images/cat_kraft_bags.jpg';
  }

  // 15. Aluminum Foil & Catering Steam Table Pans
  if (
    name.includes('aluminum') ||
    name.includes('foil') ||
    name.includes('half pan') ||
    name.includes('full pan')
  ) {
    return '/images/cat_aluminum_trays.jpg';
  }

  // 16. Cups & Lids (Paper Cups, PET Cold Cups, Flat Lids, Dome Lids, Sleeves)
  if (
    sku.startsWith('PASW') ||
    sku.startsWith('FLPA') ||
    sku.startsWith('RLPA') ||
    sku.startsWith('C12PET') ||
    sku.startsWith('C16PET') ||
    sku.startsWith('C20PET') ||
    sku.startsWith('C24PET') ||
    sku.startsWith('C32PET') ||
    sku.startsWith('FLPET') ||
    sku.startsWith('DLPET') ||
    sku.startsWith('PET') ||
    sku.startsWith('PAPER') ||
    sku.startsWith('RC08CUP') ||
    sku.startsWith('RC16CUP') ||
    sku.startsWith('RCLIDS') ||
    name.includes('paper cup') ||
    name.includes('pet cup') ||
    name.includes('cup lid') ||
    name.includes('flat lid') ||
    name.includes('dome lid') ||
    name.includes('sleeve')
  ) {
    // 16a. Clear Dome Lids (DLPET98, DLPET107, PETDOME, PETWDOME, PETNODOME)
    if (
      name.includes('dome') ||
      sku.includes('DOME') ||
      sku.startsWith('DLPET')
    ) {
      return '/images/dome-lid.jpg';
    }

    // 16b. Clear Flat Lids (FLPET98, FLPET107, PET-UFLAT, PET-UNO, PETLID107)
    if (
      sku.startsWith('FLPET') ||
      sku.includes('UFLAT') ||
      sku === 'PET-UNO' ||
      sku === 'PETLID107' ||
      (name.includes('flat lid') && !name.includes('paper'))
    ) {
      return '/images/flat-lid.jpg';
    }

    // 16c. Sip Lids (PETSIP, RCLIDS)
    if (
      sku.includes('SIP') ||
      sku === 'RCLIDS' ||
      name.includes('sip lid')
    ) {
      return '/images/flat-lid.jpg';
    }

    // 16d. Black Hot Paper Cup Lids (FLPA80B, FLPA90B, RLPA80B, RLPA90B, PAPERCUPLID80, PAPERCUPLID90)
    if (
      sku.startsWith('FLPA') ||
      sku.startsWith('RLPA') ||
      sku.startsWith('PAPERCUPLID') ||
      name.includes('black paper cup lid') ||
      name.includes('reclosable lid') ||
      (name.includes('lid') && name.includes('paper'))
    ) {
      return '/images/black-paper-cup-lid.jpg';
    }

    // 16e. Paper Cup Sleeves (PACS)
    if (
      sku === 'PACS' ||
      name.includes('cup sleeve') ||
      name.includes('sleeve')
    ) {
      return '/images/paper-cup-sleeve.jpg';
    }

    // 16f. Coffee Print Paper Cups (PASW12-COFFEE, PASW16-COFFEE, PASW20-COFFEE)
    if (
      sku.includes('COFFEE') ||
      name.includes('coffee print')
    ) {
      return '/images/coffee-print-paper-cup.jpg';
    }

    // 16g. White Paper Cups (PASW8W, PASW10W, PASW12W, PASW16W, PASW20W, PASW24W, PAPER04, PAPER06)
    if (
      sku.startsWith('PASW') ||
      (sku.startsWith('PAPER') && !sku.includes('LID')) ||
      name.includes('paper cup')
    ) {
      return '/images/white-paper-cup.jpg';
    }

    // 16h. Assorted Color PET Cups (PET-16COL)
    if (
      sku.includes('COL') ||
      name.includes('color pet cup') ||
      name.includes('assorted color')
    ) {
      return '/images/color-pet-cup.jpg';
    }

    // 16i. U-Shape Clear PET Cups (PET-U12, PET-U16)
    if (
      sku.includes('PET-U') ||
      name.includes('u-shape')
    ) {
      return '/images/u-shape-pet-cup.jpg';
    }

    // 16j. Clear PET Cold Drink Cups (C12PET98, C16PET98, C20PET98, C24PET98, C32PET107, PET7, PET9, RC08CUP, RC16CUP)
    if (
      sku.startsWith('C') ||
      sku.startsWith('PET') ||
      sku.startsWith('RC') ||
      name.includes('clear pet cup') ||
      name.includes('pet cup')
    ) {
      return '/images/clear-pet-cup.jpg';
    }

    return '/images/cat_cups_lids.jpg';
  }

  // 17. Food Paper & Butcher Wraps
  if (
    name.includes('freezer') ||
    name.includes('steak') ||
    name.includes('checker') ||
    name.includes('deli wrap') ||
    name.includes('film')
  ) {
    return '/images/poster_catering_foil.jpeg';
  }

  // 18. Janitorial & Cleaning Supplies
  if (
    name.includes('cleaner') ||
    name.includes('dishwash') ||
    name.includes('workforce') ||
    name.includes('glove') ||
    name.includes('towel') ||
    name.includes('trash')
  ) {
    return '/images/showcase_plastic.jpg';
  }

  return '/images/cat_takeout_containers.jpg';
}

// 2. Comprehensive Categories List with authentic images & icons
const CATEGORIES = [
  {
    id: "all",
    name: "All Products",
    slug: "all",
    description: "Browse our complete commercial food packaging & restaurant supply catalog",
    image: "/images/hero_black_containers.jpg",
    iconName: "Boxes",
  },
  {
    id: "hinged-containers",
    name: "Hinged Containers",
    slug: "hinged-containers",
    description: "Durable, leak-resistant white & black MFPP clamshells, corner-lock & duo-colored boxes",
    image: "/images/white_hinged_box.jpg",
    iconName: "Archive",
    badge: "Popular",
  },
  {
    id: "deli-containers",
    name: "Deli Containers",
    slug: "deli-containers",
    description: "PP deli container combo sets, individual heavy-duty bases, clear cups & universal lids",
    image: "/images/pp-deli-container.jpg",
    iconName: "Package",
    badge: "Popular",
  },
  {
    id: "noodle-bowls",
    name: "Noodle Bowls",
    slug: "noodle-bowls",
    description: "Microwaveable black & white noodle bowls with leak-proof lids and compartmental inserts",
    image: "/images/microwaveable-noodle-bowl.jpg",
    iconName: "Soup",
    badge: "Best Seller",
  },
  {
    id: "round-containers",
    name: "Round Containers & Bowls",
    slug: "round-containers",
    description: "Heavy-duty microwaveable round food prep & thermoformed takeout containers with lids",
    image: "/images/round_takeout_bowl.jpg",
    iconName: "CircleDot",
  },
  {
    id: "rectangular-containers",
    name: "Rectangular Containers",
    slug: "rectangular-containers",
    description: "Commercial microwaveable rectangular food containers & shallow meal prep trays with leak-resistant lids",
    image: "/images/rectangular_takeout_box.jpg",
    iconName: "Square",
    badge: "Essential",
  },
  {
    id: "shallow-compartmental-containers",
    name: "Shallow / Compartmental Containers",
    slug: "shallow-compartmental-containers",
    description: "Multi-compartment bento meal trays, square takeout containers & PP black trays with translucent lids",
    image: "/images/cat_takeout_containers.jpg",
    iconName: "Grid",
  },
  {
    id: "bagasse-plates-and-bowls",
    name: "Bagasse Plates & Bowls",
    slug: "bagasse-plates-and-bowls",
    description: "100% compostable sugarcane bagasse round & 3-compartment plates, bowls & PET lids (PFAS Free)",
    image: "/images/bagasse-round-plate.jpg",
    iconName: "Leaf",
    badge: "PFAS Free",
  },
  {
    id: "bagasse-hinged-containers",
    name: "Bagasse Hinged Containers",
    slug: "bagasse-hinged-containers",
    description: "100% compostable sugarcane bagasse hinged clamshell containers, PFAS-free & oil-resistant",
    image: "/images/bagasse-hinged-container.jpg",
    iconName: "Leaf",
    badge: "PFAS Free",
  },
  {
    id: "paper-take-out-boxes",
    name: "Paper Take-Out Boxes",
    slug: "paper-take-out-boxes",
    description: "Leak-resistant white folded paper carryout food boxes & natural kraft bio boxes",
    image: "/images/paper-take-out-box.jpg",
    iconName: "Box",
  },
  {
    id: "mfpp-hinged-containers-white",
    name: "MFPP Hinged Containers - White",
    slug: "mfpp-hinged-containers-white",
    description: "Mineral-filled polypropylene white hinged clamshell containers, vented & 1/2/3 compartments",
    image: "/images/white_hinged_box.jpg",
    iconName: "Archive",
  },
  {
    id: "mfpp-hinged-containers-black",
    name: "MFPP Hinged Containers - Black",
    slug: "mfpp-hinged-containers-black",
    description: "Premium mineral-filled PP black hinged clamshell containers, vented & compartment options",
    image: "/images/black_hinged_box.jpg",
    iconName: "Archive",
  },
  {
    id: "portion-cups",
    name: "Portion Cups",
    slug: "portion-cups",
    description: "Polypropylene portion sauce cups from 0.75oz to 5.5oz for dips, dressings & condiments",
    image: "/images/portion-cup.jpg",
    iconName: "CupSoda",
  },
  {
    id: "portion-cup-lids",
    name: "Portion Cup Lids",
    slug: "portion-cup-lids",
    description: "Ultra-clear PET flat snap lids matching standard commercial portion cups",
    image: "/images/portion-cup-lids.jpg",
    iconName: "Disc",
  },
  {
    id: "two-color-hinged-containers",
    name: "Two-Color Hinged Containers",
    slug: "two-color-hinged-containers",
    description: "Hinged duo-colored PP containers and hoagie boxes with clear top presentation",
    image: "/images/hinged-duo-colored-pp-container.jpg",
    iconName: "Sparkles",
  },
  {
    id: "translucent-hinged-containers",
    name: "Translucent Hinged Containers",
    slug: "translucent-hinged-containers",
    description: "See-through translucent PP hinged clamshell containers, vented & 1/2/3 compartments",
    image: "/images/pp-hinged-container.jpg",
    iconName: "Maximize2",
  },
  {
    id: "clear-polystyrene-containers",
    name: "Clear Polystyrene Containers",
    slug: "clear-polystyrene-containers",
    description: "Crystal clear hinged PS containers in 2in and 3in depth for bakery, deli & salads",
    image: "/images/clear-hinged-ps-container.jpg",
    iconName: "Square",
  },
  {
    id: "paper-cups",
    name: "Paper Cups",
    slug: "paper-cups",
    description: "Single wall white & coffee print paper hot beverage cups in 4oz to 24oz sizes",
    image: "/images/white-paper-cup.jpg",
    iconName: "Coffee",
  },
  {
    id: "paper-cup-lids-sleeves",
    name: "Paper Cup Lids & Sleeves",
    slug: "paper-cup-lids-sleeves",
    description: "Black flat & reclosable hot cup lids and insulated kraft paper cup sleeves",
    image: "/images/black-paper-cup-lid.jpg",
    iconName: "Shield",
  },
  {
    id: "pet-cups",
    name: "PET Cups",
    slug: "pet-cups",
    description: "Crystal clear 98mm & 107mm cold drink PET cups for smoothies, iced teas, boba & cold brews",
    image: "/images/clear-pet-cup.jpg",
    iconName: "Wine",
  },
  {
    id: "pet-cup-lids",
    name: "PET Cup Lids",
    slug: "pet-cup-lids",
    description: "Commercial flat, dome, sip and wide-hole lids matching 78mm, 90mm, 98mm and 107mm PET cups",
    image: "/images/flat-lid.jpg",
    iconName: "Disc",
  },
  {
    id: "soup-containers",
    name: "Paper Soup Containers & Lids",
    slug: "soup-containers",
    description: "Double-poly coated paper soup cups & plastic food soup tubs with matching leak-resistant lids",
    image: "/images/cat_soup_containers.jpg",
    iconName: "Flame",
  },
  {
    id: "cutlery",
    name: "Cutlery & Kits",
    slug: "cutlery",
    description: "Heavy weight PP plastic forks, tea spoons, soup spoons, wrapped utensils & complete cutlery kits",
    image: "/images/cat_cutlery.jpg",
    iconName: "Utensils",
  },
  {
    id: "straws",
    name: "Straws & Stirrers",
    slug: "straws",
    description: "Commercial wrapped and bulk clear, black, and colored drinking straws",
    image: "/images/black-straw.jpg",
    iconName: "Minus",
  },
  {
    id: "napkins",
    name: "Napkins & Tabletop",
    slug: "napkins",
    description: "Commercial 1-ply, 2-ply, 3-ply dinner napkins, dispenser interfold & beverage napkins",
    image: "/images/cat_napkins.jpg",
    iconName: "FileText",
  },
  {
    id: "bags",
    name: "Bags & Sacks",
    slug: "bags",
    description: "Heavy-duty kraft handle shopping bags, brown grocery sacks, t-shirt thank you bags & LD roll bags",
    image: "/images/cat_kraft_bags.jpg",
    iconName: "ShoppingBag",
  },
  {
    id: "food-trays-plates",
    name: "Food Trays & Plates",
    slug: "food-trays-plates",
    description: "Paper food trays (1LB to 3LB), salad plates, and compostable paper plates",
    image: "/images/paper-food-tray.jpg",
    iconName: "Columns",
  },
  {
    id: "aluminum-foil-and-pans",
    name: "Aluminum Foil & Catering Pans",
    slug: "aluminum-foil-and-pans",
    description: "Half pan & full pan deep steam table pans, heavy-duty foil rolls and pop-up sheets",
    image: "/images/cat_aluminum_trays.jpg",
    iconName: "Layers",
  },
  {
    id: "food-paper-and-wraps",
    name: "Food Paper & Butcher Wraps",
    slug: "food-paper-and-wraps",
    description: "Poly-coated freezer paper, checker basket liner sheets, butcher steak paper & cling film",
    image: "/images/poster_catering_foil.jpeg",
    iconName: "FileText",
  },
  {
    id: "janitorial-and-cleaning",
    name: "Janitorial & Cleaning Supplies",
    slug: "janitorial-and-cleaning",
    description: "Commercial grill cleaner, dishwashing detergents, heavy-duty trash liners & nitrile gloves",
    image: "/images/showcase_plastic.jpg",
    iconName: "Sparkles",
  },
];

// MAIN_CATEGORIES mirrors CATEGORIES (excluding "all")
const MAIN_CATEGORIES = CATEGORIES.filter(c => c.slug !== "all");

console.log('Total CATEGORIES:', CATEGORIES.length);
console.log('Total MAIN_CATEGORIES:', MAIN_CATEGORIES.length);

module.exports = {
  resolveProductImage,
  CATEGORIES,
  MAIN_CATEGORIES,
};

