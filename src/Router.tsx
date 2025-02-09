import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { LoginLazy } from './pages/Login/LoginLazy';
import { SearchLazy } from './pages/Search/SearchLazy';
import { MatchLazy } from './pages/Match/MatchLazy';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginLazy />,
  },
  {
    path: '/search',
    element: <SearchLazy />,
  },
  {
    path: '/match/:matchId',
    element: <MatchLazy />,
  },
  {
    path: '*',
    element: <LoginLazy />,
  },
]);
