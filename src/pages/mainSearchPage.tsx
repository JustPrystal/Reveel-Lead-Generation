import logo from "../assets/images/logo.png";
import SearchBar from "../components/search-bar";
import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function MainSearchPage() {
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent<Element>) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };


  return (
    <div className="mainSearchPage">
      <div className="inner">
        <div className="search-bar-collage">
          <div className="image-wrap">
            <img src={logo} alt="Reveel Logo" />
          </div>
          <SearchBar
            handleSearch={handleSearch}
            query={query}
            setQuery={setQuery}
          />
        </div>
        <div className="btn-wrap">
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
