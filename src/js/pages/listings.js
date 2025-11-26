import {
  getListings,
  searchListings,
} from "../api/auth/listings/getListings.js";
import { getUser, getToken } from "../storage/localStorage.js";

let currentPage = 1;
let currentTag = "";
let currentSearch = "";
let currentSort = "newest";

const listingsGrid = document.getElementById("listings-grid");
const loadingEl = document.getElementById("loading");
const emptyStateEl = document.getElementById("empty-state");
const paginationEl = document.getElementById("pagination");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const fabBtn = document.getElementById("fab-add-listing");
const sortSelect = document.getElementById("sort-select");
const categoryDropdown = document.getElementById("category-dropdown");

const user = getUser();
const token = getToken();
const isLoggedIn = !!(user && token);

if (isLoggedIn && fabBtn) {
  fabBtn.classList.remove("hidden");
  fabBtn.classList.add("flex");
}

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

function getSortParams(sortType) {
  switch (sortType) {
    case "newest":
      return { sort: "created", sortOrder: "desc" };
    case "ending-soon":
      return { sort: "endsAt", sortOrder: "asc" };
    case "a-z":
      return { sort: "title", sortOrder: "asc" };
    case "z-a":
      return { sort: "title", sortOrder: "desc" };
    case "highest-bid":
    case "lowest-bid":
      return { sort: "", sortOrder: "" };
    default:
      return { sort: "created", sortOrder: "desc" };
  }
}

function sortListingsByBid(listings, sortType) {
  if (sortType === "highest-bid") {
    return [...listings].sort(
      (a, b) => getCurrentBid(b.bids) - getCurrentBid(a.bids),
    );
  } else if (sortType === "lowest-bid") {
    return [...listings].sort(
      (a, b) => getCurrentBid(a.bids) - getCurrentBid(b.bids),
    );
  }
  return listings;
}

function renderListingCard(listing) {
  const timeRemaining = getTimeRemaining(listing.endsAt);
  const currentBid = getCurrentBid(listing.bids);
  const imageUrl = listing.media?.[0]?.url || "/public/assets/placeholder.jpg";
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

function renderPagination(meta) {
  if (!meta || meta.pageCount <= 1) {
    paginationEl.innerHTML = "";
    return;
  }

  let html = "";

  if (!meta.isFirstPage) {
    html += `<button class="pagination-btn px-3 py-2 border border-border rounded bg-card font-sans text-sm cursor-pointer transition-all hover:border-button-dark" data-page="${meta.currentPage - 1}">&lt;</button>`;
  }
  for (let i = 1; i <= meta.pageCount; i++) {
    if (i === meta.currentPage) {
      html += `<button class="pagination-btn px-3 py-2 border border-button-dark rounded bg-button-dark text-white font-sans text-sm cursor-pointer" data-page="${i}">${i}</button>`;
    } else {
      html += `<button class="pagination-btn px-3 py-2 border border-border rounded bg-card font-sans text-sm cursor-pointer transition-all hover:border-button-dark" data-page="${i}">${i}</button>`;
    }
  }

  if (!meta.isLastPage) {
    html += `<button class="pagination-btn px-3 py-2 border border-border rounded bg-card font-sans text-sm cursor-pointer transition-all hover:border-button-dark" data-page="${meta.currentPage + 1}">&gt;</button>`;
  }

  paginationEl.innerHTML = html;

  paginationEl.querySelectorAll(".pagination-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentPage = parseInt(btn.dataset.page);
      loadListings();
    });
  });
}

async function loadListings() {
  window.scrollTo({ top: 0, behavior: "smooth" });

  try {
    loadingEl.classList.remove("hidden");
    emptyStateEl.classList.add("hidden");
    listingsGrid.innerHTML = "";

    let result;
    const sortParams = getSortParams(currentSort);

    if (currentSearch) {
      result = await searchListings(currentSearch);
      result.data = sortListingsByBid(result.data, currentSort);
    } else {
      result = await getListings({
        page: currentPage,
        tag: currentTag,
        sort: sortParams.sort,
        sortOrder: sortParams.sortOrder,
      });

      if (currentSort === "highest-bid" || currentSort === "lowest-bid") {
        result.data = sortListingsByBid(result.data, currentSort);
      }
    }

    loadingEl.classList.add("hidden");

    if (!result.data || result.data.length === 0) {
      emptyStateEl.classList.remove("hidden");
      paginationEl.innerHTML = "";
      return;
    }

    listingsGrid.innerHTML = result.data.map(renderListingCard).join("");

    renderPagination(result.meta);
  } catch (error) {
    loadingEl.classList.add("hidden");
    listingsGrid.innerHTML = `<p class="text-center col-span-full font-sans text-lg text-red-600">Error loading listings: ${error.message}</p>`;
  }
}

categoryDropdown?.addEventListener("change", (e) => {
  currentTag = e.target.value;
  currentPage = 1;
  currentSearch = "";
  searchInput.value = "";
  loadListings();
});

sortSelect?.addEventListener("change", (e) => {
  currentSort = e.target.value;
  currentPage = 1;
  loadListings();
});

searchBtn?.addEventListener("click", () => {
  currentSearch = searchInput.value.trim();
  currentPage = 1;
  currentTag = "";
  if (categoryDropdown) categoryDropdown.value = "";
  loadListings();
});

searchInput?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    currentSearch = searchInput.value.trim();
    currentPage = 1;
    currentTag = "";
    if (categoryDropdown) categoryDropdown.value = "";
    loadListings();
  }
});

loadListings();
