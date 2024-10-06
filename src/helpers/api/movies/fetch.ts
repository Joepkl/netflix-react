/** Local */
import { tmdbAPI } from "@/helpers/api/movies/axiosConfig.ts";
import { useBaseApiRequest } from "@/helpers/api/useBaseApiRequest.tsx";
import {
  FetchMoviesType,
  MovieDetailsType,
  SearchMovieType,
  MovieReleaseDatesType,
  FetchMovieDetailsType,
} from "@/helpers/api/movies/types.ts";

/** API calls */
const useFetchTrendingMovies = ({ page }: { page: number }) => {
  const { data, error, retry } = useBaseApiRequest({
    url: `/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
    axiosInstance: tmdbAPI,
    method: "get",
  });

  return { data: data as FetchMoviesType, error, retry };
};

const useSearchMovies = ({ query, page = 1, fireSearch = false }: SearchMovieType) => {
  const { data, error, retry } = useBaseApiRequest({
    url: `/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
    axiosInstance: tmdbAPI,
    method: "get",
    enableInmediateRequest: false,
    retryRequest: fireSearch,
  });

  return { data: data as FetchMoviesType, error, retry };
};

const useFetchMovieDetails = ({ movieId, getCast = true }: FetchMovieDetailsType) => {
  const { data, error, retry } = useBaseApiRequest({
    url: `3/movie/${movieId}?language=en-US${getCast ? "&append_to_response=credits" : ""}`,
    axiosInstance: tmdbAPI,
    method: "get",
  });

  return { data: data as MovieDetailsType, error, retry };
};

const useFetchMovieReleaseDates = (movieId: number | null) => {
  const { data, error, retry } = useBaseApiRequest({
    url: `3/movie/${movieId}/release_dates`,
    axiosInstance: tmdbAPI,
    method: "get",
  });

  return { data: data as MovieReleaseDatesType, error, retry };
};

export { useFetchTrendingMovies, useSearchMovies, useFetchMovieDetails, useFetchMovieReleaseDates };
