import { IconBase, type IconProps } from "./icon-base";

export function IconArrowRight({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </IconBase>
  );
}