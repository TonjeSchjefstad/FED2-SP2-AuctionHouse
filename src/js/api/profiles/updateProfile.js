import { API_BASE, API_KEY } from "../constants.js";
import { getToken } from "../../storage/localStorage.js";

const API_PROFILES = `${API_BASE}/auction/profiles`;

export async function updateProfile(name, profileData) {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("You must be logged in to update your profile");
    }

    const response = await fetch(`${API_PROFILES}/${name}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.errors?.[0]?.message ||
        `Failed to update profile: ${response.status}`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}
