import type { FC } from "react";
import { Container, Button } from "react-bootstrap";
import { motion } from "framer-motion";

const AboutCTA: FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        height: "80vh",
        background:
          "url('/family-with-baby-girl-choosing-car-car-salon.jpg') center/cover no-repeat",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,.7)",
        }}
      />

      <Container className="h-100 d-flex align-items-center justify-content-center">
        <div style={{ color: "#fff", textAlign: "center" }}>
          <h2>Drive in Style with AutoMart</h2>
          <p>Premium cars. Trusted value.</p>

          <Button size="lg" variant="info" className="rounded-pill px-5">
            Contact Us
          </Button>
        </div>
      </Container>
    </motion.section>
  );
};

export default AboutCTA;
