import { describe, expect, it } from 'vitest';
import { Rng } from '@/shared/math/rng';
import { POSITIONS, type Position } from '@/shared/types/match';
import { draftTeams, type DraftCandidate } from './draft';

const ROSTER: DraftCandidate[] = [
  { id: 'hero.a', positions: ['top'] },
  { id: 'hero.b', positions: ['jungle', 'top'] },
  { id: 'hero.c', positions: ['mid'] },
  { id: 'hero.d', positions: ['mid', 'support'] },
  { id: 'hero.e', positions: ['carry'] },
  { id: 'hero.f', positions: ['carry'] },
  { id: 'hero.g', positions: ['top', 'jungle'] },
  { id: 'hero.h', positions: ['support', 'top'] },
  { id: 'hero.i', positions: ['jungle', 'mid'] },
  { id: 'hero.j', positions: ['support'] },
];

function positionsOf(slots: readonly { team: string; position: Position }[], team: string): Position[] {
  return slots
    .filter((s) => s.team === team)
    .map((s) => s.position)
    .sort();
}

describe('draftTeams', () => {
  it('tạo đủ 10 vị trí, mỗi đội đủ 5 vị trí khác nhau, không trùng tướng', () => {
    for (let seed = 1; seed <= 30; seed += 1) {
      for (const hero of ROSTER) {
        const position = hero.positions[0] as Position;
        const result = draftTeams(
          { candidates: ROSTER, playerHeroId: hero.id, playerPosition: position, playerTeam: 'blue' },
          new Rng(seed),
        );
        expect(result.ok).toBe(true);
        if (!result.ok) continue;
        expect(result.slots).toHaveLength(10);
        expect(new Set(result.slots.map((s) => s.heroId)).size).toBe(10);
        expect(positionsOf(result.slots, 'blue')).toEqual([...POSITIONS].sort());
        expect(positionsOf(result.slots, 'red')).toEqual([...POSITIONS].sort());
        expect(result.slots[0]).toEqual({ team: 'blue', position, heroId: hero.id });
      }
    }
  });

  it('cùng seed cho cùng kết quả', () => {
    const request = {
      candidates: ROSTER,
      playerHeroId: 'hero.c',
      playerPosition: 'mid' as const,
      playerTeam: 'blue' as const,
    };
    expect(draftTeams(request, new Rng(5))).toEqual(draftTeams(request, new Rng(5)));
  });

  it('ưu tiên xếp tướng đúng vị trí khi có thể', () => {
    const result = draftTeams(
      { candidates: ROSTER, playerHeroId: 'hero.e', playerPosition: 'carry', playerTeam: 'blue' },
      new Rng(3),
    );
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    for (const slot of result.slots) {
      const hero = ROSTER.find((c) => c.id === slot.heroId);
      expect(hero?.positions).toContain(slot.position);
    }
  });

  it('vẫn xếp đủ khi vị trí ưu tiên không khớp được (điền tướng bất kỳ)', () => {
    const allSupports: DraftCandidate[] = ROSTER.map((c) => ({ id: c.id, positions: ['support'] }));
    const result = draftTeams(
      { candidates: allSupports, playerHeroId: 'hero.a', playerPosition: 'support', playerTeam: 'blue' },
      new Rng(1),
    );
    expect(result.ok).toBe(true);
    if (result.ok) expect(new Set(result.slots.map((s) => s.heroId)).size).toBe(10);
  });

  it('báo lỗi khi tướng người chơi không tồn tại hoặc thiếu tướng', () => {
    expect(
      draftTeams(
        { candidates: ROSTER, playerHeroId: 'hero.zzz', playerPosition: 'mid', playerTeam: 'blue' },
        new Rng(1),
      ),
    ).toEqual({ ok: false, reason: 'unknown_player_hero' });
    expect(
      draftTeams(
        { candidates: ROSTER.slice(0, 5), playerHeroId: 'hero.a', playerPosition: 'top', playerTeam: 'blue' },
        new Rng(1),
      ),
    ).toEqual({ ok: false, reason: 'not_enough_heroes' });
  });
});
