import type { Nullable } from '../utils/typeHelpers';
import { fetchApiClient } from './client';

export const breeds = async () => {
  return await fetchApiClient.get({ api: '/dogs/breeds' });
};

export const searchDogs = async ({
  breeds,
  zipCodes,
  age,
  size,
  from,
  sort,
}: {
  breeds?: Set<string>;
  zipCodes?: Set<string>;
  age?: Nullable<{ min: Nullable<number>; max: Nullable<number> }>;
  size?: string;
  from?: string;
  sort?: string;
}) => {
  const getIds = await fetchApiClient.get({
    api: '/dogs/search',
    input: {
      body: {
        ...(breeds?.size && { breeds }),
        ...(zipCodes?.size && { zipCodes }),
        ...((age?.max || age?.min) && {
          ...(age.min && { ageMin: age.min }),
          ...(age.max && { ageMax: age.max }),
        }),
      },
      query: {
        ...(size && { size }),
        ...(from && { from }),
        ...(sort && { sort }),
      },
    },
  });

  // Rather than handling via linked queries, keep the search and dogs by id together
  // So we only have to worry about pagination handling with a single
  return await listDogs({ ids: getIds.resultIds });
};

export const listDogs = async ({ ids }: { ids: Array<string> }) => {
  return await fetchApiClient.post({ api: '/dogs', input: { body: ids } });
};

export const match = async ({ ids }: { ids: Array<string> }) => {
  return await fetchApiClient.post({
    api: '/dogs/match',
    input: { body: ids },
  });
};
