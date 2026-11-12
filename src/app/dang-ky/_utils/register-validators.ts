export type RegisterField =  | "fullname"
  | "phone"
  | "email"
  | "password"
  | "confirm";

export type RegisterValues = {
  fullname: string;
  phone: string;
  email: string;
  password: string;
  confirm: string;
};

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const PHONE_MIN_DIGITS = 9;

/* Kiểm tra hợp lệ của một ô ở màn đăng ký (dùng cả khi blur lẫn khi submit) */
export function validateRegisterField(
  field: RegisterField,
  value: string,
): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (field === "email") return EMAIL_PATTERN.test(trimmed);
  if (field === "phone")
    return trimmed.replace(/\D/g, "").length >= PHONE_MIN_DIGITS;
  return true;
}

/* Mật khẩu xác nhận có khớp không (chỉ xét khi đã nhập lại) */
export function isConfirmMismatch(password: string, confirm: string): boolean {
  return confirm.trim() !== "" && confirm !== password;
}


