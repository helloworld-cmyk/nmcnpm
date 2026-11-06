import { IconBase, type IconProps } from "./icon-base";

export function IconCheck({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="m5 12.5 4.2 4.2L19 7.5" />
    </IconBase>
  );
}