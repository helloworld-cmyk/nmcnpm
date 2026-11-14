# Senior review — màn `dat-cho-thanh-cong`

Đã đọc toàn bộ code màn, API `booking/`, luồng tạo đơn (`chi-tiet-chuyen` + `booking-detail-store`), luồng vào màn (`chuyen-cua-toi/trip-card`), design tham chiếu, và chạy `tsc --noEmit` + `npm run lint` (sạch, chỉ 1 warning cũ ở `brand.tsx`).



## 2. Chưa ghép API

- **Nhưng vấn đề nằm ở luồng đưa vào màn:** `booking-detail-store.ts:213` chỉ gọi `createBookingAPI` (tạo đơn trạng thái **HOLDING** — giữ ghế 5 phút), rồi điều hướng sang màn này (`use-booking-panel.ts:50`). **Không hề gọi `confirmBookingAPI`.** `useConfirmBooking`/`confirmBookingAPI` chỉ được dùng ở nút "Xác nhận" của `chuyen-cua-toi` (`trips-store.ts:143`). ⇒ Vé hiển thị "thành công" thực chất vẫn đang **HOLDING** và sẽ hết hạn — đây là lỗi logic nghiêm trọng nhất.

## 3. Thiếu API
- Không có endpoint lấy **tài xế / xe** cho chuyến để render đúng khối thiết kế (design `success.html:150,164-221` có "Loại xe", tài xế + tên + rating + SĐT). Grep `src/api` không có `driver`/`vehicle`/`company` domain.
- Không có API trả ảnh/chuỗi QR điểm danh.
- (Đã tính tới "ghép API" theo §6.4 — nhưng không có endpoint phụ nào để ghép.)

## 4. Trường API còn thiếu
`BookingTripResponse` (`src/api/booking/api/types.ts:19-36`) thiếu so với thiết kế:
- **Xe:** loại xe + biển số (design "Van 9 chỗ · 29B-123.45").
- **Tài xế:** tên, SĐT, rating, số chuyến.
- Vì thiếu nên `ticket-view.tsx:118-141` đã **thay "Loại xe" bằng "Hãng xe"** và `ticket-view.tsx:145-190` **thay khối tài xế bằng hãng xe + hotline** → lệch thiết kế.
- Ngoài ra `trip.timezone` có trong DTO nhưng **không dùng**: `_utils/format.ts:8-31` format bằng `getHours()/getDate()` theo TZ trình duyệt, bỏ qua `timezone` → sai giờ/ngày nếu browser khác múi giờ VN.

## 5. File thừa / trùng lặp / không có tác dụng
- Trong folder màn: **không có file chết** — tất cả đều được dùng (`ticket-qr` ← `ticket-view` ← `ticket-card`).
- **Trùng lặp code (nên gom):** `dat-cho-thanh-cong/_utils/format.ts` gần như y hệt `chi-tiet-chuyen/_utils/format.ts` (khác mỗi comment + có `formatDayLabel` thêm năm). Cùng `formatVnd` còn lặp ở `chuyen-cua-toi/_data/trips.ts:34`. Theo AGENTS §1 nên đưa `formatVnd/formatClock/formatDayLabel` ra util dùng chung.
- **`ticket-qr.tsx` không thực sự mang dữ liệu** (trang trí) — không phải file thừa, nhưng "không có tác dụng" về nghiệp vụ.
- **`SuccessActions` bị trùng CTA:** nó luôn render nút "Xem Chuyến của tôi" (`success-actions.tsx:7-13`), trong khi ở state empty/error `ticket-card.tsx:64,104` cũng render đúng nút đó ⇒ hiển thị 2 nút giống nhau cùng lúc.

## 6. Vấn đề khác
- **Trạng thái vé không được kiểm tra:** `ticket-view.tsx` không đọc `booking.status`/`ticket.status`. Mở `/dat-cho-thanh-cong?booking=<id>` của đơn đã HUỶ/HẾT HẠN vẫn hiện hero "Đặt chỗ thành công!" + badge "Đã xác nhận" (`success-hero.tsx:12-18`).
- **Hero nói "Đã xác nhận"** cố định, không phản ánh `HOLDING/CONFIRMED/CANCELLED/EXPIRED`, và bỏ qua `holdExpiresAt` (không đếm ngược/không cảnh báo) ⇒ dễ gây hiểu nhầm mất chỗ.
- **Nhiều hành khách, nhiều điểm đón/trả:** `ticket-view.tsx:35-38` chỉ lấy `tickets[0].pickupAddress/dropoffAddress`, trong khi 1 đơn tối đa 8 hành khách mỗi người có địa chỉ riêng ⇒ mất thông tin (danh sách ghế thì vẫn hiện đủ).
- **`<Suspense>` không có `fallback`** (`page.tsx:28`) ⇒ trong lúc chờ `useSearchParams` render ra khoảng trắng. Nên có skeleton/fallback.
- **Chức năng thiết kế bị bỏ:** design `ticket.js` có "Thêm vào lịch (.ics)", "Tải vé/in", "Chia sẻ chuyến" (`ticket.js:6-8,106-135`); bản React chỉ có copy mã + copy hotline + link. `metadata` cũng hứa "hướng dẫn đón xe" nhưng không có section này.
- **Chuẩn hoá hotline cho `tel:`** chỉ bỏ khoảng trắng (`ticket-view.tsx:42`), không xử lý dấu `.` `-` `()` như `to-trip`/nút liên hệ khác.
- Design còn có khối "chính sách hủy vé" (`design/.../css/side.css`) — partial không render, React cũng bỏ.

### Ưu tiên xử lý
1. Xác nhận đơn trong luồng: gọi `confirmBookingAPI` sau `createBookingAPI` (hoặc cho màn này xác nhận), tránh đơn treo HOLDING.
2. Check `booking.status` để render đúng trạng thái hero/badge (kể cả HUỶ/HẾT HẠN) và cảnh báo `holdExpiresAt`.
3. Bổ sung DTO `BookingTripResponse` (xe + tài xế) nếu muốn bám thiết kế; hoặc chấp nhận fallback hãng xe và cập nhật design/metadata.
4. Sửa timezone, gom helper format dùng chung, bỏ CTA trùng, thêm `fallback` cho Suspense, làm QR thật.