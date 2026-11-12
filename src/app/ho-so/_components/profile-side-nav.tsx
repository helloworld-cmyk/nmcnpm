"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconLogout, IconRoute, IconUser } from "@/components/icons";
import { ConfirmModal } from "@/components/ui/confirm-modal";
import { useSessionStore } from "@/global-states/session-store";

const NAV_ITEM =
  "group flex min-h-11 items-center gap-[11px] rounded-[var(--radius-xs)] px-[13px] text-sm font-semibold transition-[background,color] duration-[var(--dur)] ease-[var(--ease)]";

const NAV_ITEM_DEFAULT = `${NAV_ITEM} text-[var(--slate-600)] hover:bg-[var(--sky-50)] hover:text-[var(--sky-700)]`;

const NAV_ITEM_CURRENT = `${NAV_ITEM} bg-[var(--sky-50)] text-[var(--sky-700)] shadow-[inset_0_0_0_1px_var(--sky-100)]`;

const NAV_ITEM_EXIT = `${NAV_ITEM} text-[var(--slate-600)] hover:bg-[var(--red-50)] hover:text-[var(--red-600)]`;

const NAV_ICON =
  "size-[18px] shrink-0 text-[var(--slate-400)] transition-colors duration-[var(--dur)] ease-[var(--ease)] group-hover:text-[var(--sky-600)]";

const NAV_ICON_ACTIVE = "size-[18px] shrink-0 text-[var(--sky-600)]";

const NAV_ICON_EXIT =
  "size-[18px] shrink-0 text-[var(--slate-400)] transition-colors duration-[var(--dur)] ease-[var(--ease)] group-hover:text-[var(--red-600)]";

export function ProfileSideNav() {
  const router = useRouter();
  const clearSession = useSessionStore((state) => state.clearSession);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const confirmLogout = () => {
    clearSession();
    setLogoutOpen(false);
    router.push("/");
  };

  return (
    <aside className="sticky top-[calc(var(--header-h)+20px)] grid gap-4 max-[900px]:static">
      <nav
        aria-label="Menu tài khoản"
        className="grid gap-1 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-3 shadow-[var(--shadow-xs)] max-[900px]:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]"
      >
        <Link aria-current="page" className={NAV_ITEM_CURRENT} href="/ho-so">
          <IconUser className={NAV_ICON_ACTIVE} />
          Hồ sơ cá nhân
        </Link>
        <Link className={NAV_ITEM_DEFAULT} href="/chuyen-cua-toi">
          <IconRoute className={NAV_ICON} />
          Chuyến của tôi
        </Link>
        <button
          className={NAV_ITEM_EXIT}
          type="button"
          onClick={() => setLogoutOpen(true)}
        >
          <IconLogout className={NAV_ICON_EXIT} />
          Đăng xuất
        </button>
      </nav>

      <ConfirmModal
        cancelLabel="Ở lại"
        confirmLabel="Đăng xuất"
        danger
        description="Bạn có thực sự muốn đăng xuất khỏi Vi Vu Việt không?"
        icon={<IconLogout className="size-[26px]" />}
        open={logoutOpen}
        title="Đăng xuất tài khoản?"
        onClose={() => setLogoutOpen(false)}
        onConfirm={confirmLogout}
      />
    </aside>
  );
}
