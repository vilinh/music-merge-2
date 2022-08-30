import axios from "axios";
import { removeSpotifyTokens } from "./spotify";

export const login = (username, password) => {
  return axios.post("/spotify/login", {
    username,
    password,
  });
};

export const register = (username, password, email) => {
  return axios.post("/register", {
    username,
    password,
    email,
  });
};

export const updateEmail = (email) => {
  axios
    .put(
      `http://localhost:8800/user/email`,
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      },
      {
        email: email,
      }
    )
    .then(() => {
      console.log("email updated");
    })
    .catch((err) => console.log(err));
};

export const getUserId = async () => {
  const { data } = await axios.get(`http://localhost:8800/user/info`, {
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  });
  return data._id
};

export const getUserName = async () => {
  const { data } = await axios.get(`http://localhost:8800/user/info`, {
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  });
  return data.username
};

export const getEmail = async () => {
  const { data } = await axios.get(`http://localhost:8800/user/info`, {
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  });
  return data.email
};

