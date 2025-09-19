// Mock data for development/demo
const mockRecentEntries = [
  "Video Title 1",
  "Video Title 2",
  "Video Title 3",
  "Video Title 4",
  "Video Title 5"
];

const mockProgress = mockRecentEntries.length;

export default function Tracker({ progress = mockProgress, recentEntries = mockRecentEntries }: { progress?: number, recentEntries?: string[] }) {
    return(
        <div className="progress-tracker">
            <div className="header">
                <h3>Total Entries:</h3>
                <span>{progress}/100</span>
            </div>
            <div className="container">
                <h3>Recent Entries:</h3>
                {recentEntries.map((entry, idx) => (
                    <div key={idx} className="entry">
                        {idx + 1}. {entry}
                    </div>
                ))}
            </div>
        </div>
    )
}