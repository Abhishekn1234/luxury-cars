import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Cars() {
  const [hovered, setHovered] = useState(false);

  const description =
    "Explore our premium collection of luxury used cars. Every vehicle is handpicked and quality-checked for your peace of mind.";

  return (
    <section className="position-relative w-100 vh-100">
      <Container fluid className="p-0 h-100">
        <motion.div
          className="position-relative overflow-hidden w-100 h-100"
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          style={{
            backgroundImage: `url('/footer.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            cursor: "pointer",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Overlay */}
          <motion.div
            className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center text-center p-4"
            style={{
              backgroundColor: "rgba(0,0,0,0.5)", // dark overlay
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1 }}
          >
            <motion.p
              className={`text-white fs-4 ${hovered ? "fw-bold text-warning" : "fw-normal"}`}
              style={{ maxWidth: "800px", transition: "all 0.3s" }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {description}
            </motion.p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

