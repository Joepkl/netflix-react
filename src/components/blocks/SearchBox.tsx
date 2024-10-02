/** Vendor */
import { useState, useEffect, useRef } from "react";
import { ChangeEvent } from "react";

/** Local */
import { useAppDispatch, useAppSelector } from "@/store/hooks.ts";
import SearchIcon from "@/assets/icons/search_white.svg";
import CrossIcon from "@/assets/icons/cross_white.svg";
import { setIsSearchActive, setResetSearchInput } from "@/store/slices/app.ts";

/** Type */
type SearchBoxPropsType = {
  getIsSearchBoxExpanded: (data: boolean) => void;
  onSearch: (input: string) => void;
  isSearchBoxExpanded: boolean;
};

/** Component */
const SearchBox = ({ getIsSearchBoxExpanded, onSearch, isSearchBoxExpanded }: SearchBoxPropsType) => {
  const dispatch = useAppDispatch();
  const transitionClass = "transition-all duration-300 ease-in-out";
  const [searchInput, setSearchInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const hasSearchInput = searchInput.length > 0;
  const isSearchActive = useAppSelector((state) => state.app.isSearchActive);
  const resetSearchInput = useAppSelector((state) => state.app.resetSearchInput);

  const expandSearchBox = () => {
    getIsSearchBoxExpanded(true);
    inputRef.current?.focus();
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const clearSearchInput = () => {
    setSearchInput("");
    inputRef.current?.focus();
  };

  /** Effects */
  useEffect(() => {
    onSearch(searchInput);
    const hasSearchInput = searchInput.length > 0;

    if (hasSearchInput && !isSearchActive) {
      dispatch(setIsSearchActive(true));
    } else if (!hasSearchInput && isSearchActive) {
      dispatch(setIsSearchActive(false));
    }
  }, [searchInput, onSearch, dispatch, isSearchActive]);

  useEffect(() => {
    // Clear input
    if (!isSearchActive) {
      clearSearchInput();
    }
    // Hard reset
    if (resetSearchInput) {
      clearSearchInput();
      getIsSearchBoxExpanded(false);
      dispatch(setResetSearchInput(false));
    }
  }, [isSearchActive, resetSearchInput, dispatch, getIsSearchBoxExpanded]);

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
