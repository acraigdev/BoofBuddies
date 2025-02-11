import type { ReactNode } from 'react';
import React, { useRef } from 'react';
import { Icons } from './Icons';
import { useOuterClickHandler } from '../utils/useOuterClickHandler';

interface MenuProps {
  onDismiss: () => void;
  children: ReactNode;
  title: string;
}

/**
 * TODO:
 * Prevent tabbing outside of Menu
 */

export function Menu({ onDismiss, children, title }: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  useOuterClickHandler({
    ref: menuRef,
    onOuterClick: onDismiss,
  });
  return (
    <div className="fixed top-0 left-0 w-full h-full z-10">
      <div className="bg-gray-800 w-full h-full opacity-40"></div>
      <div
        ref={menuRef}
        className="bg-white p-4 shadow-sm absolute top-0 left-0 opacity-100 h-full md:w-1/2 overflow-auto"
      >
        <div className="flex justify-between items-center">
          <h3>{title}</h3>
          <button className="icon" onClick={() => onDismiss()}>
            <Icons.XMark className="size-6 float-right" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
