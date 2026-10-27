import { useEffect, useState } from "react";
import { IMAGE_BASE } from "../../../Services/httpClient";
import { fetchPopularMovies } from "../api";
import { Movie, MovieCardData } from "../types";

export function useDiscover() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const results = await fetchPopularMovies();
        if (!cancelled) setMovies(results);
      } catch (e) {
        const reason = e instanceof Error ? e.message : String(e);
        console.log("Fetch failed:", reason);
        if (!cancelled) setError("Couldn't load movies: " + reason);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Turn raw API data into what the screen needs to display
  const cards: MovieCardData[] = movies.map((m) => ({
    id: m.id,
    title: m.title,
    posterUrl: m.poster_path ? IMAGE_BASE + m.poster_path : null,
    rating: m.vote_average ? m.vote_average.toFixed(1) : null,
  }));

  const openMovie = (id: number) => console.log("Open movie", id);

  return { cards, loading, error, openMovie };
}