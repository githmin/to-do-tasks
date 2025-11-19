import axios from "axios";

const AxiosConfig = axios.create({
  baseURL: "/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosConfig;
