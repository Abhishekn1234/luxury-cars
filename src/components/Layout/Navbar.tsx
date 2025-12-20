import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AppNavbar() {
  return (
    <Navbar
      expand="lg"
      // variant="dark"               // 👈 makes toggle icon white
      className="border-0 bg-dark bg-opacity-100 py-2"
    >
      <Container>
        {/* Logo */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center gap-2 text-white"
        >
          <img
            src="/pexels-glenda-thompson-47135804-35061378.jpg"
            alt="Used Car Logo"
            height="40"
          />
          <span className="fw-bold fs-5">AutoMart</span>
        </Navbar.Brand>

        {/* Toggle */}
        <Navbar.Toggle aria-controls="usedcar-navbar" />

        {/* Menu */}
        <Navbar.Collapse id="usedcar-navbar">
          <Nav className="ms-auto align-items-lg-center gap-lg-4 text-center">
            <Nav.Link
              as={Link}
              to="/about"
              className="fw-semibold text-white"
            >
              About Us
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/services"
              className="fw-semibold text-white"
            >
              Services
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/collections"
              className="fw-semibold text-white"
            >
              Collections
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/contact"
              className="fw-semibold text-white"
            >
              Contact Us
            </Nav.Link>

            {/* Action Buttons */}
            <div className="d-flex gap-2 ms-lg-3 mt-3 mt-lg-0 justify-content-center">
              <Button
                // as={Link}
                // to="/buy"
                variant="outline-light"
                className="px-4"
              >
                Buy Car
              </Button>

              <Button
                // // as={Link}
                // to="/sell"
                variant="warning"
                className="px-4 fw-semibold"
              >
                Sell Car
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
