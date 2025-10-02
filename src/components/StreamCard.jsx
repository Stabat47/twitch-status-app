export default function StreamCard({ stream }) {
  return (
    <div className={`stream-card ${stream.isOnline ? "online" : "offline"}`}>
      <img
        src={stream.logo}
        alt={`${stream.user} logo`}
        className="stream-logo"
      />
      <div className="stream-info">
        <a
          href={`https://www.twitch.tv/${stream.user}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {stream.user}
        </a>
        {stream.isOnline ? (
          <span className="status live">
            LIVE — {stream.game}: {stream.status} ({stream.viewers} viewers)
          </span>
        ) : (
          <span className="status">Offline</span>
        )}
      </div>
    </div>
  );
}
