import type { Metadata } from "next";
import OrdersView from "@/components/orders/OrdersView";

export const metadata: Metadata = {
  title: "Live Orders — AURELIA",
  description:
    "Live restaurant order rail: pending, preparing, ready and completed service.",
};

export default function OrdersPage() {
  return <OrdersView />;
}
