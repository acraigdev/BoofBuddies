import React, { useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Icons } from './Icons';
import { autoUpdate, flip, useFloating } from '@floating-ui/react-dom';
import { useOuterClickHandler } from '../utils/useOuterClickHandler';
import { SpaceBetween } from './SpaceBetween';
import { Tag } from './Tag';

interface MultiSelectProps {
  selected: Set<string>;
  onSelectionChange: (selected: Set<string>) => void;
  options: Set<string>;
  label: string;
  placeholder?: string;
}

export function MultiSelect({
  selected,
  onSelectionChange,
  label,
  options,
  placeholder,
}: MultiSelectProps) {
  const id = `multiselect-${uuidv4()}`;
  const clickRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');
  const [optionsOpen, setOptionsOpen] = useState(false);

  const { refs, floatingStyles } = useFloating({
    open: optionsOpen,
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
    middleware: [flip()],
  });
  useOuterClickHandler({
    ref: clickRef,
    onOuterClick: () => {
      setOptionsOpen(false);
    },
  });

  // Use memo since computing on large data set
  const filteredOptions = useMemo(() => {
    // filter + includes because the data set won't grow
    return [...options].filter(option =>
      option.toLowerCase().includes(search.toLowerCase()),
    );
  }, [options, search]);
  return (
    <div className="relative">
      <label htmlFor={id} className="block mb-2">
        <p>{label}</p>
      </label>
      <div
        className="relative"
        id={id}
        ref={refs.setReference}
        onClick={() => setOptionsOpen(true)}
      >
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="cursor-pointer flex justify-between items-center border border-gray-light text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
          onFocus={() => setOptionsOpen(true)}
          aria-label="Type your breed to filter breed results. Press escape to close the menu"
          onKeyDown={e => {
            if (e.key === 'Escape') {
              setOptionsOpen(false);
              return;
            }
          }}
          placeholder={placeholder}
        />
        <Icons.Chevron className="size-3 rotate-180 absolute top-0 bottom-0 right-2 my-auto text-gray-500" />
      </div>
      {optionsOpen && (
        <div ref={refs.setFloating} style={floatingStyles} className="w-full">
          <div
            ref={clickRef}
            className="flex flex-col max-h-64 rounded-lg shadow-xl bg-white border border-gray-200 overflow-auto scrollbar w-full"
          >
            {filteredOptions.map(option => (
              <Option
                key={option}
                label={option}
                checked={selected.has(option)}
                onChecked={isChecked => {
                  const selectedNew = new Set(selected);
                  if (isChecked) {
                    selectedNew.add(option);
                  } else {
                    selectedNew.delete(option);
                  }
                  onSelectionChange(selectedNew);
                }}
                onEscape={() => setOptionsOpen(false)}
              />
            ))}
          </div>
        </div>
      )}
      {!!selected.size && (
        <SpaceBetween
          size="xs"
          direction="horizontal"
          className="flex-wrap mt-2"
        >
          {Array.from(selected).map(value => (
            <Tag
              key={value}
              tag={value}
              onTagRemove={tag => {
                const copy = new Set(selected);
                copy.delete(tag);
                onSelectionChange(copy);
              }}
            />
          ))}
        </SpaceBetween>
      )}
    </div>
  );
}

function Option({
  label,
  checked,
  onChecked,
  onEscape,
}: {
  label: string;
  checked: boolean;
  onChecked: (checked: boolean) => void;
  onEscape: () => void;
}) {
  return (
    <button
      type="button"
      tabIndex={0}
      className="z-1 p-2 cursor-pointer text-left"
      onClick={() => onChecked(!checked)}
      onKeyDown={e => {
        if (e.key === 'Escape') onEscape();
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        readOnly
        tabIndex={-1}
        className="cursor-pointer -z-1 mr-1 "
      />
      {label}
    </button>
  );
}
