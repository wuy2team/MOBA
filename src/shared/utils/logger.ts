export type LogLevel = 'info' | 'warn' | 'error';

export interface Logger {
  info(message: string, ...details: unknown[]): void;
  warn(message: string, ...details: unknown[]): void;
  error(message: string, ...details: unknown[]): void;
}

/**
 * Logger có tiền tố theo module. `info` chỉ in ở chế độ dev để console
 * production sạch; `warn`/`error` luôn in.
 */
export function createLogger(scope: string, verbose: boolean = import.meta.env.DEV): Logger {
  const prefix = `[${scope}]`;
  return {
    info(message, ...details) {
      if (verbose) console.info(prefix, message, ...details);
    },
    warn(message, ...details) {
      console.warn(prefix, message, ...details);
    },
    error(message, ...details) {
      console.error(prefix, message, ...details);
    },
  };
}
