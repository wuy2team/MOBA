import { errorMessage } from '@/shared/utils/assert';
import { createLogger } from '@/shared/utils/logger';
import type { GameFactory, GameHandle } from './gameContracts';
import { TypedEmitter } from './TypedEmitter';
import type { UiEventMap } from './uiEvents';

const log = createLogger('GameHost');

export type GameHostStatus = 'idle' | 'loading' | 'running';

/**
 * Quản lý vòng đời DUY NHẤT một instance game (ADR-05, docs/01 §3.1).
 *
 * - `start()` khi đã có instance ⇒ hủy instance cũ trước.
 * - Mỗi lần start/stop tăng `generation`; kết quả `import()` trễ của một lần
 *   start đã bị hủy (React StrictMode mount → unmount → mount) sẽ bị bỏ qua.
 */
export class GameHost {
  readonly events = new TypedEmitter<UiEventMap>();

  private handle: GameHandle | null = null;
  private generation = 0;
  private status: GameHostStatus = 'idle';
  private createdCount = 0;

  constructor(private readonly loadFactory: () => Promise<GameFactory>) {}

  get currentStatus(): GameHostStatus {
    return this.status;
  }

  /** Số instance đang tồn tại (0 hoặc 1). */
  get activeInstances(): number {
    return this.handle === null ? 0 : 1;
  }

  /** Tổng số instance đã tạo từ đầu phiên – phục vụ kiểm tra rò rỉ. */
  get totalCreated(): number {
    return this.createdCount;
  }

  async start(parent: HTMLElement): Promise<void> {
    const generation = ++this.generation;
    this.destroyCurrent();
    this.status = 'loading';

    let factory: GameFactory;
    try {
      factory = await this.loadFactory();
    } catch (error) {
      if (generation === this.generation) {
        this.status = 'idle';
        this.reportFatal(`Không tải được mã trò chơi: ${errorMessage(error)}`);
      }
      return;
    }

    if (generation !== this.generation) return; // đã có stop()/start() mới hơn
    if (!parent.isConnected) {
      this.status = 'idle';
      return;
    }

    try {
      this.handle = factory({ parent, events: this.events });
      this.createdCount += 1;
      this.status = 'running';
    } catch (error) {
      this.handle = null;
      this.status = 'idle';
      this.reportFatal(`Không khởi tạo được trò chơi: ${errorMessage(error)}`);
    }
  }

  stop(): void {
    this.generation += 1;
    this.destroyCurrent();
    this.status = 'idle';
  }

  private destroyCurrent(): void {
    const current = this.handle;
    this.handle = null;
    if (current === null) return;
    try {
      current.destroy();
    } catch (error) {
      log.error('Lỗi khi hủy game', error);
    }
  }

  private reportFatal(message: string): void {
    log.error(message);
    this.events.emit('fatal', { message });
  }
}

/** Instance dùng chung của ứng dụng. Phaser chỉ được tải khi `start()` lần đầu. */
export const gameHost = new GameHost(() =>
  import('@/game/phaser/createGame').then((module) => module.createGame),
);
