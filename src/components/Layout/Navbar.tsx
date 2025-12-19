import { Navbar, Nav, Container, Button } from "react-bootstrap";

export default function AppNavbar() {
  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      fixed="top"
      className="shadow-lg py-3"
    >
      <Container>
        {/* Logo */}
        <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
          <img
            src="/pexels-glenda-thompson-47135804-35061378.jpg"   // place logo in public folder
            alt="Used Car Logo"
            height="40"
          />
          <span className="fw-bold fs-5">AutoMart</span>
        </Navbar.Brand>

        {/* Mobile Toggle */}
        <Navbar.Toggle aria-controls="usedcar-navbar" />

        {/* Menu */}
        <Navbar.Collapse id="usedcar-navbar">
          <Nav className="ms-auto align-items-lg-center gap-lg-4">
            <Nav.Link href="#about" className="fw-semibold">
              About Us
            </Nav.Link>

            <Nav.Link href="#services" className="fw-semibold">
              Services
            </Nav.Link>

            <Nav.Link href="#collections" className="fw-semibold">
              Collections
            </Nav.Link>

            <Nav.Link href="#contact" className="fw-semibold">
              Contact Us
            </Nav.Link>

            {/* Action Buttons */}
            <div className="d-flex gap-2 ms-lg-3 mt-3 mt-lg-0">
              <Button variant="outline-light" className="px-4">
                Buy Car
              </Button>

              <Button variant="warning" className="px-4 fw-semibold">
                Sell Car
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

