import type { Nullable } from '../utils/typeHelpers';
import type { Dog, SearchDogResult } from './types';

export const client = 'https://frontend-take-home-service.fetch.com';

interface Input {
  body?: Record<string, any>;
  query?: Record<string, string>;
}

const headers = {
  'Content-Type': 'application/json',
};

class Client {
  private base: string;

  constructor() {
    this.base = 'https://frontend-take-home-service.fetch.com';
  }

  buildQueryString(queries?: Record<string, string>) {
    if (!queries) return '';
    return new URLSearchParams(queries).toString();
  }

  // API helpers - Dog
  async listBreeds(): Promise<Array<string>> {
    return await this.send({
      api: '/dogs/breeds',
    });
  }

  async listDogs({ ids }: { ids: Array<string> }): Promise<Array<Dog>> {
    return await this.send({
      api: '/dogs',
      method: 'POST',
      input: { body: ids },
    });
  }

  async searchDogs({
    breeds,
    zipCodes,
    age,
    size,
    sort,
    pageParam,
  }: {
    breeds?: Set<string>;
    zipCodes?: Set<string>;
    age?: Nullable<{ min?: Nullable<number>; max?: Nullable<number> }>;
    size?: string;
    sort?: string;
    pageParam?: Nullable<string>;
  }): Promise<SearchDogResult> {
    const res = await this.send({
      api: '/dogs/search',
      pageParam,
      input: {
        query: {
          ...(breeds?.size && { breeds: [...breeds].join(',') }),
          ...(zipCodes?.size && { zipCodes: [...zipCodes].join(',') }),
          ...((age?.max || age?.min) && {
            ...(age.min && { ageMin: String(age.min) }),
            ...(age.max && { ageMax: String(age.max) }),
          }),
          ...(size && { size }),
          ...(sort && { sort }),
        },
      },
    });

    // Rather than handling via linked queries, keep the search and dogs by id together
    // So we only have to worry about pagination handling with a single
    return {
      dogs: await this.listDogs({ ids: res.resultIds }),
      next: res.next,
    };
  }

  // API helpers - login
  async login({ email, name }: { email: string; name: string }) {
    return await this.send({
      api: '/auth/login',
      method: 'POST',
      input: { body: { email, name } },
    });
  }

  async logout() {
    return await this.send({
      api: '/auth/logout',
      method: 'POST',
    });
  }

  // Fetch handler
  async send({
    api,
    input,
    pageParam,
    method,
  }: {
    api: string;
    input?: Input;
    pageParam?: Nullable<string>;
    method?: 'POST' | 'GET';
  }) {
    return await fetch(
      pageParam
        ? `${this.base}${pageParam}`
        : `${this.base}${api}?${this.buildQueryString(input?.query)}`,
      {
        ...(method && { method }),
        ...(input?.body && { body: JSON.stringify(input.body) }),
        credentials: 'include',
        headers,
      },
    ).then((res: Response) => {
      if (res.status === 401) {
        window.location.replace('?expired=true');
      }
      if (res.status !== 200) {
        return res.text().then((text: string) => {
          throw new Error(text);
        });
      }
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        return res.json();
      } else {
        return res.text();
      }
    });
  }
}

export const fetchApiClient = new Client();
