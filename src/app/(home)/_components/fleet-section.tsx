import { Reveal } from "@/components/ui/reveal";
import { IconArrowRight, IconCheck, IconShield } from "@/components/icons";

const FLEET = [
  {
    name: "Xe van 9 chỗ",
    model: "Ford Transit · Solati",
    badge: "9 chỗ",
    description:
      "Lựa chọn cho nhóm nhỏ và gia đình — gọn nhẹ, linh hoạt trong đô thị và trên cao tốc.",
    image:
      "https://images.unsplash.com/photo-1746985094087-e703bf52c71b?q=80&w=1200",
    imageAlt: "Xe van 9 chỗ màu xám đang chạy trên đường",
    specs: [
      "Hành lý 5–6 vali vừa",
      "WiFi miễn phí & cổng sạc USB",
      "Máy lạnh hai dãy ghế",
    ],
    delay: "0ms",
  },
  {
    name: "Xe 16 chỗ",
    model: "Mercedes Sprinter · Solati",
    badge: "16 chỗ",
    description:
      "Không gian rộng rãi cho nhóm đông hơn — ổn định trên đường trường và đèo.",
    image:
      "https://images.unsplash.com/photo-1715340614342-899407bed6dd?q=80&w=1200",
    imageAlt: "Xe minibus 16 chỗ màu trắng đời mới trên phố",
    specs: [
      "Khoang hành lý riêng",
      "Cửa sổ lớn, ngắm cảnh thoải mái",
      "Nước suối & khăn lạnh",
    ],
    delay: "60ms",
  },
  {
    name: "Xe 29 chỗ",
    model: "Thaco Meadow · County",
    badge: "29 chỗ",
    description:
      "Cho đoàn công ty, đoàn thể và tuyến du lịch — di chuyển đông người vẫn đúng giờ.",
    image:
      "https://images.unsplash.com/photo-1557223562-6c77ef16210f?q=80&w=1200",
    imageAlt: "Xe khách 29 chỗ màu vàng kem đời mới trong thành phố",
    specs: [
      "Ghế thẳng lưng, cột tay êm",
      "Định vị GPS, người nhà theo dõi",
      "Bảo hiểm hành khách trọn chuyến",
    ],
    delay: "120ms",
  },
];

export function FleetSection() {
  return (
    <section className="section section--white" id="doi-xe">
      <div className="container">
        <Reveal className="section-head head-row">
          <div>
            <span className="section-eyebrow">Đội xe của Vi Vu Việt</span>
            <h2>
              Xe thật, ảnh thật,
              <br />
              cam kết đúng xe.
            </h2>
            <p>
              Mỗi chuyến đều chạy bằng xe đời mới được kiểm định định kỳ. Bạn
              biết trước dòng xe, số chỗ và tiện nghi trước khi lên đường.
            </p>
          </div>
          <a className="text-link" href="#dat-xe">
            Đặt xe theo loại
            <IconArrowRight />
          </a>
        </Reveal>

        <div className="grid grid-cols-3 gap-[18px] max-[768px]:gap-3.5 max-[640px]:grid-cols-1">
          {FLEET.map((vehicle) => (
            <Reveal as="article" key={vehicle.name} delay={vehicle.delay} className="group flex flex-col overflow-hidden border border-line rounded-md bg-white shadow-xs transition-[transform,box-shadow,border-color] duration-[260ms] ease-swift hover:-translate-y-1 hover:border-sky-200 hover:shadow-md">
              <figure className="relative m-0 aspect-[3/2] overflow-hidden bg-sky-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={vehicle.image}
                  alt={vehicle.imageAlt}
                  loading="lazy"
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover transition-transform duration-500 ease-swift group-hover:scale-[1.045]"
                />
                <span className="badge absolute top-3 left-3 border border-white/90 bg-white/94 text-sky-800 shadow-xs">
                  {vehicle.badge}
                </span>
              </figure>
              <div className="flex flex-col gap-1.5 px-5 pt-[18px] pb-5">
                <h3 className="text-[17px] font-bold">{vehicle.name}</h3>
                <p className="text-xs font-semibold tracking-[0.02em] text-sky-700">
                  {vehicle.model}
                </p>
                <p className="text-[13.5px] leading-[1.62] text-slate-600">
                  {vehicle.description}
                </p>
                <ul className="grid gap-[7px] mt-2 pt-3.5 border-t border-dashed border-line">
                  {vehicle.specs.map((spec) => (
                    <li
                      className="flex items-start gap-2 text-[12.5px] font-medium text-slate-700"
                      key={spec}
                    >
                      <IconCheck className="icon size-[15px] mt-0.5 text-green-600" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal as="p" className="fleet-note flex items-center justify-center gap-2 mt-6 text-[12.5px] text-slate-500 max-[640px]:justify-start">
          <IconShield className="icon size-4 shrink-0 text-green-600" />
          Ảnh chụp đội xe thật — mọi xe đều được bảo dưỡng và kiểm định trước
          khi nhận chuyến.
        </Reveal>
      </div>
    </section>
  );
}
