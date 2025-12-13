import { NextResponse } from "next/server";
import db from "@/lib/db";

// Force dynamic rendering to see database changes immediately
export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET all projects (public)
export async function GET() {
  try {
    const projects = db
      .prepare(
        "SELECT * FROM projects ORDER BY display_order ASC, created_at DESC"
      )
      .all();

    // Parse JSON fields
    const parsedProjects = projects.map((project) => {
      const projectRow = project as {
        sections?: string;
        cta_prompt?: string;
        cta_link_text?: string;
        cta_href?: string;
        [key: string]: unknown;
      };
      return {
        ...(project as Record<string, unknown>),
        sections: JSON.parse(projectRow.sections || "[]"),
        cta: {
          prompt: projectRow.cta_prompt || "",
          linkText: projectRow.cta_link_text || "",
          href: projectRow.cta_href || "",
        },
      };
    });

    const response = NextResponse.json(parsedProjects);
    // Prevent caching in development
    if (process.env.NODE_ENV === "development") {
      response.headers.set(
        "Cache-Control",
        "no-store, no-cache, must-revalidate"
      );
    }
    return response;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
