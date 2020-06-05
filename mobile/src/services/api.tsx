import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
const baseUrl = 'http://localhost:3377';

import { API_URL } from 'react-native-dotenv';

const api = axios.create({
  baseURL: API_URL,
})

export default api;
