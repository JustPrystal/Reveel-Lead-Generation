import type { Result } from "../types/globalTypes";

export async function handleSearch(
  query: string,
  setLoading: (loading: boolean) => void,
  setResults: (results: Result) => void,
  page?: string | null
) {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return;
  setLoading(true);
  setResults({ videos: [], nextPageToken: "" });
  try {
    let url = "/.netlify/functions/search";
    if (page) {
      url += `?page=${encodeURIComponent(page)}`;
    }
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword: trimmedQuery }),
    });
    const contentType = response.headers.get("content-type");
    if (!response.ok) {
      let errorMsg = "Failed to fetch results";
      if (contentType?.includes("application/json")) {
        const errorData: { error?: string } = await response.json();
        errorMsg = errorData.error || errorMsg;
      } else {
        errorMsg = await response.text();
      }
      setResults({
        videos: [{ error: errorMsg }],
        nextPageToken: "",
      });
      return;
    }
    if (contentType?.includes("application/json")) {
      const data: Result = await response.json();
      setResults(data);
      console.log("raw data:", data);
    } else {
      setResults({
        videos: [{ error: "Unexpected response format" }],
        nextPageToken: "",
      });
    }
  } catch (err) {
    console.error(err);
    setResults({
      videos: [{ error: "Failed to fetch results" }],
      nextPageToken: "",
    });
  } finally {
    setLoading(false);
  }
}
