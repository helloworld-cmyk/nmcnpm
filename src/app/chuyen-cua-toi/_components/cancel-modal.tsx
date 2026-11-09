"use client";

import { useEffect, useRef } from "react";
import { IconClose } from "@/components/icons";
import { tripsOfTab, useTripsStore } from "@/global-states/trips-store";

const CARD_REF =
  "relative flex max-h-[calc(100vh-40px)] w-[min(100%,460px)] flex-col overflow-auto rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-[30px] text-center shadow-[var(--shadow-lg)] animate-[panelIn_var(--dur)_var(--ease)] max-[400px]:p-[24px_18px]";

const FEE_ROW = "flex items-center justify-between gap-3.5 py-[5px] text-sm text-[var(--slate-600)]";

export function CancelModal() {
  const cancelTargetId = useTripsStore((state) => state.cancelTargetId);
  const cancelProcessing = useTripsStore((state) => state.cancelProcessing);
  const trips = useTripsStore((state) => state.trips);
  const closeCancel = useTripsStore((state) => state.closeCancel);
  const confirmCancel = useTripsStore((state) => state.confirmCancel);

  const cardRef = useRef<HTMLDivElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const open = Boolean(cancelTargetId);
  const target = cancelTargetId
    ? tripsOfTab(trips, "sap-toi").find((trip) => trip.id === cancelTargetId)
    : undefined;

  useEffect(() => {
    if (!open) return;

    lastFocusRef.current = document.activeElement as HTMLElement | null;
    cardRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCancel();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      lastFocusRef.current?.focus();
      lastFocusRef.current = null;
    };
  }, [open, closeCancel]);

  if (!open || !target) return null;

  return (
    <div
      className="fixed inset-0 z-90 flex items-center justify-center p-5 max-[400px]:p-3.5"
      id="cancelModal"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[var(--navy-950)] opacity-55"
        onClick={closeCancel}
      />

      <div
        aria-describedby="cancelDesc"
        aria-labelledby="cancelTitle"
        aria-modal="true"
        className={CARD_REF}
        ref={cardRef}
        role="dialog"
        tabIndex={-1}
      >
        <button
          aria-label="Đóng hộp thoại"
          className="absolute top-3.5 right-3.5 inline-flex size-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--slate-500)] transition-[background,color] duration-[var(--dur)] ease-[var(--ease)] hover:bg-[var(--sky-50)] hover:text-[var(--sky-700)]"
          type="button"
          onClick={closeCancel}
        >
          <IconClose />
        </button>

        <span className="mx-auto mb-3.5 grid size-14 place-items-center rounded-full bg-[var(--orange-100)] text-[var(--orange-600)]">
          <IconClose className="size-[26px]" />
        </span>

        <h2 className="font-heading text-[21px] font-extrabold leading-[1.2] tracking-[-0.02em] text-[var(--ink)]" id="cancelTitle">
          Hủy chuyến này?
        </h2>
        <p className="mt-2.5 text-[15px] leading-[1.6] text-[var(--slate-600)]" id="cancelDesc">
          Vé <strong className="font-bold text-[var(--ink)]">{target.id}</strong>{" "}
          · Hà Nội đi {target.route}. Ghế đã chọn sẽ được giải phóng cho hành
          khách khác.
        </p>

        <div className="mt-[18px] rounded-[var(--radius-md)] border border-[var(--border-soft)] bg-[var(--bg)] p-[14px_16px] text-left">
          <div className={FEE_ROW}>
            <span>Hủy trước 2 giờ khởi hành</span>
            <strong className="whitespace-nowrap font-heading font-extrabold text-[var(--ink)]">
              Miễn phí
            </strong>
          </div>
          <div className={FEE_ROW}>
            <span>Trong 2 giờ trước giờ chạy</span>
            <strong className="whitespace-nowrap font-heading font-extrabold text-[var(--red-600)]">
              Phí 20% giá vé
            </strong>
          </div>
        </div>

        <p className="mt-3.5 text-[13.5px] leading-[1.55] text-[var(--slate-500)]">
          Bạn chưa thanh toán cho chuyến này — không phát sinh hoàn tiền. Vé
          đã hủy sẽ hiển thị trong tab Đã hủy của Chuyến của tôi.
        </p>

        <div className="mt-[22px] flex gap-3 max-[400px]:flex-col">
          <button
            className="btn btn-ghost flex-1"
            type="button"
            onClick={closeCancel}
          >
            Giữ vé
          </button>
          <button
            aria-busy={cancelProcessing}
            className={`btn btn-primary flex-1 ${cancelProcessing ? "is-loading" : ""}`}
            id="confirmCancelBtn"
            type="button"
            onClick={confirmCancel}
          >
            <span className="btn-label">
              {cancelProcessing ? "Đang xử lý..." : "Xác nhận hủy"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
