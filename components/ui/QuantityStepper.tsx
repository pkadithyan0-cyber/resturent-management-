"use client";

import { Minus, Plus } from "lucide-react";

interface QuantityStepperProps {
  qty: number;
  onDecrease: () => void;
  onIncrease: () => void;
  variant?: "menu" | "cart";
  min?: number;
  max?: number;
}

export default function QuantityStepper({
  qty,
  onDecrease,
  onIncrease,
  variant = "menu",
  min = 1,
  max = Number.POSITIVE_INFINITY,
}: QuantityStepperProps) {
  const atMin = qty <= min;
  const atMax = qty >= max;

  if (variant === "cart") {
    return (
      <div className="inline-flex items-center bg-surface-container-highest rounded-lg p-0.5 shadow-inner">
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={onDecrease}
          disabled={atMin}
          className="w-7 h-7 flex items-center justify-center rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors disabled:opacity-40 disabled:hover:text-on-surface-variant"
        >
          <Minus size={16} />
        </button>
        <span className="w-8 text-center font-title-md text-title-md font-semibold text-primary">
          {qty}
        </span>
        <button
          type="button"
          aria-label="Increase quantity"
          onClick={onIncrease}
          disabled={atMax}
          className="w-7 h-7 flex items-center justify-center rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors disabled:opacity-40 disabled:hover:text-on-surface-variant"
        >
          <Plus size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center bg-surface-container-high rounded p-0.5 border border-outline-variant/30">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={onDecrease}
        disabled={atMin}
        className="h-8 w-8 flex items-center justify-center rounded text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors disabled:opacity-40"
      >
        <Minus size={16} />
      </button>
      <span className="w-7 text-center font-label-md text-label-md text-on-surface font-medium select-none">
        {qty}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={onIncrease}
        disabled={atMax}
        className="h-8 w-8 flex items-center justify-center rounded text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors disabled:opacity-40"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
