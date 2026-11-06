import { IconBase, type IconProps } from "./icon-base";

export function IconLogout({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M14 4.5H7A2.5 2.5 0 0 0 4.5 7v10A2.5 2.5 0 0 0 7 19.5h7" />
      <path d="M10.5 12H20" />
      <path d="m16.5 8.5 3.5 3.5-3.5 3.5" />
    </IconBase>
  );
}