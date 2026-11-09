export type AuthStatusData = {
  type: "info" | "error" | "success";
  message: string;
};

const STATUS_BASE =
  "rounded-[10px] border px-[13px] py-[11px] text-[12.5px] font-medium leading-[1.55]";

const STATUS_CLASSES = {
  success: "border-[#a7f3d0] bg-[#ecfdf5] text-[#065f46]",
  error: "border-[#fecaca] bg-[var(--red-50)] text-[#991b1b]",
  info: "border-[#d7eefb] bg-[var(--sky-50)] text-[var(--sky-800)]",
} as const;

/* Băng thông báo trạng thái (đang xử lý / lỗi / thành công) dùng chung cho 2 màn auth */
export function AuthStatus({ status }: { status: AuthStatusData | null }) {
  if (!status) return null;

  return (
    <div
      className={`${STATUS_BASE} ${STATUS_CLASSES[status.type]}`}
      role="status"
      aria-live="polite"
    >
      {status.message}
    </div>
  );
}
