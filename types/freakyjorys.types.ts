export type UrlType =
  | "games"
  | "staff"
  | "characters"
  | "monsters"
  | "bosses"
  | "dungeons"
  | "places"
  | "items";

export type RouteType = "characters" | "enemies" | "items" | "locations";

export const routeToApiEndpoints: Record<RouteType, UrlType[]> = {
  characters: ["characters"],
  enemies: ["bosses", "monsters"],
  items: ["items"],
  locations: ["places", "dungeons"],
};

export const BASE_URL = `https://zelda.fanapis.com/api/`;

export const buildApiUrl = (endpoint: UrlType): string => {
  return `${BASE_URL}${endpoint}`;
};

export const isValidRoute = (route: string): route is RouteType => {
  return route in routeToApiEndpoints;
};
