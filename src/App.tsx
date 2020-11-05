/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Styled, Container } from 'theme-ui';
import PropTypes from 'prop-types';
import { Router, RouteComponentProps } from '@reach/router';
import { Global } from '@emotion/core';
import WikipediaViewer from './contexts/wikipedia-viewer';
import SearchPages from './components/search-pages';
import PageViewer from './components/page-viewer';

interface WikiProps extends RouteComponentProps {
  pageTitle?: string,
}

const WikiPage = ({ pageTitle }: WikiProps) => (
  <WikipediaViewer>
    <Styled.root>
      <Global
        styles={{
          html: {
            boxSizing: 'border-box',
          },
          '*, *:before, *:after': {
            boxSizing: 'inherit',
          },
          body: {
            margin: 0,
          },
        }}
      />
      <Container sx={{ pt: [0, 0] }}>
        <header
          sx={{
            position: 'sticky',
            top: 0,
            bg: 'background',
            py: [3, 4],
          }}
        >
          <SearchPages />
        </header>
        <main>
          {pageTitle && <PageViewer title={pageTitle} />}
        </main>
      </Container>
    </Styled.root>
  </WikipediaViewer>
);

WikiPage.propTypes = {
  pageTitle: PropTypes.string,
};
WikiPage.defaultProps = {
  pageTitle: '',
};

const Wiki = (): JSX.Element => (
  <Router>
    <WikiPage path="/" />
    <WikiPage path=":pageTitle" />
  </Router>
);

export default Wiki;
