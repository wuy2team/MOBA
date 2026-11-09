import type { UiEmitter } from './uiEvents';

/** Tay cầm tới một instance game đang chạy, do lớp Phaser trả về. */
export interface GameHandle {
  /** Hủy game, gỡ canvas, giải phóng tài nguyên. Gọi nhiều lần không lỗi. */
  destroy(): void;
}

export interface GameStartOptions {
  parent: HTMLElement;
  events: UiEmitter;
}

/** Hàm tạo game – hiện thực ở `src/game/phaser/createGame.ts`, tải lười. */
export type GameFactory = (options: GameStartOptions) => GameHandle;
