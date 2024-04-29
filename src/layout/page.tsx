import * as React from "react";
import styled, { createGlobalStyle } from "styled-components";

import logo from "../images/logo.svg";
import logoPng from "../images/logo.png";

import tile from "../images/banner_pattern.svg";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: url(${tile});
    background-size: 128px;
    font-family: 'Titillium Web', Arial, sans-serif;
    margin-left: 5vw;
    margin-right: 5vw;
    color: #fff;
    margin-bottom: 50px;
  }

  a {
    color: #fff;
    text-decoration: underline;
  }
`;

const CenterImage = styled.img`
  display: block;
  margin: 0 auto;
  margin-top: 50px;
  width: 70%;
  height: auto;
  max-width: 600px;
`

const Header = styled.h1`
  font-size: 3em;
  margin: 0;

  @media (max-width: 600px) {
    font-size: 2em;
  }
`

const SubHeader = styled.h2`
margin: 0;
line-height: 1em;
`

const HeaderDiv = styled.div`
  margin-bottom: 20px;
`

type PageLayoutProps = {
  children: React.ReactNode;
  header?: string;
  subheader?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, header, subheader }) => {
  return (
    <>
      <GlobalStyle />
      <main>
        <CenterImage src={logo} alt="DevOps Logo" />
        <HeaderDiv>
          {header && <Header>{header}</Header>}
          {subheader && <SubHeader>{subheader}</SubHeader>}
        </HeaderDiv>
        {children}
      </main >
    </>
  );
}

export default PageLayout;

export const generateHeader = (title: string, description: string) => {
  return () => <>
    <html lang="en" />
    <title>{title} &bull; PyDis Ops</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link href="https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap" rel="stylesheet"></link>
    <meta name="description" content={description} />
    <meta name="og:description" content={description} />
    <meta name="og:title" content={title} />
    <meta name="og:image" content={logoPng} />
    <meta name="theme-color" content="#a0cef3" />
  </>;
}

