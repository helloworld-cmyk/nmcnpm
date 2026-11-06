import Link from "next/link";

type BrandProps = {
  variant?: "header" | "footer";
};

const BRAND_BASE =
  "inline-flex flex-none items-center gap-2.5 font-heading text-[21px] font-extrabold tracking-[-0.02em] max-[768px]:min-h-11 max-[400px]:text-[19px]";

const BRAND_MARK =
  "grid size-[42px] place-items-center overflow-hidden rounded-[12px] bg-white shadow-[0_8px_18px_-10px_rgba(8,20,38,0.45)] max-[400px]:size-9 max-[400px]:rounded-[11px]";

const BRAND_IMAGE = "block size-full object-contain";

export function Brand({ variant = "header" }: BrandProps) {
  const isFooter = variant === "footer";

  return (
    <Link
      className={`${BRAND_BASE} ${
        isFooter ? "text-white" : "text-[var(--ink)]"
      }`}
      href="/"
      aria-label="Vi Vu Việt — Trang chủ"
    >
      <span className={BRAND_MARK} aria-hidden="true">
        <img
          className={BRAND_IMAGE}
          src="/assets/logo.svg"
          alt=""
          width={42}
          height={42}
          loading={isFooter ? "lazy" : undefined}
        />
      </span>
      <span>
        Vi Vu{" "}
        <span
          className={
            isFooter ? "text-[var(--sky-300)]" : "text-[var(--sky-700)]"
          }
        >
          Việt
        </span>
      </span>
    </Link>
  );
}
