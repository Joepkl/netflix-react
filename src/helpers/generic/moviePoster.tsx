/** Types */
type constructMoviePosterUrlType = {
  path: string;
  size?: 300 | 500 | 780 | 1280 | "original";
};

type renderMoviePosterType = {
  posterPath: string;
  backdropPath: string;
  posterSize?: 500 | 780 | "original";
  backdropSize?: 300 | 780 | 1280 | "original";
  breakpoint?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
};

/** Helpers */
const constructMoviePosterUrl = ({ path, size = 500 }: constructMoviePosterUrlType) => {
  const formattedSize = size === "original" ? "original" : `w${size}`;
  return `https://image.tmdb.org/t/p/${formattedSize}${path}`;
};

const renderMoviePoster = ({
  posterPath,
  backdropPath,
  posterSize = 500,
  backdropSize = 780,
  breakpoint = "md",
  className = "",
}: renderMoviePosterType) => {
  return (
    <>
      {/* Vertical poster */}
      <img
        className={`${className} ${breakpoint}:hidden`}
        src={constructMoviePosterUrl({ path: posterPath, size: posterSize })}
        alt="Movie poster"
      />

      {/* Horizontal poster */}
      <img
        className={`${className} hidden ${breakpoint}:block`}
        src={constructMoviePosterUrl({ path: backdropPath, size: backdropSize })}
        alt="Movie poster"
      />
    </>
  );
};

export { constructMoviePosterUrl, renderMoviePoster };
