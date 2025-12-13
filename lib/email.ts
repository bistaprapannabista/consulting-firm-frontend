import { Resend } from "resend";
import { INTERESTS } from "./constants";

// Initialize Resend with API key from environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";
const TO_EMAIL = process.env.TO_EMAIL || "info@aimterior.com";

interface ContactFormData {
  fullName: string;
  email: string;
  phoneNumber?: string;
  company?: string;
  message?: string;
  interest?: string;
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    const selectedInterest = data.interest
      ? getInterestLabel(data.interest)
      : "General Consultation";

    const emailContent = `
Hello AIMTERIOR Team,

You have received a new contact form submission:

Contact Details:
- Full Name: ${data.fullName || "Not provided"}
- Email: ${data.email}
- Phone: ${data.phoneNumber || "Not provided"}
- Company: ${data.company || "Not provided"}
- Interest: ${selectedInterest}

Message:
${data.message || "No additional message provided"}

---
This email was sent from the AIMTERIOR website contact form.
Reply directly to this email to respond to ${data.email}
    `.trim();

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: data.email,
      subject: `Contact Form - ${selectedInterest} from ${
        data.fullName || "Customer"
      }`,
      text: emailContent,
      html: formatEmailHTML(data, selectedInterest, emailContent),
    });

    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

export async function sendQuoteRequestEmail(data: ContactFormData) {
  try {
    const selectedInterest = data.interest
      ? getInterestLabel(data.interest)
      : "General Consultation";

    const emailContent = `
Hello AIMTERIOR Team,

You have received a new quote request:

Contact Details:
- Full Name: ${data.fullName || "Not provided"}
- Email: ${data.email}
- Phone: ${data.phoneNumber || "Not provided"}
- Company: ${data.company || "Not provided"}
- Interest: ${selectedInterest}

Message:
${data.message || "No additional message provided"}

Please contact me to discuss my project requirements.

Best regards,
${data.fullName || "Customer"}
    `.trim();

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: data.email,
      subject: `Quote Request - ${selectedInterest} from ${
        data.fullName || "Customer"
      }`,
      text: emailContent,
      html: formatEmailHTML(
        data,
        selectedInterest,
        emailContent,
        "Quote Request"
      ),
    });

    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

function formatEmailHTML(
  data: ContactFormData,
  interest: string,
  textContent: string,
  type: string = "Contact Form"
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${type} - AIMTERIOR</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">${type}</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">AIMTERIOR Website</p>
  </div>
  
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <h2 style="color: #667eea; margin-top: 0;">New Submission</h2>
    
    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <h3 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Contact Information</h3>
      <p style="margin: 8px 0;"><strong>Full Name:</strong> ${
        data.fullName || "Not provided"
      }</p>
      <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${
        data.email
      }" style="color: #667eea;">${data.email}</a></p>
      <p style="margin: 8px 0;"><strong>Phone:</strong> ${
        data.phoneNumber || "Not provided"
      }</p>
      <p style="margin: 8px 0;"><strong>Company:</strong> ${
        data.company || "Not provided"
      }</p>
      <p style="margin: 8px 0;"><strong>Interest:</strong> ${interest}</p>
    </div>
    
    ${
      data.message
        ? `
    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <h3 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Message</h3>
      <p style="white-space: pre-wrap; margin: 0;">${data.message}</p>
    </div>
    `
        : ""
    }
    
    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 12px;">
      <p>This email was sent from the AIMTERIOR website contact form.</p>
      <p>Reply directly to this email to respond to <a href="mailto:${
        data.email
      }" style="color: #667eea;">${data.email}</a></p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

function getInterestLabel(value: string): string {
  const interest = INTERESTS.find((int) => int.value === value);
  return interest?.label || value || "General Consultation";
}
