import { Reveal } from "@/components/ui/reveal";
import { ArrivalScene } from "./arrival-scene";
import { CompareScene } from "./compare-scene";
import { RouteScene } from "./route-scene";

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
