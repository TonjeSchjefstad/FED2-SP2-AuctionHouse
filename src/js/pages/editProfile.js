import { getProfile } from "../api/profiles/getProfile.js";
import { updateProfile } from "../api/profiles/updateProfile.js";
import { getUser, getToken, saveUser } from "../storage/localStorage.js";

const user = getUser();
const token = getToken();

if (!user || !token) {
  alert("Please sign in to edit your profile.");
  window.location.href = "/";
}

const form = document.getElementById("edit-profile-form");
const submitBtn = document.getElementById("submit-btn");
const errorMessageEl = document.getElementById("error-message");
const successMessageEl = document.getElementById("success-message");
const bioInput = document.getElementById("bio");
const bioCountEl = document.getElementById("bio-count");
const avatarUrlInput = document.getElementById("avatar-url");
const bannerUrlInput = document.getElementById("banner-url");

bioInput.addEventListener("input", () => {
  bioCountEl.textContent = bioInput.value.length;
});

function showError(message) {
  errorMessageEl.querySelector("p").textContent = message;
  errorMessageEl.classList.remove("hidden");
  successMessageEl.classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showSuccess() {
  successMessageEl.classList.remove("hidden");
  errorMessageEl.classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function hideMessages() {
  errorMessageEl.classList.add("hidden");
  successMessageEl.classList.add("hidden");
}

async function loadProfileData() {
  try {
    const { data } = await getProfile(user.name, false, false);

    bioInput.value = data.bio || "";
    bioCountEl.textContent = bioInput.value.length;
    avatarUrlInput.value = data.avatar?.url || "";
    bannerUrlInput.value = data.banner?.url || "";
  } catch (error) {
    showError("Failed to load profile data: " + error.message);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  hideMessages();

  const bio = bioInput.value.trim();
  const avatarUrl = avatarUrlInput.value.trim();
  const bannerUrl = bannerUrlInput.value.trim();

  if (bio.length > 160) {
    showError("Bio must be 160 characters or less.");
    return;
  }

  const updateData = {};

  if (bio) {
    updateData.bio = bio;
  }

  if (avatarUrl) {
    updateData.avatar = {
      url: avatarUrl,
      alt: "",
    };
  }

  if (bannerUrl) {
    updateData.banner = {
      url: bannerUrl,
      alt: "",
    };
  }

  if (Object.keys(updateData).length === 0) {
    showError("Please provide at least one field to update.");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Saving...";

  try {
    const { data } = await updateProfile(user.name, updateData);

    const updatedUser = { ...user, ...data };
    saveUser(updatedUser);

    showSuccess();

    setTimeout(() => {
      window.location.href = "/profile/";
    }, 2000);
  } catch (error) {
    showError(error.message);
    submitBtn.disabled = false;
    submitBtn.textContent = "Save Changes";
  }
});

loadProfileData();
