import * as React from "react"
import { graphql, type HeadFC, type PageProps } from "gatsby"

import PageLayout, { generateHeader } from "../layout/page";

import Service, { ServiceProps, Tag } from "../components/service";
import styled from "styled-components";
import { capitalize } from "../utils";

type IndexPageProps = {
  data: {
    services: {
      nodes: ServiceProps[],
      tags: string[]
    }
  }
}

const ServicesHolder = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const LargerTag = styled(Tag)`
  font-size: 1.2em;
  transition: filter 0.2s, transform 0.2s;
  cursor: pointer;

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
  }
`

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);

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
          ).sort()
            .map((service, index) => (
              <Service key={index} {...service} />
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
        name
        description
        url
        tags
      }

      tags: distinct(field: {tags: SELECT})
    }
  }
`

