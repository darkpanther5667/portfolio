import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import CurrentlyBuilding from "@/components/CurrentlyBuilding";
import Services from "@/components/Services";
import Process from "@/components/Process";
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
      <Services />
      <Process />
      <Stats />
      <About />
      <TechStack />
      <Experience />
      <Testimonials />
      <Contact />
    </>
  );
}
