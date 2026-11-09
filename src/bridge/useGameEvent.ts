import { useEffect, useEffectEvent } from 'react';
import { gameHost } from './GameHost';
import type { UiEventMap, UiEventName } from './uiEvents';

/**
 * Đăng ký một sự kiện Game → UI trong vòng đời component.
 * Handler luôn đọc props/state mới nhất mà không phải đăng ký lại.
 */
export function useGameEvent<K extends UiEventName>(
  event: K,
  handler: (payload: UiEventMap[K]) => void,
): void {
  const onEvent = useEffectEvent(handler);
  useEffect(() => gameHost.events.on(event, (payload) => onEvent(payload)), [event]);
}
