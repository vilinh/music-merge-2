import axios from "axios";

const tokenExpired = (timeStamp, expiresIn) => {
  const millisecondsElapsed = Date.now() - Date.parse(timeStamp);
  return (millisecondsElapsed / 1000) > Number(expiresIn);
};

const refreshTokens = async (refreshToken) => {
  const { data } = await axios.get(
    `/spotify/refresh_token?refresh_token=${refreshToken}`
  );
  
  console.log(data)
  // window.location.reload();
};

export const removeSpotifyTokens = async () => {
  await axios
    .delete("/spotify/tokens", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
    .then((res) => {
      console.log("deleted");
    })
    .catch((err) => console.log(err));
};

export const getSpotifyTokens = async () => {
  const { data } = await axios.get("/spotify/tokens", {
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  });
  const { accessToken, refreshToken, expiresIn, timeStamp } = data;

  console.log(refreshToken)

  if (tokenExpired(timeStamp, expiresIn) || !accessToken) {
    await refreshTokens(refreshToken);
  }
  return accessToken;
};

const base = axios.create({
  baseURL: "https://api.spotify.com/v1",
});
base.defaults.headers["Content-Type"] = "application/json";

export const getPlaylist = async (playlistId) => {
  const accessToken = await getSpotifyTokens();

  console.log(accessToken);
  return base.get(`/playlists/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
