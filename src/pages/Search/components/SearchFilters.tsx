import React, { useState } from 'react';
import { Menu } from '../../../components/Menu';
import { Icons } from '../../../components/Icons';
import { SpaceBetween } from '../../../components/SpaceBetween';
import { Slider } from '../../../components/Slider';
import type { Filters } from '../../../sdk/types';
import { MultiInput } from '../../../components/MultiInput';
import { Dropdown } from '../../../components/Dropdown';
import { MultiSelect } from '../../../components/MultiSelect';
import { useSuspenseQuery } from '@tanstack/react-query';
import * as DogQueries from '../../../sdk/DogQueries';

interface SearchFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

// TODO semantic form
// zip validation message
/**
 * Enhancements:
 * - Save filters as query string so they dont get lost on nav
 */
export function SearchFilters({
  filters: { pageSize, zipCodes, age, breeds },
  onFilterChange,
}: SearchFiltersProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [formFilters, setFormFilters] = useState(() => ({
    pageSize,
    zipCodes,
    age,
    breeds,
  }));

  const { data: breedOptions } = useSuspenseQuery({
    ...DogQueries.listBreeds(),
    select: res => new Set<string>(res),
  });

  return (
    <>
      <button className="primary icon" onClick={() => setShowMenu(true)}>
        <Icons.Filter className="size-6" />
      </button>
      {showMenu && (
        <Menu title="Filter results" onDismiss={() => setShowMenu(false)}>
          <form
            onSubmit={e => {
              e.preventDefault();
              onFilterChange(formFilters);
              setShowMenu(false);
            }}
          >
            <SpaceBetween size="sm">
              <Slider
                value={String(formFilters.pageSize)}
                onValueChange={val =>
                  setFormFilters({
                    ...formFilters,
                    pageSize: Number(val),
                  })
                }
                range={{ min: 10, max: 100 }} // TODO check docs
                label="Items per page"
                className="w-full"
              />
              <div className="grid gap-2 grid-cols-2">
                <Dropdown
                  label="Min age"
                  selected={formFilters.age?.min}
                  onSelectionChange={val =>
                    setFormFilters({
                      ...formFilters,
                      age: {
                        ...formFilters.age,
                        min: Number(val),
                      },
                    })
                  }
                  items={new Array(15).fill('').map((_v, i) => ({
                    label:
                      i === 0 ? 'Puppy' : i === 1 ? `${i} year` : `${i} years`,
                    value: i,
                  }))}
                />
                <Dropdown
                  label="Max age"
                  selected={formFilters.age?.max}
                  onSelectionChange={val =>
                    setFormFilters({
                      ...formFilters,
                      age: {
                        ...formFilters.age,
                        max: Number(val),
                      },
                    })
                  }
                  items={new Array(15).fill('').map((_v, i) => ({
                    label:
                      i === 0 ? 'Puppy' : i === 1 ? `${i} year` : `${i} years`,
                    value: i,
                  }))}
                />
              </div>
              <MultiInput
                values={formFilters.zipCodes}
                onValuesChange={values =>
                  setFormFilters({ ...formFilters, zipCodes: values })
                }
                label="Zip codes"
                description="Type a zipcode and press enter or + to add it to the filter"
                validate={val => Boolean(!!val && /^\d{5}$/.test(val))}
                placeholder="12345"
              />
              <MultiSelect
                selected={formFilters.breeds}
                onSelectionChange={val =>
                  setFormFilters({
                    ...formFilters,
                    breeds: val,
                  })
                }
                options={breedOptions}
                label="Breeds"
                placeholder="Filter by breed"
              />
              <div className="w-full flex justify-end gap-4">
                <button className="link" onClick={() => setShowMenu(false)}>
                  <p>Cancel</p>
                </button>
                <button className="primary" formAction="submit">
                  <p>Update filters</p>
                </button>
              </div>
            </SpaceBetween>
          </form>
        </Menu>
      )}
    </>
  );
}
