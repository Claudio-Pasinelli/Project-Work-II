import Cookies from 'js-cookie';
import { LOGGED, NAME } from '../costants/auth';

// logged
export function removeLoggedCookies(): void {
  Cookies.remove(LOGGED);
}

export function addLoggedCookies({
  logged
}: {
  logged: string;
}): void {
  Cookies.set(LOGGED, logged);
}

export function getLoggedCookies(): {
  logged: string | null;
} {
  const logged = Cookies.get(LOGGED) || null;
  return {
    logged
  };
}

// nome dell'utente
export function removeNameCookies(): void {
  Cookies.remove(NAME);
}

export function addNameCookies({
  name
}: {
  name: string;
}): void {
  Cookies.set(NAME, name);
}

export function getNameCookies(): {
  name: string | null;
} {
  const name = Cookies.get(NAME) || null;
  return {
    name
  };
}