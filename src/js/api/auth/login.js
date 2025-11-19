import { API_AUTH_LOGIN } from "../constants.js";

export async function loginUser(credentials) {
  try {
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(API_AUTH_LOGIN, fetchOptions);
    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.errors?.[0]?.message || `Failed to login: ${response.status}`;
      throw new Error(errorMessage);
    }
    return await response.json();
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}
