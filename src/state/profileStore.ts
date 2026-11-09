import { create } from 'zustand';
import { getHero } from '@/data/heroes';
import type { LifetimeStats } from '@/storage/schema';
import type { DefinitionId } from '@/shared/types/ids';
import type { Result } from '@/shared/utils/result';
import { initialSave } from './persistence';
import { validatePlayerName, type PlayerNameError } from './profileRules';

export type UnlockError = 'unknown_hero' | 'already_unlocked' | 'not_enough_honor';

interface ProfileState {
  playerName: string;
  createdAt: string;
  honorPoints: number;
  unlockedHeroes: readonly DefinitionId[];
  stats: LifetimeStats;
  rename: (name: string) => Result<string, PlayerNameError>;
  unlockHero: (heroId: DefinitionId) => Result<DefinitionId, UnlockError>;
}

export const useProfileStore = create<ProfileState>()((set, get) => ({
  playerName: initialSave.profile.playerName,
  createdAt: initialSave.profile.createdAt,
  honorPoints: initialSave.profile.honorPoints,
  unlockedHeroes: initialSave.unlockedHeroes,
  stats: initialSave.stats,

  rename: (name) => {
    const result = validatePlayerName(name);
    if (result.ok) set({ playerName: result.value });
    return result;
  },

  unlockHero: (heroId) => {
    const hero = getHero(heroId);
    if (!hero) return { ok: false, reason: 'unknown_hero' };
    const state = get();
    if (hero.unlock.byDefault || state.unlockedHeroes.includes(heroId)) {
      return { ok: false, reason: 'already_unlocked' };
    }
    if (state.honorPoints < hero.unlock.honorCost) return { ok: false, reason: 'not_enough_honor' };
    set({
      honorPoints: state.honorPoints - hero.unlock.honorCost,
      unlockedHeroes: [...state.unlockedHeroes, heroId],
    });
    return { ok: true, value: heroId };
  },
}));

/** Selector dùng chung: tướng đã được sở hữu chưa. */
export function selectIsUnlocked(heroId: DefinitionId) {
  return (state: Pick<ProfileState, 'unlockedHeroes'>) => state.unlockedHeroes.includes(heroId);
}
