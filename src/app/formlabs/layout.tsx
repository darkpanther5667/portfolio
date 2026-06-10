import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FormLabs — Drag-and-Drop Form Builder by Manas Agrawal",
  description:
    "Build forms visually with drag-and-drop. Export HTML or React code. A project by Manas Agrawal.",
  openGraph: {
    title: "FormLabs — Drag-and-Drop Form Builder by Manas Agrawal",
    description:
      "Build forms visually with drag-and-drop. Export HTML or React code.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FormLabs — Drag-and-Drop Form Builder by Manas Agrawal",
    description:
      "Build forms visually with drag-and-drop. Export HTML or React code.",
  },
  alternates: {
    canonical: "./",
  },
};

export default function FormLabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
