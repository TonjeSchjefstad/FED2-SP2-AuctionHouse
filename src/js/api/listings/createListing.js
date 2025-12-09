import { API_LISTINGS, API_KEY } from "../constants.js";
import { getToken } from "../../storage/localStorage.js";

/**
 * Create a new listing with the provided details.
 * @param {object} listingData - the details for the new listing
 * @param {string} listingData.title - the title of the listing.
 * @param {string} listingData.description - the description of the listing.
 * @param {Array<Object>} listingData.media - Array of media objects with url.
 * @param {Array<string>} [listingData.tags] - Optional array of category tags.
 * @param {string} listingData.endsAt - The auction end date in ISO format.
 * @returns {Promise<object>} - the response data from the create listing API.
 * @throws {Error} - will throw an error if the creation fails.
 */

export async function createListing(listingData) {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("You must be logged in to create a listing");
    }

    const response = await fetch(API_LISTINGS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify(listingData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.errors?.[0]?.message ||
        `Failed to create listing: ${response.status}`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating listing:", error);
    throw error;
  }
}
