import React from 'react';
import {
  render, screen, waitFor, sleep,
} from '../test-utils';
import { WikipediaViewerContext } from '../contexts/wikipedia-viewer';
import PageViewer from './page-viewer';

describe('Page Viewer', () => {
  it('renders', async () => {
    const { asFragment } = render(<PageViewer title="testing" />);
    expect(await screen.findByRole('heading')).toHaveTextContent('testing');
    expect(asFragment()).toMatchSnapshot();
  });

  it('calls addToViewingHistory', async () => {
    const addToViewingHistory = jest.fn();
    render(
      <WikipediaViewerContext.Provider
        value={{
          viewingHistory: [],
          addToViewingHistory,
          clearViewingHistory: () => {},
        }}
      >
        <PageViewer title="testing" />
      </WikipediaViewerContext.Provider>,
    );
    await waitFor(() => expect(addToViewingHistory).toHaveBeenCalled());
  });

  it('does not call addToViewingHistory if unmounted', async () => {
    const addToViewingHistory = jest.fn();
    const { unmount } = render(
      <WikipediaViewerContext.Provider
        value={{
          viewingHistory: [],
          addToViewingHistory,
          clearViewingHistory: () => {},
        }}
      >
        <PageViewer title="testing" />
      </WikipediaViewerContext.Provider>,
    );
    unmount();
    await sleep(1000);
    expect(addToViewingHistory).not.toHaveBeenCalled();
  });
});
