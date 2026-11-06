import type { ReactNode } from "react";

export type IconProps = {
  className?: string;
};

type IconBaseProps = IconProps & {
  filled?: boolean;
  children: ReactNode;
};

export function IconBase({
  className = "icon",
  filled = false,
  children,
}: IconBaseProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill={filled ? "currentColor" : "none"}
      focusable="false"
      stroke={filled ? "none" : "currentColor"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={filled ? 0 : 1.8}
      viewBox="0 0 24 24"
    >
      {children}
    </svg>
  );
}