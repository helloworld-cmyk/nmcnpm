"use client";

import { useCallback, useRef } from "react";
import type { LoginField } from "../_utils/login-validators";

/* Quản lý ref các ô input của màn đăng nhập để focus về ô lỗi khi submit */
export function useLoginFields() {
  const fieldRefs = useRef<
    Partial<Record<LoginField, HTMLInputElement | null>>
  >({});

  const registerRef = useCallback(
    (field: LoginField) => (element: HTMLInputElement | null) => {
      fieldRefs.current[field] = element;
    },
    [],
  );

  const focusField = useCallback((field: LoginField | null) => {
    if (!field) return;
    fieldRefs.current[field]?.focus();
  }, []);

  return { registerRef, focusField };
}
