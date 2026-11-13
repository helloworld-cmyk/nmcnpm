export function RouteScene() {
  return (
    <svg
      className="block w-full h-auto"
      viewBox="0 0 320 190"
      role="img"
      aria-label="Nhập điểm đi, điểm đến và tìm tuyến trên bản đồ"
    >
      <rect
        x="40"
        y="14"
        width="196"
        height="36"
        rx="18"
        fill="#fff"
        stroke="#E2E8F0"
      />
      <path
        d="M58 24a5.5 5.5 0 0 1 5.5 5.5c0 4.2-5.5 9.5-5.5 9.5s-5.5-5.3-5.5-9.5A5.5 5.5 0 0 1 58 24Z"
        fill="#0EA5E9"
      />
      <circle cx="58" cy="29.5" r="1.8" fill="#fff" />
      <text
        x="70"
        y="36"
        fontSize="11"
        fontWeight="600"
        fill="#0F1E35"
      >
        Hà Nội → Hải Phòng
      </text>
      <circle cx="222" cy="32" r="14" fill="#0EA5E9" />
      <circle
        cx="219.5"
        cy="29.5"
        r="4"
        fill="none"
        stroke="#fff"
        strokeWidth="1.8"
      />
      <path
        d="m222.5 32.5 4 4"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <rect
        x="30"
        y="62"
        width="260"
        height="112"
        rx="14"
        fill="#fff"
        stroke="#E2E8F0"
      />
      <clipPath id="mapClip1">
        <rect x="30" y="62" width="260" height="112" rx="14" />
      </clipPath>
      <g clipPath="url(#mapClip1)">
        <path
          d="M76 62V174M122 62V174M168 62V174M214 62V174M260 62V174M30 92H290M30 122H290M30 152H290"
          stroke="#EEF3F8"
          strokeWidth="1"
        />
        <path
          d="M30 140C80 128 110 162 170 150s100-24 120-10"
          stroke="#E0F2FE"
          strokeWidth="16"
          strokeLinecap="round"
          fill="none"
        />
        <path
          className="animate-[dash_16s_linear_infinite]"
          d="M74 136C108 108 150 142 190 114c22-15 40-24 58-34"
          stroke="#0EA5E9"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="6 7"
          fill="none"
        />
      </g>
      <ellipse
        cx="74"
        cy="147"
        rx="7"
        ry="2.4"
        fill="#0F1E35"
        opacity=".08"
      />
      <path
        d="M74 118a9 9 0 0 1 9 9c0 7-9 16-9 16s-9-9-9-16a9 9 0 0 1 9-9Z"
        fill="#0284C7"
        stroke="#fff"
        strokeWidth="2"
      />
      <circle cx="74" cy="127" r="3.2" fill="#fff" />
      <ellipse cx="248" cy="93" rx="6" ry="2" fill="#0F1E35" opacity=".08" />
      <path
        d="M248 62a9 9 0 0 1 9 9c0 7-9 16-9 16s-9-9-9-16a9 9 0 0 1 9-9Z"
        fill="#F97316"
        stroke="#fff"
        strokeWidth="2"
      />
      <circle cx="248" cy="71" r="3.2" fill="#fff" />
      <rect
        x="188"
        y="136"
        width="84"
        height="26"
        rx="13"
        fill="#fff"
        stroke="#E2E8F0"
      />
      <text
        x="230"
        y="153"
        textAnchor="middle"
        fontSize="9.5"
        fontWeight="600"
        fill="#475569"
      >
        07:00 · 2h 10p
      </text>
      <path
        d="M16 36v16M8 44h16"
        stroke="#BAE6FD"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M306 114v12M300 120h12"
        stroke="#BAE6FD"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="20" cy="178" r="2.5" fill="#E0F2FE" />
      <circle cx="308" cy="14" r="3" fill="#E0F2FE" />
      <circle cx="14" cy="120" r="2" fill="#BAE6FD" opacity=".6" />
    </svg>
  );
}
