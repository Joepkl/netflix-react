/** Vendor */
import axios from "axios";

/** Constants */
const tmdbAPI = axios.create({
  baseURL: "https://api.themoviedb.org/",
});

/** Interceptor */
tmdbAPI.interceptors.request.use(
  (config) => {
    const bearerToken = import.meta.env.VITE_TMDB_BEARER_TOKEN;

    config.headers.Authorization = `Bearer ${bearerToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { tmdbAPI };
