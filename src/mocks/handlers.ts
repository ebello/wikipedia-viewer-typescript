/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';

const handlers = [
  // 'https://en.wikipedia.org/w/api.php?origin=*&action=parse&page=testing&format=json'
  rest.get('https://en.wikipedia.org/w/api.php', (req, res, ctx) => {
    const action = req.url.searchParams.get('action');
    const page = req.url.searchParams.get('page');

    if (action === 'parse' && page === 'testing') {
      return res(ctx.json({ parse: { title: 'testing', text: { '*': '<p>body text</p>' } } }));
    }
    return res(ctx.json(null));
  }),
];

export default handlers;
