import { useAppFlowStore } from '@/state/appFlowStore';
import { Button } from '@/ui/components/Button';
import { Logo } from '@/ui/components/Logo';
import { vi } from '@/ui/i18n/vi';

/**
 * Sảnh chính. Giai đoạn 01 chỉ hiển thị chức năng đã hoạt động thật
 * (vào đấu trường). Chọn tướng, cửa hàng, hồ sơ, cài đặt được thêm ở Giai đoạn 02.
 */
export function MainMenu() {
  const goTo = useAppFlowStore((state) => state.goTo);

  return (
    <section className="relative flex h-full flex-col items-center justify-between px-4 py-8 sm:py-12">
      <div />
      <div className="flex flex-col items-center animate-fade-in">
        <Logo />
        <span className="mt-8 rounded-full border border-arcane-500/40 bg-arcane-800/40 px-4 py-1 text-xs font-medium uppercase tracking-widest text-arcane-300">
          {vi.mainMenu.mode}
        </span>
        <Button variant="primary" size="lg" className="mt-6 min-w-64" onClick={() => goTo('arena')}>
          {vi.mainMenu.play}
        </Button>
        <p className="mt-3 max-w-sm text-center text-xs text-arcane-300/80">{vi.mainMenu.playHint}</p>
      </div>
      <footer className="flex flex-col items-center gap-1 text-center text-xs text-arcane-300/60">
        <span>{vi.mainMenu.footer}</span>
        <span>{vi.app.version}</span>
      </footer>
    </section>
  );
}
