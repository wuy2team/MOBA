import type { Vec2 } from '@/shared/types/geometry';

/**
 * Phép chiếu giữa không gian world (Descartes, nơi chạy toàn bộ logic) và
 * không gian màn hình isometric (chỉ để hiển thị). Xem docs/01 §6.
 *
 * Với tile 128×64 và cellSize 64:
 *   sx = (x − y) + offsetX,  sy = (x + y) / 2 − z
 */
export interface IsoConfig {
  /** Chiều rộng hình thoi của 1 tile trên màn hình (px). */
  tileWidth: number;
  /** Chiều cao hình thoi của 1 tile trên màn hình (px). */
  tileHeight: number;
  /** Kích thước cạnh 1 ô trong world (đơn vị). */
  cellSize: number;
  /** Số ô mỗi cạnh của lưới vuông. */
  gridSize: number;
}

export class IsoProjection {
  readonly worldSize: number;
  /** Dịch ngang để mọi tọa độ màn hình ≥ 0. */
  readonly offsetX: number;
  /** Kích thước khung chữ nhật bao toàn bản đồ trên màn hình. */
  readonly screenWidth: number;
  readonly screenHeight: number;

  private readonly kx: number;
  private readonly ky: number;

  constructor(readonly config: IsoConfig) {
    const { tileWidth, tileHeight, cellSize, gridSize } = config;
    if (tileWidth <= 0 || tileHeight <= 0 || cellSize <= 0 || gridSize <= 0) {
      throw new RangeError('IsoConfig phải có mọi kích thước > 0');
    }
    this.kx = tileWidth / 2 / cellSize;
    this.ky = tileHeight / 2 / cellSize;
    this.worldSize = gridSize * cellSize;
    this.offsetX = this.worldSize * this.kx;
    this.screenWidth = 2 * this.offsetX;
    this.screenHeight = 2 * this.worldSize * this.ky;
  }

  /** world → màn hình. `z` là độ cao (đạn bay, nhảy), làm điểm vẽ nhô lên. */
  worldToScreen(x: number, y: number, z = 0, out: Vec2 = { x: 0, y: 0 }): Vec2 {
    out.x = (x - y) * this.kx + this.offsetX;
    out.y = (x + y) * this.ky - z;
    return out;
  }

  /** màn hình → world (mặt đất, z = 0). Dùng cho chuột/click-to-move. */
  screenToWorld(sx: number, sy: number, out: Vec2 = { x: 0, y: 0 }): Vec2 {
    const a = (sx - this.offsetX) / this.kx; // = x − y
    const b = sy / this.ky; // = x + y
    out.x = (a + b) / 2;
    out.y = (b - a) / 2;
    return out;
  }

  /** Tâm của ô lưới (col, row) trong world. */
  gridToWorld(col: number, row: number, out: Vec2 = { x: 0, y: 0 }): Vec2 {
    const { cellSize } = this.config;
    out.x = (col + 0.5) * cellSize;
    out.y = (row + 0.5) * cellSize;
    return out;
  }

  /** Ô lưới chứa điểm world (có thể nằm ngoài lưới – người gọi tự kiểm tra). */
  worldToGrid(x: number, y: number, out: Vec2 = { x: 0, y: 0 }): Vec2 {
    const { cellSize } = this.config;
    out.x = Math.floor(x / cellSize);
    out.y = Math.floor(y / cellSize);
    return out;
  }

  /** Độ sâu vẽ theo điểm chân: vật ở "phía trước" (gần người xem) có depth lớn hơn. */
  depthOf(x: number, y: number): number {
    return (x + y) * this.ky;
  }

  isInsideWorld(x: number, y: number): boolean {
    return x >= 0 && y >= 0 && x <= this.worldSize && y <= this.worldSize;
  }
}
