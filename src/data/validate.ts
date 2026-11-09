import { HERO_ROLES, SKILL_SLOTS, type HeroDefinition } from '@/data/types/hero';
import { isValidDefinitionId } from '@/shared/types/ids';
import { POSITIONS } from '@/shared/types/match';
import { STAT_KEYS } from '@/shared/types/stats';

/**
 * Kiểm tra toàn vẹn dữ liệu tướng. Trả về danh sách lỗi (rỗng = hợp lệ).
 * Chạy trong unit test và có thể chạy khi khởi động ở chế độ dev.
 */
export function validateHeroes(heroes: readonly HeroDefinition[]): string[] {
  const errors: string[] = [];
  const seen = new Set<string>();

  for (const hero of heroes) {
    const at = `[${hero.id}]`;
    if (!isValidDefinitionId(hero.id) || !hero.id.startsWith('hero.')) errors.push(`${at} id không hợp lệ`);
    if (seen.has(hero.id)) errors.push(`${at} id bị trùng`);
    seen.add(hero.id);

    if (hero.name.trim() === '') errors.push(`${at} thiếu tên`);
    if (!HERO_ROLES.includes(hero.role)) errors.push(`${at} vai trò không hợp lệ: ${hero.role}`);
    if (hero.positions.length === 0) errors.push(`${at} phải có ít nhất 1 vị trí`);
    for (const position of hero.positions) {
      if (!POSITIONS.includes(position)) errors.push(`${at} vị trí không hợp lệ: ${position}`);
    }

    for (const key of STAT_KEYS) {
      const value = hero.baseStats[key];
      if (!Number.isFinite(value) || value < 0) errors.push(`${at} chỉ số ${key} không hợp lệ: ${value}`);
    }
    for (const required of ['maxHp', 'attackDamage', 'moveSpeed', 'attackSpeed', 'attackRange'] as const) {
      if (hero.baseStats[required] <= 0) errors.push(`${at} chỉ số ${required} phải > 0`);
    }
    if (hero.resource === 'mana' && hero.baseStats.maxMana <= 0) {
      errors.push(`${at} dùng năng lượng nhưng maxMana = 0`);
    }
    for (const [key, value] of Object.entries(hero.growth)) {
      if (!Number.isFinite(value) || value < 0) errors.push(`${at} growth.${key} không hợp lệ: ${value}`);
    }
    if (hero.attackKind === 'melee' && hero.baseStats.attackRange > 250) {
      errors.push(`${at} tướng cận chiến có tầm đánh quá xa`);
    }
    if (hero.attackKind === 'ranged' && hero.baseStats.attackRange < 300) {
      errors.push(`${at} tướng đánh xa có tầm đánh quá gần`);
    }

    const texts = [hero.passive, ...SKILL_SLOTS.map((slot) => hero.skills[slot])];
    texts.forEach((text, index) => {
      const label = index === 0 ? 'nội tại' : `kỹ năng ${SKILL_SLOTS[index - 1]?.toUpperCase()}`;
      if (text.name.trim() === '' || text.description.trim() === '') errors.push(`${at} ${label} thiếu nội dung`);
      if (text.tags.length === 0) errors.push(`${at} ${label} thiếu nhãn`);
    });

    if (!hero.unlock.byDefault && !(hero.unlock.honorCost > 0)) {
      errors.push(`${at} tướng cần mở khóa phải có giá > 0`);
    }
  }
  return errors;
}
