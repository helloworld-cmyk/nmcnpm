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

---

## 4. Chuyển đổi HTML/CSS/JS tĩnh → React/Next.js (BẮT BUỘC)

> Nguyên tắc: khi chuyển code từ `design/` (HTML tĩnh) sang React của Next.js,
> **luôn dùng cách viết hiện đại của React**. CẤM mang theo các pattern JS/CSS/HTML
> thuần mà React đã có sẵn cơ chế thay thế tốt hơn.

### 4.1. Quy tắc biến đổi bắt buộc

| HTML/CSS/JS thuần (cấm)                        | React/Next.js hiện đại (dùng)                              |
| ---------------------------------------------- | ---------------------------------------------------------- |
| `document.querySelector` + gán `.value`, `.style`, `.textContent` | State (`useState`/`useReducer`) + render từ state |
| `addEventListener('click', ...)`               | Prop `onClick`, `onChange`, `onSubmit`… ngay trên JSX       |
| `element.classList.toggle/add/remove`          | `className` có điều kiện (template literal hoặc mảng join)   |
| Ẩn/hiện bằng `style.display = 'none'`          | Render có điều kiện (`{cond && ...}` / ternary trong JSX)   |
| Form đọc giá trị bằng `FormData` / `.value`    | Controlled component: state + `value` + `onChange`          |
| Copy-paste khối HTML lặp lại                   | `.map()` + `key` duy nhất                                   |
| Biến đếm `i++` trong handler / biến cục bộ ngoài render | State React (`setX(prev => prev + 1)`)             |
| `<script>` inline, `onclick="..."` trong HTML  | Handler React; không để lại thẻ `<script>` nào từ `design/` |
| `<a href>` điều hướng nội bộ                   | `<Link href>` từ `next/link`                                |
| `<img src>`                                    | `<Image>` từ `next/image` (khi ảnh đã nằm trong `public/`)  |
| setInterval/IntersectionObserver gắn trần      | `useEffect` + cleanup (`return () => ...`)                  |

### 4.2. Chuẩn JSX khi viết lại

- Thuộc tính đổi theo chuẩn React: `class` → `className`, `for` → `htmlFor`,
  các attribute kebab-case (`stroke-width`, `viewBox`…) → camelCase.
- Thẻ rỗng phải self-closing (`<br />`, `<input />`, `<img />`).
- Icon SVG → chuyển thành component TSX (`src/components/ui/`), nhận `className`
  qua prop thay vì copy nguyên khối SVG nhiều lần.

### 4.3. Khi nào mới được chạm DOM trực tiếp

- Chỉ khi React không có cơ chế tương đương (ví dụ: đo kích thước, tích hợp thư
  viện bên thứ ba cần node DOM, focus/scroll phức tạp).
- Khi đó **chỉ dùng `useRef`** + `useEffect`, không bao giờ `querySelector` rải
  khắp file, và phải dọn dẹp (cleanup) đúng cách trong `useEffect`.

### 4.4. Ví dụ minh họa (trước → sau)

**Trước — HTML/JS thuần (CẤM):**

```html
<div id="count">0</div>
<button onclick="increment()">+</button>
<script>
  let count = 0;
  function increment() {
    count++;
    document.getElementById("count").textContent = count;
  }
</script>
```

**Sau — React/Next.js hiện đại:**

```tsx
"use client";

import { useState } from "react";

const BASE_BUTTON = "rounded-full border px-3 py-1";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <span>{count}</span>
      <button className={BASE_BUTTON} onClick={() => setCount((prev) => prev + 1)}>
        +
      </button>
    </div>
  );
}
```

Điểm cần nhớ: state thay cho biến + DOM, `onClick` thay cho `onclick`/`addEventListener`,
render từ state thay cho gán `.textContent`, và class gom vào hằng số khi lặp lại.

---

## 5. Quản lý state — Zustand thay cho Provider (BẮT BUỘC)

> Nguyên tắc: **state dùng chung phải nằm trong Zustand store**, đặt trong
> `src/global-states/`. CẤM tạo `createContext` / Context Provider / external
> store tự viết (`useSyncExternalStore` thủ công) để chia sẻ state.

### 5.1. Khi nào dùng Zustand store, khi nào dùng state local

- State được **chia sẻ qua nhiều component/không cùng cây cha con trực tiếp**
  (session user, form đặt xe, giỏ/đặt chỗ…) → Zustand store trong
  `src/global-states/`.
- State **chỉ dùng trong 1 component** (open/close, hover, input riêng lẻ…) →
  `useState` ngay trong component, KHÔNG đưa vào store.

### 5.2. Quy ước viết store

- 1 store/1 file: `src/global-states/<domain>-store.ts`, đặt tên hook
  `use<Domain>Store` (tham khảo `session-store.ts`, `booking-form-store.ts`).
- Store chứa **state + actions**; action tự xử lý logic (validate, đổi giá trị,
  clear lỗi…) và component chỉ gọi, không duplicate logic ngoài store.
- Component đọc state bằng **selector từng field**
  (`useBookingFormStore((s) => s.origin)`), không lấy nguyên object store để
  tránh re-render thừa.
- **DOM ref (`useRef` element) KHÔNG đưa vào store** — ref thuộc về component
  render nó; store chỉ cần biết kết quả qua action (ví dụ focus lỗi do
  component tự focus sau khi `startSearch()` trả về field lỗi).
- Logic cần `useRouter`/navigation đặt trong component (hoặc hook của page),
  store trả dữ liệu (vd. query string) chứ không tự điều hướng.

### 5.3. Zustand + SSR/localStorage

- Giá trị khởi tạo của store phải **SSR-safe** (mặc định `null`/giá trị tĩnh),
  KHÔNG đọc `window`/`localStorage` lúc tạo store → tránh hydration mismatch.
- Đồng bộ từ localStorage qua action `hydrate()` gọi trong `useEffect` ở
  component consumer; KHÔNG dùng middleware `persist` trừ khi có yêu cầu riêng.
- Mọi truy cập `window` trong store phải bọc `typeof window === "undefined"`
  hoặc `try/catch` (chế độ riêng tư).

## 6. Cấu trúc thư mục dự án

```
nmcnpm/
├── AGENTS.MD                  # Tài liệu quy tắc này
├── README.md
├── package.json / package-lock.json
├── tsconfig.json / tsconfig.tsbuildinfo
├── next.config.ts
├── next-env.d.ts
├── eslint.config.mjs
│
├── design/                    # ⚠️ THIẾT KẾ TĨNH THAM KHẢO — KHÔNG build/import (xem §3)
│   ├── DESIGN_RULES.MD        #   Quy tắc thiết kế gốc
│   ├── build.js               #   Script build bản tĩnh (không liên quan src/)
│   ├── khach-hang/            #   FE khách hàng: index, ket-qua-tim-chuyen,
│   │   │                      #     chi-tiet-chuyen, chuyen-cua-toi, dat-cho-thanh-cong,
│   │   │                      #     dang-nhap, dang-ky, ho-so (mỗi screen 1 file .html)
│   │   ├── components/  css/  js/
│   │   └── screens/<ten-screen>/   # css/ + js/ + partials/ riêng từng screen
│   ├── admin/                 #   FE quản trị: tong-quan, admin-chuyen, admin-don-dat,
│   │   │                      #     admin-tai-xe, admin-xe, admin-tuyen-duong,
│   │   │                      #     admin-doanh-thu, admin-khach-hang, dang-nhap
│   │   ├── components/  css/  js/
│   │   └── screens/<ten-screen>/   # css/ + js/ + partials/
│   ├── tai-xe/                #   FE tài xế: tai-xe-tong-quan, tai-xe-dieu-hanh,
│   │   │                      #     tai-xe-chi-tiet-chuyen, tai-xe-xe, tai-xe-ho-so, dang-nhap
│   │   ├── components/  css/  js/
│   │   └── screens/<ten-screen>/   # css/ + js/ + partials/
│   └── shared/                #   Dùng chung 3 FE: 404.html (screens/loi),
│                              #     assets/, components/, css/, js/
│
├── public/
│   ├── assets/                #   logo.svg, favicon.svg, image.png
│   └── *.svg                  #   Icon mặc định Next.js (file, globe, next, vercel, window)
│
├── temp/                      #   File tạm — chỉ xóa TỪNG FILE, giữ folder (xem §2.1)
│
└── src/                       # ✅ SOURCE CHÍNH (Next.js App Router + Tailwind v4)
    ├── api/                   #   API client/helper (đang trống — đặt khi có backend)
    ├── global-states/         #   Zustand stores — state + actions (xem §5)
    │   │                      #     session, booking-form, booking-detail, trips,
    │   │                      #     search-filters, login, register, profile
    │   └── <domain>-store.ts
    ├── styles/                #   CSS DÙNG CHUNG — theo đúng phạm vi bảng §1.4
    │   ├── tokens.css         #     Design tokens (--*)
    │   ├── base.css           #     Reset + class dùng chéo
    │   ├── motion.css         #     .reveal/.is-in + @keyframes
    │   └── responsive-shared.css
    ├── components/
    │   ├── ui/                #   brand, reveal, site-header, site-footer
    │   ├── layout/            #   site-shell
    │   ├── icons/             #   Icon SVG dạng TSX (icon-base + index.ts export chung)
    │   ├── auth/              #   Khối dùng chung màn đăng nhập/đăng ký
    │   │                      #     (auth-screen, auth-card, auth-field…)
    │   └── art/               #   Hình minh họa dạng TSX (art-base, art-driver…)
    └── app/
        ├── layout.tsx         #   Root layout
        ├── globals.css        #   Import styles/ + mapping token sang @theme
        ├── favicon.ico
        ├── (home)/            #   Trang chủ (route group, không đổi URL)
        │   ├── page.tsx
        │   ├── _components/   #     Section riêng trang chủ (hero, booking-form…)
        │   ├── _hooks/        #     use-current-dates, use-faq
        │   └── _utils/        #     validators
        ├── chi-tiet-chuyen/   #   page.tsx + _components/ (seat-map, booking-panel…)
        ├── chuyen-cua-toi/    #   page.tsx + _components/ + _data/
        ├── ket-qua-tim-chuyen/#   page.tsx + _components/ + _data/ + _utils/
        ├── dat-cho-thanh-cong/#   page.tsx + _components/
        ├── ho-so/             #   page.tsx + _components/
        ├── dang-nhap/         #   page.tsx + _components/ + _hooks/ + _utils/
        └── dang-ky/           #   page.tsx + _components/ + _hooks/ + _utils/
```

### 6.1. Quy ước theo cấu trúc

- Folder route `src/app/<ten-route>/` chứa `page.tsx`; code riêng của route đặt
  trong folder con bắt đầu bằng `_` (Next.js bỏ qua khi định tuyến):
  `_components/` (component riêng), `_hooks/` (hook riêng), `_utils/`
  (hàm tiện ích riêng), `_data/` (dữ liệu mock/thumbnail).
- Route mới → tạo folder cùng cấp trong `src/app/`, lấy màn tương ứng trong
  `design/` làm tham chiếu bố cục.
- Component dùng chung ≥2 route → `src/components/` (phân vai theo folder §6);
  chỉ dùng 1 route → `src/app/<route>/_components/`.
- Store mới → `src/global-states/<domain>-store.ts` theo §5.
- Icon mới → thêm file TSX trong `src/components/icons/` và export qua
  `index.ts`; không copy SVG trực tiếp vào page/component.

---

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
