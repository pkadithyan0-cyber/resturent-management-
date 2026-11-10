"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, ChevronDown, Table, Zap } from "lucide-react";
import { useState } from "react";
import { useCart, useOrders, useToast } from "@/store/AppProvider";
import { DINING_TABLES, GUEST_OPTIONS } from "@/lib/constants";
import { currency } from "@/lib/format";
import { addOrderToGoogleSheet } from "@/lib/google-orders";

export default function AllocationPanel() {
  const cart = useCart();
  const orders = useOrders();
  const { push } = useToast();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const empty = cart.lines.length === 0;

  const handleSend = async () => {
    if (submitting) return;
    if (empty) {
      push({
        title: "No selections to fire",
        message: "Add beverages to the cart before sending the requisition.",
        variant: "error",
      });
      return;
    }
    const order = orders.submitOrder({ draft: false });
    if (!order) return;
    setSubmitting(true);
    try {
      await addOrderToGoogleSheet(order);
    } catch {
      orders.removeOrder(order.id);
      push({
        title: "Order could not be sent",
        message: "Check your connection and try submitting the requisition again.",
        variant: "error",
      });
      setSubmitting(false);
      return;
    }
    cart.clear();
    push({
      title: `${order.id} sent to barista & cellar`,
      message: `${order.table} • ${order.items.length} selections • ${currency(order.total)}`,
    });
    window.setTimeout(() => {
      window.location.assign("/orders");
    }, 650);
  };

  const handleDraft = () => {
    if (empty) {
      push({
        title: "Nothing to save",
        message: "Select beverages before saving a pending guest course.",
        variant: "error",
      });
      return;
    }
    const order = orders.submitOrder({ draft: true });
    if (!order) return;
    push({
      title: "Draft saved",
      message: `${order.id} held as a pending guest course.`,
    });
  };

  return (
    <div className="bg-surface-container-low rounded-lg p-6 border border-surface-container-highest/60 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="flex items-center justify-between pb-4 border-b border-surface-container-highest/50">
        <div>
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest block">
            Floor Protocol
          </span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-wide">
            Service Allocation &amp; Bill
          </h2>
        </div>
        <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
          <Table size={18} />
        </div>
      </div>

      {/* Table destination selector */}
      <div className="mt-5 flex flex-col gap-2">
        <label className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant font-semibold">
          Assigned Table &amp; Dining Zone
        </label>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="w-full flex items-center justify-between bg-surface-container-high px-3.5 py-2.5 rounded-lg border border-surface-container-highest/70 hover:border-primary/40 transition-colors cursor-pointer group text-left"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-title-md text-title-md text-on-surface font-medium">
              {cart.tableLabel}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-on-surface-variant group-hover:text-primary transition-colors">
            <span className="font-label-sm text-label-sm uppercase tracking-wider">
              {cart.guests} Guests
            </span>
            <ChevronDown
              size={16}
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </div>
        </button>

        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16 }}
              className="absolute left-0 right-0 z-20 bg-surface-container-high border border-surface-container-highest/70 rounded-lg shadow-[0_20px_48px_-12px_rgba(0,0,0,0.8)] p-3 flex flex-col gap-3"
              style={{ top: "7.75rem" }}
            >
              <div className="flex flex-col gap-1.5">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">
                  Dining Zone
                </span>
                <div className="flex flex-col gap-1 max-h-44 overflow-y-auto scrollbar-none">
                  {DINING_TABLES.map((table) => {
                    const active = table.id === cart.tableId;
                    return (
                      <button
                        key={table.id}
                        type="button"
                        onClick={() => {
                          cart.setTable(table.id);
                          setOpen(false);
                        }}
                        className={`flex items-center justify-between px-2.5 py-2 rounded transition-colors text-left ${
                          active
                            ? "bg-surface-container text-primary"
                            : "text-on-surface-variant hover:bg-surface-container"
                        }`}
                      >
                        <span className="font-body-md text-body-md">
                          {table.label} • {table.zone}
                        </span>
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${active ? "bg-primary" : "bg-outline-variant"}`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">
                  Guest Count
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {GUEST_OPTIONS.map((value) => {
                    const active = value === cart.guests;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => cart.setGuests(value)}
                        className={`min-w-9 px-2 py-1.5 rounded font-label-md text-label-md transition-colors ${
                          active
                            ? "bg-primary text-on-primary"
                            : "bg-surface-container text-on-surface-variant hover:text-on-surface"
                        }`}
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Pacing protocol */}
      <div className="mt-5 flex flex-col gap-2">
        <label className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant font-semibold">
          Dispatch Pacing Sequence
        </label>
        <div className="grid grid-cols-2 gap-2 bg-surface-container-lowest p-1 rounded-lg">
          <button
            type="button"
            className="py-2 px-3 rounded bg-surface-container-high text-primary font-label-md text-label-md uppercase tracking-wider font-semibold shadow-sm flex items-center justify-center gap-1.5 border border-primary/20"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Fire Now (Immediate)
          </button>
        </div>
      </div>

      {/* Financial breakdown */}
      <div className="mt-6 pt-5 border-t border-surface-container-highest/50 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-body-md text-body-md text-on-surface-variant">
            Subtotal ({cart.units} Beverages)
          </span>
          <span className="font-title-md text-title-md text-on-surface font-medium">
            {currency(cart.subtotal)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="font-body-md text-body-md text-on-surface-variant">
              Hospitality &amp; Service
            </span>
            <span className="px-1.5 py-0.2 rounded bg-surface-container text-primary font-label-sm text-label-sm">
              10%
            </span>
          </div>
          <span className="font-title-md text-title-md text-on-surface font-medium">
            {currency(cart.service)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-body-md text-body-md text-on-surface-variant">
            Sommelier Reserve &amp; Excise Tax
          </span>
          <span className="font-title-md text-title-md text-on-surface font-medium">
            {currency(cart.tax)}
          </span>
        </div>

        <div className="mt-2 pt-4 border-t border-surface-container-highest/60 flex items-baseline justify-between">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline block">
              Total Balance Due
            </span>
            <span className="font-headline-md text-headline-md font-display-md text-on-surface font-semibold tracking-tight">
              Balance Net
            </span>
          </div>
          <div className="text-right">
            <span className="font-display-md text-display-md text-primary font-bold tracking-tight">
              {currency(cart.total)}
            </span>
            <span className="block font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mt-0.5">
              USD • Gratuity Inc.
            </span>
          </div>
        </div>
      </div>

      {/* Primary CTA */}
      <div className="mt-6 flex flex-col gap-3">
        <button
          type="button"
          onClick={handleSend}
          disabled={empty || submitting}
          className="w-full py-4 px-6 rounded bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-title-lg text-title-lg font-semibold tracking-wide uppercase transition-all duration-300 shadow-[0_0_24px_rgba(212,175,55,0.25)] hover:shadow-[0_0_32px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary-container"
        >
          <span>{submitting ? "Sending order…" : "Send Order to Barista & Cellar"}</span>
          <Zap size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          type="button"
          onClick={handleDraft}
          disabled={empty}
          className="w-full py-2.5 px-4 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-md text-label-md uppercase tracking-widest font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Draft as Pending Guest Course
        </button>
      </div>

      {/* Quality protocol note */}
      <div className="mt-5 p-3 rounded bg-surface-container-lowest/80 border border-surface-container-highest/30 flex items-start gap-2.5">
        <BadgeCheck size={18} className="text-primary shrink-0 mt-0.5" />
        <p className="font-body-sm text-body-sm text-on-surface-variant leading-tight">
          All artisanal beverages freshly prepared upon requisition fire.
          Synchronized to Aurelia&apos;s fine dining pacing matrix.
        </p>
      </div>
    </div>
  );
}
