const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const { google } = require("googleapis");

async function getSavedLinksFromSheet() {
  const SHEET_ID = process.env.VITE_GOOGLE_SHEET_ID;
  const SHEET_NAME = process.env.VITE_GOOGLE_SHEET_NAME || "Sheet1";
  const RANGE = `${SHEET_NAME}!C2:C`; 

  const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGE,
    });

    // Flatten and filter out empty cells
    const links = (response.data.values || [])
      .map((row) => row[0])
      .filter((link) => typeof link === "string" && link.startsWith("http"));

    return links;
  } catch (error) {
    console.error("Error fetching sheet links:", error);
    return [];
  }
}

async function scrapeYouTube(keyword, seenIds = [], pageToken = "") {
  const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=50&q=${encodeURIComponent(
    keyword
  )}&key=${YOUTUBE_API_KEY}${pageToken ? `&pageToken=${pageToken}` : ""}`;

  const res = await fetch(apiUrl);
  const data = await res.json();

  if (!data.items) {
    return {
      videos: [],
      nextPageToken: null,
      error: data.error?.message || "No results from YouTube API",
    };
  }

  const savedLinks = await getSavedLinksFromSheet();

  const filteredVideos = data.items
    .filter((item) => !seenIds.includes(item.id.videoId))
    .slice(0, 21)
    .map((item) => ({
      title: item.snippet.title,
      link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      videoId: item.id.videoId,
      channel_link: `https://www.youtube.com/channel/${item.snippet.channelId}`,
      channel_name: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.high.url,
      source: "YouTube",
      email: null,
      saved: savedLinks.includes(item.videoId),
    }));

  while (filteredVideos.length < 21) {
    filteredVideos.push({
      title: "No more results",
      link: null,
      videoId: null,
      channel_link: null,
      channel_name: null,
      thumbnail: null,
      source: "YouTube",
      email: null,
      error: "No more results available",
    });
  }

  return { videos: filteredVideos, nextPageToken: data.nextPageToken || null };
}

async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { keyword } = JSON.parse(event.body || "{}");
    if (!keyword) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No keyword provided" }),
      };
    }
    const seenIds = [];
    let pageToken = "";
    if (
      event.queryStringParameters &&
      typeof event.queryStringParameters.page === "string"
    ) {
      pageToken = event.queryStringParameters.page;
    }
    const { videos, nextPageToken, error } = await scrapeYouTube(
      keyword,
      seenIds,
      pageToken
    );

    return {
      statusCode: error ? 500 : 200,
      body: JSON.stringify({ videos, nextPageToken }),
      headers: { "Content-Type": "application/json" },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || "Server error" }),
      headers: { "Content-Type": "application/json" },
    };
  }
}

module.exports.handler = handler;
