import * as React from "react"
import { graphql, type HeadFC, type PageProps } from "gatsby"

import PageLayout, { generateHeader } from "../layout/page";

import Service, { ServiceProps } from "../components/service";
import styled from "styled-components";
import { capitalize } from "../utils";

type IndexPageProps = {
  data: {
    services: {
      nodes: ServiceProps[],
      tags: string[]
    },
    images: {
      nodes: {
        name: string,
        childImageSharp: {
          resize: {
            src: string
          }
        }
      }[]
    }
  }
}

const ServicesHolder = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px;
  margin-top: 20px;
`;

const LargerTag = styled.span`
  color: #000;
  font-weight: 600;
  font-family: monospace;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  display: inline-block;
  font-size: 1.2em;
  transition: filter 0.2s, transform 0.2s;
  cursor: pointer;
  background-color: rgb(195, 195, 245);
  border: 2px solid black;

  @media (max-width: 600px) {
    font-size: 1em;
  }

  &:hover {
    filter: brightness(0.9);
    transform: translateY(-2px);
  
  }

  &.active {
    background-color: #333;
    color: #fff;
    border: 2px solid #fff;
  }
`

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);


  const serviceImageMap: Record<string, string> = {};

  data.images.nodes.forEach((node) => {
    serviceImageMap[node.name] = node.childImageSharp.resize.src;
  });

  console.log(data.services)

  return (
    <PageLayout header="Available Services" subheader="Below are all the internal services for Python Discord">
      <main>
        <div>
          <LargerTag onClick={() => setSelectedTag(null)} className={selectedTag == null ? "active" : ""}>All</LargerTag>
          {data.services.tags.map((tag, index) => (
            <LargerTag onClick={() => setSelectedTag(tag)} className={tag == selectedTag ? "active" : ""} key={index}>{capitalize(tag)}</LargerTag>
          ))}
        </div>
        <ServicesHolder>
          {data.services.nodes.sort().filter(
            service => selectedTag ? service.tags.includes(selectedTag) : true
          ).sort((a, b) => a.name.localeCompare(b.name))
            .map((service, index) => (
              <Service key={index} {...service} image={serviceImageMap[service.slug] ? serviceImageMap[service.slug] : serviceImageMap["unknown"]} />
            ))}
        </ServicesHolder>

      </main>
    </PageLayout>
  )
}

export default IndexPage

export const Head: HeadFC = generateHeader("Home", "Internal services for Python Discord.");

export const query = graphql`
  query {
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
          resize(height: 80, quality: 100) {
            src
          }
        }
      }
    }
  }
`

