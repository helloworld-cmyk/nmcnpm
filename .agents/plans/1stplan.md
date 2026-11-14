# KẾ HOẠCH — Web khách hàng (Vi Vu Việt) trên Next.js

> Mục tiêu: chuyển bộ design tĩnh `design/khach-hang/` (HTML + CSS token + JS thuần)
> thành **web khách hàng** chạy trên Next.js, **giữ nguyên design system & hợp đồng
> class** của `DESIGN_RULES.MD`. Tài liệu này là *đề xuất* — chốt xong mới code.

- Ngày tạo: 2026-11-06
- Cập nhật: 2026-11-06 — **chốt hướng styling: token + CSS dùng chung + Tailwind
  cho phần riêng từng màn** (xem §2). Trang chủ `(home)` đã được refactor theo đúng
  hướng này và là *màn tham chiếu*.
- Phạm vi: **chỉ nhóm khách hàng** (admin/tài xế để giai đoạn sau).
- Nguồn chân lý: `design/khach-hang/` + `design/shared/`.

---

## 1. Mục tiêu & phạm vi

Tái tạo đúng 8 màn khách hàng dưới dạng route Next.js, có state thật (tìm chuyến,
chọn ghế, đặt chỗ, quản lý chuyến, hồ sơ, đăng nhập/đăng ký), thay cho luồng
`window.location.href` + `localStorage` mô phỏng hiện tại.

Màn nguồn → đích:

| Màn (HTML nguồn) | Mô tả |
| --- | --- |
| `khach-hang/index.html` | Trang chủ (hero + đặt xe + đội xe + tuyến + FAQ...) |
| `khach-hang/dang-nhap.html` | Đăng nhập |
| `khach-hang/dang-ky.html` | Đăng ký |
| `khach-hang/ket-qua-tim-chuyen.html` | Kết quả tìm chuyến (lọc/sắp xếp) |
| `khach-hang/chi-tiet-chuyen.html` | Chi tiết chuyến + chọn ghế trên sơ đồ xe |
| `khach-hang/dat-cho-thanh-cong.html` | Vé điện tử, mã đặt chỗ, QR |
| `khach-hang/chuyen-cua-toi.html` | Quản lý chuyến (tab: sắp tới/đang đi/hoàn thành/hủy) |
| `khach-hang/ho-so.html` | Hồ sơ cá nhân + tuỳ chọn |
| `shared/404.html` | Trang lỗi (→ `not-found.tsx`) |

**Trạng thái đã làm:** `(home)` — khớp design, đã refactor CSS→Tailwind theo §2.

**Không nằm trong phạm vi:** admin, tài xế, backend thật (giai đoạn này dùng mock API).

---

## 2. Nguyên tắc styling (CHỐT) — "chung thì CSS, riêng thì Tailwind"

> **Một câu:** *Thứ gì dùng chung và lặp lại nhiều nơi mới để trong CSS; còn lại
> hardcode thẳng Tailwind trong JSX.* Không có file CSS riêng cho từng màn.

### 2.1 Ngưỡng phân chia

| Tiêu chí | Đặt ở |
| --- | --- |
| Biến thiết kế (màu/radius/shadow/font/spacing/ease/dur) | `styles/tokens.css` |
| Class design-system lặp **≥2 lần** (nút, badge, field, section, text-link, avatar, container…) | `styles/base.css` |
| Thành phần dùng chung **mọi màn** (header, user-menu, footer) | `styles/header.css`, `user-menu.css`, `footer.css` |
| Keyframes / hệ reveal / animation sprite | `styles/motion.css` |
| Media query **chỉ cho class shared** | `styles/responsive-shared.css` |
| Layout, màu, kích thước, spacing **riêng** của một section/component | **Tailwind trong JSX** |
| Pseudo-element riêng (`before:`/`after:`), responsive riêng (`max-[…]:`), state riêng (`aria-*`/`data-*`/conditional className) | **Tailwind trong JSX** |

**Tiêu chí "lặp lại":** một style chỉ vào CSS khi nó xuất hiện ở ≥2 component/section,
hoặc thuộc hợp đồng design-system sẽ tái dùng ở màn khác (vd `.field` dùng ở booking
form rồi login/register). Xuất hiện 1 lần → Tailwind.

### 2.2 Nguồn chân lý token (bắt buộc)

1. **`tokens.css` giữ nguyên** là nguồn giá trị duy nhất. Không viết hex/kích thước
   rời trong JSX khi đã có token.
2. **Cầu nối token → Tailwind** đặt trong `app/globals.css` bằng `@theme inline`,
   map thẳng về biến của `tokens.css` (không chép lại giá trị):

   ```css
   @theme inline {
     --color-ink: var(--ink);
     --color-navy-800: var(--navy-800);
     --color-line: var(--border);
     --color-app: var(--bg);
     --color-green-600: var(--green-600);
     --radius-md: var(--radius-md);
     --shadow-xs: var(--shadow-xs);
     --ease-swift: var(--ease);
     --font-heading: var(--font-heading);
   }
   ```

   Nhờ đó JSX dùng utility "đọc được" mà vẫn ăn token: `text-ink`, `bg-navy-800`,
   `border-line`, `rounded-md` (=14px), `shadow-xs`, `ease-swift`, `font-heading`,
   `text-green-600`.
   - Palette `sky/slate/orange` của Tailwind **trùng hex** token → dùng mặc định.
   - `green-*` của Tailwind khác token (token = emerald) → đã override về `var(--green-*)`.
   - Kiểm chứng sau build: `.text-green-600{color:var(--green-600)}` (đã xác nhận).
3. Ngoại lệ cho phép **giá trị rời** trong Tailwind khi không có token tương ứng
   (vd màu viền 1-off `#e6eef6`, gradient trang trí) — nhưng phải là 1-off thật sự.

### 2.3 Giữ gì từ design system

- Giữ **tên class** cho các class có trong CSS shared (`.btn .btn-primary`, `.field`,
  `.badge--green`, `.section-head`, `.text-link`, `.reveal`...). JSX dùng lại đúng
  class → không "lạc loài", vẫn đúng hợp đồng `DESIGN_RULES.MD`.
- **Icon = sprite SVG** (`#i-...`) và art (`#a-...`): port thành `<Icon name />` +
  `<Art name />` render `<use>`. KHÔNG dùng thư viện icon ngoài.
- Font qua `next/font/google` (Be Vietnam Pro + Noto Sans); biến gán cho
  `--font-heading` / `--font-body`.

### 2.4 Không dùng

- **Không** CSS module (hash tên class → phá hợp đồng `.btn .btn-primary`).
- **Không** file CSS riêng theo màn (`_theme/*.css` đã **bỏ**).
- **Không** thư viện UI ngoài (shadcn…) — giữ class design system + Tailwind utility.

### 2.5 Ví dụ đã áp dụng ở `(home)`

| Việc | CSS (shared) | Tailwind (JSX) |
| --- | --- | --- |
| Nút "Tìm chuyến xe" | `.btn .btn-primary` (base.css) | `h-12 px-5 max-[768px]:w-full` |
| Ô nhập điểm đi/đến | `.field`, `.field-control`, `.field-icon` (base.css) | phần grid `booking-route` |
| Nút hoán đổi | — | `rotate-90` / `rotate-[270deg]` (điều kiện `swapping`) |
| Đường nối 3 bước | — | `before:border-dashed … min-[1200px]:before:block` |
| Mũi tên select | — | `after:border-r-2 after:rotate-45 …` |
| FAQ icon xoay khi mở | — | `group-aria-expanded:rotate-180` |
| Form nháy sáng khi prefill | — | `data-[flashing]:animate-[formFlash…]` |
| Thẻ đội xe / tuyến / đánh giá | — | toàn bộ layout + hover bằng utility |

---

## 3. Cấu trúc thư mục Next.js

Áp dụng **App Router** + `src/`, **colocate theo màn**: mỗi route giữ code riêng
ngay cạnh `page.tsx`. Chỉ đẩy tài nguyên lên tầng trên khi được **≥2 màn** dùng.

### 3.1 Quy ước quan trọng

| Ký hiệu | Ý nghĩa |
| --- | --- |
| `(home)`, `(auth)`, `(app)` | **Route group** — KHÔNG thêm vào URL. `(home)/page.tsx` vẫn là `/` |
| `_components`, `_hooks`, `_utils` | **Private folder** — Next.js bỏ qua khi build route, dùng để colocate code |
| `[tripId]`, `[bookingId]` | Dynamic segment (vẫn là URL thật) |

> Không còn `_theme/`: style riêng của màn nằm ngay trong JSX (Tailwind).

### 3.2 Cây thư mục đầy đủ

```
nmcnpm/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx                 # root: html/body, font, globals.css
│  │  ├─ globals.css                # @import tailwindcss + shared CSS + @theme inline
│  │  ├─ not-found.tsx
│  │  ├─ error.tsx
│  │  ├─ loading.tsx
│  │  │
│  │  ├─ (home)/                    # URL: /  ── TRANG CHỦ (đã xong, màn tham chiếu)
│  │  │  ├─ page.tsx
│  │  │  ├─ _components/
│  │  │  │  ├─ hero.tsx
│  │  │  │  ├─ booking-form.tsx
│  │  │  │  ├─ routes-section.tsx
│  │  │  │  ├─ fleet-section.tsx
│  │  │  │  ├─ steps-section.tsx
│  │  │  │  ├─ features-section.tsx
│  │  │  │  ├─ testimonials-section.tsx
│  │  │  │  ├─ faq-section.tsx
│  │  │  │  ├─ cta-section.tsx
│  │  │  │  └─ home-motion.tsx
│  │  │  ├─ _hooks/
│  │  │  │  ├─ use-booking-form.ts
│  │  │  │  ├─ use-faq.ts
│  │  │  │  └─ use-current-dates.ts
│  │  │  └─ _utils/
│  │  │     ├─ validators.ts
│  │  │     └─ booking-events.ts
│  │  │
│  │  ├─ (auth)/                    # group tối giản, KHÔNG header/footer
│  │  │  ├─ layout.tsx
│  │  │  ├─ _components/            # dùng chung login + register
│  │  │  │  └─ auth-top.tsx
│  │  │  ├─ dang-nhap/
│  │  │  │  ├─ page.tsx
│  │  │  │  ├─ _components/ (login-form.tsx, social-buttons.tsx)
│  │  │  │  ├─ _hooks/ (use-login.ts)
│  │  │  │  └─ _utils/ (login-schema.ts)
│  │  │  └─ dang-ky/
│  │  │     ├─ page.tsx
│  │  │     ├─ _components/ (register-form.tsx, password-strength.tsx)
│  │  │     ├─ _hooks/ (use-register.ts)
│  │  │     └─ _utils/ (register-schema.ts)
│  │  │
│  │  ├─ (app)/                     # guard + SiteShell (header/footer)
│  │  │  ├─ layout.tsx
│  │  │  ├─ ket-qua-tim-chuyen/  (page.tsx, _components, _hooks, _utils)
│  │  │  ├─ chuyen/[tripId]/     (page.tsx, _components, _hooks, _utils)
│  │  │  ├─ dat-cho-thanh-cong/[bookingId]/
│  │  │  ├─ chuyen-cua-toi/
│  │  │  └─ ho-so/
│  │  │
│  │  └─ api/                       # mock route handlers
│  │     ├─ trips/route.ts
│  │     ├─ trips/[tripId]/route.ts
│  │     ├─ bookings/route.ts
│  │     ├─ bookings/[bookingId]/route.ts
│  │     ├─ auth/route.ts
│  │     └─ me/route.ts
│  │
│  ├─ components/                   # SHARED — dùng ≥2 màn khác màn gốc
│  │  ├─ ui/
│  │  │  ├─ sprite.tsx  icon.tsx  art.tsx
│  │  │  ├─ button.tsx  field.tsx  badge.tsx  surface.tsx
│  │  │  ├─ section.tsx  section-head.tsx
│  │  │  └─ site-header.tsx  site-footer.tsx  user-menu.tsx
│  │  └─ layout/
│  │     └─ site-shell.tsx          # <SiteHeader/> + children + <SiteFooter/>
│  │
│  ├─ hooks/                        # hooks shared (use-media-query, use-focus-trap...)
│  ├─ lib/
│  │  ├─ api/ (client.ts, trips.ts, bookings.ts, auth.ts)
│  │  ├─ mock/ (data.ts, handlers.ts)
│  │  ├─ format.ts
│  │  ├─ validators.ts
│  │  └─ constants.ts
│  ├─ stores/ (auth-store.ts, booking-store.ts)
│  ├─ types/index.ts
│  │
│  └─ styles/                       # CSS SHARED port từ design/ (đã áp dụng ở home)
│     ├─ tokens.css             # biến thiết kế (nguồn chân lý)
│     ├─ base.css               # reset + container + icon + btn + badge + field + section/text-link/avatar
│     ├─ header.css  user-menu.css  footer.css
│     ├─ motion.css             # keyframes + .reveal/.is-in + art-*
│     └─ responsive-shared.css  # media query CHỈ cho class shared
│
├─ public/assets/ (logo.svg, favicon.svg, image.png)
└─ design/                          # READ-ONLY
```

### 3.3 Template 1 màn (copy cho mọi route mới)

```
<ten-man>/
├─ page.tsx              # Server Component mỏng: guard / fetch / metadata → render shell
├─ _components/          # component CHỈ màn này dùng (style Tailwind ngay trong JSX)
├─ _hooks/               # hook CHỈ màn này dùng (use-<việc>.ts)
└─ _utils/               # hàm thuần CHỈ màn này dùng (validators, mappers)
```

### 3.4 Quy tắc đặt code

| Dùng bởi | Đặt ở |
| --- | --- |
| 1 màn | `<man>/_components`, `_hooks`, `_utils` |
| ≥2 màn cùng group (vd login + register) | `(auth)/_components` |
| ≥2 group (vd `(home)` + `(app)`) | `src/components/`, `src/hooks/`, `src/styles/`, `src/lib/` |

### 3.5 `page.tsx` mỗi màn nên mỏng

```tsx
// src/app/(auth)/dang-nhap/page.tsx
import { LoginForm } from "./_components/login-form";

export const metadata = { title: "Đăng nhập · Vi Vu Việt" };

export default function LoginPage() {
  return <LoginForm />;
}
```

```tsx
// src/app/(home)/page.tsx — TRANG CHỦ (KHÔNG import CSS màn)
import { SiteShell } from "@/components/layout/site-shell";
import { Hero } from "./_components/hero";
// ... các section khác

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />
      {/* ... */}
      <HomeMotion />
    </SiteShell>
  );
}
```

> **SiteShell** (header + footer) là shared `components/layout/site-shell.tsx`,
> render trong `page.tsx` của từng màn (hoặc trong `(home)/layout.tsx` và
> `(app)/layout.tsx` nếu muốn cả group dùng chung khung).

---

## 4. Bản đồ HTML → Route Next.js

> Route group `(home)`, `(auth)`, `(app)` KHÔNG xuất hiện trong URL. Cột "URL" là
> đường dẫn thật.

| HTML | URL | Route group | File `page.tsx` | Ghi chú |
| --- | --- | --- | --- | --- |
| `index.html` | `/` | `(home)` | `(home)/page.tsx` | hero `#dat-xe`, `#doi-xe`, `#tuyen-duong`... |
| `dang-nhap.html` | `/dang-nhap` | `(auth)` | `(auth)/dang-nhap/page.tsx` | redirect nếu đã đăng nhập |
| `dang-ky.html` | `/dang-ky` | `(auth)` | `(auth)/dang-ky/page.tsx` | |
| `ket-qua-tim-chuyen.html` | `/ket-qua-tim-chuyen?from=&to=&date=&seats=` | `(app)` | `(app)/ket-qua-tim-chuyen/page.tsx` | query params thay state ngầm |
| `chi-tiet-chuyen.html` | `/chuyen/[tripId]?seats=` | `(app)` | `(app)/chuyen/[tripId]/page.tsx` | chọn ghế là client state |
| `dat-cho-thanh-cong.html` | `/dat-cho-thanh-cong/[bookingId]` | `(app)` | `(app)/dat-cho-thanh-cong/[bookingId]/page.tsx` | QR sinh lại, không hardcode |
| `chuyen-cua-toi.html` | `/chuyen-cua-toi?tab=sap-toi` | `(app)` | `(app)/chuyen-cua-toi/page.tsx` | tab qua searchParams |
| `ho-so.html` | `/ho-so` | `(app)` | `(app)/ho-so/page.tsx` | |
| `shared/404.html` | — | — | `app/not-found.tsx` | |

Header/footer port từ `shared/components/header.html` & `footer.html`.
Menu/mobile-nav/dropdown/tabs/modal tái tạo bằng component + custom hook port
từ JS sẵn có của design (xem mục 6).

---

## 5. Mapping partials → component JSX (colocate)

| Partial nguồn | Component đích |
| --- | --- |
| `shared/components/sprite.html` | `components/ui/sprite.tsx` + `components/ui/icon.tsx` |
| `shared/components/art.html` | `components/ui/art.tsx` |
| `shared/components/header.html` | `components/ui/site-header.tsx` (+ `user-menu.tsx`) |
| `shared/components/footer.html` | `components/ui/site-footer.tsx` |
| `home/partials/hero.html` | `(home)/_components/hero.tsx` + `booking-form.tsx` |
| `home/partials/{routes,fleet,steps,features,testimonials,faq,cta}.html` | `(home)/_components/{routes,fleet,steps,...}-section.tsx` |
| `home/js/booking.js` | `(home)/_hooks/use-booking-form.ts` + `(home)/_utils/validators.ts` (đẩy validate dùng chung lên `lib/validators.ts`) |
| `ket-qua-tim-chuyen/partials/*` | `(app)/ket-qua-tim-chuyen/_components/*` + `_hooks/use-search-trips.ts`, `use-filters.ts` |
| `chi-tiet-chuyen/partials/{trip,seats,booking-form}.html` | `(app)/chuyen/[tripId]/_components/*` + `_hooks/use-trip-detail.ts`, `use-seat-selection.ts` |
| `dat-cho-thanh-cong/partials/success.html` | `(app)/dat-cho-thanh-cong/[bookingId]/_components/booking-ticket.tsx` + `qr-code.tsx` |
| `chuyen-cua-toi/partials/*` | `(app)/chuyen-cua-toi/_components/*` + `_hooks/use-my-trips.ts`, `use-cancel-trip.ts` |
| `ho-so/partials/*` | `(app)/ho-so/_components/*` + `_hooks/use-profile.ts` |
| `js/auth.js` (localStorage `vvv.auth.user`) | `stores/auth-store.ts` + `lib/api/auth.ts` + `(auth)/dang-nhap/_hooks/use-login.ts`, `(auth)/dang-ky/_hooks/use-register.ts` |

> Component nào **≥2 màn** dùng (vd `ride-card`, `trip-card` nếu cả search lẫn my-trips
> dùng lại) mới nâng lên `components/ui/` (hoặc `components/trips/` nếu là nhóm UI
> chuyên biệt). Còn lại giữ nguyên trong `_components/` của màn.
>
> **Styling của component shared:** giống quy tắc §2 — nếu class đã có trong CSS
> shared thì dùng lại class; phần biến thể riêng của màn truyền qua prop/Tailwind.

---

## 6. Dependencies cần thiết

### 6.1 Đã có sẵn trong `package.json`
`next@16.4.3`, `react@19.3`, `react-dom@19.3`, `typescript`, `eslint`,
`tailwindcss@4` + `@tailwindcss/turbopack`, `@types/*`.

### 6.2 Đề xuất cài thêm

| Nhóm | Gói | Bắt buộc? | Vì sao |
| --- | --- | --- | --- |
| Server state | `@tanstack/react-query` | ✅ | fetch/lọc chuyến, chuyến của tôi, cache |
| Client state | `zustand` | ✅ | thay `localStorage` mock: phiên + nháp đặt chỗ |
| Class helper | `clsx`, `tailwind-merge` | ✅ | ghép class Tailwind có điều kiện, tránh xung đột |
| Ngày giờ | `date-fns` (+ locale `vi`) | ✅ | format ngày/giờ, validate "từ hôm nay" |
| QR vé | `qrcode.react` | ✅ | mã QR trên trang đặt chỗ thành công |
| Toast | `sonner` | ◻︎ | thông báo thành công/lỗi (thay `.form-status`) |
| HTTP | `axios` | ✅ | interceptor (gắn token, xử lý 401 tập trung) + base URL |

> **KHÔNG** thư viện icon (giữ sprite SVG) và **KHÔNG** bộ UI ngoài (giữ class design
> system + Tailwind). Form dùng **controlled component + `lib/validators.ts`**.
> UI primitives (dropdown, modal, tabs, select) **tự code** bằng custom hook port từ
> `design/*/js/*`; `<select>` native. Modal bổ sung **focus trap**.

### 6.3 Lệnh cài (gộp)
```bash
# bắt buộc
npm i @tanstack/react-query zustand clsx tailwind-merge date-fns qrcode.react axios

# tuỳ chọn
npm i sonner
```

---

## 7. Kiến trúc dữ liệu & luồng

### 7.1 Types (`src/types/index.ts`)
`User`, `Trip` (route, giờ, giá, xe, tài xế, số ghế trống), `Seat` (số, trạng thái),
`Booking` (mã, tripId, ghế[], hành khách, trạng thái), `SearchQuery`, `TripStatus`
(`sap-toi|dang-di|hoan-thanh|da-huy`).

### 7.2 Luồng nghiệp vụ
```
Trang chủ (booking-form)  ──submit──▶  /ket-qua-tim-chuyen?from&to&date&seats
        │                                        │ chọn chuyến
        ▼                                        ▼
   validate (validators.ts)             /chuyen/[tripId]  ── chọn ghế + form
                                                   │ xác nhận
                                                   ▼
                     POST /api/bookings ──▶ /dat-cho-thanh-cong/[bookingId] (QR)
                                                   │
                                                   ▼
                       /chuyen-cua-toi (tab)  ·  /ho-so
Đăng nhập/Đăng ký: POST /api/auth → auth-store (persist) → guard `(app)/layout`
```

### 7.3 Mock API (giai đoạn đầu)
- Route handlers trong `src/app/api/*` đọc dữ liệu từ `lib/mock/data.ts`.
- Đăng nhập giả: mọi tài khoản hợp lệ → trả `User` + token; lưu qua `zustand/persist`.
- Thay bằng backend thật: chỉ đổi `lib/api/*` gọi base URL, không đụng component.

### 7.4 Bảo vệ route
`(app)/layout.tsx` là Server Component: đọc cookie/phiên → `redirect('/dang-nhap')`
nếu chưa đăng nhập. `(auth)/layout.tsx` redirect về `/` nếu đã đăng nhập.

---

## 8. Styling & thứ tự nạp CSS

Next.js App Router **cho phép import file `.css`**, nhưng theo hướng §2 thì **không
import CSS theo màn nữa**: mọi CSS đều là shared, nạp **một lần** ở `globals.css`;
phần riêng viết Tailwind trong JSX.

### 8.1 `app/globals.css` (điểm nạp duy nhất)

```css
@import "tailwindcss";        /* đặt đầu, kèm preflight */

@import "../styles/tokens.css";
@import "../styles/base.css";
@import "../styles/header.css";
@import "../styles/user-menu.css";
@import "../styles/footer.css";
@import "../styles/motion.css";
@import "../styles/responsive-shared.css";

@theme inline {               /* cầu nối token → Tailwind (§2.2) */
  --color-ink: var(--ink);
  /* ... */
  --radius-md: var(--radius-md);
  --shadow-xs: var(--shadow-xs);
  --ease-swift: var(--ease);
  --font-heading: var(--font-heading);
}

:root {
  --font-heading: var(--font-be-vietnam), "Be Vietnam Pro", system-ui, sans-serif;
  --font-body: var(--font-noto-sans), "Noto Sans", system-ui, sans-serif;
}
```

> **Thứ tự quan trọng:** `tailwindcss` trước, rồi tới token/base/… vì các file này
> là CSS **không layer** nên luôn thắng theme layer của Tailwind (không bị
> `@theme` ghi đè ngược). Font gán qua biến ở `layout.tsx`.

### 8.2 Vì sao không còn `responsive-desktop/mobile/touch.css`?

Các file đó chứa media query cho **cả class shared lẫn class riêng từng section**.
Theo §2:
- Media query cho **class shared** → gộp vào `responsive-shared.css` (giữ nguyên
  hiệu ứng cho `.container`, `.head-row`, header/user-menu/footer, `.field` iOS 16px).
- Media query cho **class riêng** → chuyển thành biến thể responsive Tailwind ngay
  trên element (`max-[1080px]:`, `max-[900px]:`, `max-[640px]:`, `min-[1200px]:`).

Tương tự, các file `hero.css`, `ride-card.css`, `booking.css`, `sections.css`,
`cta-footer.css` cũ đã được tách:
- phần **shared** → nhập vào `base.css` / `footer.css`;
- phần **riêng** → Tailwind trong `_components`.

### 8.3 Quy ước viết Tailwind cho phần riêng

- Breakpoints dùng đúng số của design: `max-[1080px]`, `max-[1024px]`, `max-[900px]`,
  `max-[768px]`, `max-[640px]`, `max-[520px]`, `max-[400px]`, `min-[1200px]`.
- Giá trị đặc thù dùng arbitrary value + `var(--token)` khi trỏ vào token.
- Trạng thái: dùng `aria-*`/`data-*` variant nếu DOM có cờ tương ứng; còn lại dùng
  className có điều kiện trong JSX (vd `swapping ? "rotate-[270deg]" : "rotate-90"`).
- Chuỗi class dài lặp trong cùng file → gom vào hằng số (vd `FLOAT_CHIP`, `TRUST_TONES`).

---

## 9. Accessibility & Responsive (giữ nguyên chuẩn DESIGN_RULES)

- 1 `<h1>`/trang; mỗi section có `h2` + `id` tiếng Việt không dấu.
- Form: `label` tường minh, `required`, lỗi qua `aria-invalid` + `.field.is-invalid`.
- Vùng chạm ≥44px, control `font-size` ≥16px (chống zoom iOS — xử lý ở
  `responsive-shared.css` cho `.field`).
- `:focus-visible` outline 3px; hỗ trợ `prefers-reduced-motion` (giữ ở `motion.css`).
- Test `320px → 1440px` + landscape; không trượt ngang
  (`scrollWidth <= clientWidth` tại 320/360/375/390/414/428).
- Modal/dropdown/tabs tự code theo mẫu JS trong design; riêng modal cần bổ sung
  **focus trap** và giữ trả focus/khoá scroll.

---

## 10. Lộ trình triển khai

| Phase | Nội dung | Kết quả |
| --- | --- | --- |
| **P0** | Dựng khung: `src/styles` (token + shared CSS + `@theme inline`), `app/layout.tsx` + font + `globals.css`, `/api` mock, types | App chạy, token + base + header/footer hiển thị |
| **P1** | `components/ui/*`: icon/art/sprite, header, footer, `layout/site-shell` | Design system dùng lại được |
| **P2** | `(home)` trang chủ — **đã xong theo §2** (Tailwind cho phần riêng) | `/` khớp design, submit → `/ket-qua-tim-chuyen` |
| **P3** | `(auth)` đăng nhập/đăng ký + auth-store + guard | Phiên thật thay localStorage mock |
| **P4** | `(app)/ket-qua-tim-chuyen` (react-query) + `(app)/chuyen/[tripId]` + seat-map | Luồng tìm & chọn chuyến |
| **P5** | POST booking → `(app)/dat-cho-thanh-cong/[bookingId]` (QR thật) | Đặt chỗ end-to-end |
| **P6** | `(app)/chuyen-cua-toi` (tab, huỷ chuyến) + `(app)/ho-so` | Quản lý sau đặt |
| **P7** | QC: responsive 320–1440, a11y, `not-found`/`error`, dọn dẹp | Đạt CHECKLIST §12 |

**Định nghĩa hoàn thành mỗi màn:** khớp pixel-ish với design, dùng đúng class hợp
đồng cho phần shared + Tailwind cho phần riêng (§2), responsive đạt §9, console sạch,
`npm run lint` + `npm run build` pass.

---

## 11. Rủi ro & điểm cần chốt

1. **Styling** — **đã chốt**: token + CSS shared + Tailwind cho phần riêng (§2).
2. **Backend:** giai đoạn này mock (`/api` route handlers). Khi có backend thật,
   chỉ đổi `lib/api/*`; cần chốt base URL + shape response.
3. **Auth:** mock bằng store/persist — cần chốt khi nào dùng NextAuth/JWT thật.
4. **Sprite vs file SVG:** port sprite thành JSX (đang làm) hay giữ file ở `public/`
   và `<use href="/assets/sprite.svg#i-...">`.
5. **Tên route:** giữ tiếng Việt không dấu (`/ket-qua-tim-chuyen`) như design.
6. **Dữ liệu mẫu:** `lib/mock/data.ts` cần đủ tuyến/ghế/booking để demo luồng.
7. **Ranh giới "shared"**: chốt tiêu chí ≥2 màn khi nâng component/hook lên
   `components/`, `hooks/`, `lib/`; với CSS là ≥2 lần dùng (§2.1).
8. **Độ trung thực pixel:** Tailwind làm tròn giá trị 1-off (vd alpha 0.16 ↔ /15).
   Chấp nhận lệch nhỏ; chỗ cần chính xác thì dùng arbitrary value đúng số.

---

## 12. Checklist kế thừa (đối chiếu trước commit)

- [ ] Màu/radius/shadow/font/spacing: ưu tiên token (CSS `var(--...)` hoặc utility
      map qua `@theme inline`); hex rời chỉ khi thật sự 1-off.
- [ ] Class shared dùng lại đúng hợp đồng: `.btn`, `.badge--*`, `.field`,
      `.section-head`, `.section-eyebrow`, `.text-link`, `.reveal`, `.avatar`.
- [ ] Phần riêng của section viết Tailwind trong JSX; **không** thêm file CSS màn.
- [ ] Icon/art qua sprite/`<Icon>`/`<Art>`; không thư viện icon ngoài.
- [ ] Thứ tự nạp CSS đúng §8.1; `@theme inline` map đủ token cần dùng.
- [ ] Đủ state hover/focus/active/loading + motion; a11y §9.
- [ ] Responsive 320–1440 + landscape; `scrollWidth <= clientWidth`; `npm run lint`
      + `npm run build` pass.
- [ ] Code đúng tầng colocate: màn-local ở `_components/_hooks/_utils`, shared mới
      lên `components/hooks/lib/styles`.
