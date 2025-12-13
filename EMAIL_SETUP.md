# Email Setup Guide

This application uses [Resend](https://resend.com) to send emails directly from the contact forms and quote request forms.

## Setup Instructions

### 1. Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### 2. Get Your API Key

1. Navigate to [API Keys](https://resend.com/api-keys) in your Resend dashboard
2. Click "Create API Key"
3. Give it a name (e.g., "AIMTERIOR Website")
4. Copy the API key (it starts with `re_`)

### 3. Verify Your Domain (Optional but Recommended)

For production, you should verify your domain:

1. Go to [Domains](https://resend.com/domains) in your Resend dashboard
2. Click "Add Domain"
3. Follow the DNS configuration instructions
4. Once verified, you can use emails like `noreply@yourdomain.com`

### 4. Set Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```env
# Resend API Configuration
RESEND_API_KEY=re_your_api_key_here

# Email Configuration
# For development, you can use the default Resend test domain
FROM_EMAIL=onboarding@resend.dev

# The email address that will receive contact form submissions
TO_EMAIL=info@aimterior.com
```

**Important:**

- Never commit `.env.local` to version control
- For production, use a verified domain email address for `FROM_EMAIL`
- The `TO_EMAIL` is where all contact form submissions will be sent

### 5. Test the Setup

1. Start your development server: `npm run dev`
2. Navigate to the contact page
3. Fill out and submit the contact form
4. Check the `TO_EMAIL` inbox for the submission

## How It Works

- **Contact Form** (`/contact`): Submits to `/api/contact` and sends an email with contact details
- **Quote Request** (Modal & Cards): Submits to `/api/quote` and sends an email with quote request details

Both forms now send emails directly to `info@aimterior.com` without requiring the user to open their email client.

## Troubleshooting

### Emails Not Sending

1. **Check API Key**: Ensure `RESEND_API_KEY` is set correctly in `.env.local`
2. **Check Email Address**: Verify `FROM_EMAIL` is valid (for production, it must be from a verified domain)
3. **Check Console**: Look for error messages in the server console
4. **Resend Dashboard**: Check the Resend dashboard for delivery status and errors

### Development vs Production

- **Development**: You can use `onboarding@resend.dev` as the `FROM_EMAIL` (Resend's test domain)
- **Production**: You must verify your own domain and use an email from that domain

## API Routes

- `POST /api/contact` - Handles contact form submissions
- `POST /api/quote` - Handles quote request submissions

Both routes return JSON responses:

- Success: `{ success: true, message: "..." }`
- Error: `{ error: "Error message", details: "..." }`
