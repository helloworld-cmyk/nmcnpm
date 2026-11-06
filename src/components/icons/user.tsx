import { IconBase, type IconProps } from "./icon-base";

export function IconUser({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5 20c.8-3.4 3.6-5.4 7-5.4s6.2 2 7 5.4" />
    </IconBase>
  );
}