import { getProfile } from "../api/profiles/getProfile.js";
import { getUser, getToken } from "../storage/localStorage.js";

const user = getUser();
const token = getToken();

if (!user || !token) {
  alert("Please sign in to view your profile.");
  window.location.href = "/";
}

const loadingEl = document.getElementById("loading");
const profileContentEl = document.getElementById("profile-content");
const bannerImageEl = document.getElementById("banner-image");
const avatarImageEl = document.getElementById("avatar-image");
const profileNameEl = document.getElementById("profile-name");
const profileBioEl = document.getElementById("profile-bio");
const profileCreditsEl = document.getElementById("profile-credits");
const listingsGridEl = document.getElementById("listings-grid");
const emptyStateEl = document.getElementById("empty-state");

function getTimeRemaining(endsAt) {
  const now = new Date();
  const end = new Date(endsAt);
  const diff = end - now;

  if (diff <= 0) return "Ended";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `Ends in ${days}d ${hours}h`;
  if (hours > 0) return `Ends in ${hours}h ${minutes}m`;
  return `Ends in ${minutes}m`;
}

function getCurrentBid(bids) {
  if (!bids || bids.length === 0) return 0;
  return Math.max(...bids.map((bid) => bid.amount));
}

function renderListingCard(listing) {
  const timeRemaining = getTimeRemaining(listing.endsAt);
  const currentBid = getCurrentBid(listing.bids);
  const imageUrl =
    listing.media?.[0]?.url ||
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800";
  const imageAlt = listing.media?.[0]?.alt || listing.title;

  return `
    <div class="product-card">
      <a href="/listings/listing/?id=${listing.id}">
        <img src="${imageUrl}" alt="${imageAlt}" class="product-card-image">
      </a>
      <div class="product-card-content">
        <p class="product-card-time">${timeRemaining}</p>
        <h3 class="product-card-title">${listing.title}</h3>
        <p class="product-card-bid">CURRENT BID: $ ${currentBid.toLocaleString()}</p>
        <a href="/listings/listing/?id=${listing.id}" class="btn-gold w-full inline-block text-center">View Auction</a>
      </div>
    </div>
  `;
}

async function loadProfile() {
  try {
    const { data } = await getProfile(user.name, true, false);

    loadingEl.classList.add("hidden");
    profileContentEl.classList.remove("hidden");

    const bannerUrl =
      data.banner?.url ||
      "https://images.unsplash.com/photo-1557683316-973673baf926?w=1500";
    bannerImageEl.src = bannerUrl;
    bannerImageEl.alt = data.banner?.alt || "Profile banner";
    bannerImageEl.onload = () => {};

    const avatarUrl =
      data.avatar?.url ||
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400";
    avatarImageEl.src = avatarUrl;
    avatarImageEl.alt = data.avatar?.alt || data.name;
    avatarImageEl.onload = () => {};

    profileNameEl.textContent = data.name;
    profileBioEl.textContent = data.bio || "No bio provided.";
    profileCreditsEl.textContent = data.credits?.toLocaleString() || "0";

    document.title = `${data.name} - Maison Ardéne Auction House`;

    const listings = data.listings || [];
    if (listings.length === 0) {
      listingsGridEl.classList.add("hidden");
      emptyStateEl.classList.remove("hidden");
    } else {
      emptyStateEl.classList.add("hidden");
      listingsGridEl.innerHTML = listings.map(renderListingCard).join("");
    }
  } catch (error) {
    loadingEl.classList.add("hidden");
    alert("Failed to load profile: " + error.message);
    window.location.href = "/";
  }
}

loadProfile();
