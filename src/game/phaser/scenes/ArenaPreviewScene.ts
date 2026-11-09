import * as Phaser from 'phaser';
import type { UiEmitter } from '@/bridge/uiEvents';
import { IsoProjection } from '@/shared/math/iso';
import type { Vec2 } from '@/shared/types/geometry';
import { THEME } from '../theme';

/** Lưới thu nhỏ chỉ dùng cho bản xem trước (bản đồ thật 120×120 ở Giai đoạn 03). */
const PREVIEW_GRID = 16;
const iso = new IsoProjection({ tileWidth: 64, tileHeight: 32, cellSize: 1, gridSize: PREVIEW_GRID });

type PreviewTerrain = 'grass' | 'lane' | 'water' | 'baseBlue' | 'baseRed';

/**
 * Phân loại ô của bản xem trước theo đúng bố cục docs/03 §1.1:
 * căn cứ Xanh ở góc (0, N), Đỏ ở góc (N, 0), sông theo đường chéo x = y,
 * Mid theo đường chéo x + y = N − 1, Top/Bot chạy dọc mép.
 */
function terrainAt(col: number, row: number): PreviewTerrain {
  const last = PREVIEW_GRID - 1;
  if (col <= 2 && row >= last - 2) return 'baseBlue';
  if (col >= last - 2 && row <= 2) return 'baseRed';
  if (Math.abs(col - row) <= 1 && col > 2 && col < last - 2) return 'water';
  // Dải 3 ô quanh đường chéo – vẫn đối xứng tâm (col,row) ↔ (last−col, last−row).
  const onMid = Math.abs(col + row - last) <= 1;
  const onTop = col === 1 || row === 1;
  const onBot = col === last - 1 || row === last - 1;
  if (onMid || onTop || onBot) return 'lane';
  return 'grass';
}

function colorOf(terrain: PreviewTerrain, col: number, row: number): number {
  switch (terrain) {
    case 'baseBlue':
      return THEME.baseBlue;
    case 'baseRed':
      return THEME.baseRed;
    case 'water':
      return THEME.water;
    case 'lane':
      return THEME.lane;
    case 'grass':
      return (col + row) % 2 === 0 ? THEME.grassDark : THEME.grassLight;
  }
}

/**
 * Scene xem trước đấu trường: kiểm chứng tích hợp React ↔ Phaser và phép chiếu
 * isometric. Không chứa gameplay.
 */
export class ArenaPreviewScene extends Phaser.Scene {
  private diorama: Phaser.GameObjects.Container | null = null;

  constructor(private readonly uiEvents: UiEmitter) {
    super({ key: 'ArenaPreviewScene' });
  }

  create(): void {
    const container = this.add.container(0, 0);
    container.add(this.drawTiles());
    container.add(this.createCrystal(iso.gridToWorld(1, PREVIEW_GRID - 2), THEME.teamBlue));
    container.add(this.createCrystal(iso.gridToWorld(PREVIEW_GRID - 2, 1), THEME.teamRed));
    this.diorama = container;

    this.layout(this.scale.gameSize);
    this.scale.on(Phaser.Scale.Events.RESIZE, this.layout, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.handleShutdown, this);

    const renderer = this.game.renderer.type === Phaser.WEBGL ? 'webgl' : 'canvas';
    this.uiEvents.emit('game:ready', { renderer });
  }

  private drawTiles(): Phaser.GameObjects.Graphics {
    const g = this.add.graphics();
    const corner: Vec2 = { x: 0, y: 0 };
    const points: Phaser.Math.Vector2[] = [];
    // Vẽ theo tổng (col + row) tăng dần để ô phía trước đè lên ô phía sau.
    for (let sum = 0; sum <= 2 * (PREVIEW_GRID - 1); sum += 1) {
      for (let col = 0; col < PREVIEW_GRID; col += 1) {
        const row = sum - col;
        if (row < 0 || row >= PREVIEW_GRID) continue;
        points.length = 0;
        for (const [dx, dy] of [
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
        ] as const) {
          iso.worldToScreen(col + dx, row + dy, 0, corner);
          points.push(new Phaser.Math.Vector2(corner.x, corner.y));
        }
        g.fillStyle(colorOf(terrainAt(col, row), col, row), 1);
        g.fillPoints(points, true);
        g.lineStyle(1, THEME.tileStroke, 0.35);
        g.strokePoints(points, true);
      }
    }
    return g;
  }

  /** Pha lê căn cứ: thân hình thoi + quầng sáng nhấp nháy. */
  private createCrystal(world: Vec2, color: number): Phaser.GameObjects.Container {
    const screen = iso.worldToScreen(world.x, world.y);
    const crystal = this.add.container(screen.x, screen.y);

    const glow = this.add.ellipse(0, 0, 70, 35, color, 0.35);
    const outline = [
      new Phaser.Math.Vector2(0, -70),
      new Phaser.Math.Vector2(14, -38),
      new Phaser.Math.Vector2(0, -6),
      new Phaser.Math.Vector2(-14, -38),
    ];
    const body = this.add.graphics();
    body.fillStyle(color, 0.95);
    body.fillPoints(outline, true);
    body.lineStyle(2, THEME.gold, 1);
    body.strokePoints(outline, true);
    crystal.add([glow, body]);

    this.tweens.add({ targets: glow, alpha: 0.75, scale: 1.25, duration: 1400, yoyo: true, repeat: -1 });
    this.tweens.add({ targets: body, y: -6, duration: 1800, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    return crystal;
  }

  /** Căn giữa và co giãn diorama để vừa khung nhìn hiện tại. */
  private layout(gameSize: Phaser.Structs.Size): void {
    const container = this.diorama;
    if (!container) return;
    const { width, height } = gameSize;
    const margin = 0.82;
    const scale = Math.min((width * margin) / iso.screenWidth, (height * margin) / (iso.screenHeight + 80));
    container.setScale(Math.max(scale, 0.1));
    container.setPosition(
      width / 2 - (iso.screenWidth / 2) * container.scaleX,
      height / 2 - (iso.screenHeight / 2) * container.scaleY + 30 * container.scaleY,
    );
  }

  private handleShutdown(): void {
    this.scale.off(Phaser.Scale.Events.RESIZE, this.layout, this);
    this.diorama = null;
  }
}
