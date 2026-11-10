"use client";

import { CirclePlus, Search } from "lucide-react";
import type { Product } from "@/lib/types";

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

interface MenuToolbarProps {
  products: Product[];
  categories: string[];
  category: string;
  onCategoryChange: (category: string) => void;
  search: string;
  onSearch: (value: string) => void;
  onAdd: () => void;
}

export default function MenuToolbar({
  products,
  categories,
  category,
  onCategoryChange,
  search,
  onSearch,
  onAdd,
}: MenuToolbarProps) {
  return (
    <section className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md p-space-sm rounded-xl bg-surface-container-low/60 backdrop-blur-md shadow-md">
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
        <button
          type="button"
          data-cat="all"
          onClick={() => onCategoryChange("all")}
          className={`px-space-md py-space-xs rounded font-label-sm text-label-sm tracking-wider uppercase transition-all flex-shrink-0 ${
            category === "all"
              ? "bg-primary text-on-primary shadow-[0_0_14px_rgba(242,202,80,0.25)]"
              : "bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
          }`}
        >
          All Drinks ({products.length})
        </button>

        {categories.map((value) => (
          <button
            key={value}
            type="button"
            data-cat={value}
            onClick={() => onCategoryChange(value)}
            className={`px-space-md py-space-xs rounded font-label-sm text-label-sm tracking-wider uppercase transition-all flex-shrink-0 ${
              category === value
                ? "bg-primary text-on-primary shadow-[0_0_14px_rgba(242,202,80,0.25)]"
                : "bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
            }`}
          >
            {capitalize(value)}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-space-xs flex-shrink-0">
        <div className="relative flex-grow sm:w-72">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none"
          />
          <input
            className="w-full bg-surface-container pl-9 pr-space-xs py-2 rounded font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-high transition-colors"
            placeholder="Search recipes, vintages, allergens..."
            type="text"
            value={search}
            onChange={(event) => onSearch(event.target.value)}
          />
        </div>

        <button
          type="button"
          onClick={onAdd}
          aria-label="Add new beverage"
          className="flex items-center gap-1.5 px-space-md py-2 rounded bg-primary hover:bg-primary-fixed text-on-primary font-label-md text-label-md tracking-wider uppercase shadow-[0_0_16px_rgba(242,202,80,0.3)] transition-all flex-shrink-0"
        >
          <CirclePlus size={18} />
          <span className="sm:hidden">New</span>
        </button>
      </div>
    </section>
  );
}
