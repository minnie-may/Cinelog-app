import { tmdbGet } from "../../services/httpClient";

export async function getRecommendations() {
  const data = await tmdbGet("/movie/popular");

  return data as any;
}
