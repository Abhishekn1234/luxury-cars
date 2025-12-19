import About from "../../components/Home/About";
import Cars from "../../components/Home/Cars";
import Clients from "../../components/Home/Clients";
import HeroSection from "../../components/Home/Herosection";
import RecentCollection from "../../components/Home/MyCollection";
import ScrollReveal from "../../components/Home/ScrollReveal";

export default function Home() {
  return (
    <>
      <HeroSection />

      <ScrollReveal direction="up">
        <About />
      </ScrollReveal>

      <ScrollReveal direction="down">
        <RecentCollection />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <Clients />
      </ScrollReveal>

      <ScrollReveal direction="down">
        <Cars />
      </ScrollReveal>
    </>
  );
}
