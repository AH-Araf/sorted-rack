import axios from "axios";
import { apiURL } from "../Utility/api";

const axiosSecure = axios.create({
  baseURL: apiURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

const axiosOpen = axios.create({
  //  process.env.REACT_APP_BASE_URL,
  baseURL: apiURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});



export { axiosSecure, axiosOpen }; 