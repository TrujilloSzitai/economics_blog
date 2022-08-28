import React from "react";
import Header from "./Header";
import SocialMedia from './SocialMedia'

/* DISPLAY BASE DEL BLOG */

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <SocialMedia />
    </>
  );
};

export default Layout