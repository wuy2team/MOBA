import type { DefinitionId } from '@/shared/types/ids';
import type { Position } from '@/shared/types/match';
import type { StatBlock } from '@/shared/types/stats';

export type HeroRole = 'fighter' | 'mage' | 'marksman' | 'tank' | 'assassin' | 'support';

export const HERO_ROLES: readonly HeroRole[] = ['fighter', 'mage', 'marksman', 'tank', 'assassin', 'support'];

export type SkillSlot = 'q' | 'w' | 'e' | 'r';

export const SKILL_SLOTS: readonly SkillSlot[] = ['q', 'w', 'e', 'r'];

/** Nhãn mô tả kiểu kỹ năng – hiển thị trên giao diện và gợi ý cho AI. */
export type SkillTag =
  | 'damage'
  | 'skillshot'
  | 'targeted'
  | 'area'
  | 'dash'
  | 'blink'
  | 'cc'
  | 'heal'
  | 'shield'
  | 'buff'
  | 'zone';

/**
 * Văn bản kỹ năng (tên, mô tả, nhãn). Định nghĩa thực thi đầy đủ
 * (`SkillDefinition` với EffectSpec) được thêm ở Giai đoạn 06 và tham chiếu tới đây.
 */
export interface SkillText {
  name: string;
  description: string;
  tags: readonly SkillTag[];
}

export type HeroUnlock = { byDefault: true } | { byDefault: false; honorCost: number };

/** Bảng màu dùng để vẽ ảnh đại diện tạm (ADR-12) và làm điểm nhấn giao diện. */
export interface HeroPalette {
  primary: string;
  secondary: string;
  accent: string;
}

export interface HeroDefinition {
  id: DefinitionId;
  name: string;
  title: string;
  lore: string;
  role: HeroRole;
  secondaryRole?: HeroRole;
  /** Vị trí phù hợp, phần tử đầu là vị trí chính. Dùng cho chia đội AI. */
  positions: readonly Position[];
  difficulty: 1 | 2 | 3;
  resource: 'mana' | 'none';
  attackKind: 'melee' | 'ranged';
  /** Chỉ số tại cấp 1. */
  baseStats: StatBlock;
  /** Chỉ số cộng thêm mỗi cấp. */
  growth: Partial<StatBlock>;
  passive: SkillText;
  skills: Readonly<Record<SkillSlot, SkillText>>;
  palette: HeroPalette;
  unlock: HeroUnlock;
}
