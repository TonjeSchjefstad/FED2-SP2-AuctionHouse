import { API_AUTH_REGISTER } from "../constants";
import { postRequest } from "../apiUtils.js";

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
  return await postRequest(API_AUTH_REGISTER, userDetails);
}
