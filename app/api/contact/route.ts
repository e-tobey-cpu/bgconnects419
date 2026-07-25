import { NextResponse } from 'next/server'

// Where contact form submissions are delivered.
const TO_EMAIL = 'etdistributionllc@gmail.com'

// A short helper to escape user-provided values before embedding in HTML.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// POST /api/contact
// Sends contact form submissions to TO_EMAIL via SendGrid's HTTP API.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const name = String(body.name ?? '').trim()
  const company = String(body.company ?? '').trim()
  const email = String(body.email ?? '').trim()
  const phone = String(body.phone ?? '').trim()
  const subject = String(body.subject ?? '').trim()
  const message = String(body.message ?? '').trim()

  // Validate required fields (name, email, message) and email format.
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Please fill in your name, email, and message.' },
      { status: 400 },
    )
  }
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const apiKey = process.env.SENDGRID_API_KEY
  const fromEmail = process.env.CONTACT_FROM_EMAIL
  if (!apiKey || !fromEmail) {
    console.log('[v0] Contact form email not configured: missing SENDGRID_API_KEY or CONTACT_FROM_EMAIL')
    return NextResponse.json(
      { error: 'Email delivery is not configured yet. Please try again later.' },
      { status: 500 },
    )
  }

  const subjectLine = subject
    ? `ET Distribution Inquiry: ${subject}`
    : 'ET Distribution Contact Form Submission'

  const textBody = [
    `Full Name: ${name}`,
    `Company: ${company || '—'}`,
    `Email: ${email}`,
    `Phone: ${phone || '—'}`,
    `Subject: ${subject || '—'}`,
    '',
    'Message:',
    message,
  ].join('\n')

  const htmlBody = `
    <h2>New Contact Form Submission</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
      <tr><td><strong>Full Name</strong></td><td>${escapeHtml(name)}</td></tr>
      <tr><td><strong>Company</strong></td><td>${escapeHtml(company) || '—'}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${escapeHtml(phone) || '—'}</td></tr>
      <tr><td><strong>Subject</strong></td><td>${escapeHtml(subject) || '—'}</td></tr>
    </table>
    <p style="font-family:Arial,sans-serif;font-size:14px"><strong>Message:</strong><br>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
  `

  try {
    const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: TO_EMAIL }] }],
        from: { email: fromEmail, name: 'ET Distribution Website' },
        reply_to: { email, name },
        subject: subjectLine,
        content: [
          { type: 'text/plain', value: textBody },
          { type: 'text/html', value: htmlBody },
        ],
      }),
    })

    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      console.log('[v0] SendGrid send failed:', res.status, detail)
      return NextResponse.json(
        { error: 'We could not send your message. Please try again or email us directly.' },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err) {
    console.log('[v0] SendGrid request error:', (err as Error).message)
    return NextResponse.json(
      { error: 'We could not send your message. Please try again or email us directly.' },
      { status: 502 },
    )
  }
}
