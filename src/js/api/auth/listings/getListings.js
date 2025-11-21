import { API_LISTINGS } from "../../constants.js";

export async function getListings({
  page = 1,
  limit = 12,
  tag = "",
  active = true,
} = {}) {
  try {
    let url = `${API_LISTINGS}?_seller=true&_bids=true&limit=${limit}&page=${page}`;

    if (active) {
      url += `&_active=true`;
    }

    if (tag) {
      url += `&_tag=${tag}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.errors?.[0]?.message ||
        `Failed to fetch listings: ${response.status}`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching listings:", error);
    throw error;
  }
}

export async function getListing(id) {
  try {
    const url = `${API_LISTINGS}/${id}?_seller=true&_bids=true`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.errors?.[0]?.message ||
        `Failed to fetch listing: ${response.status}`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching listing:", error);
    throw error;
  }
}

export async function searchListings(query) {
  try {
    const url = `${API_LISTINGS}/search?q=${encodeURIComponent(query)}&_seller=true&_bids=true`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.errors?.[0]?.message ||
        `Failed to search listings: ${response.status}`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Error searching listings:", error);
    throw error;
  }
}
