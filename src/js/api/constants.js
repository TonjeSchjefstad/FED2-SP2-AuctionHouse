export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_KEY = import.meta.env.VITE_API_KEY;

export const API_AUTH = `${API_BASE_URL}/auth`;

export const API_AUTH_LOGIN = `${API_AUTH}/login`;

export const API_AUTH_REGISTER = `${API_AUTH}/register`;

export const API_AUTH_KEY = `${API_AUTH}/create-api-key`;

export const API_AUCTION = `${API_BASE_URL}/auction`;

export const API_LISTINGS = `${API_AUCTION}/listings`;

export const API_PROFILES = `${API_AUCTION}/profiles`;

if (!API_KEY) {
  console.error("⚠️ VITE_API_KEY is not defined. Please check your .env file.");
}
