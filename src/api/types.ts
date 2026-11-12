/* Hợp đồng dùng chung cho lớp API: mã lỗi, envelope, kiểu token và lỗi API. */

export const APP_CODE = {
  SUCCESS: 0,
  UNKNOWN_ERROR: 1,
  USER_DEACTIVATE: 2,
  USER_EXITS: 3,
  INPUT_INVALID: 4,
  INVALID_PASSWORD: 5,
  INVALID_TOKEN: 6,
} as const;

export type ApiEnvelope<T> = {
  code: number;
  message: string;
  wsResponse: T;
};

export class ApiError extends Error {
  code: number;
  status?: number;

  constructor(code: number, message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
  }
}

export function wrapRequest<T>(payload: T): { wsRequest: T } {
  return { wsRequest: payload };
}

/* Một trang kết quả phân trang từ backend; page bắt đầu từ 0. */
export type PageResponse<T> = {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};
