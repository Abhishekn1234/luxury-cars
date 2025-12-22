import { Button, Container } from "react-bootstrap";
import { motion, useAnimation, useInView, type Variants } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  style?: React.CSSProperties;
}

export default function HeroSection({ style }: HeroSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { once: true });
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }

    // Try to play the video manually to overcome mobile restrictions
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          await videoRef.current.play();
        } catch (err) {
          console.warn("Autoplay prevented:", err);
        }
      }
    };
    playVideo();
  }, [inView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
  };

  const highlightVariants: Variants = {
    initial: { opacity: 0.5, scale: 0.95 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
    },
  };

  const glowVariants = {
    rest: { textShadow: "0 0 5px rgba(13, 202, 240, 0.3)" },
    hover: {
      textShadow: "0 0 15px rgba(13, 202, 240, 0.7), 0 0 25px rgba(13, 202, 240, 0.5)",
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section ref={ref} style={style} className="position-relative w-100 min-vh-90 overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
      >
        <source src="/herosection.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient Overlay */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />

      {/* Content */}
      <div className="position-relative h-100 d-flex align-items-center justify-content-center text-center pt-5">
        <Container className="px-3">
          <motion.div variants={containerVariants} initial="hidden" animate={controls} className="px-4 py-5">
            {/* Main Title */}
            <motion.div variants={itemVariants} className="mb-4">
              <h1 className="fw-bold display-3 text-white position-relative">
                <span className="d-block">Premium Used Cars</span>
                <motion.span
                  variants={highlightVariants}
                  animate="animate"
                  initial="initial"
                  className="d-block mt-3 text-info position-relative"
                  style={{ display: "inline-block" }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <motion.span
                    variants={glowVariants}
                    animate={isHovered ? "hover" : "rest"}
                    className="d-inline-block px-4 py-2 rounded"
                    style={{
                      background: "rgba(13, 202, 240, 0.1)",
                      border: "1px solid rgba(13, 202, 240, 0.3)",
                      backdropFilter: "blur(5px)",
                    }}
                  >
                    Driven by Trust
                  </motion.span>
                </motion.span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants} className="max-w-2xl mx-auto mb-5">
              <p className="fs-4 text-light mb-0">
                Handpicked, quality-checked vehicles that feel brand new.
              </p>
              <motion.p
                className="fs-4 text-info fw-semibold mt-2"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                Experience luxury, reliability, and true value.
              </motion.p>
            </motion.div>

            {/* Buttons */}
            <motion.div variants={itemVariants} className="d-flex justify-content-center gap-4 flex-wrap mt-5">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="info"
                  className="px-5 py-3 fw-bold rounded-pill position-relative overflow-hidden"
                  onClick={() => navigate("/collections")}
                >
                  Browse Cars
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline-light"
                  onClick={() => navigate("/selling")}
                  className="px-5 py-3 fw-bold rounded-pill border-2"
                >
                  Sell Your Car
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>
      </div>

      <style>{`
        .min-vh-90 { min-height: 90vh; }
        .max-w-2xl { max-width: 42rem; }
        @media (max-width: 768px) { .display-3 { font-size: 2.5rem !important; } .fs-4 { font-size: 1.1rem !important; } }
        @media (max-width: 576px) { .display-3 { font-size: 2rem !important; } }
      `}</style>
    </section>
  );
}

