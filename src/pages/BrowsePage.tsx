/** Vendor */
import { useEffect, useState } from "react";

/** Local */
import { useAppSelector } from "@/store/hooks.ts";
import { useFetchTrendingMovies } from "@/helpers/api/movies/fetch.ts";
import { movieType } from "@/helpers/api/movies/types.ts";
import { getMoviePosterUrl } from "@/helpers/generic/getMoviePosterUrl.tsx";
import PlayIcon from "@/assets/icons/play.svg";

/** Blocks */
import { PageWrapper } from "@/components/blocks/PageWrapper.tsx";
import { Header } from "@/components/blocks/Header.tsx";
import { Button } from "@/components/ui/Button.tsx";
import { MovieCarousel } from "@/components/blocks/MovieCarousel.tsx";
import { VideoPlayer } from "@/components/blocks/VideoPlayer.tsx";

/** Component */
const BrowsePage = () => {
  const isSearchActive = useAppSelector((state) => state.app.isSearchActive);
  const [highlightMovie, setHighlightMovie] = useState<movieType | null>(null);
  const [updatedTrendingMovieData, setUpdatedTrendingMovieData] = useState<movieType[] | null>(null);

  /** API requests */
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
      <PageWrapper disablePaddingTop usedWithHeader>
        {!isSearchActive && (
          <div>
            {/* Highlight movie */}
            {highlightMovie && (
              <section className="mb-6">
                <img className="rounded" src={getMoviePosterUrl(highlightMovie.poster_path)} />
                {/* <div className="flex gap-4">
                  <Button text="Play" />
                  <Button text="More info" />
                </div> */}

                <div className="flex flex-col gap-2">
                  <Button text="Play" icon={PlayIcon} variant="primary" />
                  <Button text="secondary" variant="secondary" />
                  <Button text="outline" variant="outline" />
                  <Button text="tertiary" variant="tertiary" />
                </div>
              </section>
            )}

            <VideoPlayer poster={getMoviePosterUrl(highlightMovie?.poster_path)} />

            {/* Movie carousels */}
            <section className="flex flex-col gap-6">
              <MovieCarousel title="Trending Movies" movies={updatedTrendingMovieData as movieType[]} />
              <MovieCarousel title="Top Picks for You" movies={topPicksMovieData?.results} />
            </section>

            {/* Error */}
            {hasFetchError && (
              <section>
                <p className="mb-4">Something went wrong while retrieving movie data, please try again.</p>
                <Button text="Try again" variant="primary" onClick={() => handleRetry()} />
              </section>
            )}
          </div>
        )}
      </PageWrapper>
    </>
  );
};

export { BrowsePage };
