import { IconBase, type IconProps } from "./icon-base";

export function IconYoutube({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <rect x="2.8" y="5.5" width="18.4" height="13" rx="4" />
      <path fill="currentColor" stroke="none" d="m10.2 9.2 4.8 2.8-4.8 2.8V9.2Z" />
    </IconBase>
  );
}