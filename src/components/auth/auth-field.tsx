import type { ComponentType, ReactNode } from "react";
import type { IconProps } from "@/components/icons";

const LABEL_BASE =
  "mb-1.5 ml-0.5 block text-[11px] font-bold tracking-[0.09em] text-[var(--slate-500)] uppercase";

const ICON_BASE =
  "pointer-events-none absolute top-1/2 left-[13px] size-[18px] -translate-y-1/2 text-[var(--sky-600)]";

const INPUT_BASE =
  "h-12 w-full rounded-[12px] border bg-[#fafcfe] py-0 pr-[13px] pl-10 text-[14.5px] font-medium text-[var(--ink)] scheme-light transition-[border-color,box-shadow,background] duration-[var(--dur)] ease-[var(--ease)] placeholder:font-normal placeholder:text-[var(--slate-400)] hover:border-[var(--slate-300)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(14,165,233,0.13)] focus:outline-none max-[900px]:text-base";

const INPUT_WITH_TRAILING = `${INPUT_BASE} pr-[46px]`;

const INPUT_VALID =
  "border-[var(--border)] focus:border-[var(--sky-500)]";

const INPUT_INVALID =
  "border-[#fca5a5] bg-[#fff8f8] hover:border-[#fca5a5] focus:border-[#fca5a5] focus:shadow-[0_0_0_4px_rgba(220,38,38,0.12)]";

export type AuthFieldProps = {
  id: string;
  label: string;
  icon: ComponentType<IconProps>;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  type?: "text" | "tel" | "email" | "password";
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "numeric";
  invalid?: boolean;
  ref?: (element: HTMLInputElement | null) => void;
  trailing?: ReactNode;
  hint?: ReactNode;
};

/* Ô input dùng chung cho các màn auth: label + icon + trạng thái lỗi + slot phải + hint */
export function AuthField({
  id,
  label,
  icon: Icon,
  value,
  onChange,
  onBlur,
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
  invalid = false,
  ref,
  trailing,
  hint,
}: AuthFieldProps) {
  return (
    <div>
      <label className={LABEL_BASE} htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <Icon className={ICON_BASE} />
        <input
          className={`${trailing ? INPUT_WITH_TRAILING : INPUT_BASE} ${
            invalid ? INPUT_INVALID : INPUT_VALID
          }`}
          type={type}
          id={id}
          name={id}
          ref={ref}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          required
          value={value}
          aria-invalid={invalid || undefined}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
        />
        {trailing}
      </div>
      {hint}
    </div>
  );
}
