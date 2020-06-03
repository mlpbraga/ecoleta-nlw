import axios from 'axios';
const baseUrl = 'http://localhost:3377';

const api = axios.create({
  baseURL: baseUrl,
})

export default api;
