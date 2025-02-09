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

  async get({ api, input }: { api: string; input?: Input }) {
    return await fetch(
      `${this.base}${api}?${this.buildQueryString(input?.query)}`,
      {
        credentials: 'include',
        headers,
      },
    ).then(processRes);
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
    ).then(processRes);
  }
}

export const fetchApiClient = new Client();

function processRes(res: Response) {
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
}
