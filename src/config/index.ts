export interface StoredAuth {
  token: string;
  refreshToken: string | null;
  email?: string;
}

const AUTH_KEY = import.meta.env.VITE_TOKEN_KEY || "app_auth";

/**
 * Get stored authentication from localStorage
 */
export function getStoredAuth(): StoredAuth | null {
  const raw = localStorage.getItem(AUTH_KEY);
  return raw ? (JSON.parse(raw) as StoredAuth) : null;
}

/**
 * Store authentication data in localStorage
 */
export function setStoredAuth(auth: StoredAuth) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
}

/**
 * Clear authentication data from localStorage
 */
export function clearStoredAuth() {
  localStorage.removeItem(AUTH_KEY);
}
