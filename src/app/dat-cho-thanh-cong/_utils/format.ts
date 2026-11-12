/* Định dạng hiển thị cho vé điện tử ở màn đặt chỗ thành công */

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

/* Nhãn ngày theo kiểu "Thứ Bảy, 07/11/2026" */
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
  return `${weekdays[date.getDay()]}, ${day}/${month}/${date.getFullYear()}`;
}
