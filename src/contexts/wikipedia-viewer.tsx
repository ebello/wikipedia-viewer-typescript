import React, { useState, useEffect, ReactNode } from 'react';
import PropTypes from 'prop-types';

interface ViewingHistoryItem {
  timestamp: number,
  title: string,
}

interface WikipediaContextValue {
  readonly viewingHistory: ViewingHistoryItem[],
  addToViewingHistory: (title: string) => void,
  clearViewingHistory: () => void,
}

type ContextProps = {
  children: ReactNode,
};

const WikipediaViewerContext = React.createContext<WikipediaContextValue>({
  viewingHistory: [],
  addToViewingHistory: () => null,
  clearViewingHistory: () => null,
});

const WikipediaViewer = ({ children }: ContextProps): JSX.Element => {
  const viewingHistoryStr = window?.localStorage.getItem('viewingHistory');
  const defaultHistory = JSON.parse(viewingHistoryStr || '') as ViewingHistoryItem[] || [];
  const [viewingHistory, setViewingHistory] = useState(defaultHistory);

  const addToViewingHistory = (title: string) => {
    setViewingHistory([...viewingHistory, {
      timestamp: Date.now(),
      title,
    }]);
  };

  const clearViewingHistory = () => setViewingHistory([]);

  useEffect(() => {
    window.localStorage.setItem('viewingHistory', JSON.stringify(viewingHistory));
  }, [viewingHistory]);

  return (
    <WikipediaViewerContext.Provider
      value={{
        viewingHistory,
        addToViewingHistory,
        clearViewingHistory,
      }}
    >
      {children}
    </WikipediaViewerContext.Provider>
  );
};

WikipediaViewer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default WikipediaViewer;

export { WikipediaViewerContext };
