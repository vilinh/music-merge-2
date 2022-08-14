import React, { useState } from "react";
import { useEffect } from "react";
import { SongCard } from "../SongCard/SongCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { getPlaylist } from "../../utils/spotify";

export const SongsPreview = ({ playlistId }) => {
  const [playlist, setPlaylist] = useState();

  useEffect(() => {
    
  }, []);

  return (
    <div className="songsPreview">
      {playlist ? (
        <>
          <div className="header">
            <h3>{playlist && playlist.name}</h3>
            <span>See All</span>
          </div>
          <div className="songs">
            {playlist &&
              playlist.tracks.items
                .slice(0, 5)
                .map((item) => (
                  <SongCard key={item.track.name} song={item.track} />
                ))}
          </div>
        </>
      ) : (
        <FontAwesomeIcon className="loader fa-spin" icon={faSpinner} />
      )}
    </div>
  );
};
