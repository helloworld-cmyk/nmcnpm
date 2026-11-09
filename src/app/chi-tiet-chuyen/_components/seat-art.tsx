type SeatArtProps = {
  className?: string;
};


export function SeatArt({ className }: SeatArtProps) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 40 54" focusable="false">
      <rect x="1.5" y="14" width="5" height="27" rx="2.5" style={{ fill: "var(--seat-arm)" }} />
      <rect x="33.5" y="14" width="5" height="27" rx="2.5" style={{ fill: "var(--seat-arm)" }} />
      <rect x="10.5" y="1.5" width="19" height="9" rx="4" style={{ fill: "var(--seat-head)" }} />
      <rect
        x="5.5"
        y="8.5"
        width="29"
        height="24"
        rx="7"
        style={{ fill: "var(--seat-back)", stroke: "var(--seat-line)", strokeWidth: 2 }}
      />
      <rect x="8" y="36" width="24" height="16" rx="6" style={{ fill: "var(--seat-cushion)" }} />
    </svg>
  );
}
