"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, type FormEvent } from "react";
import { useLoginStore } from "@/global-states/login-store";
import type { LoginField } from "../_utils/login-validators";
import { readNextPath } from "../_utils/next-path";

/*
 * Xử lý submit của màn đăng nhập: gọi action trong login-store (đăng nhập thật
 * qua API), focus về ô lỗi (nếu có), điều hướng khi thành công
 * và huỷ luồng đang chạy khi component unmount.
 */
export function useLoginSubmit(
  focusInvalidField: (field: LoginField | null) => void,
) {
  const router = useRouter();
  const submit = useLoginStore((state) => state.submit);
  const cancelFlow = useLoginStore((state) => state.cancelFlow);
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
        router.push(readNextPath());
      });
      if (!result.ok) focusInvalidField(result.field);
    },
    [submit, router, focusInvalidField],
  );
}
