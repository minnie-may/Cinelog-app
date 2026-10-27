import { tmdbGet } from "../../Services/httpClient";
import { Movie } from "../discover/types";

export async function getRecommendations(): Promise<Movie[]> {
  const data = await tmdbGet<{ results?: Movie[] }>("/trending/movie/week");
  return data.results || [];
}
