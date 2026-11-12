"use client";

import { useRef } from "react";

/* Cuộn mượt tới vùng danh sách chuyến, tôn trọng thiết lập giảm chuyển động */
export function useScrollToRegion() {
  const regionRef = useRef<HTMLElement>(null);

  const scrollToRegion = () => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    regionRef.current?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return { regionRef, scrollToRegion };
}
