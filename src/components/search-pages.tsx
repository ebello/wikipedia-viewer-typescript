/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from '@reach/router';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';
import { matchSorter } from 'match-sorter';
import { useThrottle } from 'use-throttle';
import { WikipediaViewerContext } from '../contexts/wikipedia-viewer';
import ClearHistory from './clear-history';
import { searchPages, Page } from '../wikipedia-api';

const usePageSearch = (searchTerm: string) => {
  // throttle the search term to enforce max number of times API can be called
  const throttledTerm = useThrottle(searchTerm, 100);
  const { viewingHistory } = useContext(WikipediaViewerContext);
  const [pages, setPages] = useState<Page[]>([]);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    let isFresh = true;
    // show most recently visited first
    const sortedHistory = [...viewingHistory].sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
    const uniqueHistoryTitles = Array.from(new Set(sortedHistory.map((h) => h.title)));

    if (searchTerm.trim() !== '') {
      const filteredHistory = matchSorter(uniqueHistoryTitles, searchTerm);
      setHistory(filteredHistory);
      searchPages(searchTerm).then((res) => {
        if (isFresh && res.query) {
          setPages(res.query.search);
        }
      }).catch(() => {
        // TODO: handle error here
      });
    } else {
      setHistory(uniqueHistoryTitles);
    }
    // cancel setting state if the component is unmounted
    return () => { isFresh = false; };
  }, [throttledTerm, viewingHistory]);

  return { pages, history };
};

const SearchPages = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('');
  const { pages, history } = usePageSearch(searchTerm);
  const navigate = useNavigate();

  return (
    <Combobox
      openOnFocus
      onSelect={(item) => navigate(`/wiki/${item}`)}
      sx={{
        display: ['block', 'inline-block'],
        width: ['100%', '50%'],
      }}
    >
      <ComboboxInput
        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(ev.target.value)}
        aria-label="Pages"
        selectOnClick
        sx={{
          width: '100%',
          fontSize: [2, 4],
        }}
        placeholder="Search Wikipedia"
      />
      {(pages.length > 0 || history.length > 0) && (
        <ComboboxPopover>
          <ComboboxList>
            {history.length > 0 && (
              <React.Fragment>
                <Styled.h5 sx={{ my: 2, ml: 2, color: 'primary' }}>
                  Recent history
                  <ClearHistory />
                </Styled.h5>
                {history.map((title) => <ComboboxOption key={title} value={title} />)}
              </React.Fragment>
            )}
            {pages.length > 0 && (
              <React.Fragment>
                <Styled.h5 sx={{ my: 1, ml: 2, color: 'primary' }}>Search results</Styled.h5>
                {pages.map(({ title }) => <ComboboxOption key={title} value={title} />)}
              </React.Fragment>
            )}
          </ComboboxList>
        </ComboboxPopover>
      )}
    </Combobox>
  );
};

export default SearchPages;
