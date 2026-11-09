import { IconBase, type IconProps } from "./icon-base";

export function IconEyeOff({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M4 12s3-5.2 7.4-5.6c1.3-.1 2.5.2 3.5.7" />
      <path d="M20 12s-1.2 2-3.2 3.5" />
      <path d="M9.6 9.7a3.1 3.1 0 0 0 4.4 4.3" />
      <path d="m4.6 4.6 14.8 14.8" />
    </IconBase>
  );
}
