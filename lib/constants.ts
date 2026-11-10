import type { DiningTable, OrderStatus } from "./types";

export const SERVICE_RATE = 0.1;
export const TAX_RATE = 0.08;

export const DINING_TABLES: DiningTable[] = [
  { id: "T01", label: "Table 01", zone: "Salon Principal" },
  { id: "T02", label: "Table 02", zone: "Jardin d'Hiver" },
  { id: "T03", label: "Table 03", zone: "Terrasse Nord" },
  { id: "T04", label: "Table 04", zone: "Salon Privé" },
  { id: "T05", label: "Table 05", zone: "Cave à Vin" },
  { id: "T06", label: "Table 06", zone: "Chef's Table" },
  { id: "B01", label: "Bar 01", zone: "Sommelier Bar" },
];

export const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 8, 10];

export const DEFAULT_TABLE_ID = "T04";
export const DEFAULT_GUESTS = 4;

export const ORDER_STATUSES: OrderStatus[] = [
  "pending",
  "preparing",
  "ready",
  "completed",
];

export const STATUS_META: Record<
  OrderStatus,
  { label: string; chip: string; dot: string }
> = {
  pending: {
    label: "Pending",
    chip: "bg-surface-container-high text-on-surface-variant",
    dot: "bg-outline",
  },
  preparing: {
    label: "Preparing",
    chip: "bg-[#c87d55]/15 text-[#c87d55] border border-[#c87d55]/40",
    dot: "bg-[#c87d55]",
  },
  ready: {
    label: "Ready",
    chip: "bg-[#7d8b68]/15 text-[#7d8b68] border border-[#7d8b68]/40",
    dot: "bg-[#7d8b68]",
  },
  completed: {
    label: "Completed",
    chip: "bg-[#a69265]/15 text-[#a69265] border border-[#a69265]/40",
    dot: "bg-[#a69265]",
  },
};

export const NEXT_STATUS: Record<OrderStatus, OrderStatus | null> = {
  pending: "preparing",
  preparing: "ready",
  ready: "completed",
  completed: null,
};

export const NEXT_STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "Start Preparing",
  preparing: "Mark Ready",
  ready: "Complete Order",
  completed: "Completed",
};
