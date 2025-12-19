import type { FC } from "react";
import { motion } from "framer-motion";
import * as Icons from "react-icons/si";

const brandIcons = Object.values(Icons).slice(0, 20);

const BrandMarquee: FC = () => {
  return (
    <section style={{ overflow: "hidden", padding: "3rem 0" }}>
      <motion.div
        animate={{ x: ["100%", "-100%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: "5rem", paddingLeft: "5rem" }}
      >
        {brandIcons.map((Icon, index) => (
          <span
            key={index}
            style={{
              fontSize: "3.4rem",
              color: "#0dcaf0",
              flexShrink: 0,
            }}
          >
            <Icon />
          </span>
        ))}
      </motion.div>
    </section>
  );
};

export default BrandMarquee;
