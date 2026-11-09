"use client";

import { useCallback, useState } from "react";
import { IconEye, IconEyeOff } from "@/components/icons";
import { AuthField, type AuthFieldProps } from "./auth-field";

const TOGGLE_BASE =
  "absolute top-1/2 right-0.5 grid size-11 -translate-y-1/2 place-items-center rounded-[10px] text-[var(--slate-500)] transition-[color,background] duration-[var(--dur)] ease-[var(--ease)] hover:bg-[var(--sky-50)] hover:text-[var(--sky-700)]";

const TOGGLE_ICON = "size-[18px]";

type AuthPasswordFieldProps = Omit<AuthFieldProps, "type" | "trailing">;

/* Ô mật khẩu dùng chung: ẩn/hiện bằng toggle nội bộ; màn nào cần hint
 * (ví dụ thanh đo độ mạnh của màn đăng ký) tự truyền qua prop hint. */
export function AuthPasswordField({
  id,
  value,
  ...fieldProps
}: AuthPasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const toggle = useCallback(() => setVisible((prev) => !prev), []);

  return (
    <AuthField
      {...fieldProps}
      id={id}
      value={value}
      type={visible ? "text" : "password"}
      trailing={
        <button
          type="button"
          className={TOGGLE_BASE}
          aria-controls={id}
          aria-pressed={visible}
          aria-label={visible ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          onClick={toggle}
        >
          {visible ? (
            <IconEyeOff className={TOGGLE_ICON} />
          ) : (
            <IconEye className={TOGGLE_ICON} />
          )}
        </button>
      }
    />
  );
}
