import type { DefinitionId } from '@/shared/types/ids';
import type { Difficulty } from '@/shared/types/match';

/** Phiên bản cấu trúc dữ liệu lưu hiện tại. Tăng khi đổi cấu trúc + thêm migration. */
export const CURRENT_SAVE_VERSION = 1;

export const SAVE_KEY = 'arena-legends:save';
export const BACKUP_KEY = 'arena-legends:backup';

export interface AudioSettings {
  /** 0..1 */
  master: number;
  /** 0..1 – âm thanh hiệu ứng (bao gồm âm giao diện). */
  sfx: number;
  muted: boolean;
}

export interface DisplaySettings {
  showFps: boolean;
  reduceMotion: boolean;
}

export interface GameplaySettings {
  defaultDifficulty: Difficulty;
}

export interface Settings {
  audio: AudioSettings;
  display: DisplaySettings;
  gameplay: GameplaySettings;
}

export interface PlayerProfile {
  playerName: string;
  /** ISO 8601 */
  createdAt: string;
  honorPoints: number;
}

export interface LifetimeStats {
  matches: number;
  wins: number;
  kills: number;
  deaths: number;
  assists: number;
}

export interface SaveDataV1 {
  version: 1;
  profile: PlayerProfile;
  unlockedHeroes: DefinitionId[];
  settings: Settings;
  stats: LifetimeStats;
}

export type SaveData = SaveDataV1;

export interface SaveDefaultsInput {
  playerName: string;
  honorPoints: number;
  unlockedHeroes: readonly DefinitionId[];
  /** ISO 8601, truyền vào để hàm thuần và test được. */
  now: string;
}

export function createDefaultSettings(): Settings {
  return {
    audio: { master: 0.8, sfx: 0.8, muted: false },
    display: { showFps: false, reduceMotion: false },
    gameplay: { defaultDifficulty: 'normal' },
  };
}

export function createDefaultSave(input: SaveDefaultsInput): SaveData {
  return {
    version: CURRENT_SAVE_VERSION,
    profile: { playerName: input.playerName, createdAt: input.now, honorPoints: input.honorPoints },
    unlockedHeroes: [...input.unlockedHeroes],
    settings: createDefaultSettings(),
    stats: { matches: 0, wins: 0, kills: 0, deaths: 0, assists: 0 },
  };
}
