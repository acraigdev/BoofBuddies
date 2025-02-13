import type { ReactNode } from 'react';
import React from 'react';

interface ContentBoxProps {
  className?: string;
  children: ReactNode;
  inert?: boolean;
}

export function ContentBox({ className, children, inert }: ContentBoxProps) {
  return (
    <div
      className={`bg-white p-4 md:p-15 rounded-lg shadow-sm ${className ?? ''}`}
      inert={inert}
    >
      {children}
    </div>
  );
}
