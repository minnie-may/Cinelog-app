import { tmdbGet } from "../../Services/httpClient";
import { Movie } from "./types";

export async function fetchPopularMovies(): Promise<Movie[]> {
  const data = await tmdbGet<{ results?: Movie[] }>("/movie/popular");
  return data.results || [];
}