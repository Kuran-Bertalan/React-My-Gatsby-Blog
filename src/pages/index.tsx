import * as React from 'react';
import { graphql, HeadFC } from 'gatsby';

import Layout from '../components/layout';
import Seo from '../components/seo';
import { BlogLink, BlogTitle } from '../styles/index.styles';

const IndexPage = ({ data }: any) => (
  <Layout>
    <Seo title="Home" />
    <div>
      <h2>Daily posts</h2>
      {data.allMarkdownRemark.edges.map(({ node }: any) => (
        <div key={node.id}>
          <BlogLink to={node.fields.slug}>
            <BlogTitle>
              {node.frontmatter.title} - {node.frontmatter.date}
            </BlogTitle>
          </BlogLink>
          <p>{node.excerpt}</p>
        </div>
      ))}
    </div>
    <h4>Posted dates counter: {data.allMarkdownRemark.totalCount}</h4>
  </Layout>
);

export default IndexPage;
/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */

export const Head: HeadFC = () => <title>Home Page</title>;

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            description
            title
            date
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;
