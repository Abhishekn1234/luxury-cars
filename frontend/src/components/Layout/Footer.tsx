"use client";

import { Container, Row, Col, Button, Image, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "/logo.jpg"; // Replace with your actual logo path
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    scrollToTop();
  };

  return (
   <footer className="pt-5 position-relative" style={{ background: "black" }}>
  <Container>
    <Row className="gy-4 mb-5">
      {/* Logo & About */}
      <Col lg={4} md={6}>
        <div className="mb-3">
          <Image
            src={logo}
            alt="Automart Logo"
            width={150}
            style={{ cursor: "pointer" }}
            onClick={() => handleNavigate("/")}
          />
        </div>
        <p className="text-secondary pe-lg-5">
          Redefining the car buying experience with premium vehicles and unmatched customer
          service since 2010.
        </p>
      </Col>

      {/* Quick Links */}
      <Col lg={2} md={6}>
        <h6 className="text-uppercase fw-bold mb-4">Quick Links</h6>
        <Nav className="flex-column">
          <Nav.Link onClick={() => handleNavigate("/")} className="text-secondary py-1">
            Home
          </Nav.Link>
          <Nav.Link onClick={() => handleNavigate("/about")} className="text-secondary py-1">
            About Us
          </Nav.Link>
          <Nav.Link onClick={() => handleNavigate("/services")} className="text-secondary py-1">
            Services
          </Nav.Link>
          <Nav.Link onClick={() => handleNavigate("/contact")} className="text-secondary py-1">
            Contact
          </Nav.Link>
        </Nav>
      </Col>

      {/* Contact */}
      <Col lg={3} md={6}>
        <h6 className="text-uppercase fw-bold mb-4">Contact Us</h6>
        <p className="text-secondary mb-2">
          <i className="bi bi-geo-alt me-2 text-warning"></i> 123 Luxury St, City
        </p>
        <p className="text-secondary mb-2">
          <i className="bi bi-telephone me-2 text-warning"></i> +971 521775669
        </p>
        <p className="text-secondary">
          <i className="bi bi-envelope me-2 text-warning"></i> info@automart.com
        </p>
      </Col>
    </Row>

    {/* Footer Bottom */}
    <Row className="pt-4 border-top border-secondary align-items-center">
      <Col md={6} className="text-secondary small">
        &copy; {new Date().getFullYear()} Automart. All rights reserved.
      </Col>
      <Col md={6}></Col>
    </Row>

    {/* Scroll-to-top button at top-right of footer */}
    <Button
      onClick={scrollToTop}
      style={{
        position: "absolute",
        top: "55px",   
        right: "50px",
        
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        backgroundColor: "orange",
        border: "none",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: "black",
        fontSize: "1.5rem",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        cursor: "pointer",
        transition: "transform 0.3s, box-shadow 0.3s",
        zIndex: 10,
      }}
      onMouseEnter={(e) => {
        const btn = e.currentTarget;
        btn.style.transform = "translateY(-3px)";
        btn.style.boxShadow = "0 6px 15px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={(e) => {
        const btn = e.currentTarget;
        btn.style.transform = "translateY(0)";
        btn.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
      }}
    >
      <ArrowUp />
    </Button>
  </Container>
</footer>

  );
}
