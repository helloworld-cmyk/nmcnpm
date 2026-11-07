"use client";

import { useSyncExternalStore } from "react";
import { todayISO, tomorrowISO } from "../_utils/validators";

const subscribe = () => () => {};

export function useTodayISO() {
  return useSyncExternalStore(subscribe, todayISO, () => "");
}

export function useTomorrowISO() {
  return useSyncExternalStore(subscribe, tomorrowISO, () => "");
}