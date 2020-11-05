import { get } from './rest-api';

const baseUrl = 'https://en.wikipedia.org/w/api.php';

const joinParams = (params: Record<string, string>) => Object.keys(params).map((key) => `${key}=${params[key]}`).join('&');

export interface Page {
  title: string,
  pageText?: string,
}

interface PagesResult {
  query: {
    search: Page[]
  }
}

const searchCache: Record<string, PagesResult> = {};
export const searchPages = async (query: string): Promise<PagesResult> => {
  if (searchCache[query]) {
    return Promise.resolve(searchCache[query]);
  }
  const params = {
    action: 'query',
    list: 'search',
    srsearch: query,
    format: 'json',
  };

  const url = `${baseUrl}?origin=*&${joinParams(params)}`;

  try {
    const result = await get<PagesResult>(url);
    searchCache[query] = result;
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

interface PageResult {
  parse: {
    title: string,
    text: Record<string, string>,
  }
}

export const parsePage = async (title: string): Promise<Page> => {
  const params = {
    action: 'parse',
    page: title,
    format: 'json',
  };

  const url = `${baseUrl}?origin=*&${joinParams(params)}`;

  try {
    const { parse } = await get<PageResult>(url);
    return {
      title: parse.title,
      pageText: parse.text['*'],
    };
  } catch (e) {
    throw new Error(e);
  }
};
