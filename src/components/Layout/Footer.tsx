"use client";

import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Footer.css"; // Your CSS file

export default function Footer() {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-section text-light" style={{ backgroundColor: "black" }}>
      <Container>
        <Row className="gy-4 mb-5">
          <Col lg={4} md={6}>
            <div className="footer-brand">
              <h3 className="fw-bold text-warning mb-3">
                Automart<span>.</span>
              </h3>
              <p className="text-secondary pe-lg-5">
                Redefining the car buying experience with premium vehicles and unmatched customer
                service since 2010.
              </p>
              <div className="social-links d-flex gap-3">
                <a href="#"><i className="bi bi-facebook"></i></a>
                <a href="#"><i className="bi bi-instagram"></i></a>
                <a href="#"><i className="bi bi-twitter-x"></i></a>
              </div>
            </div>
          </Col>

          <Col lg={2} md={6}>
            <h6 className="text-uppercase fw-bold mb-4 ">Quick Links</h6>
            <ul className="list-unstyled footer-links cursor-pointer">
              <li>
                <p
                  className="footer-link-btn"
                  onClick={() => {
                    navigate("/"); // Home route
                    scrollToTop();
                  }}
                >
                  Home
                </p>
              </li>
              <li>
                <p
                  className="footer-link-btn"
                  onClick={() => {
                    navigate("/about"); // About route
                    scrollToTop();
                  }}
                >
                  About Us
                </p>
              </li>
              <li>
                <p
                  className="footer-link-btn"
                  onClick={() => {
                    navigate("/inventory"); // Inventory route
                    scrollToTop();
                  }}
                >
                  Inventory
                </p>
              </li>
              <li>
                <p
                  className="footer-link-btn"
                  onClick={() => {
                    navigate("/contact"); // Contact route
                    scrollToTop();
                  }}
                >
                  Contact
                </p>
              </li>
            </ul>
          </Col>

          <Col lg={3} md={6}>
            <h6 className="text-uppercase fw-bold mb-4">Support</h6>
            <ul className="list-unstyled footer-links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Financing</a></li>
            </ul>
          </Col>

          <Col lg={3} md={6}>
            <h6 className="text-uppercase fw-bold mb-4">Contact Us</h6>
            <div className="contact-info">
              <p className="text-secondary">
                <i className="bi bi-geo-alt me-2 text-warning"></i> 123 Luxury St, City
              </p>
              <p className="text-secondary">
                <i className="bi bi-telephone me-2 text-warning"></i> +91 98765 43210
              </p>
              <p className="text-secondary">
                <i className="bi bi-envelope me-2 text-warning"></i> info@automart.com
              </p>
            </div>
          </Col>
        </Row>

        <div className="footer-bottom border-top border-secondary pt-4 d-flex justify-content-between align-items-center flex-wrap">
          <p className="text-secondary small mb-0">
            &copy; {new Date().getFullYear()} Automart. All rights reserved.
          </p>
          <Button
            variant="outline-warning"
            className="btn-scroll-top rounded-circle"
            onClick={scrollToTop}
          >
            <i className="bi bi-chevron-up"></i>
          </Button>
        </div>
      </Container>
    </footer>
  );
}
