import type { Metadata } from "next";
import CartView from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Checkout — AURELIA",
  description: "Review your selections and submit a tableside requisition.",
};

/** Reuse the existing cart and order flow so checkout shares the same state. */
export default function CheckoutPage() {
  return <CartView />;
}
