import { DIFFICULTIES, type Difficulty } from '@/shared/types/match';
import { clamp } from '@/shared/utils/format';
import type { LifetimeStats, PlayerProfile, SaveData, Settings } from './schema';

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Bộ làm sạch dữ liệu: đọc từng trường, trường sai kiểu/ngoài phạm vi được
 * thay bằng giá trị mặc định và ghi nhận vào `issues`. Không loại bỏ cả bản lưu
 * chỉ vì một trường hỏng.
 */
class Sanitizer {
  readonly issues: string[] = [];

  record(value: unknown, path: string): UnknownRecord {
    if (isRecord(value)) return value;
    this.issues.push(`${path}: không phải object`);
    return {};
  }

  number(value: unknown, fallback: number, path: string, min: number, max: number): number {
    if (typeof value === 'number' && Number.isFinite(value)) {
      const clamped = clamp(value, min, max);
      if (clamped !== value) this.issues.push(`${path}: ngoài phạm vi, đã giới hạn`);
      return clamped;
    }
    if (value !== undefined) this.issues.push(`${path}: không phải số`);
    return fallback;
  }

  integer(value: unknown, fallback: number, path: string, min = 0, max = Number.MAX_SAFE_INTEGER): number {
    return Math.floor(this.number(value, fallback, path, min, max));
  }

  boolean(value: unknown, fallback: boolean, path: string): boolean {
    if (typeof value === 'boolean') return value;
    if (value !== undefined) this.issues.push(`${path}: không phải boolean`);
    return fallback;
  }

  string(value: unknown, fallback: string, path: string): string {
    if (typeof value === 'string') return value;
    if (value !== undefined) this.issues.push(`${path}: không phải chuỗi`);
    return fallback;
  }

  difficulty(value: unknown, fallback: Difficulty, path: string): Difficulty {
    if (typeof value === 'string' && (DIFFICULTIES as readonly string[]).includes(value)) {
      return value as Difficulty;
    }
    if (value !== undefined) this.issues.push(`${path}: độ khó không hợp lệ`);
    return fallback;
  }
}

export interface SanitizeContext {
  defaults: SaveData;
  /** Id tướng tồn tại – dùng để loại bỏ id lạ trong danh sách đã mở khóa. */
  knownHeroIds: ReadonlySet<string>;
  /** Kiểm tra tên người chơi hợp lệ. */
  isValidPlayerName: (name: string) => boolean;
}

/** Làm sạch dữ liệu đã giải mã JSON (đúng version hiện tại) thành SaveData hợp lệ. */
export function sanitizeSaveV1(raw: unknown, ctx: SanitizeContext): { data: SaveData; issues: string[] } {
  const s = new Sanitizer();
  const d = ctx.defaults;
  const root = s.record(raw, 'root');

  const profileRaw = s.record(root.profile, 'profile');
  const name = s.string(profileRaw.playerName, d.profile.playerName, 'profile.playerName').trim();
  const profile: PlayerProfile = {
    playerName: ctx.isValidPlayerName(name) ? name : d.profile.playerName,
    createdAt: s.string(profileRaw.createdAt, d.profile.createdAt, 'profile.createdAt'),
    honorPoints: s.integer(profileRaw.honorPoints, d.profile.honorPoints, 'profile.honorPoints'),
  };
  if (profile.playerName !== name) s.issues.push('profile.playerName: tên không hợp lệ');

  let unlockedHeroes: string[];
  if (Array.isArray(root.unlockedHeroes)) {
    const valid = root.unlockedHeroes.filter(
      (id): id is string => typeof id === 'string' && ctx.knownHeroIds.has(id),
    );
    if (valid.length !== root.unlockedHeroes.length) s.issues.push('unlockedHeroes: có id không hợp lệ');
    // Tướng mặc định luôn được sở hữu, kể cả khi bản lưu thiếu.
    unlockedHeroes = [...new Set([...d.unlockedHeroes, ...valid])];
  } else {
    if (root.unlockedHeroes !== undefined) s.issues.push('unlockedHeroes: không phải mảng');
    unlockedHeroes = [...d.unlockedHeroes];
  }

  const settingsRaw = s.record(root.settings, 'settings');
  const audioRaw = s.record(settingsRaw.audio, 'settings.audio');
  const displayRaw = s.record(settingsRaw.display, 'settings.display');
  const gameplayRaw = s.record(settingsRaw.gameplay, 'settings.gameplay');
  const ds = d.settings;
  const settings: Settings = {
    audio: {
      master: s.number(audioRaw.master, ds.audio.master, 'settings.audio.master', 0, 1),
      sfx: s.number(audioRaw.sfx, ds.audio.sfx, 'settings.audio.sfx', 0, 1),
      muted: s.boolean(audioRaw.muted, ds.audio.muted, 'settings.audio.muted'),
    },
    display: {
      showFps: s.boolean(displayRaw.showFps, ds.display.showFps, 'settings.display.showFps'),
      reduceMotion: s.boolean(displayRaw.reduceMotion, ds.display.reduceMotion, 'settings.display.reduceMotion'),
    },
    gameplay: {
      defaultDifficulty: s.difficulty(
        gameplayRaw.defaultDifficulty,
        ds.gameplay.defaultDifficulty,
        'settings.gameplay.defaultDifficulty',
      ),
    },
  };

  const statsRaw = s.record(root.stats, 'stats');
  const stats: LifetimeStats = {
    matches: s.integer(statsRaw.matches, 0, 'stats.matches'),
    wins: s.integer(statsRaw.wins, 0, 'stats.wins'),
    kills: s.integer(statsRaw.kills, 0, 'stats.kills'),
    deaths: s.integer(statsRaw.deaths, 0, 'stats.deaths'),
    assists: s.integer(statsRaw.assists, 0, 'stats.assists'),
  };
  if (stats.wins > stats.matches) {
    s.issues.push('stats.wins > stats.matches');
    stats.wins = stats.matches;
  }

  return { data: { version: 1, profile, unlockedHeroes, settings, stats }, issues: s.issues };
}
