import { tmdbGet } from "../../Services/httpClient";
import { Review } from "./types";

export async function getReviews(): Promise<Review[]> {
  // 550 is Fight Club, a placeholder until we have a movie detail screen
  const data = await tmdbGet<{ results?: Review[] }>("/movie/550/reviews");
  return data.results || [];
}
