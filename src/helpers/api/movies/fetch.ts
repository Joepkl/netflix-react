/** Local */
import { tmdbAPI } from "@/helpers/api/movies/axiosConfig.ts";
import { useBaseApiRequest } from "@/helpers/api/useBaseApiRequest.tsx";
import { fetchMoviesType } from "@/helpers/api/movies/types.ts";

/** Type */
type searchMovieType = {
  query: string;
  fireSearch: boolean;
  page?: number;
};

/** API calls */
const useFetchTrendingMovies = (page: number = 1) => {
  const { data, error, retry } = useBaseApiRequest({
    url: `/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
    axiosInstance: tmdbAPI,
    method: "get",
  });

  return { data: data as fetchMoviesType, error, retry };
};

const useSearchMovies = ({ query, page = 1, fireSearch = false }: searchMovieType) => {
  const { data, error, retry } = useBaseApiRequest({
    url: `/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
    axiosInstance: tmdbAPI,
    method: "get",
    enableInmediateRequest: false,
    retryRequest: fireSearch,
  });

  return { data: data as fetchMoviesType, error, retry };
};

export { useFetchTrendingMovies, useSearchMovies };
