import React from 'react';
import { RenderResult, waitFor } from '@testing-library/react';
import { History } from '@reach/router';
import { renderWithRouter, screen, fireEvent } from '../test-utils';
import { WikipediaViewerContext } from '../contexts/wikipedia-viewer';
import SearchPages from './search-pages';

describe('Search Pages', () => {
  it('renders with no results or history', () => {
    const { baseElement } = renderWithRouter(<SearchPages />);
    fireEvent.focus(screen.getByRole('combobox'));
    expect(baseElement).toMatchSnapshot();
  });

  describe('with viewingHistory', () => {
    let renderResult: RenderResult & { history: History };
    beforeEach(() => {
      renderResult = renderWithRouter(
        <WikipediaViewerContext.Provider
          value={{
            viewingHistory: [
              { timestamp: 1234, title: 'sample title 2' },
              { timestamp: 234, title: 'sample title' },
              { timestamp: 12345, title: 'sample title' },
              { timestamp: 88888, title: 'other' },
            ],
            addToViewingHistory: () => {},
            clearViewingHistory: () => {},
          }}
        >
          <SearchPages />
        </WikipediaViewerContext.Provider>,
      );
    });

    it('renders', () => {
      const { baseElement } = renderResult;
      fireEvent.focus(screen.getByRole('combobox'));
      expect(baseElement).toMatchSnapshot();
    });

    it('only shows unique titles', () => {
      fireEvent.focus(screen.getByRole('combobox'));
      expect(screen.getAllByRole('option')).toHaveLength(3);
    });

    it('sorts by most recent first', () => {
      fireEvent.focus(screen.getByRole('combobox'));
      const options = screen.getAllByRole('option');
      expect(options[0]).toHaveTextContent('other');
      expect(options[1]).toHaveTextContent('sample title');
      expect(options[2]).toHaveTextContent('sample title 2');
    });

    it('filters by search query', async () => {
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'ot' } });
      await waitFor(() => {
        const options = screen.getAllByRole('option');
        expect(options).toHaveLength(1);
        expect(options[0]).toHaveTextContent('other');
      });
    });

    it('navigates to the page', () => {
      fireEvent.click(screen.getByText('other'));
      const { history } = renderResult;
      expect(history.location.pathname).toBe('/wiki/other');
    });
  });
});
