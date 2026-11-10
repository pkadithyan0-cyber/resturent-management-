"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";
import type { Product, StationIconKey } from "@/lib/types";

const FIELD_CLASSES =
  "w-full bg-surface-container-low border border-[#8c827a]/30 rounded px-3 py-2 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary-container transition-colors";

const LABEL_CLASSES =
  "font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant";

const ICON_OPTIONS: { value: StationIconKey; label: string }[] = [
  { value: "coffee", label: "Hot Station Cup" },
  { value: "tea", label: "Infusion Cup" },
  { value: "snowflake", label: "Cold / Ice" },
  { value: "wine", label: "Wine / Press" },
  { value: "glass", label: "Glassware" },
];

interface ProductFormModalProps {
  open: boolean;
  initial?: Product | null;
  nextId: string;
  onClose: () => void;
  onSave: (product: Product) => void;
}

export default function ProductFormModal({
  open,
  initial,
  nextId,
  onClose,
  onSave,
}: ProductFormModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0");
  const [stock, setStock] = useState("0");
  const [category, setCategory] = useState("drinks");
  const [station, setStation] = useState("");
  const [badge, setBadge] = useState("");
  const [stationIcon, setStationIcon] = useState<StationIconKey>("coffee");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setError("");
    if (initial) {
      setName(initial.name);
      setDescription(initial.description);
      setPrice(String(initial.price));
      setStock(String(initial.stock));
      setCategory(initial.category);
      setStation(initial.station);
      setBadge(initial.badge);
      setStationIcon(initial.stationIcon);
      setImage(initial.image);
    } else {
      setName("");
      setDescription("");
      setPrice("0");
      setStock("0");
      setCategory("drinks");
      setStation("Beverage Bar • Hot Station");
      setBadge("House Selection");
      setStationIcon("coffee");
      setImage("");
    }
  }, [open, initial]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const parsedPrice = Number(price);
    const parsedStock = Number(stock);

    if (!name.trim()) {
      setError("A product name is required.");
      return;
    }
    if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
      setError("Price must be zero or greater.");
      return;
    }
    if (!Number.isFinite(parsedStock) || parsedStock < 0) {
      setError("Stock must be zero or greater.");
      return;
    }

    onSave({
      id: initial ? initial.id : nextId,
      name: name.trim(),
      description: description.trim() || "Chef's Seasonal Selection",
      price: parsedPrice,
      stock: Math.floor(parsedStock),
      category: category.trim().toLowerCase() || "drinks",
      station: station.trim() || "Beverage Bar • Hot Station",
      stationIcon,
      badge: badge.trim() || "House Selection",
      image: image.trim(),
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      eyebrow={initial ? "Amend Ledger Entry" : "New Ledger Entry"}
      title={initial ? `Edit ${initial.name}` : "Add Beverage to Collection"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <span className={LABEL_CLASSES}>Product ID</span>
          <span className="px-2 py-0.5 rounded bg-surface-container-high text-primary font-label-sm text-label-sm tracking-widest uppercase">
            {initial ? initial.id : nextId}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
          <label className="flex flex-col gap-1.5">
            <span className={LABEL_CLASSES}>Name</span>
            <input
              className={FIELD_CLASSES}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Espresso Tonic"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={LABEL_CLASSES}>Category</span>
            <input
              className={FIELD_CLASSES}
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              placeholder="drinks"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={LABEL_CLASSES}>Price (USD)</span>
            <input
              className={FIELD_CLASSES}
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={LABEL_CLASSES}>Stock Units</span>
            <input
              className={FIELD_CLASSES}
              type="number"
              min="0"
              step="1"
              value={stock}
              onChange={(event) => setStock(event.target.value)}
            />
          </label>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className={LABEL_CLASSES}>Service Description</span>
          <input
            className={FIELD_CLASSES}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Artisanal Roast & Steamed Microfoam"
          />
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
          <label className="flex flex-col gap-1.5">
            <span className={LABEL_CLASSES}>Station Line</span>
            <input
              className={FIELD_CLASSES}
              value={station}
              onChange={(event) => setStation(event.target.value)}
              placeholder="Beverage Bar • Hot Station"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={LABEL_CLASSES}>Cellar Badge</span>
            <input
              className={FIELD_CLASSES}
              value={badge}
              onChange={(event) => setBadge(event.target.value)}
              placeholder="Single Origin"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
          <label className="flex flex-col gap-1.5">
            <span className={LABEL_CLASSES}>Station Icon</span>
            <select
              className={FIELD_CLASSES}
              value={stationIcon}
              onChange={(event) =>
                setStationIcon(event.target.value as StationIconKey)
              }
            >
              {ICON_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={LABEL_CLASSES}>Image Path</span>
            <input
              className={FIELD_CLASSES}
              value={image}
              onChange={(event) => setImage(event.target.value)}
              placeholder="/images/f001.jpg"
            />
          </label>
        </div>

        {error ? (
          <p className="font-body-sm text-body-sm text-error">{error}</p>
        ) : null}

        <div className="flex items-center justify-end gap-space-sm pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-space-md py-2 rounded border border-primary-container/25 text-on-surface font-title-md text-title-md hover:text-primary transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-space-md py-2 rounded bg-primary hover:bg-primary-fixed text-on-primary font-label-md text-label-md tracking-wider uppercase shadow-[0_0_16px_rgba(242,202,80,0.3)] transition-all"
          >
            {initial ? "Save Changes" : "Add to Collection"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
