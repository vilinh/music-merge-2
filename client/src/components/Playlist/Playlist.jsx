import React from "react";
import "./playlist.css";
import { useEffect } from "react";
import { useState } from "react";
import { PlaylistSong } from "../PlaylistSong/PlaylistSong";
import { getRecentlyPlayed } from "../../utils/spotify";

export const Playlist = () => {
  const [playlist, setPlaylist] = useState();

  useEffect(() => {
    const getRecPlayed = async () => {
      const recent = await getRecentlyPlayed();
      setPlaylist(recent.data.items.slice(0,5))
    };
    getRecPlayed()
  }, []);

  return (
    <div className="playlist">
      <div className="header">
        <h3>Recently Played</h3>
        <span>See All</span>
      </div>
      <div className="songs">
        {playlist &&
          playlist.map((song, i) => (
            <PlaylistSong key={i} idx={i} song={song.track} />
          ))}
      </div>
    </div>
  );
};
