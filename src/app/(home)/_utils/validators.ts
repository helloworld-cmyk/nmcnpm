export type BookingField = "origin" | "destination" | "date";

export type BookingDraft = {
  origin: string;
  destination: string;
  date: string;
  seats: string;
};

export type BookingValidationError = {
  field: BookingField;
  message: string;
};

export function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function todayISO(): string {
  return toISODate(new Date());
}

export function tomorrowISO(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return toISODate(tomorrow);
}

export function validateBooking(
  draft: BookingDraft,
): BookingValidationError | null {
  const origin = draft.origin.trim();
  const destination = draft.destination.trim();

  if (!origin) {
    return { field: "origin", message: "Vui lòng nhập điểm đi." };
  }

  if (!destination) {
    return { field: "destination", message: "Vui lòng nhập điểm đến." };
  }

  if (origin.toLowerCase() === destination.toLowerCase()) {
    return {
      field: "destination",
      message: "Điểm đi và điểm đến cần khác nhau.",
    };
  }

  if (!draft.date) {
    return { field: "date", message: "Vui lòng chọn ngày đi." };
  }

  const selected = new Date(`${draft.date}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (Number.isNaN(selected.getTime()) || selected < today) {
    return {
      field: "date",
      message: "Ngày đi không hợp lệ. Vui lòng chọn từ hôm nay.",
    };
  }

  return null;
}