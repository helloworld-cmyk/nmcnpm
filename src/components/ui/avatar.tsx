const TONES = [
  "bg-[linear-gradient(135deg,var(--sky-800),var(--sky-500))]",
  "bg-[linear-gradient(135deg,var(--orange-700),var(--orange-500))]",
  "bg-[linear-gradient(135deg,var(--green-700),var(--green-600))]",
  "bg-[linear-gradient(135deg,var(--navy-700),var(--navy-900))]",
];

/* Chữ cái đầu và chữ cái cuối của tên, viết hoa */
function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "VV";
  const first = parts[0].charAt(0);
  const second = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
  return `${first}${second}`.toUpperCase();
}

/* Chọn tông màu ổn định theo tên (băm chuỗi) — tránh đổi màu mỗi lần render */
function toneOf(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return TONES[hash % TONES.length];
}

type AvatarProps = {
  name: string;
  className?: string;
};

export function Avatar({ name, className = "" }: AvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full font-heading font-extrabold leading-none text-white select-none ${toneOf(
        name,
      )} ${className}`}
    >
      {initialsOf(name)}
    </span>
  );
}
