import { IconBase, type IconProps } from "./icon-base";

export function IconStar({ className }: IconProps) {
  return (
    <IconBase className={className} filled>
      <path d="M12 3.6l2.5 5.1 5.6.8-4.1 4 1 5.6-5-2.7-5 2.7 1-5.6-4.1-4 5.6-.8L12 3.6Z" />
    </IconBase>
  );
}