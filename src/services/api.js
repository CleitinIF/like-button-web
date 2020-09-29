import axios from 'axios';

const api = axios.create({
  baseURL: window._env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  }
})

export { api }