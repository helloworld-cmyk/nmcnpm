import { Reveal } from "@/components/ui/reveal";

const STEPS = [
  {
    number: "01",
    title: "Chọn tuyến đường",
    description:
      "Nhập điểm đi, điểm đến và thời gian bạn muốn khởi hành. Gợi ý tuyến sẽ xuất hiện ngay.",
    delay: "0ms",
  },
  {
    number: "02",
    title: "So sánh & đặt chỗ",
    description:
      "Xem giờ chạy, loại xe, đánh giá tài xế và giá trọn gói trước khi xác nhận đặt chỗ.",
    delay: "90ms",
  },
  {
    number: "03",
    title: "Lên xe & tận hưởng",
    description:
      "Tài xế đón tận nơi, hành trình được theo dõi và đội ngũ hỗ trợ luôn trực 24/7.",
    delay: "180ms",
  },
];

function RouteScene() {
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

function CompareScene() {
  return (
    <svg
      className="block w-full h-auto"
      viewBox="0 0 320 190"
      role="img"
      aria-label="So sánh giờ chạy, loại xe và giá giữa các chuyến"
    >
      <rect x="40" y="12" width="104" height="24" rx="12" fill="#FFEDD5" />
      <text
        x="92"
        y="28"
        textAnchor="middle"
        fontSize="9.5"
        fontWeight="700"
        fill="#C2410C"
      >
        Gợi ý tốt nhất
      </text>
      <rect
        x="40"
        y="44"
        width="240"
        height="66"
        rx="13"
        fill="#fff"
        stroke="#0EA5E9"
        strokeWidth="1.6"
      />
      <rect x="52" y="57" width="40" height="40" rx="10" fill="#E0F2FE" />
      <rect
        x="63"
        y="66.5"
        width="17"
        height="9"
        rx="3.5"
        fill="#0369A1"
        opacity=".8"
      />
      <rect x="57" y="74" width="30" height="10" rx="4.5" fill="#0369A1" />
      <circle cx="64.5" cy="85.5" r="3.4" fill="#0F1E35" />
      <circle cx="79.5" cy="85.5" r="3.4" fill="#0F1E35" />
      <circle cx="64.5" cy="85.5" r="1.3" fill="#E0F2FE" />
      <circle cx="79.5" cy="85.5" r="1.3" fill="#E0F2FE" />
      <text x="104" y="66" fontSize="11.5" fontWeight="700" fill="#0F1E35">
        07:00 → 09:10
      </text>
      <text x="104" y="81" fontSize="9.5" fill="#64748B">
        Ford Transit · 9 chỗ
      </text>
      <path
        d="M105.6 86.5l1.2 2.4 2.7.4-2 1.9.5 2.7-2.4-1.3-2.4 1.3.5-2.7-2-1.9 2.7-.4z"
        fill="#F59E0B"
      />
      <text x="113" y="92.5" fontSize="9" fontWeight="600" fill="#475569">
        4.9 · 128 chuyến
      </text>
      <text
        x="268"
        y="70"
        textAnchor="end"
        fontSize="12"
        fontWeight="800"
        fill="#0369A1"
      >
        180.000đ
      </text>
      <text x="268" y="84" textAnchor="end" fontSize="8.5" fill="#94A3B8">
        trọn gói /ghế
      </text>
      <circle
        cx="280"
        cy="48"
        r="11"
        fill="#059669"
        stroke="#fff"
        strokeWidth="2.5"
      />
      <path
        d="m274.8 48 3.4 3.4 6.4-6.8"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <rect
        x="40"
        y="126"
        width="240"
        height="48"
        rx="13"
        fill="#fff"
        stroke="#E2E8F0"
      />
      <rect x="52" y="135" width="30" height="30" rx="8" fill="#F0F9FF" />
      <rect
        x="61.5"
        y="142.5"
        width="10.5"
        height="6"
        rx="2.5"
        fill="#94A3B8"
        opacity=".75"
      />
      <rect x="58" y="147" width="18" height="6.5" rx="3" fill="#94A3B8" />
      <circle cx="61.5" cy="155.5" r="2.4" fill="#64748B" />
      <circle cx="73.5" cy="155.5" r="2.4" fill="#64748B" />
      <text x="92" y="150" fontSize="10.5" fontWeight="600" fill="#475569">
        09:30 → 11:45
      </text>
      <text x="92" y="163" fontSize="9" fill="#94A3B8">
        Xe 16 chỗ · 4.7
      </text>
      <text
        x="268"
        y="155"
        textAnchor="end"
        fontSize="11"
        fontWeight="700"
        fill="#64748B"
      >
        220.000đ
      </text>
      <circle cx="14" cy="20" r="2.5" fill="#E0F2FE" />
      <path
        d="M306 170v12M300 176h12"
        stroke="#BAE6FD"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="310" cy="60" r="2" fill="#BAE6FD" opacity=".6" />
      <circle cx="16" cy="96" r="2" fill="#E0F2FE" />
    </svg>
  );
}

function ArrivalScene() {
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

const SCENES = [RouteScene, CompareScene, ArrivalScene];

export function StepsSection() {
  return (
    <section className="section section--white" id="cach-hoat-dong">
      <div className="container relative">
        <Reveal className="section-head">
          <span className="section-eyebrow">Cách hoạt động</span>
          <h2>
            Ba bước để bắt đầu
            <br />
            chuyến đi của bạn.
          </h2>
          <p>
            Không gọi điện, không chờ đợi. Mọi thứ bạn cần chỉ trong một màn
            hình.
          </p>
        </Reveal>

        <svg
          className="absolute -top-3 right-0 w-[min(42%,470px)] h-auto pointer-events-none max-[900px]:hidden"
          viewBox="0 0 480 260"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M18 252C120 252 150 148 252 148c86 0 108 96 210 66"
            stroke="#BAE6FD"
            strokeWidth="2"
            strokeDasharray="6 10"
            strokeLinecap="round"
          />
          <circle cx="252" cy="148" r="4" fill="#7DD3FC" />
          <path
            d="M430 34v14M423 41h14"
            stroke="#BAE6FD"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="80" cy="52" r="3" fill="#E0F2FE" />
          <circle cx="360" cy="90" r="2.5" fill="#E0F2FE" />
        </svg>

        <div className="relative grid grid-cols-3 gap-[clamp(24px,4vw,56px)] before:content-[''] before:absolute before:top-[104px] before:left-[9%] before:right-[9%] before:z-0 before:border-t-2 before:border-dashed before:border-sky-200 before:hidden min-[1200px]:before:block max-[900px]:grid-cols-1 max-[900px]:gap-[30px]">
          {STEPS.map((step, index) => {
            const Scene = SCENES[index];
            return (
              <Reveal as="article" key={step.number} delay={step.delay} className="group relative z-[1] max-[900px]:max-w-[520px]">
                <div className="relative overflow-hidden border border-sky-100 rounded-lg bg-[linear-gradient(135deg,#f0f9ff,#e0f2fe)] shadow-xs transition-[transform,border-color,box-shadow] duration-(--dur) ease-swift group-hover:-translate-y-1 group-hover:border-sky-200 group-hover:shadow-md">
                  <Scene />
                  <span
                    aria-hidden="true"
                    className="absolute top-2.5 right-3 px-3 py-[5px] border border-sky-200 rounded-full bg-white font-heading text-[13px] font-extrabold tracking-[0.06em] text-sky-700 shadow-xs pointer-events-none"
                  >
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-[18px] mb-2 text-[19px] font-bold tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="max-w-[320px] text-[14.5px] leading-[1.7] text-slate-600 max-[900px]:max-w-[480px]">
                  {step.description}
                 </p>
               </Reveal>
             );
           })}
        </div>
      </div>
    </section>
  );
}
