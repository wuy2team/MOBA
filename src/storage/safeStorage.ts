/** Giao diện tối thiểu của kho key–value (khớp một phần Web Storage). */
export interface KeyValueStore {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export type StorageWriteError = 'quota_exceeded' | 'unavailable';

/**
 * Bọc localStorage an toàn (R12): không bao giờ ném lỗi ra ngoài.
 * Khi trình duyệt chặn/hết dung lượng/chế độ riêng tư, chuyển sang bộ nhớ tạm
 * để ứng dụng vẫn chạy (dữ liệu khi đó mất sau khi tải lại trang).
 */
export class SafeStorage {
  private readonly memory = new Map<string, string>();
  private backend: KeyValueStore | null;
  private lastError: StorageWriteError | null = null;

  constructor(backend: KeyValueStore | null) {
    this.backend = backend;
  }

  /** true nếu dữ liệu đang được ghi bền vững (không phải bộ nhớ tạm). */
  get isPersistent(): boolean {
    return this.backend !== null;
  }

  get lastWriteError(): StorageWriteError | null {
    return this.lastError;
  }

  read(key: string): string | null {
    if (this.backend) {
      try {
        return this.backend.getItem(key);
      } catch {
        this.backend = null;
      }
    }
    return this.memory.get(key) ?? null;
  }

  write(key: string, value: string): boolean {
    this.memory.set(key, value);
    if (!this.backend) {
      this.lastError = 'unavailable';
      return false;
    }
    try {
      this.backend.setItem(key, value);
      this.lastError = null;
      return true;
    } catch (error) {
      this.lastError = isQuotaError(error) ? 'quota_exceeded' : 'unavailable';
      if (this.lastError === 'unavailable') this.backend = null;
      return false;
    }
  }

  remove(key: string): void {
    this.memory.delete(key);
    if (!this.backend) return;
    try {
      this.backend.removeItem(key);
    } catch {
      this.backend = null;
    }
  }
}

function isQuotaError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED';
}

/** Lấy window.localStorage nếu truy cập được (một số trình duyệt ném lỗi ngay khi truy cập). */
export function resolveBrowserStorage(): KeyValueStore | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    const probe = '__arena_legends_probe__';
    window.localStorage.setItem(probe, '1');
    window.localStorage.removeItem(probe);
    return window.localStorage;
  } catch {
    return null;
  }
}
