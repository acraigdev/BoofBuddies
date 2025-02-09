import type { ReactNode } from 'react';
import React, { createContext, useContext, useMemo, useState } from 'react';
import type { Nullable } from './typeHelpers';
import { invariant } from 'ts-invariant';

/**
 * Store state high so it's retained on page nav/logout
 * as long as the browser session is maintained
 */
export const FavoriteDogContext = createContext<
  Nullable<{
    favoriteDogs: Set<string>;
    addFavoriteDog: (id: string) => void;
    removeFavoriteDog: (id: string) => void;
  }>
>(null);

export const FavoriteDogContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [favoriteDogs, setFavoriteDogs] = useState(() => new Set<string>());
  const favoriteDogContext = useMemo(() => {
    return {
      addFavoriteDog: (id: string) => {
        setFavoriteDogs(prev => new Set(prev).add(id));
      },
      removeFavoriteDog: (id: string) => {
        if (favoriteDogs.has(id)) {
          setFavoriteDogs(prev => {
            const copy = new Set(prev);
            copy.delete(id);
            return copy;
          });
        }
      },
      favoriteDogs,
    };
  }, [favoriteDogs]);

  return (
    <FavoriteDogContext.Provider value={favoriteDogContext}>
      {children}
    </FavoriteDogContext.Provider>
  );
};

export function useFavoriteDogContext() {
  const favoriteDogContext = useContext(FavoriteDogContext);
  invariant(favoriteDogContext, 'favoriteDogContext nullish');
  return favoriteDogContext;
}
