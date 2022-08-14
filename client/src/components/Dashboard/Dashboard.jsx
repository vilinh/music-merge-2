import React, { useEffect } from "react";
import { useState } from "react";
import { getSpotifyAccessTokens } from "../../utils/spotify";
import { DashHome } from "../DashHome/DashHome";
import { Nav } from "../Nav/Nav";
import "./dashBoard.css";

export const Dashboard = () => {
  const [activeView, setActiveView] = useState("home");
  const [spotifyToken, setSpotifyToken] = useState(null);

  useEffect(() => {
    console.log("hello");
  }, []);

  return (
    <div className="dashboard">
      {spotifyToken ? (
        <>
          <div className="dashboard-main">
            <div className="dashboard-nav">
              <Nav activeView={activeView} setActiveView={setActiveView} />
            </div>
            <div className="dashboard-right">
              {activeView === "home" ? <DashHome /> : <></>}
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
  );
};
