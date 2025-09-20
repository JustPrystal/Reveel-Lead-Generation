import { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import logo from "../assets/images/logo.png";
import SearchBar from "../components/search-bar";
import VideoGrid from "../components/video-grid";
import GlobalLoader from "../components/global-loader";
import Tracker from "../components/tracker";
import { handleSearch as handleSearchUtil } from "../utils/handleSearch";
import { globalCache } from "../utils/globalCache";
import type { Result } from "../types/globalTypes";

export default function ViewResults() {
  const [searchResults, setSearchResults] = useState<Result>({
    videos: [],
    nextPageToken: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [cacheRefreshing, setCacheRefreshing] = useState(false); // 👈 new
  const [paginationStack, setPaginationStack] = useState<string[]>([""]);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const currentPageToken = paginationStack[paginationStack.length - 1];
  const nextPageToken = searchResults?.nextPageToken || "";

  const cacheKey = `${searchQuery}_${currentPageToken}`;

  useEffect(() => {
    if (!searchQuery) return;

    if (globalCache.has(cacheKey)) {
      const cachedResult = globalCache.get(cacheKey);
      if (cachedResult) {
        setSearchResults(cachedResult);
        return;
      }
    }

    setIsLoading(true);
    handleSearchUtil(
      searchQuery,
      setIsLoading,
      (data: Result) => {
        setSearchResults(data);
        globalCache.set(cacheKey, data);
      },
      currentPageToken
    );
  }, [searchQuery, currentPageToken]);

  // Reset pagination when query changes
  useEffect(() => {
    setPaginationStack([""]);
  }, [searchQuery]);

  return (
    <>
      {searchQuery && isLoading && <GlobalLoader loading={isLoading} />}
      {!isLoading && (
        <div className="view-results-page">
          <div className="main-view">
            <div className="top-bar">
              <NavLink to="/" className="image-wrap">
                <img src={logo} alt="Reveel Logo" />
              </NavLink>
              <SearchBar
                handleSearch={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    setSearchParams({ query: searchQuery.trim() });
                  }
                }}
                query={searchQuery}
                setQuery={() => {}}
                small
              />
            </div>
            <div className="cards-grid" style={{ position: "relative" }}>
              <VideoGrid
                results={searchResults.videos || []}
                loading={isLoading || cacheRefreshing} // 👈 merged
                cacheKey={cacheKey}
                setCacheRefreshing={setCacheRefreshing} // 👈 passed
              />
            </div>
          </div>
          <div className="side-bar">
            <Tracker />
            <div className="btn-wrap">
              <button
                className="next btn"
                onClick={() =>
                  setPaginationStack((prev) => [...prev, nextPageToken])
                }
                disabled={!nextPageToken}
              >
                Next
              </button>
              <button
                className="prev btn"
                onClick={() => setPaginationStack((prev) => prev.slice(0, -1))}
                disabled={paginationStack.length <= 1}
              >
                Previous
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
