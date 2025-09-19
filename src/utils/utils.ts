import type { Video } from "../types/globalTypes";

export async function saveToSheets(video: Video) {
  const response = await fetch("/.netlify/functions/saveToSheets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ video }),
  });
  const data = await response.json();
  return data;
}
