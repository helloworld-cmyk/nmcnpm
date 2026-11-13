export function formatPrice(value: number): string {
  return `${value.toLocaleString("vi-VN")}đ`;
}

export function formatTime(totalMinutes: number): string {
  const m = Math.max(0, Math.min(totalMinutes, 1440)) % 1440;
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return `${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

export function formatDateLabel(isoDate: string | null): string {
  if (!isoDate) return "";
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";

  const weekdays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${weekdays[date.getDay()]}, ${dd}/${mm}/${date.getFullYear()}`;
}

export function formatTimeRange(from: number, to: number): string {
  if (from <= 0 && to >= 1440) return "Cả ngày";
  if (to >= 1440) return `Từ ${formatTime(from)}`;
  if (from <= 0) return `Đến ${formatTime(to)}`;
  return `${formatTime(from)} – ${formatTime(to)}`;
}
