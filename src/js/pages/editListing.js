import { getListing } from "../api/listings/getListings.js";
import { updateListing } from "../api/listings/updateListing.js";
import { getUser, getToken } from "../storage/localStorage.js";

const urlParams = new URLSearchParams(window.location.search);
const listingId = urlParams.get("id");

const user = getUser();
const token = getToken();

if (!user || !token) {
  alert("Please sign in to edit a listing.");
  window.location.href = "/";
}

if (!listingId) {
  alert("No listing ID provided.");
  window.location.href = "/profile/";
}

const loadingEl = document.getElementById("loading");
const editContentEl = document.getElementById("edit-content");
const backLink = document.getElementById("back-link");
const form = document.getElementById("edit-listing-form");
const submitBtn = document.getElementById("submit-btn");
const errorMessageEl = document.getElementById("error-message");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const imageUrl1Input = document.getElementById("image-url-1");
const imageUrl2Input = document.getElementById("image-url-2");
const imageUrl3Input = document.getElementById("image-url-3");
const tagsInput = document.getElementById("tags");
const endsAtInput = document.getElementById("endsAt");

function showError(message) {
  errorMessageEl.querySelector("p").textContent = message;
  errorMessageEl.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function hideError() {
  errorMessageEl.classList.add("hidden");
}

function formatDateTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function loadListing() {
  try {
    const { data } = await getListing(listingId);

    if (data.seller.name !== user.name) {
      alert("You can only edit your own listings.");
      window.location.href = `/listings/listing/?id=${listingId}`;
      return;
    }

    loadingEl.classList.add("hidden");
    editContentEl.classList.remove("hidden");

    backLink.href = `/listings/listing/?id=${listingId}`;

    titleInput.value = data.title || "";
    descriptionInput.value = data.description || "";

    if (data.media && data.media.length > 0) {
      imageUrl1Input.value = data.media[0]?.url || "";
      imageUrl2Input.value = data.media[1]?.url || "";
      imageUrl3Input.value = data.media[2]?.url || "";
    }

    if (data.tags && data.tags.length > 0) {
      tagsInput.value = data.tags.join(", ");
    }

    endsAtInput.value = formatDateTime(data.endsAt);

    document.title = `Edit ${data.title} - Maison Ardéne Auction House`;
  } catch (error) {
    loadingEl.classList.add("hidden");
    alert("Failed to load listing: " + error.message);
    window.location.href = "/profile/";
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  hideError();

  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();

  if (!title) {
    showError("Title is required.");
    return;
  }

  const media = [];
  const imageUrls = [
    imageUrl1Input.value.trim(),
    imageUrl2Input.value.trim(),
    imageUrl3Input.value.trim(),
  ];

  imageUrls.forEach((url) => {
    if (url) {
      media.push({ url, alt: "" });
    }
  });

  const tagsValue = tagsInput.value.trim();
  const tags = tagsValue
    ? tagsValue
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag)
    : [];

  const updateData = {
    title,
  };

  if (description) {
    updateData.description = description;
  }

  if (media.length > 0) {
    updateData.media = media;
  }

  if (tags.length > 0) {
    updateData.tags = tags;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Saving...";

  try {
    await updateListing(listingId, updateData);
    alert("Listing updated successfully!");
    window.location.href = `/listings/listing/?id=${listingId}`;
  } catch (error) {
    showError(error.message);
    submitBtn.disabled = false;
    submitBtn.textContent = "Save Changes";
  }
});

loadListing();
