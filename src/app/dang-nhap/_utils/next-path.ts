/* Chỉ nhận đường dẫn nội bộ qua ?next= để chuyển hướng sau đăng nhập */
export function readNextPath(): string {
  if (typeof window === "undefined") return "/";
  try {
    const next = new URLSearchParams(window.location.search).get("next");
    if (next && next.startsWith("/") && !next.startsWith("//")) return next;
  } catch {
    /* bỏ qua */
  }
  return "/";
}
