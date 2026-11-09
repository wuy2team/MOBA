import { createEmptyStatBlock, type StatBlock } from '@/shared/types/stats';

/** Hệ số nhân chí mạng mặc định (docs/03 §2.1). */
export const DEFAULT_CRIT_MULTIPLIER = 1.75;

/** Tạo StatBlock cấp 1: trường không khai báo bằng 0, chí mạng ×1.75. */
export function heroStats(values: Partial<StatBlock>): StatBlock {
  return { ...createEmptyStatBlock(), critMultiplier: DEFAULT_CRIT_MULTIPLIER, ...values };
}
