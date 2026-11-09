import { createLogger } from '@/shared/utils/logger';

/** Ràng buộc cho bản đồ sự kiện: tên sự kiện → kiểu payload. */
export type EventMap<T> = { [K in keyof T]: unknown };
export type Listener<P> = (payload: P) => void;
/** Gọi để hủy đăng ký. */
export type Unsubscribe = () => void;

const log = createLogger('TypedEmitter');

/**
 * Emitter đồng bộ có kiểu chặt chẽ cho kênh sự kiện Game → UI.
 * Một listener ném lỗi không làm hỏng các listener còn lại.
 */
export class TypedEmitter<Events extends EventMap<Events>> {
  private readonly listeners = new Map<keyof Events, Set<Listener<never>>>();

  on<K extends keyof Events>(event: K, listener: Listener<Events[K]>): Unsubscribe {
    let set = this.listeners.get(event);
    if (!set) {
      set = new Set();
      this.listeners.set(event, set);
    }
    set.add(listener as Listener<never>);
    return () => this.off(event, listener);
  }

  once<K extends keyof Events>(event: K, listener: Listener<Events[K]>): Unsubscribe {
    const wrapper: Listener<Events[K]> = (payload) => {
      this.off(event, wrapper);
      listener(payload);
    };
    return this.on(event, wrapper);
  }

  off<K extends keyof Events>(event: K, listener: Listener<Events[K]>): void {
    const set = this.listeners.get(event);
    if (!set) return;
    set.delete(listener as Listener<never>);
    if (set.size === 0) this.listeners.delete(event);
  }

  emit<K extends keyof Events>(event: K, payload: Events[K]): void {
    const set = this.listeners.get(event);
    if (!set) return;
    // Sao chép để listener tự hủy đăng ký trong lúc phát không làm lệch vòng lặp.
    for (const listener of [...set]) {
      try {
        (listener as Listener<Events[K]>)(payload);
      } catch (error) {
        log.error(`Listener của sự kiện "${String(event)}" bị lỗi`, error);
      }
    }
  }

  listenerCount(event?: keyof Events): number {
    if (event !== undefined) return this.listeners.get(event)?.size ?? 0;
    let total = 0;
    for (const set of this.listeners.values()) total += set.size;
    return total;
  }

  clear(): void {
    this.listeners.clear();
  }
}
