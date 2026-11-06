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

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
