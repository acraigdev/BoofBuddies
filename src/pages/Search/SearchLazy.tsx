import React from 'react';
import { lazy, Suspense } from 'react';

const Search = lazy(() =>
  import('./Search').then(module => ({
    default: module.Search,
  })),
);

export function SearchLazy() {
  return (
    <Suspense>
      <Search />
    </Suspense>
  );
}
