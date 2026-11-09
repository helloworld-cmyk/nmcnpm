import { IconArrowRight } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";

export function CtaSection() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="relative flex items-center justify-between flex-wrap gap-10 overflow-hidden px-[clamp(32px,5vw,56px)] py-[clamp(32px,5vw,56px)] border border-[#cfe9fa] rounded-xl bg-[linear-gradient(120deg,#eaf6ff_0%,#f4faff_48%,#e6f4fe_100%)] before:content-[''] before:absolute before:-top-[90px] before:-right-20 before:size-[340px] before:border before:border-dashed before:border-sky-200 before:rounded-full before:opacity-80 before:pointer-events-none after:content-[''] after:absolute after:right-10 after:-bottom-[100px] after:size-[240px] after:border after:border-dashed after:border-sky-200 after:rounded-full after:opacity-60 after:pointer-events-none max-[900px]:flex-col max-[900px]:items-start max-[640px]:px-[22px] max-[640px]:py-7 max-[640px]:rounded-[22px]">
          <div className="relative z-[1] min-w-0 flex-1 max-w-[520px]">
            <span className="section-eyebrow">Sẵn sàng lên đường?</span>
            <h2 className="mt-3 text-[clamp(1.8rem,3vw,2.4rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-ink [text-wrap:balance]">
              Chuyến đi tiếp theo,
              <br />
              bắt đầu từ đây.
            </h2>
            <p className="mt-2.5 text-[15px] leading-[1.65] text-slate-600">
              Đặt xe ghép liên tỉnh chỉ trong 60 giây — giá tốt, đón tận nơi, hỗ
              trợ 24/7.
            </p>
          </div>
          <div className="relative z-[1] flex items-center justify-end flex-wrap gap-2.5 max-w-[420px] max-[900px]:justify-start max-[640px]:w-full max-[520px]:flex-col max-[520px]:items-stretch">
            <a className="btn btn-primary btn-lg max-[640px]:w-full" href="#dat-xe">
              Đặt chuyến ngay
              <IconArrowRight />
            </a>
            <span className="basis-full text-[11.5px] text-right text-slate-500 max-[900px]:text-left">
              Không cần đặt cọc · Hủy miễn phí trước 2 giờ
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
