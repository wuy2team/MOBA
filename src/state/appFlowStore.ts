import { create } from 'zustand';

/**
 * Màn hình của ứng dụng (ADR-07: điều hướng bằng state machine, không router URL).
 * Danh sách được mở rộng theo từng giai đoạn – xem docs/01 §2.
 */
export type AppScreen = 'mainMenu' | 'arena';

/** Các bước chuyển hợp lệ giữa màn hình. */
const TRANSITIONS: Readonly<Record<AppScreen, readonly AppScreen[]>> = {
  mainMenu: ['arena'],
  arena: ['mainMenu'],
};

interface AppFlowState {
  screen: AppScreen;
  /** Chuyển màn hình; trả về false nếu bước chuyển không hợp lệ. */
  goTo: (next: AppScreen) => boolean;
}

export function canTransition(from: AppScreen, to: AppScreen): boolean {
  return from === to || TRANSITIONS[from].includes(to);
}

export const useAppFlowStore = create<AppFlowState>()((set, get) => ({
  screen: 'mainMenu',
  goTo: (next) => {
    const current = get().screen;
    if (!canTransition(current, next)) {
      console.warn(`[appFlow] Bước chuyển không hợp lệ: ${current} → ${next}`);
      return false;
    }
    if (current !== next) set({ screen: next });
    return true;
  },
}));

/** Đưa ứng dụng về sảnh chính từ bất kỳ đâu (dùng khi phục hồi sau lỗi). */
export function resetToMainMenu(): void {
  useAppFlowStore.setState({ screen: 'mainMenu' });
}
