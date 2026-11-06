import { IconBase, type IconProps } from "./icon-base";

export function IconMap({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="m9 4.5-5.5 2v13l5.5-2 6 2 5.5-2v-13l-5.5 2-6-2Z" />
      <path d="M9 4.5v13M15 6.5v13" />
    </IconBase>
  );
}