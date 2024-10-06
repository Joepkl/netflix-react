/** Vendor */
import { useRef, useState, useEffect } from "react";

/** Local */
import { useAppSelector } from "@/store/hooks.ts";
import { useIntersectionObserverHelper } from "@/helpers/generic/useIntersectionObserverHelper.tsx";
import { useSearchMovies } from "@/helpers/api/movies/fetch.ts";

/** Blocks */
import { Heading } from "@/components/ui/Heading.tsx";
import { SearchBox } from "@/components/blocks/generic/SearchBox.tsx";
import { MovieSearchResults } from "@/components/blocks/movies/MovieSearchResults.tsx";

/** Component */
const Header = () => {
  const headerRef = useRef<HTMLElement>(null);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [isSearchBoxExpanded, setIsSearchBoxExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [fireSearch, setFireSearch] = useState(false);
  const username = useAppSelector((state) => state.app.username);
  const isSearchActive = useAppSelector((state) => state.app.isSearchActive);
  const stickyHeaderClass = isHeaderSticky ? "sticky top-0 bg-black-transparent backdrop-blur-xl !py-5 z-50" : "";

  // API request for searching movies
  const { data, error } = useSearchMovies({ query: searchQuery, fireSearch });

  const collapseSearchBox = () => {
    if (!searchQuery) setIsSearchBoxExpanded(false);
  };

  const handleSearch = (searchQuery: string) => {
    setSearchQuery(searchQuery);
    setFireSearch(true);
  };

  /** Intersection observer */
  useIntersectionObserverHelper({
    targetRef: headerRef,
    callbackNotIntersecting: () => setIsHeaderSticky(true),
  });

  /** Effects */
  useEffect(() => {
    const handleScrollTop = () => {
      if (window.scrollY <= 5) {
        setIsHeaderSticky(false);
      }
    };

    // Reset sticky header when user scrolls to top
    // Can't be done with IntersectionObserver because of re-render when header is sticky and pops in view
    document.addEventListener("scroll", handleScrollTop);

    return () => {
      document.removeEventListener("scroll", handleScrollTop);
    };
  }, []);

  /** Markup */
  return (
    <>
      {/* Overlay */}
      {isSearchBoxExpanded && !isSearchActive && (
        <div onClick={collapseSearchBox} onTouchStart={collapseSearchBox} className="fixed inset-0 z-50" />
      )}

      {/* Search results */}
      {data && <MovieSearchResults data={data.results} error={error} searchInput={searchQuery} />}

      {/* Header */}
      <header
        ref={headerRef}
        className={`${stickyHeaderClass} mb-[40px] py-6 px-[30px] transition-all duration-500 z-50`}
      >
        <div className="flex justify-between w-full gap-10 items-center h-10">
          <Heading type="h1" className="whitespace-nowrap z-50">
            For {username}
          </Heading>
          <SearchBox
            isSearchBoxExpanded={isSearchBoxExpanded}
            getIsSearchBoxExpanded={(isExpanded) => setIsSearchBoxExpanded(isExpanded)}
            onSearch={(input) => handleSearch(input)}
          />
        </div>
      </header>
    </>
  );
};

export { Header };
