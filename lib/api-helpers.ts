import { NextResponse } from "next/server";

/**
 * Helper function to create API responses with proper cache headers
 * Prevents caching in development to see database changes immediately
 */
export function createApiResponse(
  data: unknown,
  status: number = 200,
  options?: { cache?: boolean }
) {
  const response = NextResponse.json(data, { status });

  // In development, prevent caching to see database changes immediately
  if (process.env.NODE_ENV === "development" || options?.cache === false) {
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
  } else {
    // In production, allow short-term caching
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=30"
    );
  }

  return response;
}
