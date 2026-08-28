import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, projectType, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // In production, this can be connected to Resend / SendGrid or stored in DB
    console.log('[New Portfolio Inquiry]:', {
      timestamp: new Date().toISOString(),
      name,
      email,
      projectType,
      message,
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for reaching out. Your message has been received.',
    });
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 });
  }
}
