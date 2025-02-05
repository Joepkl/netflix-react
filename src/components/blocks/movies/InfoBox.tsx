/** Local */
import { useAppDispatch } from "@/store/hooks.ts";
import { setIsPlayingDetailPageVideo } from "@/store/slices/app.ts";
import PlayIcon from "@/assets/icons/play.svg";
import InfoIcon from "@/assets/icons/info_white.svg";
import LikeIcon from "@/assets/icons/like_white.svg";
import { formatReleaseDate } from "@/helpers/movies/movieDetails.tsx";

/** Blocks */
import { Button } from "@/components/ui/Button.tsx";

/** Type */
import { MovieType } from "@/helpers/api/movies/types.ts";

/**
 * Component is used to show an info box on parent hover on > lg screens.
 * In order to use this component, parent element should have the following classes "group/infobox relative".
 *
 * @param {MovieType} movieData - Movie data.
 */

/** Component */
const InfoBox = ({ movieData }: { movieData: MovieType }) => {
  const dispatch = useAppDispatch();

  /** Helpers */
  const playMovie = () => {
    dispatch(setIsPlayingDetailPageVideo(true));
  };

  const renderVoteAverage = ({ voteAverage }: { voteAverage: number }) => {
    return Math.round(voteAverage * 10) + "%";
  };

  /** Markup */
  return (
    <div className="absolute hidden lg:block px-4 py-2 rounded top-1/2 left-1/2 scale-0 opacity-0 transform -translate-y-1/2 -translate-x-1/2 w-[70%] h-[70%] bg-black-transparent backdrop-blur-xl group-hover/infobox:scale-125 group-hover/infobox:opacity-100 transition-all duration-300 delay-500">
      <p className="font-semibold text-base truncate">{movieData.original_title}</p>

      <p className="text-xs text-grey-light">{formatReleaseDate({ releaseDate: new Date(movieData.release_date) })}</p>

      <p className="text-xs line-clamp-2 mt-2 mb-3">{movieData.overview}</p>

      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <Button
            icon={PlayIcon}
            iconOnly
            variant="primary"
            type="link"
            route={`/browse/${movieData.id}`}
            onClick={playMovie}
          />

          <Button
            icon={InfoIcon}
            iconOnly
            variant="secondary"
            type="link"
            route={`/browse/${movieData.id}`}
            className="text-sm"
          />
        </div>

        {/* Votes rating */}
        <div className="flex gap-2 items-end">
          <p className="text-xs font-semibold">{renderVoteAverage({ voteAverage: movieData.vote_average })}</p>
          <img className="w-5 h-5" src={LikeIcon} alt="Like icon" />
        </div>
      </div>
    </div>
  );
};

export { InfoBox };
