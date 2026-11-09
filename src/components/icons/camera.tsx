import { IconBase, type IconProps } from "./icon-base";

export function IconCamera({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h1.6l1.2-2h5.4l1.2 2h1.6A2.5 2.5 0 0 1 20 8.5v8a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5v-8Z" />
      <circle cx="12" cy="12.4" r="3.2" />
    </IconBase>
  );
}
