import collectionImages from "./noir_the_collection_plp.json";

export interface Product {
  id: string;
  slug: string;
  name: string;
  detail: string;
  price: number;
  category: string;
  image: string;
  badge: string;
  colors: string[];
  sizes: string[];
}

const colors = ["#171717", "#d8d0c3", "#f2eee7"];
const sizes = ["XS", "S", "M", "L", "XL"];
const catalog: Omit<Product, "image">[] = [
  { id: "NR001", slug: "structured-silk-lapel-blazer", name: "Structured Silk Lapel Blazer", detail: "Italian virgin wool · Duchess silk lapel", price: 1890, category: "Tailoring", badge: "ATELIER SIGNATURE", colors, sizes },
  { id: "NR002", slug: "sculpted-tailored-blazer", name: "Sculpted Tailored Blazer", detail: "Wool crepe · Architectural shoulder", price: 1680, category: "Tailoring", badge: "NEW EDITION", colors, sizes },
  { id: "NR003", slug: "cashmere-wrap-coat", name: "Cashmere Wrap Coat", detail: "Double-face cashmere · Hand-finished", price: 2450, category: "Outerwear", badge: "LIMITED EDITION", colors, sizes },
  { id: "NR004", slug: "minimalist-wool-trouser", name: "Minimalist Wool Trouser", detail: "Italian wool · Relaxed straight leg", price: 890, category: "Tailoring", badge: "NOIRÉ ESSENTIAL", colors, sizes },
  { id: "NR005", slug: "winter-trench-coat", name: "Winter Trench Coat", detail: "Water-resistant cotton · Sculpted volume", price: 2100, category: "Outerwear", badge: "ATELIER SIGNATURE", colors, sizes },
  { id: "NR006", slug: "silk-slip-gown", name: "Silk Slip Gown", detail: "Washed silk satin · Bias cut", price: 980, category: "Dresses", badge: "NEW EDITION", colors, sizes },
  { id: "NR007", slug: "cashmere-high-neck-knit", name: "Cashmere High-Neck Knit", detail: "Mongolian cashmere · Fine gauge", price: 760, category: "Knitwear", badge: "NOIRÉ ESSENTIAL", colors, sizes },
  { id: "NR008", slug: "architectural-evening-dress", name: "Architectural Evening Dress", detail: "Silk faille · Sculptural drape", price: 2250, category: "Dresses", badge: "COUTURE EDITION", colors, sizes },
  { id: "NR009", slug: "concealed-placket-shirt", name: "Concealed Placket Shirt", detail: "Stark blanc poplin · French placket", price: 490, category: "Tailoring", badge: "ATELIER ESSENTIAL", colors, sizes },
  { id: "NR010", slug: "double-face-wool-cape", name: "Double-Face Wool Cape", detail: "Italian wool · Hand-finished edges", price: 1950, category: "Outerwear", badge: "LIMITED EDITION", colors, sizes },
  { id: "NR011", slug: "calfskin-minimal-tote", name: "Calfskin Minimal Tote", detail: "Italian calfskin · Brushed palladium", price: 1280, category: "Accessories", badge: "ATELIER LEATHER", colors, sizes: ["ONE SIZE"] },
  { id: "NR012", slug: "woven-silk-foulard", name: "Woven Silk Foulard", detail: "Silk organza · Geometric woven trim", price: 320, category: "Accessories", badge: "NOIRÉ ACCESSORY", colors, sizes: ["ONE SIZE"] },
];

export const products: Product[] = catalog.map((product, index) => ({
  ...product,
  image: collectionImages[index % collectionImages.length],
}));

export function money(value: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

export function colorLabel(color: string): string {
  const labels: Record<string, string> = {
    "#171717": "Midnight black",
    "#d8d0c3": "Warm stone",
    "#f2eee7": "Soft ivory",
  };
  return labels[color.toLowerCase()] ?? color;
}

export interface RestaurantProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  station: string;
  stationIcon: "coffee" | "tea" | "snowflake" | "wine" | "glass" | "cocktail";
  badge: string;
  image: string;
}

export const SEED_PRODUCTS: RestaurantProduct[] = [
  {
    id: "F001",
    name: "Coffee",
    description: "Freshly brewed arabica coffee",
    price: 20,
    stock: 100,
    category: "Hot Drinks",
    station: "Bar",
    stationIcon: "coffee",
    badge: "BESTSELLER",
    image: "/images/f001.jpg",
  },
  {
    id: "F002",
    name: "Tea",
    description: "Premium loose leaf tea selection",
    price: 10,
    stock: 100,
    category: "Hot Drinks",
    station: "Bar",
    stationIcon: "tea",
    badge: "",
    image: "/images/f002.jpg",
  },
  {
    id: "F003",
    name: "Filter Coffee",
    description: "Slow drip filtered coffee",
    price: 5,
    stock: 50,
    category: "Hot Drinks",
    station: "Bar",
    stationIcon: "coffee",
    badge: "",
    image: "/images/f003.jpg",
  },
  {
    id: "F004",
    name: "Iced Coffee",
    description: "Cold brew coffee over ice",
    price: 15,
    stock: 50,
    category: "Cold Drinks",
    station: "Bar",
    stationIcon: "snowflake",
    badge: "NEW",
    image: "/images/f004.jpg",
  },
  {
    id: "F005",
    name: "Orange Juice",
    description: "Freshly squeezed orange juice",
    price: 30,
    stock: 30,
    category: "Cold Drinks",
    station: "Bar",
    stationIcon: "glass",
    badge: "",
    image: "/images/f005.jpg",
  },
  {
    id: "F006",
    name: "Espresso Martini",
    description: "Vodka, coffee liqueur, espresso",
    price: 45,
    stock: 20,
    category: "Cocktails",
    station: "Bar",
    stationIcon: "cocktail",
    badge: "SIGNATURE",
    image: "/images/f001.jpg",
  },
  {
    id: "F007",
    name: "Red Wine",
    description: "House red wine by the glass",
    price: 35,
    stock: 25,
    category: "Wine",
    station: "Bar",
    stationIcon: "wine",
    badge: "",
    image: "/images/f002.jpg",
  },
  {
    id: "F008",
    name: "White Wine",
    description: "House white wine by the glass",
    price: 35,
    stock: 25,
    category: "Wine",
    station: "Bar",
    stationIcon: "wine",
    badge: "",
    image: "/images/f003.jpg",
  },
];

export const SEED_CART: Record<string, number> = {
  "F001": 2,
  "F002": 1,
};
