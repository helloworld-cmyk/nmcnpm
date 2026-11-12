import { IconBase, type IconProps } from "./icon-base";

export function IconMail({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="m4.5 7 7.5 5.5L19.5 7" />
    </IconBase>
  );
}
