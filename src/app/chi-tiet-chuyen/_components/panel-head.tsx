const PANEL_HEAD_TEXT = "mt-1 text-[13px] leading-[1.5] text-[var(--slate-500)]";

type PanelHeadProps = {
  step: string;
  title: string;
  desc: string;
};

export function PanelHead({ step, title, desc }: PanelHeadProps) {
  return (
    <div className="mb-[18px] flex items-start gap-[13px]">
      <span
        aria-hidden="true"
        className="grid size-[34px] shrink-0 place-items-center rounded-[var(--radius-sm)] bg-[var(--sky-50)] font-heading text-[15px] font-extrabold text-[var(--sky-700)] shadow-[inset_0_0_0_1px_var(--sky-100)]"
      >
        {step}
      </span>
      <div>
        <h2 className="text-lg font-bold leading-[1.2] tracking-[-0.02em] text-[var(--ink)]">
          {title}
        </h2>
        <p className={PANEL_HEAD_TEXT}>{desc}</p>
      </div>
    </div>
  );
}
