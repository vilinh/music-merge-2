import React, { useState } from "react";
import "./artist.css";
import { useEffect } from "react";
import { GrClose } from "react-icons/gr";
import { PlaylistSong } from "../PlaylistSong/PlaylistSong";
import { getArtistTopTracks } from "../../utils/spotify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const Artist = ({ artist, setClickedArtist }) => {
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    const getArtistsTracks = async (artistId) => {
      const res = await getArtistTopTracks(artistId);
      setTopTracks(res.data.tracks);
    };
    getArtistsTracks(artist.id);
  }, [artist.id]);

  return (
    <div className="artist-panel">
      <div className="banner">
        <img src={artist.images[0].url} alt="" />
        <h2>{artist.name}</h2>
      </div>
      <div className="top-tracks">
        {topTracks.length > 0 ? (
          topTracks.map((track) => <PlaylistSong song={track} />)
        ) : (
          <FontAwesomeIcon className="loader fa-spin" icon={faSpinner} />
        )}
      </div>
      <span className="close" onClick={() => setClickedArtist(null)}>
        <GrClose />
      </span>
    </div>
  );
};
