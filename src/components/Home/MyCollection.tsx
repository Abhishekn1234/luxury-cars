import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";

export default function RecentCollection() {
  const cars = [
    {
      title: "BMW 5 Series",
      image: "/bmw.jpg",
      description: "Luxury sedan with excellent performance and comfort.",
      price: "$45,000",
    },
    {
      title: "Audi Q7",
      image: "/audi.jpg",
      description: "Spacious SUV, perfect for family and adventure.",
      price: "$60,000",
    },
    {
      title: "Mercedes C-Class",
      image: "/mercedes.jpg",
      description: "Premium design and smooth driving experience.",
      price: "$50,000",
    },
    {
      title: "Tesla Model 3",
      image: "/tesla.jpg",
      description: "Electric performance with advanced tech features.",
      price: "$55,000",
    },
    {
      title: "Lexus RX",
      image: "/lexus.jpg",
      description: "Elegant SUV with comfort and reliability.",
      price: "$58,000",
    },
    {
      title: "Jaguar XE",
      image: "/jaguar.jpg",
      description: "Sporty sedan with luxury interior.",
      price: "$52,000",
    },
  ];

  return (
    <section className="bg-light py-5">
      <Container>
        <h2 className="fw-bold mb-5 text-center">Recent Collection</h2>
        <Row className="g-4">
          {cars.map((car, index) => (
            <Col key={index} lg={4} md={6} sm={12}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card
                  className="h-100 shadow-sm border-0"
                  style={{ transition: "transform 0.3s", cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <Card.Img
                    variant="top"
                    src={car.image}
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{car.title}</Card.Title>
                    <Card.Text className="text-muted flex-grow-1">
                      {car.description}
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <h5 className="mb-0 text-primary">{car.price}</h5>
                      <Button variant="outline-primary">View</Button>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
