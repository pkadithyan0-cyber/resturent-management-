"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Check, CircleAlert, X } from "lucide-react";
import { SEED_CART, SEED_PRODUCTS } from "@/lib/products";
import { SEED_ORDERS, nextOrderId } from "@/lib/orders";
import {
  DEFAULT_GUESTS,
  DEFAULT_TABLE_ID,
  DINING_TABLES,
} from "@/lib/constants";
import { buildOrder, computeTotals } from "@/lib/cart-calc";
import type {
  CartLine,
  Order,
  OrderStatus,
  Product,
} from "@/lib/types";

const KEYS = {
  products: "aurelia.products.v1",
  cart: "aurelia.cart.v1",
  orders: "aurelia.orders.v1",
  table: "aurelia.table.v1",
  guests: "aurelia.guests.v1",
};

/* ------------------------------------------------------------------ */
/* Toasts                                                              */
/* ------------------------------------------------------------------ */

type ToastVariant = "success" | "error";

interface ToastItem {
  id: number;
  title: string;
  message?: string;
  variant: ToastVariant;
}

interface ToastApi {
  push: (toast: {
    title: string;
    message?: string;
    variant?: ToastVariant;
  }) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const remove = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const push = useCallback<ToastApi["push"]>(
    ({ title, message, variant = "success" }) => {
      const id = ++idRef.current;
      setToasts((current) => [...current.slice(-2), { id, title, message, variant }]);
      window.setTimeout(() => remove(id), 4000);
    },
    [remove],
  );

  const api = useMemo(() => ({ push }), [push]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 items-end pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="pointer-events-auto w-80 max-w-[calc(100vw-3rem)] bg-surface-container-high border border-primary/30 rounded-xl shadow-[0_20px_48px_-12px_rgba(0,0,0,0.8)] p-4 flex items-start gap-3"
            >
              <span
                className={`mt-0.5 shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                  toast.variant === "success"
                    ? "bg-primary text-on-primary"
                    : "bg-error-container text-on-error-container"
                }`}
              >
                {toast.variant === "success" ? (
                  <Check size={13} strokeWidth={3} />
                ) : (
                  <CircleAlert size={13} strokeWidth={3} />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-title-md text-title-md text-on-surface">
                  {toast.title}
                </p>
                {toast.message ? (
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    {toast.message}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                aria-label="Dismiss notification"
                onClick={() => remove(toast.id)}
                className="text-outline hover:text-on-surface transition-colors"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

/* ------------------------------------------------------------------ */
/* Products                                                            */
/* ------------------------------------------------------------------ */

interface ProductsApi {
  products: Product[];
  ready: boolean;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  nextProductId: () => string;
}

const ProductsContext = createContext<ProductsApi | null>(null);

function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(SEED_PRODUCTS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEYS.products);
      if (raw) {
        const parsed = JSON.parse(raw) as Product[];
        if (Array.isArray(parsed) && parsed.length) setProducts(parsed);
      }
    } catch {
      /* ignore corrupted storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(KEYS.products, JSON.stringify(products));
  }, [products, ready]);

  const addProduct = useCallback((product: Product) => {
    setProducts((current) => [...current, product]);
  }, []);

  const updateProduct = useCallback((product: Product) => {
    setProducts((current) =>
      current.map((item) => (item.id === product.id ? product : item)),
    );
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((current) => current.filter((item) => item.id !== id));
  }, []);

  const nextProductId = useCallback(() => {
    const numbers = products
      .map((product) => Number(product.id.replace(/\D/g, "")))
      .filter((value) => Number.isFinite(value));
    const max = numbers.length ? Math.max(...numbers) : 0;
    return `F${String(max + 1).padStart(3, "0")}`;
  }, [products]);

  const api = useMemo(
    () => ({ products, ready, addProduct, updateProduct, deleteProduct, nextProductId }),
    [products, ready, addProduct, updateProduct, deleteProduct, nextProductId],
  );

  return (
    <ProductsContext.Provider value={api}>{children}</ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
}

/* ------------------------------------------------------------------ */
/* Cart                                                                */
/* ------------------------------------------------------------------ */

interface CartApi {
  lines: CartLine[];
  items: { product: Product; qty: number; lineTotal: number }[];
  units: number;
  subtotal: number;
  service: number;
  tax: number;
  total: number;
  prepMinutes: number;
  tableId: string;
  tableLabel: string;
  guests: number;
  ready: boolean;
  add: (productId: string, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  setTable: (tableId: string) => void;
  setGuests: (guests: number) => void;
}

const CartContext = createContext<CartApi | null>(null);

const seedLines: CartLine[] = Object.entries(SEED_CART).map(
  ([productId, qty]) => ({ productId, qty }),
);

function CartProvider({
  children,
  products,
}: {
  children: ReactNode;
  products: Product[];
}) {
  const [lines, setLines] = useState<CartLine[]>(seedLines);
  const [tableId, setTableId] = useState<string>(DEFAULT_TABLE_ID);
  const [guests, setGuestsState] = useState<number>(DEFAULT_GUESTS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const rawCart = window.localStorage.getItem(KEYS.cart);
      if (rawCart) {
        const parsed = JSON.parse(rawCart) as CartLine[];
        if (Array.isArray(parsed)) setLines(parsed);
      }
      const rawTable = window.localStorage.getItem(KEYS.table);
      if (rawTable) setTableId(rawTable);
      const rawGuests = window.localStorage.getItem(KEYS.guests);
      if (rawGuests) setGuestsState(Number(rawGuests) || DEFAULT_GUESTS);
    } catch {
      /* ignore corrupted storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(KEYS.cart, JSON.stringify(lines));
  }, [lines, ready]);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(KEYS.table, tableId);
    window.localStorage.setItem(KEYS.guests, String(guests));
  }, [tableId, guests, ready]);

  const validLines = useMemo(
    () =>
      lines.filter((line) =>
        products.some((product) => product.id === line.productId),
      ),
    [lines, products],
  );

  const add = useCallback((productId: string, qty = 1) => {
    setLines((current) => {
      const existing = current.find((line) => line.productId === productId);
      if (existing) {
        return current.map((line) =>
          line.productId === productId
            ? { ...line, qty: line.qty + qty }
            : line,
        );
      }
      return [...current, { productId, qty }];
    });
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    setLines((current) =>
      current.map((line) =>
        line.productId === productId ? { ...line, qty: Math.max(1, qty) } : line,
      ),
    );
  }, []);

  const remove = useCallback((productId: string) => {
    setLines((current) => current.filter((line) => line.productId !== productId));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const setTable = useCallback((next: string) => setTableId(next), []);
  const setGuests = useCallback(
    (next: number) => setGuestsState(Math.max(1, next)),
    [],
  );

  const items = useMemo(
    () =>
      validLines
        .map((line) => {
          const product = products.find((p) => p.id === line.productId);
          if (!product) return null;
          return { product, qty: line.qty, lineTotal: product.price * line.qty };
        })
        .filter(
          (item): item is { product: Product; qty: number; lineTotal: number } =>
            item !== null,
        ),
    [validLines, products],
  );

  const totals = useMemo(() => computeTotals(validLines, products), [validLines, products]);

  const table = DINING_TABLES.find((item) => item.id === tableId) ?? DINING_TABLES[3];
  const tableLabel = `${table.label} • ${table.zone}`;

  const prepMinutes = totals.units > 0 ? totals.units + 1 : 0;

  const api = useMemo<CartApi>(
    () => ({
      lines: validLines,
      items,
      units: totals.units,
      subtotal: totals.subtotal,
      service: totals.service,
      tax: totals.tax,
      total: totals.total,
      prepMinutes,
      tableId,
      tableLabel,
      guests,
      ready,
      add,
      setQty,
      remove,
      clear,
      setTable,
      setGuests,
    }),
    [
      validLines,
      items,
      totals,
      prepMinutes,
      tableId,
      tableLabel,
      guests,
      ready,
      add,
      setQty,
      remove,
      clear,
      setTable,
      setGuests,
    ],
  );

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

/* ------------------------------------------------------------------ */
/* Orders                                                              */
/* ------------------------------------------------------------------ */

interface OrdersApi {
  orders: Order[];
  ready: boolean;
  submitOrder: (params: { draft?: boolean }) => Order | null;
  advanceStatus: (id: string) => void;
  setStatus: (id: string, status: OrderStatus) => void;
  removeOrder: (id: string) => void;
}

const OrdersContext = createContext<OrdersApi | null>(null);

function OrdersProvider({
  children,
  products,
  cart,
}: {
  children: ReactNode;
  products: Product[];
  cart: CartApi;
}) {
  const [orders, setOrders] = useState<Order[]>(SEED_ORDERS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEYS.orders);
      if (raw) {
        const parsed = JSON.parse(raw) as Order[];
        if (Array.isArray(parsed) && parsed.length) setOrders(parsed);
      }
    } catch {
      /* ignore corrupted storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(KEYS.orders, JSON.stringify(orders));
  }, [orders, ready]);

  const submitOrder = useCallback(
    ({ draft = false }: { draft?: boolean }) => {
      if (!cart.lines.length) return null;
      const order = buildOrder({
        id: nextOrderId(orders),
        table: cart.tableLabel,
        guests: cart.guests,
        lines: cart.lines,
        products,
        draft,
      });
      setOrders((current) => {
        const base = draft ? current.filter((order) => !order.draft) : current;
        return [order, ...base];
      });
      return order;
    },
    [cart.lines, cart.tableLabel, cart.guests, orders, products],
  );

  const advanceStatus = useCallback((id: string) => {
    setOrders((current) =>
      current.map((order) => {
        if (order.id !== id || order.status === "completed") return order;
        const next: Record<OrderStatus, OrderStatus> = {
          pending: "preparing",
          preparing: "ready",
          ready: "completed",
          completed: "completed",
        };
        return { ...order, status: next[order.status], draft: false };
      }),
    );
  }, []);

  const setStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((current) =>
      current.map((order) =>
        order.id === id ? { ...order, status, draft: false } : order,
      ),
    );
  }, []);

  const removeOrder = useCallback((id: string) => {
    setOrders((current) => current.filter((order) => order.id !== id));
  }, []);

  const api = useMemo(
    () => ({ orders, ready, submitOrder, advanceStatus, setStatus, removeOrder }),
    [orders, ready, submitOrder, advanceStatus, setStatus, removeOrder],
  );

  return (
    <OrdersContext.Provider value={api}>{children}</OrdersContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within OrdersProvider");
  return ctx;
}

/* ------------------------------------------------------------------ */
/* Root provider                                                       */
/* ------------------------------------------------------------------ */

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <ProductsProvider>
        <CartShell>{children}</CartShell>
      </ProductsProvider>
    </ToastProvider>
  );
}

function CartShell({ children }: { children?: ReactNode }) {
  const { products } = useProducts();

  return (
    <CartProvider products={products}>
      <OrdersShell>{children}</OrdersShell>
    </CartProvider>
  );
}

function OrdersShell({ children }: { children?: ReactNode }) {
  const { products } = useProducts();
  const cart = useCart();

  return (
    <OrdersProvider products={products} cart={cart}>
      {children}
    </OrdersProvider>
  );
}
