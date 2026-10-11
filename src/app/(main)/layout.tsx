"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollBackgroundShift from "@/components/ScrollBackgroundShift";
import SmoothScroll, { ScrollProgress } from "@/components/SmoothScroll";

const CustomCursor = dynamic(
  () => import("@/components/CustomCursor"),
  { ssr: false }
);
const Terminal = dynamic(() => import("@/components/Terminal"), {
  ssr: false,
});
const AIChat = dynamic(() => import("@/components/AIChat"), { ssr: false });
const CommandPalette = dynamic(() => import("@/components/CommandPalette"), {
  ssr: false,
});

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [idleReady, setIdleReady] = useState(false);

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setIdleReady(true), {
        timeout: 1200,
      });
      return () => window.cancelIdleCallback(id);
    } else {
      const timer = setTimeout(() => setIdleReady(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {idleReady && <CustomCursor />}
      <ScrollProgress />
      <ScrollBackgroundShift />
      <Navbar />
      <main id="main-content">
        <SmoothScroll>{children}</SmoothScroll>
      </main>
      {idleReady && (
        <>
          <Terminal />
          <AIChat />
          <CommandPalette />
        </>
      )}
      <Footer />
    </>
  );
}