/** Local */
import { useAppSelector } from "@/store/hooks.ts";
import { useFetchTrendingMovies } from "@/helpers/api/movies/fetch.ts";

/** Blocks */
import { PageWrapper } from "@/components/blocks/PageWrapper.tsx";
import { Header } from "@/components/blocks/Header.tsx";
import { Button } from "@/components/ui/Button.tsx";
import { MovieCarousel } from "@/components/blocks/MovieCarousel.tsx";

/** Component */
const BrowsePage = () => {
  const isSearchActive = useAppSelector((state) => state.app.isSearchActive);

  // API requests
  const { data: trendingMovieData, error: trendingMovieError, retry: refetchTrendingMovies } = useFetchTrendingMovies();
  const {
    data: topPicksMovieData,
    error: topPicksMovieError,
    retry: refetchTopPicksMovies,
  } = useFetchTrendingMovies(2);

  const handleRetry = () => {
    refetchTrendingMovies();
    refetchTopPicksMovies();
  };

  const hasFetchError = trendingMovieError || topPicksMovieError;

  /** Markup */
  return (
    <>
      <Header />
      <PageWrapper disablePaddingTop usedWithHeader>
        {!isSearchActive && (
          <div className="pb-[800px]">
            {/* Movie carousels */}
            <section className="flex flex-col gap-4">
              <MovieCarousel title="Trending movies" movies={trendingMovieData?.results} />
              <MovieCarousel title="Top picks for you" movies={topPicksMovieData?.results} />
            </section>

            {/* Error */}
            {hasFetchError && (
              <div>
                <p>Something went wrong, please try again.</p>
                <Button text="Primary" variant="primary" onClick={() => handleRetry()} />
              </div>
            )}
          </div>
        )}
      </PageWrapper>
    </>
  );
};

export { BrowsePage };
