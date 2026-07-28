import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getAutoReplyHTML, getAdminNotificationHTML } from '@/lib/emailTemplates';

const resend = new Resend(process.env.RESEND_API_KEY || 're_fallback');
const ADMIN_EMAIL = process.env.SUPPORT_EMAIL || 'pmantu808@gmail.com';

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'RESEND_API_KEY is missing on server.' }, { status: 500 });
    }

    const body = await req.json();
    const { type, name, email, subject, message, attachments, payload } = body;

    const fromAddress = 'SmartPay AI OS <onboarding@resend.dev>';

    // 1. Send Admin Alert Email
    await resend.emails.send({
      from: fromAddress,
      to: ADMIN_EMAIL,
      subject: `[SmartPay OS ${type.toUpperCase()}] ${subject || 'New Activity'}`,
      html: getAdminNotificationHTML(type, { name, email, subject, message, ...payload }),
      attachments: attachments || [],
    });

    // 2. Send Auto-Reply to User (if email exists)
    if (email) {
      await resend.emails.send({
        from: fromAddress,
        to: email,
        subject: `Thank you for contacting SmartPay AI OS - ${subject || 'Request Received'}`,
        html: getAutoReplyHTML(name, subject || 'Support Request'),
      });
    }

    return NextResponse.json({ success: true, message: 'Email dispatched successfully!' });
  } catch (error: any) {
    console.error('Resend Email Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to dispatch email.' }, { status: 500 });
  }
}
