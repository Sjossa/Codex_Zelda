import { buildApiUrl, isValidRoute, UrlType } from "../types/freakyjorys.types";

export async function fetchPaginatedData(type: UrlType, name?: string) {
  if (!isValidRoute(type)) {
    console.warn("Route invalide :", type);
    return { items: [], hasMore: false };
  }

  const params = new URLSearchParams();

  if (name) params.append("name", name);

  try {
    const res = await fetch(`${buildApiUrl(type)}?name=${name}`);

    if (!res.ok) {
      console.warn("⚠️ HTTP error:", res.status);
      return { items: [], hasMore: false };
    }

    const json = await res.json();
    const items = json?.data ?? [];

    return {
      items,
      hasMore: items.length > 0,
    };
  } catch (err) {
    console.error("❌ Erreur fetch paginé:", err);
    return { items: [], hasMore: false };
  }
}
