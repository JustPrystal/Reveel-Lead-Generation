import type { Video } from "../types/globalTypes";
import { saveToSheets } from "../utils/utils";



export default function VideoGrid({
  results,
  loading,
}: {
  results: Video[];
  loading: boolean;
}) {



  return loading
    ? Array.from({ length: 20 }).map((_, idx: number) => (
        <div key={idx} className="card skeleton"></div>
      ))
    : (Array.isArray(results) ? results : []).map(
        (video: Video, idx: number) => (
          <div key={idx}>
            <div
              className={`card ${video.saved ? "saved" : ""}`}
              style={{ backgroundImage: `url(${video.thumbnail})` }}
            >
              <div className="overlay">
                <div className="save-btn" onClick={() => saveToSheets(video)}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M12.89 5.87891H5.11C3.4 5.87891 2 7.27891 2 8.98891V20.3489C2 21.7989 3.04 22.4189 4.31 21.7089L8.24 19.5189C8.66 19.2889 9.34 19.2889 9.75 19.5189L13.68 21.7089C14.96 22.4089 16 21.7989 16 20.3489V8.98891C16 7.27891 14.6 5.87891 12.89 5.87891Z"
                        fill="#292D32"
                      ></path>{" "}
                      <path
                        d="M21.9998 5.11V16.47C21.9998 17.92 20.9598 18.53 19.6898 17.83L17.7598 16.75C17.5998 16.66 17.4998 16.49 17.4998 16.31V8.99C17.4998 6.45 15.4298 4.38 12.8898 4.38H8.81984C8.44984 4.38 8.18984 3.99 8.35984 3.67C8.87984 2.68 9.91984 2 11.1098 2H18.8898C20.5998 2 21.9998 3.4 21.9998 5.11Z"
                        fill="#292D32"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
                <h3 className="title"><a href={video.link} target="_blank" rel="noreferrer">{video.title}</a></h3>
                <p className="meta">Source: {video.source}</p>
                {video.email && <p className="email">📧 {video.email}</p>}
                <p className="author">
                  Author:{" "}
                  <span>
                    <a
                      href={video.channel_link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {video.channel_name || "Unknown"}
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </div>
        )
      );
}
