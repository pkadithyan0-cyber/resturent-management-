export type StationIconKey =
  | "coffee"
  | "tea"
  | "snowflake"
  | "wine"
  | "glass"
  | "cocktail";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  station: string;
  stationIcon: StationIconKey;
  badge: string;
  image: string;
}

export interface CartLine {
  productId: string;
  qty: number;
}

export type OrderStatus = "pending" | "preparing" | "ready" | "completed";

export interface OrderItem {
  productId: string;
  name: string;
  qty: number;
  price: number;
}

export interface Order {
  id: string;
  table: string;
  guests: number;
  items: OrderItem[];
  subtotal: number;
  service: number;
  tax: number;
  total: number;
  status: OrderStatus;
  createdAt: number;
  draft?: boolean;
  pacing: "fire-now" | "scheduled";
}

export interface DiningTable {
  id: string;
  label: string;
  zone: string;
}
