import { ErrorBoundary } from '@/app/ErrorBoundary';
import { MainLayout } from '@/app/layouts/MainLayout';
import { ScreenRouter } from '@/app/ScreenRouter';

export function App() {
  return (
    <MainLayout>
      <ErrorBoundary>
        <ScreenRouter />
      </ErrorBoundary>
    </MainLayout>
  );
}
