"use client";

import Link from "next/link";
import {
  IconArrowRight,
  IconMap,
  IconPhone,
  IconPin,
  IconShield,
  IconUser,
} from "@/components/icons";
import type { DetailField } from "@/global-states/booking-detail-store";
import { useBookingPanel } from "../_hooks/use-booking-panel";
import { formatVnd } from "../_utils/format";
import { PanelHead } from "./panel-head";
import { Reveal } from "@/components/ui/reveal";

const STATUS_CLASSES = {
  success: "border-[#a7f3d0] bg-[#ecfdf5] text-[#065f46]",
  error: "border-[#fecaca] bg-[var(--red-50)] text-[#991b1b]",
  info: "border-[#d7eefb] bg-[var(--sky-50)] text-[var(--sky-800)]",
} as const;

const FIELD_LABEL =
  "mb-1.5 ml-0.5 block text-[11px] font-bold tracking-[0.09em] text-[var(--slate-500)] uppercase";

const FIELD_CONTROL = "relative";

const FIELD_ICON =
  "pointer-events-none absolute top-1/2 left-[13px] size-[18px] -translate-y-1/2 text-[var(--sky-600)]";

const FIELD_INPUT =
  "h-12 w-full rounded-[12px] border bg-[#fafcfe] py-0 px-[13px] pl-10 text-[14.5px] font-medium text-[var(--ink)] scheme-light transition-[border-color,box-shadow,background] duration-[var(--dur)] ease-[var(--ease)] placeholder:font-normal placeholder:text-[var(--slate-400)] hover:border-[var(--slate-300)] focus:border-[var(--sky-500)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(14,165,233,0.13)] focus:outline-none max-[900px]:text-base";

const FIELD_INPUT_INVALID = "border-[#fca5a5] bg-[#fff8f8]";

const FIELDS: {
  field: DetailField;
  id: string;
  label: string;
  type: "text" | "tel";
  placeholder: string;
  autoComplete: string;
}[] = [
  {
    field: "name",
    id: "passengerName",
    label: "Họ và tên",
    type: "text",
    placeholder: "VD: Nguyễn Thu Hà",
    autoComplete: "name",
  },
  {
    field: "phone",
    id: "passengerPhone",
    label: "SĐT nhận vé",
    type: "tel",
    placeholder: "VD: 0912 345 678",
    autoComplete: "tel",
  },
  {
    field: "pickup",
    id: "pickupAddress",
    label: "Điểm đón",
    type: "text",
    placeholder: "VD: 12 Nguyễn Trãi, Thanh Xuân, Hà Nội",
    autoComplete: "off",
  },
  {
    field: "dropoff",
    id: "dropoffAddress",
    label: "Điểm trả",
    type: "text",
    placeholder: "VD: Khu du lịch Tràng An, Ninh Bình",
    autoComplete: "off",
  },
];

const FIELD_ICONS: Record<DetailField, typeof IconUser> = {
  name: IconUser,
  phone: IconPhone,
  pickup: IconPin,
  dropoff: IconMap,
};

type BookingPanelProps = {
  /* Giá mỗi ghế của chuyến đang chọn (lấy từ API chi tiết chuyến) */
  pricePerSeat: number;
};

export function BookingPanel({ pricePerSeat }: BookingPanelProps) {
  const {
    values,
    agree,
    invalid,
    status,
    submitting,
    totalLoading,
    selectedSeats,
    setField,
    setAgree,
    seatLine,
    statusRef,
    handleSubmit,
  } = useBookingPanel();

  return (
    <Reveal
      className="sticky top-[calc(var(--header-h)+20px)] max-[1024px]:static max-[1024px]:mx-auto max-[1024px]:max-w-[560px]"
    >
      <form className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-[clamp(20px,2.6vw,28px)] shadow-xs max-[400px]:p-4" id="bookingForm" noValidate onSubmit={handleSubmit}>
          <PanelHead
            step="2"
            title="Thông tin người đi"
            desc="Vé điện tử gửi về SĐT — tài xế gọi trước khi đón."
          />

          {status ? (
            <div
              className={`mb-3.5 rounded-[10px] border px-[13px] py-[11px] text-[12.5px] font-medium leading-[1.55] outline-none ${STATUS_CLASSES[status.type]}`}
              id="formStatus"
              role="status"
              aria-live="polite"
              tabIndex={-1}
              ref={statusRef}
            >
              {status.type === "error" ? (
                <strong className="font-bold">{status.message}</strong>
              ) : (
                status.message
              )}
              {status.issues?.length ? (
                <ul className="mt-1 grid list-disc gap-0.5 pl-[18px]">
                  {status.issues.map((issue) => (
                    <li key={issue.anchor}>
                      <a className="underline underline-offset-2" href={issue.anchor}>
                        {issue.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}

          <div className="grid grid-cols-2 gap-3.5 max-[520px]:grid-cols-1">
            {FIELDS.map(({ field, id, label, type, placeholder, autoComplete }) => {
              const Icon = FIELD_ICONS[field];
              const fieldInvalid = Boolean(invalid[field]);

              return (
                <div
                  key={field}
                  className={field === "pickup" || field === "dropoff" ? "col-span-full" : undefined}
                >
                  <label className={FIELD_LABEL} htmlFor={id}>
                    {label}
                  </label>
                  <div className={FIELD_CONTROL}>
                    <Icon className={FIELD_ICON} />
                    <input
                      className={`${FIELD_INPUT} ${fieldInvalid ? FIELD_INPUT_INVALID : "border-[var(--border)]"}`}
                      type={type}
                      id={id}
                      name={id}
                      placeholder={placeholder}
                      autoComplete={autoComplete}
                      inputMode={type === "tel" ? "tel" : undefined}
                      aria-invalid={fieldInvalid || undefined}
                      value={values[field]}
                      onChange={(event) => setField(field, event.target.value)}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <label
            className={`mt-4 flex cursor-pointer items-start gap-2.5 text-[13px] leading-[1.55] ${
              invalid.agree ? "text-[var(--red-600)]" : "text-[var(--slate-600)]"
            }`}
          >
            <input
              className="mt-0.5 size-[18px] shrink-0 cursor-pointer accent-[var(--sky-700)]"
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={agree}
              onChange={(event) => setAgree(event.target.checked)}
            />
            <span>
              Tôi đã đọc và đồng ý{" "}
              <Link
                className="font-semibold text-[var(--sky-700)] underline-offset-2 hover:underline"
                href="/#faq"
              >
                điều khoản đặt chỗ
              </Link>{" "}
              của Vi Vu Việt, gồm chính sách hủy/đổi và quy định mang hành lý.
            </span>
          </label>

          <div className="mt-4 grid gap-2.5 rounded-[var(--radius-md)] border border-[var(--sky-100)] bg-[var(--sky-50)] p-[14px_16px]">
            <ul className="grid gap-2 border-b border-dashed border-[#bae6fd] pb-3">
              <li className="flex items-baseline justify-between gap-3 text-[13.5px] text-[var(--slate-600)]">
                <span>Ghế đã chọn · {formatVnd(pricePerSeat)}/ghế</span>
                <strong className="text-right font-heading text-sm font-bold text-[var(--ink)]">
                  {seatLine}
                </strong>
              </li>
            </ul>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.09em] text-[var(--sky-800)]">
                Tổng tạm tính
              </span>
              <strong
                className={`font-heading text-[26px] font-extrabold leading-[1.15] tracking-[-0.02em] text-[var(--ink)] transition-opacity duration-[var(--dur)] ease-[var(--ease)] ${
                  totalLoading ? "opacity-35" : ""
                }`}
                id="priceTotalValue"
              >
                {formatVnd(selectedSeats.length * pricePerSeat)}
              </strong>
            </div>
          </div>

          <button
            className={`btn btn-primary btn-lg mt-3.5 w-full${submitting ? " is-loading" : ""}`}
            type="submit"
            id="detailSubmit"
            disabled={submitting}
            aria-busy={submitting}
          >
            <span className="btn-label">
              {submitting ? "Đang giữ chỗ..." : "Xác nhận đặt chỗ"}
            </span>
            <IconArrowRight />
          </button>
          <p className="mt-3 flex items-center gap-[7px] text-xs leading-[1.5] text-[var(--slate-500)]">
            <IconShield className="size-[15px] shrink-0 text-[var(--green-600)]" />
            Không cần đặt cọc — giữ chỗ ngay, hủy miễn phí trước 2 giờ.
          </p>
        </form>
    </Reveal>
  );
}
