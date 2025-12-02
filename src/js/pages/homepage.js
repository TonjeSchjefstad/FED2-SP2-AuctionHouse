import { getListings } from "../api/listings/getListings";

const highlightedGrid = document.getElementById("highlighted-listings-grid");

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

async function loadHighlightedListings() {
  try {
    const { data } = await getListings({
      page: 1,
      limit: 4,
      active: true,
      sort: "created",
      order: "desc",
    });

    if (data && data.length > 0) {
      highlightedGrid.innerHTML = data.map(renderListingCard).join("");
    } else {
      highlightedGrid.innerHTML =
        '<p class="col-span-full text-center font-sans text-lg">No active listings at the moment.</p>';
    }
  } catch (error) {
    console.error("Error loading highlighted listings:", error);
    highlightedGrid.innerHTML =
      '<p class="col-span-full text-center font-sans text-lg text-red-600">Failed to load listings.</p>';
  }
}

loadHighlightedListings();
