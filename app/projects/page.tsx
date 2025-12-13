"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import ScrollIndicator from "@/components/scroll-indicator";

interface Project {
  id: number;
  slug: string;
  title: string;
  location: string;
  category: string;
  image: string;
  sections: Array<{ heading: string; body: string }>;
  cta: {
    prompt: string;
    linkText: string;
    href: string;
  };
  display_order: number;
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("All");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/public/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setLoading(false);
      });
  }, []);

  const handleClose = () => setSelectedSlug(null);

  const categories = useMemo(() => {
    const unique = new Set(projects.map((project) => project.category));
    return ["All", ...Array.from(unique)];
  }, [projects]);

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  const selectedProject = selectedSlug
    ? projects.find((project) => project.slug === selectedSlug)
    : null;
  // const renderParagraphs = (text: string) =>
  //   text.split("\n\n").map((paragraph, index) => (
  //     <p key={index} className="leading-relaxed">
  //       {paragraph}
  //     </p>
  //   ));

  return (
    <div>
      {/* Enhanced Projects Hero Section */}
      <section className="relative h-screen text-white overflow-hidden">
        {/* Background Image with Dynamic Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/about.jpg"
            alt="AIMTERIOR Portfolio Showcase"
            fill
            className="object-cover"
            loading="eager"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          {/* Dynamic Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
              {Array.from({ length: 144 }).map((_, i) => (
                <div
                  key={i}
                  className="border-r border-b border-white/20"
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative container mx-auto px-6 h-full flex items-center max-w-screen-xl z-10">
          <div className="max-w-4xl">
            {/* Portfolio Badge */}
            <div className="mb-8 animate-fade-in">
              <div className="inline-flex items-center space-x-3 bg-white/15 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 shadow-2xl">
                <div className="relative flex space-x-1">
                  <div className="w-2 h-2 bg-brand-50 rounded-full animate-pulse"></div>
                  <div
                    className="w-2 h-2 bg-brand-100 rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-brand-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
                <span className="text-sm font-semibold tracking-wider uppercase">
                  Our Portfolio
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight animate-slide-up">
              Where Dreams Take
              <span className="block bg-gradient-to-r from-brand-50 via-brand-200 to-brand-400 bg-clip-text text-transparent">
                Architectural Form
              </span>
            </h1>

            <p className="text-lg md:text-xl mb-12 max-w-2xl leading-relaxed text-gray-100 animate-slide-up-delay">
              Explore our curated collection of transformative projects. Each
              design tells a unique story of innovation.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mb-16 animate-fade-in-delay">
              <Link
                href="#featured-project"
                className="group bg-gradient-to-r from-brand-50 to-brand-400 hover:from-brand-100 hover:to-brand-400 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <span className="flex items-center space-x-2">
                  <span>Explore Projects</span>
                  <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
                    <div className="w-2 h-2 bg-white rotate-45 transform"></div>
                  </div>
                </span>
              </Link>
              <button className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105">
                Start Your Project
              </button>
            </div>

            {/* Project Categories */}
            <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Residential", "Commercial", "Hospitality", "Retail"].map(
                (category, index) => (
                  <div key={category} className="group text-center">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:border-emerald-400/50">
                      <div className="text-2xl mb-2">
                        {["🏠", "🏢", "🏨", "🛍️"][index]}
                      </div>
                      <div className="text-sm font-medium">{category}</div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Floating Project Cards */}
        <div className="absolute top-20 right-10 w-32 h-40 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 animate-float opacity-20"></div>
        <div className="absolute bottom-32 right-32 w-24 h-32 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 animate-float-delayed opacity-30"></div>

        {/* Scroll Indicator */}
        <ScrollIndicator />
      </section>
      {/* Main Projects Section */}
      <section className="relative py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full border border-emerald-100 mb-6">
              <div className="w-2 h-2 bg-brand-50 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-brand-50 uppercase tracking-wider">
                Portfolio Showcase
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Our Creative{" "}
              <span className="bg-gradient-to-r from-brand-50 to-brand-400 bg-clip-text text-transparent">
                Portfolio
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              Our work reflects a thoughtful blend of architecture, engineering,
              and interior fit-out, shaped by a clear understanding of space,
              function, and form.
            </p>

            {/* Enhanced Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 ${
                    filter === category
                      ? "bg-gradient-to-r from-brand-50 to-brand-400 text-white shadow-lg"
                      : "bg-white text-gray-700 border-2 border-gray-200 hover:border-brand-50 hover:text-brand-400"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Project */}
          {/* <div
            className="grid md:grid-cols-2 gap-8 mb-16"
            id="featured-project"
          >
            <div className="overflow-hidden rounded-3xl shadow-xl border border-gray-100">
              <div className="relative h-72 sm:h-96">
                <Image
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 space-y-4 bg-white">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-50/10 text-brand-50 border border-brand-50/40">
                  Featured · {featuredProject.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {featuredProject.title}
                </h3>
                <p className="text-sm font-semibold text-gray-500">
                  {featuredProject.location}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {featuredProject.sections[0].body}
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedSlug(featuredSlug)}
                  className="inline-flex items-center text-brand-50 font-semibold group"
                >
                  View Project Details
                  <svg
                    className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 space-y-6">
              <h4 className="text-2xl font-bold text-gray-900">
                Project Snapshot
              </h4>
              <div className="space-y-4 text-gray-600">
                {featuredProject.sections.map((section, index) => (
                  <div key={index} className="space-y-2">
                    <p className="font-semibold text-gray-900">
                      {section.heading}
                    </p>
                    {renderParagraphs(section.body)}
                  </div>
                ))}
                <p className="font-semibold text-gray-900">
                  {featuredProject.cta.prompt}{" "}
                  <Link
                    href={featuredProject.cta.href}
                    className="text-brand-50 hover:underline font-semibold"
                  >
                    [{featuredProject.cta.linkText}]
                  </Link>
                </p>
              </div>
            </div>
          </div> */}

          {/* Projects Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading projects...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {filteredProjects.map((project) => (
                <button
                  key={project.slug}
                  type="button"
                  onClick={() => setSelectedSlug(project.slug)}
                  className="group relative w-80 mx-auto bg-white rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-200"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-800 backdrop-blur-sm border border-white/50">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-50 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm font-semibold text-gray-500">
                      {project.location}
                    </p>
                    <p className="text-gray-600 leading-relaxed line-clamp-4">
                      {project.sections[0].body}
                    </p>
                    <span className="inline-flex items-center text-sm font-semibold text-brand-50 group-hover:translate-x-1 transition-transform duration-300">
                      View Project
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Results Summary */}
          <div className="text-center mt-16">
            <p className="text-gray-600">
              Showing{" "}
              <span className="font-bold">{filteredProjects.length}</span> of{" "}
              <span className="font-bold">{projects.length}</span> projects
              {filter !== "All" && (
                <span className=""> in {filter} category</span>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Project Statistics */}
      <section className="relative py-20 bg-gradient-to-r from-brand-50 to-brand-400 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-400/20 rounded-full blur-2xl"></div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Project Excellence in Numbers
            </h2>
            <p className="text-xl text-white max-w-2xl mx-auto">
              Every project tells a story of innovation and craftsmanship
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "150+", label: "Projects Completed", icon: "🏗️" },
              { number: "98%", label: "Client Satisfaction", icon: "⭐" },
              { number: "8", label: "Project Categories", icon: "📋" },
              { number: "15+", label: "Years of Excellence", icon: "🏆" },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 transition-all duration-500 hover:bg-white/20 hover:scale-105">
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-white font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="relative py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full border border-emerald-100 mb-6">
              <div className="w-2 h-2 bg-brand-50 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-brand-50 uppercase tracking-wider">
                Client Success Stories
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              What Our Clients{" "}
              <span className="bg-gradient-to-r from-brand-50 to-brand-400 bg-clip-text text-transparent">
                Say About Us
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.slice(0, 3).map((project, index) => {
              const resultSection =
                project.sections.find((section) =>
                  section.heading.includes("✅")
                ) ?? project.sections[project.sections.length - 1];
              return (
                <div
                  key={project.id || index}
                  className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-500 hover:scale-105"
                >
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      {resultSection.heading}
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {resultSection.body}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-50 to-brand-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        {project.title}
                      </h4>
                      <p className="text-brand-50 text-sm">
                        {project.category} Project
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-100">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Create Your Dream Project?
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Let&apos;s collaborate to bring your vision to life with our
              expertise in architecture, design, and construction excellence.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group bg-gradient-to-r from-brand-50 to-brand-400 hover:from-brand-100 hover:to-brand-400 text-white px-6 py-3 sm:px-10 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <span className="flex items-center justify-center space-x-3">
                  <span>Start Your Project</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </button>

              <button className="border-2 border-brand-50 text-brand-50 hover:bg-brand-50 hover:text-white px-6 py-3 sm:px-10 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105">
                View All Services
              </button>
            </div>
          </div>
        </div>
      </section>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-12 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:text-gray-900"
              aria-label="Close project details"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-8">
              <div className="overflow-hidden rounded-2xl">
                <div className="relative h-64 sm:h-96">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 font-semibold">
                  {selectedProject.category}
                </span>
                <span className="font-semibold text-gray-600">
                  {selectedProject.location}
                </span>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  {selectedProject.title}
                </h2>
              </div>

              <div className="space-y-6 blog-content">
                {selectedProject.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="space-y-3">
                    <h3>{section.heading}</h3>
                    {typeof section.body === "string" ? (
                      section.body
                        .split("\n\n")
                        .map((paragraph, paragraphIndex) => (
                          <p key={paragraphIndex}>{paragraph}</p>
                        ))
                    ) : (
                      <p>{section.body}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-6">
                <p className="text-gray-700">
                  {selectedProject.cta.prompt}{" "}
                  <Link
                    href={selectedProject.cta.href}
                    className="text-brand-50 font-semibold hover:underline"
                  >
                    [{selectedProject.cta.linkText}]
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
