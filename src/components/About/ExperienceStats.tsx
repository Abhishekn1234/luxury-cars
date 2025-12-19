import  type { FC } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

const ExperienceStats: FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        padding: "5rem 0",
        background: "#fff",
      }}
    >
      <Container>
        <Row className="text-center">
          <Col md={6}>
            <h2 style={{ fontSize: "3rem", color: "#0dcaf0" }}>10+</h2>
            <p>Years of Experience</p>
          </Col>
          <Col md={6}>
            <h2 style={{ fontSize: "3rem", color: "#0dcaf0" }}>310+</h2>
            <p>Luxury Models Available</p>
          </Col>
        </Row>
      </Container>
    </motion.section>
  );
};

export default ExperienceStats;
