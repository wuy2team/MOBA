import { beforeEach, describe, expect, it, vi } from 'vitest';
import { canTransition, resetToMainMenu, useAppFlowStore } from './appFlowStore';

describe('appFlowStore', () => {
  beforeEach(() => resetToMainMenu());

  it('bắt đầu ở Main Menu', () => {
    expect(useAppFlowStore.getState().screen).toBe('mainMenu');
  });

  it('chuyển Main Menu → Đấu trường → Main Menu', () => {
    expect(useAppFlowStore.getState().goTo('arena')).toBe(true);
    expect(useAppFlowStore.getState().screen).toBe('arena');
    expect(useAppFlowStore.getState().goTo('mainMenu')).toBe(true);
    expect(useAppFlowStore.getState().screen).toBe('mainMenu');
  });

  it('chuyển về chính màn hiện tại là hợp lệ và không đổi state', () => {
    expect(canTransition('arena', 'arena')).toBe(true);
    expect(useAppFlowStore.getState().goTo('mainMenu')).toBe(true);
  });

  it('resetToMainMenu luôn đưa về sảnh chính', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    useAppFlowStore.getState().goTo('arena');
    resetToMainMenu();
    expect(useAppFlowStore.getState().screen).toBe('mainMenu');
  });
});
