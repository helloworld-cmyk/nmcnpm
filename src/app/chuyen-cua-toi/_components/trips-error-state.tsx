"use client";

import { IconClose, IconRefresh } from "@/components/icons";
import {
  EMPTY_ACTIONS,
  EMPTY_DESC,
  EMPTY_ICON,
  EMPTY_ICON_RED,
  EMPTY_PANEL,
  EMPTY_TITLE,
} from "./trip-states-classes";

export function TripsErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className={EMPTY_PANEL} id="tripsError">
      <span className={`${EMPTY_ICON} ${EMPTY_ICON_RED}`}>
        <IconClose className="size-[26px]" />
      </span>
      <h3 className={EMPTY_TITLE}>Không tải được chuyến của bạn</h3>
      <p className={EMPTY_DESC}>
        Kiểm tra kết nối mạng rồi thử lại nhé. Vẫn không được thì quay lại sau
        ít phút.
      </p>
      <div className={EMPTY_ACTIONS}>
        <button className="btn btn-primary" type="button" onClick={onRetry}>
          <IconRefresh />
          Thử lại
        </button>
      </div>
    </div>
  );
}
