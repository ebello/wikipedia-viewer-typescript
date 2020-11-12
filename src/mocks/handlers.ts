/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';

const handlers = [
  // 'https://en.wikipedia.org/w/api.php?origin=*&action=parse&page=testing&format=json'
  rest.get('https://en.wikipedia.org/w/api.php', (req, res, ctx) => {
    const action = req.url.searchParams.get('action');
    const page = req.url.searchParams.get('page');
    const query = req.url.searchParams.get('srsearch');

    if (action === 'parse' && page === 'testing') {
      return res(ctx.json({ parse: { title: 'testing', text: { '*': '<p>body text</p>' } } }));
    }
    if (action === 'query' && query === 'test') {
      return res(ctx.json({ query: { search: [{ title: 'test' }, { title: 'testing' }] } }));
    }
    return res(ctx.json(null));
  }),
];

export default handlers;
