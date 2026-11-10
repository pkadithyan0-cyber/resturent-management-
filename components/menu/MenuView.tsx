"use client";

import { useMemo, useState } from "react";
import MenuHeader from "@/components/layout/MenuHeader";
import MenuFooter from "@/components/layout/MenuFooter";
import MenuHero from "@/components/menu/MenuHero";
import MenuToolbar from "@/components/menu/MenuToolbar";
import ProductCard from "@/components/menu/ProductCard";
import ProductFormModal from "@/components/ui/ProductFormModal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useCart, useProducts, useToast } from "@/store/AppProvider";
import type { Product } from "@/lib/types";

export default function MenuView() {
  const { products, addProduct, updateProduct, deleteProduct, nextProductId } =
    useProducts();
  const cart = useCart();
  const { push } = useToast();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [confirming, setConfirming] = useState<Product | null>(null);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category)));
    return unique;
  }, [products]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === "all" || product.category === category;
      if (!matchesCategory) return false;
      if (!query) return true;
      const haystack = [
        product.name,
        product.description,
        product.station,
        product.badge,
        product.id,
        product.category,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [products, category, search]);

  const handleSave = (product: Product) => {
    if (editing) {
      updateProduct(product);
      push({
        title: `${product.name} updated`,
        message: `Ledger entry ${product.id} amended.`,
      });
    } else {
      addProduct(product);
      push({
        title: `${product.name} added`,
        message: `Entry ${product.id} is now live on the bar ledger.`,
      });
    }
    setFormOpen(false);
    setEditing(null);
  };

  const handleDelete = () => {
    if (!confirming) return;
    deleteProduct(confirming.id);
    cart.remove(confirming.id);
    push({
      title: `${confirming.name} removed`,
      message: `Entry ${confirming.id} struck from the collection.`,
      variant: "error",
    });
    setConfirming(null);
  };

  return (
    <div className="flex flex-col w-full">
      <MenuHeader search={search} onSearch={setSearch} cartCount={cart.units} />

      <main className="w-full pt-20 bg-background min-h-[calc(100vh-5rem)]">
        <div className="flex flex-col w-full">
          <div className="relative w-full overflow-hidden px-space-md lg:px-space-lg py-space-lg">
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/3 -right-24 w-80 h-80 bg-primary-container/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-[1600px] mx-auto flex flex-col gap-space-xl relative z-10">
              <MenuHero products={products} />

              <MenuToolbar
                products={products}
                categories={categories}
                category={category}
                onCategoryChange={setCategory}
                search={search}
                onSearch={setSearch}
                onAdd={() => {
                  setEditing(null);
                  setFormOpen(true);
                }}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-md">
                {filtered.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onEdit={() => {
                      setEditing(product);
                      setFormOpen(true);
                    }}
                    onDelete={() => setConfirming(product)}
                  />
                ))}
                {!filtered.length ? (
                  <div className="col-span-full flex flex-col items-center justify-center gap-space-sm bg-surface-container/70 backdrop-blur-xl rounded-xl p-space-xl shadow-xl border border-white/5 text-center">
                    <span className="font-headline-md text-headline-md text-on-surface">
                      No preparations found
                    </span>
                    <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                      No cellar entries match “{search}”. Adjust the search,
                      switch category filters, or add a new beverage to the
                      collection.
                    </p>
                  </div>
                ) : null}
              </div>

              <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-md mt-space-sm" />
            </div>
          </div>
        </div>
      </main>

      <MenuFooter />

      <ProductFormModal
        open={formOpen}
        initial={editing}
        nextId={nextProductId()}
        onClose={() => {
          setFormOpen(false);
          setEditing(null);
        }}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={Boolean(confirming)}
        title={confirming ? `Remove ${confirming.name}?` : ""}
        message={
          confirming
            ? `This strikes ${confirming.id} from the beverage collection and clears it from any active requisitions. This cannot be undone.`
            : ""
        }
        confirmLabel="Remove Entry"
        onClose={() => setConfirming(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
