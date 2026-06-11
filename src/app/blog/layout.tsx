import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Manas Agrawal",
  description:
    "Technical deep dives from Manas Agrawal on building AI products, full-stack development, WhatsApp commerce platforms, and developer tools.",
  openGraph: {
    title: "Blog | Manas Agrawal",
    description:
      "Technical deep dives from Manas Agrawal on building AI products, full-stack development, WhatsApp commerce platforms, and developer tools.",
    url: "https://manasagrawal.online/blog",
    type: "website",
  },
  alternates: {
    canonical: "https://manasagrawal.online/blog",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}