import { API_LISTINGS, API_KEY } from "../constants.js";
import { getToken } from "../../storage/localStorage.js";

export async function deleteListing(listingId) {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("You must be logged in to delete a listing");
    }

    const response = await fetch(`${API_LISTINGS}/${listingId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.errors?.[0]?.message ||
        `Failed to delete listing: ${response.status}`;
      throw new Error(errorMessage);
    }

    return;
  } catch (error) {
    console.error("Error deleting listing:", error);
    throw error;
  }
}
