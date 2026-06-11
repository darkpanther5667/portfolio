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

const BASE_URL = "https://manasagrawal.online";

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
    site: "@agrawalmanas150",
    creator: "@agrawalmanas150",
  },
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    "faq-schema": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Who is Manas Agrawal?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Manas Agrawal is an AI Product Builder & Full Stack Developer who builds intelligent web products, AI tools, and polished digital experiences with a product-first mindset.",
          },
        },
        {
          "@type": "Question",
          name: "What projects has Manas Agrawal built?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Manas has built Grahbook (WhatsApp commerce platform), FormLabs (drag-and-drop form builder), and CodeSnap (AI-powered code screenshot tool), among others.",
          },
        },
        {
          "@type": "Question",
          name: "How can I contact Manas Agrawal?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can contact Manas via email at contact@manasagrawal.online, or through his GitHub, X (Twitter), or LinkedIn profiles linked in his portfolio.",
          },
        },
        {
          "@type": "Question",
          name: "What technologies does Manas Agrawal specialize in?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Manas specializes in React, Next.js, TypeScript, Node.js, PostgreSQL, and AI integrations like OpenAI and GPT-4o-mini.",
          },
        },
        {
          "@type": "Question",
          name: "Is Manas Agrawal available for hire?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Manas is currently available for projects and collaborations. Check the contact section to get in touch.",
          },
        },
      ],
    }),
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
  sameAs: [
    "https://github.com/darkpanther5667",
    "https://x.com/agrawalmanas150",
    "https://www.linkedin.com/in/manas-agrawal-2b0352320/",
  ],
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

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: BASE_URL,
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
        />
        {children}
      </body>
    </html>
  );
}
