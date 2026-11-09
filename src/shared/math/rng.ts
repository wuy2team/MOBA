/**
 * Bộ sinh số ngẫu nhiên có seed (Mulberry32) – cùng seed cho cùng chuỗi số.
 * Dùng cho mọi thứ cần tất định: chia đội, mô phỏng trận, test.
 */
export class Rng {
  private state: number;

  constructor(seed: number) {
    this.state = seed >>> 0;
  }

  /** Số thực trong [0, 1). */
  next(): number {
    this.state = (this.state + 0x6d2b79f5) >>> 0;
    let t = this.state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  /** Số nguyên trong [min, max] (bao gồm hai đầu). */
  int(min: number, max: number): number {
    if (max < min) throw new RangeError(`Rng.int: max (${max}) < min (${min})`);
    return min + Math.floor(this.next() * (max - min + 1));
  }

  /** Trả về bản sao đã xáo trộn (Fisher–Yates), không sửa mảng gốc. */
  shuffle<T>(items: readonly T[]): T[] {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(this.next() * (i + 1));
      const a = result[i] as T;
      result[i] = result[j] as T;
      result[j] = a;
    }
    return result;
  }

  /** Tạo luồng con độc lập (để thêm/bớt hệ thống không làm lệch luồng khác). */
  fork(): Rng {
    return new Rng(Math.floor(this.next() * 4294967296));
  }
}
