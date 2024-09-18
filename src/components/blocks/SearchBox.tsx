/** Vendor */
import { useState, useEffect, useCallback, useRef } from "react";
import { ChangeEvent } from "react";

/** Local */
import SearchIcon from "@/assets/icons/search_white.svg";
import CrossIcon from "@/assets/icons/cross_white.svg";

/** Type */
type SearchBoxPropsType = {
  sendIsSearchBoxExpanded: (data: boolean) => void;
  isSearchBoxExpanded: boolean;
};

/** Component */
const SearchBox = ({ sendIsSearchBoxExpanded, isSearchBoxExpanded }: SearchBoxPropsType) => {
  const transitionClass = "transition-all duration-300 ease-in-out";
  const [searchInput, setSearchInput] = useState("");
  const hasSearchInput = searchInput.length > 0;
  const inputRef = useRef<HTMLInputElement>(null);

  const expandSearchBox = () => {
    sendIsSearchBoxExpanded(true);
    inputRef.current?.focus();
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const clearSearchInput = useCallback(() => {
    if (hasSearchInput) {
      setSearchInput("");
      inputRef.current?.focus();
    }
  }, [hasSearchInput]);

  /** Effects */
  useEffect(() => {
    if (!isSearchBoxExpanded) {
      clearSearchInput();
    }
  }, [isSearchBoxExpanded, clearSearchInput]);

  /** Markup */
  return (
    <>
      <button
        onClick={expandSearchBox}
        className={`relative flex items-center h-fit ${
          isSearchBoxExpanded ? "w-full" : "w-auto"
        } max-w-[250px] min-w-[24px] min-h-[24px] z-999`}
      >
        <input
          ref={inputRef}
          onChange={(e) => handleInput(e)}
          value={searchInput}
          type="text"
          placeholder="Search for movies..."
          className={`${
            isSearchBoxExpanded
              ? `border-2 border-white-main w-full opacity-100 py-2 pl-4 pr-12 ${transitionClass}`
              : "w-0 opacity-0"
          }  bg-black rounded absolute right-0`}
        />

        <img
          onClick={clearSearchInput}
          className={`${transitionClass} w-6 h-6 absolute ${isSearchBoxExpanded ? "right-2" : "right-0"}`}
          src={hasSearchInput ? CrossIcon : SearchIcon}
          alt={hasSearchInput ? "Close" : "Search"}
        />
      </button>
    </>
  );
};

export { SearchBox };
