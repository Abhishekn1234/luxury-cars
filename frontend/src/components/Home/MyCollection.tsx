import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Car {
  _id: string;
  name: string;
  model: string;
  year: number;
  price: number;
  description: string;
  theme: "dark" | "light" | "primary" | "secondary";
  image: string;
}

export default function RecentCollection() {
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
 const getCardTheme = (theme: string) => {
  switch (theme.toLowerCase()) {
    case "dark":
      return "dark";
    case "blue":
      return "primary"; // Bootstrap primary is blue
    case "light":
      return "light";
    case "secondary":
      return "secondary";
    case "warning":
      return "warning";
    default:
      return "light"; // fallback
  }
};

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cars`);
        const result = await res.json();
        setCars(result.data); // <-- extract data array here
      } catch (error) {
        console.error("Failed to fetch cars", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  if (loading) return <p className="text-center text-white py-5">Loading cars...</p>;
  if (!cars.length) return <p className="text-center text-white py-5">No cars found.</p>;

  return (
    <section className="py-5">
      <Container>
        <div className="text-center mb-5">
          <Badge bg="dark" className="mb-3 px-3 py-2 rounded-pill">
            Premium Cars
          </Badge>
          <h2 className="fw-bold display-6">Recent Collection</h2>
          <p className="mt-2">Handpicked luxury & performance vehicles</p>
        </div>

        <Row className="g-4">
          {cars.slice(0,6).map((car, index) => (
            <Col key={car._id} xl={4} md={6} sm={12}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ scale: 1.04 }}
              >
              <Card
  bg={getCardTheme(car.theme)}
  text={getCardTheme(car.theme) === "dark" ? "light" : "dark"}
  className="h-100 border-0 shadow-lg rounded-4 overflow-hidden"
>
  <div className="ratio ratio-16x9">
    <Card.Img
      src={
        car.image
          ? `${import.meta.env.VITE_BACKEND_URL}/uploads/cars/${car.image}`
          : "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
      className="object-fit-cover"
      onError={(e) =>
        (e.currentTarget.src =
          "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")
      }
    />
  </div>

  <Card.Body className="d-flex flex-column p-4">
    <Card.Title className="fw-semibold fs-5">
      {car.name} {car.model}
    </Card.Title>

    <Card.Text className="small opacity-75 flex-grow-1 mt-2">
      {car.description}
    </Card.Text>

    <div className="d-flex justify-content-between align-items-center mt-4">
      <span className="fw-bold fs-5 text-warning">
        ${car.price.toLocaleString()}
      </span>
      {/* All buttons go to /collections */}
      <Button
        variant={getCardTheme(car.theme) === "dark" ? "outline-light" : "outline-dark"}
        size="sm"
        className="rounded-pill px-4"
        onClick={() => navigate("/collections")}
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
