import type { ReactNode } from 'react';
import React, { Children } from 'react';
import type { Maybe } from '../utils/typeHelpers';

type Size = 'xs' | 'sm' | 'm' | 'l' | 'xl';
interface SpaceBetweenProps {
  direction?: 'horizontal' | 'vertical';
  size: Size;
  children: ReactNode;
  className?: Maybe<string>;
  alignOverride?: string;
}

export function SpaceBetween({
  direction = 'vertical',
  size,
  children,
  className,
  alignOverride,
}: SpaceBetweenProps) {
  return (
    <div
      className={`${getGap(size)} flex ${direction === 'vertical' ? 'flex-col' : 'flex-row'} ${alignOverride ? alignOverride : 'items-left'} ${className ?? ''}`}
    >
      {Children.map(children, child => !!child && <>{child}</>)}
    </div>
  );
}

function getGap(size: Size) {
  switch (size) {
    case 'xs':
      return 'gap-1 md:gap-2';
    case 'sm':
      return 'gap-2 md:gap-4';
    case 'm':
      return 'gap-4 md:gap-6';
    case 'l':
      return 'gap-6 md:gap-8';
    case 'xl':
      return 'gap-8 md:gap-10';
  }
}
