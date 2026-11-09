import { describe, expect, it } from 'vitest';
import { SafeStorage, type KeyValueStore } from './safeStorage';
import { SaveManager } from './SaveManager';
import { BACKUP_KEY, createDefaultSave, SAVE_KEY } from './schema';
import type { SanitizeContext } from './validators';

class MemoryStore implements KeyValueStore {
  readonly data = new Map<string, string>();
  getItem(key: string) {
    return this.data.get(key) ?? null;
  }
  setItem(key: string, value: string) {
    this.data.set(key, value);
  }
  removeItem(key: string) {
    this.data.delete(key);
  }
}

class FailingStore extends MemoryStore {
  constructor(private readonly errorName: string) {
    super();
  }
  override setItem() {
    const error = new Error('blocked');
    error.name = this.errorName;
    throw error;
  }
}

const defaults = createDefaultSave({
  playerName: 'Người chơi',
  honorPoints: 500,
  unlockedHeroes: ['hero.a', 'hero.b'],
  now: '2026-11-09T00:00:00.000Z',
});

const context: SanitizeContext = {
  defaults,
  knownHeroIds: new Set(['hero.a', 'hero.b', 'hero.c']),
  isValidPlayerName: (name) => name.length >= 2 && name.length <= 16,
};

function setup(backend: KeyValueStore | null = new MemoryStore()) {
  const storage = new SafeStorage(backend);
  return { storage, manager: new SaveManager(storage, context), backend };
}

describe('SaveManager', () => {
  it('chưa có dữ liệu ⇒ trả mặc định với trạng thái fresh', () => {
    const { manager } = setup();
    const result = manager.load();
    expect(result.status).toBe('fresh');
    expect(result.data).toEqual(defaults);
    expect(result.persistent).toBe(true);
  });

  it('lưu rồi đọc lại giữ nguyên dữ liệu', () => {
    const { manager } = setup();
    const changed = {
      ...defaults,
      profile: { ...defaults.profile, playerName: 'Huyền Thoại', honorPoints: 50 },
      unlockedHeroes: ['hero.a', 'hero.b', 'hero.c'],
    };
    expect(manager.save(changed)).toEqual({ ok: true });
    const result = manager.load();
    expect(result.status).toBe('loaded');
    expect(result.data).toEqual(changed);
  });

  it('JSON hỏng ⇒ sao lưu bản cũ vào khóa backup và dùng mặc định', () => {
    const backend = new MemoryStore();
    backend.setItem(SAVE_KEY, '{không phải json');
    const { manager } = setup(backend);
    const result = manager.load();
    expect(result.status).toBe('reset');
    expect(result.data).toEqual(defaults);
    expect(backend.getItem(BACKUP_KEY)).toBe('{không phải json');
  });

  it('version tương lai ⇒ không ghi đè, sao lưu và dùng mặc định', () => {
    const backend = new MemoryStore();
    backend.setItem(SAVE_KEY, JSON.stringify({ ...defaults, version: 99 }));
    const { manager } = setup(backend);
    expect(manager.load().status).toBe('reset');
    expect(backend.getItem(BACKUP_KEY)).toContain('"version":99');
  });

  it('trường sai kiểu được sửa từng phần, giữ lại phần hợp lệ', () => {
    const backend = new MemoryStore();
    backend.setItem(
      SAVE_KEY,
      JSON.stringify({
        version: 1,
        profile: { playerName: 'X', createdAt: '2026-01-01', honorPoints: -40 },
        unlockedHeroes: ['hero.c', 'hero.lạ', 42],
        settings: { audio: { master: 3, sfx: 'to', muted: true }, display: null, gameplay: { defaultDifficulty: 'hard' } },
        stats: { matches: 2, wins: 5 },
      }),
    );
    const { manager } = setup(backend);
    const result = manager.load();
    expect(result.status).toBe('repaired');
    expect(result.data.profile.playerName).toBe('Người chơi'); // tên quá ngắn
    expect(result.data.profile.honorPoints).toBe(0); // giới hạn ≥ 0
    expect(result.data.profile.createdAt).toBe('2026-01-01');
    expect(result.data.unlockedHeroes.sort()).toEqual(['hero.a', 'hero.b', 'hero.c']);
    expect(result.data.settings.audio).toEqual({ master: 1, sfx: 0.8, muted: true });
    expect(result.data.settings.display).toEqual(defaults.settings.display);
    expect(result.data.settings.gameplay.defaultDifficulty).toBe('hard');
    expect(result.data.stats.wins).toBe(2);
    expect(result.issues.length).toBeGreaterThan(0);
  });

  it('hết dung lượng ⇒ save trả lỗi quota nhưng không ném ngoại lệ', () => {
    const { manager, storage } = setup(new FailingStore('QuotaExceededError'));
    expect(manager.save(defaults)).toEqual({ ok: false, reason: 'quota_exceeded' });
    expect(storage.isPersistent).toBe(true);
  });

  it('localStorage bị chặn ⇒ chuyển sang bộ nhớ tạm, ứng dụng vẫn đọc/ghi được', () => {
    const { manager, storage } = setup(new FailingStore('SecurityError'));
    expect(manager.save(defaults)).toEqual({ ok: false, reason: 'unavailable' });
    expect(storage.isPersistent).toBe(false);
    expect(manager.load().data).toEqual(defaults);
  });

  it('không có localStorage ⇒ persistent = false', () => {
    const { manager } = setup(null);
    expect(manager.load().persistent).toBe(false);
  });
});
