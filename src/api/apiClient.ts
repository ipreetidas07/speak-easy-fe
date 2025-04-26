import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5022",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default apiClient;
