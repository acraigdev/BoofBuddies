import React from 'react';
import { v4 as uuidv4 } from 'uuid';

interface DropdownProps {
  label: string;
  items: Array<{
    label?: string;
    value: string;
  }>;
  selected: string;
  onSelectionChange: (value: string) => void;
}

export function Dropdown({
  label,
  items,
  selected,
  onSelectionChange,
}: DropdownProps) {
  const id = `form-${uuidv4()}`;
  return (
    <div>
      <label htmlFor={id} className="block mb-2">
        <p>{label}</p>
      </label>
      <select
        name={label}
        id={id}
        value={selected}
        onChange={e => onSelectionChange(e.target.value)}
        className="border border-gray-light text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        {items.map(item => (
          <option key={item.value} value={item.value}>
            {item.label ? item.label : item.value}
          </option>
        ))}
      </select>
    </div>
  );
}
