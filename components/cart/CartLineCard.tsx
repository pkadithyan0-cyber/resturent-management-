"use client";

import { X } from "lucide-react";
import QuantityStepper from "@/components/ui/QuantityStepper";
import ProductImage from "@/components/ui/ProductImage";
import { useCart } from "@/store/AppProvider";
import { currency } from "@/lib/format";
import type { Product } from "@/lib/types";

interface CartLineCardProps {
  product: Product;
  qty: number;
}

export default function CartLineCard({ product, qty }: CartLineCardProps) {
  const cart = useCart();

  return (
    <article className="group relative bg-surface-container-low hover:bg-surface-container transition-all duration-300 rounded-lg p-4 sm:p-5 border border-surface-container-highest/50 hover:border-primary/30 shadow-md">
      <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
        <div className="relative w-full sm:w-36 h-36 rounded-lg overflow-hidden shrink-0 bg-surface-container-highest shadow-inner">
          <ProductImage
            src={product.image}
            alt={product.description}
            stationIcon={product.stationIcon}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            iconSize={34}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 via-transparent to-transparent" />
          <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-surface-container-lowest/90 font-label-sm text-label-sm text-primary uppercase tracking-widest">
            {product.badge}
          </span>
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                  ID: {product.id}
                </span>
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-semibold">
                  {product.category}
                </span>
              </div>
              <span className="font-title-md text-title-md text-on-surface-variant font-medium">
                {currency(product.price)}{" "}
                <span className="font-body-sm text-body-sm text-outline">/ unit</span>
              </span>
            </div>

            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-wide">
              {product.name}{" "}
              <span className="font-body-md text-body-md text-on-surface-variant font-normal">
                | {product.description}
              </span>
            </h3>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-3 border-t border-surface-container-highest/40">
            <div className="flex items-center gap-4">
              <QuantityStepper
                variant="cart"
                qty={qty}
                onDecrease={() =>
                  cart.setQty(product.id, Math.max(1, qty - 1))
                }
                onIncrease={() =>
                  cart.setQty(product.id, Math.min(product.stock, qty + 1))
                }
                max={Math.max(product.stock, 1)}
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="block font-label-sm text-label-sm uppercase tracking-wider text-outline">
                  Line Subtotal
                </span>
                <span className="font-headline-sm text-headline-sm text-primary font-semibold">
                  {currency(product.price * qty)}
                </span>
              </div>
              <button
                type="button"
                title="Remove Item"
                aria-label={`Remove ${product.name} from cart`}
                onClick={() => cart.remove(product.id)}
                className="p-1.5 text-outline hover:text-error transition-colors rounded-lg hover:bg-error-container/20"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
