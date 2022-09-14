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
  console.log(data.access_token);

  // await axios.post('/spotify/tokens', {
  //   accessToken: data.access_token
  // })

  console.log("refresh attempted");
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

  if (hasTokenExpired(timeStamp, expiresIn) || !accessToken) {
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
  return base.get(`/playlists/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getRecentlyPlayed = async () => {
  const accessToken = await getSpotifyTokens();
  return base.get(`/me/player/recently-played`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const searchSpotify = async (entry) => {
  const accessToken = await getSpotifyTokens();
  return base.get(`/search?q=${entry}&type=track`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getSpotifyPlaylists = async () => {
  const accessToken = await getSpotifyTokens();
  return base.get(`/me/playlists?limit=20`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const addSongstoPlaylist = async (songs, playlistId) => {
  const accessToken = await getSpotifyTokens();
  base.defaults.headers.Authorization = `Bearer ${accessToken}`;
  return base.post(`/playlists/${playlistId}/tracks?uris=${songs}`);
};

export const getFollowedArtists = async () => {
  const accessToken = await getSpotifyTokens();
  return base.get(`/me/following?type=artist`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getArtistTopTracks = async (artistId) => {
  const accessToken = await getSpotifyTokens();
  return base.get(`/artists/${artistId}/top-tracks?market=US`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
