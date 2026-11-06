# AGENTS.MD — Vi Vu Việt (nmcnpm)

Dự án: nền tảng đặt xe ghép liên tỉnh. FE là Next.js (App Router) + Tailwind CSS v4.
Source chính nằm trong `src/`. Folder `design/` **chỉ là tài liệu thiết kế tham
khảo**, không phải code chính (xem §3).

---

## 1. Quy tắc tổ chức CSS (BẮT BUỘC)

> Nguyên tắc: **file CSS chỉ chứa style DÙNG CHUNG.** Style riêng của một
> component thì viết ngay trong TSX của component đó bằng Tailwind.

### 1.1. Khi nào được viết ra file CSS (`src/styles/*.css`)

Chỉ khi style mang tính chung, cụ thể là **một trong hai** trường hợp:

- Style được dùng ở **nhiều component khác nhau** (ví dụ: `.container`,
  `.section`, `.btn`, `.icon` dùng chéo header/footer/các section).
- Style được **lặp lại ở nhiều vị trí khác nhau trong codebase**, vượt ra ngoài
  phạm vi 1 component duy nhất.

### 1.2. Khi nào KHÔNG được viết ra file CSS riêng

- Style **chỉ dùng trong 1 component duy nhất** — kể cả component đó được
  render/tái sử dụng ở nhiều chỗ. Toàn bộ style của component đó phải nằm ngay
  trong TSX của nó (Tailwind inline).
- Style **chỉ áp dụng 1 lần cho 1 thẻ bất kỳ** — viết utility Tailwind tại chỗ
  dùng, không tạo class mới.

### 1.3. Cách viết style riêng của component

- Viết utility Tailwind trực tiếp vào `className` trong TSX.
- Nếu một chuỗi class lặp lại nhiều lần trong component → gom vào **hằng số ở
  đầu file** (tham khảo `TRUST_ITEM_BASE` trong
  `src/app/(home)/_components/hero.tsx`).
- Responsive cho style riêng của component → dùng variant Tailwind
  `max-[...]:` ngay tại chỗ, **không** đưa vào `responsive-shared.css`.

### 1.4. Phạm vi các file CSS hiện tại

| File                          | Phạm vi được phép chứa                                             |
| ----------------------------- | ------------------------------------------------------------------ |
| `src/styles/tokens.css`       | Design tokens (biến `--*`) — dùng chung toàn cục                    |
| `src/styles/base.css`         | Reset + class dùng chéo nhiều component (`container`, `section`, `btn`, `badge`, `avatar`, `text-link`, `icon`, `head-row`, `section-head`…) |
| `src/styles/motion.css`       | `.reveal`/`.is-in` + `@keyframes` dùng chung (keyframes là ngoại lệ kỹ thuật — Tailwind `animate-[...]` cần chúng nằm trong CSS) |
| `src/styles/responsive-shared.css` | Chỉ media-query cho class **dùng chung thật sự**               |
| `src/app/globals.css`         | Import CSS + mapping token sang `@theme` Tailwind                  |

Class định nghĩa trong CSS mà **không còn chỗ nào dùng** phải bị xóa (dead
code). Khi thêm class mới vào CSS, tự kiểm: nó có dùng chéo ≥2 component hay
lặp lại ngoài phạm vi 1 component không — nếu không, viết inline.

---

## 2. Quy ước chung

- Ngôn ngữ UI và comment: tiếng Việt.
- Tách component theo vai trò: `src/components/ui/`, `src/components/layout/`,
  `src/app/(home)/_components/` cho section riêng của trang chủ.
- Trước khi kết thúc task có sửa code FE: chạy `npm run lint` và
  `npx tsc --noEmit` để kiểm tra.

### 2.1. Xử lý file tạm trong `temp/`

- Dọn dẹp file tạm trong `temp/` chỉ **xóa từng file**, **KHÔNG** xóa folder
  `temp/` (folder này được giữ lại, chỉ xóa nội dung bên trong khi cần).
- Không dùng lệnh xóa cả thư mục (ví dụ `rm -rf temp`) — luôn xóa ở mức file.

---

## 3. Folder `design/` — CHỈ LÀ THIẾT KẾ, KHÔNG PHẢI CODE CHÍNH

- `design/` là bản thiết kế tham khảo (HTML/CSS/JS tĩnh + `DESIGN_RULES.MD`).
  Nó **không được build, không được import, không chạy trong production**.
- Khi rà soát, audit, lint hay áp dụng quy tắc code của repo này → **bỏ qua
  toàn bộ folder `design/`**; các rule trong tài liệu này không áp dụng cho nó.
- Khi làm FE mới, chỉ lấy `design/` làm **nguồn tham chiếu** về bố cục, token,
  hình ảnh; code FE thật phải viết lại theo cấu trúc `src/` và quy tắc §1.
