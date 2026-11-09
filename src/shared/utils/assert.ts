/** Lỗi do vi phạm giả định nội bộ (lỗi lập trình, không phải lỗi nghiệp vụ). */
export class InvariantError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvariantError';
  }
}

/** Khẳng định điều kiện đúng; sai ⇒ ném InvariantError. */
export function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new InvariantError(message);
  }
}

/** Trả về giá trị nếu khác null/undefined, ngược lại ném InvariantError. */
export function assertDefined<T>(value: T | null | undefined, message: string): T {
  if (value === null || value === undefined) {
    throw new InvariantError(message);
  }
  return value;
}

/** Dùng trong nhánh `default` của switch để TypeScript kiểm tra đủ mọi trường hợp. */
export function assertNever(value: never, context: string): never {
  throw new InvariantError(`Giá trị không được xử lý trong ${context}: ${String(value)}`);
}

/** Chuyển giá trị bất kỳ bị ném ra thành thông điệp đọc được. */
export function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}
