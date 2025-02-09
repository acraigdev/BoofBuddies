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
  breeds?: Array<string>;
  zipCodes?: Array<string>;
  ageMin?: number;
  ageMax?: number;
  size?: string;
  from?: string;
  sort?: string;
}) => {
  const getIds = await fetchApiClient.get({
    api: '/dogs/search',
    input: {
      body: { breeds, zipCodes, ageMin, ageMax },
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
