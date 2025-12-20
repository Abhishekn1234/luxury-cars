import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { motion } from "framer-motion";

export default function RecentCollection() {
  const cars = [
    {
      title: "BMW 5 Series",
      image: "/bmw.jpg",
      description: "Luxury sedan with excellent performance and comfort.",
      price: "$45,000",
      theme: "dark",
    },
    {
      title: "Audi Q7",
      image: "/audi.jpg",
      description: "Spacious SUV, perfect for family and adventure.",
      price: "$60,000",
      theme: "light",
    },
    {
      title: "Mercedes C-Class",
      image: "/mercedes.jpg",
      description: "Premium design and smooth driving experience.",
      price: "$50,000",
      theme: "primary",
    },
    {
      title: "Tesla Model 3",
      image: "/tesla.jpg",
      description: "Electric performance with advanced tech features.",
      price: "$55,000",
      theme: "secondary",
    },
    {
      title: "Lexus RX",
      image: "/lexus.jpg",
      description: "Elegant SUV with comfort and reliability.",
      price: "$58,000",
      theme: "dark",
    },
    {
      title: "Jaguar XE",
      image: "/jaguar.jpg",
      description: "Sporty sedan with luxury interior.",
      price: "$52,000",
      theme: "light",
    },
  ];

  return (
    <section className="py-5">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-5">
          <Badge bg="dark" className="mb-3 px-3 py-2 rounded-pill">
            Premium Cars
          </Badge>
          <h2 className="fw-bold display-6">Recent Collection</h2>
          <p className="mt-2">
            Handpicked luxury & performance vehicles
          </p>
        </div>

        <Row className="g-4">
          {cars.map((car, index) => (
            <Col key={index} xl={4} md={6} sm={12}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ scale: 1.04 }}
              >
                <Card
                  bg={car.theme}
                  text={car.theme === "dark" ? "light" : "dark"}
                  className="h-100 border-0 shadow-lg rounded-4 overflow-hidden"
                >
                  {/* Image */}
                  <div className="ratio ratio-16x9">
                    <Card.Img
                      src={car.image}
                      className="object-fit-cover"
                    />
                  </div>

                  {/* Body */}
                  <Card.Body className="d-flex flex-column p-4">
                    <Card.Title className="fw-semibold fs-5">
                      {car.title}
                    </Card.Title>

                    <Card.Text className="small opacity-75 flex-grow-1 mt-2">
                      {car.description}
                    </Card.Text>

                    {/* Footer */}
                    <div className="d-flex justify-content-between align-items-center mt-4">
                      <span className="fw-bold fs-5 text-warning">
                        {car.price}
                      </span>
                      <Button
                        variant={
                          car.theme === "dark"
                            ? "outline-light"
                            : "outline-dark"
                        }
                        size="sm"
                        className="rounded-pill px-4"
                      >
                        View Details
                      </Button>
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
