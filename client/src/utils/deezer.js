import axios from "axios";

export const fetchPlaylist = async (parsedID) => {
  const songs = await axios.get(`/deezer/search/${parsedID}`);
  return songs.data.data;
};
