import { IconBase, type IconProps } from "./icon-base";

export function IconChevronDown({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="m6.5 9.5 5.5 5.5 5.5-5.5" />
    </IconBase>
  );
}