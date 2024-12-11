/** Vendor */
import { useEffect, useState } from "react";

/** Local */
import { useAppSelector, useAppDispatch } from "@/store/hooks.ts";
import { setIsPlayingDetailPageVideo } from "@/store/slices/app.ts";
import { useFetchTrendingMovies } from "@/helpers/api/movies/fetch.ts";
import { MovieType } from "@/helpers/api/movies/types.ts";
import { getMoviePosterUrl } from "@/helpers/generic/getMoviePosterUrl.tsx";
import PlayIcon from "@/assets/icons/play.svg";
import InfoIcon from "@/assets/icons/info_white.svg";

/** Blocks */
import { PageWrapper } from "@/components/blocks/generic/PageWrapper.tsx";
import { Header } from "@/components/blocks/generic/Header.tsx";
import { Button } from "@/components/ui/Button.tsx";
import { Heading } from "@/components/ui/Heading.tsx";
import { MovieCarousel } from "@/components/blocks/movies/MovieCarousel.tsx";
import { Top10Block } from "@/components/blocks/movies/Top10Block.tsx";

/** Component */
const BrowsePage = () => {
  const isSearchActive = useAppSelector((state) => state.app.isSearchActive);
  const dispatch = useAppDispatch();

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

  /** Helpers */
  const playMovie = () => {
    console.log("Playing movie");
    dispatch(setIsPlayingDetailPageVideo(true));
  };

  /** Markup */
  return (
    <>
      <Header />
      <PageWrapper disablePaddingTop disablePaddingLeft disablePaddingRight usedWithHeader>
        {!isSearchActive && (
          <>
            {/* Highlight movie */}
            {highlightMovie && (
              <section className="mb-6 sm:mb-10 relative mx-[30px] sm:mx-0">
                <img
                  className="rounded max-h-[600px] sm:aspect-video object-cover sm:rounded-none"
                  src={getMoviePosterUrl(highlightMovie.poster_path)}
                />

                {/* Overlay */}
                <div className="bg-black-gradient-to-right absolute inset-0 hidden sm:block" />

                <div className="absolute bottom-2 inset-x-2 sm:left-[30px] sm:right-auto sm:bottom-1/2 sm:transform sm:translate-y-1/2">
                  {/*  */}
                  <div className="max-w-[450px] md:max-w-[600px] mb-4 hidden sm:block">
                    <Top10Block ranking={1} category="films" />

                    {/* Content */}
                    <Heading type="h2" styling="h1" className="mb-1">
                      {highlightMovie.original_title}
                    </Heading>
                    <p>{highlightMovie.overview}</p>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <Button
                      className="grow sm:grow-0 min-w-fit"
                      text="Play"
                      icon={PlayIcon}
                      variant="primary"
                      type="link"
                      route={`/browse/${highlightMovie.id}`}
                      onClick={playMovie}
                    />

                    <Button
                      className="grow sm:grow-0 min-w-fit"
                      text="More info"
                      icon={InfoIcon}
                      variant="secondary"
                      type="link"
                      route={`/browse/${highlightMovie.id}`}
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Movie carousels */}
            <section className="flex flex-col gap-6 sm:gap-10 mx-[30px]">
              <MovieCarousel title="Trending Movies" movies={updatedTrendingMovieData as MovieType[]} />
              <MovieCarousel title="Top Picks for You" movies={topPicksMovieData?.results} />
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
