import type { Metadata } from "next";
import CartView from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Cart List — AURELIA",
  description:
    "Cart selection and service requisitions for tableside allocation.",
};

export default function CartPage() {
  return <CartView />;
}
