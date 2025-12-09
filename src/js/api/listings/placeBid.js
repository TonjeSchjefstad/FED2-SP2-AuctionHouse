import { API_LISTINGS, API_KEY } from "../constants.js";
import { getToken } from "../../storage/localStorage.js";

/**
 * Place a bid on a listing.
 * @param {string} listingId - the ID of the listing to place a bid on.
 * @param {number} amount - the bid amount in credits.
 * @returns {Promise<object>} - the response data from the place bid API.
 * @throws {Error} - will throw an error if the bid placement fails.
 */

export async function placeBid(listingId, amount) {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("You must be logged in to place a bid");
    }

    const url = `${API_LISTINGS}/${listingId}/bids`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify({ amount }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.errors?.[0]?.message ||
        `Failed to place bid: ${response.status}`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Error placing bid:", error);
    throw error;
  }
}
