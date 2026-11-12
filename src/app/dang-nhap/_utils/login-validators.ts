export type LoginField = "identifier" | "password";

export type LoginValues = {
  identifier: string;
  password: string;
};

/* Màn đăng nhập: mỗi ô chỉ cần không bỏ trống */
export function validateLoginValue(value: string): boolean {
  return value.trim().length > 0;
}
