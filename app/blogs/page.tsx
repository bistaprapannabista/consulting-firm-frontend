"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowRight,
  X,
  Calendar,
  Clock,
  User,
  Share2,
  BookOpen,
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

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const selectedPost = selectedSlug
    ? blogs.find((blog) => blog.slug === selectedSlug)
    : null;

  useEffect(() => {
    fetch("/api/public/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      });
  }, []);

  const featuredPost = blogs[0];
  const secondaryPosts = blogs.slice(1, blogs.length);

  const handleOpen = (slug: string) => {
    setSelectedSlug(slug);
  };

  const handleClose = () => {
    setSelectedSlug(null);
  };

  return (
    <div>
      {/* Enhanced Blogs Hero Section */}
      <section className="relative h-screen text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/blog.png"
            alt="AIMTERIOR Insights & Stories"
            fill
            className="object-cover"
            loading="eager"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          {/* Blog Pattern - Floating Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/5 left-1/4 w-32 h-4 bg-white rotate-12 animate-pulse"></div>
            <div
              className="absolute top-1/3 right-1/4 w-24 h-4 bg-white rotate-45 animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute bottom-1/3 left-1/3 w-40 h-4 bg-white -rotate-12 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-1/2 right-1/5 w-28 h-4 bg-white rotate-6 animate-pulse"
              style={{ animationDelay: "1.5s" }}
            ></div>
          </div>
        </div>

        <div className="relative container mx-auto px-6 h-full flex items-center max-w-screen-xl z-10">
          <div className="max-w-4xl">
            {/* Blog Badge */}
            <div className="mb-8 animate-fade-in">
              <div className="inline-flex items-center space-x-3 bg-white/15 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 shadow-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-brand-50 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-brand-100 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-brand-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-sm font-semibold tracking-wider uppercase">
                  Insights & Stories
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight animate-slide-up">
              Design Stories &
              <span className="block bg-gradient-to-r from-brand-50 via-brand-200 to-brand-400 bg-clip-text text-transparent">
                Industry Insights
              </span>
            </h1>

            <p className="text-lg md:text-xl mb-12 max-w-2xl leading-relaxed text-gray-100 animate-slide-up-delay">
              Discover the latest trends, design philosophies, and expert
              insights from AIMTERIOR&apos;s team.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mb-16 animate-fade-in-delay">
              <button className="group bg-gradient-to-r from-brand-50 to-brand-400 hover:from-brand-100 hover:to-brand-400 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <span className="flex items-center space-x-2">
                  <span>Latest Articles</span>
                  <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                  </div>
                </span>
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105">
                Subscribe to Updates
              </button>
            </div>

            {/* Blog Categories */}
            <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Design Trends", icon: "✨" },
                { name: "Project Stories", icon: "🏗️" },
                { name: "Industry News", icon: "📰" },
                { name: "Expert Tips", icon: "💡" },
              ].map((category) => (
                <div key={category.name} className="group text-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:border-indigo-400/50">
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <div className="text-sm font-medium">{category.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Blog Elements */}
        <div className="absolute top-20 right-20 w-24 h-32 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 rotate-12 animate-float"></div>
        <div className="absolute bottom-32 left-16 w-20 h-28 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 -rotate-6 animate-float-delayed"></div>

        {/* Scroll Indicator */}
        <ScrollIndicator />
      </section>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-5 text-center">BLOG & INSIGHTS</h1>
        <p className="text-primary/80 text-center">
          Look out for this space for new and original design ideas that come
          straight from the minds of our team and for stories of our experience
          and knowledge gained during a project.
        </p>
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blogs...</p>
          </div>
        ) : featuredPost ? (
          <div className="grid md:grid-cols-2 gap-8 my-20">
            <div className="featured-image overflow-hidden rounded-lg transition-transform duration-500 hover:scale-[1.02]">
              <Image
                src={featuredPost.image || "/placeholder.svg"}
                alt={featuredPost.title}
                width={600}
                height={400}
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-gray-500 mb-2">{featuredPost.date}</p>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {featuredPost.title}
              </h2>
              <p className="text-gray-700 mb-6">{featuredPost.excerpt}</p>
              <button
                type="button"
                onClick={() => handleOpen(featuredPost.slug)}
                className="group inline-flex items-center font-semibold text-black hover:text-gray-700 transition-colors duration-300"
              >
                READ THE BLOG
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        ) : null}

        {/* Blog Listing Section */}
        <section className="mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading blogs...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {secondaryPosts.map((post) => (
                <button
                  key={post.slug}
                  type="button"
                  onClick={() => handleOpen(post.slug)}
                  className="blog-card group flex flex-col bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-200"
                >
                  <div className="overflow-hidden relative">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={500}
                      height={300}
                      className="w-full h-[250px] object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-gray-500 text-sm mb-2">{post.date}</p>
                    <h3 className="text-xl font-bold mb-3 transition-colors duration-300 group-hover:text-gray-700">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-grow">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center font-semibold text-black group-hover:text-gray-700 transition-colors duration-300">
                      READ THE BLOG
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>
      </div>

      {selectedPost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-10 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:text-gray-900"
              aria-label="Close blog details"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-6">
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src={selectedPost.image || "/placeholder.svg"}
                  alt={selectedPost.title}
                  width={960}
                  height={540}
                  className="w-full h-64 sm:h-80 object-cover"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500">
                <div className="inline-flex items-center space-x-2 rounded-full bg-gray-100 px-3 py-1 font-semibold text-gray-700">
                  <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{selectedPost.category}</span>
                </div>
                {selectedPost.author && selectedPost.author.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <User className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{selectedPost.author}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{selectedPost.date}</span>
                </div>
                {selectedPost.read_time &&
                  selectedPost.read_time.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{selectedPost.read_time}</span>
                    </div>
                  )}
                <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-900 transition-colors">
                  <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Share</span>
                </button>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {selectedPost.title}
                </h2>
                <p className="text-gray-600 text-base sm:text-lg">
                  {selectedPost.excerpt}
                </p>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700 blog-content">
                <div
                  dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                />
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPost.tags.map((tag, index) => (
                    <span
                      key={`${selectedPost.slug}-tag-${index}`}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-brand-50 hover:text-brand-400 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Related Articles
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {selectedPost.related_posts.map((post, index) => (
                    <button
                      key={`${selectedPost.slug}-related-${index}`}
                      type="button"
                      onClick={() => handleOpen(post.slug)}
                      className="group flex items-center space-y-4 rounded-2xl border border-gray-200 bg-white p-4 text-left transition-all hover:border-brand-200 hover:shadow-lg sm:space-y-0 sm:space-x-4 sm:flex-row flex-col"
                    >
                      <div className="relative h-20 w-full overflow-hidden rounded-xl sm:w-28">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="w-full sm:w-auto">
                        <p className="text-xs text-gray-500 mb-1">
                          {post.date}
                        </p>
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-brand-400">
                          {post.title}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
