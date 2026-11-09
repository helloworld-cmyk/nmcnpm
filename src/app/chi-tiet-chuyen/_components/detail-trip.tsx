import { Reveal } from "@/components/ui/reveal";

const TRIP = {
  eyebrow: "Hà Nội → Ninh Bình · Thứ Năm, 29/10",
  depart: "06:30",
  arrive: "08:45",
  seatsLeft: "Còn 11 ghế",
  from: { place: "Hà Nội", detail: "Bến xe Mỹ Đình · Cổng 12" },
  to: { place: "Ninh Bình", detail: "Trung tâm thành phố" },
  duration: "2h 15p",
  note: "Cao tốc CT.01",
  price: "180.000đ",
};

/* Chấm điểm đầu/cuối hành trình kèm vòng ping nhấp nháy */
const PING_RING =
  "absolute -inset-[3px] rounded-full border-[1.5px] animate-[ticketDotPing_2.8s_ease-out_infinite]";

function RouteNode({ end = false }: { end?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`relative z-[1] mt-0 size-[11px] shrink-0 rounded-full max-[640px]:self-center ${
        end
          ? "border-[2.5px] border-[var(--orange-500)] bg-white shadow-[0_0_0_4px_rgba(249,115,22,0.12)]"
          : "bg-[var(--sky-600)] shadow-[0_0_0_4px_rgba(2,132,199,0.13)]"
      }`}
    >
      <span
        aria-hidden="true"
        className={`${PING_RING} ${
          end
            ? "border-[rgba(249,115,22,0.4)] [animation-delay:1.4s]"
            : "border-[rgba(2,132,199,0.35)]"
        }`}
      />
    </span>
  );
}

export function DetailTrip() {
  return (
    <Reveal
      as="article"
      className="relative mt-[clamp(12px,1.4vw,16px)] grid w-full grid-cols-[minmax(0,1fr)_176px] rounded-[var(--radius-md)] border border-[var(--slate-300)] bg-[var(--surface)] shadow-xs before:absolute before:z-[2] before:-top-px before:left-[calc(100%-188px)] before:h-[11px] before:w-[22px] before:rounded-b-full before:border before:border-[var(--slate-300)] before:border-t-0 before:bg-[var(--bg)] after:absolute after:z-[2] after:-bottom-px after:left-[calc(100%-188px)] after:h-[11px] after:w-[22px] after:rounded-t-full after:border after:border-[var(--slate-300)] after:border-b-0 after:bg-[var(--bg)] max-[768px]:grid-cols-1 max-[768px]:before:hidden max-[768px]:after:hidden"
    >
      <div className="min-w-0 p-[14px_18px_18px] max-[400px]:p-3.5">
        <div className="mb-2.5 flex items-start justify-between gap-3">
          <div className="grid min-w-0 gap-[3px]">
            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--slate-500)]">
              {TRIP.eyebrow}
            </span>
            <p className="flex items-baseline gap-[5px] font-heading text-[17px] font-extrabold leading-[1.2] tracking-[-0.02em] text-[var(--ink)]">
              <strong>{TRIP.depart}</strong>
              <span aria-hidden="true" className="font-semibold text-[var(--slate-400)]">
                –
              </span>
              <span className="sr-only">đến</span>
              <strong>{TRIP.arrive}</strong>
            </p>
          </div>
          <span className="badge badge--green">{TRIP.seatsLeft}</span>
        </div>

        <div className="flex items-center gap-[7px] max-[640px]:grid max-[640px]:grid-cols-[11px_minmax(0,1fr)] max-[640px]:gap-x-[7px] max-[640px]:gap-y-1.5 max-[640px]:[grid-template-areas:'dot-start_place-start''track_track''dot-end_place-end']">
          <div className="min-w-0 max-[640px]:[grid-area:place-start]">
            <strong className="block font-heading text-sm font-bold leading-[1.3] text-[var(--ink)]">
              {TRIP.from.place}
            </strong>
            <span className="block truncate text-[11px] leading-[1.4] text-[var(--slate-500)]">
              {TRIP.from.detail}
            </span>
          </div>

          <RouteNode />

          <div className="grid min-w-[92px] flex-[1_1_120px] justify-items-center gap-0.5 max-[640px]:[grid-area:track] max-[640px]:ml-[18px] max-[640px]:flex-row max-[640px]:items-center max-[640px]:gap-1.5 max-[640px]:min-w-0">
            <span className="text-[10.5px] font-bold text-[var(--sky-700)]">
              {TRIP.duration}
            </span>
            <span
              aria-hidden="true"
              className="h-0.5 w-full max-[640px]:hidden max-[640px]:flex-1 bg-[repeating-linear-gradient(to_right,var(--slate-300)_0_4px,transparent_4px_8px)]"
            />
            <span className="text-[10px] text-[var(--slate-400)]">{TRIP.note}</span>
          </div>

          <RouteNode end />

          <div className="min-w-0 text-right max-[640px]:[grid-area:place-end] max-[640px]:text-left">
            <strong className="block font-heading text-sm font-bold leading-[1.3] text-[var(--ink)]">
              {TRIP.to.place}
            </strong>
            <span className="block truncate text-[11px] leading-[1.4] text-[var(--slate-500)]">
              {TRIP.to.detail}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-2 border-l border-dashed border-[var(--slate-300)] p-[14px_18px] text-right max-[768px]:flex-row max-[768px]:items-center max-[768px]:justify-between max-[768px]:border-l-0 max-[768px]:border-t max-[768px]:border-dashed max-[768px]:border-t-[var(--slate-300)] max-[768px]:text-left max-[400px]:p-3.5">
        <p className="inline-flex items-baseline gap-1 whitespace-nowrap">
          <strong className="font-heading text-[22px] font-extrabold leading-[1.2] tracking-[-0.02em] text-[var(--ink)]">
            {TRIP.price}
          </strong>
          <span className="text-sm whitespace-nowrap text-[var(--slate-500)]">/ghế</span>
        </p>
      </div>
    </Reveal>
  );
}
