import React, { ReactNode } from 'react';
import { render, RenderResult, RenderOptions } from '@testing-library/react';
import {
  createHistory,
  createMemorySource,
  LocationProvider,
  History,
} from '@reach/router';
import { ThemeProvider } from 'theme-ui';
import theme from './theme';

type ProviderProps = {
  children: ReactNode,
};

const AllTheProviders: React.FunctionComponent<ProviderProps> = ({ children }: ProviderProps) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
): RenderResult => render(<AllTheProviders>{ui}</AllTheProviders>, { ...options });

export const renderWithRouter = (
  ui: React.ReactElement,
  { route = '/', history = createHistory(createMemorySource(route)) } = {},
): RenderResult & { history: History } => ({
  ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
  // adding `history` to the returned utilities to allow us
  // to reference it in our tests (just try to avoid using
  // this to test implementation details).
  history,
});

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };

export const sleep = (ms: number): Promise<unknown> => new Promise(
  (resolve) => setTimeout(resolve, ms),
);
