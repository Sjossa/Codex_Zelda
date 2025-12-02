export type UrlType =
  | "games"
  | "staff"
  | "characters"
  | "monsters"
  | "bosses"
  | "dungeons"
  | "places"
  | "items";

export const BASE_URL = `https://zelda.fanapis.com/api/`;

export const buildApiUrl = (endpoint: UrlType): string => {
  return `${BASE_URL}${endpoint}`;
};
