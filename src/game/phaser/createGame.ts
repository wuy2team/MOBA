import * as Phaser from 'phaser';
import type { GameFactory, GameHandle } from '@/bridge/gameContracts';
import { ArenaPreviewScene } from './scenes/ArenaPreviewScene';
import { THEME } from './theme';

/**
 * Điểm vào của lớp Phaser (được `GameHost` tải lười để Main Menu không
 * phải tải Phaser). Trả về tay cầm hủy game an toàn, gọi nhiều lần không lỗi.
 */
export const createGame: GameFactory = ({ parent, events }) => {
  const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    backgroundColor: THEME.background,
    banner: false,
    // Âm thanh được bật ở Giai đoạn 13 (cần mở khóa AudioContext sau thao tác người dùng).
    audio: { noAudio: true },
    scale: {
      mode: Phaser.Scale.RESIZE,
      width: Math.max(1, parent.clientWidth),
      height: Math.max(1, parent.clientHeight),
    },
    render: {
      antialias: true,
      powerPreference: 'high-performance',
    },
    scene: [new ArenaPreviewScene(events)],
  });

  let destroyed = false;
  const handle: GameHandle = {
    destroy() {
      if (destroyed) return;
      destroyed = true;
      game.destroy(true);
    },
  };
  return handle;
};
