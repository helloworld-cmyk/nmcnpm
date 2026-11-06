import { IconBase, type IconProps } from "./icon-base";

export function IconMenu({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </IconBase>
  );
}