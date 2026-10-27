import { tmdbGet } from "../../../services/httpClient";

export const REVIEWS_MOVIE = {
  id: 550,
  title: "Fight Club",
} as const;

export async function getReviews() {
  return tmdbGet(`/movie/${REVIEWS_MOVIE.id}/reviews`);
}
