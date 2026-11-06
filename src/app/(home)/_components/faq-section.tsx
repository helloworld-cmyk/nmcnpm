"use client";

import { Reveal } from "@/components/ui/reveal";
import { IconChevronDown } from "@/components/icons";
import { useFaq } from "../_hooks/use-faq";

const FAQ_ITEMS = [
  {
    id: 1,
    question: "Xe ghép liên tỉnh là gì?",
    answer:
      "Vi Vu Việt kết nối nhiều khách đi cùng một cung đường trên cùng một chuyến xe. Bạn chia sẻ chi phí với các hành khách khác, nhờ đó giá vé thấp hơn taxi truyền thống 30–50% mà vẫn được đón trả tận nơi.",
  },
  {
    id: 2,
    question: "Tôi có thể hủy chuyến không?",
    answer:
      "Có. Bạn được hủy miễn phí trước 2 giờ khởi hành. Nếu hủy sát giờ, một khoản phí nhỏ có thể được áp dụng và luôn hiển thị rõ ràng trước khi bạn xác nhận.",
  },
  {
    id: 3,
    question: "Giá vé đã bao gồm những gì?",
    answer:
      "Giá hiển thị là giá trọn gói: cước chuyến đi, phí cầu đường và bảo hiểm hành khách. Không có phụ phí ẩn hay phát sinh khi lên xe.",
  },
  {
    id: 4,
    question: "Tôi có thể mang theo hành lý cồng kềnh?",
    answer:
      "Bạn có thể mang theo tối đa 1 vali lớn và 1 túi xách. Với hành lý đặc biệt như xe đạp, nhạc cụ hay đồ cồng kềnh, hãy ghi chú khi đặt để Vi Vu Việt sắp xếp xe phù hợp.",
  },
  {
    id: 5,
    question: "Thanh toán bằng cách nào?",
    answer:
      "Bạn có thể thanh toán khi lên xe bằng tiền mặt hoặc chuyển khoản. Hóa đơn điện tử được gửi ngay sau chuyến đi qua email hoặc ứng dụng Vi Vu Việt.",
  },
  {
    id: 6,
    question: "Chuyến đi của tôi có an toàn không?",
    answer:
      "Tất cả tài xế đều được xác thực danh tính và kiểm duyệt xe định kỳ. Mỗi chuyến đi được bảo hiểm và có hỗ trợ khẩn cấp 24/7. Bạn cũng có thể chia sẻ hành trình trực tiếp cho người thân.",
  },
];

export function FaqSection() {
  const { openId, toggle } = useFaq(1);

  return (
    <section className="section section--white" id="faq">
      <div className="container grid grid-cols-[0.8fr_1.2fr] gap-[clamp(40px,6vw,80px)] items-start max-[900px]:grid-cols-1 max-[900px]:gap-8">
        <Reveal>
          <span className="section-eyebrow">Hỏi đáp</span>
          <h2 className="mt-3 text-[clamp(1.85rem,3.2vw,2.65rem)] font-extrabold leading-[1.12] tracking-[-0.032em] text-ink [text-wrap:balance]">
            Câu hỏi
            <br />
            thường gặp.
          </h2>
          <p className="max-w-[340px] mt-3.5 text-[15.5px] leading-[1.7] text-slate-600">
            Mọi điều bạn cần biết trước khi bắt đầu chuyến đi cùng Vi Vu Việt.
          </p>
        </Reveal>

        <Reveal className="border-t border-line max-[900px]:mt-2">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div className="border-b border-line" key={item.id}>
                <h3>
                  <button
                    type="button"
                    className="group flex items-center justify-between gap-5 w-full py-[21px] px-0.5 font-heading text-[15.5px] font-semibold text-left text-ink transition-colors duration-(--dur) ease-swift hover:text-sky-700 max-[640px]:py-[18px] max-[640px]:text-[15px]"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${item.id}`}
                    id={`faq-trigger-${item.id}`}
                    onClick={() => toggle(item.id)}
                  >
                    {item.question}
                    <span
                      aria-hidden="true"
                      className="grid place-items-center shrink-0 size-[30px] border border-line rounded-full text-slate-500 transition-[transform,background,border-color,color] duration-[250ms] ease-swift group-aria-expanded:rotate-180 group-aria-expanded:border-sky-700 group-aria-expanded:bg-sky-700 group-aria-expanded:text-white"
                    >
                      <IconChevronDown className="icon size-4" />
                    </span>
                  </button>
                </h3>
                <div
                  className={`pr-11 pb-[22px] pl-0.5 max-[640px]:pr-[34px] max-[640px]:pb-[18px]${
                    isOpen ? " animate-[panelIn_0.26s_var(--ease)]" : ""
                  }`}
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${item.id}`}
                  hidden={!isOpen}
                >
                  <p className="text-sm leading-[1.72] text-slate-600">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
