import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

import logo from "../images/logo.svg";
import PageLayout, { generateHeader } from "../layout/page";
import styled from "styled-components";

const CenterImage = styled.img`
  display: block;
  margin: 0 auto;
  margin-top: 50px;
  width: 70%;
  height: auto;
  max-width: 600px;
`

const NotFound: React.FC<PageProps> = () => {
  return (
    <PageLayout>
      <main>
        <CenterImage src={logo} alt="DevOps Logo" />
        <div>
          <h1>404: Not Found</h1>
          <p>The page you are looking for does not exist.</p>
        </div>
      </main>
    </PageLayout>
  )
}

export default NotFound

export const Head: HeadFC = generateHeader("Not Found", "Page could not be found.");
