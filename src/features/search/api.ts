import { tmdbGet } from "../../Services/httpClient";
import { SearchMovie } from "./types";

export async function searchMovies(query: string): Promise<SearchMovie[]> {
  const data = await tmdbGet<{ results?: SearchMovie[] }>("/search/movie", {
    query,
  });
  return data.results || [];
}
