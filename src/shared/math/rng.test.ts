import { describe, expect, it } from 'vitest';
import { Rng } from './rng';

describe('Rng', () => {
  it('cùng seed cho cùng chuỗi số', () => {
    const a = new Rng(42);
    const b = new Rng(42);
    for (let i = 0; i < 50; i += 1) expect(a.next()).toBe(b.next());
  });

  it('khác seed cho chuỗi khác nhau', () => {
    expect(new Rng(1).next()).not.toBe(new Rng(2).next());
  });

  it('next luôn trong [0, 1) và int trong [min, max]', () => {
    const rng = new Rng(7);
    for (let i = 0; i < 2000; i += 1) {
      const f = rng.next();
      expect(f).toBeGreaterThanOrEqual(0);
      expect(f).toBeLessThan(1);
      const n = rng.int(3, 5);
      expect(n).toBeGreaterThanOrEqual(3);
      expect(n).toBeLessThanOrEqual(5);
    }
  });

  it('shuffle giữ nguyên phần tử và không sửa mảng gốc', () => {
    const source = [1, 2, 3, 4, 5, 6];
    const shuffled = new Rng(9).shuffle(source);
    expect([...shuffled].sort()).toEqual(source);
    expect(source).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('int từ chối khoảng không hợp lệ', () => {
    expect(() => new Rng(1).int(5, 3)).toThrow(RangeError);
  });
});
