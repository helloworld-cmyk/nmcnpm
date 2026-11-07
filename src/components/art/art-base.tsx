import type { ReactNode } from "react";

export type ArtProps = {
  className?: string;
};

type ArtBaseProps = ArtProps & {
  children: ReactNode;
};

export function ArtBase({ className, children }: ArtBaseProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      focusable="false"
      viewBox="0 0 320 140"
    >
      {children}
    </svg>
  );
}