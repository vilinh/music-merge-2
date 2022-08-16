import React, { useState } from "react";
import { useEffect } from "react";
import { SongCard } from "../SongCard/SongCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { getPlaylist } from "../../utils/spotify";
import './songsPreview.css';

export const SongsPreview = ({ playlistId }) => {
  const [tracks, setTracks] = useState([]);
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const getPlaylistData = async (playlistId) => {
      const playlistData = await getPlaylist(playlistId)
      setPlaylist(playlistData.data)
      setTracks(playlistData.data.tracks.items.slice(0,5))
    }
    getPlaylistData(playlistId)
  }, [playlistId]);

  return (
    <div className="songsPreview">
      {playlist ? (
        <>
          <div className="header">
            <h3>{playlist && playlist.name}</h3>
            <span>See All</span>
          </div>
          <div className="songs">
            {tracks &&
                tracks.map((item) => (
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
