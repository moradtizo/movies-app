// types/movie.ts
export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    original_title: string;
    original_language: string;
    release_date?: string;
    runtime?: number;
    revenue?: number;
    vote_average?: number;
    vote_count?: number;
    genres?: Genre[];
    genre_ids?: number[];
  }
  