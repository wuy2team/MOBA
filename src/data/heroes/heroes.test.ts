import { describe, expect, it } from 'vitest';
import { validateHeroes } from '@/data/validate';
import { Rng } from '@/shared/math/rng';
import { draftTeams } from '@/shared/rules/draft';
import type { HeroDefinition } from '@/data/types/hero';
import { DEFAULT_UNLOCKED_HEROES, getHero, HEROES, heroesByRole } from './index';
import { thorne } from './thorne';

describe('Dữ liệu tướng', () => {
  it('10 tướng hợp lệ, không lỗi toàn vẹn', () => {
    expect(HEROES).toHaveLength(10);
    expect(validateHeroes(HEROES)).toEqual([]);
  });

  it('phân bổ vai trò đúng thiết kế: Fighter 2, Mage 2, Marksman 2, Tank 2, Assassin 1, Support 1', () => {
    const count = (role: string) => HEROES.filter((h) => h.role === role).length;
    expect(count('fighter')).toBe(2);
    expect(count('mage')).toBe(2);
    expect(count('marksman')).toBe(2);
    expect(count('tank')).toBe(2);
    expect(count('assassin')).toBe(1);
    expect(count('support')).toBe(1);
  });

  it('mở khóa sẵn 6 tướng, mỗi vai trò 1 tướng', () => {
    expect(DEFAULT_UNLOCKED_HEROES).toHaveLength(6);
    const roles = new Set(DEFAULT_UNLOCKED_HEROES.map((id) => getHero(id)?.role));
    expect(roles.size).toBe(6);
  });

  it('tra cứu theo id và vai trò (bao gồm vai trò phụ)', () => {
    expect(getHero('hero.thorne')?.name).toBe('Thorne');
    expect(getHero('hero.khong_ton_tai')).toBeUndefined();
    expect(heroesByRole('support').map((h) => h.id)).toEqual(
      expect.arrayContaining(['hero.elowen', 'hero.selvane', 'hero.haldor']),
    );
  });

  it('phát hiện dữ liệu hỏng: id trùng, chỉ số âm, thiếu mô tả kỹ năng, giá mở khóa sai', () => {
    const broken: HeroDefinition = {
      ...thorne,
      baseStats: { ...thorne.baseStats, armor: -5 },
      skills: { ...thorne.skills, q: { name: 'X', description: '', tags: [] } },
      unlock: { byDefault: false, honorCost: 0 },
    };
    const errors = validateHeroes([thorne, broken]);
    expect(errors.some((e) => e.includes('trùng'))).toBe(true);
    expect(errors.some((e) => e.includes('armor'))).toBe(true);
    expect(errors.some((e) => e.includes('kỹ năng Q'))).toBe(true);
    expect(errors.some((e) => e.includes('giá'))).toBe(true);
  });

  it('thêm tướng thứ 11 chỉ bằng dữ liệu vẫn hợp lệ', () => {
    const extra: HeroDefinition = { ...thorne, id: 'hero.thorne_clone', name: 'Bản sao' };
    expect(validateHeroes([...HEROES, extra])).toEqual([]);
  });

  it('với roster thật, mọi lựa chọn tướng + vị trí đều chia được 2 đội đủ 5 vị trí', () => {
    const candidates = HEROES.map((h) => ({ id: h.id, positions: h.positions }));
    for (const hero of HEROES) {
      for (const position of hero.positions) {
        for (let seed = 1; seed <= 10; seed += 1) {
          const result = draftTeams(
            { candidates, playerHeroId: hero.id, playerPosition: position, playerTeam: 'blue' },
            new Rng(seed),
          );
          expect(result.ok).toBe(true);
          if (result.ok) expect(new Set(result.slots.map((s) => s.heroId)).size).toBe(10);
        }
      }
    }
  });
});
