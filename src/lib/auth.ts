import { cookies } from 'next/headers';
import { getSiteContent } from './contentStore';

const AUTH_COOKIE_NAME = 'arish_admin_session';
const SESSION_SECRET_TOKEN = 'arish_sec_session_token_2025_prod';

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(AUTH_COOKIE_NAME);
  return sessionCookie?.value === SESSION_SECRET_TOKEN;
}

export async function verifyAdminCredentials(pin: string): Promise<boolean> {
  const content = await getSiteContent();
  const configuredPin = content.settings?.adminPin || 'arish2025';
  return pin === configuredPin;
}

export { AUTH_COOKIE_NAME, SESSION_SECRET_TOKEN };
