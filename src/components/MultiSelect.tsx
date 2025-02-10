import React, { useState } from 'react';
import type { Nullable } from '../utils/typeHelpers';
import { v4 as uuidv4 } from 'uuid';
import { Icons } from './Icons';

interface MultiSelectProps {
  selected: Nullable<Set<string>>;
  onSelectionChange: (selected: Set<string>) => void;
  options: Array<{
    label?: string;
    value: string | number;
  }>;
  label: string;
}

export function MultiSelect({
  selected,
  onSelectionChange,
  label,
  options,
}: MultiSelectProps) {
  const id = `multiselect-${uuidv4()}`;
  const [menuOpen, setMenuOpen] = useState(true);
  const openMenu = () => {
    setMenuOpen(true);
  };
  return (
    <div className="relative">
      <label htmlFor={id} className="block mb-2">
        <p>{label}</p>
      </label>
      <div
        id={id}
        className="cursor-pointer flex justify-between items-center border border-gray-light text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
        onClick={() => openMenu()}
      >
        <span className="text-gray-500">Select</span>
        <Icons.Chevron className="size-3 rotate-180" />
      </div>
      {menuOpen && (
        <div className="absolute top-full left-2">
          <div className="flex flex-col-reverse max-h-64 w-64 rounded-lg shadow-xl bg-white border border-gray-200 overflow-auto scrollbar">
            {options.map(option => (
              <MenuOption key={option.value} {...option} />
            ))}
            Using flexbox, a flex container with flex-end alignment and stretch,
            each child(ul) would have fixed width and height set to be a
            reversed flex column. The children(li) would then grow upwards from
            the bottom.
          </div>
        </div>
      )}
    </div>
  );
}

function MenuOption({
  label,
  value,
}: {
  label?: string;
  value: string | number;
}) {
  return (
    <div className="p-2">
      <input type="checkbox" />
      {label ?? value}
    </div>
  );
}
