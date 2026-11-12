"use client";

import { useCallback, useRef } from "react";
import type { BookingField } from "../_utils/validators";

/* Giữ ref các ô của form tìm chuyến để focus về ô lỗi khi submit */
export function useBookingFormFields() {
  const fieldRefs = useRef<Partial<Record<BookingField, HTMLElement | null>>>(
    {},
  );

  const registerField = useCallback(
    (field: BookingField) => (element: HTMLElement | null) => {
      fieldRefs.current[field] = element;
    },
    [],
  );

  const focusField = useCallback((field: BookingField) => {
    fieldRefs.current[field]?.focus();
  }, []);

  return { registerField, focusField };
}
