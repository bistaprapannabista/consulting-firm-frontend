import { NextResponse } from "next/server";
import db from "@/lib/db";

// Force dynamic rendering to see database changes immediately
export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET all blogs (public)
export async function GET() {
  try {
    const blogs = db
      .prepare("SELECT * FROM blogs ORDER BY created_at DESC")
      .all();

    // Parse JSON fields and handle tags (comma-separated string or JSON array)
    const parsedBlogs = blogs.map((blog) => {
      const blogRow = blog as {
        tags?: string;
        related_posts?: string;
        [key: string]: unknown;
      };

      // Handle tags: convert comma-separated string to array, or parse JSON array
      let tagsArray: string[] = [];
      if (blogRow.tags) {
        if (typeof blogRow.tags === "string") {
          if (blogRow.tags.startsWith("[")) {
            // JSON array format (backward compatibility)
            try {
              tagsArray = JSON.parse(blogRow.tags);
            } catch {
              tagsArray = [];
            }
          } else {
            // Comma-separated string format
            tagsArray = blogRow.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter((tag) => tag.length > 0);
          }
        }
      }

      return {
        ...(blog as Record<string, unknown>),
        tags: tagsArray,
        related_posts: JSON.parse(blogRow.related_posts || "[]"),
      };
    });

    const response = NextResponse.json(parsedBlogs);
    // Prevent caching in development
    if (process.env.NODE_ENV === "development") {
      response.headers.set(
        "Cache-Control",
        "no-store, no-cache, must-revalidate"
      );
    }
    return response;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
