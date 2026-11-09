/** Điểm/vector 2D trong không gian world (Descartes, không phải isometric). */
export interface Vec2 {
  x: number;
  y: number;
}

/** Đa giác khép kín, các đỉnh theo thứ tự. */
export type Polygon = readonly Vec2[];

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}
