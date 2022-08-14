const axios = require("axios");

const instance = axios.create({
  baseURL: "https://api.spotify.com/v1",
});
instance.defaults.headers["Content-Type"] = "application/json";

const getCurrentUserProfile = async (accessToken) => {
  return instance.get("/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

exports.getCurrentUserProfile = getCurrentUserProfile;
