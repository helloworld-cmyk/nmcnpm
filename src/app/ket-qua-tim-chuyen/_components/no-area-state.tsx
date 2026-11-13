import Link from "next/link";
import { IconRoute } from "@/components/icons";
import { STATE_ICON, STATE_PANEL } from "./state-panels-classes";

export function NoAreaState() {
  return (
    <section className={STATE_PANEL} id="noAreaState">
      <span className={`${STATE_ICON} bg-[var(--sky-50)] text-[var(--sky-700)] shadow-[inset_0_0_0_1px_var(--sky-100)]`}>
        <IconRoute className="size-[26px]" />
      </span>
      <h2 className="mt-4 font-heading text-[19px] font-bold leading-[1.2] tracking-[-0.02em] text-[var(--ink)] text-balance">
        Chưa nhận diện được địa điểm
      </h2>
      <p className="mx-auto mt-2.5 max-w-[460px] text-[15px] leading-[1.65] text-[var(--slate-600)]">
        Điểm đi hoặc điểm đến bạn nhập chưa có trong danh mục địa điểm. Bạn thử
        chọn lại theo gợi ý trên form tìm kiếm nhé.
      </p>
      <div className="mt-[22px] flex flex-wrap justify-center gap-2.5 max-[400px]:[&>.btn]:w-full">
        <Link className="btn btn-primary" href="/#dat-xe">
          Sửa tìm kiếm
        </Link>
      </div>
    </section>
  );
}
