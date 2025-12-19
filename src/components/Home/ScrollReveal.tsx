import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  direction?: "up" | "down";
  delay?: number;
};

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
}: ScrollRevealProps) {
  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 60 : -60,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
