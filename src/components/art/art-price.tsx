import { ArtBase, type ArtProps } from "./art-base";

export function ArtPrice({ className }: ArtProps) {
  return (
    <ArtBase className={className}>
      <defs>
        <linearGradient id="art-price-surface" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FDBA74" />
          <stop offset="1" stopColor="#F97316" />
        </linearGradient>
        <radialGradient id="art-price-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="140" fill="url(#art-price-surface)" />
      <circle cx="54" cy="24" r="86" fill="url(#art-price-glow)" />
      <circle cx="288" cy="118" r="52" fill="#FFFFFF" opacity="0.09" />
      <path
        d="M296 24v12M290 30h12"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.75"
      />
      <circle cx="28" cy="110" r="3" fill="#FFFFFF" opacity="0.6" />
      <rect x="112" y="16" width="112" height="108" rx="12" fill="#FFFFFF" />
      <rect x="126" y="30" width="54" height="8" rx="4" fill="#E2E8F0" />
      <rect x="126" y="44" width="38" height="8" rx="4" fill="#EEF3F8" />
      <text x="126" y="82" fontSize="17" fontWeight="800" fill="#0B1B33">
        180.000đ
      </text>
      <text x="126" y="97" fontSize="9" fill="#64748B">
        trọn gói / ghế
      </text>
      <path
        d="M126 106h84"
        stroke="#E2E8F0"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        strokeLinecap="round"
      />
      <circle
        cx="216"
        cy="32"
        r="16"
        fill="#059669"
        stroke="#FFFFFF"
        strokeWidth="3"
      />
      <path
        d="m209 32 4.6 4.6 8.4-8.8"
        stroke="#FFFFFF"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle
        cx="92"
        cy="104"
        r="18"
        fill="#FCD34D"
        stroke="#F59E0B"
        strokeWidth="2.5"
      />
      <text
        x="92"
        y="110"
        textAnchor="middle"
        fontSize="15"
        fontWeight="800"
        fill="#B45309"
      >
        ₫
      </text>
      <circle
        cx="66"
        cy="122"
        r="13"
        fill="#FDE68A"
        stroke="#F59E0B"
        strokeWidth="2.2"
      />
      <path
        d="M0 -8L2.2 -2.2L8 0L2.2 2.2L0 8L-2.2 2.2L-8 0L-2.2 -2.2Z"
        fill="#FFFFFF"
        opacity="0.85"
        transform="translate(48 30)"
      />
      <path
        d="M0 -8L2.2 -2.2L8 0L2.2 2.2L0 8L-2.2 2.2L-8 0L-2.2 -2.2Z"
        fill="#FFFFFF"
        opacity="0.7"
        transform="translate(286 76) scale(0.6)"
      />
    </ArtBase>
  );
}