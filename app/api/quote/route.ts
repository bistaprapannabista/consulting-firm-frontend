import { NextRequest, NextResponse } from "next/server";
import { sendQuoteRequestEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phoneNumber, company, message, interest } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Send email
    await sendQuoteRequestEmail({
      fullName,
      email,
      phoneNumber,
      company,
      message,
      interest,
    });

    return NextResponse.json({
      success: true,
      message: "Quote request submitted successfully",
    });
  } catch (error) {
    console.error("Error processing quote request:", error);
    return NextResponse.json(
      {
        error: "Failed to send email. Please try again later.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
