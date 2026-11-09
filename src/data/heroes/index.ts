import type { HeroDefinition, HeroRole } from '@/data/types/hero';
import type { DefinitionId } from '@/shared/types/ids';
import { arwyn } from './arwyn';
import { brakka } from './brakka';
import { elowen } from './elowen';
import { gorvak } from './gorvak';
import { haldor } from './haldor';
import { ignara } from './ignara';
import { quillon } from './quillon';
import { selvane } from './selvane';
import { thorne } from './thorne';
import { zerith } from './zerith';

/**
 * Danh sách tướng. Thêm tướng mới = tạo file dữ liệu + thêm vào mảng này;
 * `validateHeroes` (src/data/validate.ts) kiểm tra toàn vẹn.
 */
export const HEROES: readonly HeroDefinition[] = [
  thorne,
  brakka,
  ignara,
  selvane,
  arwyn,
  quillon,
  gorvak,
  haldor,
  zerith,
  elowen,
];

const HERO_BY_ID: ReadonlyMap<DefinitionId, HeroDefinition> = new Map(HEROES.map((hero) => [hero.id, hero]));

export function getHero(id: DefinitionId): HeroDefinition | undefined {
  return HERO_BY_ID.get(id);
}

export function heroesByRole(role: HeroRole): readonly HeroDefinition[] {
  return HEROES.filter((hero) => hero.role === role || hero.secondaryRole === role);
}

/** Tướng được sở hữu sẵn khi tạo hồ sơ mới. */
export const DEFAULT_UNLOCKED_HEROES: readonly DefinitionId[] = HEROES.filter(
  (hero) => hero.unlock.byDefault,
).map((hero) => hero.id);
