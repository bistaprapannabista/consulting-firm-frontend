"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import ScrollIndicator from "@/components/scroll-indicator";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author?: string;
  read_time?: string;
  category: string;
  tags: string[];
  related_posts: Array<{
    slug: string;
    title: string;
    image: string;
    date: string;
  }>;
}

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/public/blogs/slug/${params.slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Blog not found");
        }
        return res.json();
      })
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blog:", error);
        setLoading(false);
      });
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Blog Post Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/blogs"
            className="inline-flex items-center px-6 py-3 bg-brand-50 text-white rounded-lg hover:bg-brand-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            loading="eager"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 h-full flex items-center max-w-screen-xl z-10 min-h-screen">
          <div className="max-w-4xl w-full py-16 sm:py-20">
            {/* Back Button */}
            <div className="mb-6 sm:mb-8">
              <Link
                href="/blogs"
                className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/30 hover:bg-white/25 transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-xs sm:text-sm font-medium">
                  Back to Blogs
                </span>
              </Link>
            </div>

            {/* Category Badge */}
            <div className="mb-4 sm:mb-6">
              <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/30">
                <BookOpen className="w-4 h-4" />
                <span className="text-xs sm:text-sm font-semibold">
                  {blog.category}
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
              {blog.title}
            </h1>

            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-3xl leading-relaxed text-gray-100">
              {blog.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-200">
              {blog.author && (
                <div className="flex items-center space-x-2">
                  <User className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">{blog.author}</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">{blog.date}</span>
              </div>
              {blog.read_time && blog.read_time.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">{blog.read_time}</span>
                </div>
              )}
              <button className="flex items-center space-x-2 hover:text-white transition-colors">
                <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">Share</span>
              </button>
            </div>
          </div>
        </div>

        <ScrollIndicator />
      </section>

      {/* Article Content */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="prose prose-lg max-w-none text-gray-700 blog-content">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-brand-50 hover:text-brand-400 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Related Articles
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {blog.related_posts.map((post, index) => (
              <Link
                key={index}
                href={`/blogs/${post.slug}`}
                className="group flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 bg-white rounded-lg overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="relative h-24 w-full sm:w-40 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4 sm:p-6 w-full">
                  <p className="text-gray-500 text-sm mb-2">{post.date}</p>
                  <h3 className="text-xl font-bold mb-1 group-hover:text-brand-400 transition-colors">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-brand-50 to-brand-400">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-white mb-10 leading-relaxed">
            Let&apos;s collaborate to bring your vision to life with our
            expertise in architecture, design, and construction excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/contact"
              className="group bg-white text-brand-50 px-6 py-3 sm:px-10 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <span className="flex items-center justify-center space-x-3">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>
            <Link
              href="/projects"
              className="border-2 border-white text-white hover:bg-white hover:text-brand-50 px-6 py-3 sm:px-10 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105"
            >
              View Our Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
