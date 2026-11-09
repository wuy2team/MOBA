/** Hai đội có thể điều khiển. Người chơi v1 luôn ở 'blue'. */
export type PlayableTeam = 'blue' | 'red';

/** Đội của mọi đơn vị, kể cả quái rừng trung lập. */
export type TeamId = PlayableTeam | 'neutral';

export type LaneId = 'top' | 'mid' | 'bot';

export const PLAYABLE_TEAMS: readonly PlayableTeam[] = ['blue', 'red'];
export const LANES: readonly LaneId[] = ['top', 'mid', 'bot'];

export function opposingTeam(team: PlayableTeam): PlayableTeam {
  return team === 'blue' ? 'red' : 'blue';
}

/** Hai đơn vị là kẻ địch khi khác đội; quái trung lập là địch của cả hai đội. */
export function areEnemies(a: TeamId, b: TeamId): boolean {
  return a !== b;
}
