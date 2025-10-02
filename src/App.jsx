import { useEffect, useState } from "react";
import StreamList from "./components/StreamList";
import "./index.css";

const streamers = [
  "ESL_SC2",
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas"
];

export default function App() {
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    const fetchStreams = async () => {
      const results = await Promise.all(
        streamers.map(async (user) => {
          // Get live status
          const res = await fetch(
            `https://twitch-proxy.freecodecamp.rocks/twitch-api/streams/${user}`
          );
          const data = await res.json();

          if (data.stream) {
            return {
              user,
              isOnline: true,
              game: data.stream.game,
              status: data.stream.channel.status,
              logo: data.stream.channel.logo,
              viewers: data.stream.viewers
            };
          } else {
            // Offline data
            const offlineRes = await fetch(
              `https://twitch-proxy.freecodecamp.rocks/twitch-api/channels/${user}`
            );
            const offlineData = await offlineRes.json();

            return {
              user,
              isOnline: false,
              logo: offlineData.logo || "https://via.placeholder.com/50"
            };
          }
        })
      );

      setStreams(results);
    };

    fetchStreams();
  }, []);

  return (
    <div className="twitch-app">
      <h1>🎮 Twitch Stream Status</h1>
      <StreamList streams={streams} />
    </div>
  );
}
