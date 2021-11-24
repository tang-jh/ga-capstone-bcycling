import React from "react";
import Topbar from "./Topbar";
import { Container } from "react-bootstrap";

const Layout = (props) => {
  return (
    <Container>
      <Topbar />
      <div>{props.children}</div>
    </Container>
  );
};

export default Layout;
