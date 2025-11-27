import { createListing } from "../api/auth/listings/createListing.js";
import { getUser, getToken } from "../storage/localStorage.js";
import { showAlert } from "../utils/alerts.js";

const user = getUser();
const token = getToken();

if (!user || !token) {
  showAlert("Please sign in to create a listing", "error");
  window.location.href = "/";
}

const form = document.getElementById("create-listing-form");
const submitBtn = document.getElementById("submit-btn");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const imageUrl1Input = document.getElementById("image-url-1");
const imageUrl2Input = document.getElementById("image-url-2");
const imageUrl3Input = document.getElementById("image-url-3");
const tagsInput = document.getElementById("tags");
const endsAtInput = document.getElementById("endsAt");

const now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
endsAtInput.min = now.toISOString().slice(0, 16);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const endsAt = endsAtInput.value;

  if (!title) {
    showAlert("Title is required.", "error");
    return;
  }

  if (!endsAt) {
    showAlert("Auction end time is required.", "error");
    return;
  }

  const endsAtDate = new Date(endsAt);
  if (endsAtDate <= new Date()) {
    showAlert("Auction end time must be in the future.", "error");
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

  const listingData = {
    title,
    endsAt: endsAtDate.toISOString(),
  };

  if (description) {
    listingData.description = description;
  }

  if (media.length > 0) {
    listingData.media = media;
  }

  if (tags.length > 0) {
    listingData.tags = tags;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Creating...";

  try {
    const { data } = await createListing(listingData);
    showAlert("Listing created successfully!", "success");
    setTimeout(() => {
      window.location.href = `/listings/listing/?id=${data.id}`;
    }, 1000);
  } catch (error) {
    showAlert(error.message, "error");
    submitBtn.disabled = false;
    submitBtn.textContent = "Add Listing";
  }
});
