import React from 'react';
import { render, screen, fireEvent } from '../test-utils';
// import { render, screen } from '@testing-library/react';
import { WikipediaViewerContext } from '../contexts/wikipedia-viewer';
import ClearHistory from './clear-history';

describe('Clear History', () => {
  it('renders null with no context', () => {
    const { container } = render(<ClearHistory />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders null with no viewingHistory', () => {
    const { container } = render(
      <WikipediaViewerContext.Provider
        value={{
          viewingHistory: [],
          addToViewingHistory: () => {},
          clearViewingHistory: () => {},
        }}
      >
        <ClearHistory />
      </WikipediaViewerContext.Provider>,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders with viewingHistory', () => {
    const { asFragment } = render(
      <WikipediaViewerContext.Provider
        value={{
          viewingHistory: [{ timestamp: 12345, title: 'sample title' }],
          addToViewingHistory: () => {},
          clearViewingHistory: () => {},
        }}
      >
        <ClearHistory />
      </WikipediaViewerContext.Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('calls clear viewing history on click', () => {
    const clearViewingHistory = jest.fn();
    render(
      <WikipediaViewerContext.Provider
        value={{
          viewingHistory: [{ timestamp: 12345, title: 'sample title' }],
          addToViewingHistory: () => {},
          clearViewingHistory,
        }}
      >
        <ClearHistory />
      </WikipediaViewerContext.Provider>,
    );
    fireEvent.click(screen.getByText('Clear history'));
    expect(clearViewingHistory).toHaveBeenCalled();
  });

  it('calls clear viewing history on key up', () => {
    const clearViewingHistory = jest.fn();
    render(
      <WikipediaViewerContext.Provider
        value={{
          viewingHistory: [{ timestamp: 12345, title: 'sample title' }],
          addToViewingHistory: () => {},
          clearViewingHistory,
        }}
      >
        <ClearHistory />
      </WikipediaViewerContext.Provider>,
    );
    fireEvent.keyUp(screen.getByText('Clear history'));
    expect(clearViewingHistory).toHaveBeenCalled();
  });
});
