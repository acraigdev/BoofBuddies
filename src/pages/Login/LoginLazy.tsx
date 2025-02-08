import React from 'react';
import { lazy, Suspense } from 'react';

const Login = lazy(() =>
  import('./Login').then(module => ({
    default: module.Login,
  })),
);

export function LoginLazy() {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
}
