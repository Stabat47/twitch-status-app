import StreamCard from "./StreamCard";

export default function StreamList({ streams }) {
  if (!streams.length) {
    return <p className="loading">Loading streams...</p>;
  }

  return (
    <div className="stream-list">
      {streams.map((stream) => (
        <StreamCard key={stream.user} stream={stream} />
      ))}
    </div>
  );
}
