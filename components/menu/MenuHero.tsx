import type { Product } from "@/lib/types";

const pad = (value: number) => String(value).padStart(2, "0");

export default function MenuHero({ products }: { products: Product[] }) {
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const lowCount = products.filter(
    (product) => product.stock === 0 || product.stock <= 5,
  ).length;
  const categoryLabel =
    products.length && products.every((p) => p.category === products[0].category)
      ? products[0].category.charAt(0).toUpperCase() + products[0].category.slice(1)
      : "Mixed";

  return (
    <section className="flex flex-col xl:flex-row xl:items-end justify-between gap-space-lg">
      <div className="flex flex-col gap-space-xs max-w-3xl">
        <div className="flex flex-wrap items-center gap-space-xs">
          <span className="px-space-sm py-0.5 rounded bg-surface-container-high text-primary font-label-sm text-label-sm tracking-widest uppercase shadow-sm">
            Artisanal Cellar &amp; Beverage Bar • {products.length} Curated Drinks
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Live Stock Sync
          </span>
        </div>

        <h1 className="font-headline-lg text-headline-lg lg:font-display-lg lg:text-display-lg text-on-surface tracking-tight leading-none mt-1">
          Beverage Collection &amp;{" "}
          <span className="italic font-normal text-primary">Bar Allocations</span>
        </h1>

        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1">
          Curated precision roasts, cold brews, loose-leaf chai infusions, and
          freshly cold-pressed citrus carafes. Real-time beverage bar stock and
          cellar inventory.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-xs bg-surface-container-low/90 backdrop-blur-xl p-space-xs rounded-xl shadow-xl w-full xl:w-auto">
        <div className="flex flex-col p-space-sm rounded bg-surface-container/70 shadow-sm">
          <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest">
            Active Items
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-headline-md text-headline-md text-on-surface">
              {pad(products.length)}
            </span>
            <span className="font-label-sm text-label-sm text-primary">Live</span>
          </div>
        </div>

        <div className="flex flex-col p-space-sm rounded bg-surface-container/70 shadow-sm">
          <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest">
            Total Stock
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-headline-md text-headline-md text-primary">
              {totalStock}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Units
            </span>
          </div>
        </div>

        <div className="flex flex-col p-space-sm rounded bg-surface-container/70 shadow-sm">
          <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest">
            Category
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-headline-md text-headline-md text-on-surface">
              {categoryLabel}
            </span>
            <span className="font-label-sm text-label-sm text-tertiary">Bar</span>
          </div>
        </div>

        <div className="flex flex-col p-space-sm rounded bg-surface-container/70 shadow-sm">
          <span className="font-label-sm text-label-sm text-error/90 uppercase tracking-widest">
            86&apos;d / Low
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-headline-md text-headline-md text-on-surface">
              {pad(lowCount)}
            </span>
            <span className="font-label-sm text-label-sm text-outline">Hold</span>
          </div>
        </div>
      </div>
    </section>
  );
}
