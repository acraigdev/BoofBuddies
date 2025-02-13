import React, { lazy, Suspense } from 'react';
import { Spinner } from '../../components/Spinner';

const Match = lazy(() =>
  import('./Match').then(module => ({
    default: module.Match,
  })),
);

export function MatchLazy() {
  return (
    <Suspense fallback={<Spinner className="w-8 h-8" />}>
      <Match />
    </Suspense>
  );
}
