import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCredentials, AUTH_COOKIE_NAME, SESSION_SECRET_TOKEN } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { pin } = await req.json();

    if (!pin) {
      return NextResponse.json({ error: 'PIN / Password required' }, { status: 400 });
    }

    const isValid = await verifyAdminCredentials(pin);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true, message: 'Authenticated successfully' });
    
    // Set secure session cookie
    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: SESSION_SECRET_TOKEN,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
