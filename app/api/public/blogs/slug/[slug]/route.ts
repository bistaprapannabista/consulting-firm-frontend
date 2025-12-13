import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const blog = db
      .prepare("SELECT * FROM blogs WHERE slug = ?")
      .get(params.slug);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Parse JSON fields and handle tags (comma-separated string or JSON array)
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

    const parsedBlog = {
      ...(blog as Record<string, unknown>),
      tags: tagsArray,
      related_posts: JSON.parse(blogRow.related_posts || "[]"),
    };

    return NextResponse.json(parsedBlog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}
