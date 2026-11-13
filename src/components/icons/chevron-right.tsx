import { IconBase, type IconProps } from "./icon-base";

export function IconChevronRight({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="m9.5 6.5 5.5 5.5-5.5 5.5" />
    </IconBase>
  );
}
