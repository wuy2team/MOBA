import type { Rng } from '@/shared/math/rng';
import type { DefinitionId } from '@/shared/types/ids';
import { POSITIONS, type Position } from '@/shared/types/match';
import type { PlayableTeam } from '@/shared/types/team';

export interface DraftCandidate {
  id: DefinitionId;
  positions: readonly Position[];
}

export interface DraftSlot {
  team: PlayableTeam;
  position: Position;
  heroId: DefinitionId;
}

export interface DraftRequest {
  candidates: readonly DraftCandidate[];
  playerHeroId: DefinitionId;
  playerPosition: Position;
  playerTeam: PlayableTeam;
}

export type DraftFailure = 'unknown_player_hero' | 'not_enough_heroes';

export type DraftResult = { ok: true; slots: readonly DraftSlot[] } | { ok: false; reason: DraftFailure };

interface OpenSlot {
  team: PlayableTeam;
  position: Position;
}

/**
 * Chia các tướng còn lại cho 9 vị trí trống (4 đồng minh + 5 đối thủ),
 * ưu tiên tướng hợp vị trí. Nếu không thể xếp đủ theo vị trí ưu tiên
 * (ví dụ thừa tướng hỗ trợ), các vị trí còn lại nhận tướng bất kỳ.
 * Tất định theo `rng`.
 */
export function draftTeams(request: DraftRequest, rng: Rng): DraftResult {
  const { candidates, playerHeroId, playerPosition, playerTeam } = request;
  if (!candidates.some((c) => c.id === playerHeroId)) return { ok: false, reason: 'unknown_player_hero' };

  const opponents: PlayableTeam = playerTeam === 'blue' ? 'red' : 'blue';
  const open: OpenSlot[] = [
    ...POSITIONS.filter((p) => p !== playerPosition).map((position) => ({ team: playerTeam, position })),
    ...POSITIONS.map((position) => ({ team: opponents, position })),
  ];
  const pool = rng.shuffle(candidates.filter((c) => c.id !== playerHeroId));
  if (pool.length < open.length) return { ok: false, reason: 'not_enough_heroes' };

  const assignment = new Array<DraftCandidate | null>(open.length).fill(null);
  const used = new Set<DefinitionId>();

  // Lượt 1: xếp đúng vị trí ưu tiên bằng quay lui (tối đa 9 vị trí nên rất nhanh).
  const fits = (slotIndex: number, candidate: DraftCandidate): boolean => {
    const slot = open[slotIndex];
    return slot !== undefined && candidate.positions.includes(slot.position);
  };
  const solveStrict = (slotIndex: number): boolean => {
    if (slotIndex === open.length) return true;
    for (const candidate of pool) {
      if (used.has(candidate.id) || !fits(slotIndex, candidate)) continue;
      used.add(candidate.id);
      assignment[slotIndex] = candidate;
      if (solveStrict(slotIndex + 1)) return true;
      used.delete(candidate.id);
      assignment[slotIndex] = null;
    }
    return false;
  };

  if (!solveStrict(0)) {
    // Lượt 2: xếp tham lam theo vị trí hợp nhất trước, phần còn lại điền tướng bất kỳ.
    used.clear();
    assignment.fill(null);
    open.forEach((_, index) => {
      const match = pool.find((c) => !used.has(c.id) && fits(index, c));
      if (match) {
        used.add(match.id);
        assignment[index] = match;
      }
    });
    open.forEach((_, index) => {
      if (assignment[index] !== null) return;
      const any = pool.find((c) => !used.has(c.id));
      if (any) {
        used.add(any.id);
        assignment[index] = any;
      }
    });
  }

  const slots: DraftSlot[] = [{ team: playerTeam, position: playerPosition, heroId: playerHeroId }];
  open.forEach((slot, index) => {
    const hero = assignment[index];
    if (hero) slots.push({ team: slot.team, position: slot.position, heroId: hero.id });
  });
  return slots.length === POSITIONS.length * 2 ? { ok: true, slots } : { ok: false, reason: 'not_enough_heroes' };
}
