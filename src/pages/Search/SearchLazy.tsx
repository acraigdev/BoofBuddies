import React, { lazy, Suspense } from 'react';
import { Spinner } from '../../components/Spinner';

const Search = lazy(() =>
  import('./Search').then(module => ({
    default: module.Search,
  })),
);

export function SearchLazy() {
  return (
    <Suspense fallback={<Spinner isDefault />}>
      <Search />
    </Suspense>
  );
}
