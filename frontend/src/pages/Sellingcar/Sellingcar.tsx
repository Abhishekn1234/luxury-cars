import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { Container, Card, Form, Row, Col, Button } from 'react-bootstrap';
import { FaCar, FaUser, FaMapMarkerAlt, FaCog, FaCamera } from 'react-icons/fa';
import type { CarForm } from '../../components/Sellingacar/selling';
import { toast } from 'react-toastify';

export default function SellingCar() {
  const initialForm: CarForm = {
    type: "Sell",
    name: "",
    mobile: "",
    email: "",
    houseName: "",
    state: "",
    district: "",
    city: "",
    pincode: "",
    post: "",
    address: "",
    vehicle: "",
    modelName: "",
    brand: "",
    registrationYear: "",
    odometer: "",
    ownership: "First",
    noc: false,
    color: "",
    registration: "",
    insurance: "",
    transmission: "Manual",
    manufacturingYear: "",
    fuelType: "Petrol",
    vehicleImage: null,
    isAgree:false
  };

  const [form, setForm] = useState<CarForm>(initialForm);
const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setForm({ ...form, [target.name]: target.checked });
    } else {
      setForm({ ...form, [target.name]: target.value });
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setForm({ ...form, vehicleImage: e.target.files[0] });
    }
  };

  const handleReset = () => {
  setForm(initialForm);

  // Clear the file input in DOM
  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};


const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  const formData = new FormData();

  Object.entries(form).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (value instanceof File) formData.append(key, value);
      else if (typeof value === "boolean") formData.append(key, value ? "true" : "false");
      else formData.append(key, value.toString());
    }
  });

  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/selling`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      // Show validation or server errors
      const message = data?.message || `Server error: ${res.status} ${res.statusText}`;
      toast.error(message);
      return;
    }

    if (data?.success) {
      toast.success("Form submitted successfully!");
      handleReset();
    } else {
      toast.error(data?.message || "Error submitting form!");
    }
  } catch (err: any) {
    console.error(err);
    toast.error(err?.message || "Network or server error!");
  }
};




  return (
    <Container 
      fluid 
      className="py-5 px-3 px-md-5" 
      style={{ 
        backgroundColor: "#692323ff", 
        minHeight: "100vh",
        backgroundImage: "radial-gradient(circle at 20% 30%, #1d0202ff 0%, #000 100%)"
      }}
    >
    
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold text-white mb-3">
          <FaCar className="me-3" style={{ color: "#007bff" }} />
          Sell Your Vehicle
        </h1>
        <p className="text-white" style={{ fontSize: "1.1rem" }}>
          Fill in your vehicle details and get the best offer in minutes
        </p>
      </div>

      <Card className="border-0 shadow-lg" style={{ 
        backgroundColor: "#111", 
        borderRadius: "20px",
        overflow: "hidden"
      }}>
        <Card.Body className="p-4 p-md-5">
          <Form onSubmit={handleSubmit}>
            {/* Personal Information Section */}
            <Card className="mb-4 border-0" style={{ backgroundColor: "#1a1a1a" }}>
              <Card.Header className="border-0 py-3" style={{ backgroundColor: "#222" }}>
                <h5 className="mb-0 text-white">
                  <FaUser className="me-2" style={{ color: "#007bff" }} />
                  Personal Information
                </h5>
              </Card.Header>
              <Card.Body className="p-4">
                <Row className="mb-3">
                  <Col md={6} className="mb-3 mb-md-0">
                    <Form.Group controlId="type">
                      <Form.Label className="text-light">Transaction Type</Form.Label>
                      <Form.Select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        className="form-control-lg"
                        style={{ 
                          backgroundColor: "#222", 
                          color: "#fff",
                          border: "1px solid #333",
                          borderRadius: "10px",
                          padding: "12px"
                        }}
                      >
                        <option value="Sell">Sell Vehicle</option>
                        <option value="Exchange">Exchange Vehicle</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="name">
                      <Form.Label className="text-light">Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your full name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="form-control-lg"
                        style={{ 
                          backgroundColor: "#222", 
                          color: "#fff",
                          border: "1px solid #333",
                          borderRadius: "10px",
                          padding: "12px"
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6} className="mb-3 mb-md-0">
                    <Form.Group controlId="mobile">
                      <Form.Label className="text-light">Mobile Number</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="Enter mobile number"
                        name="mobile"
                        value={form.mobile}
                        onChange={handleChange}
                        className="form-control-lg"
                        style={{ 
                          backgroundColor: "#222", 
                          color: "#fff",
                          border: "1px solid #333",
                          borderRadius: "10px",
                          padding: "12px"
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="email">
                      <Form.Label className="text-light">Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email address"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="form-control-lg"
                        style={{ 
                          backgroundColor: "#222", 
                          color: "#fff",
                          border: "1px solid #333",
                          borderRadius: "10px",
                          padding: "12px"
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Address Section */}
            <Card className="mb-4 border-0" style={{ backgroundColor: "#1a1a1a" }}>
              <Card.Header className="border-0 py-3" style={{ backgroundColor: "#222" }}>
                <h5 className="mb-0 text-white">
                  <FaMapMarkerAlt className="me-2" style={{ color: "#007bff" }} />
                  Address Details
                </h5>
              </Card.Header>
              <Card.Body className="p-4">
                <Row className="mb-3">
                  <Col md={4} className="mb-3">
                    <Form.Group controlId="houseName">
                      <Form.Label className="text-light">House Name/No.</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="House name/number"
                        name="houseName"
                        value={form.houseName}
                        onChange={handleChange}
                        style={{ 
                          backgroundColor: "#222", 
                          color: "#fff",
                          border: "1px solid #333",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} className="mb-3">
                    <Form.Group controlId="state">
                      <Form.Label className="text-light">State</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter state"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        style={{ 
                          backgroundColor: "#222", 
                          color: "#fff",
                          border: "1px solid #333",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} className="mb-3">
                    <Form.Group controlId="district">
                      <Form.Label className="text-light">District</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter district"
                        name="district"
                        value={form.district}
                        onChange={handleChange}
                        style={{ 
                          backgroundColor: "#222", 
                          color: "#fff",
                          border: "1px solid #333",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={4} className="mb-3">
                    <Form.Group controlId="city">
                      <Form.Label className="text-light">City</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter city"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        style={{ 
                          backgroundColor: "#222", 
                          color: "#fff",
                          border: "1px solid #333",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} className="mb-3">
                    <Form.Group controlId="pincode">
                      <Form.Label className="text-light">Pincode</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter pincode"
                        name="pincode"
                        value={form.pincode}
                        onChange={handleChange}
                        style={{ 
                          backgroundColor: "#222", 
                          color: "#fff",
                          border: "1px solid #333",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} className="mb-3">
                    <Form.Group controlId="post">
                      <Form.Label className="text-light">Post Office</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter post"
                        name="post"
                        value={form.post}
                        onChange={handleChange}
                        style={{ 
                          backgroundColor: "#222", 
                          color: "#fff",
                          border: "1px solid #333",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="address">
                  <Form.Label className="text-light">Complete Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter complete address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    style={{ 
                      backgroundColor: "#222", 
                      color: "#fff",
                      border: "1px solid #333",
                      borderRadius: "10px",
                      resize: "none"
                    }}
                  />
                </Form.Group>
              </Card.Body>
            </Card>

            {/* Vehicle Information Section */}
            <Card className="mb-4 border-0" style={{ backgroundColor: "#1a1a1a" }}>
              <Card.Header className="border-0 py-3" style={{ backgroundColor: "#222" }}>
                <h5 className="mb-0 text-white">
                  <FaCog className="me-2" style={{ color: "#007bff" }} />
                  Vehicle Information
                </h5>
              </Card.Header>
              <Card.Body className="p-4">
                <Row className="mb-3">
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="vehicle">
                      <Form.Label className="text-light">Vehicle Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="e.g., Toyota Camry"
                        name="vehicle"
                        value={form.vehicle}
                        onChange={handleChange}
                        style={{ 
                          backgroundColor: "#222", 
                          color: "#fff",
                          border: "1px solid #333",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="modelName">
                      <Form.Label className="text-light">Model Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="e.g., XLE Hybrid"
                        name="modelName"
                        value={form.modelName}
                        onChange={handleChange}
                        style={{ 
                          backgroundColor: "#222", 
                          color: "#fff",
                          border: "1px solid #333",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={4} className="mb-3">
                    <Form.Group controlId="brand">
                      <Form.Label className="text-light">Brand</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Brand name"
                        name="brand"
                        value={form.brand}
                        onChange={handleChange}
                        style={{ 
                          backgroundColor: "#222", 
                          color: "#fff",
                          border: "1px solid #333",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} className="mb-3">
                    <Form.Group controlId="registrationYear">
                      <Form.Label className="text-light">Registration Year</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="YYYY"
                        name="registrationYear"
                        value={form.registrationYear}
                        onChange={handleChange}
                        style={{ 
                          backgroundColor: "#222", 
                          color: "#fff",
                          border: "1px solid #333",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} className="mb-3">
                    <Form.Group controlId="odometer">
                      <Form.Label className="text-light">Odometer (km)</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Current reading"
                        name="odometer"
                        value={form.odometer}
                        onChange={handleChange}
                        style={{ 
                          backgroundColor: "#222", 
                          color: "#fff",
                          border: "1px solid #333",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={4} className="mb-3">
                    <Form.Group controlId="ownership">
                      <Form.Label className="text-light">Ownership</Form.Label>
                      <Form.Select
                        name="ownership"
                        value={form.ownership}
                        onChange={handleChange}
                        style={{ 
                          backgroundColor: "#222", 
                          color: "#fff",
                          border: "1px solid #333",
                          borderRadius: "10px"
                        }}
                      >
                        <option value="First">First Owner</option>
                        <option value="Second">Second Owner</option>
                        <option value="Third">Third Owner</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4} className="mb-3">
                    <Form.Group controlId="noc" className="d-flex align-items-center h-100">
                      <div className="mt-4">
                        <Form.Check
                          type="checkbox"
                          label="NOC Available"
                          name="noc"
                          checked={form.noc}
                          onChange={handleChange}
                          className="text-light"
                        />
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={4} className="mb-3">
                    <Form.Group controlId="color">
                      <Form.Label className="text-light">Color</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Vehicle color"
                        name="color"
                        value={form.color}
                        onChange={handleChange}
                        style={{ 
                          backgroundColor: "#222", 
                          color: "#fff",
                          border: "1px solid #333",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={4} className="mb-3">
                    <Form.Group controlId="registration">
                      <Form.Label className="text-light">Registration No.</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Registration number"
                        name="registration"
                        value={form.registration}
                        onChange={handleChange}
                        style={{ 
                          backgroundColor: "#222", 
                          color: "#fff",
                          border: "1px solid #333",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} className="mb-3">
                    <Form.Group controlId="insurance">
                      <Form.Label className="text-light">Insurance Details</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Insurance info"
                        name="insurance"
                        value={form.insurance}
                        onChange={handleChange}
                        style={{ 
                          backgroundColor: "#222", 
                          color: "#fff",
                          border: "1px solid #333",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} className="mb-3">
                    <Form.Group controlId="transmission">
                      <Form.Label className="text-light">Transmission</Form.Label>
                      <Form.Select
                        name="transmission"
                        value={form.transmission}
                        onChange={handleChange}
                        style={{ 
                          backgroundColor: "#222", 
                          color: "#fff",
                          border: "1px solid #333",
                          borderRadius: "10px"
                        }}
                      >
                        <option value="Manual">Manual</option>
                        <option value="Automatic">Automatic</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={4} className="mb-3">
                    <Form.Group controlId="manufacturingYear">
                      <Form.Label className="text-light">Manufacturing Year</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="YYYY"
                        name="manufacturingYear"
                        value={form.manufacturingYear}
                        onChange={handleChange}
                        style={{ 
                          backgroundColor: "#222", 
                          color: "white",
                          border: "1px solid #333",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} className="mb-3">
                    <Form.Group controlId="fuelType">
                      <Form.Label className="text-light">Fuel Type</Form.Label>
                      <Form.Select
                        name="fuelType"
                        value={form.fuelType}
                        onChange={handleChange}
                        style={{ 
                          backgroundColor: "#222", 
                          color: "#fff",
                          border: "1px solid #333",
                          borderRadius: "10px"
                        }}
                      >
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                        <option value="Hybrid">Hybrid</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4} className="mb-3">
                    <Form.Group controlId="vehicleImage">
                      <Form.Label className="text-light">
                        <FaCamera className="me-2" />
                        Vehicle Image
                      </Form.Label>
                      <Form.Control
  type="file"
  name="vehicleImage"
  ref={fileInputRef}   // <-- add this
  onChange={handleImageChange}
  accept="image/*"
  style={{ 
    backgroundColor: "#222", 
    color: "#fff",
    border: "1px solid #333",
    borderRadius: "10px",
    padding: "8px"
  }}
/>

                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
           <Form.Check
  type="checkbox"
  id="isAgree"
  name="isAgree"
  label="By Confirming the box I agree the above given details are true"
  checked={form.isAgree}
  onChange={handleChange}
  className="d-flex justify-content-center align-items-center my-2 gap-2"
  style={{
    color: "#fff",             // label text color
    cursor: "pointer",         // pointer on hover
    fontWeight: 500,           // slightly bold
  }}
  
  
/>

            </Card>

            {/* Action Buttons */}
            <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mt-5">
              
              <Button
                variant="outline-light"
                type="button"
                onClick={handleReset}
                className="btn-lg px-5 py-3 fw-bold"
                style={{ 
                  borderRadius: "12px",
                  border: "2px solid #555",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#333";
                  e.currentTarget.style.borderColor = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = "#555";
                }}
              >
                Reset Form
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="btn-lg px-5 py-3 fw-bold"
                style={{ 
                  backgroundColor: "#007bff",
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0 4px 15px rgba(0, 123, 255, 0.3)",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#0056b3";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 123, 255, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#007bff";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 123, 255, 0.3)";
                }}
              >
                Submit Vehicle Details
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Footer Note */}
      <div className="text-center mt-4">
        <p className="text-white" style={{ fontSize: "0.9rem" }}>
          By submitting this form, you agree to our Terms & Conditions. 
          Our team will contact you within 24 hours.
        </p>
      </div>
    </Container>
  );
}