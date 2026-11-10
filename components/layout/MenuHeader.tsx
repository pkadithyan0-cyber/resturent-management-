"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useClock } from "@/lib/useClock";

const ACTIVE_NAV =
  "bg-surface-container-high text-primary shadow-[inset_0_0_12px_rgba(212,175,55,0.08)]";

interface MenuHeaderProps {
  search: string;
  onSearch: (value: string) => void;
  cartCount: number;
}

export default function MenuHeader({
  search,
  onSearch,
  cartCount,
}: MenuHeaderProps) {
  const pathname = usePathname();
  const time = useClock();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/menu", label: "Menu & Items" },
    { href: "/orders", label: "Live Orders" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.45)]">
      <div className="h-20 w-full px-space-md lg:px-space-lg flex items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-lg">
          <Link href="/menu" className="flex flex-col justify-center select-none">
            <div className="flex items-center gap-space-xs">
              <span className="font-headline-sm text-headline-sm text-primary tracking-widest uppercase">
                Aurelia
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-primary-container shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
            </div>
            <span className="font-label-sm text-label-sm uppercase text-on-surface-variant/80 tracking-[0.2em]">
              Atelier &amp; Dining Room Management
            </span>
          </Link>

          <div className="h-7 w-[1px] bg-outline-variant/30 hidden lg:block" />

          <nav className="hidden md:flex items-center gap-space-xs">
            {links.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`px-space-md py-space-xs rounded font-label-lg uppercase tracking-wider transition-all duration-300 hover:text-on-surface hover:bg-surface-container ${
                    active ? ACTIVE_NAV : "text-on-surface-variant"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-space-md">
          <div className="relative hidden md:flex items-center">
            <Search
              size={18}
              className="absolute left-3 text-outline pointer-events-none"
            />
            <input
              className="w-60 lg:w-72 bg-surface-container-low pl-9 pr-space-sm py-1.5 rounded font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container transition-all"
              placeholder="Search dishes, tables, wines..."
              type="text"
              value={search}
              onChange={(event) => onSearch(event.target.value)}
            />
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-space-sm py-1 rounded bg-surface-container-low/70">
            <Clock size={16} className="text-outline" />
            <span className="font-label-md text-label-md tracking-wider text-on-surface">
              {time ?? "--:--"}
            </span>
          </div>

          <Link
            href="/cart"
            aria-label="Open cart list"
            className="flex items-center gap-space-xs pl-space-xs py-1 pr-space-sm rounded bg-surface-container-low/80 hover:bg-surface-container transition-colors group"
          >
            <div className="flex items-center gap-1.5 text-on-surface-variant group-hover:text-primary transition-colors">
              <ShoppingBag size={16} />
              <span className="px-1.5 py-0.5 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm">
                {cartCount}
              </span>
            </div>
          </Link>

          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((value) => !value)}
            className="md:hidden p-2 rounded text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="md:hidden overflow-hidden border-t border-surface-container-highest/40 bg-surface-container-lowest/95 backdrop-blur-xl"
          >
            <div className="px-space-md py-space-sm flex flex-col gap-space-sm">
              <div className="relative flex items-center">
                <Search
                  size={18}
                  className="absolute left-3 text-outline pointer-events-none"
                />
                <input
                  className="w-full bg-surface-container-low pl-9 pr-space-sm py-2 rounded font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container transition-all"
                  placeholder="Search dishes, tables, wines..."
                  type="text"
                  value={search}
                  onChange={(event) => onSearch(event.target.value)}
                />
              </div>
              <nav className="flex flex-col gap-1">
                {links.map((link) => {
                  const active = pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`px-space-md py-space-xs rounded font-label-lg uppercase tracking-wider transition-all ${active ? ACTIVE_NAV : "text-on-surface-variant"}`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
