import type { Order } from "./types";

const HOUR = 1000 * 60 * 60;

export const SEED_ORDERS: Order[] = [
  {
    id: "ORD-2417",
    table: "Table 02 • Jardin d'Hiver",
    guests: 2,
    items: [
      { productId: "F002", name: "Tea", qty: 2, price: 10 },
      { productId: "F005", name: "Orange Juice", qty: 1, price: 30 },
    ],
    subtotal: 50,
    service: 5,
    tax: 4,
    total: 59,
    status: "preparing",
    createdAt: Date.now() - 18 * 60 * 1000,
    pacing: "fire-now",
  },
  {
    id: "ORD-2416",
    table: "Table 07 • Chef's Table",
    guests: 6,
    items: [
      { productId: "F001", name: "Coffee", qty: 4, price: 20 },
      { productId: "F003", name: "Filter Coffee", qty: 3, price: 5 },
      { productId: "F004", name: "Iced Coffee", qty: 2, price: 15 },
    ],
    subtotal: 125,
    service: 12.5,
    tax: 10,
    total: 147.5,
    status: "pending",
    createdAt: Date.now() - 6 * 60 * 1000,
    pacing: "fire-now",
  },
  {
    id: "ORD-2415",
    table: "Bar 01 • Sommelier Bar",
    guests: 3,
    items: [
      { productId: "F004", name: "Iced Coffee", qty: 3, price: 15 },
      { productId: "F002", name: "Tea", qty: 1, price: 10 },
    ],
    subtotal: 55,
    service: 5.5,
    tax: 4.4,
    total: 64.9,
    status: "ready",
    createdAt: Date.now() - 31 * 60 * 1000,
    pacing: "scheduled",
  },
  {
    id: "ORD-2412",
    table: "Table 05 • Cave à Vin",
    guests: 4,
    items: [
      { productId: "F001", name: "Coffee", qty: 2, price: 20 },
      { productId: "F005", name: "Orange Juice", qty: 2, price: 30 },
    ],
    subtotal: 100,
    service: 10,
    tax: 8,
    total: 118,
    status: "completed",
    createdAt: Date.now() - 2 * HOUR,
    pacing: "fire-now",
  },
];

export const nextOrderId = (orders: Order[]): string => {
  const numbers = orders
    .map((order) => Number(order.id.replace(/\D/g, "")))
    .filter((value) => Number.isFinite(value));
  const max = numbers.length ? Math.max(...numbers) : 2416;
  return `ORD-${max + 1}`;
};
