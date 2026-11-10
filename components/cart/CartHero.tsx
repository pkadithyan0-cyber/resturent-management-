"use client";

import { Timer } from "lucide-react";

const pad = (value: number) => String(value).padStart(2, "0");

interface CartHeroProps {
  distinctItems: number;
  units: number;
  service: number;
  prepMinutes: number;
}

export default function CartHero({
  distinctItems,
  units,
  service,
  prepMinutes,
}: CartHeroProps) {
  return (
    <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-surface-container-highest/60">
      <div className="flex flex-col gap-2 max-w-2xl">
        <div className="flex items-center gap-3">
          <span className="text-outline font-label-sm text-label-sm uppercase tracking-widest">
            •
          </span>
          <span className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-widest">
            Atelier Cart
          </span>
          <span className="text-outline font-label-sm text-label-sm uppercase tracking-widest">
            •
          </span>
          <span className="text-primary font-label-sm text-label-sm uppercase tracking-widest font-semibold">
            {pad(distinctItems)} Curated Drinks
          </span>
        </div>

        <h1 className="font-headline-lg text-headline-lg lg:text-display-md font-display-md text-on-surface tracking-tight leading-tight mt-1">
          Cart Selection &amp; Service Requisitions
        </h1>

        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Curated guest selections ready for tableside allocation and service
          preparation. Synchronized with real-time cellar and barista dispatch.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-surface-container-low p-3 rounded-lg border border-surface-container-highest/40 shadow-xl backdrop-blur-md">
        <div className="flex flex-col px-3 py-1.5 border-r border-surface-container-highest/40">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
            Requisition
          </span>
          <span className="font-title-lg text-title-lg text-on-surface font-semibold mt-0.5">
            {distinctItems} Items{" "}
            <span className="text-primary font-label-md text-label-md">
              ({units} Units)
            </span>
          </span>
        </div>

        <div className="flex flex-col px-3 py-1.5 border-r border-surface-container-highest/40">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
            Service (10%)
          </span>
          <span className="font-title-lg text-title-lg text-secondary mt-0.5">
            ${service.toFixed(2)}
          </span>
        </div>

        <div className="flex flex-col px-3 py-1.5">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
            Est. Prep
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Timer size={16} className="text-primary" />
            <span className="font-title-lg text-title-lg text-on-surface font-semibold">
              {prepMinutes} mins
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
