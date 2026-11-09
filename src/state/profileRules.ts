import { PROFILE_RULES } from '@/data/rules/profile';
import type { Result } from '@/shared/utils/result';

export type PlayerNameError = 'too_short' | 'too_long' | 'invalid_characters';

// Chữ cái (mọi ngôn ngữ, kể cả tiếng Việt có dấu), chữ số, khoảng trắng, _ - .
const ALLOWED_NAME = /^[\p{L}\p{M}\p{N} _.-]+$/u;

/** Chuẩn hóa và kiểm tra tên người chơi. */
export function validatePlayerName(raw: string): Result<string, PlayerNameError> {
  const name = raw.trim().replace(/\s+/g, ' ');
  if (name.length < PROFILE_RULES.playerNameMinLength) return { ok: false, reason: 'too_short' };
  if (name.length > PROFILE_RULES.playerNameMaxLength) return { ok: false, reason: 'too_long' };
  if (!ALLOWED_NAME.test(name)) return { ok: false, reason: 'invalid_characters' };
  return { ok: true, value: name };
}
