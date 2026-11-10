"use client";

import Modal from "./Modal";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  onClose,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      eyebrow="Please Confirm"
      title={title}
      maxWidth="max-w-md"
    >
      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
        {message}
      </p>
      <div className="flex items-center justify-end gap-space-sm pt-space-md">
        <button
          type="button"
          onClick={onClose}
          className="px-space-md py-2 rounded border border-primary-container/25 text-on-surface font-title-md text-title-md hover:text-primary transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="px-space-md py-2 rounded bg-error-container text-on-error-container font-label-md text-label-md tracking-wider uppercase hover:brightness-110 transition-all"
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
