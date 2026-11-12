import { IconBase, type IconProps } from "./icon-base";

export function IconRefresh({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M20 11.5a8 8 0 0 0-14-4.6L4 9" />
      <path d="M4 4v5h5" />
      <path d="M4 12.5a8 8 0 0 0 14 4.6L20 15" />
      <path d="M20 20v-5h-5" />
    </IconBase>
  );
}
