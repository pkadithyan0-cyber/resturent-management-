"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  eyebrow?: string;
  children: ReactNode;
  maxWidth?: string;
}

export default function Modal({
  open,
  onClose,
  title,
  eyebrow,
  children,
  maxWidth = "max-w-xl",
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div
            className="absolute inset-0 bg-surface-container-lowest/85 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={`relative w-full ${maxWidth} bg-surface-container rounded-xl border border-surface-container-highest/60 shadow-[0_20px_48px_-12px_rgba(0,0,0,0.8),0_0_24px_-4px_rgba(212,175,55,0.05)] max-h-[85vh] overflow-y-auto scrollbar-none`}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="flex items-start justify-between gap-4 p-space-md pb-0">
              <div>
                {eyebrow ? (
                  <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest block mb-1">
                    {eyebrow}
                  </span>
                ) : null}
                <h2 className="font-headline-sm text-headline-sm text-on-surface tracking-wide">
                  {title}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close dialog"
                onClick={onClose}
                className="p-1.5 text-outline hover:text-error transition-colors rounded-lg hover:bg-error-container/20"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-space-md">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
