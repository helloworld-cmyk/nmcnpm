"use client";

import { IconArrowRight, IconArrowUpRight } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { useBookingFormStore } from "@/global-states/booking-form-store";
import { usePopularDestinations } from "../_hooks/use-popular-destinations";

/*
 * Danh sách điểm đến lấy hoàn toàn từ API /areas (tỉnh + thành phố), không
 * seed sẵn tuyến hay số liệu marketing trong code.
 */
const AREA_TYPE_LABEL: Record<string, string> = {
  city: "Thành phố",
  province: "Tỉnh",
  district: "Quận/Huyện",
  ward: "Phường/Xã",
};

const GRID =
  "grid grid-cols-4 gap-3 max-[1024px]:grid-cols-3 max-[640px]:grid-cols-2";

const TILE =
  "group flex items-center justify-between gap-3 w-full px-4 py-3.5 border border-line rounded-md bg-white shadow-xs text-left cursor-pointer transition-[transform,box-shadow,border-color] duration-[260ms] ease-swift hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md active:translate-y-px";

const SKELETON_COUNT = 8;
const VISIBLE_COUNT = 8;

export function RoutesSection() {
  const requestDestinationPrefill = useBookingFormStore(
    (state) => state.requestDestinationPrefill,
  );

  const { areas, loading, failed } = usePopularDestinations();

  return (
    <section className="section" id="tuyen-duong">
      <div className="container">
        <Reveal className="section-head head-row">
          <div>
            <span className="section-eyebrow">Điểm đến phổ biến</span>
            <h2>
              Đi đâu cũng có chuyến,
              <br />
              giá luôn minh bạch.
            </h2>
            <p>
              {areas.length > 0
                ? `${areas.length} tỉnh/thành đang có trong hệ thống. Chọn điểm đến để điền sẵn và tìm chuyến gần nhất.`
                : "Chọn điểm đến để điền sẵn và tìm chuyến gần nhất."}
            </p>
          </div>
          <a className="text-link" href="#dat-xe">
            Đặt chuyến ngay
            <IconArrowRight />
          </a>
        </Reveal>

        {failed ? (
          <p className="text-[13.5px] font-medium text-slate-500">
            Không tải được danh sách điểm đến. Vui lòng thử lại sau.
          </p>
        ) : (
          <div className={GRID}>
            {loading
              ? Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                  <AreaTileSkeleton key={index} />
                ))
              : areas.slice(0, VISIBLE_COUNT).map((area, index) => (
                  <Reveal
                    as="button"
                    type="button"
                    key={area.id}
                    delay={`${Math.min(index, 6) * 40}ms`}
                    className={TILE}
                    onClick={() => requestDestinationPrefill(area)}
                  >
                    <span className="flex min-w-0 flex-col gap-0.5">
                      <span className="text-[10.5px] font-bold tracking-[0.12em] uppercase text-slate-400">
                        {AREA_TYPE_LABEL[area.type.trim().toLowerCase()] ??
                          "Địa điểm"}
                      </span>
                      <span className="truncate font-heading text-[15.5px] font-bold text-ink">
                        {area.name}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="grid place-items-center size-[30px] shrink-0 rounded-full bg-sky-50 text-sky-700 transition-[background,color,transform] duration-(--dur) ease-swift group-hover:bg-sky-700 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      <IconArrowUpRight className="icon size-4" />
                    </span>
                  </Reveal>
                ))}
          </div>
        )}
      </div>
    </section>
  );
}

function AreaTileSkeleton() {
  return (
    <div className={TILE}>
      <span className="flex w-full flex-col gap-1.5">
        <span className="h-2.5 w-12 rounded bg-slate-100 animate-pulse" />
        <span className="h-4 w-2/3 rounded bg-slate-100 animate-pulse" />
      </span>
    </div>
  );
}