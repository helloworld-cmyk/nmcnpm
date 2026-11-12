import { IconBase, type IconProps } from "./icon-base";

export function IconRoute({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <circle cx="5" cy="5" r="2.5" />
      <circle cx="19" cy="19" r="2.5" />
      <path d="m7.2 7.2 9.6 9.6" strokeDasharray="1 4" />
    </IconBase>
  );
}
