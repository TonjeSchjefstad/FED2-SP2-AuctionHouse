import { API_AUTH_LOGIN } from "../constants.js";
import { postRequest } from "../apiUtils.js";

/**
 * Authenticate user with given credentials.
 * @param {object} credentials  - the user login credentials
 * @param {string} credentials.email - the users email address.
 * @param {string} credentials.password - the users password.
 * @returns {Promise<object>} - the response data from the login API.
 * @throws {Error} - will throw an error if the login fails.
 */

export async function loginUser(credentials) {
  return await postRequest(API_AUTH_LOGIN, credentials);
}
