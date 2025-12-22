import { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

export default function AppNavbar() {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded(!expanded);
  const closeNav = () => setExpanded(false);

  return (
    <Navbar
      expand="lg"
      expanded={expanded}
      onToggle={handleToggle}
      collapseOnSelect
      variant="dark"
      className="py-2 sticky-top shadow-sm"
      style={{ backgroundColor: "black", opacity:"1" }} // Slightly transparent
    >
      <Container>
        {/* Brand Logo */}
        <Navbar.Brand as={Link} to="/" onClick={closeNav}>
          <img 
            src="/logo.jpg" 
            alt="Used Car Logo" 
            height="40" 
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        {/* Mobile Toggle Button */}
        <Navbar.Toggle aria-controls="usedcar-navbar" />

        {/* Collapsible Content */}
        <Navbar.Collapse id="usedcar-navbar">
          <Nav className="ms-auto align-items-center flex-nowrap gap-3">
            {/* Links in same line */}
            <Nav.Link as={NavLink} to="/about" onClick={closeNav}>
              About Us
            </Nav.Link>
            <Nav.Link as={NavLink} to="/services" onClick={closeNav}>
              Services
            </Nav.Link>
            <Nav.Link as={NavLink} to="/collections" onClick={closeNav}>
              Collections
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact" onClick={closeNav}>
              Contact Us
            </Nav.Link>

            {/* Action Buttons */}
            <div className="d-flex flex-row gap-2 ms-3">
              <Link to="/collections" className="btn btn-outline-light px-4">
                Buy Car
              </Link>
              <Link to="/selling" className="btn btn-warning px-4 fw-bold">
                Sell Car
              </Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
