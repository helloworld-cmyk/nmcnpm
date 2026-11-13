export function ArrivalScene() {
  return (
    <svg
      className="block w-full h-auto"
      viewBox="0 0 320 190"
      role="img"
      aria-label="Xe đón tận nơi, theo dõi hành trình, hỗ trợ 24/7"
    >
      <defs>
        <linearGradient id="stepVan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0EA5E9" />
          <stop offset="1" stopColor="#0369A1" />
        </linearGradient>
      </defs>
      <g fill="#E0F2FE">
        <ellipse cx="58" cy="34" rx="15" ry="7.5" />
        <ellipse cx="72" cy="30" rx="11" ry="6" />
        <ellipse cx="84" cy="35" rx="9" ry="5.5" />
        <ellipse cx="252" cy="64" rx="12" ry="6" opacity=".75" />
        <ellipse cx="262" cy="60" rx="8" ry="4.5" opacity=".75" />
      </g>
      <path
        d="M134 46a16 16 0 0 1 32 0"
        stroke="#7DD3FC"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M140 46a10 10 0 0 1 20 0"
        stroke="#0EA5E9"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M150 42a9 9 0 0 1 9 9c0 7-9 16-9 16s-9-9-9-16a9 9 0 0 1 9-9Z"
        fill="#0284C7"
        stroke="#fff"
        strokeWidth="2"
      />
      <circle cx="150" cy="51.5" r="3.2" fill="#fff" />
      <rect x="0" y="150" width="320" height="40" fill="#E2E8F0" />
      <path d="M0 151H320" stroke="#CBD5E1" strokeWidth="2" />
      <path
        d="M0 171H320"
        stroke="#fff"
        strokeWidth="3"
        strokeDasharray="16 12"
      />
      <g transform="translate(88 100)">
        <ellipse
          cx="59"
          cy="56"
          rx="64"
          ry="5.5"
          fill="#0F1E35"
          opacity=".07"
        />
        <rect x="0" y="6" width="118" height="46" rx="11" fill="url(#stepVan)" />
        <rect
          x="0"
          y="6"
          width="118"
          height="11"
          rx="5.5"
          fill="#fff"
          opacity=".14"
        />
        <rect x="12" y="20" width="32" height="19" rx="4" fill="#E0F2FE" />
        <rect x="50" y="20" width="28" height="19" rx="4" fill="#E0F2FE" />
        <rect x="86" y="20" width="20" height="19" rx="4" fill="#BAE6FD" />
        <path d="M50 20v33" stroke="#0369A1" strokeWidth="1.5" opacity=".3" />
        <circle cx="115" cy="44" r="2.6" fill="#FFEDD5" />
        <circle cx="28" cy="54" r="11" fill="#0F1E35" />
        <circle cx="28" cy="54" r="4.5" fill="#CBD5E1" />
        <circle cx="28" cy="54" r="1.6" fill="#64748B" />
        <circle cx="90" cy="54" r="11" fill="#0F1E35" />
        <circle cx="90" cy="54" r="4.5" fill="#CBD5E1" />
        <circle cx="90" cy="54" r="1.6" fill="#64748B" />
      </g>
      <g stroke="#7DD3FC" strokeWidth="3" strokeLinecap="round">
        <path d="M56 116h16" />
        <path d="M50 128h22" />
        <path d="M58 140h14" />
      </g>
      <rect
        x="240"
        y="98"
        width="58"
        height="26"
        rx="13"
        fill="#fff"
        stroke="#E2E8F0"
      />
      <path
        d="M254 104.5l5.5 2v4c0 3.3-2.4 5.9-5.5 6.7-3.1-.8-5.5-3.4-5.5-6.7v-4l5.5-2Z"
        fill="#059669"
      />
      <path
        d="m251.6 110.8 1.7 1.7 3.2-3.4"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <text x="266" y="115.5" fontSize="10" fontWeight="800" fill="#0F1E35">
        24/7
      </text>
      <rect
        x="16"
        y="98"
        width="88"
        height="26"
        rx="13"
        fill="#fff"
        stroke="#E2E8F0"
      />
      <path
        d="M30 104a5.5 5.5 0 0 1 5.5 5.5c0 4.2-5.5 9.5-5.5 9.5s-5.5-5.3-5.5-9.5A5.5 5.5 0 0 1 30 104Z"
        fill="#0EA5E9"
      />
      <circle cx="30" cy="109.5" r="1.8" fill="#fff" />
      <text x="42" y="115.5" fontSize="9.5" fontWeight="600" fill="#334155">
        Đón tận nơi
      </text>
      <circle cx="8" cy="70" r="2" fill="#BAE6FD" />
      <circle cx="310" cy="140" r="2.5" fill="#E0F2FE" />
    </svg>
  );
}
