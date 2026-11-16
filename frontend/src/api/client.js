import axios from 'axios';

// The session lives in an httpOnly cookie set by the API.
// withCredentials makes the browser send it (and accept it) on cross-origin requests.
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

export function getErrorMessage(error) {
  const data = error?.response?.data;
  if (data?.errors) return Object.values(data.errors).join('. ');
  if (data?.message) return data.message;
  if (error?.request) return 'Unable to reach the server';
  return 'Something went wrong';
}
