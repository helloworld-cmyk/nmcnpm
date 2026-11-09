import { IconBase, type IconProps } from "./icon-base";

export function IconEye({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M2.6 12S6.1 5.9 12 5.9 21.4 12 21.4 12 17.9 18.1 12 18.1 2.6 12 2.6 12Z" />
      <circle cx="12" cy="12" r="2.9" />
    </IconBase>
  );
}
