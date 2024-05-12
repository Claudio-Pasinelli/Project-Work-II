import Cookies from 'js-cookie';
import { EMAIL, REFRESH_TOKEN, TOKEN } from '../costants/auth';

export function removeTokenCookies(): void {
  Cookies.remove(TOKEN);
  Cookies.remove(REFRESH_TOKEN);
}

export function removeEmailCookies(): void {
  Cookies.remove(EMAIL);
}

export function addTokenCookies({
  token,
  refreshToken,
}: {
  token: string;
  refreshToken: string;
}): void {
  Cookies.set(TOKEN, token);
  Cookies.set(REFRESH_TOKEN, refreshToken);
}

export function getEmailCookies(): {
  email: string | null;
} {
  const email = Cookies.get(EMAIL) || null;
  return {
    email
  };
}