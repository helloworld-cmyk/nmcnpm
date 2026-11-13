"use client";

import { IconRoute } from "@/components/icons";
import {
  EMPTY_ACTIONS,
  EMPTY_DESC,
  EMPTY_ICON,
  EMPTY_ICON_SKY,
  EMPTY_PANEL,
  EMPTY_TITLE,
} from "./trip-states-classes";

export function FilterEmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className={`${EMPTY_PANEL} mt-[18px]`} id="empty-filter">
      <span className={`${EMPTY_ICON} ${EMPTY_ICON_SKY}`}>
        <IconRoute className="size-[26px]" />
      </span>
      <h3 className={EMPTY_TITLE}>Không tìm thấy chuyến phù hợp</h3>
      <p className={EMPTY_DESC}>
        Thử từ khóa khác hoặc xóa bộ lọc để xem lại tất cả chuyến trong mục
        này.
      </p>
      <div className={EMPTY_ACTIONS}>
        <button className="btn btn-ghost" type="button" onClick={onClear}>
          Xóa lọc
        </button>
      </div>
    </div>
  );
}
