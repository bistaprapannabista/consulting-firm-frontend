import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

// Force dynamic rendering to see database changes immediately
export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET single project by ID (public)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = db
      .prepare("SELECT * FROM projects WHERE id = ?")
      .get(params.id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Parse JSON fields
    const projectRow = project as {
      sections?: string;
      cta_prompt?: string;
      cta_link_text?: string;
      cta_href?: string;
      [key: string]: unknown;
    };
    const parsedProject = {
      ...(project as Record<string, unknown>),
      sections: JSON.parse(projectRow.sections || "[]"),
      cta: {
        prompt: projectRow.cta_prompt || "",
        linkText: projectRow.cta_link_text || "",
        href: projectRow.cta_href || "",
      },
    };

    return NextResponse.json(parsedProject);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}
