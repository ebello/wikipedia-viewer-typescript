/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Button } from '@theme-ui/components';
import { useContext } from 'react';
import { WikipediaViewerContext } from '../contexts/wikipedia-viewer';

const ClearHistory = (): JSX.Element | null => {
  const { viewingHistory, clearViewingHistory } = useContext(WikipediaViewerContext);

  if (viewingHistory.length > 0) {
    return (
      <Button
        onClick={() => clearViewingHistory()}
        onKeyUp={() => clearViewingHistory()}
        sx={{
          py: 1,
          px: 2,
          fontSize: '85%',
          ml: 2,
          bg: 'bgmuted',
        }}
      >
        Clear history
      </Button>
    );
  }
  return null;
};

export default ClearHistory;
