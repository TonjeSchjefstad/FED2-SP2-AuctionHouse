import { getProfile, getProfileBids } from "../api/profiles/getProfile.js";
import { getUser, getToken } from "../storage/localStorage.js";
import { getListing } from "../api/auth/listings/getListings.js";
import { getWatchlist } from "../storage/watchlist.js";

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
const emptyMessageEl = document.getElementById("empty-message");
const filterTabs = document.querySelectorAll(".filter-tab");
const filterDropdown = document.getElementById("filter-dropdown");

let profileData = null;
let allListings = [];
let userBids = [];
let watchlistCache = null;
let currentFilter = "active";

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

function hasEnded(endsAt) {
  return new Date(endsAt) <= new Date();
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

function getEmptyMessage(filter) {
  switch (filter) {
    case "active":
      return "You don't have any active listings.";
    case "previous":
      return "You don't have any previous listings.";
    case "bids":
      return "You haven't placed any bids yet.";
    case "wins":
      return "You haven't won any auctions yet.";
    case "watchlist":
      return "Your watchlist is empty.";
    default:
      return "No listings found.";
  }
}

function renderListings() {
  let filteredListings = [];

  switch (currentFilter) {
    case "active":
      filteredListings = allListings.filter(
        (listing) => !hasEnded(listing.endsAt),
      );
      break;
    case "previous":
      filteredListings = allListings.filter((listing) =>
        hasEnded(listing.endsAt),
      );
      break;
    case "bids":
      const listingIds = new Set(); // eslint-disable-line
      filteredListings = userBids
        .filter((bid) => {
          if (bid.listing && !listingIds.has(bid.listing.id)) {
            listingIds.add(bid.listing.id);
            return true;
          }
          return false;
        })
        .map((bid) => bid.listing)
        .filter((listing) => !hasEnded(listing.endsAt));
      break;
    case "wins":
      filteredListings = profileData.wins || [];
      break;
    case "watchlist":
      if (watchlistCache) {
        filteredListings = watchlistCache;
      } else {
        filteredListings = [];
      }
      break;
  }

  if (filteredListings.length === 0) {
    listingsGridEl.innerHTML = "";
    emptyMessageEl.textContent = getEmptyMessage(currentFilter);
    emptyStateEl.classList.remove("hidden");
  } else {
    emptyStateEl.classList.add("hidden");
    listingsGridEl.innerHTML = filteredListings.map(renderListingCard).join("");
  }
}

filterTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    filterTabs.forEach((t) => {
      t.classList.remove(
        "bg-button-dark",
        "text-button-dark-text",
        "border-button-dark",
      );
      t.classList.add("bg-card", "border-border");
    });

    tab.classList.remove("bg-card", "border-border");
    tab.classList.add(
      "bg-button-dark",
      "text-button-dark-text",
      "border-button-dark",
    );

    currentFilter = tab.dataset.filter;
    renderListings();
  });
});

filterDropdown.addEventListener("change", (e) => {
  currentFilter = e.target.value;
  renderListings();
});

async function loadWatchlistItems() {
  const watchlistIds = getWatchlist();
  const watchlistItems = [];

  for (const id of watchlistIds) {
    try {
      const { data } = await getListing(id);
      watchlistItems.push(data);
    } catch (error) {
      console.error(`Failed to load listing ${id}:`, error);
    }
  }

  return watchlistItems;
}

async function loadProfile() {
  try {
    const { data } = await getProfile(user.name, true, true);
    profileData = data;
    allListings = data.listings || [];

    try {
      const bidsData = await getProfileBids(user.name);
      userBids = bidsData.data || [];
    } catch (error) {
      console.error("Error fetching bids:", error);
      userBids = [];
    }

    try {
      watchlistCache = await loadWatchlistItems();
    } catch (error) {
      console.error("Error loading watchlist:", error);
      watchlistCache = [];
    }

    loadingEl.classList.add("hidden");
    profileContentEl.classList.remove("hidden");

    const bannerUrl =
      data.banner?.url ||
      "https://images.unsplash.com/photo-1557683316-973673baf926?w=1500";
    bannerImageEl.src = bannerUrl;
    bannerImageEl.alt = data.banner?.alt || "Profile banner";

    const avatarUrl =
      data.avatar?.url ||
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400";
    avatarImageEl.src = avatarUrl;
    avatarImageEl.alt = data.avatar?.alt || data.name;

    profileNameEl.textContent = data.name;
    profileBioEl.textContent = data.bio || "No bio provided.";
    profileCreditsEl.textContent = data.credits?.toLocaleString() || "0";

    document.title = `${data.name} - Maison Ardéne Auction House`;

    if (filterTabs.length > 0) {
      filterTabs[0].classList.remove("bg-card", "border-border");
      filterTabs[0].classList.add(
        "bg-button-dark",
        "text-button-dark-text",
        "border-button-dark",
      );
    }

    renderListings();
  } catch (error) {
    loadingEl.classList.add("hidden");
    alert("Failed to load profile: " + error.message);
    window.location.href = "/";
  }
}

loadProfile();
