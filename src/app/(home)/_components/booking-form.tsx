"use client";

import { useAreas } from "@/api/area/tanstack/use-areas";
import {
  IconArrowRight,
  IconCalendar,
  IconPin,
  IconShield,
  IconSwap,
  IconUsers,
} from "@/components/icons";
import { useBookingFormStore } from "@/global-states/booking-form-store";
import { useBookingFormFields } from "../_hooks/use-booking-form-fields";
import { useBookingFormSubmit } from "../_hooks/use-booking-form-submit";
import { useTodayISO, useTomorrowISO } from "../_hooks/use-current-dates";

const STATUS_CLASSES = {
  success: "border-[#a7f3d0] bg-[#ecfdf5] text-[#065f46]",
  error: "border-red-200 bg-red-50 text-red-800",
  info: "border-[#d7eefb] bg-sky-50 text-sky-800",
} as const;

const FIELD_LABEL =
  "mb-1.5 ml-0.5 block text-[11px] font-bold tracking-[0.09em] text-[var(--slate-500)] uppercase";

const FIELD_CONTROL = "relative";

const FIELD_ICON =
  "pointer-events-none absolute top-1/2 left-[13px] size-[18px] -translate-y-1/2 text-[var(--sky-600)]";

const FIELD_INPUT =
  "h-12 w-full rounded-[12px] border bg-[#fafcfe] py-0 pr-[13px] pl-10 text-[14.5px] font-medium text-[var(--ink)] scheme-light transition-[border-color,box-shadow,background] duration-[var(--dur)] ease-[var(--ease)] placeholder:font-normal placeholder:text-[var(--slate-400)] hover:border-[var(--slate-300)] focus:border-[var(--sky-500)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(14,165,233,0.13)] focus:outline-none max-[900px]:text-base";

const FIELD_INPUT_INVALID =
  "border-[#fca5a5] bg-[#fff8f8] focus:shadow-[0_0_0_4px_rgba(220,38,38,0.12)]";

const FIELD_SELECT = `${FIELD_INPUT} border-[var(--border)] cursor-pointer appearance-none pr-9`;

const fieldInputClass = (invalid: boolean) =>
  `${FIELD_INPUT} ${invalid ? FIELD_INPUT_INVALID : "border-[var(--border)]"}`;

export function BookingForm() {
  const origin = useBookingFormStore((state) => state.origin);
  const destination = useBookingFormStore((state) => state.destination);
  const storedDate = useBookingFormStore((state) => state.date);
  const seats = useBookingFormStore((state) => state.seats);
  const invalidField = useBookingFormStore((state) => state.invalidField);
  const status = useBookingFormStore((state) => state.status);
  const swapping = useBookingFormStore((state) => state.swapping);
  const prefillId = useBookingFormStore((state) => state.prefillId);
  const setOrigin = useBookingFormStore((state) => state.setOrigin);
  const setDestination = useBookingFormStore((state) => state.setDestination);
  const setDate = useBookingFormStore((state) => state.setDate);
  const setSeats = useBookingFormStore((state) => state.setSeats);
  const swapRoute = useBookingFormStore((state) => state.swapRoute);

  /* Danh mục địa điểm từ API cho gợi ý điểm đi/đến */
  const { data: areas } = useAreas();

  const minDate = useTodayISO();
  const defaultDate = useTomorrowISO();
  const date = storedDate ?? defaultDate;

  const { registerField, focusField } = useBookingFormFields();
  const { formRef, handleSubmit } = useBookingFormSubmit(focusField);

  return (
    <form
      key={prefillId}
      data-flashing={prefillId > 0 ? "true" : undefined}
      className="relative max-w-[600px] mt-7 p-4 border border-[#e6eef6] rounded-lg bg-white shadow-[0_24px_60px_-28px_rgba(8,20,38,0.35),var(--shadow-xs)] data-[flashing]:animate-[formFlash_1.1s_var(--ease)] max-[640px]:p-3.5"
      id="bookingForm"
      noValidate
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <div className="relative grid grid-cols-2 gap-11 max-[640px]:grid-cols-1 max-[640px]:gap-3">
        <div>
          <label className={FIELD_LABEL} htmlFor="origin">Điểm đi</label>
          <div className={FIELD_CONTROL}>
            <IconPin className={FIELD_ICON} />
            <input
              className={fieldInputClass(invalidField === "origin")}
              type="text"
              id="origin"
              name="origin"
              ref={registerField("origin")}
              list="cityList"
              placeholder="VD: Hà Nội"
              autoComplete="off"
              required
              value={origin}
              aria-invalid={invalidField === "origin" ? true : undefined}
              onChange={(event) => setOrigin(event.target.value)}
            />
          </div>
        </div>

        <button
          type="button"
          aria-label="Đổi điểm đi và điểm đến"
          className={`absolute left-1/2 top-[46px] z-[2] grid place-items-center size-[34px] border border-line rounded-full bg-white text-sky-700 shadow-xs -translate-x-1/2 -translate-y-1/2 transition-[transform,border-color,color,box-shadow] duration-[280ms] ease-swift hover:border-sky-300 hover:text-sky-600 hover:shadow-[0_4px_12px_-4px_rgba(3,105,161,0.35)] max-[768px]:size-11 max-[640px]:static max-[640px]:justify-self-center max-[640px]:-my-3 max-[640px]:translate-x-0 max-[640px]:translate-y-0 max-[640px]:hover:translate-x-0 max-[640px]:hover:translate-y-0 ${
            swapping
              ? "rotate-[270deg] max-[640px]:rotate-180"
              : "rotate-90 max-[640px]:rotate-0"
          }`}
          id="swapBtn"
          onClick={swapRoute}
        >
          <IconSwap className="icon size-[17px]" />
        </button>

        <div>
          <label className={FIELD_LABEL} htmlFor="destination">
            Điểm đến
          </label>
          <div className={FIELD_CONTROL}>
            <IconPin className={FIELD_ICON} />
            <input
              className={fieldInputClass(invalidField === "destination")}
              type="text"
              id="destination"
              name="destination"
              ref={registerField("destination")}
              list="cityList"
              placeholder="VD: Hải Phòng"
              autoComplete="off"
              required
              value={destination}
              aria-invalid={
                invalidField === "destination" ? true : undefined
              }
              onChange={(event) => setDestination(event.target.value)}
            />
          </div>
        </div>

        <datalist id="cityList">
          {(areas ?? []).map((area) => (
            <option key={area.id} value={area.name} />
          ))}
        </datalist>
      </div>

      <div className="grid grid-cols-[1fr_1fr_auto] gap-3 items-end mt-3 max-[768px]:grid-cols-2 max-[520px]:grid-cols-1">
        <div>
          <label className={FIELD_LABEL} htmlFor="travelDate">
            Ngày đi
          </label>
          <div className={FIELD_CONTROL}>
            <IconCalendar className={FIELD_ICON} />
            <input
              className={fieldInputClass(invalidField === "date")}
              type="date"
              id="travelDate"
              name="travelDate"
              ref={registerField("date")}
              required
              min={minDate || undefined}
              value={date}
              aria-invalid={invalidField === "date" ? true : undefined}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>
        </div>

        <div>
          <label className={FIELD_LABEL} htmlFor="seats">Số ghế</label>
          <div className={`${FIELD_CONTROL} after:content-[''] after:absolute after:top-1/2 after:right-4 after:size-2 after:border-r-2 after:border-b-2 after:border-slate-500 after:-translate-y-[70%] after:rotate-45 after:pointer-events-none`}>
            <IconUsers className={FIELD_ICON} />
            <select
              className={FIELD_SELECT}
              id="seats"
              name="seats"
              value={seats}
              onChange={(event) => setSeats(event.target.value)}
            >
              <option value="1">1 ghế</option>
              <option value="2">2 ghế</option>
              <option value="3">3 ghế</option>
              <option value="4">4 ghế</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary h-12 px-5 max-[768px]:col-span-full max-[768px]:w-full"
          id="searchBtn"
        >
          <span className="btn-label">Tìm chuyến xe</span>
          <IconArrowRight />
        </button>
      </div>

      <p className="flex items-center gap-[7px] mt-3 text-xs text-slate-500">
        <IconShield className="icon size-[15px] text-green-600" />
        Miễn phí hủy trước 2 giờ · Không cần đặt cọc
      </p>

      {status ? (
        <div
          className={`mt-3 px-[13px] py-[11px] border rounded-[10px] text-[12.5px] font-medium leading-[1.55] ${STATUS_CLASSES[status.type]}`}
          id="formStatus"
          role="status"
          aria-live="polite"
        >
          {status.message}
        </div>
      ) : null}
    </form>
  );
}
