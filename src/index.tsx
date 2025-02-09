import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import { QueryClientProvider } from '@tanstack/react-query';
import './style.css';
import { FavoriteDogContextProvider } from './utils/FavoriteDogContext';
import { queryClient } from './utils/queryClient';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <FavoriteDogContextProvider>
        <RouterProvider router={router} />
      </FavoriteDogContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
