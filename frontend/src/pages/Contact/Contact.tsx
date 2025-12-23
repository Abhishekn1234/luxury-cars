import { useRef, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { motion, useAnimation, useInView, type Variants } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // Show a toast immediately
  const toastId = toast.info("Sending message...", { autoClose: false });

  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    // Remove the "sending" toast
    toast.dismiss(toastId);

    if (data.success) {
      toast.success("Message sent! Check your email for confirmation.");
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
    } else {
      toast.error(data.message || "Failed to send message");
    }
  } catch (err) {
    toast.dismiss(toastId);
    toast.error("Something went wrong. Please try again later.");
  }
};



  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] },
    },
  };

  // Custom Styles
  const glassCardStyle = {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "20px",
  };

  const inputStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "#fff",
    borderRadius: "10px",
    padding: "0.75rem 1rem",
    transition: "all 0.3s ease",
  };

  const textShadowStyle = {
    textShadow: "0px 4px 10px rgba(0, 0, 0, 0.8)",
  };

  return (
    <section
      ref={ref}
      className="position-relative w-100 min-vh-100 d-flex align-items-center py-5 overflow-hidden"
      style={{
        backgroundImage: "url('/happy-customers-car-dealership.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div 
        className="position-absolute top-0 start-0 w-100 h-100" 
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.9) 100%)" }}
      />
      <ToastContainer
  position="top-right"    // Top-right position
  autoClose={5000}        // 5 seconds auto close
  hideProgressBar={false} // Show progress bar
  newestOnTop={true}      // New messages appear on top
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
/>

      <Container className="position-relative">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={fadeUp}
          className="text-center text-light mb-5"
        >
          <h1 className="display-3 fw-bold mb-3" style={textShadowStyle}>
            Get in <span className="text-info">Touch</span>
          </h1>
          <p className="lead mx-auto" style={{ maxWidth: "600px", color: "#ccc", ...textShadowStyle }}>
            Have questions or a project in mind? We'd love to hear from you. 
            Drop us a message and our team will respond within 24 hours.
          </p>
        </motion.div>

        <Row className="align-items-stretch gy-5">
          {/* Contact Form */}
          <Col lg={6}>
            <motion.div initial="hidden" animate={controls} variants={fadeUp} className="h-100">
              <Card style={glassCardStyle} className="shadow-2xl p-2 p-md-4 h-100">
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <Row className="mb-4">
                      <Col md={6} className="mb-3 mb-md-0">
                        <Form.Group controlId="firstName">
                          <Form.Label className="small text-uppercase fw-bold text-info opacity-75">First Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="John"
                            style={inputStyle}
                            className="custom-input"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="lastName">
                          <Form.Label className="small text-uppercase fw-bold text-info opacity-75">Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Doe"
                            style={inputStyle}
                            className="custom-input"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-4" controlId="email">
                      <Form.Label className="small text-uppercase fw-bold text-info opacity-75">Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        style={inputStyle}
                        className="custom-input"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="message">
                      <Form.Label className="small text-uppercase fw-bold text-info opacity-75">Your Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="How can we help you?"
                        style={inputStyle}
                        className="custom-input"
                        required
                      />
                    </Form.Group>

                    <Button 
                      variant="info" 
                      type="submit" 
                      className="w-100 py-3 fw-bold text-uppercase shadow-sm mt-2 transition-all"
                      style={{ borderRadius: "10px", letterSpacing: "1px" }}
                    >
                      Send Message
                    </Button>
                  </Form>
                  

                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          {/* Map Section */}
          <Col lg={6}>
            <motion.div initial="hidden" animate={controls} variants={fadeUp} className="h-100">
              <div 
                className="h-100 rounded-4 shadow-lg overflow-hidden border border-white border-opacity-10"
                style={{ minHeight: "400px" }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.83543450937!2d-122.4194155!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter%20HQ!5e0!3m2!1sen!2sus!4v1625145612345!5m2!1sen!2sus"
                  title="Google Map"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(1.2)" }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* Internal CSS */}
      <style>{`
        .custom-input:focus {
          background-color: rgba(255, 255, 255, 0.12) !important;
          border-color: #0dcaf0 !important;
          box-shadow: 0 0 15px rgba(13, 202, 240, 0.2);
          color: white !important;
        }
        .btn-info:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(13, 202, 240, 0.4);
          filter: brightness(1.1);
        }
        .transition-all {
          transition: all 0.3s ease;
        }
      `}</style>
    </section>
  );
}
