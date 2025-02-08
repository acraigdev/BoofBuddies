import { fetchApiClient } from './client';

export const breeds = async () => {
  return await fetchApiClient.get({ api: '/dogs/breeds' });
};

export const searchDogs = async ({
  breeds,
  zipCodes,
  ageMin,
  ageMax,
  size,
  from,
  sort,
}: {
  breeds: Array<string>;
  zipCodes: Array<string>;
  ageMin: number;
  ageMax: number;
  size: string;
  from: string; //?
  sort: string;
}) => {
  return await fetchApiClient.get({
    api: '/dogs/search',
    input: {
      body: { breeds, zipCodes, ageMin, ageMax },
      query: { size, from, sort },
    },
  });
};

// TODO: Not sure the purpose of this one
export const dogs = async ({ ids }: { ids: Array<string> }) => {
  return await fetchApiClient.post({ api: '/dogs', input: { body: ids } });
};

export const match = async ({ ids }: { ids: Array<string> }) => {
  return await fetchApiClient.post({
    api: '/dogs/match',
    input: { body: ids },
  });
};
