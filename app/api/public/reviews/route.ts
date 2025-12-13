import { NextResponse } from "next/server";
import db from "@/lib/db";

// Force dynamic rendering to see database changes immediately
export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET all reviews (public)
export async function GET() {
  try {
    const reviews = db
      .prepare(
        "SELECT * FROM reviews ORDER BY display_order ASC, created_at DESC"
      )
      .all();

    const response = NextResponse.json(reviews);
    // Prevent caching in development
    if (process.env.NODE_ENV === "development") {
      response.headers.set(
        "Cache-Control",
        "no-store, no-cache, must-revalidate"
      );
    }
    return response;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
