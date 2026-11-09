import type { IconProps } from "./icon-base";

/* Biểu tượng sao chép — ô vuông trước được tô trắng để che phần giao nhau */
export function IconCopy({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      viewBox="0 0 24 24"
    >
      <path
        d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.7}
      />
      <rect
        x="8"
        y="8"
        width="13"
        height="13"
        rx="2"
        fill="#FFFFFF"
        stroke="currentColor"
        strokeWidth={1.7}
      />
    </svg>
  );
}
