import React, { lazy, Suspense } from 'react';

const Match = lazy(() =>
  import('./Match').then(module => ({
    default: module.Match,
  })),
);

export function MatchLazy() {
  return (
    <Suspense>
      <Match />
    </Suspense>
  );
}
