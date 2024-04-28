import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

import PageLayout, { generateHeader } from "../layout/page";


const IndexPage: React.FC<PageProps> = () => {
  return (
    <PageLayout header="Available Services" subheader="Below are all the internal services for Python Discord">
      <main>
      </main>
    </PageLayout>
  )
}

export default IndexPage

export const Head: HeadFC = generateHeader("PyDis Ops", "Internal services for Python Discord.");
