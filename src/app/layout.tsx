import type { Metadata, Viewport } from "next";
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

const BASE_URL = "https://portfolio-manasagrawal.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Manas Agrawal | AI Product Builder & Full Stack Developer",
  description:
    "Manas Agrawal builds intelligent web products, AI tools, and polished digital experiences with a product-first mindset.",
  verification: {
    google: "825mM0Z27U8hXNy9nHH4de7Ql2EzC39Z3G-qSrpinHc",
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Manas Agrawal | AI Product Builder & Full Stack Developer",
    description:
      "Portfolio of Manas Agrawal, focused on shipping intelligent products with code and AI.",
    url: BASE_URL,
    siteName: "Manas Agrawal",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manas Agrawal | AI Product Builder & Full Stack Developer",
    description:
      "Portfolio of Manas Agrawal, focused on shipping intelligent products with code and AI.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Manas Agrawal",
  givenName: "Manas",
  familyName: "Agrawal",
  jobTitle: "AI Product Builder & Full Stack Developer",
  description:
    "Manas Agrawal builds intelligent web products, AI tools, and polished digital experiences with a product-first mindset.",
  url: BASE_URL,
  sameAs: ["https://github.com/darkpanther5667"],
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Manas Agrawal Portfolio",
  url: BASE_URL,
  description:
    "Portfolio of Manas Agrawal — AI Product Builder & Full Stack Developer.",
  author: {
    "@type": "Person",
    name: "Manas Agrawal",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        {children}
      </body>
    </html>
  );
}
