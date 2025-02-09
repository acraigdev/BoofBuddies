import type { ReactNode } from 'react';
import React from 'react';
import { SpaceBetween } from './SpaceBetween';
import { Icons } from './Icons';

interface AlertProps {
  type: 'error' | 'success';
  title: string;
  children: ReactNode;
  onRetry?: () => void;
}

export function Alert({ type, title, children, onRetry }: AlertProps) {
  const alertClasses =
    type === 'error' ? 'text-white bg-red-700' : 'text-white bg-green-700';
  return (
    <div
      className={`p-3 rounded-lg flex justify-between w-full ${alertClasses}`}
    >
      <SpaceBetween direction="horizontal" size="xs" className="w-full">
        {type === 'error' ? (
          <Icons.Error className="size-6" />
        ) : (
          <Icons.CheckCircle className="size-6" />
        )}
        <div className="inline-block">
          <p className="block font-bold m-0">{title}</p>
          <span className="text-sm">{children}</span>
        </div>
      </SpaceBetween>
      {Boolean(onRetry) && (
        <button className="inverted primary" onClick={() => onRetry?.()}>
          Retry
        </button>
      )}
    </div>
  );
}
