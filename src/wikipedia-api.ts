const baseUrl = 'https://en.wikipedia.org/w/api.php';

const joinParams = (params: Record<string, string>) => Object.keys(params).map((key) => `${key}=${params[key]}`).join('&');

export interface Page {
  title: string,
}

interface PagesResult {
  query: {
    search: Page[]
  }
}

// const searchCache = {};
// eslint-disable-next-line import/prefer-default-export
export const searchPages = async (query: string): Promise<PagesResult> => {
  // if (searchCache[query]) {
  //   return Promise.resolve(searchCache[query]);
  // }
  const params = {
    action: 'query',
    list: 'search',
    srsearch: query,
    format: 'json',
  };

  const url = `${baseUrl}?origin=*&${joinParams(params)}`;

  try {
    const response = await fetch(url);
    const result = await response.json() as PagesResult;
    // searchCache[query] = result;
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

// export const parsePage = async (title) => {
//   const params = {
//     action: 'parse',
//     page: title,
//     format: 'json',
//   };

//   const url = `${baseUrl}?origin=*&${joinParams(params)}`;

//   try {
//     const response = await fetch(url);
//     const result = await response.json();
//     return result;
//   } catch (e) {
//     throw new Error(e);
//   }
// };
