import React from 'react';
import {
  renderWithRouter, fireEvent, screen, waitFor,
} from './test-utils';
import App, { WikiPage } from './App';

describe('WikiPage', () => {
  it('renders', () => {
    const { asFragment } = renderWithRouter(<WikiPage />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with a page title', () => {
    const { asFragment } = renderWithRouter(<WikiPage pageTitle="testing" />);
    expect(asFragment()).toMatchSnapshot();
  });

  describe('viewing history', () => {
    beforeEach(() => {
      window.localStorage.removeItem('viewingHistory');
    });

    it('default history is blank', async () => {
      renderWithRouter(<WikiPage />);
      fireEvent.focus(screen.getByRole('combobox'));
      await waitFor(() => expect(screen.queryAllByRole('option')).toHaveLength(0));
    });

    it('default history comes from localstorage if provided', async () => {
      window.localStorage.setItem('viewingHistory', JSON.stringify([{ timestamp: 12345, title: 'sample title' }]));
      renderWithRouter(<WikiPage />);
      fireEvent.focus(screen.getByRole('combobox'));
      await waitFor(() => {
        expect(screen.getAllByRole('option')).toHaveLength(1);
        expect(screen.getByText('Recent history')).toBeInTheDocument();
      });
    });

    it('adds to viewing history', async () => {
      jest.useFakeTimers('modern');
      jest.setSystemTime(new Date('2020-01-01').getTime());
      renderWithRouter(<WikiPage pageTitle="testing" />);
      fireEvent.focus(screen.getByRole('combobox'));
      await waitFor(() => expect(screen.getByText('Recent history')).toBeInTheDocument());
      expect(JSON.parse(window.localStorage.getItem('viewingHistory') || '')).toEqual([{ timestamp: 1577836800150, title: 'testing' }]);
      jest.useRealTimers();
    });

    it('clears viewing history', async () => {
      renderWithRouter(<WikiPage pageTitle="testing" />);
      fireEvent.focus(screen.getByRole('combobox'));
      await waitFor(() => fireEvent.click(screen.getByText('Clear history')));
      await waitFor(() => expect(screen.queryByText('Recent history')).not.toBeInTheDocument());
    });
  });
});

describe('App', () => {
  it('renders home page', () => {
    const { container } = renderWithRouter(<App />);
    expect(container.querySelector('main')).toBeNull();
  });

  it('renders page url', () => {
    const { container } = renderWithRouter(<App />, { route: '/wiki/testing' });
    expect(container.querySelector('main')).not.toBeNull();
  });
});
