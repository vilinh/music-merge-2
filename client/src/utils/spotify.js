import axios from "axios";

const hasTokenExpired = (timeStamp, expiresIn) => {
  const time = new Date(timeStamp);
  const timeElapsed = Date.now() - time.getTime();
  return timeElapsed / 1000 > Number(expiresIn);
};

const refreshTokens = async (refreshToken) => {
  const { data } = await axios.get(
    `/spotify/refresh_token?refresh_token=${refreshToken}`
  );

  window.location.reload();
};

export const getSpotifyTokens = async () => {
  const { data } = await axios.get("/spotify/tokens", {
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  });
  const { accessToken, refreshToken, expiresIn, timeStamp } = data;

  // if (hasTokenExpired(timeStamp, expiresIn) || !accessToken) {
  //   await refreshTokens(refreshToken);
  // }
  return accessToken;
};

const base = axios.create({
  baseURL: "https://api.spotify.com/v1",
});
base.defaults.headers["Content-Type"] = "application/json";

export const getPlaylist = async (playlistId) => {
  const accessToken = await getSpotifyTokens();
  console.log(accessToken)
  return base.get(`/playlists/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
