/**
 * @file ErrorBoundary.tsx
 * @description React Error Boundary catching unexpected runtime UI rendering exceptions.
 * Renders an accessible, high-contrast fallback state with diagnostic information and a recovery button.
 */

import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { logger } from '../utils/logger.ts';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackTitle?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    logger.error('ErrorBoundary', 'Uncaught component crash caught by boundary', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    });
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  public override render(): ReactNode {
    if (this.state.hasError) {
      return (
        <section
          role="alert"
          aria-live="assertive"
          className="mx-auto my-8 max-w-2xl rounded-2xl border border-red-500/40 bg-slate-900/90 p-8 text-center backdrop-blur-md"
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
            <AlertTriangle className="h-8 w-8" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-bold text-white">
            {this.props.fallbackTitle ?? 'Component Temporarily Unavailable'}
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            An isolated component error occurred. The remainder of SmogShield AI is operating normally.
          </p>
          {this.state.error && (
            <div className="mt-4 rounded-lg bg-slate-950 p-3 text-left font-mono text-xs text-red-300">
              {this.state.error.message}
            </div>
          )}
          <button
            type="button"
            onClick={this.handleReset}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Recover Component
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}
