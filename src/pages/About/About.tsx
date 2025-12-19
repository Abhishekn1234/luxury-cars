import type { FC } from "react";
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
const brandIcons = [
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
];


/* ================= SCROLL VARIANTS ================= */
const scrollReveal = (direction: "up" | "down" = "up"): Variants => ({
  hidden: {
    opacity: 0,
    y: direction === "up" ? 70 : -70,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
});

const About: FC = () => {
  return (
    <>
      {/* ================= HERO ================= */}
    {/* ================= HERO ================= */}
<motion.section
  variants={scrollReveal("up")}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.6 }}
  style={{
    height: "100vh",
    background:
      "url('/young-couple-talking-sales-person-car-showroom.jpg') center/cover no-repeat",
    position: "relative",
  }}
>
  {/* Overlay */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.65)",
    }}
  />

  <Container className="h-100 d-flex align-items-center">
    <Row className="w-100 align-items-center">
      {/* LEFT CONTENT */}
      <Col md={7}>
        <div style={{ position: "relative", color: "#fff" }}>
          <motion.h1
            variants={scrollReveal("up")}
            style={{
              fontSize: "3.8rem",
              fontWeight: 700,
              lineHeight: 1.2,
              textShadow:
                "0 4px 15px rgba(13,202,240,.35), 0 2px 6px rgba(0,0,0,.6)",
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
          </motion.h1>

          <motion.p
            variants={scrollReveal("up")}
            style={{
              fontSize: "1.25rem",
              maxWidth: "620px",
              marginTop: "1rem",
              opacity: 0.95,
            }}
          >
            Your trusted destination for premium, certified used cars.
            We bring transparency, quality, and luxury together — so every
            drive feels confident and refined.
          </motion.p>

          {/* FEATURES */}
          <motion.div
            variants={scrollReveal("up")}
            style={{
              display: "flex",
              gap: "2rem",
              marginTop: "2rem",
              flexWrap: "wrap",
            }}
          >
            {[
              "Certified Vehicles",
              "Verified History",
              "Luxury Brands",
              "Best Market Value",
            ].map((text, index) => (
              <div
                key={index}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  padding: "0.8rem 1.4rem",
                  borderRadius: "30px",
                  fontSize: "0.95rem",
                  boxShadow: "0 8px 25px rgba(0,0,0,.25)",
                  backdropFilter: "blur(6px)",
                }}
              >
                {text}
              </div>
            ))}
          </motion.div>
        </div>
      </Col>

      {/* RIGHT STATS CARD */}
      <Col md={5} className="d-none d-md-block">
        <motion.div
          variants={scrollReveal("down")}
          style={{
            background: "rgba(0,0,0,0.55)",
            borderRadius: "20px",
            padding: "2.5rem",
            boxShadow: "0 30px 80px rgba(0,0,0,.45)",
            color: "#fff",
            backdropFilter: "blur(8px)",
          }}
        >
          <h4 style={{ fontWeight: 600, marginBottom: "1.5rem" }}>
            Why Choose Us
          </h4>

          {[
            { label: "Years of Experience", value: "10+" },
            { label: "Luxury Cars Available", value: "310+" },
            { label: "Customer Satisfaction", value: "100%" },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1.2rem",
                paddingBottom: "0.8rem",
                borderBottom: "1px solid rgba(255,255,255,.15)",
              }}
            >
              <span>{item.label}</span>
              <span style={{ color: "#0dcaf0", fontWeight: 700 }}>
                {item.value}
              </span>
            </div>
          ))}
        </motion.div>
      </Col>
    </Row>
  </Container>
</motion.section>


      {/* ================= EXPERIENCE ================= */}
      <motion.section
        variants={scrollReveal("up")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        style={{
          padding: "5rem 0",
          background: "#fff",
          boxShadow: "inset 0 12px 40px rgba(0,0,0,.04)",
        }}
      >
        <Container>
          <Row className="text-center gy-4">
            <Col md={6}>
              <h2
                style={{
                  fontSize: "3rem",
                  color: "#0dcaf0",
                  textShadow: "0 4px 10px rgba(13,202,240,.25)",
                }}
              >
                10+
              </h2>
              <p style={{ fontWeight: 500 }}>Years of Experience</p>
            </Col>
            <Col md={6}>
              <h2
                style={{
                  fontSize: "3rem",
                  color: "#0dcaf0",
                  textShadow: "0 4px 10px rgba(13,202,240,.25)",
                }}
              >
                310+
              </h2>
              <p style={{ fontWeight: 500 }}>Luxury Models Available</p>
            </Col>
          </Row>
        </Container>
      </motion.section>

      {/* ================= BRAND ICONS ================= */}
<section
  style={{
    
    overflow: "hidden",
    padding: "3rem 0",
  }}
>
  <motion.div
    animate={{ x: ["100%", "-100%"] }}
    transition={{
      duration: 30,
      repeat: Infinity,
      ease: "linear",
    }}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "5rem",
      paddingLeft: "5rem",
    }}
  >
    {brandIcons.map((Icon, index) => (
      <motion.span
        key={index}
        whileHover={{ y: -6, scale: 1.15 }}
        transition={{ type: "spring", stiffness: 200 }}
        style={{
          width: "70px",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#0dcaf0",
          fontSize: "3.4rem",
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
    padding: "6rem 0",
    background: "#f8f9fa",
    boxShadow: "inset 0 10px 30px rgba(0,0,0,.04)",
  }}
>
  <Container>
    <Row className="align-items-center gy-5">
      {/* IMAGE */}
      <Col md={6}>
        <motion.img
          src="/people-vehicle-dealership-buying-new-car.jpg"
          alt="Who we are"
          variants={scrollReveal("down")}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            width: "100%",
            borderRadius: "18px",
            boxShadow: "0 25px 60px rgba(0,0,0,.28)",
          }}
        />
      </Col>

      {/* CONTENT */}
      <Col md={6}>
        <motion.div variants={scrollReveal("up")}>
          <h3
            style={{
              fontSize: "2.6rem",
              fontWeight: 700,
              position: "relative",
              marginBottom: "1.2rem",
            }}
          >
            Who We Are
            <span
              style={{
                display: "block",
                width: "70px",
                height: "4px",
                background: "#0dcaf0",
                borderRadius: "4px",
                marginTop: "10px",
              }}
            />
          </h3>

          <p
            style={{
              color: "#444",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              textShadow: "0 2px 6px rgba(0,0,0,.12)",
            }}
          >
            AutoMart is more than just a used-car showroom — we are a destination
            for drivers who value quality, trust, and transparency. Every
            vehicle in our collection undergoes strict inspection and
            verification to ensure peace of mind.
          </p>

          <p
            style={{
              color: "#444",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              marginTop: "0.8rem",
            }}
          >
            With years of industry expertise, we specialize in delivering
            premium vehicles at the best market value, supported by
            customer-first service and complete documentation clarity.
          </p>

          {/* HIGHLIGHTS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0,1fr))",
              gap: "1.2rem",
              marginTop: "2rem",
            }}
          >
            {[
              "Certified & Inspected Cars",
              "100% Transparent Pricing",
              "Verified Ownership History",
              "Trusted by 1000+ Customers",
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  background: "#fff",
                  padding: "1rem 1.2rem",
                  borderRadius: "14px",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  boxShadow: "0 10px 30px rgba(0,0,0,.08)",
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
    height: "80vh",
    background:
      "url('/family-with-baby-girl-choosing-car-car-salon.jpg') center/cover no-repeat",
    position: "relative",
  }}
>
  {/* Overlay */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(180deg, rgba(0,0,0,.75), rgba(0,0,0,.65))",
    }}
  />

  <Container className="h-100 d-flex align-items-center">
    <Row className="w-100 justify-content-center">
      <Col md={8} lg={7}>
        <div
          style={{
            position: "relative",
            color: "#fff",
            textAlign: "center",
            background: "rgba(0,0,0,.45)",
            padding: "3rem 2.5rem",
            borderRadius: "24px",
            boxShadow: "0 30px 80px rgba(0,0,0,.5)",
            backdropFilter: "blur(8px)",
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: "3rem",
              fontWeight: 700,
              lineHeight: 1.2,
              textShadow:
                "0 4px 15px rgba(13,202,240,.35), 0 2px 6px rgba(0,0,0,.6)",
            }}
          >
            Drive in Style with{" "}
            <span style={{ color: "#0dcaf0" }}>AutoMart</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            style={{
              fontSize: "1.15rem",
              marginTop: "1rem",
              opacity: 0.95,
            }}
          >
            Discover premium used cars that match your lifestyle, budget, and
            expectations — all backed by trust, transparency, and expert
            guidance.
          </motion.p>

          {/* TRUST POINTS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              flexWrap: "wrap",
              marginTop: "2rem",
            }}
          >
            {[
              "Certified Vehicles",
              "Transparent Pricing",
              "Easy Financing",
              "After-Sales Support",
            ].map((text, index) => (
              <div
                key={index}
                style={{
                  background: "rgba(255,255,255,.1)",
                  padding: "0.7rem 1.4rem",
                  borderRadius: "30px",
                  fontSize: "0.9rem",
                  boxShadow: "0 6px 20px rgba(0,0,0,.35)",
                }}
              >
                {text}
              </div>
            ))}
          </motion.div>

          {/* CTA BUTTON */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            style={{ marginTop: "2.5rem" }}
          >
            <Button
              size="lg"
              variant="info"
              className="px-5 rounded-pill fw-semibold"
              style={{
                transition: "all .35s ease",
                boxShadow: "0 10px 30px rgba(13,202,240,.45)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform =
                  "translateY(-4px) scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              Contact Us
            </Button>
          </motion.div>
        </div>
      </Col>
    </Row>
  </Container>
</motion.section>

    </>
  );
};

export default About;
