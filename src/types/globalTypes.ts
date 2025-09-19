interface Video {
  title?: string;
  link?: string;
  email?: string | null;
  source?: string;
  error?: string;
  channel_link?: string;
  thumbnail?: string;
  channel_name?: string;
  saved?: boolean;
}

interface Result {
  videos: Video[];
  nextPageToken?: string;
}

export type { Result, Video };
