/* View model hiển thị cho màn "Chuyến của tôi", dựng từ BookingResponse của API. */

export type TripStatus =
  | "confirmed"
  | "pending"
  | "ongoing"
  | "done"
  | "canceled";

export type Trip = {
  /* Id đặt vé (dùng cho các API hủy/xác nhận) */
  id: string;
  /* Mã đặt chỗ hiển thị cho người dùng */
  code: string;
  status: TripStatus;
  time: string;
  duration: string;
  dateLabel: string;
  pickup: string;
  dropoff: string;
  route: string;
  company: string;
  hotline: string;
  price: number;
  seats: string;
  payNote: string;
  alert?: {
    tone: "sky" | "green";
    icon: "wallet" | "close";
    message: string;
  };
};

export function formatTripPrice(price: number): string {
  return `${price.toLocaleString("vi-VN")}đ`;
}
