import type { GatsbyConfig } from "gatsby";

const siteURL = "https://ops.pydis.wtf";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `PyDis Ops`,
    siteUrl: siteURL,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-styled-components", "gatsby-plugin-image", "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/icon.png"
    }
  }, "gatsby-plugin-mdx", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    }, {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "service_images",
        "path": "./service_images/"
      },
      __key: "service_images"
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "pages",
        "path": "./src/pages/"
      },
      __key: "pages"
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./data/`,
      },
    }, {
      resolve: `gatsby-plugin-json-output`,
      options: {
        siteUrl: siteURL,
        graphQLQuery: `
          {
            services: allServicesYaml {
              nodes {
                slug
                name
                description
                url
                tags
              }
        
              tags: distinct(field: {tags: SELECT})
            }
              
            images: allFile(filter: {sourceInstanceName: {eq: "service_images"}}) {
              nodes {
                name
                childImageSharp {
                  resize(height: 256, quality: 100) {
                    src
                  }
                }
              }
            }
          }
        `,
        serializeFeed: ({ data }: { data: any }) => {
          const serviceImageMap: { [key: string]: string } = {};
          data.images.nodes.forEach((node: any) => {
            serviceImageMap[node.name] = node.childImageSharp.resize.src;
          });

          const services = data.services.nodes.map((service: any) => ({
            ...service,
            image: serviceImageMap[service.slug] ? serviceImageMap[service.slug] : serviceImageMap["unknown"],
          }));

          return services;
        },
        feedFilename: "services",
        nodesPerFeedFile: 100,
      }
    }],
  headers: [
    {
      source: "/*",
      headers: [
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        }
      ]
    }
  ]
};

export default config;
