"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { IconClose } from "@/components/icons";

const OVERLAY =
  "fixed inset-0 z-90 flex items-center justify-center p-5 max-[400px]:p-3.5";

const CARD =
  "scroll-area relative flex max-h-[calc(100vh-40px)] w-[min(100%,420px)] flex-col overflow-auto rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-[30px] text-center shadow-[var(--shadow-lg)] animate-[panelIn_var(--dur)_var(--ease)] max-[400px]:p-[24px_18px]";

const CLOSE_BTN =
  "absolute top-3.5 right-3.5 inline-flex size-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--slate-500)] transition-[background,color] duration-[var(--dur)] ease-[var(--ease)] hover:bg-[var(--sky-50)] hover:text-[var(--sky-700)]";

const ICON_WRAP =
  "mx-auto mb-3.5 grid size-14 place-items-center rounded-full bg-[var(--red-50)] text-[var(--red-600)]";

const TITLE =
  "font-heading text-[21px] font-extrabold leading-[1.2] tracking-[-0.02em] text-[var(--ink)]";

const DESCRIPTION = "mt-2.5 text-[15px] leading-[1.6] text-[var(--slate-600)]";

const ERROR = "mt-2.5 text-[14px] leading-[1.6] font-medium text-[var(--red-600)]";

const ACTIONS = "mt-[22px] flex gap-3 max-[400px]:flex-col";

const CONFIRM_DANGER =
  "bg-[var(--red-600)] text-white shadow-[0_10px_24px_-14px_rgba(220,38,38,0.9)] hover:brightness-95";

export type ConfirmModalProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  icon?: ReactNode;
  danger?: boolean;
  /* Khoá hộp thoại trong lúc đang xử lý hành động xác nhận */
  loading?: boolean;
  /* Lỗi hiển thị ngay trong hộp thoại, giữ hộp thoại mở để thử lại */
  error?: string | null;
  onConfirm: () => void;
  onClose: () => void;
};

export function ConfirmModal({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel,
  icon,
  danger = false,
  loading = false,
  error = null,
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  const uid = useId();
  const titleId = `${uid}-title`;
  const descriptionId = `${uid}-desc`;

  const cardRef = useRef<HTMLDivElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    lastFocusRef.current = document.activeElement as HTMLElement | null;
    cardRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !loading) onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      lastFocusRef.current?.focus();
      lastFocusRef.current = null;
    };
  }, [open, onClose, loading]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className={OVERLAY}>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[var(--navy-950)] opacity-55"
        onClick={loading ? undefined : onClose}
      />

      <div
        aria-describedby={descriptionId}
        aria-labelledby={titleId}
        aria-modal="true"
        className={CARD}
        ref={cardRef}
        role="dialog"
        tabIndex={-1}
      >
        <button
          aria-label="Đóng hộp thoại"
          className={CLOSE_BTN}
          disabled={loading}
          type="button"
          onClick={onClose}
        >
          <IconClose />
        </button>

        {icon && <span className={ICON_WRAP}>{icon}</span>}

        <h2 className={TITLE} id={titleId}>
          {title}
        </h2>
        <p className={DESCRIPTION} id={descriptionId}>
          {description}
        </p>

        {error ? (
          <p className={ERROR} role="alert">
            {error}
          </p>
        ) : null}

        <div className={ACTIONS}>
          <button
            className="btn btn-ghost flex-1"
            disabled={loading}
            type="button"
            onClick={onClose}
          >
            {cancelLabel}
          </button>
          <button
            aria-busy={loading}
            className={`btn flex-1 ${danger ? CONFIRM_DANGER : "btn-primary"}`}
            disabled={loading}
            type="button"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
