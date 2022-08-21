import React from "react";
import "./playlistSong.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faCirclePlus,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useContext } from "react";
import { MergeContext } from "../../context/MergeContext";

export const PlaylistSong = ({ song, idx }) => {
  const [added, setAdded] = useState(false);

  const { addSongtoMerge, removeSongFromMerge, mergeList } =
    useContext(MergeContext);

  useState(() => {
    mergeList.map((element) => element.id).includes(song.id) && setAdded(true);
  }, []);

  return (
    <div className="playlistSong">
      <div className="left">
        <span id="num">{idx + 1 || "*"}</span>
        <img src={song.album.images[2].url} />
        <div className="info">
          <span className="title">{song.name}</span>
          <span className="artist">{song.artists[0].name}</span>
        </div>
      </div>
      <div className="right">
        <span id="time">3:00</span>
        <FontAwesomeIcon id="play" icon={faCirclePlay} />
        <FontAwesomeIcon
          id="add"
          onClick={() => {
            added ? removeSongFromMerge(song.id) : addSongtoMerge(song);
            setAdded(!added);
          }}
          icon={added ? faCheck : faCirclePlus}
        />
      </div>
    </div>
  );
};
