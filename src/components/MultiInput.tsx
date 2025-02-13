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
  validationError?: string;
}

export function MultiInput({
  values,
  onValuesChange,
  label,
  description,
  validate,
  placeholder,
  validationError,
}: MultiInputProps) {
  const [currentValue, setCurrentValue] = useState('');
  const [isError, setIsError] = useState(false);
  const clearCurrent = () => {
    const isValid = validate?.(currentValue) ?? true;
    if (!isValid) {
      setIsError(true);
      return;
    }
    onValuesChange(new Set(values).add(currentValue));
    setCurrentValue('');
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
      {isError && (
        <SpaceBetween
          direction="horizontal"
          size="xs"
          className="text-red-700"
          alignOverride="items-center"
        >
          <Icons.Error className="size-4" />
          <span className="text-xs">{validationError}</span>
        </SpaceBetween>
      )}
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
