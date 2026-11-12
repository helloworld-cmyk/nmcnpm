import Link from "next/link";
import { IconArrowRight, IconPin } from "@/components/icons";
import type { AvatarTone, Ride } from "../_utils/to-ride";
import { formatPrice } from "../_utils/format";

const AVATAR_TONE: Record<AvatarTone, string> = {
  sky: "bg-[linear-gradient(135deg,var(--sky-800),var(--sky-500))]",
  orange: "bg-[linear-gradient(135deg,var(--orange-700),var(--orange-500))]",
  green: "bg-[linear-gradient(135deg,var(--green-700),var(--green-600))]",
  navy: "bg-[linear-gradient(135deg,var(--navy-700),var(--navy-900))]",
};

const NOTCH =
  "before:content-[''] before:absolute before:z-[1] before:bottom-[60px] before:size-3 before:h-6 before:border before:border-[var(--slate-300)] before:bg-[var(--bg)] before:-left-px before:border-l-0 before:rounded-r-full after:content-[''] after:absolute after:z-[1] after:bottom-[60px] after:size-3 after:border after:border-[var(--slate-300)] after:bg-[var(--bg)] after:-right-px after:border-r-0 after:rounded-l-full max-[640px]:before:bottom-[62px] max-[640px]:after:bottom-[62px]";

const CARD = `relative flex w-full flex-col rounded-[var(--radius-md)] border border-[var(--slate-300)] bg-white px-[18px] pt-[15px] pb-4 shadow-xs transition-[transform,border-color,box-shadow] duration-[var(--dur)] ease-[var(--ease)] hover:-translate-y-0.5 hover:border-[var(--slate-400)] hover:shadow-sm hover:before:border-[var(--slate-400)] hover:after:border-[var(--slate-400)] ${NOTCH}`;

export function RideCard({ ride }: { ride: Ride }) {
  return (
    <article className={CARD}>
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
        <strong className="font-heading text-[17px] font-extrabold tracking-[-0.02em] text-[var(--ink)] max-[400px]:text-base">
          {ride.time}
        </strong>
        <span className="text-xs font-semibold text-[var(--slate-500)]">
          {ride.duration}
        </span>
        <span className={`badge badge--${ride.badgeTone} ml-auto`}>
          {ride.badgeText}
        </span>
      </div>

      <p className="mt-[7px] flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] font-medium leading-[1.4] text-[var(--slate-600)]">
        <IconPin className="size-[15px] shrink-0 text-[var(--sky-600)]" />
        {ride.pickup}
        <IconArrowRight className="size-[15px] shrink-0 text-[var(--sky-600)]" />
        {ride.dropoff}
      </p>

      <div className="mt-[11px] mb-3.5 flex flex-wrap items-center justify-between gap-3 border-t border-line-soft pt-[11px] max-[640px]:flex-wrap">
        <div className="flex min-w-0 items-center gap-2.5 max-[640px]:flex-[1_1_100%]">
          <span
            aria-hidden="true"
            className={`grid size-[38px] shrink-0 place-items-center rounded-full font-heading text-xs font-bold text-white ${AVATAR_TONE[ride.avatarTone]}`}
          >
            {ride.companyInitials}
          </span>
          <div className="min-w-0">
            <strong className="block font-heading text-[13px] font-bold leading-[1.35] text-[var(--ink)]">
              {ride.companyName}
            </strong>
            <span className="block truncate text-[11px] text-[var(--slate-500)]">
              {ride.routeName} · {ride.routeCode}
            </span>
          </div>
        </div>
        <span className="text-[11px] leading-[1.4] text-[var(--slate-400)] max-[640px]:ml-auto max-[640px]:max-w-none">
          Mã chuyến {ride.tripCode}
        </span>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-dashed border-[var(--slate-300)] -mx-[18px] px-[18px] pt-[13px]">
        <p className="inline-flex items-baseline gap-1 whitespace-nowrap">
          <strong className="font-heading text-lg font-extrabold text-[var(--ink)] max-[400px]:text-[17px]">
            {formatPrice(ride.price)}
          </strong>
          <span className="text-sm whitespace-nowrap text-[var(--slate-500)]">
            / ghế
          </span>
        </p>
        <Link
          className="btn btn-primary btn-sm"
          href={`/chi-tiet-chuyen?trip=${encodeURIComponent(ride.id)}`}
        >
          Chọn chuyến
        </Link>
      </div>
    </article>
  );
}
