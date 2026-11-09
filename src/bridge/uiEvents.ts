import type { TypedEmitter } from './TypedEmitter';

/**
 * Hợp đồng sự kiện Game → UI (kênh K4, docs/01 §4).
 * Mở rộng ở từng giai đoạn khi hệ thống tương ứng được xây dựng.
 */
export interface UiEventMap {
  /** Scene chính đã sẵn sàng hiển thị. */
  'game:ready': { renderer: 'webgl' | 'canvas' };
  /** Lỗi nghiêm trọng không thể tiếp tục (khởi tạo thất bại, scene lỗi…). */
  fatal: { message: string };
}

export type UiEventName = keyof UiEventMap & string;
export type UiEmitter = TypedEmitter<UiEventMap>;
