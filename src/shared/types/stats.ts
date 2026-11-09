/** Bộ chỉ số đầy đủ của một đơn vị (docs/02 §7.1). */
export interface StatBlock {
  maxHp: number;
  /** Hồi máu mỗi giây. */
  hpRegen: number;
  maxMana: number;
  /** Hồi năng lượng mỗi giây. */
  manaRegen: number;
  attackDamage: number;
  abilityPower: number;
  armor: number;
  magicResist: number;
  /** Đơn vị world mỗi giây. */
  moveSpeed: number;
  /** Số đòn đánh mỗi giây. */
  attackSpeed: number;
  /** Tầm đánh, đơn vị world. */
  attackRange: number;
  /** 0..1 */
  critChance: number;
  critMultiplier: number;
  /** cooldown = base × 100 / (100 + abilityHaste) */
  abilityHaste: number;
  /** 0..1 */
  lifeSteal: number;
  /** 0..1 */
  spellVamp: number;
  armorPenFlat: number;
  armorPenPct: number;
  magicPenFlat: number;
  magicPenPct: number;
  /** 0..1 – tăng lượng hồi máu/khiên cho đồng minh. */
  healShieldPower: number;
}

export type StatKey = keyof StatBlock;

export const STAT_KEYS: readonly StatKey[] = [
  'maxHp',
  'hpRegen',
  'maxMana',
  'manaRegen',
  'attackDamage',
  'abilityPower',
  'armor',
  'magicResist',
  'moveSpeed',
  'attackSpeed',
  'attackRange',
  'critChance',
  'critMultiplier',
  'abilityHaste',
  'lifeSteal',
  'spellVamp',
  'armorPenFlat',
  'armorPenPct',
  'magicPenFlat',
  'magicPenPct',
  'healShieldPower',
];

export type StatModifierMode = 'flat' | 'percent';

export interface StatModifierSpec {
  stat: StatKey;
  mode: StatModifierMode;
  value: number;
}

export type DamageType = 'physical' | 'magic' | 'true';

/** Bộ chỉ số rỗng – điểm khởi đầu để cộng dồn. */
export function createEmptyStatBlock(): StatBlock {
  return {
    maxHp: 0,
    hpRegen: 0,
    maxMana: 0,
    manaRegen: 0,
    attackDamage: 0,
    abilityPower: 0,
    armor: 0,
    magicResist: 0,
    moveSpeed: 0,
    attackSpeed: 0,
    attackRange: 0,
    critChance: 0,
    critMultiplier: 0,
    abilityHaste: 0,
    lifeSteal: 0,
    spellVamp: 0,
    armorPenFlat: 0,
    armorPenPct: 0,
    magicPenFlat: 0,
    magicPenPct: 0,
    healShieldPower: 0,
  };
}
