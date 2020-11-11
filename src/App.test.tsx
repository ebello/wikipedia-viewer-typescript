import React from 'react';
import { renderWithRouter } from './test-utils';
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
