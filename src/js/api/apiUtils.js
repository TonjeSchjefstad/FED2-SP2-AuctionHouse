/**
 * Sends a POST request with JSON body and returns the response data.
 * @param {string} url - the API endpoint URL.
 * @param {object} data - the data to send in the request body.
 * @returns {Promise<object>} - the response data from the API.
 * @throws {Error} - will throw an error if the request fails.
 */

export async function postRequest(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage =
      errorData.errors?.[0]?.message || `Request failed: ${response.status}`;
    throw new Error(errorMessage);
  }

  return await response.json();
}
