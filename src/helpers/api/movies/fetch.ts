/** Local */
import { tmdbAPI } from "@/helpers/api/movies/axiosConfig.ts";
import { useBaseFetch } from "@/helpers/api/baseFunctions/fetch.ts";
import { fetchTrendingMoviesResponseType } from "@/helpers/api/movies/types.ts";

/** API calls */
const useFetchTrendingMovies = (page: number = 1) => {
  const { data, error, refetch } = useBaseFetch({
    url: `/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
    axiosInstance: tmdbAPI,
  });

  return { data: data as fetchTrendingMoviesResponseType, error, refetch };
};

export { useFetchTrendingMovies };
