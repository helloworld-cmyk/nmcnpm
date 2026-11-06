import { IconBase, type IconProps } from "./icon-base";

export function IconSwap({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M7.5 4.5v14" />
      <path d="m4.5 16 3 3 3-3" />
      <path d="M16.5 19.5v-14" />
      <path d="m13.5 8 3-3 3 3" />
    </IconBase>
  );
}