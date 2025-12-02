import { getProfile, getProfileBids } from "../api/profiles/getProfile.js";
import { getUser, getToken } from "../storage/localStorage.js";
import { getListing } from "../api/listings/getListings.js";
import { getWatchlist } from "../storage/watchlist.js";
import { deleteListing } from "../api/listings/deleteListing.js";
import { showAlert } from "../utils/alerts.js";

const user = getUser();
const token = getToken();

const urlParams = new URLSearchParams(window.location.search);
const profileName = urlParams.get("name") || user?.name;

if (!profileName) {
  showAlert("No profile specified.", "error");
  window.location.href = "/";
}

const isOwnProfile = user && user.name === profileName;

if (isOwnProfile && (!user || !token)) {
  showAlert("Please sign in to view your profile.", "error");
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
const deleteModal = document.getElementById("delete-modal");
const deleteListingTitle = document.getElementById("delete-listing-title");
const cancelDeleteBtn = document.getElementById("cancel-delete-btn");
const confirmDeleteBtn = document.getElementById("confirm-delete-btn");

let profileData = null;
let allListings = [];
let userBids = [];
let watchlistCache = null;
let currentFilter = "active";
let listingToDelete = null;

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

  const showActions =
    isOwnProfile &&
    (currentFilter === "active" || currentFilter === "previous");

  return `
    <div class="product-card relative">
      ${
        showActions
          ? `
        <div class="absolute top-4 right-4 z-10">
          <button class="action-menu-btn p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors" data-listing-id="${listing.id}" data-listing-title="${listing.title}">
            <svg class="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
          <div class="action-menu hidden absolute top-12 right-0 bg-white rounded-lg shadow-lg border border-border overflow-hidden min-w-[150px]">
            <a href="/listings/edit/?id=${listing.id}" class="block px-4 py-3 font-sans text-sm hover:bg-gray-100 transition-colors border-b border-border">
              <span class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
                Edit Listing
              </span>
            </a>
            <button class="delete-listing-btn w-full px-4 py-3 font-sans text-sm text-left text-red-600 hover:bg-red-50 transition-colors border-b border-border" data-listing-id="${listing.id}" data-listing-title="${listing.title}">
              <span class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
                Delete Listing
              </span>
            </button>
            <button class="cancel-menu-btn w-full px-4 py-3 font-sans text-sm text-left hover:bg-gray-100 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      `
          : ""
      }
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
      if (window.bidListingsCache) {
        filteredListings = window.bidListingsCache.filter(
          (listing) => !hasEnded(listing.endsAt),
        );
      } else {
        filteredListings = [];
      }
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

document.addEventListener("click", (e) => {
  if (e.target.closest("a[href]")) {
    return;
  }

  if (
    !e.target.closest(".action-menu-btn") &&
    !e.target.closest(".action-menu")
  ) {
    document.querySelectorAll(".action-menu").forEach((menu) => {
      menu.classList.add("hidden");
    });
  }
});

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".action-menu-btn");
  if (btn) {
    e.stopPropagation();
    e.preventDefault();
    const menu = btn.nextElementSibling;
    const allMenus = document.querySelectorAll(".action-menu");

    allMenus.forEach((m) => {
      if (m !== menu) {
        m.classList.add("hidden");
      }
    });

    menu.classList.toggle("hidden");
  }
});

document.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete-listing-btn");
  if (deleteBtn) {
    e.stopPropagation();
    const listingId = deleteBtn.dataset.listingId;
    const listingTitle = deleteBtn.dataset.listingTitle;
    openDeleteModal(listingId, listingTitle);
  }
});

document.addEventListener("click", (e) => {
  const cancelBtn = e.target.closest(".cancel-menu-btn");
  if (cancelBtn) {
    e.stopPropagation();
    document.querySelectorAll(".action-menu").forEach((menu) => {
      menu.classList.add("hidden");
    });
  }
});

function openDeleteModal(listingId, listingTitle) {
  listingToDelete = listingId;
  deleteListingTitle.textContent = listingTitle;
  deleteModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeDeleteModal() {
  listingToDelete = null;
  deleteModal.classList.add("hidden");
  document.body.style.overflow = "";
}

async function handleDelete() {
  if (!listingToDelete) return;

  confirmDeleteBtn.disabled = true;
  confirmDeleteBtn.textContent = "Deleting...";

  try {
    await deleteListing(listingToDelete);

    allListings = allListings.filter(
      (listing) => listing.id !== listingToDelete,
    );

    if (profileData && profileData.listings) {
      profileData.listings = profileData.listings.filter(
        (listing) => listing.id !== listingToDelete,
      );
    }

    closeDeleteModal();
    renderListings();

    showAlert("Listing deleted successfully!", "success");
  } catch (error) {
    showAlert("Failed to delete listing: " + error.message, "error");
    confirmDeleteBtn.disabled = false;
    confirmDeleteBtn.textContent = "Yes";
  }
}

cancelDeleteBtn.addEventListener("click", closeDeleteModal);

confirmDeleteBtn.addEventListener("click", handleDelete);

deleteModal.addEventListener("click", (e) => {
  if (e.target === deleteModal) {
    closeDeleteModal();
  }
});

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
    const { data } = await getProfile(profileName, false, true);
    profileData = data;
    try {
      const listingsResponse = await fetch(
        `https://v2.api.noroff.dev/auction/profiles/${profileName}/listings?_bids=true`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "X-Noroff-API-Key": "db7225e1-9983-4e59-a55d-6f2cb506417d",
          },
        },
      );
      const listingsData = await listingsResponse.json();
      allListings = listingsData.data || [];
    } catch (error) {
      console.error("Error fetching listings:", error);
      allListings = [];
    }

    try {
      const bidsData = await getProfileBids(profileName);
      userBids = bidsData.data || [];

      const bidListingIds = [
        ...new Set(userBids.map((bid) => bid.listing?.id).filter(Boolean)),
      ];
      const bidListingsWithBids = [];
      for (const id of bidListingIds) {
        try {
          const { data } = await getListing(id);
          bidListingsWithBids.push(data);
        } catch (error) {
          console.error(`Failed to load listing ${id}:`, error);
        }
      }

      window.bidListingsCache = bidListingsWithBids;
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

    const updateProfileBtn = document.querySelector('a[href="/profile/edit/"]');
    const addListingBtn = document.querySelector('a[href="/listings/create/"]');
    const creditDisplay = document.querySelector(
      ".inline-flex.items-center.gap-2.px-6.py-3",
    );

    if (!isOwnProfile) {
      if (updateProfileBtn) updateProfileBtn.style.display = "none";
      if (addListingBtn) addListingBtn.style.display = "none";
      if (creditDisplay) creditDisplay.style.display = "none";

      document
        .querySelectorAll(
          '[data-filter="previous"], [data-filter="bids"], [data-filter="wins"], [data-filter="watchlist"]',
        )
        .forEach((tab) => {
          tab.style.display = "none";
        });

      const dropdown = document.getElementById("filter-dropdown");
      if (dropdown) {
        dropdown.querySelector('option[value="previous"]').style.display =
          "none";
        dropdown.querySelector('option[value="bids"]').style.display = "none";
        dropdown.querySelector('option[value="wins"]').style.display = "none";
        dropdown.querySelector('option[value="watchlist"]').style.display =
          "none";
      }

      currentFilter = "active";
    }

    renderListings();
  } catch (error) {
    loadingEl.classList.add("hidden");
    showAlert("Failed to load profile: " + error.message, "error");
    window.location.href = "/";
  }
}

loadProfile();
