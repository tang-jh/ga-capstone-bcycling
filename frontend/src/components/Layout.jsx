import React from "react";
import Topbar from "./Topbar";
import { Container } from "react-bootstrap";

const Layout = (props) => {
  console.log("PROPS CHILDREN:", props.children);
  console.log("Child name", props.children.props.children);
  return (
    <Container>
      <Topbar />
      <div>{props.children}</div>
    </Container>
  );
};

export default Layout;
