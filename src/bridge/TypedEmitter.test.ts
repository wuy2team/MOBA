import { describe, expect, it, vi } from 'vitest';
import { TypedEmitter } from './TypedEmitter';

interface TestEvents {
  ping: { n: number };
  done: undefined;
}

describe('TypedEmitter', () => {
  it('phát payload tới listener đã đăng ký và hủy đăng ký được', () => {
    const emitter = new TypedEmitter<TestEvents>();
    const listener = vi.fn();
    const unsubscribe = emitter.on('ping', listener);
    emitter.emit('ping', { n: 1 });
    unsubscribe();
    emitter.emit('ping', { n: 2 });
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith({ n: 1 });
    expect(emitter.listenerCount()).toBe(0);
  });

  it('once chỉ gọi một lần', () => {
    const emitter = new TypedEmitter<TestEvents>();
    const listener = vi.fn();
    emitter.once('done', listener);
    emitter.emit('done', undefined);
    emitter.emit('done', undefined);
    expect(listener).toHaveBeenCalledTimes(1);
    expect(emitter.listenerCount('done')).toBe(0);
  });

  it('listener lỗi không chặn các listener khác', () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const emitter = new TypedEmitter<TestEvents>();
    const healthy = vi.fn();
    emitter.on('ping', () => {
      throw new Error('boom');
    });
    emitter.on('ping', healthy);
    emitter.emit('ping', { n: 3 });
    expect(healthy).toHaveBeenCalledWith({ n: 3 });
  });

  it('listener tự hủy trong lúc phát không làm bỏ sót listener khác', () => {
    const emitter = new TypedEmitter<TestEvents>();
    const second = vi.fn();
    const unsubscribeFirst = emitter.on('ping', () => unsubscribeFirst());
    emitter.on('ping', second);
    emitter.emit('ping', { n: 4 });
    expect(second).toHaveBeenCalledTimes(1);
    expect(emitter.listenerCount('ping')).toBe(1);
  });

  it('clear gỡ toàn bộ listener', () => {
    const emitter = new TypedEmitter<TestEvents>();
    emitter.on('ping', vi.fn());
    emitter.on('done', vi.fn());
    emitter.clear();
    expect(emitter.listenerCount()).toBe(0);
  });
});
