import axios from "axios";

const api = axios.create({
  baseURL: "https://omnistack10-backend.herokuapp.com"
});

export default api;
