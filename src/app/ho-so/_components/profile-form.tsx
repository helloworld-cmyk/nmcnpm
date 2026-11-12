"use client";

import {
  useRef,
  type ComponentType,
  type FormEvent,
} from "react";
import { IconCheck, IconMail, IconPhone, IconUser } from "@/components/icons";
import {
  selectProfileDirty,
  useProfileStore,
  validateProfileField,
  type ProfileField,
} from "@/global-states/profile-store";

const PANEL =
  "rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-[clamp(18px,2.4vw,26px)] shadow-[var(--shadow-xs)]";

const PANEL_FLASH = "animate-[formFlash_1.1s_var(--ease)]";

const PANEL_TITLE =
  "font-heading text-lg font-bold leading-[1.2] tracking-[-0.02em] text-[var(--ink)]";

const FIELD_GRID = "mt-[18px] grid grid-cols-2 gap-4 max-[640px]:grid-cols-1";

const FIELD_FULL = "col-span-full";

const FIELD_LABEL =
  "mb-1.5 ml-0.5 block text-[11px] font-bold tracking-[0.09em] text-[var(--slate-500)] uppercase";

const FIELD_CONTROL = "relative";

const FIELD_ICON =
  "pointer-events-none absolute top-1/2 left-[13px] size-[18px] -translate-y-1/2 text-[var(--sky-600)]";

const FIELD_INPUT =
  "h-12 w-full rounded-[12px] border bg-[#fafcfe] py-0 pr-[13px] pl-10 text-[14.5px] font-medium text-[var(--ink)] scheme-light transition-[border-color,box-shadow,background] duration-[var(--dur)] ease-[var(--ease)] hover:border-[var(--slate-300)] focus:border-[var(--sky-500)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(14,165,233,0.13)] focus:outline-none max-[900px]:text-base";

const FIELD_INVALID =
  "border-[#fca5a5] bg-[#fff8f8] focus:shadow-[0_0_0_4px_rgba(220,38,38,0.12)]";

const FIELD_LOCKED =
  "border-[var(--border-soft)] bg-[var(--navy-50)] text-[var(--slate-600)] cursor-default hover:border-[var(--border-soft)] focus:border-[var(--border-soft)] focus:bg-[var(--navy-50)] focus:shadow-none";

const STATUS_CLASSES = {
  success: "border-[#a7f3d0] bg-[#ecfdf5] text-[#065f46]",
  error: "border-[#fecaca] bg-[var(--red-50)] text-[#991b1b]",
  info: "border-[#d7eefb] bg-[var(--sky-50)] text-[var(--sky-800)]",
} as const;

type TextField = {
  key: ProfileField;
  label: string;
  icon: ComponentType<{ className?: string }>;
  type: "text" | "email";
  autoComplete?: string;
  required?: boolean;
  validate?: boolean;
  full?: boolean;
};

type PhoneLockedField = {
  key: "phone";
  label: string;
  icon: ComponentType<{ className?: string }>;
  type: "phone-locked";
  badge: string;
};

type ProfileFieldConfig = TextField | PhoneLockedField;

const PERSONAL_FIELDS: ProfileFieldConfig[] = [
  {
    key: "fullName",
    label: "Họ và tên",
    icon: IconUser,
    type: "text",
    autoComplete: "name",
    required: true,
    validate: true,
  },
  {
    key: "phone",
    label: "Số điện thoại",
    icon: IconPhone,
    type: "phone-locked",
    badge: "Đã xác thực",
  },
  {
    key: "email",
    label: "Email",
    icon: IconMail,
    type: "email",
    autoComplete: "email",
    required: true,
    validate: true,
  },
];

const PANELS = [
  {
    title: "Thông tin cá nhân",
    desc: "Thông tin hiển thị với tài xế khi bạn đặt chuyến.",
    fields: PERSONAL_FIELDS,
  },
];

export function ProfileForm() {
  const values = useProfileStore((state) => state.values);
  const invalidFields = useProfileStore((state) => state.invalidFields);
  const status = useProfileStore((state) => state.status);
  const saving = useProfileStore((state) => state.saving);
  const savedAt = useProfileStore((state) => state.savedAt);
  const dirty = useProfileStore(selectProfileDirty);
  const setField = useProfileStore((state) => state.setField);
  const markInvalid = useProfileStore((state) => state.markInvalid);
  const saveProfile = useProfileStore((state) => state.saveProfile);
  const resetToSaved = useProfileStore((state) => state.resetToSaved);

  const fieldRefs = useRef<Partial<Record<ProfileField, HTMLElement | null>>>(
    {},
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const firstInvalid = saveProfile();
    if (firstInvalid) fieldRefs.current[firstInvalid]?.focus();
  };

  const renderField = (field: ProfileFieldConfig) => {
    if (field.type === "phone-locked") {
      return (
        <div key={field.key}>
          <div className="mb-1.5 flex items-center justify-between gap-2.5">
            <label className={`${FIELD_LABEL} mb-0`} htmlFor={field.key}>
              {field.label}
            </label>
            <span className="badge badge--green">
              <IconCheck className="size-3" />
              {field.badge}
            </span>
          </div>
          <div className={FIELD_CONTROL}>
            <field.icon className={FIELD_ICON} />
            <input
              aria-readonly="true"
              className={`${FIELD_INPUT} ${FIELD_LOCKED}`}
              id={field.key}
              name={field.key}
              readOnly
              type="tel"
              value={values.phone}
            />
          </div>
        </div>
      );
    }

    const invalid = Boolean(invalidFields[field.key]);
    const registerRef = (el: HTMLElement | null) => {
      fieldRefs.current[field.key] = el;
    };

    const control = (
      <div className={FIELD_CONTROL}>
        <field.icon className={FIELD_ICON} />
        <input
          aria-invalid={invalid || undefined}
          autoComplete={field.autoComplete}
          className={`${FIELD_INPUT} ${
            invalid ? FIELD_INVALID : "border-[var(--border)]"
          }`}
          id={field.key}
          name={field.key}
          ref={registerRef}
          required={field.required}
          type={field.type}
          value={values[field.key]}
          onBlur={() => {
            if (field.validate) {
              markInvalid(field.key, validateProfileField(field.key, values[field.key]));
            }
          }}
          onChange={(event) => setField(field.key, event.target.value)}
        />
      </div>
    );

    return (
      <div className={field.full ? FIELD_FULL : undefined} key={field.key}>
        <label className={FIELD_LABEL} htmlFor={field.key}>
          {field.label}
        </label>
        {control}
      </div>
    );
  };

  return (
    <form
      className="grid gap-[18px]"
      id="profileForm"
      noValidate
      onSubmit={handleSubmit}
    >
      {PANELS.map((panel, panelIndex) => {
        const isFirst = panelIndex === 0;
        return (
          <section
            /* Đổi key theo lần lưu để chạy lại animation formFlash */
            key={isFirst ? `panel-0-${savedAt}` : panel.title}
            className={`${PANEL} ${isFirst && savedAt > 0 ? PANEL_FLASH : ""}`}
          >
            <h2 className={PANEL_TITLE}>{panel.title}</h2>
            <p className="mt-[5px] text-[13px] text-[var(--slate-500)]">
              {panel.desc}
            </p>

            <div className={FIELD_GRID}>
              {panel.fields.map(renderField)}
            </div>
          </section>
        );
      })}

      <div className="flex flex-wrap items-center gap-3 px-0.5 pt-1 max-[400px]:[&>.btn]:w-full">
        <button
          aria-busy={saving}
          className={`btn btn-primary ${saving ? "is-loading" : ""}`}
          disabled={!dirty || saving}
          id="saveProfileBtn"
          type="submit"
        >
          <span className="btn-label">
            {saving ? "Đang lưu..." : "Lưu thay đổi"}
          </span>
          <IconCheck />
        </button>
        <button
          className="btn btn-ghost"
          id="resetProfileBtn"
          type="button"
          onClick={resetToSaved}
        >
          Hoàn tác
        </button>
      </div>

      {status ? (
        <div
          className={`rounded-[10px] border px-[13px] py-[11px] text-[12.5px] font-medium leading-[1.55] ${
            STATUS_CLASSES[status.type]
          }`}
          id="profileStatus"
          role="status"
          aria-live="polite"
        >
          {status.message}
        </div>
      ) : null}
    </form>
  );
}
