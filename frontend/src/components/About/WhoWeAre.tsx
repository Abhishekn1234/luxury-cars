import type { FC } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

const WhoWeAre: FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{ padding: "6rem 0", background: "#f8f9fa" }}
    >
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <img
              src="/people-vehicle-dealership-buying-new-car.jpg"
              style={{ width: "100%", borderRadius: "18px" }}
            />
          </Col>
          <Col md={6}>
            <h3>Who We Are</h3>
            <p>
              AutoMart is a premium used-car showroom built on trust,
              transparency, and customer satisfaction.
            </p>
          </Col>
        </Row>
      </Container>
    </motion.section>
  );
};

export default WhoWeAre;
