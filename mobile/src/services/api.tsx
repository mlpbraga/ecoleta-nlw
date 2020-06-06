import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
// const baseUrl = 'http://localhost:3377';
const baseUrl = 'http://192.168.15.6:3377';

const api = axios.create({
  baseURL: baseUrl,
})

export default api;
