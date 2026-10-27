import { tmdbGet } from "../../services/httpClient";

export async function searchMovies(query: string) {
  return tmdbGet(`/search/movie&query=${encodeURIComponent(query)}`);
}
