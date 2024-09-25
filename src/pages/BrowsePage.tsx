/** Local */
import { useFetchTrendingMovies } from "@/helpers/api/movies/fetch.ts";
import { movieType } from "@/helpers/api/movies/types.ts";

/** Blocks */
import { PageWrapper } from "@/components/blocks/PageWrapper.tsx";
import { Header } from "@/components/blocks/Header.tsx";
import { Button } from "@/components/ui/Button/index.tsx";

/** Component */
const BrowsePage = () => {
  const {
    data: trendingMovieData,
    error: trendingMovieError,
    refetch: refetchTrendingMovies,
  } = useFetchTrendingMovies();

  /** Markup */
  return (
    <>
      <Header />
      <PageWrapper disablePaddingTop>
        <h2>Browse page</h2>

        {/* Data */}
        {trendingMovieData && (
          <ul>
            {trendingMovieData.results.map((item: movieType, index: number) => (
              <li key={index}>{item.id}</li>
            ))}
          </ul>
        )}

        {/* Error */}
        {trendingMovieError && (
          <div>
            <p>Something went wrong, please try again.</p>
            <Button text="Primary" variant="primary" onClick={() => refetchTrendingMovies()} />
          </div>
        )}
      </PageWrapper>
    </>
  );
};

export { BrowsePage };
