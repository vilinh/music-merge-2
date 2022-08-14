import axios from "axios";

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

