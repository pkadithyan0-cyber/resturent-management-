"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Clock,
  Flame,
  Users,
} from "lucide-react";
import MenuHeader from "@/components/layout/MenuHeader";
import MenuFooter from "@/components/layout/MenuFooter";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useCart, useOrders, useToast } from "@/store/AppProvider";
import {
  NEXT_STATUS,
  NEXT_STATUS_LABEL,
  ORDER_STATUSES,
  STATUS_META,
} from "@/lib/constants";
import { currency } from "@/lib/format";
import type { Order, OrderStatus } from "@/lib/types";

const pad = (value: number) => String(value).padStart(2, "0");

const elapsed = (createdAt: number): string => {
  const minutes = Math.max(0, Math.floor((Date.now() - createdAt) / 60000));
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
};

export default function OrdersView() {
  const orders = useOrders();
  const cart = useCart();
  const { push } = useToast();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [confirming, setConfirming] = useState<Order | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const counts = useMemo(() => {
    const map: Record<OrderStatus, number> = {
      pending: 0,
      preparing: 0,
      ready: 0,
      completed: 0,
    };
    orders.orders.forEach((order) => {
      map[order.status] += 1;
    });
    return map;
  }, [orders.orders]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return orders.orders.filter((order) => {
      if (filter !== "all" && order.status !== filter) return false;
      if (!query) return true;
      const haystack = [
        order.id,
        order.table,
        String(order.guests),
        ...order.items.map((item) => item.name),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [orders.orders, filter, search]);

  const activeCount = counts.pending + counts.preparing + counts.ready;
  const openValue = orders.orders
    .filter((order) => order.status !== "completed")
    .reduce((sum, order) => sum + order.total, 0);

  const handleAdvance = (order: Order) => {
    const next = NEXT_STATUS[order.status];
    if (!next) return;
    orders.advanceStatus(order.id);
    push({
      title: `${order.id} → ${STATUS_META[next].label}`,
      message: `${order.table} • ${currency(order.total)}`,
    });
  };

  const handleRemove = () => {
    if (!confirming) return;
    orders.removeOrder(confirming.id);
    push({
      title: `${confirming.id} dismissed`,
      message: "The ticket was struck from the live rail.",
      variant: "error",
    });
    setConfirming(null);
  };

  return (
    <div className="flex flex-col w-full">
      <MenuHeader search={search} onSearch={setSearch} cartCount={cart.lines.length} />

      <main className="w-full pt-20 bg-background min-h-[calc(100vh-5rem)]">
        <div className="relative w-full overflow-hidden px-space-md lg:px-space-lg py-space-lg">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 -left-24 w-80 h-80 bg-primary-container/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-[1600px] mx-auto flex flex-col gap-space-xl relative z-10">
            <section className="flex flex-col xl:flex-row xl:items-end justify-between gap-space-lg">
              <div className="flex flex-col gap-space-xs max-w-3xl">
                <div className="flex flex-wrap items-center gap-space-xs">
                  <span className="px-space-sm py-0.5 rounded bg-surface-container-high text-primary font-label-sm text-label-sm tracking-widest uppercase shadow-sm">
                    Live Service Rail • {pad(orders.orders.length)} Tickets
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    Evening Service
                  </span>
                </div>
                <h1 className="font-headline-lg text-headline-lg lg:font-display-lg lg:text-display-lg text-on-surface tracking-tight leading-none mt-1">
                  Live Orders &amp;{" "}
                  <span className="italic font-normal text-primary">Service Rail</span>
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1">
                  Real-time ticket flow from pending through preparing, ready and
                  completed. Advance each course as the floor and pass progress.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-xs bg-surface-container-low/90 backdrop-blur-xl p-space-xs rounded-xl shadow-xl w-full xl:w-auto">
                <div className="flex flex-col p-space-sm rounded bg-surface-container/70 shadow-sm">
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest">
                    Active
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-headline-md text-headline-md text-on-surface">
                      {pad(activeCount)}
                    </span>
                    <span className="font-label-sm text-label-sm text-primary">Live</span>
                  </div>
                </div>
                <div className="flex flex-col p-space-sm rounded bg-surface-container/70 shadow-sm">
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest">
                    Pending
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-headline-md text-headline-md text-on-surface">
                      {pad(counts.pending)}
                    </span>
                    <span className="font-label-sm text-label-sm text-outline">Queued</span>
                  </div>
                </div>
                <div className="flex flex-col p-space-sm rounded bg-surface-container/70 shadow-sm">
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest">
                    Ready
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-headline-md text-headline-md text-primary">
                      {pad(counts.ready)}
                    </span>
                    <span className="font-label-sm text-label-sm text-outline">Pass</span>
                  </div>
                </div>
                <div className="flex flex-col p-space-sm rounded bg-surface-container/70 shadow-sm">
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest">
                    Open Value
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-headline-md text-headline-md text-on-surface">
                      {currency(openValue)}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <section className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md p-space-sm rounded-xl bg-surface-container-low/60 backdrop-blur-md shadow-md">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
                <button
                  type="button"
                  onClick={() => setFilter("all")}
                  className={`px-space-md py-space-xs rounded font-label-sm text-label-sm tracking-wider uppercase transition-all flex-shrink-0 ${
                    filter === "all"
                      ? "bg-primary text-on-primary shadow-[0_0_14px_rgba(242,202,80,0.25)]"
                      : "bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
                  }`}
                >
                  All Tickets ({orders.orders.length})
                </button>
                {ORDER_STATUSES.map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setFilter(status)}
                    className={`px-space-md py-space-xs rounded font-label-sm text-label-sm tracking-wider uppercase transition-all flex-shrink-0 ${
                      filter === status
                        ? "bg-primary text-on-primary shadow-[0_0_14px_rgba(242,202,80,0.25)]"
                        : "bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
                    }`}
                  >
                    {STATUS_META[status].label} ({counts[status]})
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-space-xs flex-shrink-0">
                <Link
                  href="/menu"
                  className="flex items-center gap-1.5 px-space-md py-2 rounded border border-primary-container/25 text-on-surface font-label-md text-label-md tracking-wider uppercase hover:text-primary transition-colors"
                >
                  <ArrowRight size={16} className="rotate-180" />
                  <span className="hidden sm:inline">New Requisition</span>
                </Link>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-md">
              {filtered.map((order) => {
                const meta = STATUS_META[order.status];
                const next = NEXT_STATUS[order.status];
                return (
                  <article
                    key={order.id}
                    className="group relative flex flex-col justify-between bg-surface-container/70 backdrop-blur-xl rounded-xl p-space-md shadow-xl transition-all duration-300 hover:bg-surface-container-high/80 border border-white/5 hover:border-primary/30"
                  >
                    <div className="flex flex-col gap-space-sm">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                              {order.id}
                            </span>
                            {order.draft ? (
                              <span className="px-2 py-0.5 rounded bg-surface-container-highest text-outline font-label-sm text-label-sm uppercase tracking-wider">
                                Draft
                              </span>
                            ) : null}
                          </div>
                          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-wide">
                            {order.table}
                          </h3>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-label-sm text-label-sm uppercase tracking-wider ${meta.chip}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                          {meta.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-space-sm text-on-surface-variant font-body-sm text-body-sm">
                        <span className="inline-flex items-center gap-1">
                          <Users size={14} className="text-outline" />
                          {order.guests} guests
                        </span>
                        <span className="text-outline">•</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock size={14} className="text-outline" />
                          {hydrated ? elapsed(order.createdAt) : "—"}
                        </span>
                        <span className="text-outline">•</span>
                        <span className="inline-flex items-center gap-1">
                          <Flame
                            size={14}
                            className={
                              order.pacing === "fire-now" ? "text-primary" : "text-outline"
                            }
                          />
                          {order.pacing === "fire-now" ? "Fire now" : "Scheduled"}
                        </span>
                      </div>

                      <ul className="flex flex-col gap-1.5 pt-2 border-t border-surface-container-highest/40">
                        {order.items.map((item) => (
                          <li
                            key={item.productId}
                            className="flex items-center justify-between gap-2 font-body-sm text-body-sm"
                          >
                            <span className="text-on-surface-variant truncate">
                              <span className="text-primary font-semibold">
                                {item.qty}×
                              </span>{" "}
                              {item.name}
                            </span>
                            <span className="text-on-surface font-medium shrink-0">
                              {currency(item.price * item.qty)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-end justify-between gap-3 pt-3 mt-3 border-t border-surface-container-highest/40">
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                          Ticket Total
                        </span>
                        <span className="font-headline-sm text-headline-sm text-primary font-semibold">
                          {currency(order.total)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setConfirming(order)}
                          aria-label={`Dismiss ${order.id}`}
                          className="p-1.5 text-outline hover:text-error transition-colors rounded-lg hover:bg-error-container/20"
                        >
                          <CircleAlert size={16} />
                        </button>
                        {next ? (
                          <button
                            type="button"
                            onClick={() => handleAdvance(order)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-primary text-on-primary font-label-md text-label-md tracking-wider uppercase shadow-[0_0_14px_rgba(242,202,80,0.25)] hover:bg-primary-fixed transition-all"
                          >
                            {order.status === "ready" ? (
                              <CheckCircle2 size={14} />
                            ) : (
                              <ChevronRight size={14} />
                            )}
                            {NEXT_STATUS_LABEL[order.status]}
                          </button>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface-container-high text-on-surface-variant font-label-md text-label-md tracking-wider uppercase">
                            <CheckCircle2 size={14} className="text-primary" />
                            Closed
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}

              {!filtered.length ? (
                <div className="col-span-full flex flex-col items-center justify-center gap-space-sm bg-surface-container/70 backdrop-blur-xl rounded-xl p-space-xl shadow-xl border border-white/5 text-center">
                  <span className="font-headline-md text-headline-md text-on-surface">
                    No tickets on the rail
                  </span>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                    {orders.orders.length
                      ? `No tickets match “${search}” under the ${filter === "all" ? "all" : STATUS_META[filter as OrderStatus].label} filter.`
                      : "Send a requisition from the cart to place the first ticket on the live service rail."}
                  </p>
                  <Link
                    href="/cart"
                    className="mt-2 inline-flex items-center gap-2 px-space-md py-2 rounded bg-primary text-on-primary font-label-md text-label-md tracking-wider uppercase shadow-[0_0_16px_rgba(242,202,80,0.3)] transition-all hover:bg-primary-fixed"
                  >
                    Open Cart List
                    <ArrowRight size={16} />
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </main>

      <MenuFooter />

      <ConfirmDialog
        open={Boolean(confirming)}
        title={confirming ? `Dismiss ${confirming.id}?` : ""}
        message={
          confirming
            ? `This strikes the ${confirming.table} ticket (${currency(confirming.total)}) from the live service rail. This cannot be undone.`
            : ""
        }
        confirmLabel="Dismiss Ticket"
        onClose={() => setConfirming(null)}
        onConfirm={handleRemove}
      />
    </div>
  );
}
