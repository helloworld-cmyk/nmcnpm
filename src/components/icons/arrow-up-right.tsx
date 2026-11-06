import { IconBase, type IconProps } from "./icon-base";

export function IconArrowUpRight({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </IconBase>
  );
}