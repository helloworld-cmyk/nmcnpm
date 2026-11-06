import { IconBase, type IconProps } from "./icon-base";

export function IconCalendar({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M8 3v4M16 3v4M3.5 10h17" />
    </IconBase>
  );
}