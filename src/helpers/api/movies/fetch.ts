/** Local */
import { tmdbAPI } from "@/helpers/api/movies/axiosConfig.ts";
import { useBaseApiRequest } from "@/helpers/api/useBaseApiRequest.tsx";
import { fetchTrendingMoviesResponseType } from "@/helpers/api/movies/types.ts";

/** API calls */
const useFetchTrendingMovies = (page: number = 1) => {
  const { data, error, retry } = useBaseApiRequest({
    url: `/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
    axiosInstance: tmdbAPI,
    method: "get",
  });

  return { data: data as fetchTrendingMoviesResponseType, error, retry };
};

export { useFetchTrendingMovies };
