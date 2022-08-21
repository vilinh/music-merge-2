import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getFollowedArtists } from "../../utils/spotify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./dashArtists.css";
import { ArtistCard } from "../ArtistCard/ArtistCard";
import { Artist } from "../Artist/Artist";

export const DashArtists = () => {
  const [artists, setArtists] = useState(null);
  const [clickedArtist, setClickedArtist] = useState(null);

  useEffect(() => {
    const getArtists = async () => {
      const res = await getFollowedArtists();
      setArtists(res.data.artists.items)
    };
    getArtists();
  }, []);

  useEffect(() => {
    console.log(clickedArtist)
  }, [clickedArtist])

  return (
    <>
      <div className="dashArtists">
        <h3>Artists</h3>
        <div className="artists">
          {artists ? (
            artists.map((artist) => (
              <ArtistCard
                setClickedArtist={setClickedArtist}
                key={artist.id}
                artist={artist}
              />
            ))
          ) : (
            <div className="load">
              <FontAwesomeIcon className="loader fa-spin" icon={faSpinner} />
            </div>
          )}
        </div>
      </div>
      {clickedArtist !== null && (
        <div className="artist-modal">
          <Artist
            artist={clickedArtist}
            setClickedArtist={setClickedArtist}
          />
        </div>
      )}
    </>
  );
};
