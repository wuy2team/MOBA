// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { resetToMainMenu, useAppFlowStore } from '@/state/appFlowStore';
import { vi as text } from '@/ui/i18n/vi';
import { MainMenu } from './MainMenu';

describe('MainMenu', () => {
  beforeEach(() => resetToMainMenu());
  afterEach(() => cleanup());

  it('hiển thị logo ARENA LEGENDS và chế độ chơi', () => {
    render(<MainMenu />);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toContain('ARENA');
    expect(screen.getByText(text.mainMenu.mode)).toBeDefined();
  });

  it('nút vào đấu trường chuyển sang màn đấu trường', async () => {
    render(<MainMenu />);
    await userEvent.click(screen.getByRole('button', { name: text.mainMenu.play }));
    expect(useAppFlowStore.getState().screen).toBe('arena');
  });

  it('mọi nút hiển thị đều có tác dụng (không có nút bị vô hiệu)', () => {
    render(<MainMenu />);
    for (const button of screen.getAllByRole('button')) {
      expect((button as HTMLButtonElement).disabled).toBe(false);
    }
  });
});
