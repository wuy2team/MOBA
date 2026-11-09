import { useAppFlowStore, type AppScreen } from '@/state/appFlowStore';
import { assertNever } from '@/shared/utils/assert';
import { ArenaScreen } from '@/ui/screens/arena/ArenaScreen';
import { MainMenu } from '@/ui/screens/main-menu/MainMenu';

function renderScreen(screen: AppScreen) {
  switch (screen) {
    case 'mainMenu':
      return <MainMenu />;
    case 'arena':
      return <ArenaScreen />;
    default:
      return assertNever(screen, 'ScreenRouter');
  }
}

/** Hiển thị màn hình hiện tại theo appFlowStore (ADR-07). */
export function ScreenRouter() {
  const screen = useAppFlowStore((state) => state.screen);
  return renderScreen(screen);
}
