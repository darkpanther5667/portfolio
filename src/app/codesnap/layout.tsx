import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CodeSnap — AI-Powered Code Screenshot Tool by Manas Agrawal",
  description:
    "Create beautiful code screenshots with syntax highlighting, multiple themes, and AI-powered code explanations. Built by Manas Agrawal.",
  openGraph: {
    title: "CodeSnap — AI-Powered Code Screenshot Tool by Manas Agrawal",
    description:
      "Create beautiful code screenshots with syntax highlighting and AI explanations.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeSnap — AI-Powered Code Screenshot Tool by Manas Agrawal",
    description:
      "Create beautiful code screenshots with syntax highlighting and AI explanations.",
  },
  alternates: {
    canonical: "./",
  },
};

export default function CodeSnapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
