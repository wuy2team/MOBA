import type { HTMLAttributes } from 'react';

/** Khung nền tối viền vàng mảnh – dùng cho hộp thoại và bảng thông tin. */
export function Panel({ className = '', children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={
        'relative rounded-xl border border-gold-500/35 bg-night-900/85 p-6 shadow-2xl backdrop-blur-md ' +
        'before:pointer-events-none before:absolute before:inset-1 before:rounded-lg before:border ' +
        `before:border-arcane-500/20 ${className}`
      }
      {...rest}
    >
      {children}
    </div>
  );
}
