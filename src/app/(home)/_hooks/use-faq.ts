"use client";

import { useState } from "react";

export function useFaq(initialId: number | null = 1) {
  const [openId, setOpenId] = useState<number | null>(initialId);

  const toggle = (id: number) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return { openId, toggle };
}