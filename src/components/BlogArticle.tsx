"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BlogPost } from "@/lib/blog-data";
import { profile } from "@/lib/profile";

export default function BlogArticle({ post }: { post: BlogPost }) {
  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: profile.name,
      url: "https://manasagrawal.online",
    },
    publisher: {
      "@type": "Person",
      name: profile.name,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://manasagrawal.online/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://manasagrawal.online" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://manasagrawal.online/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://manasagrawal.online/blog/${post.slug}` },
    ],
  };

  const paragraphs = post.content.split("\n\n");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />

      <article className="py-24 md:py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />

        <div className="max-w-3xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-accent transition-colors mb-8"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back to Blog
            </Link>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <time className="text-sm font-mono text-gray-500">{post.date}</time>
                <span className="text-gray-600">·</span>
                <span className="text-sm font-mono text-gray-500">{post.readTime}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-4">
                {post.title}
              </h1>

              <p className="text-xl text-gray-400 leading-relaxed mb-6">
                {post.description}
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-bold">
                  MA
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-300">{profile.name}</span>
                  <span className="block text-xs text-gray-500">AI Product Builder & Full Stack Developer</span>
                </div>
              </div>
            </header>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent mb-12" />

            <div className="prose prose-invert max-w-none">
              {paragraphs.map((para, i) => {
                if (para.startsWith("## ")) {
                  return <h2 key={i} className="text-2xl font-bold mt-12 mb-4">{para.replace("## ", "")}</h2>;
                }
                if (para.startsWith("### ")) {
                  return <h3 key={i} className="text-xl font-semibold mt-8 mb-3">{para.replace("### ", "")}</h3>;
                }
                if (para.startsWith("- ")) {
                  const items = para.split("\n").filter((l) => l.startsWith("- "));
                  return (
                    <ul key={i} className="list-disc list-inside space-y-2 text-gray-300 mb-6">
                      {items.map((item, j) => (
                        <li key={j}>{item.replace("- ", "")}</li>
                      ))}
                    </ul>
                  );
                }
                if (para.match(/^\d\./)) {
                  const items = para.split("\n").filter((l) => l.match(/^\d/));
                  return (
                    <ol key={i} className="list-decimal list-inside space-y-2 text-gray-300 mb-6">
                      {items.map((item, j) => (
                        <li key={j}>{item.replace(/^\d+\.\s*/, "")}</li>
                      ))}
                    </ol>
                  );
                }
                return (
                  <p key={i} className="text-gray-300 leading-relaxed mb-4">
                    {para}
                  </p>
                );
              })}
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent mt-12 mb-8" />

            <div className="flex items-center justify-between">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-accent transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
                All Articles
              </Link>
              <div className="flex gap-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-mono text-gray-500 bg-white/[0.03] border border-white/[0.06] rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </article>
    </>
  );
}