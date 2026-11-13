"use client";

import type { ReactNode } from "react";

type PageButtonProps = {
  children: ReactNode;
  current?: boolean;
  disabled?: boolean;
  onClick: () => void;
  "aria-current"?: "page" | undefined;
};

export function PageButton({
  children,
  current = false,
  disabled = false,
  onClick,
  ...rest
}: PageButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex h-11 min-w-11 items-center justify-center rounded-xl border px-3 font-body text-sm font-semibold transition-[background,border-color,color] duration-[var(--dur)] ease-[var(--ease)] ${
        current
          ? "border-[var(--sky-700)] bg-[var(--sky-700)] text-white"
          : `border-line bg-white text-[var(--slate-600)] ${
              disabled
                ? "cursor-default opacity-45"
                : "hover:border-[var(--sky-300)] hover:bg-[var(--sky-50)] hover:text-[var(--sky-800)]"
            }`
      }`}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
