import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand variant="primary" as={Link} to="/dashboard">
          bcycling
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="topbar-nav" />
        <Navbar.Collapse id="topbar-nav">
          <Nav>
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/myroutes">
              My Routes
            </Nav.Link>
            <Nav.Link as={Link} to="/friends">
              Friends
            </Nav.Link>
            <Nav.Link as={Link} to="/to_review">
              Requests
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/login">
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Topbar;
