import React from "react";
import Navbar from "./Navbar";

const Layout = (props) => {
  return (
    <div>
      <Navbar />
      <div>{props.children}</div>
    </div>
  );
};

export default Layout;
