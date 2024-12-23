/** Vendor */
import { Link } from "react-router-dom";

/** Local */
import { constructMoviePosterUrl, renderMoviePoster } from "@/helpers/generic/moviePoster.tsx";
import { useAppDispatch } from "@/store/hooks.ts";
import { setResetSearchInput } from "@/store/slices/app.ts";

/** Blocks */
import { Heading } from "@/components/ui/Heading.tsx";

/** Type */
import { MovieType } from "@/helpers/api/movies/types.ts";
type MovieSearchResultsType = {
  data: MovieType[];
  error: string | null;
  searchInput: string;
};

/** Component */
const MovieSearchResults = ({ data, error, searchInput }: MovieSearchResultsType) => {
  const dispatch = useAppDispatch();

  const resetSearch = () => {
    dispatch(setResetSearchInput(true));
  };

  /** Markup */
  return (
    <>
      {searchInput.length > 0 && (
        <section className="absolute top-[130px] right-[30px] left-[30px] bottom-[30px] z-40 bg-blue-gradient">
          <Heading type="h2" className="mb-2">
            Search results
          </Heading>

          {/* Movie results */}
          <ul className="flex flex-wrap gap-4  max-h-[calc(100%-30px)] overflow-scroll scrollbar-hide">
            {data &&
              data.map((item, index) => {
                return item.poster_path && item.backdrop_path ? (
                  <li
                    className="flex-none w-[calc(100%/4-12px)] lg:w-[calc(100%/5-13px)] aspect-[115/173] h-fit md:aspect-video"
                    key={index}
                  >
                    <Link onClick={resetSearch} to={`/browse/${item.id}`}>
                      {renderMoviePoster({
                        posterPath: item.poster_path,
                        backdropPath: item.backdrop_path,
                        posterSize: 500,
                        backdropSize: 780,
                        className: "w-full h-full object-cover rounded",
                      })}
                    </Link>
                  </li>
                ) : null;
              })}
          </ul>

          {/* No results */}
          {!data.length && !error && <p>No results found for &quot;{searchInput}&quot;.</p>}

          {/* Error */}
          {error && <p>{error}</p>}
        </section>
      )}
    </>
  );
};

export { MovieSearchResults };
