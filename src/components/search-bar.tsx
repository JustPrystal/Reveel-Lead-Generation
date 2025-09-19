export default function  SearchBar({
  handleSearch,
  query,
  setQuery,
  small = false,
}: {
  handleSearch: (e: React.FormEvent) => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  small?: boolean;
}) {
  return (
    <form onSubmit={handleSearch} className={`search-bar ${small ? "sm" : ""}`}>
      <input
        type="text"
        className={`search-bar-field`}
        placeholder="Search YouTube..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="search-bar-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19px"
          height="19px"
          viewBox="-2.4 -2.4 28.80 28.80"
          fill="none"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0" />

          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
              stroke="#fff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />{" "}
          </g>
        </svg>
      </button>
    </form>
  );
}
