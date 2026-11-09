import type { ReactNode } from "react";

const SUBMIT_BASE =
  "btn btn-primary btn-lg mt-1 w-full";

/* Nút submit của form auth, tự khoá và hiển thị trạng thái loading */
export function AuthSubmitButton({
  loading,
  children,
}: {
  loading: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="submit"
      className={`${SUBMIT_BASE} ${loading ? "is-loading" : ""}`}
      disabled={loading}
      aria-busy={loading}
    >
      {children}
    </button>
  );
}
