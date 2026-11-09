import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

const CARD_BASE =
  "w-full max-w-[460px] rounded-[var(--radius-lg)] border border-[var(--border)] bg-white p-[clamp(26px,3.4vw,38px)] shadow-[var(--shadow-md)] max-[640px]:px-[18px] max-[640px]:py-[22px]";

const TITLE_BASE =
  "text-[clamp(1.6rem,2.6vw,2rem)] font-extrabold tracking-[-0.03em] text-[var(--ink)]";

const DESCRIPTION_BASE =
  "mt-2 text-[14.5px] leading-[1.65] text-[var(--slate-600)]";

type AuthCardProps = {
  title: string;
  description: string;
  footer?: ReactNode;
  children: ReactNode;
};

/* Thẻ khung chứa tiêu đề, mô tả và form của mỗi màn auth */
export function AuthCard({
  title,
  description,
  footer,
  children,
}: AuthCardProps) {
  return (
    <Reveal as="article" className={CARD_BASE}>
      <h1 className={TITLE_BASE}>{title}</h1>
      <p className={DESCRIPTION_BASE}>{description}</p>
      {children}
      {footer}
    </Reveal>
  );
}
