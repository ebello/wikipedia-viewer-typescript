/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { WikipediaViewerContext } from '../contexts/wikipedia-viewer';
import { parsePage, Page } from '../wikipedia-api';

const usePageParse = (title: string) => {
  const [page, setPage] = useState<Page>();
  const { addToViewingHistory } = useContext(WikipediaViewerContext);

  useEffect(() => {
    let isFresh = true;
    if (title) {
      parsePage(title).then((res) => {
        if (isFresh) {
          addToViewingHistory(title);
          setPage(res);
        }
      }).catch(() => {
        // TODO: handle error here
      });
    }
    // cancel setting state if the component is unmounted
    return () => { isFresh = false; };
  }, [title]);

  return page;
};

const PageViewer = ({ title }: { title: string }): JSX.Element | null => {
  const page = usePageParse(title);

  if (page) {
    return (
      <React.Fragment>
        <Styled.h1 role="heading">{page.title}</Styled.h1>
        {page.pageText && (
          // eslint-disable-next-line react/no-danger
          <div dangerouslySetInnerHTML={{ __html: page.pageText }} />
        )}
      </React.Fragment>
    );
  }

  return null;
};

PageViewer.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageViewer;
