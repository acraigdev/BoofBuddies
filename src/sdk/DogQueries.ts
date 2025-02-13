import type { QueryFunctionContext } from '@tanstack/react-query';
import type { Nullable } from '../utils/typeHelpers';
import { fetchApiClient } from './client';

export const listBreeds = () => {
  const queryKey = [
    {
      api: 'listBreeds',
    },
  ];
  return {
    queryKey,
    queryFn: async () => await fetchApiClient.listBreeds(),
  };
};

export const searchDogs = ({
  breeds,
  zipCodes,
  age,
  size,
  sort,
}: {
  breeds?: Set<string>;
  zipCodes?: Set<string>;
  age?: Nullable<{ min?: Nullable<number>; max?: Nullable<number> }>;
  size?: string;
  sort?: string;
}) => {
  const queryKey = [
    {
      api: 'searchDogs',
      sort,
      size,
      ...(breeds?.size && { breeds: Array.from(breeds) }),
      ...(zipCodes?.size && { zipCodes: Array.from(zipCodes) }),
      age: Object.values(age ?? {}),
    },
  ];
  return {
    queryKey,
    queryFn: async ({
      pageParam,
    }: QueryFunctionContext<[], Nullable<string>>) => {
      return await fetchApiClient.searchDogs({
        breeds,
        zipCodes,
        age,
        size,
        sort,
        pageParam,
      });
    },
  };
};

export const listDogsById = ({ ids }: { ids: Array<string> }) => {
  const queryKey = [
    {
      api: 'listDogsById',
      ids,
    },
  ];
  return {
    queryKey,
    queryFn: async () => {
      return await fetchApiClient.listDogs({ ids });
    },
  };
};
