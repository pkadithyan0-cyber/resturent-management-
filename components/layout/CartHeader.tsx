"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { useClock } from "@/lib/useClock";

interface CartHeaderProps {
  search: string;
  onSearch: (value: string) => void;
  cartCount: number;
}

export default function CartHeader({
  search,
  onSearch,
  cartCount,
}: CartHeaderProps) {
  const pathname = usePathname();
  const time = useClock(true);
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/menu", label: "Items & Menu" },
    { href: "/cart", label: "Cart List" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.6)]">
      <div className="h-20 max-w-[1600px] mx-auto px-margin flex items-center justify-between gap-gutter">
        <div className="flex items-center gap-space-md">
          <Link href="/menu" className="flex flex-col">
            <span className="font-headline-sm text-headline-sm tracking-wide text-primary uppercase">
              Aurelia
            </span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
              Atelier &amp; Dining Room Management
            </span>
          </Link>
          <div className="hidden xl:flex items-center gap-space-xs px-space-sm py-space-xs rounded-lg bg-surface-container-high">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase">
              Evening Service • Private Dining Active
            </span>
          </div>
        </div>

        <div className="flex items-center gap-space-lg">
          <nav className="hidden md:flex items-center bg-surface-container-lowest p-1 rounded-lg gap-1">
            {links.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`px-space-md py-space-xs font-label-lg text-label-lg transition-colors tracking-wide flex items-center gap-2 ${
                    active
                      ? "bg-primary-container text-on-primary-container font-semibold rounded-lg"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <span>{link.label}</span>
                  {link.href === "/cart" ? (
                    <span className="px-1.5 py-0.5 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm">
                      {cartCount}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center relative w-64">
            <Search
              size={18}
              className="absolute left-3 text-outline pointer-events-none"
            />
            <input
              className="w-full bg-surface-container-low pl-9 pr-4 py-1.5 rounded-lg text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:bg-surface-container transition-colors"
              placeholder="Search cellar & plate..."
              type="text"
              value={search}
              onChange={(event) => onSearch(event.target.value)}
            />
          </div>

          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((value) => !value)}
            className="md:hidden p-2 rounded text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-space-md">
          <div className="flex flex-col text-right">
            <span className="font-label-md text-label-md text-primary tracking-widest">
              {time ?? "--:--:--"}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
              Service Epoch II
            </span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="md:hidden overflow-hidden border-t border-surface-container-highest/40 bg-surface/95 backdrop-blur-xl"
          >
            <div className="px-margin py-space-sm flex flex-col gap-space-sm">
              <div className="relative flex items-center">
                <Search
                  size={18}
                  className="absolute left-3 text-outline pointer-events-none"
                />
                <input
                  className="w-full bg-surface-container-low pl-9 pr-4 py-2 rounded-lg text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:bg-surface-container transition-colors"
                  placeholder="Search cellar & plate..."
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
                      className={`px-space-md py-space-xs font-label-lg text-label-lg transition-colors tracking-wide rounded ${
                        active
                          ? "bg-primary-container text-on-primary-container font-semibold"
                          : "text-on-surface-variant"
                      }`}
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
