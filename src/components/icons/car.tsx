import { IconBase, type IconProps } from "./icon-base";

export function IconCar({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M4.5 16.5h15l-1.6-5.2a2.3 2.3 0 0 0-2.2-1.7H8.3a2.3 2.3 0 0 0-2.2 1.7L4.5 16.5Z" />
      <path d="M4.5 16.5v2.3M19.5 16.5v2.3" />
      <circle cx="7.6" cy="16.5" r="1.1" />
      <circle cx="16.4" cy="16.5" r="1.1" />
      <path d="M8.2 10.2 8.9 7.9h6.2l.7 2.3" />
    </IconBase>
  );
}