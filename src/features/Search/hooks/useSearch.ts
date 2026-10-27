import { useState } from "react";
import { searchMovies } from "../api";

export function useSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<unknown[]>([]);

  async function search() {
    if (!query.trim()) return;

    try {
      const data = (await searchMovies(query)) as { results?: unknown[] };
      setResults(data.results || []);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    query,
    setQuery,
    results,
    search,
  };
}
