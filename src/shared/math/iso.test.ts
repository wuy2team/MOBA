import { describe, expect, it } from 'vitest';
import { IsoProjection } from './iso';

const iso = new IsoProjection({ tileWidth: 128, tileHeight: 64, cellSize: 64, gridSize: 120 });

describe('IsoProjection', () => {
  it('tính kích thước world và màn hình đúng như docs/01 §6.2', () => {
    expect(iso.worldSize).toBe(7680);
    expect(iso.offsetX).toBe(7680);
    expect(iso.screenWidth).toBe(15360);
    expect(iso.screenHeight).toBe(7680);
  });

  it('chiếu 4 góc bản đồ thành hình thoi: (0,0) trên, (W,0) phải, (W,W) dưới, (0,W) trái', () => {
    const W = iso.worldSize;
    expect(iso.worldToScreen(0, 0)).toEqual({ x: 7680, y: 0 });
    expect(iso.worldToScreen(W, 0)).toEqual({ x: 15360, y: 3840 });
    expect(iso.worldToScreen(W, W)).toEqual({ x: 7680, y: 7680 });
    expect(iso.worldToScreen(0, W)).toEqual({ x: 0, y: 3840 });
  });

  it('round-trip screenToWorld(worldToScreen(p)) ≈ p', () => {
    const samples = [
      [0, 0],
      [123.4, 987.6],
      [7680, 7680],
      [4000.25, 12.5],
      [55, 7000],
    ] as const;
    for (const [x, y] of samples) {
      const s = iso.worldToScreen(x, y);
      const w = iso.screenToWorld(s.x, s.y);
      expect(Math.abs(w.x - x)).toBeLessThan(1e-3);
      expect(Math.abs(w.y - y)).toBeLessThan(1e-3);
    }
  });

  it('độ cao z làm điểm vẽ nhô lên trên', () => {
    const ground = iso.worldToScreen(100, 100);
    const raised = iso.worldToScreen(100, 100, 40);
    expect(raised.x).toBe(ground.x);
    expect(raised.y).toBe(ground.y - 40);
  });

  it('chuyển đổi lưới ↔ world', () => {
    expect(iso.gridToWorld(0, 0)).toEqual({ x: 32, y: 32 });
    expect(iso.worldToGrid(32, 32)).toEqual({ x: 0, y: 0 });
    expect(iso.worldToGrid(7679, 64)).toEqual({ x: 119, y: 1 });
  });

  it('depth tăng khi đi về phía người xem', () => {
    expect(iso.depthOf(10, 10)).toBeLessThan(iso.depthOf(20, 20));
  });

  it('từ chối cấu hình kích thước không hợp lệ', () => {
    expect(() => new IsoProjection({ tileWidth: 0, tileHeight: 64, cellSize: 64, gridSize: 120 })).toThrow(
      RangeError,
    );
  });
});
