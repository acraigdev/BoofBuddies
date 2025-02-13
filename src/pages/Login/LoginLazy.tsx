import React, { lazy, Suspense } from 'react';
import { Spinner } from '../../components/Spinner';

const Login = lazy(() =>
  import('./Login').then(module => ({
    default: module.Login,
  })),
);

export function LoginLazy() {
  return (
    <Suspense fallback={<Spinner className="w-8 h-8" />}>
      <Login />
    </Suspense>
  );
}
