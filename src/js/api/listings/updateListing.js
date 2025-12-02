import { API_LISTINGS, API_KEY } from "../constants.js";
import { getToken } from "../../storage/localStorage.js";

export async function updateListing(listingId, listingData) {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("You must be logged in to update a listing");
    }

    const response = await fetch(`${API_LISTINGS}/${listingId}`, {
      method: "PUT",
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
        `Failed to update listing: ${response.status}`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating listing:", error);
    throw error;
  }
}
