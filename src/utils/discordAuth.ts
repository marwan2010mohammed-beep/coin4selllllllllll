export interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  global_name?: string | null;
  avatar: string | null;
  banner?: string | null;
  accent_color?: number | null;
}

export const DISCORD_CLIENT_ID = '1567571721500758167';
export const DISCORD_REDIRECT_URI = 'https://coin4sell.vercel.app/';

export function getDiscordAuthUrl(redirectUri: string = DISCORD_REDIRECT_URI): string {
  const params = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: 'token',
    scope: 'identify',
  });
  return `https://discord.com/oauth2/authorize?${params.toString()}`;
}

export function redirectToDiscordAuth(redirectUri: string = DISCORD_REDIRECT_URI): void {
  const url = getDiscordAuthUrl(redirectUri);
  window.open(url, '_blank');
}

export function parseDiscordHashToken(): { token: string; tokenType?: string; expiresIn?: string } | null {
  if (typeof window === 'undefined') return null;
  const hash = window.location.hash;
  if (!hash || !hash.includes('access_token')) return null;

  const cleanHash = hash.startsWith('#') ? hash.slice(1) : hash;
  const params = new URLSearchParams(cleanHash);
  const token = params.get('access_token');
  if (!token) return null;

  const tokenType = params.get('token_type') || 'Bearer';
  const expiresIn = params.get('expires_in') || undefined;

  // Clean the hash fragment from the URL bar without reloading
  if (window.history && window.history.replaceState) {
    const cleanUrl = window.location.pathname + window.location.search;
    window.history.replaceState(null, '', cleanUrl);
  }

  return { token, tokenType, expiresIn };
}

export async function fetchDiscordUserProfile(token: string): Promise<DiscordUser> {
  const response = await fetch('https://discord.com/api/users/@me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Discord API error: ${response.status} ${response.statusText}`);
  }

  const data: DiscordUser = await response.json();
  return data;
}

export function getDiscordAvatarUrl(user: DiscordUser, size: number = 128): string {
  if (user.avatar) {
    const isAnimated = user.avatar.startsWith('a_');
    const ext = isAnimated ? 'gif' : 'png';
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=${size}`;
  }
  // Fallback default Discord avatar based on discriminator or id
  let index = 0;
  try {
    if (user.discriminator && user.discriminator !== '0') {
      index = Number(user.discriminator) % 5;
    } else if (user.id) {
      index = Number((BigInt(user.id) >> 22n) % 6n);
    }
  } catch {
    index = 0;
  }
  return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
}

const STORAGE_KEY_TOKEN = 'discord_access_token';
const STORAGE_KEY_USER = 'discord_user_profile';

export function getStoredDiscordSession(): { token: string | null; user: DiscordUser | null } {
  if (typeof window === 'undefined') return { token: null, user: null };
  try {
    const token = localStorage.getItem(STORAGE_KEY_TOKEN);
    const userJson = localStorage.getItem(STORAGE_KEY_USER);
    const user = userJson ? (JSON.parse(userJson) as DiscordUser) : null;
    return { token, user };
  } catch (e) {
    console.error('Failed to read Discord session from storage:', e);
    return { token: null, user: null };
  }
}

export function saveDiscordSession(token: string, user: DiscordUser): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_TOKEN, token);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
  } catch (e) {
    console.error('Failed to save Discord session:', e);
  }
}

export function clearDiscordSession(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    localStorage.removeItem(STORAGE_KEY_USER);
  } catch (e) {
    console.error('Failed to clear Discord session:', e);
  }
}
