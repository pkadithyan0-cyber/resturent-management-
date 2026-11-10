"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowLeft, Trash2 } from "lucide-react";
import CartHeader from "@/components/layout/CartHeader";
import CartFooter from "@/components/layout/CartFooter";
import CartHero from "@/components/cart/CartHero";
import CartLineCard from "@/components/cart/CartLineCard";
import AllocationPanel from "@/components/cart/AllocationPanel";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useCart, useToast } from "@/store/AppProvider";

const pad = (value: number) => String(value).padStart(2, "0");

export default function CartView() {
  const cart = useCart();
  const pathname = usePathname();
  const { push } = useToast();
  const [search, setSearch] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);

  const visibleItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return cart.items;
    return cart.items.filter(({ product }) =>
      [product.name, product.description, product.id, product.category, product.badge]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [cart.items, search]);

  const handleReset = () => {
    cart.clear();
    setConfirmReset(false);
    push({
      title: "Requisition roster reset",
      message: "All selections were cleared from the cart.",
      variant: "error",
    });
  };

  return (
    <div className="flex flex-col w-full">
      <CartHeader search={search} onSearch={setSearch} cartCount={cart.units} />

      <main className="w-full pt-20 bg-background min-h-[calc(100vh-5rem)]">
        <div className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-margin py-8 lg:py-12">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute top-1/3 left-10 w-80 h-80 bg-primary-container/5 rounded-full blur-3xl pointer-events-none -z-10" />

          <CartHero
            distinctItems={cart.items.length}
            units={cart.units}
            service={cart.service}
            prepMinutes={cart.prepMinutes}
          />

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            <section className="lg:col-span-8 flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface font-semibold">
                    Selected Atelier Potions
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">
                    {pad(cart.items.length)} Recipes
                  </span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant italic">
                  Table priority: Standard Tasting Sequence
                </span>
              </div>

              {visibleItems.map(({ product, qty }) => (
                <CartLineCard key={product.id} product={product} qty={qty} />
              ))}

              {!visibleItems.length ? (
                <div className="flex flex-col items-center justify-center gap-space-sm bg-surface-container-low rounded-lg p-space-xl border border-surface-container-highest/50 shadow-md text-center">
                  <span className="font-headline-md text-headline-md text-on-surface">
                    {cart.items.length ? "No preparations found" : "Your requisition is empty"}
                  </span>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                    {cart.items.length
                      ? `No selections match “${search}”. Adjust the search to find a line item.`
                      : "Browse the cellar & barista collection and add beverages to build the tableside requisition."}
                  </p>
                  <Link
                    href="/menu"
                    className="mt-2 inline-flex items-center gap-2 px-space-md py-2 rounded bg-primary text-on-primary font-label-md text-label-md tracking-wider uppercase shadow-[0_0_16px_rgba(242,202,80,0.3)] transition-all hover:bg-primary-fixed"
                  >
                    <ArrowLeft size={16} />
                    Continue Cellar &amp; Barista Selection
                  </Link>
                </div>
              ) : null}

              {visibleItems.length ? (
                <div className="flex items-center justify-between pt-4 pb-2">
                  <Link
                    href="/menu"
                    className="inline-flex items-center gap-2 font-label-lg text-label-lg text-primary hover:text-primary-fixed-dim transition-colors tracking-wider uppercase font-semibold"
                  >
                    <ArrowLeft size={18} />
                    Continue Cellar &amp; Barista Selection
                  </Link>
                  {pathname === "/cart" ? (
                    <Link
                      href="/checkout"
                      className="inline-flex items-center gap-2 px-space-md py-2 rounded bg-primary text-on-primary font-label-md text-label-md tracking-wider uppercase shadow-[0_0_16px_rgba(242,202,80,0.25)] transition-all hover:bg-primary-fixed"
                    >
                      Proceed to Checkout
                    </Link>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => setConfirmReset(true)}
                    className="font-label-sm text-label-sm uppercase tracking-widest text-outline hover:text-error transition-colors flex items-center gap-1.5"
                  >
                    <Trash2 size={16} />
                    Reset Requisition Roster
                  </button>
                </div>
              ) : null}
            </section>

            <aside className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24">
              <AllocationPanel />
            </aside>
          </div>
        </div>
      </main>

      <CartFooter />

      <ConfirmDialog
        open={confirmReset}
        title="Reset requisition roster?"
        message="This clears every beverage selection from the cart. The cellar collection and placed orders are unaffected. This cannot be undone."
        confirmLabel="Reset Roster"
        onClose={() => setConfirmReset(false)}
        onConfirm={handleReset}
      />
    </div>
  );
}
