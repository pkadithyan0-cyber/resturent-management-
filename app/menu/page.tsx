import type { Metadata } from "next";
import MenuView from "@/components/menu/MenuView";

export const metadata: Metadata = {
  title: "Menu & Items — AURELIA",
  description:
    "Beverage collection and bar allocations. Artisanal cellar and beverage bar stock.",
};

export default function MenuPage() {
  return <MenuView />;
}
