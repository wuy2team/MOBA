import { useState } from 'react';
import { GameContainer } from '@/bridge/GameContainer';
import { useGameEvent } from '@/bridge/useGameEvent';
import { useAppFlowStore } from '@/state/appFlowStore';
import { Button } from '@/ui/components/Button';
import { LogoEmblem } from '@/ui/components/Logo';
import { Panel } from '@/ui/components/Panel';
import { vi } from '@/ui/i18n/vi';

type ArenaStatus =
  { kind: 'loading' } | { kind: 'ready'; renderer: 'webgl' | 'canvas' } | { kind: 'error'; message: string };

const LEGEND = [
  { label: vi.arena.legendBlue, swatch: 'bg-team-blue' },
  { label: vi.arena.legendRed, swatch: 'bg-team-red' },
  { label: vi.arena.legendRiver, swatch: 'bg-[#1d5f8a]' },
  { label: vi.arena.legendLane, swatch: 'bg-[#8a7f6a]' },
] as const;

/** Màn đấu trường: canvas Phaser + lớp phủ React. */
export function ArenaScreen() {
  const goTo = useAppFlowStore((state) => state.goTo);
  const [status, setStatus] = useState<ArenaStatus>({ kind: 'loading' });
  // Đổi key để gắn lại GameContainer ⇒ GameHost hủy và tạo game mới.
  const [attempt, setAttempt] = useState(0);

  useGameEvent('game:ready', ({ renderer }) => setStatus({ kind: 'ready', renderer }));
  useGameEvent('fatal', ({ message }) => setStatus({ kind: 'error', message }));

  const retry = () => {
    setStatus({ kind: 'loading' });
    setAttempt((value) => value + 1);
  };

  return (
    <section className="relative h-full w-full">
      <GameContainer key={attempt} className="absolute inset-0" />

      <header className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-4 bg-linear-to-b from-night-950/90 to-transparent p-4">
        <div className="flex items-center gap-3">
          <LogoEmblem className="h-10 w-10" />
          <div>
            <h2 className="text-lg font-bold text-gold-300 sm:text-xl">{vi.arena.title}</h2>
            <p className="text-xs text-arcane-300">{vi.arena.subtitle}</p>
          </div>
        </div>
        <Button className="pointer-events-auto" onClick={() => goTo('mainMenu')}>
          ← {vi.arena.back}
        </Button>
      </header>

      {status.kind === 'ready' && (
        <footer className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 bg-linear-to-t from-night-950/90 to-transparent p-4 text-xs text-arcane-300">
          {LEGEND.map((item) => (
            <span key={item.label} className="flex items-center gap-2">
              <span className={`h-3 w-3 rotate-45 rounded-[2px] ${item.swatch}`} />
              {item.label}
            </span>
          ))}
          <span className="text-arcane-300/60">{vi.arena.renderer(status.renderer)}</span>
        </footer>
      )}

      {status.kind === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center bg-night-950" role="status">
          <div className="flex flex-col items-center gap-4">
            <LogoEmblem className="h-16 w-16 animate-pulse" />
            <p className="text-sm text-arcane-300">{vi.arena.loading}</p>
          </div>
        </div>
      )}

      {status.kind === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center bg-night-950/90 p-4" role="alert">
          <Panel className="max-w-md text-center">
            <h3 className="text-lg font-bold text-team-red">{vi.arena.errorTitle}</h3>
            <p className="mt-2 break-words text-sm text-arcane-300">{status.message}</p>
            <div className="mt-6 flex justify-center gap-3">
              <Button variant="primary" onClick={retry}>
                {vi.arena.retry}
              </Button>
              <Button onClick={() => goTo('mainMenu')}>{vi.arena.back}</Button>
            </div>
          </Panel>
        </div>
      )}
    </section>
  );
}
