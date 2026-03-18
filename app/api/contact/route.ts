import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactBody {
  name: string;
  email: string;
  phone: string;
  country: string;
  message: string;
  website?: string;
}

const submissions = new Map<string, number[]>();

const emailLabels: Record<string, Record<string, string>> = {
  romania: {
    badge: 'Mesaj Nou',
    name: 'Nume',
    email: 'Email',
    phone: 'Telefon',
    country: 'Țară',
    message: 'Mesaj',
    footer: 'Acest mesaj a fost trimis prin formularul de contact de pe',
    subject: 'Mesaj nou de la',
  },
  bulgaria: {
    badge: 'Ново съобщение',
    name: 'Име',
    email: 'Имейл',
    phone: 'Телефон',
    country: 'Държава',
    message: 'Съобщение',
    footer: 'Това съобщение е изпратено чрез формата за контакт на',
    subject: 'Ново съобщение от',
  },
};

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  const recent = (submissions.get(ip) || []).filter((t) => now - t < 60_000);
  if (recent.length >= 3) {
    return NextResponse.json({ error: 'RATE_LIMITED' }, { status: 429 });
  }
  recent.push(now);
  submissions.set(ip, recent);

  let body: ContactBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'INVALID_REQUEST' }, { status: 400 });
  }

  if (body.website) {
    return NextResponse.json({ success: true });
  }

  if (
    !body.name?.trim() ||
    !body.email?.trim() ||
    !body.phone?.trim() ||
    !body.country?.trim() ||
    !body.message?.trim()
  ) {
    return NextResponse.json({ error: 'MISSING_FIELDS' }, { status: 400 });
  }

  if (!/^[\p{L}\s'-]+$/u.test(body.name) || body.name.trim().length < 3 || body.name.length > 160) {
    return NextResponse.json({ error: 'INVALID_NAME' }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email) || body.email.length > 160) {
    return NextResponse.json({ error: 'INVALID_EMAIL' }, { status: 400 });
  }

  if (!/^[\d\s+\-()]+$/.test(body.phone) || body.phone.trim().length < 3 || body.phone.length > 160) {
    return NextResponse.json({ error: 'INVALID_PHONE' }, { status: 400 });
  }

  if (body.message.trim().length < 3 || body.message.length > 400) {
    return NextResponse.json({ error: 'INVALID_MESSAGE' }, { status: 400 });
  }

  const lang = body.country.toLowerCase() === 'bulgaria' ? 'bulgaria' : 'romania';
  const labels = emailLabels[lang];

  try {
    const { error } = await resend.emails.send({
      from: 'ABA Pergola <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL!,
      replyTo: body.email,
      subject: `${labels.subject} ${body.name} — ABA Pergola`,
      html: buildEmailHtml(body, labels),
    });

    if (error) {
      console.error('Resend error:', error);
      const quotaErrors = ['daily_quota_exceeded', 'monthly_quota_exceeded'];
      if (quotaErrors.includes(error.name)) {
        return NextResponse.json({ error: 'QUOTA_EXCEEDED' }, { status: 429 });
      }
      if (error.name === 'rate_limit_exceeded') {
        return NextResponse.json({ error: 'RATE_LIMITED' }, { status: 429 });
      }
      return NextResponse.json({ error: 'SEND_FAILED' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'SEND_FAILED' }, { status: 500 });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildEmailHtml(body: ContactBody, labels: Record<string, string>): string {
  const name = escapeHtml(body.name);
  const email = escapeHtml(body.email);
  const phone = escapeHtml(body.phone);
  const country = escapeHtml(body.country);
  const message = escapeHtml(body.message).replace(/\n/g, '<br />');
  const lang = body.country.toLowerCase() === 'bulgaria' ? 'bg' : 'ro';

  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#f2f0ed;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f0ed;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#1a1a1a;border-radius:12px;overflow:hidden;">

          <tr>
            <td style="padding:32px 40px 24px;border-bottom:1px solid rgba(255,255,255,0.08);">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size:18px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">ABA Pergola</span>
                    <span style="display:block;font-size:9px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:#c0392b;margin-top:2px;">Systems</span>
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <span style="display:inline-block;background-color:#c0392b;color:#ffffff;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;padding:6px 14px;border-radius:4px;">${labels.badge}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:32px 40px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);border-radius:8px;overflow:hidden;">
                <tr>
                  <td style="padding:20px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom:16px;">
                          <span style="display:block;font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-bottom:6px;">${labels.name}</span>
                          <span style="display:block;font-size:15px;color:#ffffff;font-weight:500;">${name}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom:16px;">
                          <span style="display:block;font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-bottom:6px;">${labels.email}</span>
                          <a href="mailto:${email}" style="display:block;font-size:15px;color:#c0392b;font-weight:500;text-decoration:none;">${email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom:16px;">
                          <span style="display:block;font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-bottom:6px;">${labels.phone}</span>
                          <a href="tel:${phone.replace(/\s/g, '')}" style="display:block;font-size:15px;color:#ffffff;font-weight:500;text-decoration:none;">${phone}</a>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span style="display:block;font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-bottom:6px;">${labels.country}</span>
                          <span style="display:block;font-size:15px;color:#ffffff;font-weight:500;">${country}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 40px 0;">
              <span style="display:block;font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-bottom:12px;">${labels.message}</span>
              <div style="background-color:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:20px 24px;">
                <p style="margin:0;font-size:14px;line-height:1.7;color:rgba(255,255,255,0.85);">${message}</p>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:32px 40px;margin-top:16px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid rgba(255,255,255,0.08);padding-top:24px;">
                <tr>
                  <td>
                    <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.3);line-height:1.5;">
                      ${labels.footer} <span style="color:rgba(255,255,255,0.5);">abapergola.ro</span>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
