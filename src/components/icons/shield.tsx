import { IconBase, type IconProps } from "./icon-base";

export function IconShield({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M12 3.2 19 6v5.2c0 4.4-3 8.1-7 9.6-4-1.5-7-5.2-7-9.6V6l7-2.8Z" />
      <path d="m9 12 2.1 2.1L15.4 10" />
    </IconBase>
  );
}