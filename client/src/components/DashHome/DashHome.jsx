import React from "react";
import { Playlist } from "../Playlist/Playlist";
import { SongsPreview } from "../SongsPreview/SongsPreview";
import "./dashHome.css";

export const DashHome = () => {
  return (
    <div className="dashHome">
      <div className="tabs">
        <div className="selectedTab">Music</div>
        <span>Podcast</span>
        <span>Live</span>
        <span>Radio</span>
      </div>
      <div className="body">
        <div className="left-panel">
          <SongsPreview
            className="songsPreview"
            playlistId={"37i9dQZF1DWWvmOXYvR5a6"}
          ></SongsPreview>
          <SongsPreview
            className="songsPreview"
            playlistId={"37i9dQZF1EVJSvZp5AOML2"}
          ></SongsPreview>
          <Playlist />
        </div>
      </div>
    </div>
  );
};
