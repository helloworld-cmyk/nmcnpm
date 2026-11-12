"use client";

import { useCallback, useRef } from "react";
import type { RegisterField } from "../_utils/register-validators";

/* Quản lý ref các ô input của màn đăng ký để focus về ô lỗi khi submit */
export function useRegisterFields() {
  const fieldRefs = useRef<
    Partial<Record<RegisterField, HTMLInputElement | null>>
  >({});

  const registerRef = useCallback(
    (field: RegisterField) => (element: HTMLInputElement | null) => {
      fieldRefs.current[field] = element;
    },
    [],
  );

  const focusField = useCallback((field: RegisterField | null) => {
    if (!field) return;
    fieldRefs.current[field]?.focus();
  }, []);

  return { registerRef, focusField };
}
