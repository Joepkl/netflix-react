/** Types */
type constructMoviePosterUrlType = {
  path: string;
  size?: 300 | 500 | 780 | 1280 | "original";
};

/** Helpers */
const constructMoviePosterUrl = ({ path, size = 500 }: constructMoviePosterUrlType) => {
  const formattedSize = size === "original" ? "original" : `w${size}`;
  return `https://image.tmdb.org/t/p/${formattedSize}${path}`;
};

export { constructMoviePosterUrl };
