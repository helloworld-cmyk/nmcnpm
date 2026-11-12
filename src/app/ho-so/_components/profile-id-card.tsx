"use client";

import { IconCheck, IconMail, IconPhone } from "@/components/icons";
import { Avatar } from "@/components/ui/avatar";
import { useProfileStore } from "@/global-states/profile-store";

export function ProfileIdCard() {
  const fullName = useProfileStore((state) => state.values.fullName);
  const phone = useProfileStore((state) => state.values.phone);
  const email = useProfileStore((state) => state.values.email);

  return (
    <div className="mt-[clamp(26px,3.5vw,40px)] flex items-center gap-[18px] rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-[clamp(20px,2.6vw,28px)] shadow-[var(--shadow-sm)] max-[400px]:gap-3.5">
      <Avatar
        className="size-[92px] border-[3px] border-[var(--sky-100)] text-[32px] max-[400px]:size-[78px] max-[400px]:text-[27px]"
        name={fullName}
      />

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
          <strong className="font-heading text-[21px] font-extrabold leading-[1.2] tracking-[-0.02em] text-[var(--ink)] max-[400px]:text-[19px]">
            {fullName}
          </strong>
          <span className="badge badge--green">
            <IconCheck className="size-3" />
            Đã xác thực
          </span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-[13px] font-medium text-[var(--slate-600)]">
          <span className="inline-flex items-center gap-1.5">
            <IconPhone className="size-[15px] shrink-0 text-[var(--sky-600)]" />
            {phone}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <IconMail className="size-[15px] shrink-0 text-[var(--sky-600)]" />
            {email}
          </span>
        </div>
      </div>
    </div>
  );
}
