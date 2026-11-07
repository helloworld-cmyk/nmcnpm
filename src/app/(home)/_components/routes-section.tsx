"use client";

import {
  IconArrowRight,
  IconArrowUpRight,
  IconClock,
  IconUsers,
} from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { requestBookingPrefill } from "../_utils/booking-events";

type RouteCard = {
  region: string;
  popular?: boolean;
  from: string;
  to: string;
  fromLabel: string;
  toLabel: string;
  duration: string;
  trips: string;
  price: string;
  delay: string;
};

const ROUTES: RouteCard[] = [
  {
    region: "Miền Bắc",
    popular: true,
    from: "Hà Nội",
    to: "Hải Phòng",
    fromLabel: "Hà Nội",
    toLabel: "Hải Phòng",
    duration: "2h 10p",
    trips: "14 chuyến/ngày",
    price: "180.000đ",
    delay: "0ms",
  },
  {
    region: "Miền Bắc",
    from: "Hà Nội",
    to: "Thanh Hóa",
    fromLabel: "Hà Nội",
    toLabel: "Thanh Hóa",
    duration: "3h 00p",
    trips: "10 chuyến/ngày",
    price: "220.000đ",
    delay: "60ms",
  },
  {
    region: "Miền Bắc",
    from: "Hà Nội",
    to: "Nam Định",
    fromLabel: "Hà Nội",
    toLabel: "Nam Định",
    duration: "2h 00p",
    trips: "12 chuyến/ngày",
    price: "150.000đ",
    delay: "120ms",
  },
  {
    region: "Miền Nam",
    from: "TP. Hồ Chí Minh",
    to: "Vũng Tàu",
    fromLabel: "TP. HCM",
    toLabel: "Vũng Tàu",
    duration: "2h 30p",
    trips: "16 chuyến/ngày",
    price: "200.000đ",
    delay: "0ms",
  },
  {
    region: "Miền Nam",
    from: "TP. Hồ Chí Minh",
    to: "Đà Lạt",
    fromLabel: "TP. HCM",
    toLabel: "Đà Lạt",
    duration: "6h 30p",
    trips: "8 chuyến/ngày",
    price: "350.000đ",
    delay: "60ms",
  },
  {
    region: "Miền Trung",
    from: "Đà Nẵng",
    to: "Huế",
    fromLabel: "Đà Nẵng",
    toLabel: "Huế",
    duration: "2h 45p",
    trips: "10 chuyến/ngày",
    price: "180.000đ",
    delay: "120ms",
  },
];

export function RoutesSection() {
  return (
    <section className="section" id="tuyen-duong">
      <div className="container">
        <Reveal className="section-head head-row">
          <div>
            <span className="section-eyebrow">Tuyến đường phổ biến</span>
            <h2>
              Đi đâu cũng có chuyến,
              <br />
              giá luôn minh bạch.
            </h2>
            <p>
              Hơn 120 tuyến liên tỉnh hoạt động mỗi ngày. Chọn tuyến để xem
              chuyến gần nhất và đặt chỗ ngay.
            </p>
          </div>
          <a className="text-link" href="#dat-xe">
            Xem tất cả tuyến
            <IconArrowRight />
          </a>
        </Reveal>

        <div className="grid grid-cols-3 gap-[18px] max-[1024px]:grid-cols-2 max-[768px]:gap-3.5 max-[640px]:grid-cols-1">
          {ROUTES.map((route) => (
            <Reveal as="button" type="button" key={`${route.from}-${route.to}`} delay={route.delay} className="group flex flex-col gap-4 w-full p-5 border border-line rounded-md bg-white shadow-xs text-left cursor-pointer transition-[transform,box-shadow,border-color] duration-[260ms] ease-swift hover:-translate-y-1 hover:border-sky-200 hover:shadow-md active:translate-y-px max-[768px]:p-[18px]" onClick={() => requestBookingPrefill({ from: route.from, to: route.to })}>
              <div className="flex items-center justify-between gap-2.5 min-h-[22px]">
                <span className="text-[10.5px] font-bold tracking-[0.12em] uppercase text-slate-400">
                  {route.region}
                </span>
                {route.popular ? (
                  <span className="badge badge--orange">Phổ biến</span>
                ) : null}
              </div>
              <div className="flex items-center flex-wrap gap-2 font-heading text-[17.5px] font-bold leading-[1.3] tracking-[-0.02em] text-ink max-[640px]:text-lg">
                <span>{route.fromLabel}</span>
                <IconArrowRight className="icon size-[17px] text-sky-500" />
                <span>{route.toLabel}</span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                <span className="inline-flex items-center gap-[5px]">
                  <IconClock className="icon size-3.5 text-slate-400" />
                  {route.duration}
                </span>
                <span className="inline-flex items-center gap-[5px]">
                  <IconUsers className="icon size-3.5 text-slate-400" />
                  {route.trips}
                </span>
              </div>
              <div className="flex items-center justify-between mt-auto pt-3.5 border-t border-line-soft">
                <span className="text-[11.5px] text-slate-500">
                  Từ{" "}
                  <strong className="ml-1 font-heading text-base font-extrabold text-ink">
                    {route.price}
                  </strong>
                </span>
                <span
                  aria-hidden="true"
                  className="grid place-items-center size-[34px] rounded-full bg-sky-50 text-sky-700 transition-[background,color,transform] duration-(--dur) ease-swift group-hover:bg-sky-700 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <IconArrowUpRight className="icon size-4" />
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
