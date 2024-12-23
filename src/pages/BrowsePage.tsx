/** Vendor */
import { useEffect, useState } from "react";

/** Local */
import { useAppSelector } from "@/store/hooks.ts";
import { useFetchTrendingMovies } from "@/helpers/api/movies/fetch.ts";
import { MovieType } from "@/helpers/api/movies/types.ts";

/** Blocks */
import { PageWrapper } from "@/components/blocks/generic/PageWrapper.tsx";
import { Header } from "@/components/blocks/generic/Header.tsx";
import { Button } from "@/components/ui/Button.tsx";
import { MovieCarousel } from "@/components/blocks/movies/MovieCarousel.tsx";
import { HighlightMovie } from "@/components/blocks/movies/HighLightMovie.tsx";

/** Component */
const BrowsePage = () => {
  const isSearchActive = useAppSelector((state) => state.app.isSearchActive);

  const [highlightMovie, setHighlightMovie] = useState<MovieType | null>(null);
  const [updatedTrendingMovieData, setUpdatedTrendingMovieData] = useState<MovieType[] | null>(null);

  /** API requests */
  const {
    data: trendingMovieData,
    error: trendingMovieError,
    retry: refetchTrendingMovies,
  } = useFetchTrendingMovies({ page: 1 });

  const {
    data: topPicksMovieData,
    error: topPicksMovieError,
    retry: refetchTopPicksMovies,
  } = useFetchTrendingMovies({ page: 2 });

  const handleRetry = () => {
    refetchTrendingMovies();
    refetchTopPicksMovies();
  };

  const hasFetchError = trendingMovieError || topPicksMovieError;

  /** Effects */
  useEffect(() => {
    if (!trendingMovieData?.results.length) return;

    const getHighlightMovie = () => {
      const [firstMovie, ...remainingMovies] = trendingMovieData.results;
      setHighlightMovie(firstMovie);
      setUpdatedTrendingMovieData(remainingMovies);
    };

    getHighlightMovie();
  }, [trendingMovieData]);

  /** Markup */
  return (
    <>
      <Header />
      <PageWrapper disablePaddingTop disablePaddingLeft disablePaddingRight usedWithHeader>
        {!isSearchActive && (
          <>
            {/* Highlight movie */}
            {highlightMovie && <HighlightMovie highlightMovieData={highlightMovie} />}

            {/* Movie carousels */}
            <section className="flex flex-col gap-6 sm:gap-10 mx-[30px]">
              <MovieCarousel title="Trending Movies" movies={updatedTrendingMovieData as MovieType[]} animateIn />
              <MovieCarousel
                title="Top Picks for You"
                movies={topPicksMovieData?.results}
                animateIn
                animationDelay={200}
              />
            </section>

            {/* Error */}
            {hasFetchError && (
              <section className="mx-[30px]">
                <p className="mb-4">Something went wrong while retrieving movie data, please try again.</p>
                <Button text="Try again" variant="primary" onClick={() => handleRetry()} />
              </section>
            )}
          </>
        )}
      </PageWrapper>
    </>
  );
};

export { BrowsePage };
