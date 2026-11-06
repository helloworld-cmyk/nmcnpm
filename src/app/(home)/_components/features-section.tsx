import { Reveal } from "@/components/ui/reveal";
import { ArtDriver, ArtPickup, ArtPrice, ArtSupport } from "@/components/art";
import { IconArrowRight, IconShield } from "@/components/icons";

const FEATURES = [
  {
    Art: ArtPrice,
    title: "Giá trọn gói",
    description:
      "Báo giá trước khi đặt, đã gồm cầu đường và bảo hiểm. Không phụ phí, không phát sinh.",
    delay: "0ms",
    dark: true,
  },
  {
    Art: ArtPickup,
    title: "Đón trả tận nơi",
    description:
      "Đón tại nhà, trả đúng điểm hẹn — tiết kiệm thời gian di chuyển và trung chuyển.",
    delay: "60ms",
    dark: false,
  },
  {
    Art: ArtDriver,
    title: "Tài xế xác thực",
    description:
      "100% tài xế được kiểm duyệt CCCD, GPLX, lý lịch và chất lượng phương tiện.",
    delay: "120ms",
    dark: false,
  },
  {
    Art: ArtSupport,
    title: "Hỗ trợ 24/7",
    description:
      "Đội ngũ Vi Vu Việt đồng hành mọi cung đường, sẵn sàng xử lý mọi tình huống.",
    delay: "180ms",
    dark: false,
  },
];

export function FeaturesSection() {
  return (
    <section className="section" id="vi-sao">
      <div className="container grid grid-cols-[0.85fr_1.15fr] gap-[clamp(40px,6vw,88px)] items-start max-[1024px]:grid-cols-1 max-[1024px]:gap-10">
        <Reveal className="sticky top-[calc(var(--header-h)+32px)] max-[1024px]:static">
          <span className="section-eyebrow">Vì sao chọn Vi Vu Việt</span>
          <h2 className="mt-3 text-[clamp(1.85rem,3.2vw,2.65rem)] font-extrabold leading-[1.12] tracking-[-0.032em] text-ink [text-wrap:balance]">
            Chuyến đi an tâm,
            <br />
            chi phí dễ chịu.
          </h2>
          <p className="max-w-[360px] mt-4 text-[15.5px] leading-[1.75] text-slate-600 max-[1024px]:max-w-[560px]">
            Vi Vu Việt được xây dựng quanh một điều đơn giản: đi chung để mọi
            người đều đến nơi nhẹ nhàng hơn — an toàn hơn, minh bạch hơn và tiết
            kiệm hơn.
          </p>
          <a className="text-link mt-5" href="#faq">
            Tìm hiểu cam kết an toàn
            <IconArrowRight />
          </a>
          <div className="flex gap-3 max-w-[360px] mt-[30px] px-[18px] py-4 border border-[rgba(3,105,161,0.16)] border-l-[3px] border-l-sky-500 rounded-[14px] bg-sky-100 shadow-xs text-[12.5px] leading-[1.55] text-slate-600 max-[1024px]:max-w-[560px]">
            <span
              aria-hidden="true"
              className="grid place-items-center shrink-0 size-[34px] rounded-[10px] text-green-600 bg-white shadow-[inset_0_0_0_1px_rgba(5,150,105,0.18),0_1px_2px_rgba(8,20,38,0.05)]"
            >
              <IconShield className="icon size-[18px]" />
            </span>
            <span>
              <strong className="text-[13px] text-ink">
                Bảo hiểm 100% chuyến đi
              </strong>
              <br />
              Mỗi hành khách đều được bảo vệ trong suốt hành trình.
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 max-[768px]:gap-3.5 max-[640px]:grid-cols-1">
          {FEATURES.map((feature) => {
            const FeatureArt = feature.Art;
            return (
              <Reveal as="article" key={feature.title} delay={feature.delay} className={`group overflow-hidden border rounded-md bg-white shadow-xs transition-[transform,border-color,box-shadow] duration-(--dur) ease-swift hover:-translate-y-[3px] hover:border-sky-200 hover:shadow-md ${
                  feature.dark
                    ? "border-transparent bg-[linear-gradient(150deg,var(--navy-800),#123a64)] shadow-[0_20px_40px_-24px_rgba(8,20,38,0.55)]"
                    : "border-line"
                }`}>
                <figure className="relative m-0 aspect-[320/140] overflow-hidden bg-sky-50">
                  <FeatureArt className="w-full h-full transition-transform duration-[600ms] ease-swift group-hover:scale-[1.035]" />
                </figure>
                <div className="px-[22px] pt-[22px] pb-6">
                  <h3
                    className={`mb-[7px] text-[17px] font-bold ${
                      feature.dark ? "text-white" : ""
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`text-sm leading-[1.68] ${
                      feature.dark ? "text-[#b9c7d8]" : "text-slate-600"
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
