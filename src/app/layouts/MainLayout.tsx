import type { ReactNode } from 'react';
import { Backdrop } from '@/ui/components/Backdrop';

/** Khung chung toàn ứng dụng: nền huyền ảo + vùng nội dung toàn màn hình. */
export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-night-950 text-[#e9e6f7]">
      <Backdrop />
      <main className="relative z-10 h-full w-full">{children}</main>
    </div>
  );
}
