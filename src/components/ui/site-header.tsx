"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  IconChevronDown,
  IconClose,
  IconLogout,
  IconMenu,
  IconUser,
} from "@/components/icons";
import { useLogout } from "@/api/auth/tanstack/use-logout";
import { STORAGE_KEYS } from "@/config/constants/storage";
import { removeItem } from "@/config/storage";
import { useSessionStore, type SessionUser } from "@/global-states/session-store";
import { Brand } from "./brand";
import { ConfirmModal } from "./confirm-modal";


const USER_MENU_BTN =
  "inline-flex min-h-11 items-center gap-[9px] rounded-full border border-[var(--border)] bg-white p-[4px_12px_4px_5px] text-[var(--ink)] transition-[border-color,background,box-shadow] duration-[var(--dur)] ease-[var(--ease)] hover:border-[var(--sky-300)] hover:bg-[var(--sky-50)] hover:shadow-[var(--shadow-sm)] max-[900px]:gap-0 max-[900px]:p-[4px_5px]";

const AVATAR_BASE =
  "grid shrink-0 place-items-center rounded-full bg-[var(--sky-100)] font-heading font-extrabold text-[var(--sky-700)] uppercase leading-none";

const AVATAR_MD = `${AVATAR_BASE} size-[34px] text-[15px]`;

const AVATAR_LG = `${AVATAR_BASE} size-11 text-lg max-[400px]:size-10 max-[400px]:text-base`;

const DROPDOWN_ITEM =
  "group flex min-h-11 w-full items-center gap-2.5 rounded-[var(--radius-sm)] px-2.5 text-left text-[14.5px] font-semibold transition-[background,color] duration-[var(--dur)] ease-[var(--ease)]";

const DROPDOWN_ITEM_DEFAULT = `${DROPDOWN_ITEM} text-[var(--slate-700)] hover:bg-[var(--sky-50)] hover:text-[var(--sky-700)]`;

const DROPDOWN_ITEM_DANGER = `${DROPDOWN_ITEM} text-[var(--red-600)] hover:bg-[var(--red-50)] hover:text-[var(--red-600)]`;

const DROPDOWN_ICON =
  "size-[18px] text-[var(--slate-500)] transition-colors duration-[var(--dur)] ease-[var(--ease)] group-hover:text-[var(--sky-700)]";

function getInitial(user: SessionUser): string {
  const source = user.name || user.email || user.phone || "";
  const first = source.trim().charAt(0);
  return /[A-Za-zÀ-ỹ]/.test(first) ? first.toUpperCase() : "";
}

export function SiteHeader() {
  const router = useRouter();
  const user = useSessionStore((state) => state.user);
  const clearSession = useSessionStore((state) => state.clearSession);
  const logoutMutation = useLogout();

  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userMenuBtnRef = useRef<HTMLButtonElement>(null);
  const navToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (menuOpen) {
        setMenuOpen(false);
        userMenuBtnRef.current?.focus();
      }
      if (navOpen) {
        setNavOpen(false);
        navToggleRef.current?.focus();
      }
    };

    const onOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (menuOpen && !userMenuRef.current?.contains(target)) {
        setMenuOpen(false);
      }
      if (navOpen && !headerRef.current?.contains(target)) {
        setNavOpen(false);
      }
    };

    const onResize = () => {
      if (window.innerWidth > 900 && navOpen) setNavOpen(false);
      if (window.innerWidth <= 900 && menuOpen) setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("click", onOutsideClick);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("click", onOutsideClick);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen, navOpen]);

  const hoverCapable = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const confirmLogout = () => {
    setLogoutOpen(false);
    setMenuOpen(false);
    /* Thu hồi phiên trên server (không chặn UI) rồi dọn token + phiên local */
    logoutMutation.mutate(undefined, {
      onSettled: () => {
        removeItem(STORAGE_KEYS.accessToken);
        removeItem(STORAGE_KEYS.refreshToken);
        clearSession();
        router.push("/");
      },
    });
  };

  const initial = user ? getInitial(user) : "";
  const displayName = user?.name || "Khách hàng";
  const contact = user?.email || user?.phone || "Thành viên Vi Vu Việt";

  return (
    <header
      className={`sticky top-0 z-[60] border-b backdrop-blur-[16px] transition-[background,border-color,box-shadow] duration-[var(--dur)] ease-[var(--ease)] ${
        scrolled
          ? "border-[var(--border)] bg-[rgba(255,255,255,0.92)] shadow-[0_8px_30px_-24px_rgba(8,20,38,0.4)]"
          : "border-transparent bg-[rgba(247,250,253,0.72)]"
      }`}
      id="siteHeader"
      ref={headerRef}
    >
      <div className="container flex min-h-[var(--header-h)] items-center justify-between gap-6">
        <Brand />

        <div className="flex items-center gap-[18px] max-[900px]:relative">
          <div
            className={`relative max-[900px]:static ${
              user ? "block" : "hidden"
            }`}
            id="userMenu"
            ref={userMenuRef}
            onMouseEnter={() => {
              if (user && hoverCapable()) setMenuOpen(true);
            }}
            onMouseLeave={() => {
              if (hoverCapable()) setMenuOpen(false);
            }}
          >
            <button
              className={`${USER_MENU_BTN} ${
                menuOpen
                  ? "border-[var(--sky-300)] bg-[var(--sky-50)] shadow-[var(--shadow-sm)]"
                  : ""
              }`}
              id="userMenuBtn"
              ref={userMenuBtnRef}
              type="button"
              aria-label="Tài khoản"
              aria-expanded={menuOpen}
              aria-controls="userDropdown"
              onClick={() => {
                if (hoverCapable()) setMenuOpen(true);
                else setMenuOpen((open) => !open);
              }}
            >
              <span className={AVATAR_MD} aria-hidden="true">
                {initial ? (
                  <span>{initial}</span>
                ) : (
                  <IconUser className="size-[55%]" />
                )}
              </span>
              <span className="max-w-[128px] truncate text-sm font-semibold text-[var(--slate-700)] max-[1080px]:max-w-[90px] max-[900px]:hidden">
                {displayName}
              </span>
              <IconChevronDown
                className={`size-4 text-[var(--slate-500)] transition-transform duration-[var(--dur)] ease-[var(--ease)] ${
                  menuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`absolute top-[calc(100%+10px)] right-0 z-[70] w-[min(280px,calc(100vw-32px))] rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-2 shadow-[var(--shadow-md)] transition-[opacity,transform,visibility] duration-[var(--dur)] ease-[var(--ease)] before:absolute before:inset-x-0 before:-top-2.5 before:h-2.5 before:content-[''] ${
                menuOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-1.5 opacity-0"
              }`}
              id="userDropdown"
              aria-labelledby="userMenuBtn"
            >
              <div className="mb-1.5 flex items-center gap-3 border-b border-[var(--border-soft)] px-2.5 pt-2.5 pb-3 max-[400px]:gap-2.5">
                <span className={AVATAR_LG} aria-hidden="true">
                  {initial ? (
                    <span>{initial}</span>
                  ) : (
                    <IconUser className="size-[55%]" />
                  )}
                </span>
                <span className="flex min-w-0 flex-col">
                  <strong className="truncate font-heading text-[15px] font-bold text-[var(--ink)]">
                    {displayName}
                  </strong>
                  <span className="truncate text-[12.5px] text-[var(--slate-500)]">
                    {contact}
                  </span>
                </span>
              </div>
              <Link className={DROPDOWN_ITEM_DEFAULT} href="/ho-so">
                <IconUser className={DROPDOWN_ICON} />
                Xem hồ sơ
              </Link>
              <button
                className={DROPDOWN_ITEM_DANGER}
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setLogoutOpen(true);
                }}
              >
                <IconLogout className={`${DROPDOWN_ICON} text-[var(--red-600)] group-hover:text-[var(--red-600)]`} />
                Đăng xuất
              </button>
            </div>
          </div>

          <Link
            className={`text-[14.5px] font-semibold text-[var(--slate-700)] transition-colors duration-[var(--dur)] ease-[var(--ease)] hover:text-[var(--sky-700)] max-[900px]:hidden ${
              user ? "hidden" : ""
            }`}
            href="/dang-nhap"
          >
            Đăng nhập
          </Link>
          <Link
            className="btn btn-primary btn-sm max-[900px]:hidden"
            href="/#dat-xe"
          >
            Đặt chuyến ngay
          </Link>
          <button
            className="hidden size-11 items-center justify-center rounded-[12px] border border-[var(--border)] bg-white text-[var(--ink)] max-[900px]:inline-flex"
            id="navToggle"
            ref={navToggleRef}
            type="button"
            aria-expanded={navOpen}
            aria-controls="mobileNav"
            aria-label={navOpen ? "Đóng menu" : "Mở menu"}
            onClick={() => setNavOpen((open) => !open)}
          >
            {navOpen ? (
              <IconClose className="size-5" />
            ) : (
              <IconMenu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {navOpen && (
        <div
          className="absolute inset-x-0 top-full border-b border-[var(--border)] bg-white px-5 pt-[18px] pb-[22px] shadow-[var(--shadow-md)]"
          id="mobileNav"
        >
          <div className="flex flex-wrap items-center gap-4">
            <Link
              className="btn btn-primary flex-1"
              href="/#dat-xe"
              onClick={() => setNavOpen(false)}
            >
              Đặt chuyến ngay
            </Link>
            <Link
              className={`min-h-11 items-center justify-center text-[14.5px] font-semibold text-[var(--slate-700)] ${
                user ? "hidden" : "inline-flex"
              }`}
              href="/dang-nhap"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      )}

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
    </header>
  );
}
