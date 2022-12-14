import React, { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { getSpotifyTokens } from "../../utils/spotify";
import { DashHome } from "../DashHome/DashHome";
import { Nav } from "../Nav/Nav";
import "./dashBoard.css";
import axios from "axios";
import { DashBrowse } from "../DashBrowse/DashBrowse";
import { Merge } from "../Merge/Merge";
import { MergeProvider } from "../../context/MergeContext";
import { DashArtists } from "../DashArtists/DashArtists";
import { Account } from "../Account/Account";
import { EditProfile } from "../EditProfile/EditProfile";

export const Dashboard = () => {
  const [activeView, setActiveView] = useState("home");
  const [spotifyToken, setSpotifyToken] = useState(null);

  useEffect(() => {
    const getSpotifyToken = async () => {
      const token = await getSpotifyTokens();
      setSpotifyToken(token);
    };
    getSpotifyToken();
  }, []);

  return (
    <MergeProvider>
      <div className="dashboard">
        {spotifyToken ? (
          <>
            <div className="dashboard-main">
              <div className="dashboard-nav">
                <Nav activeView={activeView} setActiveView={setActiveView} />
              </div>
              <div className="dashboard-right">
                {activeView === "home" ? <DashHome /> : <></>}
                {activeView === "browse" ? <DashBrowse /> : <></>}
                {activeView === "merge" ? <Merge /> : <></>}
                {activeView === "artists" ? <DashArtists /> : <></>}
                {activeView === "account" ? <Account /> : <></>}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="spotify-login">
              <a href={`${process.env.REACT_APP_SERVER}/spotify/spotify-login`}>
                <button>connect to spotify</button>
              </a>
              <span>connect with spotify to use music merge</span>
            </div>
          </>
        )}
      </div>
    </MergeProvider>
  );
};
