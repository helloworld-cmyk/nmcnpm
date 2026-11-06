import {
  IconFacebook,
  IconInstagram,
  IconYoutube,
} from "@/components/icons";
import { Brand } from "./brand";

const FOOTER_LINK =
  "inline-flex items-start gap-2 text-[13.5px] leading-[1.55] text-[var(--slate-400)] transition-colors duration-[var(--dur)] ease-[var(--ease)] hover:text-white max-[768px]:min-h-11 max-[768px]:items-center max-[768px]:py-1.5";

const FOOTER_COL_HEADING =
  "mb-4 font-heading text-[11.5px] font-bold tracking-[0.12em] text-[#f1f5f9] uppercase";

const SOCIAL_LINK =
  "grid size-[38px] place-items-center rounded-[11px] border border-[rgba(255,255,255,0.12)] text-[var(--slate-300)] transition-[background,border-color,color,transform] duration-[var(--dur)] ease-[var(--ease)] hover:-translate-y-0.5 hover:border-[var(--sky-700)] hover:bg-[var(--sky-700)] hover:text-white max-[768px]:size-11";

const PRODUCT_LINKS = [
  { href: "#dat-xe", label: "Đặt xe ghép" },
  { href: "#doi-xe", label: "Đội xe" },
  { href: "#tuyen-duong", label: "Tuyến đường" },
  { href: "#vi-sao", label: "Bảng giá" },
  { href: "#", label: "Dành cho tài xế" },
];

const COMPANY_LINKS = [
  { href: "#", label: "Về Vi Vu Việt" },
  { href: "#", label: "Tuyển dụng" },
  { href: "#", label: "Blog" },
  { href: "#", label: "Báo chí" },
];

export function SiteFooter() {
  return (
    <footer className="bg-[var(--navy-900)] px-0 pt-[clamp(48px,6vw,72px)] pb-[26px] text-[var(--slate-400)] [&_*:focus-visible]:[outline-color:var(--sky-300)]">
      <div className="container">
        <div className="grid grid-cols-[1.5fr_0.8fr_0.8fr] gap-10 max-[1080px]:grid-cols-[1.4fr_0.8fr_0.8fr] max-[1080px]:gap-7 max-[1024px]:grid-cols-2 max-[1024px]:gap-9 max-[768px]:gap-[30px] max-[640px]:gap-x-6 max-[640px]:gap-y-7 max-[400px]:grid-cols-1">
          <div className="max-[640px]:col-span-full">
            <Brand variant="footer" />
            <p className="mt-4 max-w-[330px] text-[13px] leading-[1.75] text-[var(--slate-400)]">
              Đi chung chuyến, chia sẻ hành trình. Vi Vu Việt kết nối bạn với
              những chuyến xe ghép an toàn và minh bạch trên khắp Việt Nam.
            </p>
            <div className="mt-5 flex gap-[9px]">
              <a
                className={SOCIAL_LINK}
                href="#"
                aria-label="Vi Vu Việt trên Facebook"
              >
                <IconFacebook className="size-[17px]" />
              </a>
              <a
                className={SOCIAL_LINK}
                href="#"
                aria-label="Vi Vu Việt trên Instagram"
              >
                <IconInstagram className="size-[17px]" />
              </a>
              <a
                className={SOCIAL_LINK}
                href="#"
                aria-label="Vi Vu Việt trên YouTube"
              >
                <IconYoutube className="size-[17px]" />
              </a>
            </div>
          </div>

          <div>
            <h4 className={FOOTER_COL_HEADING}>Sản phẩm</h4>
            <ul className="flex flex-col gap-2.5 max-[768px]:gap-1">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.label}>
                  <a className={FOOTER_LINK} href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={FOOTER_COL_HEADING}>Công ty</h4>
            <ul className="flex flex-col gap-2.5 max-[768px]:gap-1">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <a className={FOOTER_LINK} href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(255,255,255,0.08)] pt-6 text-[12px] text-[var(--slate-500)] max-[768px]:mt-9">
          <span>
            © <span>2026</span> Vi Vu Việt. Nền tảng đặt xe ghép liên
            tỉnh.
          </span>
          <div className="flex gap-5">
            <a
              className="transition-colors duration-[var(--dur)] ease-[var(--ease)] hover:text-[var(--slate-300)] max-[768px]:inline-flex max-[768px]:min-h-11 max-[768px]:items-center max-[768px]:py-1.5"
              href="#"
            >
              Cookie
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
