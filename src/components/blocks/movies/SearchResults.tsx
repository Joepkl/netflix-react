/** Vendor */
import { Link } from "react-router-dom";

/** Local */
import { getMoviePosterUrl } from "@/helpers/generic/getMoviePosterUrl.tsx";
import { useAppDispatch } from "@/store/hooks.ts";
import { setResetSearchInput } from "@/store/slices/app.ts";

/** Blocks */
import { Heading } from "@/components/ui/Heading.tsx";

/** Type */
import { MovieType } from "@/helpers/api/movies/types.ts";
type SearchResultsType = {
  data: MovieType[];
  error: string | null;
  searchInput: string;
};

/** Component */
const SearchResults = ({ data, error, searchInput }: SearchResultsType) => {
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
                return item.poster_path ? (
                  <li className="flex-none w-[calc(100%/4-12px)] aspect-[115/173] h-fit" key={index}>
                    <Link onClick={resetSearch} to={`/browse/${item.id}`}>
                      <img
                        className="w-full h-full object-cover rounded"
                        src={getMoviePosterUrl(item.poster_path)}
                        alt={item.title}
                      />
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

export { SearchResults };
