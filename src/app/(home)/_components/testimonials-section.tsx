import { Reveal } from "@/components/ui/reveal";
import { IconCheck } from "@/components/icons";
import { Stars } from "./stars";

const TESTIMONIALS = [
  {
    quote:
      "“Đặt chuyến Hà Nội – Hải Phòng lúc 9h tối, 10 phút sau đã có tài xế xác nhận. Xe sạch, đúng giờ, giá đúng như báo.”",
    name: "Nguyễn Minh Anh",
    route: "Hà Nội → Hải Phòng",
    avatar:
      "https://images.unsplash.com/photo-1726067438503-9c9c5d3ebe22?q=80&w=160",
    delay: "0ms",
  },
  {
    quote:
      "“Thường xuyên về quê Nam Định cuối tuần. Ghép xe tiện hơn đi bus, lại được đón tận cửa. Đặt qua app rất nhanh.”",
    name: "Trần Quốc Bảo",
    route: "Hà Nội → Nam Định",
    avatar:
      "https://images.unsplash.com/photo-1611403119860-57c4937ef987?q=80&w=160",
    delay: "80ms",
  },
  {
    quote:
      "“Chuyến Sài Gòn – Vũng Tàu ổn định, tài xế thân thiện. Mình thích nhất là theo dõi được vị trí xe cho người nhà yên tâm.”",
    name: "Lê Thu Hà",
    route: "TP. HCM → Vũng Tàu",
    avatar:
      "https://images.unsplash.com/photo-1728226773012-19303e779077?q=80&w=160",
    delay: "160ms",
  },
];

export function TestimonialsSection() {
  return (
    <section className="section section--white" id="danh-gia">
      <div className="container">
        <Reveal className="section-head head-row">
          <div>
            <span className="section-eyebrow">Khách hàng nói gì</span>
            <h2>
              25.000+ chuyến đi
              <br />
              nhẹ nhàng hơn.
            </h2>
          </div>
          <div className="flex flex-col items-end gap-0.5 shrink-0 pb-1.5 max-[768px]:items-start">
            <Stars className="mb-0.5" />
            <strong className="font-heading text-[22px] font-extrabold leading-[1.2] text-ink">
              4.9/5
            </strong>
            <span className="text-xs text-slate-500">
              25.400 đánh giá đã xác thực
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-3 gap-[18px] max-[900px]:grid-cols-1">
          {TESTIMONIALS.map((item) => (
            <Reveal as="article" key={item.name} delay={item.delay} className="flex flex-col gap-[18px] p-6 border border-line rounded-md bg-app transition-[transform,border-color,box-shadow] duration-(--dur) ease-swift hover:-translate-y-[3px] hover:border-[#cfe6f6] hover:shadow-sm max-[900px]:max-w-[600px]">
              <Stars />
              <blockquote className="flex-1 m-0">
                <p className="text-[14.5px] leading-[1.72] text-slate-700">
                  {item.quote}
                </p>
              </blockquote>
              <div className="flex items-center gap-[11px] pt-4 border-t border-line">
                <div className="relative shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    className="avatar avatar--photo size-[46px] border-2 border-white shadow-[0_2px_8px_-2px_rgba(8,20,38,0.25)]"
                    src={item.avatar}
                    width={46}
                    height={46}
                    loading="lazy"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -right-1 -bottom-1 grid place-items-center size-[17px] border-2 border-white rounded-full bg-green-600 text-white"
                  >
                    <IconCheck className="icon size-[9px]" />
                  </span>
                  <span className="sr-only">Người dùng đã xác thực</span>
                </div>
                <div>
                  <strong className="block text-[13.5px] font-bold leading-[1.35] text-ink">
                    {item.name}
                  </strong>
                  <span className="block text-[11.5px] text-slate-500">
                    {item.route}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
