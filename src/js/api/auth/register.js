import { API_AUTH_REGISTER } from "../constants";

/**
 * Register a new user with given details.
 * @param {object} userDetails - the user registration details
 * @param {string} userDetails.username - the desired username.
 * @param {string} userDetails.email - the users email address.
 * @param {string} userDetails.password - the users password.
 * @returns {Promise<object>} - the response data from the registration API.
 * @throws {Error} - will throw an error if the registration fails.
 */

export async function registerUser(userDetails) {
  try {
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(API_AUTH_REGISTER, fetchOptions);
    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.errors?.[0]?.message ||
        `Failed to register user: ${response.status}`;
      throw new Error(errorMessage);
    }
    return await response.json();
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}
