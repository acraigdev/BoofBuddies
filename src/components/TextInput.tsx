import type { Ref } from 'react';
import React, { useImperativeHandle, useRef, useState } from 'react';
import type { Maybe, Nullable, ValidationDelegate } from '../utils/typeHelpers';
import { v4 as uuidv4 } from 'uuid';
import { Icons } from '../components/Icons';
import { SpaceBetween } from './SpaceBetween';

interface TextInputProps {
  val: Maybe<string>;
  onValChange: (val: string) => void;
  label: string;
  placeholder?: string;
  validation?: (val: Nullable<string>) => boolean;
  validationError?: Nullable<string>;
  classes?: string;
  validationDelegate?: Nullable<Ref<ValidationDelegate>>;
  type?: 'input' | 'textarea';
  description?: string;
  onEnter?: () => void;
}

export function TextInput({
  val,
  onValChange,
  label,
  placeholder,
  validation,
  validationError,
  classes,
  validationDelegate,
  type = 'input',
  description,
  onEnter,
}: TextInputProps) {
  const id = `form-${uuidv4()}`;
  const inputRef = useRef(null);
  const [isError, setIsError] = useState(false);

  useImperativeHandle(validationDelegate, () => ({
    validate: ({ shouldFocus }) => {
      const isValid = validation?.(val);
      if (!isValid) {
        setIsError(true);
        // @ts-expect-error TODO: add generic typing for ref
        if (shouldFocus) inputRef.current?.focus();
        return false;
      }
      setIsError(false);
      return true;
    },
  }));
  return (
    <div className={classes}>
      <label htmlFor={id} className="block mb-2">
        <p>{label}</p>
        {description && (
          <span className="text-sm text-gray-500">{description}</span>
        )}
      </label>
      {type === 'input' && (
        <div className="relative">
          <input
            id={id}
            value={val}
            onChange={e => {
              setIsError(false);
              onValChange(e.target.value);
            }}
            className="flex justify-between border border-gray-light text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
            type="text"
            ref={inputRef}
            placeholder={placeholder}
            onKeyDown={e => {
              if (!!onEnter && e.key === 'Enter') {
                e.preventDefault();
                onEnter?.();
              }
            }}
          />
          {!!onEnter && (
            <button
              type="button"
              className="cursor-pointer bg-blue border-none rounded-full px-2 text-xl text-white font-bold absolute right-2 top-2"
              onClick={() => onEnter?.()}
              aria-label="Add item"
            >
              +
            </button>
          )}
        </div>
      )}
      {type === 'textarea' && (
        <textarea
          id={id}
          value={val}
          onChange={e => {
            setIsError(false);
            onValChange(e.target.value);
          }}
          className="border border-gray-light text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          ref={inputRef}
          placeholder={placeholder}
        />
      )}
      {isError && (
        <SpaceBetween
          direction="horizontal"
          size="xs"
          className="text-red-700 mt-1"
        >
          <Icons.Error className="size-4" />
          <span className="text-sm">{validationError}</span>
        </SpaceBetween>
      )}
    </div>
  );
}
