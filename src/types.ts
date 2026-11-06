export interface CommunityGuild {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  members: string;
  reward: number;
  joined: boolean;
}

export interface PricingTierPreset {
  coins: number;
  label: string;
  discountPct: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  global_name?: string | null;
  avatar: string | null;
  banner?: string | null;
  accent_color?: number | null;
}
