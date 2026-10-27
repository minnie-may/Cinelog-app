const TMDB_BASE = "https://api.themoviedb.org/3";

export const TMDB_API_KEY = "917e1fe131dfb1fc9addf8f350ee8513";
export const IMAGE_BASE = "https://image.tmdb.org/t/p/w342";

export async function tmdbGet<T>(path: string): Promise<T> {
  const response = await fetch(`${TMDB_BASE}${path}?api_key=${TMDB_API_KEY}`);
  if (!response.ok) {
    throw new Error("TMDB returned " + response.status);
  }
  return response.json();
}
