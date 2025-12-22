import { useEffect, type FC } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion, type Variants } from "framer-motion";
import {
  SiBmw,
  SiMercedes,
  SiAudi,
  SiPorsche,
  SiFerrari,
  SiLamborghini,
  SiTesla,
  SiVolkswagen,
  SiToyota,
  SiHyundai,
  SiHonda,
  SiFord,
  SiNissan,
  SiChevrolet,
  SiKia,
  SiSkoda,
  SiMazda,
  SiVolvo,
  SiJeep,
  SiMitsubishi,
} from "react-icons/si";
import { useNavigate } from "react-router-dom";

const brandIcons = [
  SiBmw, SiMercedes, SiAudi, SiPorsche, SiFerrari, SiLamborghini, SiTesla, SiVolkswagen,
  SiToyota, SiHyundai, SiHonda, SiFord, SiNissan, SiChevrolet, SiKia, SiSkoda,
  SiMazda, SiVolvo, SiJeep, SiMitsubishi,
];

/* ================= SCROLL VARIANTS ================= */
const scrollReveal = (direction: "up" | "down" = "up"): Variants => ({
  hidden: { opacity: 0, y: direction === "up" ? 70 : -70 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
});

const About: FC = () => {
  const navigate=useNavigate();
  useEffect(()=>{
    window.scrollTo({top:0,behavior:"smooth"})
  })
  return (
    <div
      style={{
        backgroundColor: "#0a0a0a", // Deep black background
        color: "#fff",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {/* ================= HERO ================= */}
      <motion.section
        variants={scrollReveal("up")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        style={{
          minHeight: "80vh",
          background: "url('/young-couple-talking-sales-person-car-showroom.jpg') center/cover no-repeat",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.65)",
          }}
        />

        <Container style={{ position: "relative", zIndex: 2 }}>
          <motion.div variants={scrollReveal("up")}>
            <h1
              style={{
                fontSize: "clamp(2rem, 6vw, 3.8rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                color: "#fff",
                textShadow: "0 4px 15px rgba(13,202,240,.35), 0 2px 6px rgba(0,0,0,.6)",
              }}
            >
              About{" "}
              <span
                style={{
                  color: "#0dcaf0",
                  textShadow: "0 0 12px rgba(13,202,240,.6)",
                }}
              >
                AutoMart
              </span>
            </h1>
            <p
              style={{
                fontSize: "clamp(0.9rem, 2.5vw, 1.25rem)",
                color: "#ccc",
                maxWidth: "600px",
                margin: "1rem auto",
              }}
            >
              Your trusted destination for premium, certified used cars. We bring transparency, quality, and luxury together — so every drive feels confident and refined.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "1rem",
                marginTop: "1.5rem",
              }}
            >
              {["Certified Vehicles", "Verified History", "Luxury Brands", "Best Market Value"].map((text, index) => (
                <div
                  key={index}
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    padding: "0.6rem 1rem",
                    borderRadius: "30px",
                    fontSize: "0.85rem",
                    boxShadow: "0 8px 25px rgba(0,0,0,.25)",
                    backdropFilter: "blur(6px)",
                    color: "#fff",
                  }}
                >
                  {text}
                </div>
              ))}
            </div>
          </motion.div>
        </Container>
      </motion.section>

      {/* ================= EXPERIENCE ================= */}
      <motion.section
        variants={scrollReveal("up")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        style={{
          padding: "4rem 1rem",
          background: "#111",
          boxShadow: "inset 0 12px 40px rgba(0,0,0,.04)",
        }}
      >
        <Container>
          <Row className="text-center gy-4">
            <Col xs={6} md={6}>
              <h2
                style={{
                  fontSize: "2.5rem",
                  color: "#0dcaf0",
                  textShadow: "0 4px 10px rgba(13,202,240,.25)",
                }}
              >
                10+
              </h2>
              <p style={{ fontWeight: 500, color: "#ccc" }}>Years of Experience</p>
            </Col>
            <Col xs={6} md={6}>
              <h2
                style={{
                  fontSize: "2.5rem",
                  color: "#0dcaf0",
                  textShadow: "0 4px 10px rgba(13,202,240,.25)",
                }}
              >
                310+
              </h2>
              <p style={{ fontWeight: 500, color: "#ccc" }}>Luxury Models Available</p>
            </Col>
          </Row>
        </Container>
      </motion.section>

      {/* ================= BRAND ICONS ================= */}
      <section style={{ overflow: "hidden", padding: "2rem 0" }}>
        <motion.div
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ display: "flex", alignItems: "center", gap: "3rem", paddingLeft: "2rem" }}
        >
          {brandIcons.map((Icon, index) => (
            <motion.span
              key={index}
              whileHover={{ y: -6, scale: 1.15 }}
              transition={{ type: "spring", stiffness: 200 }}
              style={{
                width: "60px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0dcaf0",
                fontSize: "2.5rem",
                textShadow: "0 0 14px rgba(13,202,240,.6)",
                flexShrink: 0,
              }}
            >
              <Icon />
            </motion.span>
          ))}
        </motion.div>
      </section>

      {/* ================= WHO WE ARE ================= */}
      <motion.section
        variants={scrollReveal("up")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{
          padding: "4rem 1rem",
          background: "#111",
          boxShadow: "inset 0 10px 30px rgba(0,0,0,.04)",
        }}
      >
        <Container>
          <Row className="align-items-center gy-5">
            <Col xs={12} md={6}>
              <motion.img
                src="/people-vehicle-dealership-buying-new-car.jpg"
                alt="Who we are"
                variants={scrollReveal("down")}
                style={{
                  width: "100%",
                  borderRadius: "18px",
                  boxShadow: "0 25px 60px rgba(0,0,0,.28)",
                }}
              />
            </Col>
            <Col xs={12} md={6}>
              <motion.div variants={scrollReveal("up")}>
                <h3
                  style={{
                    fontSize: "2rem",
                    fontWeight: 700,
                    position: "relative",
                    marginBottom: "1.2rem",
                  }}
                >
                  Who We Are
                  <span
                    style={{
                      display: "block",
                      width: "60px",
                      height: "4px",
                      background: "#0dcaf0",
                      borderRadius: "4px",
                      marginTop: "10px",
                    }}
                  />
                </h3>
                <p style={{ color: "#ccc", fontSize: "1rem", lineHeight: 1.6 }}>
                  AutoMart is more than just a used-car showroom — we are a destination for drivers who value quality, trust, and transparency. Every vehicle undergoes strict inspection and verification to ensure peace of mind.
                </p>
                <p style={{ color: "#ccc", fontSize: "1rem", lineHeight: 1.6, marginTop: "0.5rem" }}>
                  With years of industry expertise, we specialize in delivering premium vehicles at the best market value, supported by customer-first service and complete documentation clarity.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem", marginTop: "1.5rem" }}>
                  {["Certified & Inspected Cars", "100% Transparent Pricing", "Verified Ownership History", "Trusted by 1000+ Customers"].map((item, index) => (
                    <div
                      key={index}
                      style={{
                        background: "#1a1a1a",
                        padding: "1rem",
                        borderRadius: "14px",
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        boxShadow: "0 10px 30px rgba(0,0,0,.28)",
                        color: "#fff",
                        textAlign: "center",
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </motion.section>

      {/* ================= CTA ================= */}
      <motion.section
        initial={{ opacity: 0, y: 80, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1 }}
        style={{
          minHeight: "70vh",
          background: "url('/family-with-baby-girl-choosing-car-car-salon.jpg') center/cover no-repeat",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,.75), rgba(0,0,0,.65))",
          }}
        />

        <Container style={{ position: "relative", zIndex: 2 }}>
          <motion.div>
            <h2 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>
              Drive in Style with <span style={{ color: "#0dcaf0" }}>AutoMart</span>
            </h2>
            <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.15rem)", color: "#ccc", maxWidth: "600px", margin: "0 auto 1.5rem" }}>
              Discover premium used cars that match your lifestyle, budget, and expectations — all backed by trust, transparency, and expert guidance.
            </p>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
              {["Certified Vehicles", "Transparent Pricing", "Easy Financing", "After-Sales Support"].map((text, index) => (
                <div
                  key={index}
                  style={{
                    background: "rgba(255,255,255,.1)",
                    padding: "0.6rem 1.2rem",
                    borderRadius: "30px",
                    fontSize: "0.85rem",
                    boxShadow: "0 6px 20px rgba(0,0,0,.35)",
                    color: "#fff",
                  }}
                >
                  {text}
                </div>
              ))}
            </div>
            <Button
            onClick={()=>navigate('/contact')}
              size="lg"
              variant="info"
              className="rounded-pill fw-semibold"
              style={{ transition: "all .35s ease", boxShadow: "0 10px 30px rgba(13,202,240,.45)" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px) scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              Contact Us
            </Button>
          </motion.div>
        </Container>
      </motion.section>
    </div>
  );
};

export default About;
