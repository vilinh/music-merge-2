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

export const getSpotifyAccessTokens = async () => {
  const { data } = await axios.get("/spotify/tokens", {
    "x-access-token": localStorage.getItem("token"),
  });
  const { accessToken, refreshToken, expiresIn, timeStamp } = data;
  
  if (hasTokenExpired(timeStamp, expiresIn) || !accessToken) {
    await refreshTokens(refreshToken);
  }
  return accessToken;
};
