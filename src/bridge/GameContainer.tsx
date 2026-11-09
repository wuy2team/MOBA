import { useEffect, useRef } from 'react';
import { gameHost } from './GameHost';

interface GameContainerProps {
  className?: string;
}

/**
 * Nơi gắn canvas Phaser vào cây React. Chỉ khởi tạo/hủy game theo vòng đời
 * component; không truyền state React thay đổi liên tục vào Phaser.
 */
export function GameContainer({ className }: GameContainerProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = hostRef.current;
    if (!element) return undefined;
    void gameHost.start(element);
    return () => gameHost.stop();
  }, []);

  return (
    <div
      ref={hostRef}
      className={className}
      data-testid="game-container"
      onContextMenu={(event) => event.preventDefault()}
    />
  );
}
