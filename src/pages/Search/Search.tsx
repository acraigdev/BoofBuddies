import React, { useMemo, useState } from 'react';
import { LayoutFrame } from '../../components/LayoutFrame';
import { ContentBox } from '../../components/ContentBox';
import * as DogQueries from '../../sdk/DogQueries';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { Dropdown } from '../../components/Dropdown';
import { SpaceBetween } from '../../components/SpaceBetween';
import { Alert } from '../../components/Alert';
import { DogCard } from './components/DogCard';
import type { Dog, Filters } from '../../sdk/types';
import { useFavoriteDogContext } from '../../utils/FavoriteDogContext';
import { generatePath, useNavigate } from 'react-router-dom';
import { queryClient } from '../../utils/queryClient';
import { SearchFilters } from './components/SearchFilters';
import { fetchApiClient } from '../../sdk/client';
import { Pagination } from '../../components/Pagination';

// TODO:
// queryFactory
// pagination
// stretch: image hover popover
// large screen wider + 4
// go to top button

export function Search() {
  const navigate = useNavigate();
  const { favoriteDogs } = useFavoriteDogContext();
  const [sortBy, setSortBy] = useState('breed:asc');
  const [filters, setFilters] = useState<Filters>(() => ({
    pageSize: 25,
    age: null,
    zipCodes: new Set<string>(),
    breeds: new Set<string>(),
  }));
  const [currentPage, setCurrentPage] = useState(0);

  const {
    data: searchedDogs,
    error: searchedDogsError,
    isLoading: searchedDogsLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    ...DogQueries.searchDogs({
      size: String(filters.pageSize),
      sort: sortBy,
      breeds: filters.breeds,
      zipCodes: filters.zipCodes,
      age: filters.age,
    }),
    initialPageParam: null,
    getNextPageParam: lastPage => lastPage.next,
  });

  const dogPage = useMemo(() => {
    if (isFetchingNextPage) {
      return searchedDogs?.pages?.[currentPage - 1]?.dogs;
    }
    return searchedDogs?.pages?.[currentPage]?.dogs;
  }, [currentPage, searchedDogs?.pages, isFetchingNextPage]);

  const { mutateAsync: findMatch } = useMutation({
    mutationFn: async () =>
      await fetchApiClient.send({
        method: 'POST',
        api: '/dogs/match',
        input: { body: Array.from(favoriteDogs) },
      }),
    onSuccess: res => {
      navigate(generatePath('/match/:matchId', { matchId: res.match }));
    },
  });

  const handlePageChange = (newPage: number) => {
    if (!searchedDogs?.pages[newPage]) {
      fetchNextPage();
    }
    setCurrentPage(newPage);
  };

  return (
    <LayoutFrame>
      <ContentBox className="w-full lg:w-3/4">
        <SpaceBetween size="m">
          <div className="sm:flex justify-between items-center">
            <div className="basis-3/4 mb-2">
              <h2>Find your match</h2>
              <p>
                Favorite dogs that spark your interest and click &quot;Match
                me&quot; to be matched with the perfect friend for you
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
          <div className="flex justify-between items-center">
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
                onSelectionChange={val => setSortBy(String(val))}
              />
            </SpaceBetween>
            <Pagination
              openEnded={hasNextPage}
              currentPage={currentPage}
              onCurrentPageChange={newPage => handlePageChange(newPage)}
              numberOfPages={searchedDogs.pages.length}
              isFetchingNextPage={isFetchingNextPage}
            />
          </div>
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

          {dogPage?.length ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {dogPage.map((dog: Dog) => (
                <DogCard key={dog.id} {...dog} />
              ))}
            </div>
          ) : (
            !searchedDogsLoading &&
            !isFetchingNextPage &&
            'No dogs found matching the criteria'
          )}
          <Pagination
            openEnded={hasNextPage}
            currentPage={currentPage}
            onCurrentPageChange={newPage => handlePageChange(newPage)}
            numberOfPages={searchedDogs.pages.length}
            isFetchingNextPage={isFetchingNextPage}
          />
        </SpaceBetween>
      </ContentBox>
    </LayoutFrame>
  );
}
