"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, type FormEvent } from "react";
import { useRegisterStore } from "@/global-states/register-store";
import type { RegisterField } from "../_utils/register-validators";
import { readNextPath } from "../_utils/next-path";

/*
 * Xử lý submit của màn đăng ký: gọi action trong register-store (đăng ký thật
 * qua API), focus về ô lỗi (nếu có), chuyển sang màn đăng nhập khi thành công
 * (giữ lại ?next= để sau đăng nhập quay về đúng chỗ) và huỷ luồng khi unmount.
 */
export function useRegisterSubmit(
  focusInvalidField: (field: RegisterField | null) => void,
) {
  const router = useRouter();
  const submit = useRegisterStore((state) => state.submit);
  const cancelFlow = useRegisterStore((state) => state.cancelFlow);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      cancelFlow();
    };
  }, [cancelFlow]);

  return useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const result = submit(() => {
        if (!mounted.current) return;
        const next = readNextPath();
        router.push(
          next === "/"
            ? "/dang-nhap"
            : `/dang-nhap?next=${encodeURIComponent(next)}`,
        );
      });
      if (!result.ok) focusInvalidField(result.field);
    },
    [submit, router, focusInvalidField],
  );
}
