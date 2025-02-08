/** Local */
import { useAppDispatch } from "@/store/hooks.ts";
import { setIsPlayingDetailPageVideo } from "@/store/slices/app.ts";
import { MovieType } from "@/helpers/api/movies/types.ts";
import PlayIcon from "@/assets/icons/play.svg";
import InfoIcon from "@/assets/icons/info_white.svg";

/** Blocks */
import { Button } from "@/components/ui/Button.tsx";
import { Heading } from "@/components/ui/Heading.tsx";
import { Top10Block } from "@/components/blocks/movies/Top10Block.tsx";
import { MoviePoster } from "@/components/blocks/movies/MoviePoster.tsx";

const HighlightMovie = ({ highlightMovieData }: { highlightMovieData: MovieType }) => {
  const dispatch = useAppDispatch();

  /** Helpers */
  const playMovie = () => {
    dispatch(setIsPlayingDetailPageVideo(true));
  };

  /** Markup */
  return (
    <section className="mb-6 sm:mb-10 relative mx-[30px] sm:mx-0">
      <MoviePoster
        posterPath={highlightMovieData.poster_path}
        backdropPath={highlightMovieData.backdrop_path}
        posterSize="original"
        backdropSize="original"
        breakpoint="sm"
        className="rounded max-h-[500px] md:max-h-[400px] lg:max-h-[500px] sm:aspect-video sm:rounded-none"
      />

      {/* Overlay */}
      <div className="bg-black-gradient-to-right absolute inset-0 hidden sm:block" />

      <div className="absolute bottom-2 inset-x-2 sm:left-[30px] sm:right-auto sm:bottom-1/2 sm:transform sm:translate-y-1/2">
        <div className="max-w-[450px] md:max-w-[600px] mb-4 hidden sm:block">
          <Top10Block ranking={1} category="films" />

          {/* Content */}
          <Heading type="h2" styling="h1" className="mb-1">
            {highlightMovieData.title}
          </Heading>
          <p>{highlightMovieData.overview}</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4">
          <Button
            className="grow sm:grow-0 min-w-fit"
            text="Play"
            icon={PlayIcon}
            variant="primary"
            type="link"
            route={`/browse/${highlightMovieData.id}`}
            onClick={playMovie}
          />

          <Button
            className="grow sm:grow-0 min-w-fit"
            text="More info"
            icon={InfoIcon}
            variant="secondary"
            type="link"
            route={`/browse/${highlightMovieData.id}`}
          />
        </div>
      </div>
    </section>
  );
};

export { HighlightMovie };
