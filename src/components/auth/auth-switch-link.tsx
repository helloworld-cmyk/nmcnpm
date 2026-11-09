import Link from "next/link";

const LINK_BASE =
  "font-bold text-[var(--sky-700)] transition-colors duration-[var(--dur)] ease-[var(--ease)] hover:text-[var(--sky-800)] hover:underline hover:underline-offset-[3px]";

const WRAPPER_BASE =
  "mt-5 border-t border-[var(--border-soft)] pt-[18px] text-center text-sm text-[var(--slate-600)]";

/* Dòng dẫn chuyển qua lại giữa màn đăng nhập và màn đăng ký */
export function AuthSwitchLink({ target }: { target: "login" | "register" }) {
  const toLogin = target === "login";

  return (
    <p className={WRAPPER_BASE}>
      {toLogin ? "Đã có tài khoản? " : "Chưa có tài khoản? "}
      <Link className={LINK_BASE} href={toLogin ? "/dang-nhap" : "/dang-ky"}>
        {toLogin ? "Đăng nhập" : "Đăng ký ngay"}
      </Link>
    </p>
  );
}
