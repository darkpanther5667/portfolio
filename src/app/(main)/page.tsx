import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import CurrentlyBuilding from "@/components/CurrentlyBuilding";
import Stats from "@/components/Stats";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <CurrentlyBuilding />
      <Stats />
      <About />
      <TechStack />
      <Experience />
      <Testimonials />
      <Contact />
    </>
  );
}
