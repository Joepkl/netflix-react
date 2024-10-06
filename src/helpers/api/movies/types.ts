/** Types */
type MovieType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  genre: {
    id: number;
    name: string;
  };
};

type MovieDetailsType = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Array<{
    id: number;
    name: string;
  }>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<{
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }>;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits?: MovieCreditsType;
};

type MovieCreditsType = {
  cast: Array<{
    name: string;
    known_for_department: string;
    character: string;
  }>;
  crew: Array<{
    name: string;
    known_for_department: string;
  }>;
};

type ReleaseDateType = {
  iso_3166_1: string;
  release_dates: Array<{
    certification: string;
    descriptors: string[];
    iso_639_1: string;
    note: string;
    release_date: string;
    type: number;
  }>;
};

type FetchMoviesType = {
  page: number;
  results: MovieType[];
  total_pages: number;
  total_results: number;
};

type FetchMovieDetailsType = {
  movieId: number | null;
  getCast?: boolean;
};

type SearchMovieType = {
  query: string;
  fireSearch: boolean;
  page?: number;
};

type MovieReleaseDatesType = {
  id: number;
  results: ReleaseDateType[];
};

export type {
  MovieType,
  MovieDetailsType,
  FetchMoviesType,
  SearchMovieType,
  MovieReleaseDatesType,
  FetchMovieDetailsType,
  MovieCreditsType,
};
