import { API_LISTINGS } from "../../constants.js";

export async function getListings({
  page = 1,
  limit = 12,
  tag = "",
  active = true,
  sort = "",
  sortOrder = "",
} = {}) {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      _bids: "true",
      _seller: "true",
    });

    if (active) params.append("_active", "true");
    if (tag) params.append("_tag", tag);
    if (sort) params.append("sort", sort);
    if (sortOrder) params.append("sortOrder", sortOrder);

    const response = await fetch(`${API_LISTINGS}?${params}`);

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
