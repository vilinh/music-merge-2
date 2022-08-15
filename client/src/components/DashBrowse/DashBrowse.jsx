import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { SearchResult } from "../searchResult/SearchResult";
import "./dashBrowse.css";
import { searchSpotify } from "../../utils/spotify"

export const DashBrowse = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setSearch(localStorage.getItem("searchBar") || "");
  }, []);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    const searchSong = async () => {
        const results = await searchSpotify(search)
        console.log(results.data.tracks.items)
        setSearchResults(results.data.tracks.items)
    }
    searchSong()
  }, [search]);

  return (
    <div className="dashBrowse">
      <input
        type="text"
        placeholder="search"
        className="search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          localStorage.setItem("searchBar", e.target.value);
        }}
      />
      <div className="filters">
        <button>all</button>
        <button>artists</button>
        <button>songs</button>
        <button>playlists</button>
      </div>
      <div className="header">
        <span className="num">#</span>
        <span className="title">Title</span>
        <span className="album">Album</span>
        <span className="time">Time</span>
      </div>
      <hr></hr>
      <div className="songs">
        {searchResults &&
          searchResults.map((track, i) => (
            <SearchResult song={track} idx={i} key={track.id} />
          ))}
      </div>
    </div>
  );
};
