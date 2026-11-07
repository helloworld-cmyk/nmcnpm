import { ArtBase, type ArtProps } from "./art-base";

export function ArtPickup({ className }: ArtProps) {
  return (
    <ArtBase className={className}>
      <defs>
        <linearGradient id="art-pickup-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E0F2FE" />
          <stop offset="1" stopColor="#A7D8F5" />
        </linearGradient>
        <linearGradient id="art-pickup-van" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0EA5E9" />
          <stop offset="1" stopColor="#0369A1" />
        </linearGradient>
        <radialGradient id="art-pickup-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="140" fill="url(#art-pickup-sky)" />
      <circle cx="272" cy="16" r="66" fill="url(#art-pickup-glow)" />
      <ellipse cx="62" cy="30" rx="18" ry="9" fill="#FFFFFF" opacity="0.9" />
      <ellipse cx="78" cy="26" rx="13" ry="7.5" fill="#FFFFFF" opacity="0.9" />
      <ellipse cx="250" cy="40" rx="15" ry="7" fill="#FFFFFF" opacity="0.75" />
      <rect y="106" width="320" height="34" fill="#E2E8F0" />
      <path d="M0 107H320" stroke="#CBD5E1" strokeWidth="2" />
      <path
        d="M0 124H320"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeDasharray="18 14"
      />
      <path d="M24 76 60 48 96 76Z" fill="#0EA5E9" />
      <rect x="32" y="74" width="56" height="32" fill="#FFFFFF" />
      <rect x="38" y="84" width="15" height="12" rx="2" fill="#E0F2FE" />
      <rect x="68" y="84" width="14" height="22" rx="2" fill="#BAE6FD" />
      <ellipse cx="212" cy="112" rx="62" ry="5.5" fill="#0F1E35" opacity="0.08" />
      <g transform="translate(158 62)">
        <rect y="8" width="112" height="44" rx="11" fill="url(#art-pickup-van)" />
        <rect
          y="8"
          width="112"
          height="10"
          rx="5"
          fill="#FFFFFF"
          opacity="0.16"
        />
        <rect x="12" y="20" width="30" height="18" rx="3.5" fill="#E0F2FE" />
        <rect x="48" y="20" width="26" height="18" rx="3.5" fill="#E0F2FE" />
        <rect x="82" y="20" width="18" height="18" rx="3.5" fill="#BAE6FD" />
        <circle cx="28" cy="52" r="11" fill="#0F1E35" />
        <circle cx="28" cy="52" r="4.6" fill="#CBD5E1" />
        <circle cx="88" cy="52" r="11" fill="#0F1E35" />
        <circle cx="88" cy="52" r="4.6" fill="#CBD5E1" />
      </g>
      <path
        className="animate-[dash_14s_linear_infinite]"
        d="M96 92C130 86 150 78 174 74"
        stroke="#0284C7"
        strokeWidth="2.5"
        strokeDasharray="5 7"
        strokeLinecap="round"
        fill="none"
      />
      <path
        className="animate-[artBob_4.5s_ease-in-out_infinite]"
        d="M212 28a11 11 0 0 1 11 11c0 8.5-11 19-11 19s-11-10.5-11-19a11 11 0 0 1 11-11Z"
        fill="#0284C7"
        stroke="#FFFFFF"
        strokeWidth="2.5"
      />
      <circle cx="212" cy="39" r="3.6" fill="#FFFFFF" />
      <path
        d="M0 -8L2.2 -2.2L8 0L2.2 2.2L0 8L-2.2 2.2L-8 0L-2.2 -2.2Z"
        fill="#FFFFFF"
        opacity="0.9"
        transform="translate(300 82)"
      />
      <circle cx="296" cy="56" r="2.5" fill="#FFFFFF" opacity="0.8" />
    </ArtBase>
  );
}