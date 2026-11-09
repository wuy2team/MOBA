import { useId } from 'react';
import { vi } from '@/ui/i18n/vi';

interface LogoProps {
  className?: string;
  /** Ẩn dòng tagline (dùng ở thanh tiêu đề nhỏ). */
  compact?: boolean;
}

/** Biểu tượng khiên + hai thanh kiếm bắt chéo + pha lê – thiết kế nguyên bản. */
export function LogoEmblem({ className = '' }: { className?: string }) {
  const id = useId();
  const gold = `${id}-gold`;
  const shield = `${id}-shield`;
  const gem = `${id}-gem`;
  return (
    <svg viewBox="0 0 120 132" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gold} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff0c2" />
          <stop offset="0.45" stopColor="#f5c451" />
          <stop offset="1" stopColor="#8a5a17" />
        </linearGradient>
        <linearGradient id={shield} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b2378" />
          <stop offset="1" stopColor="#0b1026" />
        </linearGradient>
        <radialGradient id={gem} cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#d9f6ff" />
          <stop offset="0.5" stopColor="#4fb3ff" />
          <stop offset="1" stopColor="#1d3f8a" />
        </radialGradient>
      </defs>
      {/* Hai thanh kiếm */}
      <g stroke={`url(#${gold})`} strokeWidth="6" strokeLinecap="round">
        <path d="M18 112 L112 6" />
        <path d="M102 112 L8 6" />
      </g>
      <g fill={`url(#${gold})`}>
        <rect x="8" y="104" width="22" height="7" rx="3" transform="rotate(-48 19 107)" />
        <rect x="90" y="104" width="22" height="7" rx="3" transform="rotate(48 101 107)" />
      </g>
      {/* Khiên */}
      <path
        d="M60 14 L98 28 V60 C98 86 82 104 60 116 C38 104 22 86 22 60 V28 Z"
        fill={`url(#${shield})`}
        stroke={`url(#${gold})`}
        strokeWidth="4"
      />
      <path
        d="M60 24 L89 35 V60 C89 80 77 95 60 105 C43 95 31 80 31 60 V35 Z"
        fill="none"
        stroke="#6d3fd1"
        strokeOpacity="0.6"
        strokeWidth="1.5"
      />
      {/* Pha lê trung tâm */}
      <path d="M60 40 L72 60 L60 84 L48 60 Z" fill={`url(#${gem})`} stroke="#fff0c2" strokeWidth="1.5" />
      <path d="M60 40 L66 60 L60 84" fill="#ffffff" fillOpacity="0.18" />
    </svg>
  );
}

export function Logo({ className = '', compact = false }: LogoProps) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <LogoEmblem
        className={
          compact ? 'h-10 w-10' : 'h-24 w-24 drop-shadow-[0_0_24px_rgba(109,63,209,0.7)] sm:h-32 sm:w-32'
        }
      />
      <h1
        className={
          'font-logo font-bold leading-none tracking-[0.08em] text-gold-gradient animate-shine ' +
          (compact ? 'mt-1 text-lg' : 'mt-4 text-5xl sm:text-6xl md:text-7xl')
        }
      >
        ARENA
        <span className="block text-[0.62em] tracking-[0.32em]">LEGENDS</span>
      </h1>
      {!compact && <p className="mt-4 max-w-md text-sm text-arcane-300 sm:text-base">{vi.app.tagline}</p>}
    </div>
  );
}
