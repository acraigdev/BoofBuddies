import React from 'react';
import { Icons } from './Icons';

interface TagProps {
  tag: string;
  onTagRemove: (tag: string) => void;
}

export function Tag({ tag, onTagRemove }: TagProps) {
  return (
    <span className="bg-blue text-white p-1 rounded-sm min-w-fit">
      <span className="pr-1">{tag}</span>
      <button className="align-middle" onClick={() => onTagRemove(tag)}>
        <Icons.XMark className="size-4" />
      </button>
    </span>
  );
}
