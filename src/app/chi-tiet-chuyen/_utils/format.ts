/* Định dạng thời gian/giá cho màn chi tiết chuyến, đối chiếu dữ liệu từ API */

export function formatVnd(value: number): string {
  return `${value.toLocaleString("vi-VN")}đ`;
}

/* Giờ:phút từ mốc thời gian ISO */
export function formatClock(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "--:--";
  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes(),
  ).padStart(2, "0")}`;
}

/* Nhãn ngày theo kiểu "Thứ Năm, 29/10" */
export function formatDayLabel(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "";
  const weekdays = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${weekdays[date.getDay()]}, ${day}/${month}`;
}

/* Thời lượng giữa hai mốc ISO, định dạng "2h 15p" */
export function formatDuration(fromISO: string, toISO: string): string {
  const from = new Date(fromISO).getTime();
  const to = new Date(toISO).getTime();
  if (Number.isNaN(from) || Number.isNaN(to)) return "";
  const minutes = Math.max(0, Math.round((to - from) / 60000));
  return `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, "0")}p`;
}

/* Nhãn badge theo trạng thái mở bán của chuyến */
export function salesBadge(salesStatus: string): {
  text: string;
  tone: "green" | "orange";
} {
  if (salesStatus === "OPEN") return { text: "Đang mở bán", tone: "green" };
  if (salesStatus === "PAUSED") return { text: "Tạm dừng bán", tone: "orange" };
  return { text: "Đã đóng bán", tone: "orange" };
}

/* Ưu tiên số ghế trống khi chuyến đang mở bán; chưa có dữ liệu thì dùng trạng thái bán */
export function seatBadge(
  salesStatus: string,
  availableSeats: number | null,
): { text: string; tone: "green" | "orange" } {
  if (availableSeats === null || salesStatus !== "OPEN") {
    return salesBadge(salesStatus);
  }
  if (availableSeats <= 0) return { text: "Hết ghế", tone: "orange" };
  if (availableSeats <= 2) {
    return { text: `Chỉ còn ${availableSeats} ghế`, tone: "orange" };
  }
  return { text: `Còn ${availableSeats} ghế`, tone: "green" };
}
