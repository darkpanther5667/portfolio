import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Manas Agrawal | AI Product Builder & Full Stack Developer",
  description:
    "Manas Agrawal builds intelligent web products, AI tools, and polished digital experiences with a product-first mindset.",
  openGraph: {
    title: "Manas Agrawal | AI Product Builder & Full Stack Developer",
    description:
      "Portfolio of Manas Agrawal, focused on shipping intelligent products with code and AI.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manas Agrawal | AI Product Builder & Full Stack Developer",
    description:
      "Portfolio of Manas Agrawal, focused on shipping intelligent products with code and AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
