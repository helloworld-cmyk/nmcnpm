import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Noto_Sans } from "next/font/google";
import "./globals.css";

const headingFont = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700", "800"],
  variable: "--font-be-vietnam",
  display: "swap",
});

const bodyFont = Noto_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vi Vu Việt — Đặt xe ghép liên tỉnh | Giá minh bạch, đón tận nơi",
  description:
    "Đặt xe ghép liên tỉnh trong 60 giây — giá trọn gói, đón tận nơi, hỗ trợ 24/7.",
  icons: {
    icon: "/assets/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#F7FAFD",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}