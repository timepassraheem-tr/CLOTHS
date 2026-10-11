// RAHEEM CLOTHS SHOWROOM - Curated Product Catalog
export const PRODUCTS = [
  {
    id: 1,
    number: "01",
    name: "Royal Heritage Velvet Sherwani",
    category: "Bespoke Festive & Wedding",
    badge: "Masterpiece",
    tagline: "Woven for royalty, hand-embroidered with artisanal precision.",
    description: "Crafted from plush micro-velvet, featuring intricate tone-on-tone zardozi embroidery across the mandarin collar and cuffs. Tailored with a regal structured silhouette that commands grandeur.",
    material: "Pure Micro-Velvet & Mulberry Silk Lining",
    price: 24999,
    compareAtPrice: 29500,
    sizes: ["38 (S)", "40 (M)", "42 (L)", "44 (XL)"],
    colors: [
      {
        name: "Midnight Navy",
        hex: "#0f172a",
        meshColor: 0x111c38,
        filter: "none",
        tint: null
      },
      {
        name: "Imperial Emerald",
        hex: "#064e3b",
        meshColor: 0x083328,
        filter: "hue-rotate(95deg) saturate(1.2) brightness(0.95)",
        tint: "rgba(6, 78, 59, 0.45)"
      },
      {
        name: "Regal Maroon",
        hex: "#4c0519",
        meshColor: 0x3d0b17,
        filter: "hue-rotate(305deg) saturate(1.3) brightness(0.92)",
        tint: "rgba(76, 5, 25, 0.45)"
      }
    ],
    fabricType: "velvet",
    garmentType: "sherwani",
    image: "/assets/cloth_sherwani_cutout.png",
    collar: "Mandarin Bandhgala with Zari Trimming",
    cut: "Regal Tailored Silhouette",
    accent: "Hand-cast Jeweled Brass Buttons",
    rating: 4.9,
    reviewsCount: 48,
    inStock: true
  },
  {
    id: 2,
    number: "02",
    name: "Pure Linen Hand-Spun Kurta Set",
    category: "Luxury Casual & Festive",
    badge: "Bestseller",
    tagline: "Effortless breathability crafted from 100% fine Belgian flax.",
    description: "Woven on traditional shuttle looms from pure European flax linen. Soft washed for a tactile, luxurious hand feel that drapes naturally in warm climates. Features authentic mother-of-pearl buttons.",
    material: "100% Pure Belgian Flax Linen",
    price: 3899,
    compareAtPrice: 4999,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      {
        name: "Natural Ecru",
        hex: "#ece3d4",
        meshColor: 0xded4c2,
        filter: "none",
        tint: null
      },
      {
        name: "Olive Sage",
        hex: "#5c6b57",
        meshColor: 0x51604c,
        filter: "hue-rotate(60deg) saturate(0.85) brightness(0.88)",
        tint: "rgba(92, 107, 87, 0.4)"
      },
      {
        name: "Soft Blush",
        hex: "#d9b8b0",
        meshColor: 0xc4a39b,
        filter: "hue-rotate(335deg) saturate(1.15) brightness(0.98)",
        tint: "rgba(217, 184, 176, 0.4)"
      }
    ],
    fabricType: "linen",
    garmentType: "kurta",
    image: "/assets/cloth_kurta_cutout.png",
    collar: "Contemporary Mandarin Collar",
    cut: "Relaxed Artisanal Fit",
    accent: "Carved Mother-of-Pearl Buttons",
    rating: 4.8,
    reviewsCount: 112,
    inStock: true
  },
  {
    id: 3,
    number: "03",
    name: "Imperial Raw Silk Bandhgala Jacket",
    category: "Formal Couture",
    badge: "Exclusive",
    tagline: "The definitive statement of contemporary Indian luxury.",
    description: "Tailored from heavy handloom raw silk characterized by its distinctive slub texture. Finished with hand-stitched pick piping, jetted silk pockets, and a chest pocket tailored for a heritage silk square.",
    material: "Handloom Mulberry Raw Silk with Cupro Bemberg Lining",
    price: 14499,
    compareAtPrice: 17999,
    sizes: ["38", "40", "42", "44"],
    colors: [
      {
        name: "Champagne Gold",
        hex: "#d1b46a",
        meshColor: 0xc4a65b,
        filter: "none",
        tint: null
      },
      {
        name: "Obsidian Black",
        hex: "#17171a",
        meshColor: 0x141416,
        filter: "saturate(0) brightness(0.28) contrast(1.25)",
        tint: "rgba(15, 15, 18, 0.55)"
      },
      {
        name: "Ivory Cream",
        hex: "#f5f0e6",
        meshColor: 0xede6da,
        filter: "saturate(0.35) brightness(1.2) contrast(0.98)",
        tint: "rgba(245, 240, 230, 0.4)"
      }
    ],
    fabricType: "raw_silk",
    garmentType: "bandhgala",
    image: "/assets/cloth_bandhgala_cutout.png",
    collar: "Structured High Bandhgala",
    cut: "Sculpted Sartorial Fit",
    accent: "Matte Bronze Crest Buttons",
    rating: 5.0,
    reviewsCount: 34,
    inStock: true
  },
  {
    id: 4,
    number: "04",
    name: "Italian Super 140s Wool Tuxedo",
    category: "Modern Evening Wear",
    badge: "Signature",
    tagline: "Timeless Italian tailoring woven from pristine Biellese merino.",
    description: "Single-button evening tuxedo handcrafted from Italian Super 140s virgin wool with fluid drape. Highlights silk grosgrain shawl lapels, silk-covered buttons, and flat-front trousers with satin side piping.",
    material: "Italian Super 140s Merino Wool & Silk Satin Lapel",
    price: 32500,
    compareAtPrice: 38000,
    sizes: ["38R", "40R", "42R", "44R"],
    colors: [
      {
        name: "Jet Black",
        hex: "#0b0b0d",
        meshColor: 0x0d0d10,
        filter: "none",
        tint: null
      },
      {
        name: "Midnight Navy",
        hex: "#0a192f",
        meshColor: 0x0d1f3b,
        filter: "sepia(0.35) hue-rotate(185deg) saturate(3.5) brightness(0.95)",
        tint: "rgba(10, 25, 47, 0.45)"
      }
    ],
    fabricType: "wool",
    garmentType: "tuxedo",
    image: "/assets/cloth_tuxedo_cutout.png",
    collar: "Satin Shawl Lapel",
    cut: "Sleek European Drop-7",
    accent: "Pure Silk Bound Facings",
    rating: 4.9,
    reviewsCount: 29,
    inStock: true
  },
  {
    id: 5,
    number: "05",
    name: "Kashmiri Pashmina Blend Nehru Vest",
    category: "Artisanal Layering",
    badge: "Handcrafted",
    tagline: "Warmth without weight, spun with rare Himalayan cashmere.",
    description: "An essential layering vest spun from fine mountain Pashmina wool and Tussar silk. Features five discreet horn buttons, a structured stand collar, and contrast piped interior pockets.",
    material: "70% Grade-A Pashmina Wool, 30% Tussar Silk",
    price: 7999,
    compareAtPrice: 9999,
    sizes: ["38", "40", "42", "44", "46"],
    colors: [
      {
        name: "Desert Camel",
        hex: "#a88454",
        meshColor: 0x9a7544,
        filter: "none",
        tint: null
      },
      {
        name: "Slate Grey",
        hex: "#52575d",
        meshColor: 0x484c52,
        filter: "saturate(0) brightness(0.75) contrast(1.15)",
        tint: "rgba(82, 87, 93, 0.45)"
      },
      {
        name: "Espresso Brown",
        hex: "#3b2f2f",
        meshColor: 0x302626,
        filter: "hue-rotate(340deg) saturate(1.3) brightness(0.65)",
        tint: "rgba(59, 47, 47, 0.5)"
      }
    ],
    fabricType: "pashmina",
    garmentType: "nehru_vest",
    image: "/assets/cloth_vest_cutout.png",
    collar: "Classic Nehru Stand Collar",
    cut: "Trim Layering Fit",
    accent: "Real Bullhorn Buttons",
    rating: 4.9,
    reviewsCount: 67,
    inStock: true
  },
  {
    id: 6,
    number: "06",
    name: "Egyptian Giza 87 Crisp Formal Shirt",
    category: "Executive Essentials",
    badge: "Daily Luxury",
    tagline: "Extra-long staple cotton creating silky luster and supreme longevity.",
    description: "Milled in northern Italy from rare Nile Delta Giza 87 extra-long staple cotton. 2-ply 120s yarn count ensures a crisp, breathable drape that remains wrinkle-resistant through boardroom evenings.",
    material: "100% 2-Ply 120s Egyptian Giza Cotton",
    price: 2899,
    compareAtPrice: 3499,
    sizes: ["39 (15.5\")", "40 (16.0\")", "42 (16.5\")", "44 (17.5\")"],
    colors: [
      {
        name: "Snow White",
        hex: "#ffffff",
        meshColor: 0xf5f5f7,
        filter: "none",
        tint: null
      },
      {
        name: "Sky Chambray",
        hex: "#93b5cf",
        meshColor: 0x82a6c2,
        filter: "hue-rotate(180deg) saturate(1.8) brightness(0.94)",
        tint: "rgba(147, 181, 207, 0.4)"
      },
      {
        name: "Lilac Whisper",
        hex: "#d8bfd8",
        meshColor: 0xc4adc4,
        filter: "hue-rotate(245deg) saturate(1.2) brightness(0.96)",
        tint: "rgba(216, 191, 216, 0.35)"
      }
    ],
    fabricType: "cotton",
    garmentType: "formal_shirt",
    image: "/assets/cloth_shirt_cutout.png",
    collar: "French Cutaway Spread Collar",
    cut: "Contemporary Tailored Fit",
    accent: "Australian Mother-of-Pearl Buttons",
    rating: 4.7,
    reviewsCount: 85,
    inStock: true
  },
  {
    id: 7,
    number: "07",
    name: "Grand Sequin & Zari Indo-Western Achkan",
    category: "Luxury Festive Party Wear",
    badge: "Party Wear",
    tagline: "Hand-embellished geometric rose-gold and obsidian zardozi with an asymmetric royal drape.",
    description: "Exquisite couture party achkan tailored from lustrous midnight raw silk. Heavily encrusted with rose-gold sequins, hand-set micro metallic crystals, and refined bullion zari work. Cut with a contemporary asymmetric overlap silhouette perfect for grand cocktail parties and high-society galas.",
    material: "Pure Banarasi Raw Silk & Rose-Gold Metallic Sequins",
    price: 21999,
    compareAtPrice: 26500,
    sizes: ["38R", "40R", "42R", "44R"],
    colors: [
      {
        name: "Obsidian Black",
        hex: "#0c0d12",
        meshColor: 0x0c0d12,
        filter: "none",
        tint: null
      },
      {
        name: "Royal Wine",
        hex: "#4a0e2e",
        meshColor: 0x4a0e2e,
        filter: "sepia(0.35) hue-rotate(290deg) saturate(2.4) brightness(0.95)",
        tint: "rgba(74, 14, 46, 0.42)"
      },
      {
        name: "Deep Emerald",
        hex: "#0b2e23",
        meshColor: 0x0b2e23,
        filter: "sepia(0.4) hue-rotate(110deg) saturate(2.2) brightness(0.92)",
        tint: "rgba(11, 46, 35, 0.42)"
      }
    ],
    fabricType: "raw_silk",
    garmentType: "achkan",
    image: "/assets/cloth_achkan_cutout.png",
    collar: "Embellished Mandarin Collar",
    cut: "Architectural Asymmetric Flare",
    accent: "Hand-Polished Jet Stone Placket",
    rating: 5.0,
    reviewsCount: 38,
    inStock: true
  },
  {
    id: 8,
    number: "08",
    name: "Regal Banarasi Brocade Jodhpuri Suit",
    category: "Imperial Evening & Cocktail",
    badge: "Couture Party Wear",
    tagline: "Woven on heirloom jacquard looms using metallic threads and pure mulberry silk.",
    description: "The crown jewel of party eveningwear, this imperial Jodhpuri bandhgala is woven from emerald-toned Banarasi brocade interwoven with real zari motifs. Engineered with sculpted shoulders, velvet pocket welts, and bespoke enamelled crown buttons.",
    material: "Woven Banarasi Mulberry Silk & Gilded Zari Brocade",
    price: 28500,
    compareAtPrice: 34000,
    sizes: ["38R", "40R", "42R", "44R", "46R"],
    colors: [
      {
        name: "Emerald Gold",
        hex: "#0e3a2f",
        meshColor: 0x0e3a2f,
        filter: "none",
        tint: null
      },
      {
        name: "Ruby Gold",
        hex: "#54121d",
        meshColor: 0x54121d,
        filter: "sepia(0.45) hue-rotate(300deg) saturate(2.5) brightness(0.95)",
        tint: "rgba(84, 18, 29, 0.42)"
      },
      {
        name: "Sapphire Gold",
        hex: "#11224d",
        meshColor: 0x11224d,
        filter: "sepia(0.3) hue-rotate(185deg) saturate(2.8) brightness(0.9)",
        tint: "rgba(17, 34, 77, 0.42)"
      }
    ],
    fabricType: "brocade",
    garmentType: "jodhpuri",
    image: "/assets/cloth_jodhpuri_cutout.png",
    collar: "Structured Bandhgala with Velvet Trim",
    cut: "Sculpted Royal Jodhpuri Silhouette",
    accent: "Bespoke Enamelled Brass Crown Buttons",
    rating: 4.9,
    reviewsCount: 52,
    inStock: true
  },
  {
    id: 9,
    number: "09",
    name: "Celebration Mirror-Work Silk Pathani Kurta",
    category: "Festive Sangeet & Reception",
    badge: "Bestseller Party Wear",
    tagline: "Authentic Kathiawadi hand-framed real glass mirrors on heavyweight raw silk.",
    description: "A vibrant party wear staple commanding the spotlight at sangeets and cocktail soirees. Crafted from rich ruby-wine raw silk, featuring intricate front-panel mirror-work surrounded by geometric silk-thread resham embroidery and rolled-up cuff styling.",
    material: "100% Hand-Dyed Slub Silk & Authentic Glass Mirror Inlay",
    price: 6499,
    compareAtPrice: 8200,
    sizes: ["38 (S)", "40 (M)", "42 (L)", "44 (XL)", "46 (XXL)"],
    colors: [
      {
        name: "Ruby Wine",
        hex: "#631024",
        meshColor: 0x631024,
        filter: "none",
        tint: null
      },
      {
        name: "Midnight Navy",
        hex: "#0f1e3d",
        meshColor: 0x0f1e3d,
        filter: "sepia(0.35) hue-rotate(185deg) saturate(2.5) brightness(0.92)",
        tint: "rgba(15, 30, 61, 0.45)"
      },
      {
        name: "Burnt Amber",
        hex: "#8c430e",
        meshColor: 0x8c430e,
        filter: "sepia(0.55) hue-rotate(30deg) saturate(2.8) brightness(1.05)",
        tint: "rgba(140, 67, 14, 0.42)"
      }
    ],
    fabricType: "silk",
    garmentType: "pathani_kurta",
    image: "/assets/cloth_mirror_kurta_cutout.png",
    collar: "Pathani Pointed Shirt Collar with Zari Trim",
    cut: "Comfort Celebration Drop-Shoulder Fit",
    accent: "Framed Convex Mirror Front Placket",
    rating: 4.9,
    reviewsCount: 74,
    inStock: true
  }
];

export const SHOWROOM_INFO = {
  name: "RAHEEM CLOTHS SHOWROOM",
  tagline: "Haute Couture & Bespoke Sartorial Excellence",
  established: "1994",
  address: "Flagship Galleria, 42 Heritage Fashion Boulevard, Civil Lines, New Delhi - 110054",
  phone: "+91 98765 43210",
  email: "concierge@raheemcloths.com",
  hours: "Monday – Sunday: 10:30 AM – 9:00 PM",
  exteriorImage: "/assets/exterior_showroom.jpg",
  entranceDoorsImage: "/assets/entrance_doors.jpg",
  interiorImage: "/assets/showroom_interior.jpg",
  almiraImage: "/assets/almira_open.jpg",
  perks: [
    { title: "Master Bespoke Tailoring", desc: "Private fittings with our 3rd-generation master tailors." },
    { title: "Global Handpicked Fabrics", desc: "Italian wools, Egyptian Giza cottons, and Banarasi silk weaves." },
    { title: "Complimentary Doorstep Trial", desc: "Experience your selected pieces in the comfort of your suite." },
    { title: "Lifetime Alterations", desc: "Complimentary precision adjustments for every bespoke garment." }
  ]
};
