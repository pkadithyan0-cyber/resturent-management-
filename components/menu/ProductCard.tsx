"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Package, Pencil, ShoppingBag, Trash2 } from "lucide-react";
import QuantityStepper from "@/components/ui/QuantityStepper";
import ProductImage from "@/components/ui/ProductImage";
import StationIcon from "@/components/ui/StationIcon";
import { useCart, useToast } from "@/store/AppProvider";
import { currency } from "@/lib/format";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  const cart = useCart();
  const { push } = useToast();
  const cartLine = cart.lines.find((line) => line.productId === product.id);
  const quantity = cartLine?.qty ?? 0;
  const outOfStock = product.stock === 0;

  const handleAdd = () => {
    if (outOfStock) return;
    cart.add(product.id, 1);
    push({
      title: `${product.name} added to cart`,
      message: `1 × ${currency(product.price)} queued for requisition.`,
    });
  };

  const handleDecrease = () => {
    if (quantity <= 1) cart.remove(product.id);
    else cart.setQty(product.id, quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity >= product.stock) return;
    cart.setQty(product.id, quantity + 1);
  };

  return (
    <article className="group relative flex flex-col justify-between bg-surface-container/70 backdrop-blur-xl rounded-xl p-space-md shadow-xl transition-all duration-300 hover:bg-surface-container-high/80">
      <div className="flex flex-col gap-space-sm">
        <div className="relative w-full h-56 rounded-lg overflow-hidden bg-surface-container-lowest shadow-inner">
          <ProductImage
            src={product.image}
            alt={`${product.name} — ${product.description}`}
            stationIcon={product.stationIcon}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            iconSize={44}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-surface-container-lowest/20 to-transparent" />

          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container-lowest/85 backdrop-blur-md shadow-sm">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
              {product.stock} in stock
            </span>
          </div>

          <div className="absolute top-3 right-3 flex items-center px-2 py-0.5 rounded bg-surface-container-high text-primary font-label-sm text-label-sm tracking-widest uppercase shadow-sm">
            ID: {product.id}
          </div>

          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
            <StationIcon
              name={product.stationIcon}
              size={15}
              className="text-primary"
            />
            <span>{product.station}</span>
          </div>
        </div>

        <div className="w-full min-h-9">
          <AnimatePresence mode="wait" initial={false}>
            {quantity > 0 ? (
              <motion.div
                key="quantity"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.18 }}
                className="flex items-center justify-between gap-2"
              >
                <QuantityStepper
                  qty={quantity}
                  onDecrease={handleDecrease}
                  onIncrease={handleIncrease}
                  variant="cart"
                  min={0}
                  max={product.stock}
                />
                <Link
                  href="/cart"
                  className="font-label-sm text-label-sm uppercase tracking-wider text-primary hover:text-primary-fixed-dim transition-colors"
                >
                  View Cart
                </Link>
              </motion.div>
            ) : (
              <motion.button
                key="add"
                type="button"
                onClick={handleAdd}
                disabled={outOfStock}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.18 }}
                className="w-full flex items-center justify-center gap-2 py-2 px-space-sm rounded bg-surface-container-high hover:bg-primary text-primary hover:text-on-primary font-label-md text-label-md uppercase tracking-widest transition-all duration-300 shadow-sm hover:shadow-[0_0_16px_rgba(242,202,80,0.3)] group/btn h-9 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag
                  size={16}
                  className="transition-transform group-hover/btn:scale-110"
                />
                <span>{outOfStock ? "86'd" : "Add to Cart"}</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-start justify-between gap-space-xs mt-1">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-headline-sm text-headline-sm text-on-surface leading-snug group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-label-sm text-label-sm uppercase tracking-wider">
                {product.category}
              </span>
            </div>
          </div>
          <span className="font-headline-sm text-headline-sm text-primary flex-shrink-0">
            {currency(product.price)}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-primary/10 text-primary font-label-sm text-label-sm tracking-wider">
            <Package size={13} />
            Stock: {product.stock} Units
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-space-xs pt-space-md mt-space-md bg-surface-container-low/40 -mx-space-md -mb-space-md px-space-md py-space-sm rounded-b-xl">
        <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
          Status:{" "}
          <span className={outOfStock ? "text-error font-medium" : "text-primary font-medium"}>
            {outOfStock ? "86'd" : "Available"}
          </span>
        </span>
        <div className="flex items-center gap-space-xs">
          <button
            type="button"
            aria-label={`Edit ${product.name}`}
            title="Edit entry"
            onClick={onEdit}
            className="p-1.5 rounded text-outline hover:text-primary hover:bg-surface-container transition-colors"
          >
            <Pencil size={14} />
          </button>
          <button
            type="button"
            aria-label={`Delete ${product.name}`}
            title="Delete entry"
            onClick={onDelete}
            className="p-1.5 rounded text-outline hover:text-error hover:bg-error-container/20 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}
