import { createListing } from "../api/auth/listings/createListing.js";
import { getUser, getToken } from "../storage/localStorage.js";

const user = getUser();
const token = getToken();

if (!user || !token) {
  alert("Please sign in to create a listing");
  window.location.href = "/";
}

const form = document.getElementById("create-listing-form");
const submitBtn = document.getElementById("submit-btn");
const errorMessageEl = document.getElementById("error-message");
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

function showError(message) {
  errorMessageEl.querySelector("p").textContent = message;
  errorMessageEl.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function hideError() {
  errorMessageEl.classList.add("hidden");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  hideError();

  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const endsAt = endsAtInput.value;

  if (!title) {
    showError("Title is required.");
    return;
  }

  if (!endsAt) {
    showError("Auction end time is required.");
    return;
  }

  const endsAtDate = new Date(endsAt);
  if (endsAtDate <= new Date()) {
    showError("Auction end time must be in the future.");
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
    alert("Listing created successfully!");
    window.location.href = `/listings/listing/?id=${data.id}`;
  } catch (error) {
    showError(error.message);
    submitBtn.disabled = false;
    submitBtn.textContent = "Add Listing";
  }
});
