import { IconBase, type IconProps } from "./icon-base";

export function IconHeadset({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M4 14.5v-2.3a8 8 0 0 1 16 0v2.3" />
      <rect x="3" y="14" width="3.6" height="6" rx="1.6" />
      <rect x="17.4" y="14" width="3.6" height="6" rx="1.6" />
      <path d="M20 20a3.5 3.5 0 0 1-3.5 2.3H14" />
    </IconBase>
  );
}