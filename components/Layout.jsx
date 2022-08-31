import React from "react";
import Head from "next/head";
import Header from "./Header";
import SocialMedia from "./SocialMedia";

/* DISPLAY BASE DEL BLOG */

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Eaglance</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="author" content="Francisco Trujillo" />
        <meta
          name="Eaglance, the official economics blog by Lycokat"
          content="Eaglance, the official economics blog made with NextJS and GraphQL. By Lycokat"
        />
      </Head>
      <Header />
      {children}
      <SocialMedia />
    </>
  );
};

export default Layout;
