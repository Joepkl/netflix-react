/** Vendor */
import { twMerge } from "tailwind-merge";

/** Local */
import { constructMoviePosterUrl } from "@/helpers/movies/moviePoster.tsx";

/** Types */
type MoviePosterType = {
  posterPath: string;
  backdropPath: string;
  posterSize?: 500 | 780 | "original";
  backdropSize?: 300 | 780 | 1280 | "original";
  breakpoint?: "sm" | "md" | "lg" | "xl" | "2xl";
  dataProperty?: { [key: string]: string | number };
  className?: string;
};

/** Component */
const MoviePoster = ({
  posterPath,
  backdropPath,
  posterSize = 500,
  backdropSize = 780,
  breakpoint = "md",
  dataProperty = { key: "", value: "" },
  className = "",
}: MoviePosterType) => {
  const baseClasses = "w-full h-full object-cover object-top";

  return (
    <>
      {/* Vertical poster */}
      <img
        className={twMerge(baseClasses, className, `${breakpoint}:hidden`)}
        src={constructMoviePosterUrl({ path: posterPath, size: posterSize })}
        alt="Movie poster"
        {...(dataProperty.key && { [`data-${dataProperty.key}`]: dataProperty.value })}
      />

      {/* Horizontal backdrop */}
      <img
        className={twMerge(baseClasses, className, `hidden ${breakpoint}:block`)}
        src={constructMoviePosterUrl({ path: backdropPath, size: backdropSize })}
        alt="Movie backdrop"
        {...(dataProperty.key && { [`data-${dataProperty.key}`]: dataProperty.value })}
      />
    </>
  );
};

export { MoviePoster };
