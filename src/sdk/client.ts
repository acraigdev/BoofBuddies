export const client = `https://frontend-take-home-service.fetch.com`;

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

  async get({ api, input }: { api: string; input?: Input }) {
    return await fetch(
      `${this.base}${api}?${this.buildQueryString(input?.query)}`,
      {
        credentials: 'include',
        headers,
      },
    );
  }

  async post({ api, input }: { api: string; input?: Input }) {
    return await fetch(
      `${this.base}${api}`, //?${this.buildQueryString(input?.query)}
      {
        method: 'POST',
        ...(input?.body && { body: JSON.stringify(input.body) }),
        credentials: 'include',
        headers,
      },
    );
  }
}

export const fetchApiClient = new Client();
