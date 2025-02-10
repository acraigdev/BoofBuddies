import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SpaceBetween } from './SpaceBetween';

interface SliderProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  range: {
    min: number;
    max: number;
    step?: number;
  };
  className?: string;
}

export function Slider({
  label,
  value,
  onValueChange,
  range,
  className,
}: SliderProps) {
  const id = `slider-${uuidv4()}`;
  return (
    <div className={className ?? ''}>
      <div className="flex justify-between items-center">
        <label htmlFor={id} className="block mb-2">
          <p>{label}</p>
        </label>
        <span className="text-sm text-gray-500">
          {range.min}-{range.max}
        </span>
      </div>

      <SpaceBetween size="sm" direction="horizontal">
        <input
          type="range"
          id={id}
          name={label}
          min={range.min}
          max={range.max}
          value={value}
          step={range.step ?? 5}
          onChange={e => onValueChange(e.target.value)}
          className="w-4/5"
        />
        <p>{value}</p>
      </SpaceBetween>
    </div>
  );
}
