import React from "react";
import "./songCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export const SongCard = ({song}) => {
  const [options, setOptions] = useState(false);
  const [added, setAdded] = useState(false);

  return (
    <div
      className="songCard"
      onMouseOver={() => setOptions(true)}
      onMouseLeave={() => setOptions(false)}
    >
      <img src={song.album.images[1].url} alt=""></img>
      <span className="title">{song.name}</span>
      <span className="artist">{song.artists[0].name}</span>
      <div className={`option-menu ` + (options ? "show" : "")}>
        <FontAwesomeIcon icon={added ? faCheck : faCirclePlus} />
      </div>
    </div>
  );
};
