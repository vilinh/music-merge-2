import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCirclePlus,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import "./searchResult.css";

export const SearchResult = ({ song, idx }) => {
  const [hoverSearchResult, setHoverSearchResult] = useState(false);
  const [added, setAdded] = useState(false);
  const handleMouseOver = () => {
    setHoverSearchResult(true);
  };
  const handleMouseOut = () => {
    setHoverSearchResult(false);
  };

  const padTo2Digits = (num) => {
    return num.toString().padStart(2, "0");
  };
  const convertMsToTime = (milliseconds) => {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    minutes = minutes % 60;
    return `${minutes}:${padTo2Digits(seconds)}`;
  };

  return (
    <div
      className="searchResult"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <span className="num">{idx + 1}</span>
      <div className="song">
        <img src={song.album.images[1].url} />
        <div className="song-info">
          <span className="title">{song.name}</span>
          <span className="artist">{song.artists[0].name}</span>
        </div>
      </div>
      <span className="album">{song.album.name}</span>
      <div className="time">
        <span>{convertMsToTime(song.duration_ms)}</span>
        <FontAwesomeIcon
          className={`options ${added ? "added" : ""}`}
          icon={added ? faCheck : faCirclePlus}
        />
        <FontAwesomeIcon icon={faHeart} className={`favorite`} />
      </div>
    </div>
  );
};
