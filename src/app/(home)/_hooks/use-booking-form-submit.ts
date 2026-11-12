"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, type FormEvent } from "react";
import { useBookingFormStore } from "@/global-states/booking-form-store";
import type { BookingField } from "../_utils/validators";

/*
 * Xử lý submit form tìm chuyến: validate qua store, focus ô lỗi và điều hướng
 * sang trang kết quả. Đồng thời cuộn form vào khung nhìn khi có yêu cầu
 * điền sẵn tuyến (prefillId).
 */
export function useBookingFormSubmit(
  focusField: (field: BookingField) => void,
) {
  const router = useRouter();
  const startSearch = useBookingFormStore((state) => state.startSearch);
  const prefillId = useBookingFormStore((state) => state.prefillId);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (prefillId === 0) return;

    const form = formRef.current;
    if (!form) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    form.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "center",
    });
  }, [prefillId]);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const result = startSearch();
      if (!result.ok) {
        focusField(result.field);
        return;
      }

      /* Tìm chuyến thật trên trang kết quả — chuyển hướng ngay */
      router.push(`/ket-qua-tim-chuyen?${result.query}`);
    },
    [startSearch, router, focusField],
  );

  return { formRef, handleSubmit };
}
