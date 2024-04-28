import * as React from "react"
import { Link, type HeadFC, type PageProps } from "gatsby"

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
    <PageLayout header="404: Not Found" subheader="The page you requested could not be found">
      <p>Try going back to the <Link to="/">home page</Link>.</p>
    </PageLayout>
  )
}

export default NotFound

export const Head: HeadFC = generateHeader("Not Found", "Page could not be found.");
