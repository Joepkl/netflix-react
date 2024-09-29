/** Vendor */
import { useRef, useState, useEffect } from "react";

/** Local */
import { useAppSelector } from "@/store/hooks.ts";
import { useIntersectionObserverHelper } from "@/helpers/generic/useIntersectionObserverHelper.tsx";

/** Blocks */
import { SearchBox } from "@/components/blocks/SearchBox.tsx";

/** Component */
const Header = () => {
  const headerRef = useRef<HTMLElement>(null);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [isSearchBoxExpanded, setIsSearchBoxExpanded] = useState(false);
  const username = useAppSelector((state) => state.app.username);
  const stickyHeaderClass = isHeaderSticky ? "sticky top-0 bg-black-transparent backdrop-blur-xl !py-5 z-50" : "";

  const collapseSearchBox = () => {
    setIsSearchBoxExpanded(false);
  };

  /** Hooks */
  useIntersectionObserverHelper({
    targetRef: headerRef,
    callbackNotIntersecting: () => setIsHeaderSticky(true),
  });

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
      {isSearchBoxExpanded && (
        <div onClick={collapseSearchBox} onTouchStart={collapseSearchBox} className="fixed inset-0" />
      )}

      {/* Header */}
      <header ref={headerRef} className={`${stickyHeaderClass} mb-[40px] py-6 px-[30px] transition-all duration-500`}>
        <div className="flex justify-between w-full gap-10 items-center h-10">
          <h1 className="whitespace-nowrap">For {username}</h1>
          <SearchBox
            isSearchBoxExpanded={isSearchBoxExpanded}
            sendIsSearchBoxExpanded={(isExpanded) => setIsSearchBoxExpanded(isExpanded)}
          />
        </div>
      </header>
    </>
  );
};

export { Header };
