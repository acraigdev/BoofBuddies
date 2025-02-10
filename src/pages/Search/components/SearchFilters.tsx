import React, { useState } from 'react';
import { Modal } from '../../../components/Modal';
import { Icons } from '../../../components/Icons';
import { SpaceBetween } from '../../../components/SpaceBetween';
import { Slider } from '../../../components/Slider';
import type { Filters } from '../../../sdk/types';
import { MultiInput } from '../../../components/MultiInput';
import { Dropdown } from '../../../components/Dropdown';
import { MultiSelect } from '../../../components/MultiSelect';
import { useQuery } from '@tanstack/react-query';
import * as Dogs from '../../../sdk/dogs';

interface SearchFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

// TODO semantic form
export function SearchFilters({
  filters: { pageSize, zipCodes, age, breeds },
  onFilterChange,
}: SearchFiltersProps) {
  const [showModal, setShowModal] = useState(false);
  const [formFilters, setFormFilters] = useState(() => ({
    pageSize,
    zipCodes,
    age,
    breeds,
  }));

  const { data: breedOptions } = useQuery({
    queryKey: ['getBreeds'],
    queryFn: Dogs.breeds,
    select: res => res.map((breed: string) => ({ value: breed })),
  });

  return (
    <>
      <button className="primary icon" onClick={() => setShowModal(true)}>
        <Icons.Filter className="size-6" />
      </button>
      {showModal && (
        <Modal title="Filter results" onDismiss={() => setShowModal(false)}>
          <SpaceBetween size="sm">
            <Slider
              value={formFilters.pageSize}
              onValueChange={val =>
                setFormFilters({
                  ...formFilters,
                  pageSize: val,
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
            />
            <div className="w-full flex justify-end gap-4">
              <button className="link" onClick={() => setShowModal(false)}>
                <p>Cancel</p>
              </button>
              <button
                className="primary"
                onClick={() => {
                  onFilterChange(formFilters);
                  setShowModal(false);
                }}
              >
                <p>Update filters</p>
              </button>
            </div>
          </SpaceBetween>
        </Modal>
      )}
    </>
  );
}
