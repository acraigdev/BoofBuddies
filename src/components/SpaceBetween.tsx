import React, { Children, ReactNode } from 'react';
import { Maybe } from '../utils/typeHelpers';

type Size = 'xs' | 'sm' | 'm' | 'l' | 'xl';
interface SpaceBetweenProps {
  direction?: 'horizontal' | 'vertical';
  size: Size;
  children: ReactNode;
  className?: Maybe<string>;
}

export function SpaceBetween({
  direction = 'vertical',
  size,
  children,
  className,
}: SpaceBetweenProps) {
  const margin =
    direction === 'vertical' ? getBottomMargin(size) : getRightMargin(size);
  return (
    <div className={className ?? ''}>
      {Children.map(children, child => (
        <span
          className={
            direction === 'vertical'
              ? `${margin} block`
              : `${margin} inline-block align-middle`
          }
        >
          {child}
        </span>
      ))}
    </div>
  );
}

function getBottomMargin(size: Size) {
  switch (size) {
    case 'xs':
      return '[&:not(:last-child)]:mb-0.5 md:[&:not(:last-child)]:mb-1';
    case 'sm':
      return '[&:not(:last-child)]:mb-1 md:[&:not(:last-child)]:mb-2';
    case 'm':
      return '[&:not(:last-child)]:mb-2 md:[&:not(:last-child)]:mb-4';
    case 'l':
      return '[&:not(:last-child)]:mb-3 md:[&:not(:last-child)]:mb-6';
    case 'xl':
      return '[&:not(:last-child)]:mb-4 md:[&:not(:last-child)]:mb-8';
  }
}

function getRightMargin(size: Size) {
  switch (size) {
    case 'xs':
      return '[&:not(:last-child)]:mr-0.5 md:[&:not(:last-child)]:mr-1';
    case 'sm':
      return '[&:not(:last-child)]:mr-1 md:[&:not(:last-child)]:mr-2';
    case 'm':
      return '[&:not(:last-child)]:mr-2 md:[&:not(:last-child)]:mr-4';
    case 'l':
      return '[&:not(:last-child)]:mr-3 md:[&:not(:last-child)]:mr-6';
    case 'xl':
      return '[&:not(:last-child)]:mr-4 md:[&:not(:last-child)]:mr-8';
  }
}
