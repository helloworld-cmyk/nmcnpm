import { IconBase, type IconProps } from "./icon-base";

export function IconCheckCircle({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.5 12.2 2.4 2.4 4.8-5" />
    </IconBase>
  );
}