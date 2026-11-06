import { IconBase, type IconProps } from "./icon-base";

export function IconUsers({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.6 19.2c0-3 2.4-5.2 5.4-5.2s5.4 2.2 5.4 5.2" />
      <path d="M16 5.2a2.8 2.8 0 0 1 0 5.4" />
      <path d="M17.4 14.4c2 .4 3.4 1.9 3.4 4.2" />
    </IconBase>
  );
}