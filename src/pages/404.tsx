import * as React from 'react';
import { Link, HeadFC } from 'gatsby';
import { Code, Heading, Page, Paragraph } from '../styles/404.styles';

const NotFoundPage = () => {
  return (
    <Page>
      <Heading>Page not found</Heading>
      <Paragraph>
        Sorry 😔, we couldn’t find what you were looking for.
        <br />
        {process.env.NODE_ENV === 'development' ? (
          <>
            <br />
            Try creating a page in <Code>src/pages/</Code>.
            <br />
          </>
        ) : null}
        <br />
        <Link to="/">Go home</Link>.
      </Paragraph>
    </Page>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>;
