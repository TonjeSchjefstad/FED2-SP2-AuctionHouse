import { API_BASE, API_KEY } from "../constants.js";
import { getToken } from "../../storage/localStorage.js";

const API_PROFILES = `${API_BASE}/auction/profiles`;

export async function getProfile(
  name,
  includeListings = true,
  includeWins = true,
) {
  try {
    let url = `${API_PROFILES}/${name}`;
    const params = [];

    if (includeListings) params.push("_listings=true");
    if (includeWins) params.push("_wins=true");

    if (params.length > 0) {
      url += `?${params.join("&")}`;
    }

    const token = getToken();
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
      headers["X-Noroff-API-Key"] = API_KEY;
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.errors?.[0]?.message ||
        `Failed to fetch profile: ${response.status}`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
}
