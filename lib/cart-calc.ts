import { SERVICE_RATE, TAX_RATE } from "./constants";
import type { CartLine, Order, OrderItem, Product } from "./types";

export const computeTotals = (
  lines: CartLine[],
  products: Product[],
) => {
  const items: OrderItem[] = lines
    .map((line) => {
      const product = products.find((p) => p.id === line.productId);
      if (!product) return null;
      return {
        productId: product.id,
        name: product.name,
        qty: line.qty,
        price: product.price,
      };
    })
    .filter((item): item is OrderItem => item !== null);

  const units = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const service = round(subtotal * SERVICE_RATE);
  const tax = round(subtotal * TAX_RATE);
  const total = round(subtotal + service + tax);

  return { items, units, subtotal, service, tax, total };
};

export const round = (value: number): number =>
  Math.round(value * 100) / 100;

export const buildOrder = (params: {
  id: string;
  table: string;
  guests: number;
  lines: CartLine[];
  products: Product[];
  draft?: boolean;
  pacing?: Order["pacing"];
}): Order => {
  const { items, subtotal, service, tax, total } = computeTotals(
    params.lines,
    params.products,
  );

  return {
    id: params.id,
    table: params.table,
    guests: params.guests,
    items,
    subtotal,
    service,
    tax,
    total,
    status: "pending",
    createdAt: Date.now(),
    draft: params.draft,
    pacing: params.pacing ?? "fire-now",
  };
};
