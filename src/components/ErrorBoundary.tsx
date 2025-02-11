import type { ErrorInfo, ReactNode } from 'react';
import React, { Component } from 'react';
import { SpaceBetween } from './SpaceBetween';
import { Icons } from './Icons';
import { ContentBox } from './ContentBox';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <ContentBox>
          <SpaceBetween
            direction="horizontal"
            size="xs"
            className="text-red-700"
          >
            <Icons.Error className="size-4" />
            <span className="text-sm">
              Something went wrong. Please refresh to try again
            </span>
          </SpaceBetween>
        </ContentBox>
      );
    }

    return this.props.children;
  }
}
