import { fetchApiClient } from './client';

export const login = async (name: string, email: string) => {
  return await fetchApiClient.post({
    api: '/auth/login',
    input: {
      body: {
        name,
        email,
      },
    },
  });
};

export const logout = async () => {
  return await fetchApiClient.post({ api: '/auth/logout' });
};
