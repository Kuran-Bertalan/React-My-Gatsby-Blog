import { GatsbyNode } from 'gatsby';
import { resolve } from 'path';
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode });

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
}) => {
  const { createPage } = actions;

  const allMarkdown: {
    errors?: any;
    data?: { allMarkdownRemark: { nodes: { fields: { slug?: string } }[] } };
  } = await graphql(`
    query allMarkdownQuery {
      allMarkdownRemark(limit: 1000) {
        nodes {
          fields {
            slug
          }
        }
      }
    }
  `);

  allMarkdown.data?.allMarkdownRemark.nodes.forEach((node) => {
    const { slug } = node.fields;
    if (!slug) return;

    // Type-safe `createPage` call.
    createPage({
      path: slug,
      component: resolve(__dirname, './src/templates/blog-post.tsx'),
      context: {
        slug,
      },
    });
  });
};
