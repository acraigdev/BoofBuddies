import React, { useState } from 'react';
import { TextInput } from './TextInput';
import { SpaceBetween } from './SpaceBetween';
import { Icons } from './Icons';
import { Tag } from './Tag';

interface MultiInputProps {
  values: Set<string>;
  onValuesChange: (values: Set<string>) => void;
  label: string;
  description?: string;
  validate?: (value: string) => boolean;
  placeholder?: string;
}

export function MultiInput({
  values,
  onValuesChange,
  label,
  description,
  validate,
  placeholder,
}: MultiInputProps) {
  const [currentValue, setCurrentValue] = useState('');
  const clearCurrent = () => {
    const isValid = validate?.(currentValue) ?? true;
    if (isValid) {
      onValuesChange(new Set(values).add(currentValue));
      setCurrentValue('');
    }
  };
  return (
    <SpaceBetween size="sm">
      <TextInput
        val={currentValue}
        onValChange={setCurrentValue}
        label={label}
        description={description}
        onEnter={() => clearCurrent()}
        placeholder={placeholder}
      />
      {values.size && (
        <SpaceBetween size="xs" direction="horizontal">
          {Array.from(values).map(value => (
            <Tag
              key={value}
              tag={value}
              onTagRemove={tag => {
                const copy = new Set(values);
                copy.delete(tag);
                onValuesChange(copy);
              }}
            />
          ))}
        </SpaceBetween>
      )}
    </SpaceBetween>
  );
}
