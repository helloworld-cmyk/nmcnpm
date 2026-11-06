import { IconBase, type IconProps } from "./icon-base";

export function IconClose({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="m6 6 12 12M18 6 6 18" />
    </IconBase>
  );
}