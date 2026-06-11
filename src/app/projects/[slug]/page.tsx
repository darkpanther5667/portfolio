import { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectsData, type Project } from "@/lib/projects-data";
import ProjectDetail from "@/components/ProjectDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Manas Agrawal`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Manas Agrawal`,
      description: project.description,
      url: `https://manasagrawal.online/projects/${slug}`,
      type: "website",
      images: [{ url: project.ogImage || "https://manasagrawal.online/opengraph-image" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Manas Agrawal`,
      description: project.description,
    },
    alternates: {
      canonical: `https://manasagrawal.online/projects/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  return projectsData.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) notFound();

  return <ProjectDetail project={project} />;
}