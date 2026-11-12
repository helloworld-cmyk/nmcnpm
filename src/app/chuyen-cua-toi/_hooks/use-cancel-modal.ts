"use client";

import { useEffect, useMemo, useRef } from "react";
import { tripsOfTab, useTripsStore } from "@/global-states/trips-store";

/*
 * Quản lý hộp thoại hủy chuyến: chuyến mục tiêu, khoá cuộn nền, đóng bằng
 * Escape, giữ/trả focus và các action hủy của store.
 */
export function useCancelModal() {
  const cancelTargetId = useTripsStore((state) => state.cancelTargetId);
  const cancelProcessing = useTripsStore((state) => state.cancelProcessing);
  const actionError = useTripsStore((state) => state.actionError);
  const trips = useTripsStore((state) => state.trips);
  const closeCancel = useTripsStore((state) => state.closeCancel);
  const confirmCancel = useTripsStore((state) => state.confirmCancel);

  const cardRef = useRef<HTMLDivElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const open = Boolean(cancelTargetId);
  const target = useMemo(
    () =>
      cancelTargetId
        ? tripsOfTab(trips, "sap-toi").find((trip) => trip.id === cancelTargetId)
        : undefined,
    [trips, cancelTargetId],
  );

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

  return {
    open,
    target,
    cardRef,
    cancelProcessing,
    actionError,
    closeCancel,
    confirmCancel,
  };
}
