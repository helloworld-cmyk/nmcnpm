"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, type FormEvent } from "react";
import { useBookingDetailStore } from "@/global-states/booking-detail-store";
import { useSessionStore } from "@/global-states/session-store";

/*
 * Gom state và luồng của khối đặt chỗ màn chi tiết: điền sẵn thông tin từ
 * phiên, dòng ghế đã chọn, và submit (validate, yêu cầu đăng nhập, điều hướng).
 */
export function useBookingPanel() {
  const router = useRouter();

  const values = useBookingDetailStore((state) => state.values);
  const agree = useBookingDetailStore((state) => state.agree);
  const invalid = useBookingDetailStore((state) => state.invalid);
  const status = useBookingDetailStore((state) => state.status);
  const submitting = useBookingDetailStore((state) => state.submitting);
  const totalLoading = useBookingDetailStore((state) => state.totalLoading);
  const selectedSeats = useBookingDetailStore((state) => state.selectedSeats);
  const setField = useBookingDetailStore((state) => state.setField);
  const setAgree = useBookingDetailStore((state) => state.setAgree);
  const submit = useBookingDetailStore((state) => state.submit);
  const cancelFlow = useBookingDetailStore((state) => state.cancelFlow);
  const user = useSessionStore((state) => state.user);

  const statusRef = useRef<HTMLDivElement>(null);
  const prefilled = useRef(false);

  useEffect(() => cancelFlow, [cancelFlow]);

  /* Điền sẵn tên/SĐT từ phiên đăng nhập khi mở màn (chỉ một lần) */
  useEffect(() => {
    if (prefilled.current || !user) return;
    prefilled.current = true;
    const current = useBookingDetailStore.getState().values;
    if (!current.name.trim() && user.name) setField("name", user.name);
    if (!current.phone.trim() && user.phone) setField("phone", user.phone);
  }, [user, setField]);

  const seatLine = selectedSeats.length
    ? `${selectedSeats.length} · ${selectedSeats.map((seat) => seat.seatCode).join(", ")}`
    : "0";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = submit((bookingId) =>
      router.push(`/dat-cho-thanh-cong?booking=${encodeURIComponent(bookingId)}`),
    );

    if (!result.ok) {
      if (result.needsAuth) {
        /* Chưa đăng nhập → sang màn đăng nhập, quay lại đây khi xong */
        const next = `/chi-tiet-chuyen?trip=${encodeURIComponent(
          new URLSearchParams(window.location.search).get("trip") || "",
        )}`;
        router.push(`/dang-nhap?next=${encodeURIComponent(next)}`);
        return;
      }
      statusRef.current?.focus();
    }
  };

  return {
    values,
    agree,
    invalid,
    status,
    submitting,
    totalLoading,
    selectedSeats,
    setField,
    setAgree,
    seatLine,
    statusRef,
    handleSubmit,
  };
}
