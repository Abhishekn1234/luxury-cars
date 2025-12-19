import { Container, Row, Col, Image } from "react-bootstrap";
import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      className="bg-white py-5"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <Container>
        <Row className="align-items-center">
          {/* Left Side Image */}
          <Col md={6} className="mb-4 mb-md-0">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/pexels-garret-shields-1929773013-28977814.jpg"
                alt="About Automart"
                fluid
                rounded
                style={{
                  cursor: "pointer",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 25px 50px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.15)";
                }}
              />
            </motion.div>
          </Col>

          {/* Right Side Text */}
          <Col md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2
                className="fw-bold mb-3"
                style={{ lineHeight: "1.2" }}
              >
                About <span className="text-primary fw-bold">Automart</span>
              </h2>
              <p
                className="text-muted mb-4"
                style={{ lineHeight: "1.8" }}
              >
                Automart is your trusted partner in premium used cars. We bring you
                handpicked, quality-checked vehicles that feel brand new. Our mission
                is to deliver reliability, luxury, and true value to every customer.
              </p>

              {/* Stats Line */}
              <Row className="mt-3 text-center text-md-start">
                <Col xs={6} className="mb-3 mb-md-0">
                  <h3 className="fw-bold text-primary" style={{ fontSize: "1.8rem" }}>10+</h3>
                  <p className="text-muted mb-0">Years Experience</p>
                </Col>
                <Col xs={6}>
                  <h3 className="fw-bold text-primary" style={{ fontSize: "1.8rem" }}>100+</h3>
                  <p className="text-muted mb-0">Partners</p>
                </Col>
              </Row>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.section>
  );
}


