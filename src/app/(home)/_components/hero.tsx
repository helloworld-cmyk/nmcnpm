import {
  IconCar,
  IconCheckCircle,
  IconHeadset,
  IconMap,
  IconShield,
  IconStar,
  IconWallet,
} from "@/components/icons";
import { BookingForm } from "./booking-form";
import { Reveal } from "@/components/ui/reveal";

const HERO_POINTS = ["Không phí ẩn", "Tài xế xác thực", "Hủy linh hoạt"];

const TRUST_TONES = {
  sky: "text-sky-700 bg-sky-50 shadow-[inset_0_0_0_1px_rgba(3,105,161,0.14)]",
  navy: "text-navy-800 bg-navy-50 shadow-[inset_0_0_0_1px_rgba(11,27,51,0.12)]",
  orange:
    "text-orange-600 bg-orange-50 shadow-[inset_0_0_0_1px_rgba(234,88,12,0.16)]",
  green:
    "text-green-600 bg-green-50 shadow-[inset_0_0_0_1px_rgba(5,150,105,0.16)]",
} as const;

const CHIP_ICON_TONES = {
  green:
    "text-green-600 bg-green-50 shadow-[inset_0_0_0_1px_rgba(5,150,105,0.16)]",
  orange:
    "text-orange-600 bg-orange-50 shadow-[inset_0_0_0_1px_rgba(234,88,12,0.16)]",
} as const;

const TRUST_ITEMS = [
  {
    Icon: IconCar,
    tone: "sky",
    value: "12.000+",
    label: "chuyến xe mỗi tháng",
  },
  {
    Icon: IconMap,
    tone: "navy",
    value: "40+",
    label: "tỉnh thành phủ sóng",
  },
  {
    Icon: IconStar,
    tone: "orange",
    value: "4.9/5",
    label: "từ 25.400 đánh giá",
  },
  {
    Icon: IconHeadset,
    tone: "green",
    value: "24/7",
    label: "hỗ trợ khách hàng",
  },
] as const;

const TRUST_ITEM_BASE =
  "flex items-center gap-[13px] px-6 py-1 border-r border-line-soft max-[520px]:border-r-0 max-[520px]:border-b max-[520px]:py-3.5 max-[520px]:px-0";

const TRUST_ITEM_CLASSES = [
  `${TRUST_ITEM_BASE} max-[1024px]:border-b max-[1024px]:pb-5`,
  `${TRUST_ITEM_BASE} max-[1024px]:border-r-0 max-[1024px]:border-b max-[1024px]:pb-5`,
  TRUST_ITEM_BASE,
  `${TRUST_ITEM_BASE} max-[520px]:border-b-0`,
];

const FLOAT_CHIP =
  "absolute z-[3] flex items-center gap-2.5 px-[13px] py-2.5 border border-white/90 rounded-[14px] bg-white/92 backdrop-blur-md shadow-[0_18px_40px_-18px_rgba(8,20,38,0.35)] animate-[float_7s_ease-in-out_infinite] max-[900px]:[animation:none] max-[640px]:px-2.5 max-[640px]:py-2 max-[640px]:rounded-xl";

export function Hero() {
  return (
    <section
      className="relative overflow-clip pt-[clamp(44px,6vw,84px)] pb-[clamp(48px,6vw,64px)] bg-[radial-gradient(1100px_600px_at_85%_-10%,rgba(125,211,252,0.28),transparent_60%),radial-gradient(900px_520px_at_-10%_20%,rgba(224,242,254,0.7),transparent_55%),linear-gradient(180deg,#f3f9fe_0%,#f7fafd_78%,#f7fafd_100%)] max-[640px]:pt-9"
      id="dat-xe"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(rgba(2,132,199,0.16)_1px,transparent_1px)] bg-[length:26px_26px] opacity-70 [mask-image:radial-gradient(ellipse_60%_70%_at_72%_38%,#000_10%,transparent_72%)] [-webkit-mask-image:radial-gradient(ellipse_60%_70%_at_72%_38%,#000_10%,transparent_72%)]"
      />
      <div className="container grid grid-cols-[1.05fr_0.95fr] gap-[clamp(32px,5vw,72px)] items-center max-[1080px]:gap-10 max-[900px]:grid-cols-1">
        <div className="max-w-[620px] max-[900px]:max-w-[640px]">
          <h1 className="mt-0 text-[clamp(2.35rem,5.1vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.038em] text-navy-800 [text-wrap:balance] max-[640px]:text-[clamp(2.15rem,9.6vw,2.9rem)]">
            Ghép chuyến thông minh,
            <br />
            <span className="text-sky-700 bg-[linear-gradient(100deg,var(--sky-700),var(--sky-600))] bg-clip-text text-transparent">
              đi tỉnh nhẹ nhàng.
            </span>
          </h1>
          <p className="max-w-[560px] mt-5 text-[clamp(15.5px,1.15vw,17.5px)] leading-[1.7] text-slate-600">
            Đặt xe ghép liên tỉnh trong 60 giây. Giá trọn gói, đón trả tận nơi
            và mọi tài xế đều được xác thực — để mỗi chuyến đi đều nhẹ nhàng
            hơn.
          </p>

          <ul className="flex flex-wrap gap-x-[22px] gap-y-2 mt-5 max-[400px]:gap-x-3.5 max-[400px]:gap-y-1.5">
            {HERO_POINTS.map((point) => (
              <li
                className="flex items-center gap-[7px] text-[13.5px] font-semibold text-slate-700"
                key={point}
              >
                <IconCheckCircle className="icon size-[17px] text-green-600" />
                {point}
              </li>
            ))}
          </ul>

          <BookingForm />
        </div>

        <div className="relative flex items-center justify-center min-h-[520px] px-6 py-5 max-[900px]:min-h-0 max-[900px]:w-full max-[900px]:max-w-[540px] max-[900px]:mx-auto max-[900px]:py-[30px] max-[900px]:px-5 max-[640px]:pt-[26px] max-[640px]:pb-5 max-[640px]:px-0">
          <svg
            aria-hidden="true"
            className="absolute inset-0 w-full h-full pointer-events-none"
            fill="none"
            viewBox="0 0 520 520"
          >
            <path
              className="animate-[dash_22s_linear_infinite]"
              d="M-20 430C90 430 90 300 200 300s110 130 220 130 120-90 120-90"
              stroke="#BAE6FD"
              strokeDasharray="7 9"
              strokeWidth="2"
            />
            <path
              className="animate-[dash_30s_linear_infinite_reverse]"
              d="M-10 470C110 470 120 370 230 370s110 100 220 100 90-70 90-70"
              stroke="#E0F2FE"
              strokeDasharray="5 10"
              strokeWidth="2"
            />
            <circle cx="200" cy="300" fill="#7DD3FC" r="5" />
            <circle cx="420" cy="430" fill="#7DD3FC" r="5" />
          </svg>

          <div className={`${FLOAT_CHIP} top-[34px] -left-4 max-[900px]:top-0 max-[900px]:left-0 max-[640px]:top-[-4px] max-[640px]:left-1`}>
            <span
              aria-hidden="true"
              className={`grid place-items-center shrink-0 size-[34px] rounded-[10px] max-[640px]:size-[30px] max-[640px]:rounded-[9px] ${CHIP_ICON_TONES.green}`}
            >
              <IconShield className="icon size-[18px] max-[640px]:size-4" />
            </span>
            <span>
              <strong className="block font-heading text-xs font-bold leading-[1.3] text-ink max-[640px]:text-[11px]">
                Tài xế đã xác thực
              </strong>
              <em className="block not-italic text-[10.5px] text-slate-500 max-[640px]:text-[9.5px] max-[400px]:hidden">
                CCCD, GPLX & bảo hiểm
              </em>
            </span>
          </div>

          <article
            aria-label="Ví dụ chuyến xe Hà Nội đi Hải Phòng"
            className="group relative z-[2] w-[min(390px,100%)] p-[22px] border border-slate-200/90 rounded-[22px] bg-white shadow-[0_34px_70px_-34px_rgba(8,20,38,0.4),0_2px_6px_rgba(8,20,38,0.04)] before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-1 before:rounded-t-[22px] before:bg-[linear-gradient(90deg,var(--sky-500),var(--sky-300)_55%,var(--orange-500))] max-[640px]:p-[18px] max-[640px]:rounded-[20px]"
          >
            <div className="flex items-center justify-between gap-3 mb-[18px]">
              <span className="text-[10.5px] font-bold tracking-[0.12em] uppercase text-slate-500">
                Chuyến xe sắp tới
              </span>
              <span className="badge badge--green">Còn 2 ghế</span>
            </div>

            <div className="flex flex-col">
              <div className="grid grid-cols-[46px_22px_1fr] gap-x-2.5 items-start relative">
                <span className="pt-0.5 font-heading text-sm font-bold leading-[1.2] text-ink">
                  07:00
                </span>
                <span className="relative flex justify-center h-full">
                  <span className="absolute top-[14px] left-1/2 -translate-x-1/2 w-0.5 h-[calc(100%+20px)] bg-[repeating-linear-gradient(to_bottom,#d8e6f2_0_4px,transparent_4px_8px)]" />
                  <span className="relative z-[1] mt-1 size-[11px] rounded-full bg-sky-600 shadow-[0_0_0_4px_rgba(2,132,199,0.13)]" />
                </span>
                <div>
                  <strong className="block font-heading text-[15.5px] font-bold leading-[1.3] text-ink">
                    Hà Nội
                  </strong>
                  <span className="block mt-px text-[11.5px] text-slate-500">
                    Bến xe Mỹ Đình
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-[46px_22px_1fr] gap-x-2.5 items-start relative min-h-9">
                <span className="pt-1.5 text-[11px] font-semibold text-sky-700">
                  2h 10p
                </span>
                <span className="relative flex justify-center h-full">
                  <span className="absolute top-[14px] left-1/2 -translate-x-1/2 w-0.5 h-[calc(100%+20px)] bg-[repeating-linear-gradient(to_bottom,#d8e6f2_0_4px,transparent_4px_8px)]" />
                </span>
                <span className="pt-1.5 text-[11.5px] leading-[1.4] text-slate-400">
                  Cao tốc Hà Nội – Hải Phòng
                </span>
              </div>
              <div className="grid grid-cols-[46px_22px_1fr] gap-x-2.5 items-start relative">
                <span className="pt-0.5 font-heading text-sm font-bold leading-[1.2] text-ink">
                  09:10
                </span>
                <span className="relative flex justify-center h-full">
                  <span className="relative z-[1] mt-1 size-[11px] rounded-full border-[2.5px] border-orange-500 bg-white shadow-[0_0_0_4px_rgba(249,115,22,0.12)]" />
                </span>
                <div>
                  <strong className="block font-heading text-[15.5px] font-bold leading-[1.3] text-ink">
                    Hải Phòng
                  </strong>
                  <span className="block mt-px text-[11.5px] text-slate-500">
                    Trung tâm thành phố
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 mt-[18px] pt-4 border-t border-dashed border-line">
              <div className="flex items-center gap-2.5 min-w-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  className="avatar avatar--photo size-11 border-2 border-white shadow-[0_4px_10px_-4px_rgba(8,20,38,0.4)]"
                  height={44}
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1661588156316-cdcbe2e0c8ad?q=80&w=160"
                  width={44}
                />
                <div className="min-w-0">
                  <strong className="block font-heading text-[13.5px] font-bold leading-[1.35] text-ink">
                    Trần Minh Hiếu
                  </strong>
                  <span className="flex items-center gap-[3px] text-[11px] text-slate-500">
                    <IconStar className="icon size-3 text-[#f59e0b]" />
                    4.9 · 128 chuyến
                  </span>
                  <span className="block text-[11px] text-slate-400">
                    Ford Transit · 9 chỗ
                  </span>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <strong className="block font-heading text-[17px] font-extrabold leading-[1.2] tracking-[-0.02em] text-ink max-[400px]:text-[15.5px]">
                  180.000đ
                </strong>
                <span className="block text-[10.5px] text-slate-400">
                  /ghế
                </span>
              </div>
            </div>
          </article>

          <div className={`${FLOAT_CHIP} -right-2.5 bottom-[34px] [animation-delay:-3.5s] max-[900px]:right-0 max-[900px]:bottom-0 max-[640px]:right-1 max-[640px]:bottom-[-4px]`}>
            <span
              aria-hidden="true"
              className={`grid place-items-center shrink-0 size-[34px] rounded-[10px] max-[640px]:size-[30px] max-[640px]:rounded-[9px] ${CHIP_ICON_TONES.orange}`}
            >
              <IconWallet className="icon size-[18px] max-[640px]:size-4" />
            </span>
            <span>
              <strong className="block font-heading text-xs font-bold leading-[1.3] text-ink max-[640px]:text-[11px]">
                Tiết kiệm 40%
              </strong>
              <em className="block not-italic text-[10.5px] text-slate-500 max-[640px]:text-[9.5px] max-[400px]:hidden">
                so với taxi truyền thống
              </em>
            </span>
          </div>
        </div>
      </div>

      <div className="container">
        <Reveal className="trust-strip relative grid grid-cols-4 mt-[clamp(36px,5vw,56px)] px-2 py-[22px] border border-[#e8f0f7] rounded-lg bg-white shadow-[0_24px_60px_-40px_rgba(8,20,38,0.4)] max-[1024px]:grid-cols-2 max-[1024px]:gap-y-5 max-[1024px]:px-1.5 max-[1024px]:py-5 max-[520px]:grid-cols-1 max-[520px]:px-[18px] max-[520px]:py-1.5 max-[520px]:gap-y-0">
          {TRUST_ITEMS.map((item, index) => {
            const TrustIcon = item.Icon;
            return (
              <div className={TRUST_ITEM_CLASSES[index]} key={item.label}>
                <span
                  aria-hidden="true"
                  className={`grid place-items-center shrink-0 size-11 rounded-xl max-[640px]:size-10 ${TRUST_TONES[item.tone]}`}
                >
                  <TrustIcon className="icon size-[22px]" />
                </span>
                <div>
                  <strong className="block font-heading text-[21px] font-extrabold leading-[1.2] tracking-[-0.02em] text-ink">
                    {item.value}
                  </strong>
                  <span className="block text-xs leading-[1.3] text-slate-500">
                    {item.label}
                  </span>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
