import React from "react";
import "./merge.css";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FaRegTrashAlt } from "react-icons/fa";

import {
  addSongstoPlaylist,
  getSpotifyPlaylists,
  searchSpotify,
} from "../../utils/spotify";
import "./merge.css";
import { fetchPlaylist } from "../../utils/deezer";
import { PageNotif } from "../pageNotif/PageNotif";
import { TempSong } from "../tempSong/TempSong";
import { MergeContext, MergeProvider } from "../../context/MergeContext";

export const Merge = () => {
  const [user, setUser] = useState("");
  const [playlistID, setPlaylistID] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [spotifyPlaylistID, setSpotifyPlaylistID] = useState("");
  const [spotifyPlaylists, setSpotifyPlaylists] = useState([]);
  const [disable, setDisable] = useState(true);
  const [remove, setRemove] = useState(false);
  const [removeID, setRemoveID] = useState(null);
  const [addNotif, setAddNotif] = useState(false);
  const [errNotif, setErrNotif] = useState(false);

  const { addSongtoMerge, removeSongFromMerge, clearMerge, mergeList } =
    useContext(MergeContext);

  useEffect(() => {
    const getUserPlaylists = async () => {
      const playlists = await getSpotifyPlaylists();
      console.log(playlists.data.items);
      setSpotifyPlaylists(playlists.data.items);
    };
    getUserPlaylists();
  }, []);

  useEffect(() => {
    if (!playlistID || !spotifyPlaylistID) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [playlistID, spotifyPlaylistID]);

  useEffect(() => {
    if (remove) {
      setRemove(false);
      removeSongFromMerge(removeID);
    }
  }, [remove]);

  useEffect(() => {
    const searchSpotifyforDeezer = async () => {
      playlist.forEach(async (track) => {
        await searchSpotify(track.title).then((res) => {
          addSongtoMerge(res.data.tracks.items[0]);
        });
      });
      console.log(mergeList);
    };
    searchSpotifyforDeezer();
  }, [playlist]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAddNotif(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [addNotif]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrNotif(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [errNotif]);

  const handleSearch = () => {
    if (!playlistID) return;
    let parsedID = playlistID.split("/").at(-1);
    const getDeezerSongs = async () => {
      const deezerSongs = await fetchPlaylist(parsedID);
      setPlaylist(deezerSongs);
    };
    getDeezerSongs();
    console.log(playlist);
    setPlaylistID("");
  };

  const handleSelect = (event) => {
    setSpotifyPlaylistID(event.target.value);
  };

  const addToSpotify = async (songs) => {
    let trackIDs = mergeList.map((song) => `spotify:track:${song.id}`);
    console.log(spotifyPlaylistID);
    await addSongstoPlaylist(trackIDs, spotifyPlaylistID)
      .then(() => {
        setAddNotif(true);
        clearMerge();
        setSpotifyPlaylistID("");
        setPlaylistID("");
      })
      .catch((err) => setErrNotif(true));
  };

  return (
    <div className="merge">
      <h3>Merge</h3>
      <div className="merge-info">
        <input
          type="text"
          value={playlistID}
          onChange={(e) => {
            setPlaylistID(e.target.value);
          }}
          placeholder="Deezer Playlist Link"
        />
        {spotifyPlaylists && (
          <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
            <InputLabel id="demo-select-small">Spotify Playlist</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={spotifyPlaylistID}
              label="Spotify Playlist"
              onChange={handleSelect}
            >
              {spotifyPlaylists.map((playlist) => (
                <MenuItem id={playlist.id} value={playlist.id}>
                  {playlist.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <button
          disabled={disable}
          className={`search ${disable ? "disabled" : ""}`}
          onClick={handleSearch}
        >
          search
        </button>
      </div>

      <div className="spotifyResults">
        {mergeList.length > 0 ? (
          mergeList.map((song, i) => (
            <TempSong
              key={i}
              song={song}
              setRemove={setRemove}
              setRemoveID={setRemoveID}
            />
          ))
        ) : (
          <p>Enter a link to a deezer playlist to get started!</p>
        )}
      </div>
      <div className="add"></div>
      {mergeList.length > 0 ? (
        <div className="buttons">
          <button
            className={`addToSpotify ${!spotifyPlaylistID ? "disabled" : ""}`}
            onClick={() => addToSpotify()}
          >
            add to <FontAwesomeIcon icon={faSpotify} />
          </button>
          <button className={"clearQueue"} onClick={() => clearMerge()}>
            <FaRegTrashAlt />
          </button>
        </div>
      ) : (
        <></>
      )}
      <PageNotif
        styles={addNotif ? "fadeIn" : "fadeOut"}
        message={"Added to playlist!"}
      />
      <PageNotif
        styles={`err ` + (errNotif ? "fadeIn" : "fadeOut")}
        message={"Error!"}
      />
    </div>
  );
};
