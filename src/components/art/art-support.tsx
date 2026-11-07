import { ArtBase, type ArtProps } from "./art-base";

export function ArtSupport({ className }: ArtProps) {
  return (
    <ArtBase className={className}>
      <defs>
        <linearGradient id="art-support-deep" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#38BDF8" />
          <stop offset="1" stopColor="#0369A1" />
        </linearGradient>
        <radialGradient id="art-support-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="140" fill="url(#art-support-deep)" />
      <circle
        cx="160"
        cy="68"
        r="88"
        fill="url(#art-support-glow)"
        opacity="0.75"
      />
      <circle
        className="origin-[160px_78px] animate-[artRing_3.6s_ease-out_infinite]"
        cx="160"
        cy="78"
        r="46"
        stroke="#BAE6FD"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      <circle
        className="origin-[160px_78px] animate-[artRing_3.6s_ease-out_infinite] [animation-delay:1.8s]"
        cx="160"
        cy="78"
        r="62"
        stroke="#BAE6FD"
        strokeWidth="1.5"
        fill="none"
        opacity="0.3"
      />
      <path
        d="M126 80a34 34 0 0 1 68 0"
        stroke="#FFFFFF"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="112" y="74" width="20" height="32" rx="9" fill="#FFFFFF" />
      <rect x="188" y="74" width="20" height="32" rx="9" fill="#FFFFFF" />
      <path
        d="M198 106a16 16 0 0 1-18 14"
        stroke="#FFFFFF"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="178" cy="121" r="4.5" fill="#FFFFFF" />
      <rect x="30" y="28" width="62" height="34" rx="12" fill="#FFFFFF" />
      <path d="M46 61l-2 11 12-11Z" fill="#FFFFFF" />
      <circle cx="49" cy="45" r="3.4" fill="#0EA5E9" />
      <circle cx="61" cy="45" r="3.4" fill="#0EA5E9" />
      <circle cx="73" cy="45" r="3.4" fill="#0EA5E9" />
      <rect x="228" y="92" width="70" height="30" rx="15" fill="#FFFFFF" />
      <text
        x="263"
        y="112"
        textAnchor="middle"
        fontSize="13"
        fontWeight="800"
        fill="#0369A1"
      >
        24/7
      </text>
      <path
        d="M0 -8L2.2 -2.2L8 0L2.2 2.2L0 8L-2.2 2.2L-8 0L-2.2 -2.2Z"
        fill="#FFFFFF"
        opacity="0.9"
        transform="translate(288 38)"
      />
      <circle cx="32" cy="104" r="2.5" fill="#FFFFFF" opacity="0.7" />
      <circle cx="292" cy="132" r="2" fill="#FFFFFF" opacity="0.6" />
    </ArtBase>
  );
}