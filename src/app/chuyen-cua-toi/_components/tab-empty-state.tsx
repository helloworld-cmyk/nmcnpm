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

export function TabEmptyState({
  title,
  desc,
  actionLabel,
  onAction,
}: {
  title: string;
  desc: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className={EMPTY_PANEL}>
      <span className={`${EMPTY_ICON} ${EMPTY_ICON_SKY}`}>
        <IconRoute className="size-[26px]" />
      </span>
      <h3 className={EMPTY_TITLE}>{title}</h3>
      <p className={EMPTY_DESC}>{desc}</p>
      {actionLabel && onAction ? (
        <div className={EMPTY_ACTIONS}>
          <button className="btn btn-ghost" type="button" onClick={onAction}>
            {actionLabel}
          </button>
        </div>
      ) : null}
    </div>
  );
}
