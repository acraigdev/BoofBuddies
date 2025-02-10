import type { ReactNode } from 'react';
import React from 'react';
import { Icons } from './Icons';

interface ModalProps {
  onDismiss: () => void;
  children: ReactNode;
  title: string;
}

/**
 * TODO:
 * Prevent tabbing outside of modal
 * Close via click outside
 * Doesn't work well with small height
 */

export function Modal({ onDismiss, children, title }: ModalProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-10">
      <div className="bg-gray-800 w-full h-full opacity-40"></div>
      <div className="bg-white p-4 rounded-lg shadow-sm absolute top-0 left-0 opacity-100 h-full md:w-1/2">
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
