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
    queryFn: async () => await fetchApiClient.get({ api: '/dogs/breeds' }),
  };
};

export const searchDogs = ({
  breeds,
  zipCodes,
  age,
  size,
  from,
  sort,
}: {
  breeds?: Set<string>;
  zipCodes?: Set<string>;
  age?: Nullable<{ min?: Nullable<number>; max?: Nullable<number> }>;
  size?: string;
  from?: string;
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
    queryFn: async () => {
      const getIds = await fetchApiClient.get({
        api: '/dogs/search',
        input: {
          query: {
            ...(breeds?.size && { breeds: [...breeds].join(',') }),
            ...(zipCodes?.size && { zipCodes: [...zipCodes].join(',') }),
            ...((age?.max || age?.min) && {
              ...(age.min && { ageMin: String(age.min) }),
              ...(age.max && { ageMax: String(age.max) }),
            }),
            ...(size && { size }),
            ...(from && { from }),
            ...(sort && { sort }),
          },
        },
      });

      // Rather than handling via linked queries, keep the search and dogs by id together
      // So we only have to worry about pagination handling with a single
      return await fetchApiClient.post({
        api: '/dogs',
        input: { body: getIds.resultIds },
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
      return await fetchApiClient.post({ api: '/dogs', input: { body: ids } });
    },
  };
};
