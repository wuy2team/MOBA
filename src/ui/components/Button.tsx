import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
}

const BASE =
  'group relative inline-flex items-center justify-center gap-2 font-semibold tracking-wide select-none ' +
  'transition-all duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-45 ' +
  'enabled:hover:-translate-y-0.5 enabled:active:translate-y-0';

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'text-night-950 bg-linear-to-b from-gold-300 via-gold-400 to-gold-500 border border-gold-200/80 ' +
    'shadow-[0_0_0_1px_rgba(0,0,0,0.4),0_8px_24px_-6px_rgba(245,196,81,0.55)] ' +
    'enabled:hover:shadow-[0_0_0_1px_rgba(0,0,0,0.4),0_12px_32px_-4px_rgba(245,196,81,0.8)] ' +
    'enabled:hover:brightness-110',
  secondary:
    'text-gold-200 bg-night-800/80 border border-gold-500/50 backdrop-blur ' +
    'enabled:hover:border-gold-300 enabled:hover:bg-arcane-800/70 enabled:hover:text-gold-300',
  ghost: 'text-arcane-300 bg-transparent border border-transparent enabled:hover:text-gold-300',
};

const SIZES: Record<ButtonSize, string> = {
  md: 'px-4 py-2 text-sm rounded-md',
  lg: 'px-8 py-3.5 text-lg rounded-lg uppercase',
};

export function Button({
  variant = 'secondary',
  size = 'md',
  icon,
  className = '',
  type = 'button',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`} {...rest}>
      {icon !== undefined && <span aria-hidden="true">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
