/**
 * Google Places (New) Text Search for the destination box: turns what Juan
 * types ("Costco Tustin", an address, a city) into one point to route to.
 * Same endpoint and key (NB_PLACES_API_KEY) as bridges/nutribiotic/geocode.py.
 */

import "server-only";

const PLACES_URL = "https://places.googleapis.com/v1/places:searchText";

const FIELD_MASK = ["places.displayName", "places.formattedAddress", "places.location"].join(",");

export type PlaceHit = {
  name: string;
  formattedAddress: string | null;
  lat: number | null;
  lng: number | null;
};

type RawPlace = {
  displayName?: { text?: string };
  formattedAddress?: string;
  location?: { latitude?: number; longitude?: number };
};

export class PlacesError extends Error {}

/**
 * California's bounding box, generous rather than exact (a rectangle can't
 * trace the state's real border, so this includes a thin sliver of NV/AZ/OR
 * near the line rather than risk clipping a real CA address). A plain text
 * search with no restriction was confirmed returning CT/OH results.
 */
const CALIFORNIA_BOUNDS = {
  low: { latitude: 32.4, longitude: -124.6 },
  high: { latitude: 42.1, longitude: -114.0 },
};

/** Great-circle distance in km, for ranking Places results by proximity. */
function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const la1 = (a.lat * Math.PI) / 180;
  const la2 = (b.lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/**
 * Top few matches for a free-text query, always inside California. Places
 * accepts locationBias OR locationRestriction, never both, so proximity comes
 * a different way: with `near` (the search origin), it asks for more matches
 * than it needs and sorts them by real distance, so the closest match to
 * where Juan is standing comes first.
 */
export async function searchPlaces(
  query: string,
  maxResults = 3,
  near?: { lat: number; lng: number },
): Promise<PlaceHit[]> {
  const key = process.env.NB_PLACES_API_KEY ?? "";
  if (!key) throw new PlacesError("NB_PLACES_API_KEY is not configured on this deployment.");

  const fetchCount = near ? Math.min(Math.max(maxResults * 3, 10), 20) : maxResults;

  const res = await fetch(PLACES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": FIELD_MASK,
    },
    body: JSON.stringify({
      textQuery: query,
      maxResultCount: fetchCount,
      languageCode: "en",
      regionCode: "US",
      locationRestriction: { rectangle: CALIFORNIA_BOUNDS },
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new PlacesError(`Places HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
  const data = (await res.json()) as { places?: RawPlace[] };
  let hits: PlaceHit[] = (data.places ?? []).map((p) => ({
    name: p.displayName?.text ?? "",
    formattedAddress: p.formattedAddress ?? null,
    lat: p.location?.latitude ?? null,
    lng: p.location?.longitude ?? null,
  }));

  if (near) {
    hits = hits
      .map((c) => ({ c, d: c.lat != null && c.lng != null ? haversineKm(near, { lat: c.lat, lng: c.lng }) : Infinity }))
      .sort((x, y) => x.d - y.d)
      .map((x) => x.c);
  }

  return hits.slice(0, maxResults);
}
