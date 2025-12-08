import { getListing } from "../api/listings/getListings.js";
import { placeBid } from "../api/listings/placeBid.js";
import { getUser, getToken } from "../storage/localStorage.js";
import { toggleWatchlist, isInWatchlist } from "../storage/watchlist.js";
import { getProfile } from "../api/profiles/getProfile.js";
import { showAlert } from "../utils/alerts.js";
import { optimizeImageUrl } from "../utils/optimizeImages.js";

const urlParams = new URLSearchParams(window.location.search);
const listingId = urlParams.get("id");

const loadingEl = document.getElementById("loading");
const errorStateEl = document.getElementById("error-state");
const listingContentEl = document.getElementById("listing-content");
const breadcrumbTitleEl = document.getElementById("breadcrumb-title");
const mainImageEl = document.getElementById("main-image");
const thumbnailGalleryEl = document.getElementById("thumbnail-gallery");
const listingTitleEl = document.getElementById("listing-title");
const listingDescriptionEl = document.getElementById("listing-description");
const sellerLinkEl = document.getElementById("seller-link");
const sellerNameEl = document.getElementById("seller-name");
const currentBidEl = document.getElementById("current-bid");
const countdownEl = document.getElementById("countdown");
const biddingSectionEl = document.getElementById("bidding-section");
const loginPromptEl = document.getElementById("login-prompt");
const ownListingMessageEl = document.getElementById("own-listing-message");
const endedMessageEl = document.getElementById("ended-message");
const userCreditsEl = document.getElementById("user-credits");
const bidInputEl = document.getElementById("bid-input");
const placeBidBtn = document.getElementById("place-bid-btn");
const bidErrorEl = document.getElementById("bid-error");
const bidHistoryEl = document.getElementById("bid-history");
const noBidsEl = document.getElementById("no-bids");
const watchlistBtn = document.getElementById("watchlist-btn");

const user = getUser();
const token = getToken();
const isLoggedIn = !!(user && token);
let userCredits = 0;

let currentListing = null;

function getTimeRemaining(endsAt) {
  const now = new Date();
  const end = new Date(endsAt);
  const diff = end - now;

  if (diff <= 0) return "Ended";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `Ends in: ${days}d ${hours}h`;
  if (hours > 0) return `Ends in: ${hours}h ${minutes}m`;
  return `Ends in: ${minutes}m`;
}

function hasEnded(endsAt) {
  return new Date(endsAt) <= new Date();
}

function getCurrentBid(bids) {
  if (!bids || bids.length === 0) return 0;
  return Math.max(...bids.map((bid) => bid.amount));
}

function renderThumbnails(media) {
  if (!media || media.length <= 1) {
    thumbnailGalleryEl.innerHTML = "";
    return;
  }

  thumbnailGalleryEl.innerHTML = media
    .map((item, index) => {
      const thumbUrl = optimizeImageUrl(item.url, "small");

      return `
        <button class="thumbnail-btn aspect-square overflow-hidden rounded border-2 ${index === 0 ? "border-button-gold" : "border-transparent"} hover:border-button-gold transition-colors">
          <img 
            src="${thumbUrl}" 
            alt="${item.alt || ""}" 
            class="w-full h-full object-cover" 
            data-index="${index}"
            data-full-url="${item.url}"
            loading="lazy"
            decoding="async"
            width="150"
            height="150"
          >
        </button>
      `;
    })
    .join("");

  thumbnailGalleryEl.querySelectorAll(".thumbnail-btn img").forEach((img) => {
    img.addEventListener("click", () => {
      const index = parseInt(img.dataset.index);
      const fullUrl = img.dataset.fullUrl;

      mainImageEl.src = optimizeImageUrl(fullUrl, "large");
      mainImageEl.alt = media[index].alt || "";

      thumbnailGalleryEl
        .querySelectorAll(".thumbnail-btn")
        .forEach((btn, i) => {
          if (i === index) {
            btn.classList.add("ring-2", "ring-button-gold");
          } else {
            btn.classList.remove("ring-2", "ring-button-gold");
          }
        });
    });
  });
}

function renderBidHistory(bids) {
  if (!bids || bids.length === 0) {
    bidHistoryEl.innerHTML = "";
    noBidsEl.classList.remove("hidden");
    return;
  }

  noBidsEl.classList.add("hidden");

  const sortedBids = [...bids].sort((a, b) => b.amount - a.amount);

  bidHistoryEl.innerHTML = sortedBids
    .map(
      (bid) => `
      <div class="flex justify-between items-center py-3 border-b border-border">
        <span class="font-sans text-base">${bid.bidder.name}</span>
        <span class="font-sans text-base">$${bid.amount.toLocaleString()}</span>
      </div>
    `,
    )
    .join("");
}

async function loadUserCredits() {
  if (!user || !token) return;

  try {
    const { data } = await getProfile(user.name);
    userCredits = data.credits || 0;
  } catch (error) {
    console.error("Failed to load user credits:", error);
  }
}

async function loadListing() {
  if (!listingId) {
    loadingEl.classList.add("hidden");
    errorStateEl.classList.remove("hidden");
    return;
  }

  try {
    const { data } = await getListing(listingId);
    currentListing = data;

    loadingEl.classList.add("hidden");
    listingContentEl.classList.remove("hidden");

    await loadUserCredits();

    document.title = `${data.title} - Maison Ardéne Auction House`;
    breadcrumbTitleEl.textContent = data.title;

    const mainImage = data.media?.[0];
    const optimizedUrl = mainImage?.url
      ? optimizeImageUrl(mainImage.url, "large")
      : "/public/assets/placeholder.jpg";

    mainImageEl.src = optimizedUrl;
    mainImageEl.alt = mainImage?.alt || data.title;

    mainImageEl.setAttribute("fetchpriority", "high");
    mainImageEl.setAttribute("decoding", "async");
    mainImageEl.setAttribute("width", "800");
    mainImageEl.setAttribute("height", "800");

    renderThumbnails(data.media);

    listingTitleEl.textContent = data.title;
    listingDescriptionEl.textContent =
      data.description || "No description provided.";

    sellerNameEl.textContent = data.seller.name;
    sellerLinkEl.href = `/profile/?name=${data.seller.name}`;

    const currentBid = getCurrentBid(data.bids);
    currentBidEl.textContent = `$ ${currentBid.toLocaleString()}`;

    countdownEl.textContent = getTimeRemaining(data.endsAt);

    renderBidHistory(data.bids);

    const auctionEnded = hasEnded(data.endsAt);
    const isOwnListing = isLoggedIn && user.name === data.seller.name;

    if (auctionEnded) {
      endedMessageEl.classList.remove("hidden");
    } else if (isOwnListing) {
      ownListingMessageEl.classList.remove("hidden");
    } else if (isLoggedIn) {
      biddingSectionEl.classList.remove("hidden");
      userCreditsEl.textContent = `Your available credit: $${userCredits.toLocaleString()}`;
      bidInputEl.placeholder = `$${currentBid + 1}`;
      bidInputEl.min = currentBid + 1;
    } else {
      loginPromptEl.classList.remove("hidden");
    }

    const isWatchlisted = isInWatchlist(listingId);
    updateWatchlistButton(isWatchlisted);
  } catch (error) {
    loadingEl.classList.add("hidden");
    errorStateEl.classList.remove("hidden");
    console.error("Error loading listing:", error);
  }
}

placeBidBtn?.addEventListener("click", async () => {
  const amount = parseInt(bidInputEl.value);
  const currentBid = getCurrentBid(currentListing.bids);

  if (!amount || isNaN(amount)) {
    bidErrorEl.textContent = "Please enter a valid bid amount.";
    bidErrorEl.classList.remove("hidden");
    return;
  }

  if (amount <= currentBid) {
    bidErrorEl.textContent = `Bid must be higher than $${currentBid.toLocaleString()}`;
    bidErrorEl.classList.remove("hidden");
    return;
  }

  if (userCredits && amount > userCredits) {
    bidErrorEl.textContent = `You don't have enough credits. Your balance: $${userCredits.toLocaleString()}`;
    bidErrorEl.classList.remove("hidden");
    return;
  }

  bidErrorEl.classList.add("hidden");
  placeBidBtn.disabled = true;
  placeBidBtn.textContent = "Placing...";

  try {
    await placeBid(listingId, amount);
    showAlert("Bid placed successfully!", "success");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    bidErrorEl.textContent = error.message;
    bidErrorEl.classList.remove("hidden");
    placeBidBtn.disabled = false;
    placeBidBtn.textContent = "Place Bid";
  }
});

document.getElementById("open-signin")?.addEventListener("click", () => {
  document.getElementById("profile-toggle")?.click();
});

function updateWatchlistButton(isWatchlisted) {
  const svg = watchlistBtn.querySelector("svg");
  if (isWatchlisted) {
    svg.innerHTML = `
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" fill="currentColor" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
    `;
  } else {
    svg.innerHTML = `
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
    `;
  }
}

watchlistBtn.addEventListener("click", () => {
  const listingId = new URLSearchParams(window.location.search).get("id");
  const isWatchlisted = toggleWatchlist(listingId);
  updateWatchlistButton(isWatchlisted);

  if (isWatchlisted) {
    showAlert("Added to watchlist", "success");
  } else {
    showAlert("Removed from watchlist", "info");
  }
});

loadListing();
