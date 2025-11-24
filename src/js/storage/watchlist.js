export function getWatchlist() {
  const watchlist = localStorage.getItem("watchlist");
  return watchlist ? JSON.parse(watchlist) : [];
}

export function addToWatchlist(listingId) {
  const watchlist = getWatchlist();
  if (!watchlist.includes(listingId)) {
    watchlist.push(listingId);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }
}

export function removeFromWatchlist(listingId) {
  let watchlist = getWatchlist();
  watchlist = watchlist.filter((id) => id !== listingId);
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}

export function isInWatchlist(listingId) {
  const watchlist = getWatchlist();
  return watchlist.includes(listingId);
}

export function toggleWatchlist(listingId) {
  if (isInWatchlist(listingId)) {
    removeFromWatchlist(listingId);
    return false;
  } else {
    addToWatchlist(listingId);
    return true;
  }
}
