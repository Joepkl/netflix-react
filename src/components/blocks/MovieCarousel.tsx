/** Vendor */
import { Link } from "react-router-dom";

/** Local */
import { getMoviePosterUrl } from "@/helpers/generic/getMoviePosterUrl.tsx";

/** Blocks */
import { Heading } from "../ui/Heading.tsx";

/** Type */
import { movieType } from "@/helpers/api/movies/types.ts";
type MovieCarouselType = {
  title?: string;
  movies: movieType[];
};

/** Component */
const MovieCarousel = ({ title, movies }: MovieCarouselType) => {
  return (
    <section>
      {movies && (
        <>
          {title && (
            <Heading type="h2" className="mb-2">
              {title}
            </Heading>
          )}

          {/* Carousel */}
          <ul className="flex gap-4 overflow-x-scroll whitespace-nowrap scrollbar-hide">
            {movies.map((item: movieType, index: number) => (
              <li key={index} className="w-1/4 flex-none aspect-[115/173]">
                <Link to={`/browse/${item.id}`}>
                  <img className="w-full h-full object-cover" src={getMoviePosterUrl(item.poster_path)} alt="Poster" />
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export { MovieCarousel };
