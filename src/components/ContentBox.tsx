import React, { ReactNode } from 'react';

interface ContentBoxProps {
  children: ReactNode;
}

export function ContentBox({ children }: ContentBoxProps) {
  return (
    <div className="bg-white p-4 md:p-15 rounded-lg shadow-sm">{children}</div>
  );
}
