import { describe, expect, it, vi } from 'vitest';
import type { GameFactory, GameHandle } from './gameContracts';
import { GameHost } from './GameHost';

/** Phần tử giả tối thiểu: GameHost chỉ đọc `isConnected`. */
function fakeParent(connected = true): HTMLElement {
  return { isConnected: connected } as unknown as HTMLElement;
}

function createTrackingFactory() {
  const handles: { destroyed: boolean }[] = [];
  const factory: GameFactory = () => {
    const record = { destroyed: false };
    handles.push(record);
    const handle: GameHandle = {
      destroy: () => {
        record.destroyed = true;
      },
    };
    return handle;
  };
  const alive = () => handles.filter((h) => !h.destroyed).length;
  return { factory, handles, alive };
}

describe('GameHost', () => {
  it('start rồi stop: tạo đúng 1 instance và hủy nó', async () => {
    const t = createTrackingFactory();
    const host = new GameHost(() => Promise.resolve(t.factory));
    await host.start(fakeParent());
    expect(host.activeInstances).toBe(1);
    expect(host.currentStatus).toBe('running');
    host.stop();
    expect(host.activeInstances).toBe(0);
    expect(t.alive()).toBe(0);
    expect(host.currentStatus).toBe('idle');
  });

  it('mô phỏng React StrictMode (start → stop → start đồng thời) chỉ tạo 1 instance', async () => {
    const t = createTrackingFactory();
    const host = new GameHost(() => Promise.resolve(t.factory));
    const first = host.start(fakeParent());
    host.stop();
    const second = host.start(fakeParent());
    await Promise.all([first, second]);
    expect(t.handles).toHaveLength(1);
    expect(t.alive()).toBe(1);
    expect(host.activeInstances).toBe(1);
  });

  it('start lần hai khi đang chạy sẽ hủy instance cũ', async () => {
    const t = createTrackingFactory();
    const host = new GameHost(() => Promise.resolve(t.factory));
    await host.start(fakeParent());
    await host.start(fakeParent());
    expect(t.handles).toHaveLength(2);
    expect(t.alive()).toBe(1);
  });

  it('lặp 10 lần vào/ra không để lại instance nào', async () => {
    const t = createTrackingFactory();
    const host = new GameHost(() => Promise.resolve(t.factory));
    for (let i = 0; i < 10; i += 1) {
      await host.start(fakeParent());
      host.stop();
    }
    expect(t.alive()).toBe(0);
    expect(host.totalCreated).toBe(10);
  });

  it('không tạo game nếu phần tử cha đã bị gỡ khỏi DOM', async () => {
    const t = createTrackingFactory();
    const host = new GameHost(() => Promise.resolve(t.factory));
    await host.start(fakeParent(false));
    expect(t.handles).toHaveLength(0);
    expect(host.currentStatus).toBe('idle');
  });

  it('phát sự kiện fatal khi tải mã game thất bại', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const host = new GameHost(() => Promise.reject(new Error('network down')));
    const onFatal = vi.fn();
    host.events.on('fatal', onFatal);
    await host.start(fakeParent());
    expect(onFatal).toHaveBeenCalledWith({ message: expect.stringContaining('network down') });
    expect(host.activeInstances).toBe(0);
  });

  it('phát sự kiện fatal khi hàm tạo game ném lỗi', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const host = new GameHost(() =>
      Promise.resolve<GameFactory>(() => {
        throw new Error('WebGL unavailable');
      }),
    );
    const onFatal = vi.fn();
    host.events.on('fatal', onFatal);
    await host.start(fakeParent());
    expect(onFatal).toHaveBeenCalledWith({ message: expect.stringContaining('WebGL unavailable') });
    expect(host.currentStatus).toBe('idle');
  });

  it('bỏ qua lỗi tải của lần start đã bị hủy', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    let rejectLoad: (reason: Error) => void = () => undefined;
    const host = new GameHost(
      () =>
        new Promise<GameFactory>((_, reject) => {
          rejectLoad = reject;
        }),
    );
    const onFatal = vi.fn();
    host.events.on('fatal', onFatal);
    const pending = host.start(fakeParent());
    host.stop();
    rejectLoad(new Error('late failure'));
    await pending;
    expect(onFatal).not.toHaveBeenCalled();
  });
});
