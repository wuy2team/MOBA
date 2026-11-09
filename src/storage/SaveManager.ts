import { BACKUP_KEY, CURRENT_SAVE_VERSION, SAVE_KEY, type SaveData } from './schema';
import type { SafeStorage, StorageWriteError } from './safeStorage';
import { sanitizeSaveV1, type SanitizeContext } from './validators';

/**
 * Trạng thái sau khi nạp:
 * - fresh: chưa có dữ liệu, dùng mặc định.
 * - loaded: đọc thành công, dữ liệu sạch.
 * - repaired: đọc được nhưng có trường hỏng đã được thay bằng mặc định.
 * - reset: không đọc được (JSON hỏng / version lạ) ⇒ sao lưu bản cũ, dùng mặc định.
 */
export type LoadStatus = 'fresh' | 'loaded' | 'repaired' | 'reset';

export interface LoadResult {
  data: SaveData;
  status: LoadStatus;
  issues: readonly string[];
  /** false nếu đang chạy bằng bộ nhớ tạm (không lưu được qua lần tải trang). */
  persistent: boolean;
}

export type SaveResult = { ok: true } | { ok: false; reason: StorageWriteError };

/**
 * Đọc/ghi toàn bộ dữ liệu người chơi thành một bản ghi có version (docs/02 §7.11).
 * Bảng `migrations` nâng cấp bản lưu cũ lên version hiện tại (GĐ 14 bổ sung thêm bước).
 */
export class SaveManager {
  /** migrations[v] nâng dữ liệu từ version v lên v + 1. */
  private readonly migrations: Readonly<Record<number, (raw: Record<string, unknown>) => Record<string, unknown>>> =
    {};

  constructor(
    private readonly storage: SafeStorage,
    private readonly context: SanitizeContext,
  ) {}

  load(): LoadResult {
    const persistent = this.storage.isPersistent;
    const text = this.storage.read(SAVE_KEY);
    if (text === null) {
      return { data: this.context.defaults, status: 'fresh', issues: [], persistent };
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      return this.resetWithBackup(text, 'JSON không đọc được', persistent);
    }

    const migrated = this.migrate(parsed);
    if (migrated === null) {
      return this.resetWithBackup(text, 'version không được hỗ trợ', persistent);
    }

    const { data, issues } = sanitizeSaveV1(migrated, this.context);
    return { data, status: issues.length > 0 ? 'repaired' : 'loaded', issues, persistent };
  }

  save(data: SaveData): SaveResult {
    const ok = this.storage.write(SAVE_KEY, JSON.stringify(data));
    if (ok) return { ok: true };
    return { ok: false, reason: this.storage.lastWriteError ?? 'unavailable' };
  }

  /** Xóa toàn bộ dữ liệu lưu (dùng cho nút "Xóa dữ liệu" có xác nhận). */
  clear(): void {
    this.storage.remove(SAVE_KEY);
  }

  private migrate(parsed: unknown): Record<string, unknown> | null {
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return null;
    let current = parsed as Record<string, unknown>;
    let version = current.version;
    if (typeof version !== 'number' || !Number.isInteger(version) || version < 1) return null;
    while (version < CURRENT_SAVE_VERSION) {
      const step = this.migrations[version];
      if (!step) return null;
      current = step(current);
      version += 1;
      current.version = version;
    }
    return version === CURRENT_SAVE_VERSION ? current : null;
  }

  private resetWithBackup(raw: string, issue: string, persistent: boolean): LoadResult {
    this.storage.write(BACKUP_KEY, raw);
    return { data: this.context.defaults, status: 'reset', issues: [issue], persistent };
  }
}
