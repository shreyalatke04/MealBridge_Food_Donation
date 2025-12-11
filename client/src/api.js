import axios from 'axios';
import io from 'socket.io-client';

// This automatically selects the correct URL (Localhost for you, Cloud for Vercel)
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: BASE_URL,
});

export const socket = io(BASE_URL);