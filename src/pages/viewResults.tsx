import { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import SearchBar from "../components/search-bar";
import { handleSearch as handleSearchUtil } from "../utils/handleSearch";
import type { Result } from "../types/globalTypes";
import VideoGrid from "../components/video-grid";
import GlobalLoader from "../components/global-loader";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import Tracker from "../components/tracker";

export default function ViewResults() {
  const [input, setInput] = useState<string>("");
  const [results, setResults] = useState<Result>({
    videos: [],
    nextPageToken: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<string>("");
  const [pageTokens, setPageTokens] = useState<string[]>([""]);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      setPage("");
      setPageTokens([""]);
      handleSearchUtil(query, setLoading, setResults, page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (query) {
      handleSearchUtil(query, setLoading, setResults, page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const nextPageToken = results?.nextPageToken || "";

  const handleNext = () => {
    if (nextPageToken) {
      setPageTokens([...pageTokens, nextPageToken]);
      setPage(nextPageToken);
    }
  };

  const handlePrev = () => {
    if (pageTokens.length > 1) {
      const newTokens = pageTokens.slice(0, -1);
      setPageTokens(newTokens);
      setPage(newTokens[newTokens.length - 1] || "");
    }
  };

  return (
    <>
      {query && loading && <GlobalLoader loading={loading} />}
      {!loading && (
        <div className="view-results-page">
          <div className="main-view">
            <div className="top-bar">
              <NavLink to="/" className="image-wrap">
                <img src={logo} alt="Reveel Logo" />
              </NavLink>
              <SearchBar
                handleSearch={(e) => {
                  e.preventDefault();
                  navigate(`/search?query=${encodeURIComponent(query.trim())}`);
                }}
                query={input}
                setQuery={setInput}
                small={true}
              />
            </div>
            <div className="cards-grid" style={{ position: "relative" }}>
              <VideoGrid results={results.videos || []} loading={loading} />
            </div>
          </div>
          <div className="side-bar">
            <Tracker />
            <div className="btn-wrap">
              <button
                className="next btn"
                onClick={handleNext}
                disabled={!nextPageToken}
              >
                Next
              </button>
              <button
                className="prev btn"
                onClick={handlePrev}
                disabled={pageTokens.length <= 1}
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
