import { IconCheck, IconCheckCircle } from "@/components/icons";

export function SuccessHero() {
  return (
    <div className="mx-auto max-w-[640px] text-center">
      <span
        aria-hidden="true"
        className="mx-auto grid size-[52px] animate-[successPulse_2.6s_var(--ease)_infinite] place-items-center rounded-full bg-[var(--green-50)] text-[var(--green-600)] shadow-[inset_0_0_0_1px_var(--green-100)]"
      >
        <IconCheckCircle className="size-7" />
      </span>
      <span className="badge badge--green mt-3.5">
        <IconCheck className="size-[13px]" aria-hidden="true" />
        Đã xác nhận · vé đã gửi qua hệ thống
      </span>
      <h1 className="mt-2 text-[clamp(1.85rem,3.2vw,2.65rem)] font-extrabold leading-[1.12] tracking-[-0.032em] text-[var(--ink)] text-balance">
        Đặt chỗ thành công!
      </h1>
    </div>
  );
}
