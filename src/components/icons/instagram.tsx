import { IconBase, type IconProps } from "./icon-base";

export function IconInstagram({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </IconBase>
  );
}