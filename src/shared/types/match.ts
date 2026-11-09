import type { DefinitionId } from './ids';
import type { PlayableTeam } from './team';

/** Vị trí trong đội hình 5 người. */
export type Position = 'top' | 'jungle' | 'mid' | 'carry' | 'support';

export const POSITIONS: readonly Position[] = ['top', 'jungle', 'mid', 'carry', 'support'];

export type Difficulty = 'easy' | 'normal' | 'hard';

export const DIFFICULTIES: readonly Difficulty[] = ['easy', 'normal', 'hard'];

export interface SlotSetup {
  heroId: DefinitionId;
  controller: 'player' | 'ai';
  position: Position;
  displayName: string;
}

/** Thiết lập trận, tạo ở màn Chọn tướng và không đổi trong suốt trận (docs/02 §7.9). */
export interface MatchSetup {
  seed: number;
  mapId: DefinitionId;
  difficulty: Difficulty;
  playerTeam: PlayableTeam;
  teams: Readonly<Record<PlayableTeam, readonly SlotSetup[]>>;
}
