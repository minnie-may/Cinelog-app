export type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
};

export type MovieCardData = {
  id: number;
  title: string;
  posterUrl: string | null;
  rating: string | null;
};