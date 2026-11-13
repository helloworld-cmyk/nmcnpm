"use client";

import {
  useDeferredValue,
  useId,
  useMemo,
  useState,
  type KeyboardEvent,
} from "react";
import type { AreaResponse } from "@/api/area/api/get-areas";
import { useAreas } from "@/api/area/tanstack/use-areas";
import { IconPin } from "@/components/icons";

const DROPDOWN =
  "scroll-area absolute inset-x-0 top-[calc(100%+4px)] z-[5] max-h-[248px] overflow-auto rounded-[12px] border border-[var(--border)] bg-white p-1 shadow-[0_18px_40px_-20px_rgba(8,20,38,0.35)]";

const OPTION =
  "flex w-full cursor-pointer items-center justify-between gap-3 rounded-[9px] px-3 py-2 text-left text-[14px] font-medium text-[var(--ink)]";

const OPTION_ACTIVE = "bg-[var(--sky-50)] text-[var(--sky-800)]";

const HINT = "px-3 py-2.5 text-[12.5px] font-medium text-[var(--slate-500)]";

/* Số gợi ý tối đa render mỗi lần, tránh danh sách quá nặng khi chưa gõ từ khóa */
const MAX_OPTIONS = 50;

const AREA_TYPE_LABEL: Record<string, string> = {
  city: "Thành phố",
  province: "Tỉnh",
  district: "Quận/Huyện",
  ward: "Phường/Xã",
};

export type AreaFieldProps = {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  invalid: boolean;
  labelClassName: string;
  iconClassName: string;
  inputClassName: string;
  inputRef?: (element: HTMLInputElement | null) => void;
  /* Người dùng gõ tự do (bỏ id đã chọn) */
  onInput: (value: string) => void;
  /* Người dùng chọn một địa điểm từ gợi ý API (kèm id) */
  onPick: (area: AreaResponse) => void;
};

/*
 * Ô nhập điểm đi/đến dạng combobox: gợi ý lấy từ API /areas theo từ khóa.
 * Chọn một gợi ý sẽ lưu cả tên lẫn id để màn kết quả gọi /trips chính xác.
 */
export function AreaField({
  id,
  name,
  label,
  placeholder,
  value,
  invalid,
  labelClassName,
  iconClassName,
  inputClassName,
  inputRef,
  onInput,
  onPick,
}: AreaFieldProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const listId = useId();

  /* Trì hoãn từ khóa để không gọi API theo từng ký tự (không dùng timer) */
  const deferred = useDeferredValue(value.trim());
  /* Mở ô là hiện danh sách ngay: chưa gõ thì lấy toàn bộ, gõ tới đâu lọc tới đó */
  const enabled = open;

  const { data, isFetching, isError } = useAreas(
    { keyword: deferred || undefined },
    { enabled, staleTime: 60_000 },
  );

  const options = useMemo(() => {
    const seen = new Set<string>();
    const unique = (data ?? []).filter((area) => {
      const key = area.name.trim().toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    return unique.slice(0, MAX_OPTIONS);
  }, [data]);

  const truncated = (data?.length ?? 0) > MAX_OPTIONS;

  /* Kẹp chỉ số đang chọn theo danh sách gợi ý hiện tại (không cần effect) */
  const activeIndex = active >= 0 && active < options.length ? active : -1;

  const showList = open;

  const pick = (area: AreaResponse) => {
    onPick(area);
    setOpen(false);
    setActive(-1);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActive((prev) => Math.min(prev + 1, options.length - 1));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((prev) => Math.max(prev - 1, -1));
      return;
    }
    if (event.key === "Enter") {
      if (showList && activeIndex >= 0 && options[activeIndex]) {
        event.preventDefault();
        pick(options[activeIndex]);
      }
      return;
    }
    if (event.key === "Escape") {
      setOpen(false);
      setActive(-1);
    }
  };

  return (
    <div>
      <label className={labelClassName} htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <IconPin className={iconClassName} />
        <input
          className={inputClassName}
          id={id}
          name={name}
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={showList}
          aria-controls={showList ? listId : undefined}
          aria-autocomplete="list"
          aria-activedescendant={
            activeIndex >= 0 && options[activeIndex]
              ? `${listId}-${activeIndex}`
              : undefined
          }
          aria-invalid={invalid || undefined}
          autoComplete="off"
          placeholder={placeholder}
          value={value}
          onChange={(event) => {
            onInput(event.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          onBlur={() => {
            setOpen(false);
            setActive(-1);
          }}
          onKeyDown={handleKeyDown}
        />

        {showList ? (
          <div className={DROPDOWN}>
            <ul id={listId} role="listbox" aria-label={`Gợi ý ${label.toLowerCase()}`}>
              {options.map((area, index) => (
                <li
                  key={area.id}
                  id={`${listId}-${index}`}
                  role="option"
                  aria-selected={index === activeIndex}
                  className={`${OPTION} ${
                    index === activeIndex
                      ? OPTION_ACTIVE
                      : "hover:bg-[var(--sky-50)]"
                  }`}
                  /* Dùng mousedown để chọn trước khi input kịp blur */
                  onMouseDown={(event) => {
                    event.preventDefault();
                    pick(area);
                  }}
                  onMouseEnter={() => setActive(index)}
                >
                  <span className="truncate">{area.name}</span>
                  <span className="shrink-0 text-[11px] font-semibold text-[var(--slate-400)]">
                    {AREA_TYPE_LABEL[area.type.trim().toLowerCase()] ?? area.type}
                  </span>
                </li>
              ))}
            </ul>
            {!options.length ? (
              <p className={HINT}>
                {isError
                  ? "Không tải được danh sách địa điểm. Vui lòng thử lại."
                  : isFetching
                    ? "Đang tìm địa điểm..."
                    : "Không tìm thấy địa điểm phù hợp."}
              </p>
            ) : truncated ? (
              <p className={HINT}>
                Còn nhiều địa điểm khác — nhập tên để lọc bớt.
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
