"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CustomCursor = dynamic(
  () => import("@/components/CustomCursor"),
  { ssr: false }
);
const Terminal = dynamic(() => import("@/components/Terminal"), {
  ssr: false,
});
const AIChat = dynamic(() => import("@/components/AIChat"), { ssr: false });
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
      <main id="main-content">
        <SmoothScroll>{children}</SmoothScroll>
      </main>
      <Terminal />
      <AIChat />
      <Footer />
    </>
  );
}
