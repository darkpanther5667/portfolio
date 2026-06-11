import { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blog-data";
import BlogArticle from "@/components/BlogArticle";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Manas Agrawal`,
    description: post.description,
    openGraph: {
      title: `${post.title} | Manas Agrawal`,
      description: post.description,
      url: `https://manasagrawal.online/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      authors: ["Manas Agrawal"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Manas Agrawal`,
      description: post.description,
    },
    alternates: {
      canonical: `https://manasagrawal.online/blog/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();
  return <BlogArticle post={post} />;
}