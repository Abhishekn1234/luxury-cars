import { Card, Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import {Badge} from "react-bootstrap";
import { Shield, Star, ChevronRight, CheckCircle, Users, Clock, Award, Car, Phone, MessageCircle } from "lucide-react";
import type { JSX } from "react";
import { GiGears, GiSpeedometer } from "react-icons/gi";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";

interface Service {
  id: number;
  icon: JSX.Element;
  title: string;
  description: string;
  gradient: string;
  features: string[];
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  comment: string;
  rating: number;
  image: string;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const services: Service[] = [
  {
    id: 1,
    icon: <Shield size={40} />,
    title: "Certified Inspection",
    description: "All vehicles undergo 150+ point thorough inspections by certified technicians to ensure quality and reliability.",
    gradient: "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)",
    features: ["150+ Point Inspection", "Engine Diagnostics", "Safety Check", "History Verification"]
  },
  {
    id: 2,
    icon: <Star size={40} />,
    title: "Premium Vehicles",
    description: "We offer only premium pre-owned vehicles, handpicked for performance, style, and long-term value.",
    gradient: "linear-gradient(135deg, #FFD700 0%, #FFC107 100%)",
    features: ["Luxury Brands", "Low Mileage", "Well Maintained", "Full Service History"]
  },
  {
    id: 3,
    icon: <GiSpeedometer size={40} />,
    title: "Performance Testing",
    description: "Comprehensive testing for engine, transmission, brakes, and safety systems to guarantee optimal performance.",
    gradient: "linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)",
    features: ["Dyno Testing", "Road Testing", "Brake Analysis", "Suspension Check"]
  },
  {
    id: 4,
    icon: <GiGears size={40} />,
    title: "Maintenance & Support",
    description: "Comprehensive after-sale maintenance plans, extended warranty, and 24/7 roadside assistance.",
    gradient: "linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)",
    features: ["12-Month Warranty", "Free Service", "24/7 Support", "Roadside Assistance"]
  },
];

const additionalServices = [
  {
    id: 5,
    icon: <Users size={32} />,
    title: "Personal Consultation",
    description: "One-on-one expert consultation to find the perfect vehicle matching your needs and budget.",
    color: "#9C27B0"
  },
  {
    id: 6,
    icon: <Car size={32} />,
    title: "Test Drive Arrangement",
    description: "Flexible test drive scheduling with home or office delivery options for your convenience.",
    color: "#FF5722"
  },
  {
    id: 7,
    icon: <Clock size={32} />,
    title: "Flexible Financing",
    description: "Custom financing solutions with competitive rates and quick approval process.",
    color: "#3F51B5"
  },
  {
    id: 8,
    icon: <Award size={32} />,
    title: "Trade-In Program",
    description: "Get the best value for your current vehicle with our transparent trade-in evaluation.",
    color: "#FF9800"
  },
];

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Michael Rodriguez",
    role: "Satisfied Customer",
    comment: "The certified inspection gave me complete confidence in my purchase. The car has been flawless for 2 years!",
    rating: 5,
    image: "MR"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "First-Time Buyer",
    comment: "The team made the entire process so easy. The financing options were excellent and the after-sale support is outstanding.",
    rating: 5,
    image: "SJ"
  },
  {
    id: 3,
    name: "David Chen",
    role: "Car Enthusiast",
    comment: "Found my dream sports car here. The performance testing report was incredibly detailed and accurate.",
    rating: 5,
    image: "DC"
  },
];

const faqs: FAQ[] = [
  {
    id: 1,
    question: "How thorough is your vehicle inspection process?",
    answer: "Each vehicle undergoes a comprehensive 150+ point inspection covering mechanical, electrical, safety, and cosmetic aspects. Our certified technicians provide detailed reports with photos."
  },
  {
    id: 2,
    question: "What warranty do you offer on used vehicles?",
    answer: "All our premium vehicles come with a minimum 12-month comprehensive warranty. Extended warranty options are available for additional coverage."
  },
  {
    id: 3,
    question: "Can I arrange a test drive at my convenience?",
    answer: "Yes! We offer flexible test drive scheduling with options for home or office delivery. Weekend and evening appointments are available."
  },
  {
    id: 4,
    question: "Do you offer financing options?",
    answer: "We work with multiple financial institutions to provide competitive financing solutions. Our experts will help you find the best rates tailored to your situation."
  },
];

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
const [hover, setHover] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const [showModal, setShowModal] = useState(false);
 
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
interface Car {
  _id: string;
  name: string;
  model: string;
}

const [cars, setCars] = useState<Car[]>([]);
const [selectedCar, setSelectedCar] = useState<string>("");

useEffect(() => {
  const fetchCars = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/cars");
      const data = await res.json();
      setCars(data.data);
    } catch (error) {
      console.error("Failed to fetch cars", error);
    }
  };

  fetchCars();
}, []);
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = e.currentTarget;

  const data = {
    firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value,
    lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
    email: (form.elements.namedItem("email") as HTMLInputElement).value,
    phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
    car: selectedCar,
  };

  try {
    const res = await fetch(
      "http://localhost:5000/api/services/testdrive",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to schedule test drive");
    }

    toast.success("Test Drive Scheduled Successfully 🚗");
    handleClose();
  } catch (error: any) {
    console.error(error);
    toast.error(error.message || "Something went wrong ❌");
  }
};
  const [showModals, setShowModals] = useState(false);

  const handleCloses = () => setShowModals(false);
  const handleShows = () => setShowModals(true);


  return (
    <div 
      className="services-section"
      style={{ 
        backgroundColor: "#000", 
        color: "#fff",
        position: "relative"
      }}
    >
    

      {/* Animated Background Elements */}
      <div 
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "100vh",
          background: "radial-gradient(circle at 20% 50%, rgba(33, 150, 243, 0.05) 0%, transparent 50%)",
          zIndex: 0,
        }}
      />
      
      <Container className="py-5 position-relative" style={{ zIndex: 1 }}>
        {/* Hero Section */}
        <div 
          ref={(el) =>{ sectionRefs.current[0] = el}}
          id="hero"
          className={`text-center mb-5 pt-5 transition-slide-up ${isVisible ? 'visible' : ''}`}
          style={{
            transition: "transform 0.8s ease, opacity 0.8s ease",
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            opacity: isVisible ? 1 : 0,
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
         
    <Badge
  style={{
    backgroundColor: "rgba(33, 150, 243, 0.1)",
    color: "#e3e6e9ff",
    fontSize: "0.8rem",
    borderRadius: "12px", // small rounded corners
    padding: "15px 0", // vertical padding, full width
    display: "block", // make it a block to take horizontal space
    textAlign: "center", // center the text
    fontWeight: 600,
    letterSpacing: "1px",
    width: "40%", // adjust width as needed
    maxWidth: "200px", // optional max width
    margin: "0 auto", // center horizontally
  }}
>
  PREMIUM CAR SOLUTIONS
</Badge>


           
        
          <h1 className="display-3 fw-bold mb-4">
            <span style={{ color: "#fff" }}>Driving </span>
            <span style={{ color: "#2196F3" }}>Excellence</span>
            <span style={{ color: "#fff" }}> in Every</span>
            <span style={{ color: "#FFD700" }}> Journey</span>
          </h1>
          <p className="lead text-white-50 mx-auto mb-5" style={{ maxWidth: "700px", fontSize: "1.25rem" }}>
            Experience unparalleled service with our comprehensive automotive solutions.
            From selection to aftercare, we're with you every mile of the way.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
           <Button
  variant="primary"
  size="lg"
  className="rounded-pill px-5 py-3 fw-semibold"
  onClick={() => scrollToSection('services')}
  style={{
    background: "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)",
    border: "none",
    boxShadow: "0 8px 25px rgba(33, 150, 243, 0.4)",
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.05)";
    e.currentTarget.style.boxShadow = "0 12px 30px rgba(33, 150, 243, 0.6)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "0 8px 25px rgba(33, 150, 243, 0.4)";
  }}
>
  Explore Services
</Button>

<Button
  variant="outline-light"
  size="lg"
  className="rounded-pill px-5 py-3 fw-semibold"
  onClick={() => scrollToSection('contact')}
  style={{
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
    e.currentTarget.style.transform = "scale(1.05)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = "transparent";
    e.currentTarget.style.transform = "scale(1)";
  }}
>
  Contact Us
</Button>

          </div>
        </div>

        {/* Stats Section */}
        <Row className="mb-5 py-5" id="stats">
          {[
            { value: "10,000+", label: "Vehicles Sold", icon: <Car size={24} /> },
            { value: "98%", label: "Customer Satisfaction", icon: <Star size={24} /> },
            { value: "24/7", label: "Support Available", icon: <Clock size={24} /> },
            { value: "15+", label: "Years Experience", icon: <Award size={24} /> },
          ].map((stat, index) => (
            <Col md={3} sm={6} key={index} className="mb-4">
              <div className="text-center p-4 rounded-4" style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                transition: "transform 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div className="mb-3" style={{ color: "#2196F3" }}>
                  {stat.icon}
                </div>
                <h2 className="fw-bold display-6 mb-2">{stat.value}</h2>
                <p className="text-white-50 mb-0">{stat.label}</p>
              </div>
            </Col>
          ))}
        </Row>

        {/* Main Services */}
        <div 
          ref={(el) => {
  sectionRefs.current[1] = el; // assign element
}}

          id="services"
          className="mb-5 py-5"
        >
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Our Core Services</h2>
            <p className="text-white-50">Comprehensive solutions for your automotive needs</p>
          </div>
          
          <Row xs={1} sm={2} lg={4} className="g-4">
            {services.map((service, index) => (
              <Col key={service.id}>
                <Card
                  className={`h-100 text-center border-0 rounded-4 shadow-lg service-card transition-slide-up ${
                    isVisible ? 'visible' : ''
                  }`}
                  style={{
                    transition: `transform 0.5s ease ${index * 0.1}s, opacity 0.5s ease ${index * 0.1}s`,
                    transform: isVisible ? "translateY(0)" : "translateY(50px)",
                    opacity: isVisible ? 1 : 0,
                    background: "linear-gradient(145deg, #111, #1a1a1a)",
                    color: "#fff",
                    cursor: "pointer",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* Icon Background */}
                  <div 
                    className="position-absolute"
                    style={{
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "150px",
                      background: service.gradient,
                      opacity: 0.1,
                      zIndex: 0,
                    }}
                  />
                  
                  <Card.Body className="d-flex flex-column align-items-center position-relative p-4">
                    {/* Icon Container */}
                    <div 
                      className="mb-4 p-3 rounded-4 d-flex align-items-center justify-content-center"
                      style={{
                        background: service.gradient,
                        width: "80px",
                        height: "80px",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                      }}
                    >
                      <div style={{ color: "#fff" }}>
                        {service.icon}
                      </div>
                    </div>
                    
                    <Card.Title className="mb-3 fw-bold fs-5">
                      {service.title}
                    </Card.Title>
                    
                    <Card.Text className="text-white-50 mb-4 flex-grow-1">
                      {service.description}
                    </Card.Text>
                    
                    {/* Features List */}
                    <div className="w-100 mb-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="d-flex align-items-center gap-2 mb-2">
                          <CheckCircle size={16} color="#4CAF50" />
                          <small className="text-white-75">{feature}</small>
                        </div>
                      ))}
                    </div>
                    
                  <Button
        variant="link"
        className="text-decoration-none d-flex align-items-center justify-content-center gap-2 px-3 py-2"
        style={{
          color: "#2196F3",
          fontWeight: 600,
          backgroundColor: hover ? "rgba(33, 150, 243, 0.2)" : "rgba(33, 150, 243, 0.1)",
          border: "none",
          borderRadius: "50px",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleShows} // Open modal on click
      >
        Learn More
        <ChevronRight size={18} />
      </Button>
       <Modal show={showModals} onHide={handleCloses} centered>
        <Modal.Header closeButton>
          <Modal.Title>Learn More</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Here you can add any content you want to show when the user clicks "Learn More".
            This could be details about a service, product, or any additional information.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloses}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Additional Services */}
        <div className="mb-5 py-5">
          <div className="text-center mb-5">
            <h3 className="fw-bold mb-3">Additional Benefits</h3>
            <p className="text-white-50">Extra services to enhance your experience</p>
          </div>
          
          <Row className="g-4">
            {additionalServices.map((service, index) => (
               
              <Col md={3} sm={6} key={service.id} id={index.toString()}>

                <div className="p-4 rounded-4 h-100" style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  transition: "all 0.3s ease",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.borderColor = service.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                }}>
                  <div 
                    className="mb-3 p-2 rounded-3 d-inline-flex align-items-center justify-content-center"
                    style={{ 
                      backgroundColor: `${service.color}20`,
                      color: service.color,
                      width: "60px",
                      height: "60px"
                    }}
                  >
                    {service.icon}
                  </div>
                 
                  <h5 className="fw-bold mb-2">{service.title}</h5>
                  <p className="text-white-50 small mb-0">{service.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Testimonials */}
        <div 
          ref={(el) => {sectionRefs.current[2] = el}}
          id="testimonials"
          className="mb-5 py-5"
        >
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">What Our Customers Say</h2>
            <p className="text-white-50">Trusted by thousands of satisfied car buyers</p>
          </div>
          
          <Row className="g-4">
            {testimonials.map((testimonial) => (
              <Col md={4} key={testimonial.id}>
                <Card className="border-0 rounded-4 h-100" style={{
                  background: "linear-gradient(145deg, #111, #1a1a1a)",
                  border: "1px solid rgba(255, 255, 255, 0.1)"
                }}>
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{
                        width: "50px",
                        height: "50px",
                        background: "linear-gradient(135deg, #2196F3, #9C27B0)",
                        color: "white",
                        fontWeight: "bold"
                      }}>
                        {testimonial.image}
                      </div>
                      <div>
                        <h6 className="fw-bold mb-0 text-white">{testimonial.name}</h6>
                        <small className="text-white">{testimonial.role}</small>
                      </div>
                    </div>
                    <div className="mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="#FFD700" color="#FFD700" className="me-1" />
                      ))}
                    </div>
                    <p className="text-white mb-0">"{testimonial.comment}"</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* FAQ Section */}
        <div 
          ref={(el) => {sectionRefs.current[3] = el}}
          id="faq"
          className="mb-5 py-5"
        >
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-white-50">Find answers to common questions about our services</p>
          </div>
          
          <Row className="justify-content-center">
            <Col lg={8}>
              {faqs.map((faq) => (
                <div 
                  key={faq.id}
                  className="mb-3 rounded-4"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    overflow: "hidden",
                    cursor: "pointer"
                  }}
                  onClick={() => setActiveFAQ(activeFAQ === faq.id ? null : faq.id)}
                >
                  <div className="p-4 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-semibold">{faq.question}</h5>
                    <ChevronRight 
                      size={20} 
                      style={{
                        transform: activeFAQ === faq.id ? "rotate(90deg)" : "rotate(0)",
                        transition: "transform 0.3s ease"
                      }}
                    />
                  </div>
                  {activeFAQ === faq.id && (
                    <div className="px-4 pb-4">
                      <p className="text-white-50 mb-0">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </Col>
          </Row>
        </div>

        {/* Contact Section */}
        <div 
          ref={(el) =>{ sectionRefs.current[4] = el}}
          id="contact"
          className="py-5"
        >
          <div className="p-5 rounded-4" style={{
            background: "linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(33, 150, 243, 0.05) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            maxWidth: "800px",
            margin: "0 auto",
          }}>
            <div className="text-center">
              <MessageCircle size={48} color="#2196F3" className="mb-3" />
              <h2 className="fw-bold mb-3">Ready to Find Your Perfect Car?</h2>
              <p className="text-white-50 mb-4">
                Our team of experts is ready to assist you. Contact us today for a personalized consultation.
              </p>
              
             <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
      {/* Call Now Button */}
      <Button
        variant="primary"
        size="lg"
        className="rounded-pill px-4 py-3 fw-semibold d-flex align-items-center gap-2"
        style={{
          background: "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)",
          border: "none",
        }}
        onClick={() => window.open("tel:+919876543210")} // real phone number
      >
        <Phone size={20} />
        Call Now
      </Button>

      {/* Schedule Test Drive Button */}
      <Button
        variant="outline-light"
        size="lg"
        className="rounded-pill px-4 py-3 fw-semibold"
        onClick={handleShow}
      >
        Schedule Test Drive
      </Button>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Schedule Test Drive</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name="firstName" placeholder="Enter first name" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name="lastName" placeholder="Enter last name" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="tel" name="phone" placeholder="Enter phone number" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="car">
              <Form.Label>Select Car</Form.Label>
              <Form.Select
                value={selectedCar}
                onChange={(e) => setSelectedCar(e.target.value)}
                required
              >
                  <option value="">Select a Car</option>
                {cars.map((car) => (
                  <option key={car._id} value={car._id}>
                    {car.name} {car.model}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
              
              <div className="row g-3">
                <Col md={6}>
                  <div className="p-3 rounded-3" style={{
                    background: "rgba(255, 255, 255, 0.05)"
                  }}>
                    <small className="text-white-50 d-block">Working Hours</small>
                    <strong>Mon-Sat: 9AM - 8PM</strong>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="p-3 rounded-3" style={{
                    background: "rgba(255, 255, 255, 0.05)"
                  }}>
                    <small className="text-white-50 d-block">Emergency Support</small>
                    <strong>24/7 Roadside Assistance</strong>
                  </div>
                </Col>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Custom CSS */}
      <style>{`
        .service-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease !important;
        }
        
        .service-card:hover {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4) !important;
        }
        
        @media (max-width: 768px) {
          .display-4 {
            font-size: 2.5rem;
          }
          
          .display-3 {
            font-size: 2.8rem;
          }
          
          .lead {
            font-size: 1.1rem;
          }
        }
        
        @media (max-width: 576px) {
          .display-4 {
            font-size: 2rem;
          }
          
          .display-3 {
            font-size: 2.2rem;
          }
          
          .service-card {
            margin: 0 10px;
          }
        }
        
        .transition-slide-up {
          transition: transform 0.8s ease, opacity 0.8s ease;
        }
        
        .transition-slide-up.visible {
          transform: translateY(0);
          opacity: 1;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}