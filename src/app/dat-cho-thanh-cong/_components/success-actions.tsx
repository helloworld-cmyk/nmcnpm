import Link from "next/link";
import { IconArrowRight } from "@/components/icons";

export function SuccessActions() {
  return (
    <div className="flex flex-wrap gap-3 max-[400px]:grid max-[400px]:grid-cols-1">
      <Link
        className="btn btn-primary max-[640px]:flex-[1_1_calc(50%-6px)] max-[400px]:w-full"
        href="/chuyen-cua-toi"
      >
        <IconArrowRight aria-hidden="true" />
        Xem Chuyến của tôi
      </Link>
    </div>
  );
}
