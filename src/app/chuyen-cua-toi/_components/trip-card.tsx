"use client";

import Link from "next/link";
import {
  IconArrowRight,
  IconCheck,
  IconCheckCircle,
  IconClock,
  IconClose,
  IconPhone,
  IconPin,
  IconWallet,
} from "@/components/icons";
import { useTripsStore } from "@/global-states/trips-store";
import type { Trip } from "../_data/trips";
import { formatTripPrice } from "../_data/trips";

const CARD =
  "group relative flex w-full flex-col rounded-[var(--radius-md)] border border-[var(--slate-300)] bg-white px-[18px] pt-[15px] pb-4 shadow-[var(--shadow-xs)] transition-[transform,border-color,box-shadow] duration-[var(--dur)] ease-[var(--ease)] hover:-translate-y-0.5 hover:border-[var(--slate-400)] hover:shadow-[var(--shadow-sm)]";

/* Cuống vé: đường perforation + hai nửa vòng tròn khoét hai bên */
const FOOT =
  "relative mt-auto flex flex-wrap items-center justify-between gap-3 -mx-[18px] border-t border-dashed border-[var(--slate-300)] px-[18px] pt-[13px] before:absolute before:-top-[13px] before:-left-px before:z-[1] before:h-6 before:w-3 before:rounded-r-full before:border before:border-l-0 before:border-[var(--slate-300)] before:bg-[var(--bg)] before:content-[''] after:absolute after:-top-[13px] after:-right-px after:z-[1] after:h-6 after:w-3 after:rounded-l-full after:border after:border-r-0 after:border-[var(--slate-300)] after:bg-[var(--bg)] after:content-[''] group-hover:before:border-[var(--slate-400)] group-hover:after:border-[var(--slate-400)]";

const STATUS_BADGE = {
  confirmed: {
    className: "bg-[var(--green-100)] text-[var(--green-700)]",
    icon: IconCheck,
    label: "Đã xác nhận",
  },
  pending: {
    className: "bg-[#fff1e7] text-[#9a3412]",
    icon: IconClock,
    label: "Chờ xác nhận",
  },
  ongoing: {
    className: "bg-[var(--sky-100)] text-[var(--sky-800)]",
    icon: IconArrowRight,
    label: "Đang di chuyển",
  },
  done: {
    className:
      "bg-[var(--green-50)] text-[var(--green-700)] shadow-[inset_0_0_0_1px_var(--green-100)]",
    icon: IconCheckCircle,
    label: "Đã hoàn thành",
  },
  canceled: {
    className:
      "bg-[var(--red-50)] text-[var(--red-600)] shadow-[inset_0_0_0_1px_#fecaca]",
    icon: IconClose,
    label: "Đã hủy",
  },
} as const;

const ALERT_TONE = {
  sky: "border-[var(--sky-500)] bg-[var(--sky-50)] text-[var(--sky-800)] [&>svg]:text-[var(--sky-700)]",
  green:
    "border-[var(--green-600)] bg-[var(--green-50)] text-[var(--green-700)] [&>svg]:text-[var(--green-600)]",
} as const;

const ACTION_BTN = "btn btn-sm min-h-11";

/* Chữ cái đầu tên hãng xe cho avatar */
function companyInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "VV";
  const first = parts[0].charAt(0);
  const second = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
  return `${first}${second}`.toUpperCase();
}

export function TripCard({ trip }: { trip: Trip }) {
  const openCancel = useTripsStore((state) => state.openCancel);
  const confirmBooking = useTripsStore((state) => state.confirmBooking);
  const confirmingId = useTripsStore((state) => state.confirmingId);
  const badge = STATUS_BADGE[trip.status];
  const BadgeIcon = badge.icon;
  const confirming = confirmingId === trip.id;

  return (
    <article
      aria-label={`Chuyến đi ${trip.route}, ${trip.dateLabel.toLowerCase()}`}
      className={CARD}
      data-route={trip.route}
    >
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
        <strong className="font-heading text-[17px] font-extrabold tracking-[-0.02em] text-[var(--ink)] max-[400px]:text-base">
          {trip.time}
        </strong>
        <span className="text-xs font-semibold text-[var(--slate-500)]">
          {trip.duration}
        </span>
        <span className={`badge ml-auto ${badge.className}`}>
          <BadgeIcon className="size-[13px]" />
          {badge.label}
        </span>
      </div>

      <p className="mt-[7px] flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] font-medium leading-[1.4] text-[var(--slate-600)]">
        <IconPin className="size-[15px] shrink-0 text-[var(--sky-600)]" />
        {trip.pickup}
        <IconArrowRight className="size-[15px] shrink-0 text-[var(--sky-600)]" />
        {trip.dropoff}
      </p>

      <p className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11.5px] font-medium leading-[1.4] text-[var(--slate-400)]">
        <span>{trip.dateLabel}</span>
        <span className="before:mr-2 before:text-[var(--slate-300)] before:content-['·']">
          Mã đặt chỗ {trip.code}
        </span>
      </p>

      <div className="mt-[11px] mb-3.5 flex flex-wrap items-center gap-2.5 border-t border-[var(--border-soft)] pt-[11px]">
        <div className="flex min-w-0 flex-[1_1_100%] items-center gap-2.5">
          <span
            aria-hidden="true"
            className="grid size-[38px] shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,var(--navy-800),var(--sky-700))] font-heading text-[12.5px] font-bold text-white"
          >
            {companyInitials(trip.company)}
          </span>
          <div className="min-w-0">
            <strong className="block font-heading text-[13px] font-bold leading-[1.35] text-[var(--ink)]">
              {trip.company}
            </strong>
            <a
              className="flex w-fit items-center gap-[3px] text-[11px] font-semibold text-[var(--sky-800)] hover:underline"
              href={`tel:${trip.hotline.replace(/\s/g, "")}`}
            >
              <IconPhone className="size-3 shrink-0 text-[var(--sky-600)]" />
              {trip.hotline}
            </a>
          </div>
        </div>
      </div>

      {trip.alert ? (
        <p
          className={`mb-3 flex items-start gap-2 rounded-[var(--radius-xs)] border-l-[3px] px-3 py-2.5 text-[12.5px] font-medium leading-[1.55] ${ALERT_TONE[trip.alert.tone]}`}
        >
          {trip.alert.icon === "wallet" ? (
            <IconWallet className="mt-0.5 size-[15px] shrink-0" />
          ) : (
            <IconClose className="mt-0.5 size-[15px] shrink-0" />
          )}
          {trip.alert.message}
        </p>
      ) : null}

      <div className={FOOT}>
        <div className="shrink-0 text-left">
          <strong className="block font-heading text-lg font-extrabold leading-[1.2] tracking-[-0.02em] text-[var(--ink)] max-[400px]:text-[17px]">
            {formatTripPrice(trip.price)}
          </strong>
          <span className="mt-px block text-[11px] text-[var(--slate-500)]">
            {trip.seats} · {trip.payNote}
          </span>
        </div>

        <div className="flex flex-wrap justify-end gap-2 max-[520px]:w-full max-[520px]:[&>.btn]:flex-[1_1_auto]">
          <Link
            className={`${ACTION_BTN} btn-primary`}
            href={`/dat-cho-thanh-cong?booking=${encodeURIComponent(trip.id)}`}
          >
            Xem vé
          </Link>
          {trip.status === "pending" ? (
            <button
              aria-busy={confirming}
              className={`${ACTION_BTN} btn-primary ${confirming ? "is-loading" : ""}`}
              disabled={confirming}
              type="button"
              onClick={() => confirmBooking(trip.id)}
            >
              <span className="btn-label">
                {confirming ? "Đang xác nhận..." : "Xác nhận"}
              </span>
            </button>
          ) : null}
          {trip.status === "confirmed" || trip.status === "pending" ? (
            <button
              className={`${ACTION_BTN} btn-ghost`}
              type="button"
              onClick={() => openCancel(trip.id)}
            >
              Hủy vé
            </button>
          ) : null}
          {trip.status === "done" ? (
            <Link className={`${ACTION_BTN} btn-ghost`} href="/#dat-xe">
              Đặt lại
            </Link>
          ) : null}
          {trip.status === "canceled" ? (
            <Link className={`${ACTION_BTN} btn-ghost`} href="/#dat-xe">
              Đặt lại chuyến
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
