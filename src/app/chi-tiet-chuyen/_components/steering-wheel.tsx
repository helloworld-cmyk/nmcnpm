/* Vòng lái — SVG nhỏ vẽ riêng cho cabin tài xế */
export function SteeringWheel() {
  return (
    <svg aria-hidden="true" className="h-5 w-5 text-[var(--sky-600)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} focusable="false">
      <circle cx="12" cy="12" r="8.4" />
      <circle cx="12" cy="12" r="2.4" />
      <path d="M12 14.4v6M9.7 13.4l-5.3 2.5M14.3 13.4l5.3 2.5" strokeLinecap="round" />
    </svg>
  );
}
