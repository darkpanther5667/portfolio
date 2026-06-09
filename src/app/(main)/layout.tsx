import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll, { ScrollProgress } from "@/components/SmoothScroll";

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
      <SmoothScroll>{children}</SmoothScroll>
      <Footer />
    </>
  );
}
