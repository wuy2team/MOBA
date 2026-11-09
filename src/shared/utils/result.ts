/**
 * Kết quả của một thao tác nghiệp vụ có thể thất bại hợp lệ
 * (ví dụ: mua đồ khi không đủ vàng). Không dùng exception cho các trường hợp này.
 */
export type Result<T, E extends string = string> = { ok: true; value: T } | { ok: false; reason: E };

export function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

export function fail<E extends string>(reason: E): Result<never, E> {
  return { ok: false, reason };
}
