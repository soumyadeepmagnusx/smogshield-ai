/**
 * @file logger.ts
 * @description Enterprise-grade structured telemetry and logging utility for SmogShield AI.
 * Enforces standardized log envelopes with timestamp, severity, and context.
 * Automatically suppresses debug-level traces in production builds.
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  context: string;
  message: string;
  data?: unknown;
}

class Logger {
  private isProduction = import.meta.env.PROD;

  private formatEntry(level: LogLevel, context: string, message: string, data?: unknown): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      context,
      message,
      data
    };
  }

  public debug(context: string, message: string, data?: unknown): void {
    if (this.isProduction) return;
    const entry = this.formatEntry('debug', context, message, data);
    console.debug(`[DEBUG][${entry.context}] ${entry.message}`, entry.data ?? '');
  }

  public info(context: string, message: string, data?: unknown): void {
    const entry = this.formatEntry('info', context, message, data);
    console.info(`[INFO][${entry.context}] ${entry.message}`, entry.data ?? '');
  }

  public warn(context: string, message: string, data?: unknown): void {
    const entry = this.formatEntry('warn', context, message, data);
    console.warn(`[WARN][${entry.context}] ${entry.message}`, entry.data ?? '');
  }

  public error(context: string, message: string, data?: unknown): void {
    const entry = this.formatEntry('error', context, message, data);
    console.error(`[ERROR][${entry.context}] ${entry.message}`, entry.data ?? '');
  }
}

export const logger = new Logger();
