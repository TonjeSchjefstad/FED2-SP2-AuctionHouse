export function optimizeImageUrl(url, size = "medium") {
  if (!url) return "/public/assets/placeholder.jpg";

  const sizes = {
    small: 150,
    thumbnail: 300,
    medium: 400,
    large: 800,
    xlarge: 1200,
  };

  const width = sizes[size] || sizes.medium;
  const height = width;

  if (url.includes("pexels.com")) {
    const baseUrl = url.split("?")[0];
    return baseUrl + `?auto=compress&cs=tinysrgb&w=${width}&h=${height}`;
  }

  if (url.includes("unsplash.com")) {
    const baseUrl = url.split("?")[0];
    return baseUrl + `?w=${width}&q=80&fm=webp`;
  }

  if (url.startsWith("http")) {
    return url;
  }

  return url;
}

export function getImageAttributes(url, size = "medium") {
  return {
    src: optimizeImageUrl(url, size),
    loading: "lazy",
    decoding: "async",
  };
}
