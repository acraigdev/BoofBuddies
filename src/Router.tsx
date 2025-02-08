import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { LoginLazy } from './pages/Login/LoginLazy';
import { SearchLazy } from './pages/Search/SearchLazy';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginLazy />,
  },
  {
    path: '/search',
    element: <SearchLazy />,
  },
]);
