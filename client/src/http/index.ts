import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

http.defaults.withCredentials = true;

export default http;
