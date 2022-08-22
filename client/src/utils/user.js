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

export const updateEmail = (email) => {
  axios
    .put(`http://localhost:8800/api/users/${localStorage.getItem("id")}`, {
      email: email,
    })
    .then(() => {
      console.log("email updated");
    })
    .catch((err) => console.log(err));
};
