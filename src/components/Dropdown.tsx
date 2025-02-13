import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Nullable } from '../utils/typeHelpers';

interface DropdownProps {
  label: string;
  items: Array<{
    label?: string;
    value: string | number;
  }>;
  selected: Nullable<string | number>;
  onSelectionChange: (value: string | number) => void;
}

export function Dropdown({
  label,
  items,
  selected,
  onSelectionChange,
}: DropdownProps) {
  const id = `dropdown-${uuidv4()}`;
  return (
    <div>
      <label htmlFor={id} className="block mb-2">
        <p>{label}</p>
      </label>
      <select
        name={label}
        id={id}
        value={selected ?? undefined}
        onChange={e => onSelectionChange(e.target.value)}
        className={`${!selected ? 'text-gray-500' : ''} border border-gray-light text-sm rounded-lg block w-full p-2.5 cursor-pointer`}
      >
        <option value={undefined}>None</option>
        {items.map(item => (
          <option key={item.value} value={item.value}>
            {item.label ? item.label : item.value}
          </option>
        ))}
      </select>
    </div>
  );
}
