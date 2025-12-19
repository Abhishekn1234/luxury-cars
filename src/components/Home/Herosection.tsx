import { Button } from "react-bootstrap";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import "./Hero.css";

export default function HeroSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-50px" }); // triggers slightly before entering
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 50 });
    }
  }, [inView, controls]);

  return (
    <section
      ref={ref}
      className="position-relative w-100 vh-100 overflow-hidden"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
      >
        <source src="/herosection.mp4" type="video/mp4" />
      </video>

      {/* Dark Gradient Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.85))",
        }}
      />

      {/* Content */}
      <div className="position-relative z-1 d-flex align-items-center justify-content-center h-100 px-4 text-center">
        <motion.div
          style={{ maxWidth: "900px" }}
          animate={controls}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1
            className="fw-bold display-4 display-md-3 mb-4 text-white hero-heading"
            style={{
              letterSpacing: "1px",
              textShadow: "0 8px 40px rgba(0,0,0,0.7)",
            }}
          >
            Premium Used Cars
            <span className="highlight-text d-block mt-3">
              Driven by Trust
            </span>
          </h1>

          <p
            className="fs-5 fs-md-4 text-light mb-5 hero-subtitle"
            style={{
              opacity: 0.85,
              lineHeight: "1.7",
              textShadow: "0 4px 20px rgba(0,0,0,0.6)",
            }}
          >
            Handpicked, quality-checked vehicles that feel brand new.
            Experience luxury, reliability, and true value.
          </p>

          <div className="d-flex justify-content-center gap-4 flex-wrap">
            <Button className="hero-btn-primary px-5 py-3 fw-semibold">
              Browse Cars
            </Button>

            <Button className="hero-btn-outline px-5 py-3 fw-semibold">
              Sell Your Car
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
