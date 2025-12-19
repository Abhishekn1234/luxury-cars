import type  { FC } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion, type Variants } from "framer-motion";

const scrollReveal = (direction: "up" | "down" = "up"): Variants => ({
  hidden: { opacity: 0, y: direction === "up" ? 70 : -70 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
});

const AboutHero: FC = () => {
  return (
    <motion.section
      variants={scrollReveal("up")}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      style={{
        height: "100vh",
        background:
          "url('/young-couple-talking-sales-person-car-showroom.jpg') center/cover no-repeat",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.65)",
        }}
      />

      <Container className="h-100 d-flex align-items-center">
        <Row className="w-100 align-items-center">
          <Col md={7}>
            <div style={{ position: "relative", color: "#fff" }}>
              <h1 style={{ fontSize: "3.8rem", fontWeight: 700 }}>
                About <span style={{ color: "#0dcaf0" }}>AutoMart</span>
              </h1>

              <p style={{ fontSize: "1.25rem", maxWidth: "620px" }}>
                Your trusted destination for premium, certified used cars.
                Transparency, quality, and luxury in every drive.
              </p>
            </div>
          </Col>

          <Col md={5} className="d-none d-md-block">
            <div
              style={{
                background: "rgba(0,0,0,.55)",
                borderRadius: "20px",
                padding: "2.5rem",
                color: "#fff",
              }}
            >
              {[
                { label: "Years of Experience", value: "10+" },
                { label: "Luxury Cars Available", value: "310+" },
                { label: "Customer Satisfaction", value: "100%" },
              ].map((item, i) => (
                <div key={i} style={{ marginBottom: "1rem" }}>
                  <span>{item.label}</span>
                  <strong style={{ float: "right", color: "#0dcaf0" }}>
                    {item.value}
                  </strong>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </motion.section>
  );
};

export default AboutHero;
