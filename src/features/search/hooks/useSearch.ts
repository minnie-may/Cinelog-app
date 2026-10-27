import { useState } from "react";
import { searchMovies } from "../api";
import { SearchMovie } from "../types";

export function useSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  async function search() {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    try {
      setResults(await searchMovies(query.trim()));
      setSearched(true);
    } catch (e) {
      const reason = e instanceof Error ? e.message : String(e);
      console.log("Search failed:", reason);
      setError("Search failed: " + reason);
    } finally {
      setLoading(false);
    }
  }

  return {
    query,
    setQuery,
    results,
    search,
    loading,
    error,
    searched,
  };
}
