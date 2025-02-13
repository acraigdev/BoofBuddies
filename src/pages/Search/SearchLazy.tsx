import React, { lazy, Suspense } from 'react';
import { Spinner } from '../../components/Spinner';

const Search = lazy(() =>
  import('./Search').then(module => ({
    default: module.Search,
  })),
);

export function SearchLazy() {
  return (
    <Suspense fallback={<Spinner className="w-8 h-8" />}>
      <Search />
    </Suspense>
  );
}
