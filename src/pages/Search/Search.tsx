import React, { useState } from 'react';
import { LayoutFrame } from '../../components/LayoutFrame';
import { ContentBox } from '../../components/ContentBox';
import * as dogs from '../../sdk/dogs';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Dropdown } from '../../components/Dropdown';
import { SpaceBetween } from '../../components/SpaceBetween';
import { Alert } from '../../components/Alert';
import { DogCard } from './components/DogCard';
import type { Dog, Filters } from '../../sdk/types';
import { useFavoriteDogContext } from '../../utils/FavoriteDogContext';
import { generatePath, useNavigate } from 'react-router-dom';
import { queryClient } from '../../utils/queryClient';
import { SearchFilters } from './components/SearchFilters';

// TODO:
// filters and sort
// queryFactory
// pagination
// stretch: image hover popover

export function Search() {
  const navigate = useNavigate();
  const { favoriteDogs } = useFavoriteDogContext();
  const [sortBy, setSortBy] = useState('breed:asc');
  const [filters, setFilters] = useState<Filters>(() => ({
    pageSize: '25',
    age: null,
    zipCodes: new Set<string>(),
    breeds: new Set<string>(),
  }));

  // TODO: infinite
  const {
    data: searchedDogs,
    error: searchedDogsError,
    isLoading: searchedDogsLoading,
  } = useQuery({
    queryKey: ['searchDogs', sortBy],
    queryFn: () =>
      dogs.searchDogs({
        size: filters.pageSize,
        sort: sortBy,
        breeds: filters.breeds,
        zipCodes: filters.zipCodes,
        age: filters.age,
      }),
  });

  console.log(filters);

  const { mutateAsync: findMatch } = useMutation({
    mutationFn: async () => await dogs.match({ ids: Array.from(favoriteDogs) }),
    onSuccess: res => {
      navigate(generatePath('/match/:matchId', { matchId: res.match }));
    },
  });

  return (
    <LayoutFrame>
      <ContentBox className="w-full">
        <SpaceBetween size="m">
          <div className="sm:flex justify-between items-center">
            <div className="basis-3/4 mb-2">
              <h2>Find your match</h2>
              <p>
                Favorite dogs that spark your interest and click "Match me" to
                be matched with the perfect friend for you
              </p>
            </div>
            <button
              className="primary basis-32 block"
              disabled={!favoriteDogs.size}
              onClick={() => findMatch()}
            >
              Match me
            </button>
          </div>
          <SpaceBetween
            size="m"
            direction="horizontal"
            alignOverride="items-end"
          >
            <SearchFilters
              filters={filters}
              onFilterChange={filters => setFilters(filters)}
            />
            <Dropdown
              label="Sort by"
              items={[
                { label: 'Breed A-Z', value: 'breed:asc' },
                { label: 'Breed Z-A', value: 'breed:desc' },
                { label: 'Name A-Z', value: 'name:asc' },
                { label: 'Name Z-A', value: 'name:desc' },
                { label: 'Age Young-Older', value: 'age:asc' },
                { label: 'Age Older-Younger', value: 'age:desc' },
              ]}
              selected={sortBy}
              onSelectionChange={val => setSortBy(val)}
            />
          </SpaceBetween>
          {searchedDogsError && (
            <Alert
              type="error"
              title="Something went wrong fetching dogs"
              onRetry={() =>
                queryClient.invalidateQueries({ queryKey: ['searchDogs'] })
              }
            >
              {String(searchedDogsError)}
            </Alert>
          )}
          {searchedDogsLoading && 'Loading...'}
          {searchedDogs?.length && (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {searchedDogs.map((dog: Dog) => (
                <DogCard key={dog.id} {...dog} />
              ))}
            </div>
          )}
        </SpaceBetween>
      </ContentBox>
    </LayoutFrame>
  );
}
