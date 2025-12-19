import { Container, Row, Col, Image } from "react-bootstrap";
import { motion } from "framer-motion";

export default function Clients() {
  const clients = [
    { src: "/pexels-shkrabaanthony-7144253.jpg", alt: "Client 1" },
    { src: "/pexels-introspectivedsgn-28879992.jpg", alt: "Client 2" },
    { src: "/pexels-maria-geller-801267-2127037.jpg", alt: "Client 3" },
    { src: "/pexels-shkrabaanthony-7144175.jpg", alt: "Client 4" },
    { src: "/pexels-shkrabaanthony-7144199.jpg", alt: "Client 5" },
    { src: "/pexels-shkrabaanthony-7144261.jpg", alt: "Client 6" },
  ];

  return (
    <section className="bg-white py-5">
      <Container>
        <h2 className="fw-bold mb-5 text-center">Our Clients</h2>
        <Row className="g-4 justify-content-center">
          {clients.map((client, index) => (
            <Col key={index} lg={2} md={4} sm={6} xs={6} className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Image
                  src={client.src}
                  alt={client.alt}
                  fluid
                  rounded
                  className="shadow-sm"
                  style={{
                    width: "150px",   // uniform width
                    height: "150px",  // uniform height
                    objectFit: "cover", // maintain aspect ratio
                    transition: "transform 0.3s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
