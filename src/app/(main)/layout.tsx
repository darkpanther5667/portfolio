import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll, { ScrollProgress } from "@/components/SmoothScroll";
import Terminal from "@/components/Terminal";
import AIChat from "@/components/AIChat";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main id="main-content">
        <SmoothScroll>{children}</SmoothScroll>
      </main>
      <Terminal />
      <AIChat />
      <Footer />
    </>
  );
}
