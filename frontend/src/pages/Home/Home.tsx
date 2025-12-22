import About from "../../components/Home/About";
import Cars from "../../components/Home/Cars";
import Clients from "../../components/Home/Clients";
import HeroSection from "../../components/Home/Herosection";
import RecentCollection from "../../components/Home/MyCollection";
import ScrollReveal from "../../components/Home/ScrollReveal";

export default function Home() {
  return (
    <div style={{ backgroundColor: "#0a0a0a", color: "#fff", width: "100%", minHeight: "100vh" }}>
      {/* ================= HERO ================= */}
      <HeroSection
        style={{
          backgroundColor: "#111", // dark fallback for hero
          color: "#fff",
        }}
      />

      {/* ================= ABOUT ================= */}
      <ScrollReveal direction="up">
        <div style={{ backgroundColor: "#111" ,color:"white"}}>
          <About />
        </div>
      </ScrollReveal>

      {/* ================= RECENT COLLECTION ================= */}
      <ScrollReveal direction="down">
        <div style={{ backgroundColor: "#111" }}>
          <RecentCollection />
        </div>
      </ScrollReveal>

      {/* ================= CLIENTS ================= */}
      <ScrollReveal direction="up">
        <div style={{ backgroundColor: "#111" }}>
          <Clients />
        </div>
      </ScrollReveal>

      {/* ================= CARS ================= */}
      <ScrollReveal direction="down">
        <div style={{ backgroundColor: "#111" }}>
          <Cars />
        </div>
      </ScrollReveal>
    </div>
  );
}

