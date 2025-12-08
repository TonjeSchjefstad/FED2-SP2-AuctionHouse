import { getProfile } from "../api/profiles/getProfile.js";
import { updateProfile } from "../api/profiles/updateProfile.js";
import { getUser, getToken, saveUser } from "../storage/localStorage.js";
import { showAlert } from "../utils/alerts.js";
import { validateBio, validateUrl } from "../utils/validation.js";

const user = getUser();
const token = getToken();

if (!user || !token) {
  showAlert("Please sign in to edit your profile.", "error");
  window.location.href = "/";
}

const form = document.getElementById("edit-profile-form");
const submitBtn = document.getElementById("submit-btn");
const bioInput = document.getElementById("bio");
const bioCountEl = document.getElementById("bio-count");
const avatarUrlInput = document.getElementById("avatar-url");
const bannerUrlInput = document.getElementById("banner-url");

bioInput.addEventListener("input", () => {
  bioCountEl.textContent = bioInput.value.length;
});

async function loadProfileData() {
  try {
    const { data } = await getProfile(user.name, false, false);

    bioInput.value = data.bio || "";
    bioCountEl.textContent = bioInput.value.length;
    avatarUrlInput.value = data.avatar?.url || "";
    bannerUrlInput.value = data.banner?.url || "";
  } catch (error) {
    showAlert("Failed to load profile data: " + error.message, "error");
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const bio = bioInput.value.trim();
  const avatarUrl = avatarUrlInput.value.trim();
  const bannerUrl = bannerUrlInput.value.trim();

  const bioValidation = validateBio(bio);
  if (!bioValidation.valid) {
    showAlert(bioValidation.error, "error");
    return;
  }

  if (avatarUrl) {
    const avatarValidation = validateUrl(avatarUrl, "Avatar URL");
    if (!avatarValidation.valid) {
      showAlert(avatarValidation.error, "error");
      return;
    }
  }

  if (bannerUrl) {
    const bannerValidation = validateUrl(bannerUrl, "Banner URL");
    if (!bannerValidation.valid) {
      showAlert(bannerValidation.error, "error");
      return;
    }
  }

  const updateData = {};

  if (bio) {
    updateData.bio = bio;
  }

  if (avatarUrl) {
    updateData.avatar = {
      url: avatarUrl,
      alt: user.name,
    };
  }

  if (bannerUrl) {
    updateData.banner = {
      url: bannerUrl,
      alt: `${user.name} banner`,
    };
  }

  if (Object.keys(updateData).length === 0) {
    showAlert("Please provide at least one field to update.", "error");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Saving...";

  try {
    const { data } = await updateProfile(user.name, updateData);

    const updatedUser = { ...user, ...data };
    saveUser(updatedUser);

    showAlert("Profile updated successfully!", "success");

    setTimeout(() => {
      window.location.href = "/profile/";
    }, 1000);
  } catch (error) {
    showAlert(error.message, "error");
    submitBtn.disabled = false;
    submitBtn.textContent = "Save Changes";
  }
});

loadProfileData();
