import { Component, type ErrorInfo, type ReactNode } from 'react';
import { resetToMainMenu } from '@/state/appFlowStore';
import { Button } from '@/ui/components/Button';
import { Panel } from '@/ui/components/Panel';
import { vi } from '@/ui/i18n/vi';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

/** Bắt lỗi render React, hiển thị màn hình phục hồi thay vì trang trắng. */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  override state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  private readonly backToMenu = (): void => {
    resetToMainMenu();
    this.setState({ error: null });
  };

  override render(): ReactNode {
    const { error } = this.state;
    if (error === null) return this.props.children;

    return (
      <div className="flex h-full items-center justify-center p-4" role="alert">
        <Panel className="max-w-lg text-center">
          <h2 className="text-xl font-bold text-gold-300">{vi.errors.title}</h2>
          <p className="mt-2 text-sm text-arcane-300">{vi.errors.description}</p>
          <pre className="mt-4 max-h-32 overflow-auto rounded bg-night-950/80 p-3 text-left text-xs text-team-red">
            {error.message}
          </pre>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="primary" onClick={this.backToMenu}>
              {vi.errors.backToMenu}
            </Button>
            <Button onClick={() => window.location.reload()}>{vi.errors.reload}</Button>
          </div>
        </Panel>
      </div>
    );
  }
}
