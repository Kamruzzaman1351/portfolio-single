import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// ─── In-memory rate limiter ───────────────────────────────────────────────────
// Resets when the serverless function cold-starts. Good enough for portfolio use.
interface RateLimitEntry {
  count: number;
  resetAt: number;
}
const rateLimitMap = new Map<string, RateLimitEntry>();

const RATE_LIMIT = 3;          // max submissions
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour in ms

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;

  entry.count += 1;
  return false;
}

// ─── XSS prevention ──────────────────────────────────────────────────────────
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ─── Email HTML template ──────────────────────────────────────────────────────
function buildEmailHtml(name: string, email: string, subject: string, message: string): string {
  const safeName    = escapeHtml(name);
  const safeEmail   = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Portfolio Contact</title>
</head>
<body style="margin:0;padding:0;background:#080B11;font-family:'Segoe UI',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#080B11;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0F1420,#131929);border:1px solid rgba(255,255,255,0.06);border-radius:16px 16px 0 0;padding:32px 36px;">
              <p style="margin:0;font-family:monospace;font-size:13px;color:#6B7A99;letter-spacing:0.1em;text-transform:uppercase;">portfolio_contact[]</p>
              <h1 style="margin:10px 0 0;font-size:24px;font-weight:800;color:#F0F4FF;">New Message Received</h1>
            </td>
          </tr>

          <!-- Accent bar -->
          <tr>
            <td style="height:3px;background:linear-gradient(to right,#00D4FF,#7B61FF);"></td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#0F1420;border:1px solid rgba(255,255,255,0.06);border-top:none;border-radius:0 0 16px 16px;padding:32px 36px;">

              <!-- Sender info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="padding:14px 16px;background:rgba(0,212,255,0.05);border:1px solid rgba(0,212,255,0.12);border-radius:10px;">
                    <p style="margin:0 0 4px;font-size:11px;color:#6B7A99;font-family:monospace;text-transform:uppercase;letter-spacing:0.08em;">From</p>
                    <p style="margin:0;font-size:15px;font-weight:700;color:#F0F4FF;">${safeName}</p>
                    <a href="mailto:${safeEmail}" style="font-size:13px;color:#00D4FF;text-decoration:none;">${safeEmail}</a>
                  </td>
                </tr>
              </table>

              <!-- Subject -->
              <p style="margin:0 0 6px;font-size:11px;color:#6B7A99;font-family:monospace;text-transform:uppercase;letter-spacing:0.08em;">Subject</p>
              <p style="margin:0 0 24px;font-size:16px;font-weight:700;color:#F0F4FF;">${safeSubject}</p>

              <!-- Divider -->
              <div style="height:1px;background:linear-gradient(to right,rgba(0,212,255,0.2),transparent);margin-bottom:24px;"></div>

              <!-- Message -->
              <p style="margin:0 0 10px;font-size:11px;color:#6B7A99;font-family:monospace;text-transform:uppercase;letter-spacing:0.08em;">Message</p>
              <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:18px 20px;">
                <p style="margin:0;font-size:14px;line-height:1.75;color:#A8B4CC;">${safeMessage}</p>
              </div>

              <!-- Reply CTA -->
              <div style="margin-top:28px;text-align:center;">
                <a href="mailto:${safeEmail}?subject=Re: ${safeSubject}"
                   style="display:inline-block;padding:12px 28px;background:#00D4FF;color:#080B11;font-weight:700;font-size:14px;text-decoration:none;border-radius:10px;">
                  Reply to ${safeName}
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 0 0;text-align:center;">
              <p style="margin:0;font-size:12px;color:#6B7A99;">Sent from your portfolio contact form · <a href="https://kamruzzaman.dev" style="color:#6B7A99;">kamruzzaman.dev</a></p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // 1. IP rate limiting
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait before submitting again.' },
      { status: 429 }
    );
  }

  // 2. Parse body
  let body: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    website?: string;   // honeypot
    timestamp?: number; // timing gate
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // 3. Honeypot — bots fill this; humans leave it blank
  if (body.website) {
    // Return 200 to fool bots; message is silently discarded
    return NextResponse.json({ ok: true });
  }

  // 4. Timing gate — reject submissions faster than 3 seconds (bot speed)
  const elapsed = typeof body.timestamp === 'number' ? Date.now() - body.timestamp : 0;
  if (elapsed < 3000) {
    return NextResponse.json(
      { error: 'Submission was too fast. Please try again.' },
      { status: 400 }
    );
  }

  // 5. Input validation
  const { name = '', email = '', subject = '', message = '' } = body;

  if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  if (name.length > 100 || subject.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: 'Input exceeds maximum length.' }, { status: 400 });
  }

  // 6. Send email via Resend
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL;

  if (!apiKey || !toEmail) {
    console.error('Missing RESEND_API_KEY or CONTACT_EMAIL env vars');
    return NextResponse.json(
      { error: 'Server configuration error. Please contact me directly via email.' },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'Portfolio Contact <onboarding@resend.dev>';

  try {
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: buildEmailHtml(name, email, subject, message),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err);
    return NextResponse.json(
      { error: 'Failed to send message. Please try emailing me directly.' },
      { status: 500 }
    );
  }
}
