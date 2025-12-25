
import { useState, useEffect } from "react";
import { Card, Form, Button, Badge, Row, Col, InputGroup, FormControl, Spinner,Modal } from "react-bootstrap";
import { Search, Heart, Calendar, Gauge, Fuel, Settings, MapPin, Filter, Star, Zap, Shield } from "lucide-react";

interface Car {
  _id: string;
  name: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  location: string;
  image: string[];
  condition: "Excellent" | "Good" | "Fair" | "New";
  featured: boolean;
  description?: string;
  engineCapacity?: string;
  color?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function Collections() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFuelType, setSelectedFuelType] = useState("all");
  const [selectedTransmission, setSelectedTransmission] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
const [selectedCar, setSelectedCar] = useState<Car | null>(null);
const [showModal, setShowModal] = useState(false);

const handleViewDetails = (car: Car) => {
  setSelectedCar(car);
  setShowModal(true);
};

const handleCloseModal = () => {
  setSelectedCar(null);
  setShowModal(false);
};
  // Fetch cars from API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log("Fetching cars from:", `${import.meta.env.VITE_BACKEND_URL}/api/cars`);
        
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cars`);
        
        console.log("Response status:", response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Response error text:", errorText);
          throw new Error(`Failed to fetch cars: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("API Response data:", data);
        
        // Handle the specific response format: {data: [...], total: number}
        if (data.data && Array.isArray(data.data)) {
          setCars(data.data);
        } else if (Array.isArray(data)) {
          // Fallback: direct array response
          setCars(data);
        } else {
          console.error("Unknown data format:", data);
          throw new Error("Invalid data format received from API");
        }
        
      } catch (err) {
        console.error("Error fetching cars:", err);
        setError(err instanceof Error ? err.message : "Failed to load cars");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const toggleFavorite = (carId: string) => {
    setFavorites(prev => 
      prev.includes(carId) 
        ? prev.filter(id => id !== carId) 
        : [...prev, carId]
    );
  };

  // Format mileage for display
  const formatMileage = (mileage: number) => {
    return mileage.toLocaleString() + " miles";
  };

  // Safe access for car properties with defaults
  const getCarName = (car: Car) => car.name || "Unnamed Vehicle";
  const getCarModel = (car: Car) => car.model || "";
  const getCarYear = (car: Car) => car.year || "N/A";
  const getCarPrice = (car: Car) => car.price || 0;
  const getCarMileage = (car: Car) => car.mileage || 0;
  const getCarFuelType = (car: Car) => car.fuelType || "Unknown";
  const getCarTransmission = (car: Car) => car.transmission || "Unknown";
  const getCarLocation = (car: Car) => car.location || "Location not specified";
  const getCarCondition = (car: Car) => car.condition || "Good";
  const getCarFeatured = (car: Car) => car.featured || false;
  const getCarImages = (car: Car) => {
  if (car.image) {
    return [`${import.meta.env.VITE_BACKEND_URL}/uploads/cars/${car.image}`];
  }
  return [];
};


  const filteredCars = cars.filter(car => {
    const name = getCarName(car).toLowerCase();
    const model = getCarModel(car).toLowerCase();
    const description = car.description?.toLowerCase() || "";
    
    const matchesSearch = searchQuery === "" || 
      name.includes(searchQuery.toLowerCase()) ||
      model.includes(searchQuery.toLowerCase()) ||
      description.includes(searchQuery.toLowerCase());

    const fuelType = getCarFuelType(car);
    const matchesFuel = selectedFuelType === "all" || fuelType === selectedFuelType;

    const transmission = getCarTransmission(car);
    const matchesTransmission = selectedTransmission === "all" || transmission === selectedTransmission;

    const price = getCarPrice(car);
    let matchesPrice = true;
    if (selectedPriceRange === "0-50000") {
      matchesPrice = price <= 50000;
    } else if (selectedPriceRange === "50000-75000") {
      matchesPrice = price > 50000 && price <= 75000;
    } else if (selectedPriceRange === "75000+") {
      matchesPrice = price > 75000;
    }

    const year = getCarYear(car);
    let matchesYear = true;
    if (selectedYear !== "all") {
      matchesYear = year === Number(selectedYear);
    }

    return matchesSearch && matchesFuel && matchesTransmission && matchesPrice && matchesYear;
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            if (id) {
              setVisibleCards(prev => new Set([...prev, id]));
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.car-card').forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [filteredCars]);

  const getConditionVariant = (condition: string) => {
    switch (condition) {
      case "Excellent": return "success";
      case "Good": return "primary";
      case "Fair": return "warning";
      case "New": return "info";
      default: return "secondary";
    }
  };

  const getConditionText = (condition: string) => {
    switch (condition) {
      case "New": return "Brand New";
      default: return condition || "Good";
    }
  };

const getYearOptions = () => {
  const years = Array.from(
    new Set(cars.map(car => Number(getCarYear(car))))
  ).sort((a, b) => b - a);

  return years.map(year => (
    <option key={year} value={year}>
      {year}
    </option>
  ));
};


  const getFuelTypeOptions = () => {
    const fuelTypes = Array.from(new Set(cars.map(car => getCarFuelType(car))));
    return fuelTypes.map(type => (
      <option key={type} value={type}>{type}</option>
    ));
  };

  const getTransmissionOptions = () => {
    const transmissions = Array.from(new Set(cars.map(car => getCarTransmission(car))));
    return transmissions.map(type => (
      <option key={type} value={type}>{type}</option>
    ));
  };

  // Calculate statistics
  const totalCars = cars.length;
  const averagePrice = totalCars > 0 
    ? Math.round(cars.reduce((sum, car) => sum + getCarPrice(car), 0) / totalCars)
    : 0;
  const featuredCars = cars.filter(car => getCarFeatured(car)).length;

  const styles = `
    body {
      background: #0a0a0a !important;
      color: #e0e0e0 !important;
    }

    .container {
      background: transparent;
    }

    .car-card {
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      opacity: 0;
      transform: translateY(30px);
      cursor: pointer;
      overflow: hidden;
      border: 1px solid #333;
      border-radius: 16px;
      background: linear-gradient(145deg, #1a1a1a, #151515);
      position: relative;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .car-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(33, 150, 243, 0.5), transparent);
      z-index: 1;
    }
    
    .car-card.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .car-card:hover {
      transform: translateY(-10px) scale(1.02);
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3), 
                  0 0 0 1px rgba(33, 150, 243, 0.15),
                  0 0 30px rgba(33, 150, 243, 0.1);
      border-color: #2196F3;
      background: linear-gradient(145deg, #1f1f1f, #181818);
    }
    
    .card-img-wrapper {
      position: relative;
      overflow: hidden;
      border-radius: 15px 15px 0 0;
      height: 220px;
    }
    
    .car-card .card-img-top {
      transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      height: 100%;
      width: 100%;
      object-fit: cover;
      filter: brightness(0.9);
    }
    
    .car-card:hover .card-img-top {
      transform: scale(1.08);
      filter: brightness(1.1);
    }
    
    .card-img-overlay {
      background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 50%, rgba(0,0,0,0.9) 100%);
    }
    
    .favorite-btn {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content-center;
      backdrop-filter: blur(20px);
      background: rgba(30, 30, 30, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
      border-radius: 12px;
    }
    
    .favorite-btn:hover {
      transform: scale(1.15) rotate(5deg);
      background: rgba(40, 40, 40, 0.9);
      border-color: rgba(220, 53, 69, 0.5);
      box-shadow: 0 0 20px rgba(220, 53, 69, 0.3);
    }
    
    .favorite-btn.favorited {
      background: rgba(220, 53, 69, 0.9);
      border-color: #dc3545;
      box-shadow: 0 0 25px rgba(220, 53, 69, 0.4);
    }
    
    .featured-badge {
      background: linear-gradient(135deg, #ff6b00, #ff9500, #ffd700);
      font-weight: 700;
      letter-spacing: 1px;
      padding: 8px 16px;
      border-radius: 20px;
      border: 1px solid rgba(255, 215, 0, 0.3);
      box-shadow: 0 4px 15px rgba(255, 165, 0, 0.2);
      text-transform: uppercase;
      font-size: 0.75rem;
    }
    
    .condition-badge {
      font-weight: 600;
      padding: 8px 16px;
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      text-transform: uppercase;
      font-size: 0.75rem;
    }
    
    .car-price {
      background: linear-gradient(135deg, #2196F3, #00BCD4);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 800;
      font-size: 1.75rem;
      letter-spacing: -0.5px;
      text-shadow: 0 2px 10px rgba(33, 150, 243, 0.3);
    }
    
    .search-card {
      background: rgba(20, 20, 20, 0.8);
      border: 1px solid #333;
      border-radius: 20px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(20px);
      overflow: hidden;
      position: relative;
    }
    
    .search-card::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(45deg, #2196F3, #00BCD4, #2196F3);
      border-radius: 22px;
      z-index: -1;
      opacity: 0.1;
    }
    
    .filter-toggle {
      transition: all 0.3s ease;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 24px;
      border: 1px solid #444;
      background: rgba(30, 30, 30, 0.8);
      color: #e0e0e0;
      border-radius: 12px;
    }
    
    .filter-toggle:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
      border-color: #2196F3;
      background: rgba(40, 40, 40, 0.9);
    }
    
    .form-select {
      border-radius: 12px;
      border: 1px solid #444;
      background: rgba(25, 25, 25, 0.8);
      color: #e0e0e0;
      transition: all 0.3s ease;
      font-weight: 500;
      padding: 12px;
    }
    
    .form-select:focus {
      border-color: #2196F3;
      box-shadow: 0 0 0 0.25rem rgba(33, 150, 243, 0.25);
      background: rgba(30, 30, 30, 0.9);
    }
    
    .form-select option {
      background: #1a1a1a;
      color: #e0e0e0;
    }
    
    .hero-section {
      background: linear-gradient(135deg, #2196F3 0%, #00BCD4 50%, #4CAF50 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: 0 4px 30px rgba(33, 150, 243, 0.3);
      position: relative;
      display: inline-block;
    }
    
    .hero-section::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg, transparent, #2196F3, transparent);
      border-radius: 3px;
    }
    
    .empty-state {
      animation: fadeIn 0.6s ease;
      border-radius: 20px;
      background: linear-gradient(135deg, #1a1a1a, #151515);
      border: 1px solid #333;
      position: relative;
      overflow: hidden;
    }
    
    .empty-state::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, #2196F3, transparent);
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .contact-btn {
      background: linear-gradient(135deg, #2196F3, #00BCD4);
      border: none;
      border-radius: 14px;
      font-weight: 700;
      letter-spacing: 0.8px;
      padding: 14px;
      transition: all 0.4s ease;
      position: relative;
      overflow: hidden;
      text-transform: uppercase;
      font-size: 0.9rem;
      box-shadow: 0 4px 15px rgba(33, 150, 243, 0.2);
    }
    
    .contact-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: 0.6s;
    }
    
    .contact-btn:hover::before {
      left: 100%;
    }
    
    .contact-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 15px 30px rgba(33, 150, 243, 0.4);
      background: linear-gradient(135deg, #1976D2, #0097A7);
    }
    
    .search-input {
      border-radius: 14px;
      border: 1px solid #444;
      background: rgba(30, 30, 30, 0.9);
      color: #aaa;
      padding: 14px 20px;
      font-size: 1rem;
      transition: all 0.3s ease;
    }
    
    .search-input::placeholder {
      color: #aaa;
      opacity: 1;
    }
    
    .search-input:focus {
      outline: none;
      border-color: #2196F3;
      box-shadow: 0 0 8px rgba(33, 150, 243, 0.5);
      background: #fff;
      color: #000;
    }
    
    .input-group-text {
      border-radius: 14px 0 0 14px;
      background: linear-gradient(135deg, #2196F3, #00BCD4);
      border: 1px solid #2196F3;
      color: white;
      font-weight: 600;
      padding: 14px 20px;
    }
    
    .car-spec-icon {
      color: #2196F3;
      filter: drop-shadow(0 2px 4px rgba(33, 150, 243, 0.3));
    }
    
    .car-model {
      color: #aaa;
      font-weight: 500;
      letter-spacing: 0.5px;
    }
    
    .stats-count {
      color: #2196F3;
      font-weight: 700;
      text-shadow: 0 2px 10px rgba(33, 150, 243, 0.3);
    }
    
    .clear-btn {
      border-radius: 10px;
      border: 1px solid #444;
      transition: all 0.3s ease;
    }
    
    .clear-btn:hover {
      border-color: #2196F3;
      background: rgba(33, 150, 243, 0.1);
    }
    
    .card-title {
      color: #fff;
      font-weight: 700;
      font-size: 1.25rem;
    }
    
    .text-muted {
      color: #aaa !important;
    }
    
    .lead {
      color: #bbb;
    }
    
    .card-subtitle {
      color: #888 !important;
    }
    
    .stats-row {
      background: rgba(30, 30, 30, 0.6);
      border-radius: 12px;
      padding: 15px;
      border: 1px solid #333;
      margin-top: 20px;
    }
    
    .stats-item {
      text-align: center;
      padding: 10px;
    }
    
    .stats-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: #2196F3;
      display: block;
    }
    
    .stats-label {
      font-size: 0.875rem;
      color: #aaa;
      display: block;
      margin-top: 5px;
    }
    
    .pulse {
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0% { opacity: 0.7; }
      50% { opacity: 1; }
      100% { opacity: 0.7; }
    }
    
    .premium-tag {
      position: absolute;
      top: 15px;
      right: 15px;
      background: linear-gradient(135deg, #ff6b00, #ff9500);
      color: black;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.7rem;
      font-weight: 800;
      letter-spacing: 1px;
      text-transform: uppercase;
      transform: rotate(15deg);
      box-shadow: 0 4px 15px rgba(255, 107, 0, 0.3);
      z-index: 2;
    }

    .loading-spinner {
      min-height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .error-state {
      animation: fadeIn 0.6s ease;
      border-radius: 20px;
      background: linear-gradient(135deg, rgba(220, 53, 69, 0.1), rgba(220, 53, 69, 0.05));
      border: 1px solid rgba(220, 53, 69, 0.3);
      position: relative;
      overflow: hidden;
    }
  `;

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="container my-5 loading-spinner" style={{ maxWidth: '1400px' }}>
          <div className="text-center">
            <Spinner animation="border" variant="primary" style={{ width: '4rem', height: '4rem' }} />
            <h4 className="mt-4 text-white">Loading Premium Collection...</h4>
            <p className="text-muted">Please wait while we fetch the latest vehicles</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <style>{styles}</style>
        <div className="container my-5" style={{ maxWidth: '1400px' }}>
          <div className="text-center mb-3 py-5">
            <h1 className="hero-section display-3 fw-bold mb-3">
              <Zap className="me-3" style={{ filter: 'drop-shadow(0 0 10px #2196F3)' }} />
              Premium Collection
            </h1>
          </div>
          <Card className="text-center p-5 error-state">
            <div className="mb-4">
              <h3 className="fw-bold mb-3 text-danger">Error Loading Vehicles</h3>
              <p className="text-muted mb-4 fs-5">{error}</p>
              <Button 
                variant="danger" 
                onClick={() => window.location.reload()}
                className="px-5 py-2"
              >
                Retry
              </Button>
              <div className="mt-4">
                <small className="text-muted">
                  URL: {import.meta.env.VITE_BACKEND_URL}/api/cars
                </small>
              </div>
            </div>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="container my-5" style={{ maxWidth: '1400px' }}>
        {/* Hero Section */}
        <div className="text-center mb-3 py-5">
          <h1 className="hero-section display-3 fw-bold mb-3">
            <Zap className="me-3" style={{ filter: 'drop-shadow(0 0 10px #2196F3)' }} />
            Premium Collection
            <Star className="ms-3" style={{ filter: 'drop-shadow(0 0 10px #FFD700)' }} />
          </h1>
          <p className="lead mb-3" style={{ fontSize: '1.25rem' }}>
            Discover premium pre-owned vehicles handpicked for quality and performance
          </p>
          
          {/* Stats Row */}
          <Row className="stats-row justify-content-center">
            <Col xs={4} md={2} className="stats-item">
              <span className="stats-value pulse">{totalCars}</span>
              <span className="stats-label">Total Vehicles</span>
            </Col>
            <Col xs={4} md={2} className="stats-item">
              <span className="stats-value">${averagePrice.toLocaleString()}</span>
              <span className="stats-label">Avg Price</span>
            </Col>
            <Col xs={4} md={2} className="stats-item">
              <span className="stats-value">{featuredCars}</span>
              <span className="stats-label">Featured</span>
            </Col>
          </Row>
        </div>

        {/* Search & Filters */}
        <Card className="mb-3 p-4 search-card">
          <Form>
            <InputGroup className="mb-4">
              <InputGroup.Text>
                <Search size={22} />
              </InputGroup.Text>
              <FormControl
                placeholder="Search by car name, model, or features..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <Button
                variant="outline-primary"
                onClick={() => setShowFilters(!showFilters)}
                className="filter-toggle"
              >
                <Filter size={20} />
                {showFilters ? "Hide Filters ▲" : "Show Filters ▼"}
              </Button>
              
              <span className="text-muted d-none d-md-block">
                {filteredCars.length} of {totalCars} vehicles
              </span>
            </div>

            {showFilters && (
              <div style={{ animation: 'fadeIn 0.5s ease' }}>
                <Row className="mb-4 g-3">
                  <Col md={3} sm={6}>
                    <Form.Select 
                      value={selectedFuelType} 
                      onChange={(e) => setSelectedFuelType(e.target.value)}
                    >
                      <option value="all">All Fuel Types</option>
                      {getFuelTypeOptions()}
                    </Form.Select>
                  </Col>
                  <Col md={3} sm={6}>
                    <Form.Select 
                      value={selectedTransmission} 
                      onChange={(e) => setSelectedTransmission(e.target.value)}
                    >
                      <option value="all">All Transmissions</option>
                      {getTransmissionOptions()}
                    </Form.Select>
                  </Col>
                  <Col md={3} sm={6}>
                    <Form.Select 
                      value={selectedPriceRange} 
                      onChange={(e) => setSelectedPriceRange(e.target.value)}
                    >
                      <option value="all">All Prices</option>
                      <option value="0-50000">Under $50,000</option>
                      <option value="50000-75000">$50,000 - $75,000</option>
                      <option value="75000+">Above $75,000</option>
                    </Form.Select>
                  </Col>
                  <Col md={3} sm={6}>
                    <Form.Select 
                      value={selectedYear} 
                      onChange={(e) => setSelectedYear(e.target.value)}
                    >
                      <option value="all">All Years</option>
                      {getYearOptions()}
                    </Form.Select>
                  </Col>
                </Row>
              </div>
            )}

            {(searchQuery || selectedFuelType !== "all" || selectedTransmission !== "all" || selectedPriceRange !== "all" || selectedYear !== "all") && (
              <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top border-dark">
                <div>
                  <span className="text-muted me-3">
                    <span className="stats-count">{filteredCars.length}</span> {filteredCars.length === 1 ? 'vehicle' : 'vehicles'} found
                  </span>
                </div>
                <Button 
                  variant="outline-secondary" 
                  size="sm" 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedFuelType("all");
                    setSelectedTransmission("all");
                    setSelectedPriceRange("all");
                    setSelectedYear("all");
                  }}
                  className="clear-btn px-4"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </Form>
        </Card>

        {/* Cars Grid */}
        {filteredCars.length > 0 ? (
          <Row xs={1} sm={2} lg={4} className="g-4">
            {filteredCars.map(car => (
              <Col key={car._id}>
                <Card 
                  className={`car-card h-100 ${visibleCards.has(car._id) ? 'visible' : ''}`}
                  data-id={car._id}
                >
                  {getCarPrice(car) > 80000 && (
                    <div className="premium-tag">Premium</div>
                  )}
                  
                  <div className="card-img-wrapper">
                    <Card.Img 
                      variant="top" 
                      src={getCarImages(car).length > 0 
                        ? getCarImages(car)[0]
                        : "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      } 
                      alt={`${getCarName(car)} ${getCarModel(car)}`}
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                    
                    <div className="card-img-overlay p-3 d-flex flex-column justify-content-between">
                      <div>
                        {getCarFeatured(car) && (
                          <Badge className="featured-badge position-absolute top-0 start-0 m-3">
                            ⭐ Featured
                          </Badge>
                        )}

                        <div className="d-flex justify-content-end">
                          <Button
                            variant="light"
                            className={`favorite-btn ${favorites.includes(car._id) ? 'favorited' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(car._id);
                            }}
                          >
                            <Heart size={18} fill={favorites.includes(car._id) ? "white" : "none"} />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Badge 
                          bg={getConditionVariant(getCarCondition(car))} 
                          className="condition-badge"
                        >
                          <Shield size={12} className="me-2" />
                          {getConditionText(getCarCondition(car))}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <Card.Body className="p-4">
                    <Card.Title className="mb-2">{getCarName(car)}</Card.Title>
                    <Card.Subtitle className="car-model mb-3">{getCarModel(car)}</Card.Subtitle>
                    <h4 className="car-price mb-4">${getCarPrice(car).toLocaleString()}</h4>

                    <div className="car-specs">
                      <Row className="mt-3">
                        <Col xs={6} className="d-flex align-items-center mb-3">
                          <Calendar className="car-spec-icon me-2" size={18} /> 
                          <small className="text-muted">{getCarYear(car)}</small>
                        </Col>
                        <Col xs={6} className="d-flex align-items-center mb-3">
                          <Gauge className="car-spec-icon me-2" size={18} /> 
                          <small className="text-muted">{formatMileage(getCarMileage(car))}</small>
                        </Col>
                        <Col xs={6} className="d-flex align-items-center mb-3">
                          <Fuel className="car-spec-icon me-2" size={18} /> 
                          <small className="text-muted">{getCarFuelType(car)}</small>
                        </Col>
                        <Col xs={6} className="d-flex align-items-center mb-3">
                          <Settings className="car-spec-icon me-2" size={18} /> 
                          <small className="text-muted">{getCarTransmission(car)}</small>
                        </Col>
                        <Col xs={12} className="d-flex align-items-center mt-2 pt-3 border-top border-dark">
                          <MapPin className="car-spec-icon me-2" size={18} /> 
                          <small className="text-muted">{getCarLocation(car)}</small>
                        </Col>
                      </Row>
                    </div>

                   <Button 
  variant="primary" 
  className="contact-btn w-100 mt-4"
  onClick={() => handleViewDetails(car)}
>
  View Details
</Button>

                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Row>
            <Col xs={12}>
              <Card className="text-center p-5 empty-state">
                <div className="mb-4">
                  <Search size={70} className="mb-4 text-muted" style={{ filter: 'drop-shadow(0 0 10px rgba(33, 150, 243, 0.3))' }} />
                  <h3 className="fw-bold mb-3">
                    {cars.length === 0 ? "No vehicles available" : "No vehicles found"}
                  </h3>
                  <p className="text-muted mb-4 fs-5">
                    {cars.length === 0 
                      ? "Check back soon for new arrivals!" 
                      : "Try adjusting your search or filters to find what you're looking for."
                    }
                  </p>
                  {cars.length > 0 && (
                    <Button 
                      variant="primary" 
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedFuelType("all");
                        setSelectedTransmission("all");
                        setSelectedPriceRange("all");
                        setSelectedYear("all");
                      }}
                      className="px-5 py-2"
                    >
                      Clear All Filters
                    </Button>
                  )}
                </div>
              </Card>
            </Col>
          </Row>
        )}
         <Modal
  show={showModal}
  onHide={handleCloseModal}
  size="lg"
  centered
  className="text-light"
>
  <Modal.Header closeButton style={{ borderBottom: "" }}>
    <Modal.Title>{selectedCar?.name} {selectedCar?.model}</Modal.Title>
  </Modal.Header>
  <Modal.Body style={{ background: "white" }}>
    {selectedCar && (
      <Row>
        <Col md={6}>
          <img
            src={getCarImages(selectedCar)[0] || "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
            alt={`${selectedCar.name} ${selectedCar.model}`}
            style={{ width: "100%", borderRadius: "12px", marginBottom: "15px" }}
          />
        </Col>
        <Col md={6}>
          <h4 className="mb-3 car-price">${getCarPrice(selectedCar).toLocaleString()}</h4>
          <p>{selectedCar.description || "No description available."}</p>

          <Row className="mt-4">
            <Col xs={6} className="mb-2">
              <Calendar className="me-2" /> Year: {getCarYear(selectedCar)}
            </Col>
            <Col xs={6} className="mb-2">
              <Gauge className="me-2" /> Mileage: {formatMileage(getCarMileage(selectedCar))}
            </Col>
            <Col xs={6} className="mb-2">
              <Fuel className="me-2" /> Fuel: {getCarFuelType(selectedCar)}
            </Col>
            <Col xs={6} className="mb-2">
              <Settings className="me-2" /> Transmission: {getCarTransmission(selectedCar)}
            </Col>
            <Col xs={12} className="mb-2">
              <MapPin className="me-2" /> Location: {getCarLocation(selectedCar)}
            </Col>
            {selectedCar.engineCapacity && (
              <Col xs={12} className="mb-2">
                <Zap className="me-2" /> Engine: {selectedCar.engineCapacity}
              </Col>
            )}
            {selectedCar.color && (
              <Col xs={12} className="mb-2">
                <Star className="me-2" /> Color: {selectedCar.color}
              </Col>
            )}
            <Col xs={12} className="mt-3">
              <Badge bg={getConditionVariant(getCarCondition(selectedCar))} className="condition-badge">
                <Shield className="me-2" /> {getConditionText(getCarCondition(selectedCar))}
              </Badge>
              {getCarFeatured(selectedCar) && (
                <Badge bg="warning" className="ms-2 condition-badge">
                  ⭐ Featured
                </Badge>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    )}
  </Modal.Body>
  <Modal.Footer style={{ borderTop: "1px solid #333" }}>
    <Button variant="secondary" onClick={handleCloseModal}>
      Close
    </Button>
    
  </Modal.Footer>
</Modal>

        {/* Footer Note */}
        <div className="text-center mt-5 pt-4 border-top border-dark">
          <p className="text-muted mb-0">
            <small>All vehicles are thoroughly inspected and certified for quality assurance</small>
          </p>
        </div>
      </div>
    </>
  );
}