import { ArtBase, type ArtProps } from "./art-base";

export function ArtDriver({ className }: ArtProps) {
  return (
    <ArtBase className={className}>
      <defs>
        <linearGradient id="art-driver-mint" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ECFDF5" />
          <stop offset="1" stopColor="#9FEBCB" />
        </linearGradient>
        <radialGradient id="art-driver-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="140" fill="url(#art-driver-mint)" />
      <circle cx="58" cy="20" r="80" fill="url(#art-driver-glow)" />
      <circle cx="292" cy="118" r="46" fill="#059669" opacity="0.09" />
      <rect
        x="34"
        y="26"
        width="132"
        height="92"
        rx="12"
        fill="#FFFFFF"
        stroke="#D1FAE5"
      />
      <circle cx="66" cy="60" r="17" fill="#BAE6FD" />
      <circle cx="66" cy="55" r="6.4" fill="#0369A1" />
      <path d="M55 70a11 11 0 0 1 22 0Z" fill="#0369A1" />
      <rect x="92" y="48" width="60" height="8" rx="4" fill="#E2E8F0" />
      <rect x="92" y="62" width="42" height="8" rx="4" fill="#EEF3F8" />
      <circle cx="96" cy="86" r="4" fill="#F59E0B" />
      <rect x="106" y="82" width="44" height="8" rx="4" fill="#EEF3F8" />
      <rect x="46" y="96" width="46" height="14" rx="5" fill="#F0F9FF" />
      <rect x="52" y="101" width="34" height="4" rx="2" fill="#BAE6FD" />
      <path
        d="M232 26l30 11v24c0 19-13 35-30 41-17-6-30-22-30-41V37l30-11Z"
        fill="#059669"
      />
      <path
        d="m220 60 9 9 17-18"
        stroke="#FFFFFF"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle
        cx="276"
        cy="38"
        r="15"
        fill="#0EA5E9"
        stroke="#FFFFFF"
        strokeWidth="2.6"
      />
      <path
        d="m270 38 4.2 4.2 7.6-8"
        stroke="#FFFFFF"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M0 -8L2.2 -2.2L8 0L2.2 2.2L0 8L-2.2 2.2L-8 0L-2.2 -2.2Z"
        fill="#FFFFFF"
        opacity="0.9"
        transform="translate(26 110)"
      />
      <path
        d="M0 -8L2.2 -2.2L8 0L2.2 2.2L0 8L-2.2 2.2L-8 0L-2.2 -2.2Z"
        fill="#34D399"
        opacity="0.9"
        transform="translate(302 108) scale(0.7)"
      />
    </ArtBase>
  );
}